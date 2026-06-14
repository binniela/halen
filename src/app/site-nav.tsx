"use client";

import { useEffect, useRef } from "react";

/**
 * Deliberate two-state nav:
 *  - over the cinematic film  -> white type, no chrome
 *  - over the editorial body  -> ink type, translucent salt blur + hairline
 * Driven by the native scroll event (rAF-throttled). State is applied via
 * inline style so it can't lose a Tailwind layer-cascade fight.
 */
export default function SiteNav() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const nav = ref.current!;
    const marker = document.getElementById("cine-end");
    const inks = () => nav.querySelectorAll<HTMLElement>(".nav-ink");
    let solid: boolean | null = null;

    const setSolid = (s: boolean) => {
      if (s === solid) return;
      solid = s;
      nav.style.background = s ? "rgba(252,253,253,0.72)" : "transparent";
      const blur = s ? "saturate(1.1) blur(14px)" : "none";
      nav.style.backdropFilter = blur;
      nav.style.setProperty("-webkit-backdrop-filter", blur);
      nav.style.borderBottomColor = s
        ? "rgba(22,38,63,0.10)"
        : "transparent";
      inks().forEach((e) => (e.style.color = s ? "#16263f" : "#fcfdfd"));
    };

    const apply = () =>
      setSolid(
        marker
          ? marker.getBoundingClientRect().top <= 72
          : window.scrollY > window.innerHeight
      );

    apply();

    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        ticking = false;
        apply();
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <header
      ref={ref}
      className="site-nav fixed top-0 inset-x-0 z-50"
      style={{ borderBottom: "1px solid transparent" }}
    >
      <nav className="mx-auto max-w-[1400px] px-7 md:px-14 h-16 md:h-20 flex items-center justify-between">
        <a href="#top" className="serif text-2xl tracking-tight nav-ink tap">
          Halen
        </a>
        <ul className="flex items-center gap-7 md:gap-12 label nav-ink">
          <li className="hidden sm:block">
            <a href="#salt" className="nav-link tap">The Salt</a>
          </li>
          <li className="hidden sm:block">
            <a href="#ritual" className="nav-link tap">Ritual</a>
          </li>
          <li className="hidden sm:block">
            <a href="/journal" className="nav-link tap">Journal</a>
          </li>
          <li>
            <a href="#shop" className="nav-link tap">Reserve</a>
          </li>
        </ul>
      </nav>
    </header>
  );
}
