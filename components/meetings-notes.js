"use client";

import Image from "next/image";
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
/* A friendly video-call scene with a soft ambient glow and grounded shadow. */
function MeetingScene() {
  return (
    <div className="relative mx-auto w-full max-w-[560px] pb-7 lg:mx-0 lg:w-[112%] lg:max-w-[650px] lg:translate-y-8">
      <div
        aria-hidden
        className="absolute inset-x-[12%] bottom-8 h-[40%] rounded-full opacity-60 blur-[64px]"
        style={{ background: "radial-gradient(ellipse, rgba(251,113,133,.16), transparent 68%)" }}
      />
      <div
        aria-hidden
        className="absolute inset-x-[17%] bottom-2 h-8 rounded-[50%] bg-black/70 blur-xl"
      />
      <Image
        src="/illustrations/Friendly 3D Video Meeting Interface.png"
        alt="A friendly 3D video meeting interface with three people on a call"
        width={1448}
        height={1086}
        sizes="(min-width: 1024px) 48vw, 90vw"
        className="relative z-10 h-auto w-full drop-shadow-[0_24px_24px_rgba(0,0,0,0.48)]"
      />
    </div>
  );
}

export function MeetingsNotes() {
  const reduced = useReducedMotion();

  return (
    <section
      className="relative overflow-hidden text-chalk"
      style={{
        background:
          "linear-gradient(168deg, #17233D 0%, #0F1930 26%, #0D1526 52%, #090E19 78%, #070B14 100%)",
      }}
    >
      {/* ---- layered ambient: top sheen + warm coral (human) + cool blue (copy) */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(ellipse 70% 42% at 50% -6%, rgba(120,160,255,0.14), transparent 62%), radial-gradient(ellipse 46% 44% at 22% 48%, rgba(251,113,133,0.15), transparent 68%), radial-gradient(ellipse 58% 52% at 80% 30%, rgba(36,95,245,0.20), transparent 68%), radial-gradient(ellipse 80% 55% at 50% 112%, rgba(2,5,12,0.7), transparent 68%)",
        }}
      />
      {/* faint cool wash so the diagonal never reads flat */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(115deg, rgba(36,95,245,0.08) 0%, transparent 32%, transparent 64%, rgba(251,113,133,0.06) 100%)",
        }}
      />
      <div aria-hidden className="pointer-events-none absolute inset-0 mesh-dark opacity-35" />
      {/* ground the section: soft shade top + vignette bottom, no hard seams */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[140px]"
        style={{ background: "linear-gradient(to bottom, rgba(19,29,48,.85), transparent)" }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[180px]"
        style={{ background: "linear-gradient(to top, rgba(2,5,12,.6), transparent)" }}
      />

      <div className="shell relative band-pad">
        <div>
          {/* ---- Human side --------------------------------------------- */}
          <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_.95fr] lg:gap-20">
            <Reveal>
              <div className="flex justify-center lg:justify-start">
                <MeetingScene />
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="mt-10 lg:mt-0">
                <p className="eyebrow">Meetings &amp; notes</p>
                <h2 className="mt-5 max-w-[24ch] text-[clamp(30px,3.6vw,48px)] font-semibold leading-[1.08] text-white">
                  The meeting ends. The notes do not have to.
                </h2>
                <p className="lede mt-5 max-w-[50ch] text-[18px] leading-8">
                  ManthanOS joins the call, writes the transcript, and turns what
                  was actually decided into tasks with owners — attached to the
                  project the meeting was about.
                </p>
                <blockquote className="mt-8 flex max-w-[46ch] items-start gap-4 text-[19px] italic leading-8 text-white/65">
                  <span aria-hidden className="-mt-2 font-sans text-6xl not-italic leading-none text-status-coral/80">“</span>
                  <p>
                    A good meeting should leave behind clear decisions, not more
                    questions about what happens next.
                  </p>
                </blockquote>
              </div>
            </Reveal>
          </div>

          {/* ---- Product side: the real meeting interface ---------------- */}
          {false && <Reveal delay={0.08}>
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
          </Reveal>}
        </div>
      </div>
    </section>
  );
}
