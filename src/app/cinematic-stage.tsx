"use client";

import { useEffect, useRef } from "react";
import ReserveButton from "./_components/reserve-button";
import { track } from "@/lib/analytics";
import { PRODUCT } from "@/lib/site";

/**
 * Responsive, dual-codec sources: WebM/VP9 first (smaller), H.264 MP4
 * fallback; 720p for phones, 1080p above. Browsers pick the first playable
 * <source> whose media matches, evaluated at load.
 */
function Sources({ base }: { base: string }) {
  const u = (s: string) => `/videos/${s}`;
  return (
    <>
      <source media="(max-width: 767px)" type="video/webm" src={u(`${base}-720.webm`)} />
      <source media="(max-width: 767px)" type="video/mp4" src={u(`${base}-720.mp4`)} />
      <source type="video/webm" src={u(`${base}-1080.webm`)} />
      <source type="video/mp4" src={u(`${base}-1080.mp4`)} />
    </>
  );
}

/**
 * HALEN — one continuous cinematic shot.
 *
 *   CLIP_A  ambient ocean loop   (hero, autoplay + loop)
 *      |  scroll past the hero
 *   CLIP_B  cinematic push-in    (plays once, never scrubbed)
 *      |  on the final frames
 *   CLIP_C  product loop         (loops, seamless dissolve from B)
 *
 * Everything is ref/DOM-driven with GPU opacity crossfades — no per-frame
 * React state. The stage is pinned with position:sticky (a visual pin, never
 * a scroll-lock — the user keeps full agency, Apple/Arc style).
 */
export default function CinematicStage() {
  const aRef = useRef<HTMLVideoElement>(null);
  const bRef = useRef<HTMLVideoElement>(null);
  const cRef = useRef<HTMLVideoElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const cueRef = useRef<HTMLDivElement>(null);
  const productRef = useRef<HTMLDivElement>(null);
  const sentinelRef = useRef<HTMLDivElement>(null);
  const phase = useRef<"hero" | "transition" | "product">("hero");

  useEffect(() => {
    const a = aRef.current!;
    const b = bRef.current!;
    const c = cRef.current!;
    const hero = heroRef.current!;
    const cue = cueRef.current!;
    const product = productRef.current!;
    const sentinel = sentinelRef.current!;

    track("hero_viewed");

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isMobile = window.matchMedia("(max-width: 767px)").matches;
    const stage = stageRef.current!;
    let reachedC = false;
    let safety = 0;

    // Slow the ambient loops for a calmer, more meditative motion.
    // (B, the push-in, keeps its native pace.) playbackRate resets on
    // load(), so we re-apply it at every play() for A and C.
    const LOOP_RATE = 0.7;

    // --- 1. Hero loop — poster paints instantly, frames replace it ----
    a.classList.add("show");
    const startA = () => {
      a.playbackRate = LOOP_RATE;
      a.play().catch(() => {});
    };
    startA();

    // Autoplay fallback (strict mobile / low-power): start on first gesture.
    const kick = () => {
      startA();
      ["pointerdown", "touchstart", "scroll", "keydown"].forEach((ev) =>
        window.removeEventListener(ev, kick)
      );
    };
    if (a.paused) {
      ["pointerdown", "touchstart", "scroll", "keydown"].forEach((ev) =>
        window.addEventListener(ev, kick, { passive: true })
      );
    }

    // --- 2. Sequenced prefetch. Desktop warms B + C behind the hero.
    // Mobile warms only B (saves bandwidth/battery); C is fetched the
    // moment the push-in starts, so it's ready for the seamless handoff.
    const warm = (...vids: HTMLVideoElement[]) =>
      vids.forEach((v) => {
        if (v.preload !== "auto") {
          v.preload = "auto";
          v.load();
        }
      });
    const prefetch = () => warm(...(isMobile ? [b] : [b, c]));
    if (a.readyState >= 3) prefetch();
    else a.addEventListener("playing", prefetch, { once: true });
    const prefetchFallback = window.setTimeout(prefetch, 1500);

    // --- 3. Scroll-coupled hero exit (no parallax, just a gentle fade) --
    // Hero copy dissolves as you move through the first viewport, so the
    // film is unobstructed by the time the push-in begins.
    let rafId = 0;
    const onScroll = () => {
      if (rafId || phase.current !== "hero") return;
      rafId = requestAnimationFrame(() => {
        rafId = 0;
        const p = Math.min(1, window.scrollY / (window.innerHeight * 0.72));
        // smoothstep: the headline holds a beat, then dissolves — gentler
        // at both ends than a linear ramp, so the film takes over cleanly.
        const eased = p * p * (3 - 2 * p);
        hero.style.opacity = String(1 - eased);
        cue.style.opacity = String(Math.max(0, 1 - p * 2.2));
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    // --- 5. B -> C seamless dissolve on the final frames ---------------
    const LEAD = 0.6;
    const goToC = () => {
      if (reachedC) return;
      reachedC = true;
      phase.current = "product";
      window.clearTimeout(safety);

      c.currentTime = 0;
      c.playbackRate = LOOP_RATE;
      c.play().catch(() => {});
      c.classList.add("show"); // C rises over B; start frames match
      product.style.opacity = "1";

      window.setTimeout(() => {
        b.classList.remove("show");
        b.pause();
      }, reduce ? 0 : 1100);
    };

    // --- 4. A -> B push-in, triggered by scrolling past the hero -------
    const startB = () => {
      phase.current = "transition";
      hero.style.opacity = "0";
      hero.style.pointerEvents = "none";
      b.currentTime = 0;
      if (isMobile) warm(c); // ensure C is ready for the handoff
      const onPlay = () => {
        b.classList.add("show"); // B rises over A
        window.setTimeout(() => a.pause(), reduce ? 0 : 900);
        safety = window.setTimeout(goToC, 9500); // never freeze on B
      };
      const onFail = () => goToC(); // can't play B -> straight to product
      const p = b.play();
      if (p && typeof p.then === "function") p.then(onPlay).catch(onFail);
      else onPlay();
    };

    const onTime = () => {
      if (b.duration && b.currentTime >= b.duration - LEAD) goToC();
    };
    b.addEventListener("timeupdate", onTime);
    b.addEventListener("ended", goToC);
    b.addEventListener("error", goToC);

    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && phase.current === "hero") startB();
      },
      { rootMargin: "0px 0px -85% 0px", threshold: 0 }
    );
    io.observe(sentinel);

    // Pause decoders while the stage is offscreen (battery/perf on mobile);
    // resume the current phase's clip when it returns to view.
    const visIO = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) {
          a.pause();
          b.pause();
          c.pause();
        } else if (phase.current === "hero") {
          a.playbackRate = LOOP_RATE;
          a.play().catch(() => {});
        } else if (phase.current === "product") {
          c.playbackRate = LOOP_RATE;
          c.play().catch(() => {});
        }
      },
      { threshold: 0 }
    );
    visIO.observe(stage);

    return () => {
      io.disconnect();
      visIO.disconnect();
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(rafId);
      ["pointerdown", "touchstart", "scroll", "keydown"].forEach((ev) =>
        window.removeEventListener(ev, kick)
      );
      window.clearTimeout(prefetchFallback);
      window.clearTimeout(safety);
      b.removeEventListener("timeupdate", onTime);
      b.removeEventListener("ended", goToC);
      b.removeEventListener("error", goToC);
      a.removeEventListener("playing", prefetch);
    };
  }, []);

  return (
    <section id="top" className="relative h-[200svh] md:h-[260vh]">
      <div
        ref={stageRef}
        className="cine-stage sticky top-0 h-svh w-full overflow-hidden"
      >
        {/* on-brand marine gradient — the load + degrade state */}
        <div className="water" aria-hidden />

        <video ref={aRef} className="cine-video" poster="/videos/clip-a-poster.jpg" autoPlay loop muted playsInline preload="auto" aria-hidden>
          <Sources base="clip-a" />
        </video>
        <video ref={bRef} className="cine-video" poster="/videos/clip-b-poster.jpg" muted playsInline preload="none" aria-hidden>
          <Sources base="clip-b" />
        </video>
        <video ref={cRef} className="cine-video" poster="/videos/clip-c-poster.jpg" loop muted playsInline preload="none" aria-hidden>
          <Sources base="clip-c" />
        </video>

        {/* sculpted scrim: top for nav, soft center for the headline */}
        <div className="cine-scrim" aria-hidden />
        {/* film grain unifies video + UI and kills gradient banding */}
        <div className="grain" aria-hidden />

        {/* HERO overlay (over A) */}
        <div
          ref={heroRef}
          className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center text-salt px-6"
        >
          {/* soft pool of contrast behind the centred copy */}
          <div className="hero-veil" aria-hidden />
          <p className="label !text-salt/80 !tracking-[0.32em] sm:!tracking-[0.42em] mb-4 sm:mb-6 hero-text-shadow">
            Aegean Fleur de Sel
          </p>
          <h1 className="serif text-[clamp(2.5rem,8.4vw,6.8rem)] font-medium leading-[1.02] sm:leading-[0.98] text-balance max-w-[12ch] hero-text-shadow">
            A pinch changes everything.
          </h1>
          <p className="text-salt/90 mt-5 sm:mt-7 max-w-[32ch] text-[clamp(0.95rem,2.3vw,1.15rem)] leading-relaxed hero-text-shadow">
            Hand-harvested fleur de sel from the Greek coast.
          </p>
          <p className="label !text-salt/95 !tracking-[0.3em] !text-[0.78rem] mt-5 sm:mt-7 hero-text-shadow">
            First Harvest · {PRODUCT.priceDisplay}
          </p>
          <div className="mt-6">
            <ReserveButton
              source="hero"
              variant="ink"
              label="Reserve the First Harvest"
              showPrice={false}
              className="shadow-[0_14px_44px_-16px_rgba(11,27,51,0.75)]"
            />
          </div>
        </div>

        {/* scroll cue — a single quiet line that draws downward, no label */}
        <div
          ref={cueRef}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10"
          aria-hidden
        >
          <span className="scroll-line" />
        </div>

        {/* PRODUCT overlay (over C) — sparse; jar stays the focus */}
        <div
          ref={productRef}
          className="absolute inset-0 z-10 cine-fade"
          style={{ opacity: 0 }}
        >
          {/* lower-third contrast vignette — anchors the copy below the jar */}
          <div className="cine-product-scrim" aria-hidden />
          <div className="absolute inset-x-0 bottom-0 flex flex-col items-center gap-4 pb-[7vh] sm:pb-[8vh] px-6 text-center">
            <p className="label !text-salt/85 !tracking-[0.3em] hero-text-shadow">
              First Harvest · {PRODUCT.priceDisplay}
            </p>
            <ReserveButton
              source="product_overlay"
              variant="cream"
              label="Reserve the First Harvest"
              showPrice={false}
              className="shadow-[0_14px_44px_-16px_rgba(11,27,51,0.55)]"
            />
          </div>
        </div>
      </div>

      {/* push-in trigger — entering the top of the viewport starts CLIP_B */}
      <div ref={sentinelRef} className="absolute top-[80svh] h-px w-full" aria-hidden />
    </section>
  );
}
