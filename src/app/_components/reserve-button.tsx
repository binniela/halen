"use client";

import { track } from "@/lib/analytics";
import { openReservation } from "@/lib/reserve";
import { PRODUCT } from "@/lib/site";

type Variant = "glass" | "ink" | "sticky" | "cream";

/**
 * The single primary CTA, used everywhere. Always carries the price (the whole
 * test hinges on price being visible at the point of action), fires the
 * reserve_cta_clicked funnel event with its source, then opens the shared modal.
 */
export default function ReserveButton({
  source,
  label = "Reserve the First Harvest",
  variant = "ink",
  showPrice = true,
  className = "",
}: {
  source: string;
  label?: string;
  variant?: Variant;
  showPrice?: boolean;
  className?: string;
}) {
  const onClick = () => {
    track("reserve_cta_clicked", { source, variant });
    openReservation(source);
  };

  return (
    <button
      type="button"
      onClick={onClick}
      data-cta="reserve"
      className={`cta-reserve--${variant} tap ${className}`}
    >
      <span>{label}</span>
      {showPrice && (
        <>
          <span className="cta-sep" aria-hidden>
            —
          </span>
          <span className="cta-price">{PRODUCT.priceDisplay}</span>
        </>
      )}
      <span className="cta-arrow" aria-hidden>
        →
      </span>
    </button>
  );
}
