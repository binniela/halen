/**
 * Reservation event bus. Any CTA anywhere on the page calls openReservation()
 * to summon the single, shared reservation modal — so the funnel has exactly
 * one form, regardless of which CTA was clicked.
 */
export const RESERVE_EVENT = "halen:open-reservation";

export function openReservation(source: string) {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent(RESERVE_EVENT, { detail: { source } }));
}
