"use client";

import { useEffect, useState } from "react";
import ReserveButton from "./reserve-button";
import { PRODUCT } from "@/lib/site";

/**
 * Persistent mobile CTA. 80% of visitors are on phones, so the price + action
 * must never be more than a thumb away. Appears once the hero is scrolled past,
 * hides again over the final reserve section (where the CTA is already present).
 */
export default function StickyCta() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const reserve = document.getElementById("shop");
    let raf = 0;
    const update = () => {
      raf = 0;
      const pastHero = window.scrollY > window.innerHeight * 0.85;
      const atReserve =
        reserve != null &&
        reserve.getBoundingClientRect().top < window.innerHeight * 0.9;
      setShow(pastHero && !atReserve);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div className={`sticky-cta sm:hidden ${show ? "is-visible" : ""}`} aria-hidden={!show}>
      <div className="sticky-cta-meta">
        <span className="serif text-ink text-[1.05rem] leading-none">Halen Fleur de Sel</span>
        <span className="label !text-ink-faint !text-[0.6rem] mt-1">
          First Harvest · {PRODUCT.priceDisplay}
        </span>
      </div>
      <ReserveButton source="sticky_bar" variant="sticky" label="Reserve" showPrice={false} />
    </div>
  );
}
