"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { Reveal, SectionHead, StatusPill, UiWindow } from "./ui";

/* ---------------------------------------------------------------------------
   MONITORING & VISIBILITY

   Pattern   B, calm. ONE large Command Center surface, full width. No grid of
              stat cards, no dashboard wallpaper.
   Tone      Deliberately quieter than the hero. Lower contrast, fewer accents,
              more whitespace. This is the section a founder opens on a Monday.
   Story     progress · activity · status · important work — in that order,
              top to bottom, the way the screen is actually read.
   Colour    Blue carries the data. Green/yellow only where a real state needs
              it. There is exactly one bar chart, and it is a real project
              progress chart rather than decorative analytics.
   ------------------------------------------------------------------------- */

/* Progress across the eleven stages, grouped. Values are the shape a real
   production board produces: some work done, some in flight, some not started. */
const stageProgress = [
  { group: "Plan", done: 2, total: 2, pct: 100 },
  { group: "Create", done: 1, total: 5, pct: 40 },
  { group: "Review", done: 0, total: 2, pct: 0 },
  { group: "Publish", done: 0, total: 2, pct: 0 },
];

const activity = [
  ["Script draft v1", "moved to review", "12 min ago", "live"],
  ["Brand guidelines v2", "approved and delivered", "1 hr ago", "ok"],
  ["First edit pass", "assigned to the editor", "Yesterday", "idle"],
  ["Thumbnail export", "unblocked", "Yesterday", "ok"],
];

const attention = [
  ["Review & approval", "Waiting 2 days", "warn"],
  ["Publish schedule", "Not started", "warn"],
  ["Idea & research", "Complete", "ok"],
];


export function Monitoring() {
  const reduced = useReducedMotion();

  return (
    /* band-raise, not band-flat. band-flat is ink-950, which is exactly what the
       AISummary section above already is, and two adjacent ink-950 sections
       merge into one field with no seam. 900 is the next real step up. */
    <section className="band-raise relative z-20">
      {/* ambient-soft: already high on the ladder, a strong pool would stain. */}
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 ambient-soft" />
        {/* Calmer than the sections around it: one faint blue source, no lattice. */}
        <div
          className="absolute inset-x-0 top-0 h-[420px] opacity-[.09] blur-[150px]"
          style={{ background: "radial-gradient(ellipse 60% 100% at 50% 0%, #245FF5 0%, transparent 70%)" }}
        />
      </div>

      {/* A single platform scene bridges the AI summary above and the live
          monitoring view below. The soft ellipse grounds the transparent art
          precisely at the seam instead of making it float over either band. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 z-20 flex -translate-y-1/2 justify-center px-6"
      >
        <div className="relative w-[min(78vw,440px)]">
          <div className="absolute bottom-[16%] left-1/2 h-[12%] w-[72%] -translate-x-1/2 rounded-full bg-black/75 blur-[26px] sm:blur-[34px]" />
          <Image
            src="/illustrations/Create_platform_illustration_system_2K_20261002195234-removebg-preview.png"
            alt=""
            width={512}
            height={512}
            sizes="(max-width: 640px) 78vw, 440px"
            className="relative h-auto w-full drop-shadow-[0_30px_24px_rgba(2,6,15,.7)]"
          />
        </div>
      </div>

      <div className="shell relative pb-[clamp(80px,10vw,148px)] pt-[clamp(160px,15vw,240px)]">
        <Reveal>
          <SectionHead
            eyebrow="Monitoring"
            title="See what is actually moving."
            lede="One screen that answers the only three questions that matter on a Monday: what is done, what changed, and what is waiting on someone."
          />
        </Reveal>

        <Reveal delay={0.1}>
          <UiWindow label="Command Center" className="mt-14">
            <div className="p-6 sm:p-8">
              {/* ---- Progress across the pipeline ------------------------- */}
              <div>
                <div className="flex flex-wrap items-baseline justify-between gap-3">
                  <p className="mono-label text-white/25">Progress · all active projects</p>
                  <p className="font-mono text-[11px] text-white/30">11 stages</p>
                </div>

                {/* The one chart on this page. Horizontal, calm, labelled. */}
                <ul className="mt-6 space-y-5">
                  {stageProgress.map((stage, index) => (
                    <motion.li
                      key={stage.group}
                      initial={reduced ? false : { opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, amount: 0.5 }}
                      transition={{ duration: 0.5, delay: index * 0.08 }}
                    >
                      <div className="flex items-baseline justify-between gap-4">
                        <span className="text-[14px] font-medium text-white">{stage.group}</span>
                        <span className="font-mono text-[11px] text-white/30">
                          {stage.done} of {stage.total} stages
                        </span>
                      </div>
                      <span className="track mt-2.5 block h-[5px]">
                        <span
                          className={
                            stage.pct === 100
                              ? "bg-status-green/70"
                              : stage.pct > 0
                                ? "bg-royal-400/80"
                                : "bg-transparent"
                          }
                          style={{ width: `${stage.pct}%` }}
                        />
                      </span>
                    </motion.li>
                  ))}
                </ul>
              </div>

              {/* ---- Activity and attention, side by side ---------------- */}
              <div className="mt-9 grid gap-8 border-t border-white/[.08] pt-8 lg:grid-cols-[1.35fr_1fr] lg:gap-12">
                <div>
                  <p className="mono-label text-white/25">Recent activity</p>
                  <ul className="mt-4">
                    {activity.map(([item, event, when, tone]) => (
                      <li key={item} className="ui-row flex items-center gap-4 py-3.5">
                        <span
                          className={`h-1.5 w-1.5 shrink-0 rounded-full ${
                            tone === "ok" ? "bg-status-green" : tone === "live" ? "bg-royal-400" : "bg-white/20"
                          }`}
                          aria-hidden
                        />
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-[14px] text-white">{item}</p>
                          <p className="truncate text-[12.5px] text-chalk-dim">{event}</p>
                        </div>
                        <span className="shrink-0 font-mono text-[10px] text-white/25">{when}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <p className="mono-label text-white/25">Needs attention</p>
                  <ul className="mt-4 space-y-2.5">
                    {attention.map(([item, state, tone]) => (
                      <li
                        key={item}
                        className="flex items-center gap-3 rounded-[9px] border border-white/[.07] px-4 py-3"
                      >
                        <span className="min-w-0 flex-1 truncate text-[13.5px] text-white">{item}</span>
                        <StatusPill tone={tone}>{state}</StatusPill>
                      </li>
                    ))}
                  </ul>
                  <p className="mt-5 max-w-[34ch] text-[12.5px] leading-5 text-chalk-faint">
                    Status comes from the record itself, so it cannot drift out of
                    date the way a manually updated tracker does.
                  </p>
                </div>
              </div>
            </div>
          </UiWindow>
        </Reveal>
      </div>
    </section>
  );
}
