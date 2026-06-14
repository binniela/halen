"use client";

import { useEffect, useState } from "react";

/**
 * A hairline at the very top that fills as you read the target element.
 * Transform-only (GPU), tracks scroll 1:1 — no library, no layout work.
 */
export default function ReadingProgress({ targetId }: { targetId: string }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const el = document.getElementById(targetId);
    if (!el) return;

    let raf = 0;
    const measure = () => {
      raf = 0;
      const rect = el.getBoundingClientRect();
      const distance = el.offsetHeight - window.innerHeight;
      const p = distance <= 0 ? 1 : Math.min(1, Math.max(0, -rect.top / distance));
      setProgress(p);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(measure);
    };

    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, [targetId]);

  return (
    <div
      className="reading-progress"
      style={{ transform: `scaleX(${progress})` }}
      role="progressbar"
      aria-label="Reading progress"
      aria-valuenow={Math.round(progress * 100)}
      aria-valuemin={0}
      aria-valuemax={100}
    />
  );
}
