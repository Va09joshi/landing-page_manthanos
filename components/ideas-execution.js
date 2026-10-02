"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Reveal } from "./ui";

/* ---------------------------------------------------------------------------
   IDEAS -> EXECUTION

   Pattern   I — a small feature with a very large amount of whitespace.
   Tone      Conceptual and calm. This is the only section on the site that is
              mostly empty space, and that is the point: it is the pause
              between the dense product sections.
   Story     One orange idea, becoming a blue workspace, becoming a green
              finished result. Three objects, left to right, nothing else.
   Colour    Orange -> blue -> green is the only place all three appear
              together, and each one is doing a job: inspire, organise, done.
   ------------------------------------------------------------------------- */

const stages = [
  {
    id: "idea",
    label: "Idea",
    color: "#F97316",
    body: "A thought lands with a channel and an owner. Nothing else is required of it yet.",
  },
  {
    id: "workspace",
    label: "In the workspace",
    color: "#4B82F2",
    body: "It becomes a project with stages, tasks and a deadline you actually agreed to.",
  },
  {
    id: "done",
    label: "Done",
    color: "#34D399",
    body: "It ships, and the result stays attached to the record that produced it.",
  },
];

/* Three small objects that change state. The middle one is the only complex
   shape — the idea is a single form and the result is a settled, closed form. */
function IdeaObject() {
  return (
    <div className="relative flex h-[132px] items-center justify-center" aria-hidden>
      <div
        className="h-[52px] w-[52px] rotate-45 rounded-[10px]"
        style={{
          background: "linear-gradient(150deg, #FB923C 0%, #C2410C 100%)",
          boxShadow: "0 20px 40px -18px rgba(249,115,22,.55), inset 0 1px 0 rgba(255,255,255,.25)",
        }}
      />
    </div>
  );
}

function WorkspaceObject() {
  return (
    <div className="relative flex h-[132px] items-center justify-center" aria-hidden>
      <div
        className="w-[104px] rounded-[10px] border p-2.5"
        style={{
          borderColor: "rgba(75,130,242,.35)",
          background: "linear-gradient(150deg, #16203a 0%, #101828 100%)",
          boxShadow: "0 20px 44px -20px rgba(0,0,0,.9), 0 0 0 1px rgba(75,130,242,.08)",
        }}
      >
        <span className="mb-2 block h-[3px] w-2/3 rounded-full bg-royal-400/60" />
        <span className="block space-y-1.5">
          <span className="block h-[3px] w-full rounded-full bg-white/12" />
          <span className="block h-[3px] w-4/5 rounded-full bg-white/10" />
          <span className="block h-[3px] w-1/2 rounded-full bg-white/[.08]" />
        </span>
      </div>
    </div>
  );
}

function DoneObject() {
  return (
    <div className="relative flex h-[132px] items-center justify-center" aria-hidden>
      <div
        className="flex h-[52px] w-[52px] items-center justify-center rounded-full"
        style={{
          background: "linear-gradient(150deg, #34D399 0%, #047857 100%)",
          boxShadow: "0 20px 40px -18px rgba(52,211,153,.5), inset 0 1px 0 rgba(255,255,255,.28)",
        }}
      >
        <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="#04140D" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
          <path d="M5 13l4 4L19 7" />
        </svg>
      </div>
    </div>
  );
}

const objects = [IdeaObject, WorkspaceObject, DoneObject];


export function IdeasExecution() {
  return (
    <section className="band-dark relative overflow-hidden band-pad-lg">
      {/* Ambient first, lattice on top: light under texture, never over it. */}
      <div aria-hidden className="pointer-events-none absolute inset-0 ambient" />
      <div className="shell relative">
        <Reveal>
          <div className="max-w-[34ch]">
            <p className="eyebrow">Ideas → execution</p>
            <h2 className="mt-5 text-[clamp(24px,3vw,38px)] font-semibold leading-[1.1] text-white">
              An idea should not need a project to be worth keeping.
            </h2>
          </div>
        </Reveal>

        <ol className="mt-20 grid gap-12 sm:grid-cols-3 sm:gap-8">
          {stages.map((stage, index) => {
            const Object = objects[index];
            return (
              <li
                key={stage.id}
                className="flex flex-col items-center text-center sm:items-start sm:text-left"
              >
                <Reveal delay={index * 0.12}>
                  <Object />
                </Reveal>
                <Reveal delay={index * 0.12 + 0.05}>
                  <p
                    className="mt-6 font-mono text-[10px] uppercase tracking-[.16em]"
                    style={{ color: stage.color }}
                  >
                    {stage.label}
                  </p>
                  <p className="mt-3 max-w-[30ch] text-[14.5px] leading-7 text-chalk-dim">
                    {stage.body}
                  </p>
                </Reveal>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
