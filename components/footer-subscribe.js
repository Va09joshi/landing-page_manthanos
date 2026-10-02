"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowRight, Check, LoaderCircle, Mail } from "lucide-react";
import { api } from "../lib/api";

export function FooterSubscribe() {
  const [email, setEmail] = useState("");
  const [state, setState] = useState("idle");
  const [message, setMessage] = useState("");

  async function submit(event) {
    event.preventDefault();
    if (state === "loading" || state === "done") return;
    setState("loading");
    try {
      await api.lead({ email: email.trim(), source: "newsletter" });
      setState("done");
      setMessage("You're on the list. Look out for our next update.");
      setEmail("");
    } catch (error) {
      setState("error");
      setMessage(error?.message && !/not configured/i.test(error.message) ? error.message : "That didn't go through. Please try again in a moment.");
    }
  }

  return (
    <div>
      <div role="status" aria-live="polite" aria-atomic="true">
        {state === "done" && (
          <p className="flex min-h-[56px] items-center gap-3 rounded-xl border border-white/25 bg-white/10 px-4 py-3 text-[14px] leading-5 text-white"><Check aria-hidden="true" size={20} className="shrink-0" />{message}</p>
        )}
      </div>
      {state !== "done" && (
        <form onSubmit={submit} aria-label="Subscribe to product updates" aria-busy={state === "loading"}>
          <div className="flex flex-col gap-2 rounded-[14px] border border-white/30 bg-white/10 p-1.5 shadow-[inset_0_1px_0_rgba(255,255,255,.05)] focus-within:border-white/80 min-[480px]:flex-row min-[480px]:items-center">
            <div className="flex min-w-0 flex-1 items-center gap-3 pl-3">
              <Mail aria-hidden="true" size={18} className="shrink-0 text-white/80" />
              <label htmlFor="footer-email" className="sr-only">Email address</label>
              <input id="footer-email" name="email" type="email" required autoComplete="email" disabled={state === "loading"} aria-invalid={state === "error" || undefined} aria-describedby={state === "error" ? "footer-subscribe-error" : undefined} value={email} onChange={(event) => { setEmail(event.target.value); if (state === "error") setState("idle"); }} placeholder="Enter your email" className="h-11 min-w-0 w-full rounded-sm bg-transparent pr-2 text-[14px] text-white placeholder:text-white/80 focus:outline-none focus-visible:outline-2 focus-visible:outline-white disabled:opacity-70" />
            </div>
            <button type="submit" disabled={state === "loading"} className="group inline-flex h-11 shrink-0 items-center justify-center gap-2.5 rounded-[10px] bg-white px-5 text-[13px] font-semibold text-ink-900 shadow-sm transition-colors hover:bg-mist focus-visible:outline-white disabled:cursor-wait disabled:opacity-75">
              {state === "loading" ? "Subscribing…" : "Subscribe"}
              {state === "loading" ? <LoaderCircle aria-hidden="true" size={16} className="animate-spin motion-reduce:animate-none" /> : <ArrowRight aria-hidden="true" size={16} className="transition-transform group-hover:translate-x-0.5 motion-reduce:transform-none" />}
            </button>
          </div>
          {state === "error" && <p id="footer-subscribe-error" role="alert" className="mt-3 text-[13px] leading-5 text-white">{message}</p>}
        </form>
      )}
      <p className="mt-3 text-[12px] leading-5 text-white/85">Unsubscribe anytime.{" "}<Link href="/privacy" className="rounded-sm underline decoration-white/45 underline-offset-2 transition-colors hover:text-white focus-visible:outline-white">Privacy policy</Link></p>
    </div>
  );
}
