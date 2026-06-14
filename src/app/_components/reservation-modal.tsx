"use client";

import { useEffect, useRef, useState } from "react";
import { track } from "@/lib/analytics";
import { RESERVE_EVENT } from "@/lib/reserve";
import { PRODUCT } from "@/lib/site";

/**
 * The one reservation form on the page, summoned by any CTA. Email only — every
 * extra field would cost completion, and completion IS the signal we're testing.
 * Fires the back half of the funnel: opened → started (first keystroke) →
 * submitted. No payment is taken; this is an honest pre-launch reservation.
 */
export default function ReservationModal() {
  const [open, setOpen] = useState(false);
  const [source, setSource] = useState("unknown");
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "error" | "done">("idle");
  const started = useRef(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Listen for any CTA opening the modal.
  useEffect(() => {
    const onOpen = (e: Event) => {
      const detail = (e as CustomEvent).detail as { source?: string };
      setSource(detail?.source ?? "unknown");
      setEmail("");
      setState("idle");
      started.current = false;
      setOpen(true);
    };
    window.addEventListener(RESERVE_EVENT, onOpen);
    return () => window.removeEventListener(RESERVE_EVENT, onOpen);
  }, []);

  // Open side-effects: track, lock scroll, focus, ESC to close.
  useEffect(() => {
    if (!open) return;
    track("reservation_form_opened", { source });
    const root = document.documentElement;
    const prev = root.style.overflow;
    root.style.overflow = "hidden";
    const focusT = window.setTimeout(() => inputRef.current?.focus(), 60);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      root.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
      window.clearTimeout(focusT);
    };
  }, [open, source]);

  const onFirstInput = () => {
    if (!started.current) {
      started.current = true;
      track("reservation_form_started", { source });
    }
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
    if (!ok) {
      setState("error");
      return;
    }
    track("reservation_form_submitted", { source });
    // TODO(deploy): POST email to the list provider (Klaviyo/Mailchimp) here.
    setState("done");
  };

  if (!open) return null;

  return (
    <div
      className="reserve-modal"
      role="dialog"
      aria-modal="true"
      aria-label="Reserve the first harvest"
    >
      <div className="reserve-backdrop" onClick={() => setOpen(false)} aria-hidden />
      <div className="reserve-card">
        <button
          type="button"
          className="reserve-close tap"
          onClick={() => setOpen(false)}
          aria-label="Close"
        >
          ×
        </button>

        {state === "done" ? (
          <div className="reserve-done">
            <p className="label mb-5">You&rsquo;re on the list</p>
            <p className="serif italic text-[clamp(1.6rem,5vw,2.2rem)] text-ink leading-snug">
              We&rsquo;ll write the moment reservations open — first access,
              before anyone else.
            </p>
            <p className="text-ink-soft text-[0.92rem] mt-6 max-w-[40ch]">
              No payment was taken. The inaugural harvest is small, and your place
              is held.
            </p>
          </div>
        ) : (
          <>
            <p className="label mb-6">The First Harvest</p>
            <h2 className="serif text-[clamp(1.9rem,5.5vw,2.7rem)] text-ink leading-[1.06] max-w-[16ch]">
              The first harvest is coming soon.
            </h2>
            <p className="text-ink-soft mt-5 max-w-[42ch]">
              We are preparing our inaugural harvest of {PRODUCT.priceDisplay}{" "}
              fleur de sel. Join the list and you&rsquo;ll receive first access
              the moment reservations officially open.
            </p>

            <form onSubmit={submit} noValidate className="mt-8">
              <label htmlFor="reserve-modal-email" className="sr-only">
                Email address
              </label>
              <div className="flex items-end gap-4 border-b border-ink/25 focus-within:border-ink/70 transition-colors">
                <input
                  ref={inputRef}
                  id="reserve-modal-email"
                  type="email"
                  inputMode="email"
                  autoComplete="email"
                  placeholder="you@email.com"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    onFirstInput();
                    if (state === "error") setState("idle");
                  }}
                  aria-invalid={state === "error"}
                  className="flex-1 min-w-0 bg-transparent outline-none py-3 text-ink placeholder:text-ink-faint/70 text-lg"
                />
                <button type="submit" className="reserve-submit tap">
                  Reserve →
                </button>
              </div>
              <p className="label !text-[0.62rem] !tracking-[0.2em] mt-4" aria-live="polite">
                {state === "error"
                  ? "Please enter a valid email."
                  : "No payment now. One quiet note when reservations open."}
              </p>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
