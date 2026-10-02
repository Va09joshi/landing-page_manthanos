"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { pipelineGroups, pipelineStages } from "../lib/product";
import { Reveal, SectionHead } from "./ui";
import { Lightbulb, Search, FileText, Mic, Palette, Film, Image, BarChart3, CheckCircle2, CalendarClock, Rocket } from "lucide-react";

const groupMeta = {
  Plan: { accent: "#E65F2B", wash: "#FFF3ED" },
  Create: { accent: "#245FF5", wash: "#EEF4FF" },
  Review: { accent: "#A56A00", wash: "#FFF7DF" },
  Publish: { accent: "#087A57", wash: "#EAF8F2" },
};

const stageIcon = {
  IDEA: Lightbulb, RESEARCH: Search, SCRIPT: FileText, VOICEOVER: Mic,
  VISUALS: Palette, EDITING: Film, THUMBNAIL: Image, SEO: BarChart3,
  REVIEW: CheckCircle2, SCHEDULED: CalendarClock, PUBLISHED: Rocket,
};

export function PipelineRail() {
  const reduced = useReducedMotion();
  const [active, setActive] = useState("Plan");
  const meta = groupMeta[active];
  const stages = pipelineStages.filter((stage) => stage.group === active);
  const groupIndex = pipelineGroups.findIndex((group) => group.id === active);
  const groupCaption = pipelineGroups[groupIndex]?.caption;

  const selectAdjacent = (event, index) => {
    if (!["ArrowDown", "ArrowUp", "ArrowLeft", "ArrowRight"].includes(event.key)) return;
    event.preventDefault();
    const step = event.key === "ArrowDown" || event.key === "ArrowRight" ? 1 : -1;
    const next = (index + step + pipelineGroups.length) % pipelineGroups.length;
    setActive(pipelineGroups[next].id);
    document.getElementById(`pipeline-tab-${pipelineGroups[next].id}`)?.focus();
  };

  return (
    <section className="band-light relative z-10 overflow-hidden border-t border-slate-200/80">
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-slate-300 to-transparent" />

      <div className="shell relative py-[clamp(76px,10vw,152px)] lg:pb-[152px] lg:pt-[240px]">
        <Reveal>
          <div className="[&_h2]:!text-[#0A101C]">
            <SectionHead
              eyebrow="The pipeline"
              title="Eleven stages. One clear way forward."
              lede="Follow the work from its first useful thought to the moment it reaches the public. Each phase keeps the brief, owner and approval history connected."
            />
          </div>
        </Reveal>

        <Reveal delay={0.08}>
          <div className="relative mt-14 min-h-[520px] overflow-hidden rounded-[32px] border border-[#cbd7e4] bg-[#e7eef6] shadow-[0_30px_64px_-38px_rgba(30,49,73,.3),0_10px_28px_-20px_rgba(50,72,99,.2),0_2px_8px_-5px_rgba(71,91,116,.14)] after:pointer-events-none after:absolute after:inset-0 after:z-30 after:rounded-[31px] after:shadow-[inset_18px_0_30px_-26px_rgba(49,70,96,.32),inset_-18px_0_30px_-26px_rgba(49,70,96,.28),inset_0_-20px_32px_-28px_rgba(49,70,96,.34),inset_0_14px_24px_-22px_rgba(30,49,73,.3),inset_0_1px_0_rgba(255,255,255,.85)] sm:rounded-[44px] sm:after:rounded-[43px] lg:mt-20">
            <div className="relative z-10 grid grid-cols-4 bg-[#d7e1ec]" role="tablist" aria-label="Pipeline phases" aria-orientation="horizontal">
              {pipelineGroups.map((group, index) => {
                const isActive = active === group.id;
                return (
                  <button
                    id={`pipeline-tab-${group.id}`}
                    key={group.id}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    aria-controls={`panel-${group.id}`}
                    tabIndex={isActive ? 0 : -1}
                    onClick={() => setActive(group.id)}
                    onKeyDown={(event) => selectAdjacent(event, index)}
                    className={`group relative flex min-h-[74px] min-w-0 transform-gpu items-center justify-center gap-1.5 border-r border-[#d5dfea] px-2 py-4 text-left outline-none transition-[color,background-color,box-shadow,transform] duration-300 first:rounded-tl-[31px] last:rounded-tr-[31px] last:border-r-0 focus-visible:z-30 focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#245FF5] sm:min-h-[88px] sm:gap-3 sm:px-5 sm:first:rounded-tl-[43px] sm:last:rounded-tr-[43px] ${isActive ? "z-20 translate-y-1 bg-[#e7eef6] shadow-[inset_0_1px_0_rgba(255,255,255,.9)]" : "z-10 -translate-y-1 bg-[#f8fafc] shadow-[0_16px_24px_-14px_rgba(15,23,42,.4)] hover:z-20 hover:-translate-y-1.5 hover:bg-white hover:shadow-[0_20px_30px_-14px_rgba(15,23,42,.45)]"}`}
                  >
                    <span className="font-mono text-[10px] font-bold tabular-nums tracking-[0.12em] transition-colors sm:text-[12px] sm:tracking-[0.14em]" style={{ color: isActive ? groupMeta[group.id].accent : "#8793A3" }}>
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="truncate text-[13px] font-semibold tracking-[-0.02em] transition-colors sm:text-[18px]" style={{ color: isActive ? "#0A101C" : "#78869A" }}>
                      {group.id}
                    </span>
                    {isActive && (
                      <motion.span
                        layoutId="pipeline-active-point"
                        aria-hidden="true"
                        className="absolute -bottom-[7px] left-1/2 h-3.5 w-3.5 -translate-x-1/2 rotate-45 rounded-[2px] shadow-[3px_3px_7px_rgba(15,23,42,.2)]"
                        style={{ background: groupMeta[group.id].accent }}
                        transition={{ type: "spring", stiffness: 360, damping: 34 }}
                      />
                    )}
                  </button>
                );
              })}
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                id={`panel-${active}`}
                role="tabpanel"
                aria-labelledby={`pipeline-tab-${active}`}
                initial={reduced ? false : { opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
                className="bg-[linear-gradient(180deg,#e4edf6_0%,#e9f0f7_46%,#e3ecf5_100%)] px-6 py-10 shadow-[inset_0_18px_28px_-28px_rgba(39,58,82,.42)] sm:px-10 sm:py-12 lg:px-[clamp(48px,6vw,88px)] lg:py-16"
              >
                <div className="flex items-center gap-3">
                  <span className="flex h-8 min-w-8 items-center justify-center rounded-full px-2 font-mono text-[11px] font-bold tabular-nums" style={{ color: meta.accent, background: meta.wash }}>
                    {groupIndex + 1}/{pipelineGroups.length}
                  </span>
                  <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.18em]" style={{ color: meta.accent }}>
                    {active} phase
                  </p>
                </div>

                <p className="mt-7 max-w-[34ch] text-[clamp(27px,3.2vw,48px)] font-medium leading-[1.12] tracking-[-0.04em] text-[#101827]">
                  {groupCaption}
                </p>

                <div className="mt-12 border-t border-[#c9d5e2] sm:mt-16">
                  {stages.map((stage, index) => {
                    const Icon = stageIcon[stage.id] || FileText;
                    const stageNumber = pipelineStages.findIndex((item) => item.id === stage.id) + 1;
                    return (
                      <motion.div
                        key={stage.id}
                        initial={reduced ? false : { opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.32, delay: index * 0.06 }}
                        className="group grid gap-4 border-b border-[#c9d5e2] py-7 sm:grid-cols-[52px_minmax(140px,0.65fr)_minmax(0,1.35fr)] sm:items-start sm:gap-6"
                      >
                        <span
                          className="relative isolate flex h-11 w-11 items-center justify-center rounded-[15px] border border-white/80 transition-[transform,box-shadow] duration-300 before:absolute before:inset-[3px] before:-z-10 before:rounded-[11px] before:bg-gradient-to-br before:from-white/95 before:via-white/35 before:to-transparent after:absolute after:inset-x-2 after:-bottom-1 after:-z-20 after:h-2 after:rounded-full after:bg-slate-900/20 after:blur-[5px] group-hover:-translate-y-1 group-hover:rotate-[-4deg] group-hover:shadow-[0_12px_20px_-10px_var(--icon-accent)]"
                          style={{ color: meta.accent, background: `linear-gradient(145deg, #ffffff 0%, ${meta.wash} 48%, color-mix(in_srgb, ${meta.accent} 22%, white) 100%)`, boxShadow: "inset 0 1px 0 rgba(255,255,255,.96), inset -3px -4px 8px rgba(15,23,42,.08), 0 8px 15px -9px rgba(15,23,42,.55)", "--icon-accent": meta.accent }}
                          aria-hidden="true"
                        >
                          <Icon className="drop-shadow-[0_2px_1px_rgba(255,255,255,.9)]" size={19} strokeWidth={2.15} />
                        </span>
                        <div>
                          <span className="font-mono text-[10px] font-semibold tracking-[0.14em] text-slate-400">STEP {String(stageNumber).padStart(2, "0")}</span>
                          <h3 className="mt-1.5 text-[18px] font-semibold tracking-[-0.02em] text-[#101827]">{stage.label}</h3>
                        </div>
                        <p className="max-w-[52ch] text-[15px] font-medium leading-7 tracking-[-0.01em] text-[#43536a]">{stage.note}</p>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>
            </AnimatePresence>
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 z-40 rounded-[31px] shadow-[inset_0_0_26px_rgba(15,23,42,.16),inset_10px_0_20px_-16px_rgba(2,8,23,.5),inset_0_2px_0_rgba(255,255,255,.88)] sm:rounded-[43px]"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
