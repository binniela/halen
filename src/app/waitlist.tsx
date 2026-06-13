"use client";

import { useState } from "react";

/**
 * Pre-launch reservation capture. Honest conversion path for a brand whose
 * first harvest hasn't shipped yet — no fake checkout. Client-side validation
 * + success state; wire `submit` to a list provider (Klaviyo/Mailchimp) on deploy.
 */
export default function Waitlist() {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "error" | "done">("idle");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
    if (!ok) {
      setState("error");
      return;
    }
    // TODO(deploy): POST email to the mailing-list provider here.
    setState("done");
  };

  if (state === "done") {
    return (
      <p
        className="serif italic text-[clamp(1.4rem,3.6vw,1.9rem)] text-ink leading-snug max-w-[28ch]"
        aria-live="polite"
      >
        You&rsquo;re on the list. We&rsquo;ll write once the first jars are sealed.
      </p>
    );
  }

  return (
    <form onSubmit={submit} noValidate className="w-full">
      <label htmlFor="reserve-email" className="sr-only">
        Email address
      </label>
      <div className="flex items-end gap-4 border-b border-ink/25 focus-within:border-ink/60 transition-colors">
        <input
          id="reserve-email"
          type="email"
          inputMode="email"
          autoComplete="email"
          placeholder="you@email.com"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (state === "error") setState("idle");
          }}
          aria-invalid={state === "error"}
          className="flex-1 min-w-0 bg-transparent outline-none py-3 text-ink placeholder:text-ink-faint/70"
        />
        <button
          type="submit"
          className="label !text-ink shrink-0 pb-3 !tracking-[0.24em] transition-opacity duration-300 hover:opacity-55"
        >
          Reserve →
        </button>
      </div>
      <p
        className="label !text-[0.62rem] !tracking-[0.22em] mt-4"
        aria-live="polite"
      >
        {state === "error"
          ? "Please enter a valid email."
          : "No payment now. One quiet note when the first harvest is ready."}
      </p>
    </form>
  );
}
