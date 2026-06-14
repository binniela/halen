"use client";

import { useEffect, useRef } from "react";
import { track, type FunnelEvent } from "@/lib/analytics";

/**
 * Zero-layout sentinel that fires a funnel event once, the first time it scrolls
 * into view. Drop it at the top of any section you want to count as "viewed".
 */
export default function TrackOnView({
  event,
  threshold = 0,
}: {
  event: FunnelEvent;
  threshold?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let done = false;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !done) {
          done = true;
          track(event);
          io.disconnect();
        }
      },
      { threshold, rootMargin: "0px 0px -20% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [event, threshold]);

  // Needs measurable area or IntersectionObserver never reports intersection.
  return <span ref={ref} aria-hidden className="block h-px w-full" />;
}
