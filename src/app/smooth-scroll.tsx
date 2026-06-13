"use client";

import { useEffect } from "react";
import Lenis from "lenis";

/**
 * Momentum scrolling — the buttery, weighted feel of Arc / Apple.
 * Uses real scroll position (not transform), so position:sticky and
 * IntersectionObserver in the cinematic stage keep working untouched.
 * Disabled for prefers-reduced-motion. Exposed on window for anchor jumps.
 */
export default function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({
      lerp: 0.09, // lower = silkier, more weight
      wheelMultiplier: 1,
      smoothWheel: true,
      // native touch scrolling feels better than smoothed touch on phones
      syncTouch: false,
    });

    (window as unknown as { lenis?: Lenis }).lenis = lenis;

    let raf = 0;
    const loop = (t: number) => {
      lenis.raf(t);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    // route in-page anchor clicks through Lenis for a smooth glide
    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement)?.closest?.(
        'a[href^="#"]'
      ) as HTMLAnchorElement | null;
      if (!a) return;
      const id = a.getAttribute("href");
      if (!id || id === "#") return;
      const el = document.querySelector(id);
      if (!el) return;
      e.preventDefault();
      lenis.scrollTo(el as HTMLElement, { offset: -80, duration: 1.4 });
    };
    document.addEventListener("click", onClick);

    return () => {
      document.removeEventListener("click", onClick);
      cancelAnimationFrame(raf);
      lenis.destroy();
      delete (window as unknown as { lenis?: Lenis }).lenis;
    };
  }, []);

  return null;
}
