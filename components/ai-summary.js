"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { Reveal, SectionHead, StatusPill, UiWindow } from "./ui";

/* ---------------------------------------------------------------------------
   AI MEETING SUMMARY

   Pattern   D — a horizontal progression: MEETING -> AI -> SUMMARY -> TASKS.
              The four steps run left to right on desktop and stack on mobile.
   Tone      A product capability, not a spectacle. No robot, no brain, no
              hologram, no "futuristic". Purple appears ONLY inside the AI
              step, to mark the moment of transformation, and nowhere else.
   Proof     The real summary interface, showing the three things a summary is
              actually for: key points, decisions, and actions that became
              tasks. Every line is something a person could have written.
   ------------------------------------------------------------------------- */

const steps = [
  { id: "meeting", label: "Meeting", note: "The call happens and is transcribed." },
  { id: "ai", label: "AI", note: "The transcript is read and structured.", ai: true },
  { id: "summary", label: "Summary", note: "Points, decisions and actions surface." },
  { id: "tasks", label: "Tasks", note: "Actions land on the project with owners." },
];

const summary = {
  title: "Creative sync — launch content",
  meta: "38 min · 2 participants",
  points: [
    "Audience is beginners, so the framing stays problem-first.",
    "Avoid tool-by-tool comparisons in the edit.",
  ],
  decisions: [
    "Script is locked before voiceover begins.",
    "Three thumbnail options before review.",
    "Publish date confirmed for the launch.",
  ],
  actions: [
    { task: "Script draft v1", owner: "Creator", due: "Fri" },
    { task: "Reference footage research", owner: "Editor", due: "Mon" },
    { task: "Thumbnail concepts", owner: "Designer", due: "Tue" },
  ],
};


export function AISummary() {
  const reduced = useReducedMotion();

  return (
    <section className="ai-summary-light relative overflow-hidden">
      {/* Ambient first, lattice on top: light under texture, never over it. */}
      <div aria-hidden className="ai-summary-wash pointer-events-none absolute inset-0" />
      <div aria-hidden className="ai-summary-grid pointer-events-none absolute inset-0" />
      {/* Purple sits behind the AI step only — the one transformation on the page. */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-[62%] top-20 h-[360px] w-[480px] -translate-x-1/2 rounded-full opacity-[.12] blur-[120px]"
        style={{ background: "radial-gradient(circle, #8DB5FF 0%, transparent 70%)" }}
      />

      <div className="shell relative band-pad">
        <Reveal>
          <SectionHead
            eyebrow="AI meeting summary"
            title="The part everyone actually wanted from the call."
            className="ai-summary-heading"
            lede="Not a novelty. After a meeting, ManthanOS gives you the points that were made, the decisions that were reached, and the tasks that came out of them — already attached to the right project."
          />
        </Reveal>

        {/* A compact upper illustration: it floats beside the copy on desktop
            and keeps its shadow concentrated directly underneath. */}
        <Reveal delay={0.06}>
          <figure className="relative z-10 mx-auto mt-1 h-[190px] w-full sm:h-[230px] lg:-mt-[220px] lg:ml-auto lg:mr-2 lg:h-[270px] lg:w-[46%]">
            <div
              aria-hidden
              className="absolute bottom-2 left-1/2 h-10 w-[62%] -translate-x-1/2 rounded-full bg-royal-400/15 blur-2xl sm:h-12 lg:bottom-4"
            />
            <Image
              src="/illustrations/AI Meeting-to-Tasks Workflow.png"
              alt="A meeting transcript flowing through AI into a summary and assigned tasks"
              width={1448}
              height={1086}
              sizes="(min-width: 1024px) 520px, (min-width: 640px) 72vw, 112vw"
              className="absolute left-1/2 top-1/2 w-[112%] max-w-none -translate-x-1/2 -translate-y-[51%] drop-shadow-[0_20px_22px_rgba(45,83,160,0.18)] sm:w-[72%] lg:w-full"
              priority={false}
            />
          </figure>
        </Reveal>

        {/* ---- Horizontal progression ------------------------------------ */}
        <Reveal delay={0.08}>
          <ol className="ai-summary-steps relative z-0 mt-8 grid gap-px overflow-hidden rounded-[14px] border sm:mt-10 sm:grid-cols-2 lg:mt-12 lg:grid-cols-4">
            {steps.map((step, index) => (
              <li
                key={step.id}
                className={`relative px-5 py-6 ${step.ai ? "ai-summary-step-active" : "ai-summary-step"}`}
              >
                <div className="flex items-center gap-2.5">
                  <span
                    className={`flex h-6 w-6 items-center justify-center rounded-full border font-mono text-[10px] ${
                      step.ai
                        ? "border-status-purple/40 bg-status-purple/12 text-status-purple"
                        : "ai-summary-step-number"
                    }`}
                  >
                    {index + 1}
                  </span>
                  {step.ai && (
                    <span className="font-mono text-[9px] uppercase tracking-[.14em] text-status-purple/80">
                      Processing
                    </span>
                  )}
                </div>
                <p className="ai-summary-step-title mt-4 text-[15px] font-semibold">{step.label}</p>
                <p className="ai-summary-step-copy mt-1.5 text-[13px] leading-6">{step.note}</p>
                {index < steps.length - 1 && (
                  <span
                    className="ai-summary-connector absolute -right-1.5 top-1/2 z-10 hidden h-px w-3 lg:block"
                    aria-hidden
                  />
                )}
              </li>
            ))}
          </ol>
        </Reveal>

        {/* ---- The real summary interface ------------------------------- */}
        <Reveal delay={0.12}>
          <UiWindow label="Meetings · AI summary" className="ai-summary-window mt-4">
            <div className="p-6 sm:p-7">
              <div className="flex flex-wrap items-start justify-between gap-4 border-b border-white/[.08] pb-5">
                <div>
                  <p className="mono-label text-white/25">Summary</p>
                  <p className="mt-1.5 text-[17px] font-semibold text-white">{summary.title}</p>
                  <p className="mt-1 text-[13px] text-chalk-dim">{summary.meta}</p>
                </div>
                <StatusPill tone="ai">AI generated</StatusPill>
              </div>

              <div className="mt-6 grid gap-8 lg:grid-cols-2">
                <div>
                  <p className="mono-label text-white/25">Key points</p>
                  <ul className="mt-3 space-y-2.5">
                    {summary.points.map((point, index) => (
                      <motion.li
                        key={point}
                        initial={reduced ? false : { opacity: 0, x: -6 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, amount: 0.4 }}
                        transition={{ duration: 0.4, delay: index * 0.07 }}
                        className="flex gap-3 text-[13.5px] leading-6 text-chalk-dim"
                      >
                        <span className="mt-[9px] h-1 w-1 shrink-0 rounded-full bg-white/25" aria-hidden />
                        {point}
                      </motion.li>
                    ))}
                  </ul>

                  <p className="mono-label mt-7 text-white/25">Decisions</p>
                  <ul className="mt-3 space-y-2.5">
                    {summary.decisions.map((decision) => (
                      <li key={decision} className="flex gap-3 text-[13.5px] leading-6 text-chalk-dim">
                        <svg
                          viewBox="0 0 14 14"
                          className="mt-1.5 h-3.5 w-3.5 shrink-0 text-royal-400"
                          fill="none"
                          aria-hidden
                        >
                          <path d="M2 7l4 4 6-6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        {decision}
                      </li>
                    ))}
                  </ul>
                </div>



                {/* Actions that became real work — the point of the feature */}
                <div className="ui-well self-start p-5">
                  <p className="mono-label text-royal-400/80">Action items → tasks</p>
                  <ul className="mt-3">
                    {summary.actions.map((action) => (
                      <li key={action.task} className="ui-row flex items-center gap-3 py-3">
                        <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-royal-400" aria-hidden />
                        <span className="min-w-0 flex-1 truncate text-[13.5px] text-white">
                          {action.task}
                        </span>
                        <span className="shrink-0 font-mono text-[10px] text-white/30">
                          {action.owner}
                        </span>
                        <span className="shrink-0 font-mono text-[10px] text-status-yellow/80">
                          {action.due}
                        </span>
                      </li>
                    ))}
                  </ul>
                  <p className="mt-4 text-[12.5px] leading-5 text-chalk-faint">
                    Each action lands on the project as a task with an owner and a
                    date — not as a line in a document nobody re-reads.
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
