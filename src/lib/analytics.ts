/**
 * Lightweight, provider-agnostic funnel tracking for the demand-validation test.
 *
 * The whole point of this page is the funnel below — wire ONE of these providers
 * and every step is captured automatically:
 *   - Google Tag Manager / GA4  → reads window.dataLayer (pushed here)
 *   - GA4 gtag.js               → window.gtag(...)
 *   - Plausible                 → window.plausible(...)
 *
 * No provider is bundled (keeps the page fast and privacy-clean). Until one is
 * connected the events still fire to window.dataLayer + a CustomEvent, so they
 * can be inspected in the console or piped anywhere.
 */

export type FunnelEvent =
  | "hero_viewed"
  | "product_viewed"
  | "reserve_cta_clicked"
  | "reservation_form_opened"
  | "reservation_form_started"
  | "reservation_form_submitted";

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
    gtag?: (...args: unknown[]) => void;
    plausible?: (event: string, opts?: { props?: Record<string, unknown> }) => void;
  }
}

export function track(event: FunnelEvent, props: Record<string, unknown> = {}) {
  if (typeof window === "undefined") return;
  const payload = { event, ...props, ts: Date.now() };

  (window.dataLayer ||= []).push(payload);
  window.gtag?.("event", event, props);
  window.plausible?.(event, { props });
  window.dispatchEvent(new CustomEvent("halen:funnel", { detail: payload }));

  if (process.env.NODE_ENV !== "production") {
    console.debug("%c[funnel]", "color:#46b6c4", event, props);
  }
}
