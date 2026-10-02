"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Reveal } from "./ui";

/* ---------------------------------------------------------------------------
   FINAL CTA

   Pattern   A conclusion, not another feature. One headline, one supporting
              sentence, one button. Nothing else competes for attention.
   Tone      Calm and confident. This is the last thing a visitor sees, so it
              resolves rather than sells.
   Colour    The site's one earned blue radial illumination. Nowhere else on
              the page is a glow this generous.
   Visual    A small product fragment, not a new illustration. Reusing the
              workspace language keeps the ending inside the product.
   ------------------------------------------------------------------------- */

const ready = [
  ["Projects", "live"],
  ["Clients", "live"],
  ["Meetings", "ok"],
  ["AI summary", "idle"],
];

const readyDot = {
  ok: "bg-status-green",
  live: "bg-royal-400",
  idle: "bg-white/20",
};

export function ClosingCTA() {
  const reduced = useReducedMotion();

  return (
    <section className="band-dark relative overflow-hidden">
      {/* Ambient first, lattice on top: light under texture, never over it. */}
      <div aria-hidden className="pointer-events-none absolute inset-0 ambient-deep" />

      <div className="shell relative">
        <div className="border-t border-white/[.08] pb-24 pt-24 lg:pb-32 lg:pt-32">
          <div className="mx-auto max-w-[640px] text-center">
            <Reveal>
              <h2 className="text-[clamp(28px,4vw,48px)] font-semibold leading-[1.06] text-white">
                Bring the work you are actually doing.
              </h2>
            </Reveal>

            <Reveal delay={0.08}>
              <p className="lede mx-auto mt-6 max-w-[46ch]">
                Show us one live project. We will map it against the workspace and
                show you exactly where the context is getting lost.
              </p>
            </Reveal>

            <Reveal delay={0.16}>
              <div className="mt-10 flex justify-center">
                <Link
                  href="/request-demo"
                  className="group inline-flex h-[52px] items-center gap-2 rounded-[10px] bg-royal-500 px-8 text-[15px] font-medium text-white border border-royal-400/40 shadow-[0_6px_20px_-8px_rgba(36,95,245,.7)] transition-all hover:bg-royal-400 hover:shadow-[0_10px_30px_-8px_rgba(36,95,245,.85)]"
                >
                  Book a demo
                  <ArrowUpRight
                    size={16}
                    className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  />
                </Link>
              </div>
            </Reveal>
          </div>

          {/* A small, quiet product fragment beneath the CTA. */}
          <motion.div
            initial={reduced ? false : { opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="mx-auto mt-16 max-w-[560px]"
          >
            <div className="ui-window">
              <div className="flex items-center gap-3 border-b border-white/[.07] px-4 py-3">
                <span className="mono-label text-white/25">ManthanOS</span>
                <span className="ml-auto font-mono text-[10px] text-status-green/80">
                  Workspace ready
                </span>
              </div>
              <ul className="grid grid-cols-2 gap-px bg-white/[.07] sm:grid-cols-4">
                {ready.map(([label, tone]) => (
                  <li key={label} className="bg-ink-850 px-4 py-4">
                    <span className={`mb-2.5 block h-1.5 w-1.5 rounded-full ${readyDot[tone]}`} aria-hidden />
                    <span className="text-[12.5px] text-chalk-dim">{label}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
