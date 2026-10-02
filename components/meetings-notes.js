"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Reveal, StatusPill, UiWindow } from "./ui";

/* ---------------------------------------------------------------------------
   MEETINGS & NOTES

   Pattern   J — a human-centred scene on one side, the REAL meeting interface
              on the other. The first section on the site where a person
              appears, because the point of this feature is that people meet.
   Story     meeting -> notes -> decisions -> actions.
   Accent    Coral, used sparingly and only on the human/communication layer.
              This section is deliberately warmer than the dashboard sections
              around it.

   The illustration is an abstract, stylised two-person scene — no faces, no
   stock photography, no attempt at realism. It carries "two people in a
   conversation" and nothing more, so the product UI stays the hero.
   ------------------------------------------------------------------------- */

/* Three lines of what a real kickoff actually contains. Generic statements
   rather than invented dialogue, so nothing here reads as a fabricated quote. */
const transcript = [
  "We should lock the script before the edit starts.",
  "Three thumbnail options, then we review together.",
  "Publishing stays on the launch date.",
];

/* What the meeting produced, read left to right under the transcript. */
const notes = [
  { label: "Notes captured", value: "Live transcript" },
  { label: "Decisions", value: "3 recorded" },
  { label: "Actions", value: "4 became tasks" },
];
/* A soft, abstract conversation scene. Two overlapping speech volumes and a
   shared surface. Abstract on purpose: the people are context, the product is
   the subject. */
function MeetingScene() {
  return (
    <div
      className="relative mx-auto aspect-square w-full max-w-[320px]"
      role="img"
      aria-label="An abstract illustration of two people in conversation, with notes being captured"
    >
      {/* Warm coral source, low contrast, behind the figures */}
      <div
        aria-hidden
        className="absolute inset-0 rounded-full opacity-40 blur-[60px]"
        style={{ background: "radial-gradient(circle at 50% 55%, rgba(251,113,133,.20), transparent 68%)" }}
      />

      <svg viewBox="0 0 320 320" className="relative h-full w-full" fill="none">
        <defs>
          <linearGradient id="figA" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#2b3a52" />
            <stop offset="100%" stopColor="#18202f" />
          </linearGradient>
          <linearGradient id="figB" x1="1" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#243247" />
            <stop offset="100%" stopColor="#141b27" />
          </linearGradient>
          <linearGradient id="desk" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#1d2736" />
            <stop offset="100%" stopColor="#131a26" />
          </linearGradient>
        </defs>

        {/* Figure left */}
        <g>
          <circle cx="108" cy="118" r="30" fill="url(#figA)" />
          <path
            d="M60 268c0-30 21-54 48-54s48 24 48 54z"
            fill="url(#figA)"
          />
        </g>

        {/* Figure right, slightly behind — depth without a busy scene */}
        <g opacity="0.9">
          <circle cx="212" cy="126" r="26" fill="url(#figB)" />
          <path d="M172 268c0-26 18-47 40-47s40 21 40 47z" fill="url(#figB)" />
        </g>

        {/* Shared surface — the notes being captured between them */}
        <rect
          x="104"
          y="196"
          width="112"
          height="76"
          rx="10"
          fill="url(#desk)"
          stroke="rgba(255,255,255,.10)"
        />
        <rect x="118" y="212" width="60" height="4" rx="2" fill="rgba(111,161,255,.55)" />
        <rect x="118" y="226" width="84" height="4" rx="2" fill="rgba(255,255,255,.14)" />
        <rect x="118" y="240" width="52" height="4" rx="2" fill="rgba(255,255,255,.10)" />
        <circle cx="196" cy="252" r="9" fill="rgba(251,113,133,.22)" stroke="rgba(251,113,133,.55)" />

        {/* Live capture indicator */}
        <circle cx="160" cy="60" r="5" fill="#FB7185" />
        <circle cx="160" cy="60" r="10" fill="#FB7185" opacity="0.22" />
      </svg>
    </div>
  );
}

export function MeetingsNotes() {
  const reduced = useReducedMotion();

  return (
    <section className="band-surface relative overflow-hidden">
      {/* ambient-soft: already high on the ladder, a strong pool would stain. */}
      <div aria-hidden className="pointer-events-none absolute inset-0 ambient-soft" />
      <div aria-hidden className="pointer-events-none absolute inset-0 mesh-dark opacity-35" />

      <div className="shell relative band-pad">
        <div className="grid items-center gap-14 lg:grid-cols-[.85fr_1.15fr] lg:gap-20">
          {/* ---- Human side --------------------------------------------- */}
          <div>
            <Reveal>
              <div className="flex justify-center lg:justify-start">
                <MeetingScene />
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="mt-10">
                <p className="eyebrow">Meetings &amp; notes</p>
                <h2 className="mt-5 max-w-[24ch] text-[clamp(26px,3.3vw,42px)] font-semibold leading-[1.08] text-white">
                  The meeting ends. The notes do not have to.
                </h2>
                <p className="lede mt-5 max-w-[46ch]">
                  ManthanOS joins the call, writes the transcript, and turns what
                  was actually decided into tasks with owners — attached to the
                  project the meeting was about.
                </p>
              </div>
            </Reveal>
          </div>

          {/* ---- Product side: the real meeting interface ---------------- */}
          <Reveal delay={0.08}>
            <UiWindow label="Meetings · live room">
              <div className="p-6 sm:p-7">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <p className="mono-label text-white/25">In progress</p>
                    <p className="mt-1.5 text-[17px] font-semibold text-white">
                      Creative sync — launch content
                    </p>
                    <p className="mt-1 text-[13px] text-chalk-dim">
                      Attached to: Product launch — content set
                    </p>
                  </div>
                  <StatusPill tone="meet" dot>Recording</StatusPill>
                </div>

                <div className="mt-7 rounded-[10px] border border-white/[.08] bg-ink-900 p-4">
                  <p className="mono-label text-white/25">Live transcript</p>
                  <ul className="mt-3 space-y-2.5">
                    {transcript.map((line, index) => (
                      <motion.li
                        key={line}
                        initial={reduced ? false : { opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: index * 0.1 }}
                        className="flex gap-3"
                      >
                        <span
                          className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-status-coral/70"
                          aria-hidden
                        />
                        <span className="text-[13.5px] leading-6 text-chalk-dim">{line}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>

                {/* What the meeting produced */}
                <dl className="mt-5 grid gap-px overflow-hidden rounded-[10px] border border-white/[.08] bg-white/[.08] sm:grid-cols-3">
                  {notes.map((item) => (
                    <div key={item.label} className="bg-ink-850 px-4 py-4">
                      <dt className="mono-label text-white/25">{item.label}</dt>
                      <dd className="mt-2 text-[14px] font-medium text-white">{item.value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </UiWindow>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
