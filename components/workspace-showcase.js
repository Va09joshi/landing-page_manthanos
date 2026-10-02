"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { exampleWorkspaces, workspaceTypes } from "../lib/product";
import { Reveal, SectionHead, StatusPill } from "./ui";

/* ---------------------------------------------------------------------------
   Workspace Showcase.

   Pattern: Two-column tabbed workspace demo.
   Background: band-surface (ink-850) — contrasting with the dark sections around it.

   Shows two real workspace types from seed data.
   Interactive tab panel with smooth workspace switching.
   ------------------------------------------------------------------------- */

export function WorkspaceShowcase() {
  const [active, setActive] = useState(0);
  const reduced = useReducedMotion();
  const workspace = exampleWorkspaces[active];

  return (
    <section className="band-surface relative overflow-hidden">
      <div aria-hidden className="pointer-events-none absolute inset-0 mesh-dark opacity-28" />

      <div className="shell relative band-pad">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <Reveal>
            <SectionHead
              eyebrow="Two real workspaces"
              title="The same model, shaped for different work"
              lede="A creator team and a consultancy run on identical primitives. What changes is which primitives carry the weight."
            />
          </Reveal>

          {/* Tab switcher */}
          <Reveal delay={0.08}>
            <div
              role="tablist"
              aria-label="Workspace examples"
              className="flex gap-1 rounded-[10px] border border-white/10 bg-white/[.04] p-1"
            >
              {exampleWorkspaces.map((item, index) => (
                <button
                  key={item.slug}
                  role="tab"
                  type="button"
                  aria-selected={active === index}
                  aria-controls={`workspace-panel-${item.slug}`}
                  onClick={() => setActive(index)}
                  className={`min-h-10 rounded-[8px] px-5 text-[14px] font-medium transition-all duration-250 ${
                    active === index
                      ? "bg-royal-500 text-white shadow-[0_6px_20px_-8px_rgba(36,95,245,.8)]"
                      : "text-chalk-dim hover:bg-white/[.06] hover:text-white"
                  }`}
                >
                  {item.shape}
                </button>
              ))}
            </div>
          </Reveal>
        </div>

        <div
          id={`workspace-panel-${workspace.slug}`}
          role="tabpanel"
          className="mt-12"
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={workspace.slug}
              initial={reduced ? false : { opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduced ? undefined : { opacity: 0, y: -10 }}
              transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
              className={`grid gap-3.5 lg:grid-cols-[1fr_1.3fr] ${
                active === 1 ? "lg:[&>*:first-child]:order-2" : ""
              }`}
            >
              {/* Identity + team */}
              <div className="plate flex flex-col p-7 lg:p-8">
                <div className="flex items-center gap-2.5">
                  <StatusPill tone="live" dot>{workspace.type}</StatusPill>
                  <span className="font-mono text-[11px] text-white/20">{workspace.slug}</span>
                </div>

                <h3 className="mt-6 text-[25px] font-semibold leading-tight text-white">
                  {workspace.name}
                </h3>
                <p className="mt-3 text-[15px] leading-7 text-chalk-dim">{workspace.who}</p>

                <div className="mt-8 border-t border-white/10 pt-7">
                  <p className="mono-label text-white/25">Team</p>
                  <ul className="mt-5 space-y-4">
                    {workspace.team.map(([name, title, initials]) => (
                      <li key={name} className="flex items-center gap-3.5">
                        <span className="flex h-9 w-9 items-center justify-center rounded-full border border-royal-400/30 bg-royal-500/10 font-mono text-[11px] text-soft">
                          {initials}
                        </span>
                        <span>
                          <span className="block text-[14px] font-medium text-white">{name}</span>
                          <span className="block text-[12.5px] text-chalk-faint">{title}</span>
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-auto border-t border-white/10 pt-7">
                  <p className="mono-label text-white/25">Modules in play</p>
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {workspaceTypes
                      .find((type) => type.id === workspace.type)
                      ?.modules.map((module) => (
                        <span
                          key={module}
                          className="rounded-[7px] border border-white/10 bg-white/[.04] px-2.5 py-1.5 text-[12px] text-chalk-dim"
                        >
                          {module}
                        </span>
                      ))}
                  </div>
                </div>
              </div>

              {/* Records this workspace actually contains */}
              <div className="plate overflow-hidden">
                <div className="flex items-center justify-between border-b border-white/10 px-6 py-4">
                  <p className="mono-label text-white/25">Records</p>
                  <span className="font-mono text-[11px] text-white/20">
                    {workspace.records.length} shown
                  </span>
                </div>

                <ul className="divide-y divide-white/[.07]">
                  {workspace.records.map(([label, value], index) => (
                    <motion.li
                      key={label + index}
                      initial={reduced ? false : { opacity: 0, x: -6 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: 0.05 * index }}
                      className="group flex flex-col gap-1 px-6 py-4 transition-colors hover:bg-royal-500/[.04] sm:flex-row sm:items-baseline sm:gap-5"
                    >
                      <span className="w-28 shrink-0 font-mono text-[10px] uppercase tracking-[.1em] text-white/25 transition-colors group-hover:text-signal">
                        {label}
                      </span>
                      <span className="text-[14px] leading-6 text-chalk">{value}</span>
                    </motion.li>
                  ))}
                </ul>

                <div className="border-t border-white/10 bg-white/[.02] px-6 py-5">
                  <p className="text-[13px] leading-6 text-chalk-dim">
                    Every row above is a record this workspace creates on day one. Nothing
                    needs to be imported, configured or reconciled from another tool.
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
