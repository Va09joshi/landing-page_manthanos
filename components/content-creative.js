"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { Reveal, StatusPill } from "./ui";

/* ---------------------------------------------------------------------------
   CONTENT & CREATIVE WORK

   Pattern   B, set as an editorial spread. A LARGE content interface sits
              centre-left at full width, with the argument set in a narrow
              column to its right. Asymmetric, not a centred stack.
   Story     idea -> creation -> review -> delivery, drawn as a single
              horizontal track with a marker per stage.
   Accent    Orange is used for ONE thing only: the creative stage marker and
              the idea state. Everywhere else the section is blue and neutral.
   3D        A small stylised "content block" mark sits beside the copy. It is
              a stack of layered sheets — the shape of a draft, not a camera.
              No camera icon: this product is not a media editor.
   ------------------------------------------------------------------------- */

/* The four stages creative work actually moves through. `color` is the single
   value the stage rule and its label both read from, so they can never drift
   apart. Orange appears here and nowhere else in this section. */
const stages = [
  { id: "idea", label: "Idea", color: "#F97316", note: "An angle with a channel and an owner." },
  { id: "creation", label: "Creation", color: "#4B82F2", note: "Drafts and versions beside the work." },
  { id: "review", label: "Review", color: "#FBBF24", note: "Approval is a phase, not a message." },
  { id: "delivery", label: "Delivery", color: "#34D399", note: "Scheduled, then measured on the record." },
];

const documents = [
  { title: "Launch script — draft v2", meta: "Edited 20 min ago", tone: "idea", stage: "Creation" },
  { title: "Hero visual set", meta: "3 versions · awaiting review", tone: "warn", stage: "Review" },
  { title: "Launch email copy", meta: "Approved · scheduled", tone: "ok", stage: "Delivery" },
];

export function ContentCreative() {
  const reduced = useReducedMotion();

  return (
    <section className="band-deep relative z-20">
      {/* Seam blend: soften the hard step from the previous (ink-900) band
          into this ink-800 band so there is no sharp dividing line. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[160px]"
        style={{
          background: "linear-gradient(to bottom, #0A101C 0%, rgba(10,16,28,0) 100%)",
        }}
      />
      {/* Keep the section texture clipped without clipping the seam artwork. */}
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 ambient-soft" />
        <div className="absolute inset-0 mesh-dark opacity-40" />
      </div>

      {/* The robot is the source of the system below it. This cable makes that
          relationship physical instead of leaving the illustration floating
          above an unrelated interface. It lives on the quiet right side so it
          never crosses the argument or reduces legibility. */}
      <div
        aria-hidden="true"
        className="robot-signal-wire pointer-events-none absolute right-[8vw] top-[clamp(520px,43vw,650px)] z-30 hidden h-[260px] w-[150px] lg:block"
      >
        <svg viewBox="0 0 320 560" fill="none" className="h-full w-full overflow-visible">
          <defs>
            <filter id="wire-glow" x="-80%" y="-20%" width="260%" height="140%">
              <feGaussianBlur stdDeviation="7" result="blur" />
              <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
            <linearGradient id="wire-blue" x1="154" y1="0" x2="171" y2="520" gradientUnits="userSpaceOnUse">
              <stop stopColor="#9CC0FF" />
              <stop offset=".45" stopColor="#245FF5" />
              <stop offset="1" stopColor="#4B82F2" />
            </linearGradient>
          </defs>
          <path d="M156 6 C154 118 280 124 260 232 C240 343 72 318 85 435 C91 485 154 480 163 526" stroke="#071120" strokeWidth="18" strokeLinecap="round" />
          <path d="M156 6 C154 118 280 124 260 232 C240 343 72 318 85 435 C91 485 154 480 163 526" stroke="url(#wire-blue)" strokeWidth="7" strokeLinecap="round" filter="url(#wire-glow)" />
          <path d="M156 6 C154 118 280 124 260 232 C240 343 72 318 85 435 C91 485 154 480 163 526" stroke="white" strokeOpacity=".62" strokeWidth="1.5" strokeLinecap="round" />
          <g transform="translate(129 0)">
            <rect width="54" height="25" rx="8" fill="#0B1423" stroke="#F97316" strokeOpacity=".8" strokeWidth="2" />
            <rect x="10" y="6" width="34" height="7" rx="3.5" fill="#F97316" />
          </g>
          <g transform="translate(133 520)">
            <rect width="62" height="24" rx="8" fill="#0B1423" stroke="#4B82F2" strokeWidth="2" />
            <path d="M10 24h42l8 16H2l8-16Z" fill="#101A2B" stroke="#4B82F2" strokeOpacity=".75" />
            <circle cx="31" cy="12" r="4" fill="#F97316" />
          </g>
        </svg>
      </div>

      <div className="shell relative band-pad !pt-[clamp(82px,8vw,128px)]">
        {/* ---- Header follows the seam illustration composition ---------- */}
        <div className="relative grid min-h-[clamp(500px,43vw,640px)] items-center gap-8 lg:grid-cols-[minmax(0,.8fr)_minmax(620px,1.2fr)] lg:gap-0">
            <div className="relative z-20 max-w-[610px] py-6 lg:py-14">
              <p className="eyebrow">Content &amp; creative work</p>
              <h2 className="creative-heading mt-7 max-w-[13ch] text-balance font-semibold text-white">
                A draft, a review and a delivery that all live on one record.
              </h2>
              <p className="lede mt-8 max-w-[39ch]">
                Creative work in a team usually dies in the gap between the draft
                and the approval. Here the draft, the feedback and the sign-off
                are the same object — so nothing gets lost in a folder called
                final_v3.
              </p>
            </div>
          <div aria-hidden="true" className="relative z-10 -mx-5 self-center sm:mx-auto sm:w-[min(94vw,880px)] lg:absolute lg:-right-[7vw] lg:top-[34%] lg:w-[min(72vw,1160px)] lg:-translate-y-[62%]">
            <div className="absolute bottom-[1%] left-1/2 h-[12%] w-[78%] -translate-x-1/2 rounded-[50%] bg-black/75 blur-[32px] sm:blur-[48px]" />
            <Image
              src="/illustrations/ChatGPT Image Oct 2, 2026, 11_20_25 PM.png"
              alt=""
              width={1672}
              height={941}
              priority
              sizes="(max-width: 1023px) 94vw, 1040px"
              className="relative h-auto w-full drop-shadow-[0_38px_34px_rgba(2,6,15,.76)]"
            />
          </div>
        </div>

        <div
          aria-hidden="true"
          className="mt-8 flex items-center justify-center gap-3 sm:mt-10"
        >
          <span className="h-px w-10 bg-white/[.12] sm:w-14" />
          <span className="h-1 w-1 shrink-0 rounded-full bg-royal-400/80" />
          <span className="font-mono text-[9px] uppercase tracking-[.18em] text-white/30">
            Creative flow
          </span>
          <span className="h-1 w-1 shrink-0 rounded-full bg-royal-400/80" />
          <span className="h-px w-10 bg-white/[.12] sm:w-14" />
        </div>

        {/* ---- One tabbed workflow surface: navigation and detail share a
            single frame, so the relationship reads immediately. ---------- */}
        <Reveal delay={0.1} className="mt-14 sm:mt-20">
          <div className="overflow-hidden rounded-[24px] border border-white/[.13] bg-[#101a2b] shadow-[0_34px_80px_-28px_rgba(0,0,0,.95),0_12px_30px_-20px_rgba(59,130,246,.24),inset_0_1px_0_rgba(255,255,255,.08)] sm:rounded-[32px]">
            <ol className="grid grid-cols-2 border-b border-white/[.11] bg-[#0b1423] shadow-[0_16px_30px_-20px_rgba(0,0,0,.95)] sm:grid-cols-4">
              {stages.map((stage, index) => {
                const active = index === 0;
                return (
                  <li
                    key={stage.id}
                    className={`relative min-h-[76px] border-white/[.1] px-4 py-5 sm:min-h-[88px] sm:px-7 ${
                      index % 2 ? "" : "border-r"
                    } ${index > 1 ? "border-t sm:border-t-0" : ""} ${
                      index < stages.length - 1 ? "sm:border-r" : ""
                    } ${active ? "bg-[#16243a] shadow-[inset_0_12px_24px_-20px_rgba(255,255,255,.28)]" : ""}`}
                  >
                    <div className="flex items-baseline gap-3">
                      <span
                        className="font-mono text-[10px] font-semibold tabular-nums"
                        style={{ color: active ? stage.color : "rgba(255,255,255,.28)" }}
                      >
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <p className={`text-[14px] font-semibold sm:text-[16px] ${active ? "text-white" : "text-white/55"}`}>
                        {stage.label}
                      </p>
                    </div>
                    <span
                      className="absolute inset-x-0 top-0 h-[2px]"
                      style={{ background: stage.color, opacity: active ? 1 : 0.55 }}
                      aria-hidden
                    />
                    {active && (
                      <span
                        aria-hidden
                        className="absolute -bottom-2 left-8 h-4 w-4 rotate-45 shadow-[4px_4px_10px_rgba(0,0,0,.35)] sm:left-10"
                        style={{ background: stage.color }}
                      />
                    )}
                  </li>
                );
              })}
            </ol>

            <div className="bg-[radial-gradient(circle_at_22%_0%,rgba(66,120,190,.14),transparent_42%)] px-5 pb-6 pt-14 shadow-[inset_0_18px_34px_-28px_rgba(0,0,0,.95),inset_0_-24px_40px_-34px_rgba(255,255,255,.18)] sm:px-12 sm:pb-12 sm:pt-16 lg:px-16">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <span className="inline-flex h-8 min-w-8 items-center justify-center rounded-full border border-orange-300/15 bg-orange-300/[.08] px-2 font-mono text-[10px] font-semibold text-orange-300">
                    1/4
                  </span>
                  <span className="font-mono text-[10px] uppercase tracking-[.18em] text-orange-300">
                    Idea phase
                  </span>
                </div>
                <StatusPill tone="live">In creation</StatusPill>
              </div>

              <h3 className="mt-7 max-w-[24ch] text-[clamp(25px,3.2vw,43px)] font-medium leading-[1.08] tracking-[-.035em] text-white">
                Capture the angle before production begins.
              </h3>

              <ul className="mt-9 border-t border-white/[.1] sm:mt-12">
                {documents.map((doc, index) => (
                  <motion.li
                    key={doc.title}
                    initial={reduced ? false : { opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.4 }}
                    transition={{ duration: 0.45, delay: 0.08 + index * 0.08 }}
                    className="grid gap-4 border-b border-white/[.1] py-5 sm:grid-cols-[minmax(0,1fr)_minmax(240px,1.35fr)_auto] sm:items-center sm:py-6"
                  >
                    <div className="min-w-0">
                      <p className="truncate text-[14.5px] font-medium text-white">{doc.title}</p>
                      <p className="mt-1 truncate text-[12.5px] text-[#8cbcff]">{doc.meta}</p>
                    </div>
                    <p className="hidden text-[13px] leading-6 text-white/48 sm:block">{stages[index].note}</p>
                    <StatusPill tone={doc.tone} className="w-fit">
                      {doc.tone === "ok" ? "Delivered" : doc.tone === "warn" ? "Review" : "Draft"}
                    </StatusPill>
                  </motion.li>
                ))}
              </ul>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
