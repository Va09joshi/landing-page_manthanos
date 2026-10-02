"use client";

import Image from "next/image";
import {
  Activity, CalendarDays, Files, KanbanSquare,
  MessageSquareText, RadioTower, ShieldCheck, UsersRound,
} from "lucide-react";
import { moduleGroups, permissionLevels } from "../lib/product";
import { Reveal, SectionHead } from "./ui";

/* ---------------------------------------------------------------------------
   Module Bento — dark throughout.

   Pattern: Full-width product showcase with asymmetric grid.
   Background: band-surface (ink-850) — slightly lighter than hero.

   No more light/paper cards. All surfaces are dark elevated.
   The bottom four tiles become a horizontal editorial row.
   ------------------------------------------------------------------------- */

/* Channel performance, shown as SHARES rather than absolute view counts.

   The previous version printed specific figures (184,500 views / 76,200 views)
   lifted from seed data. On a public page those read as real audience numbers
   for ManthanOS itself, which they are not. Proportions make the same point
   about channel mix without inventing a measurable claim. */
const analyticsView = [
  ["YouTube", "Primary channel", 71],
  ["Instagram", "Secondary channel", 29],
];

function CardShell({ children, className = "" }) {
  return (
    <div
      className={`h-full overflow-hidden rounded-[12px] border border-white/10 bg-ink-900 transition-[border-color] duration-300 hover:border-white/18 ${className}`}
    >
      {children}
    </div>
  );
}

function CardLabel({ Icon, children }) {
  return (
    <div className="flex items-center gap-2.5">
      <span className="flex h-8 w-8 items-center justify-center rounded-[8px] border border-white/12 bg-white/[.05] text-signal">
        <Icon size={15} strokeWidth={1.8} />
      </span>
      <span className="mono-label text-white/35">{children}</span>
    </div>
  );
}

export function ModuleBento() {
  return (
    <section className="band-surface relative overflow-hidden">
      <div aria-hidden className="pointer-events-none absolute inset-0 mesh-dark opacity-30" />

      <div className="shell relative band-pad">
        <Reveal>
          <SectionHead
            eyebrow="What is inside"
            title="The workspace, grouped the way the product ships it"
            lede="Not a feature list. This is the actual navigation structure of a ManthanOS workspace."
          />
        </Reveal>

        {/* Row 1 — wide workflow card + narrow analytics card */}
        <div className="mt-14 grid gap-3.5 lg:grid-cols-3">
          <Reveal className="lg:col-span-2">
            <CardShell>
              <div className="grid h-full gap-8 p-7 sm:grid-cols-2 sm:p-8">
                <div>
                  <CardLabel Icon={KanbanSquare}>Workflow</CardLabel>
                  <h3 className="mt-6 text-[21px] font-semibold leading-snug text-white">
                    From a raw angle to a shipped deliverable.
                  </h3>
                  <p className="mt-4 text-[14px] leading-6.5 text-chalk-dim">
                    From raw idea to assigned phases, closing with approval — all in one place.
                  </p>
                  <ul className="mt-7 space-y-2.5">
                    {moduleGroups[1].items.map((item) => (
                      <li key={item} className="flex items-center gap-3 text-[13.5px] text-chalk-dim">
                        <span className="h-1 w-1 rounded-full bg-royal-400 opacity-70" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex items-center">
                  <div className="w-full overflow-hidden rounded-[10px] border border-white/12 bg-ink-850 shadow-[0_24px_56px_-28px_rgba(2,10,26,.9)]">
                    <div className="flex items-center gap-2 border-b border-white/10 px-3 py-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-royal-400" />
                      <span className="font-mono text-[9px] uppercase tracking-[.12em] text-white/30">
                        My Phases · Employee portal
                      </span>
                    </div>
                    <Image
                      src="/screenshots/employee-phases.png"
                      alt="ManthanOS employee portal showing delivery phases and project status."
                      width={1280}
                      height={640}
                      className="block w-full"
                    />
                  </div>
                </div>
              </div>
            </CardShell>
          </Reveal>

          <Reveal delay={0.08}>
            <CardShell>
              <div className="flex h-full flex-col p-7">
                <CardLabel Icon={Activity}>Analytics</CardLabel>
                <p className="mt-5 text-[13px] leading-6 text-chalk-dim">
                  One performance view across every channel connected to the workspace.
                </p>
                <div className="mt-7 grid grid-cols-2 gap-4">
                  {[["Total views", "260,700"], ["Engagement", "23,300"]].map(([label, value]) => (
                    <div key={label}>
                      <p className="font-mono text-[9px] uppercase tracking-[.1em] text-white/30">{label}</p>
                      <p className="mt-1.5 text-[22px] font-semibold leading-none text-white">{value}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-auto space-y-5 pt-7">
                  {analyticsView.map(([platform, label, width]) => (
                    <div key={platform}>
                      <div className="flex items-baseline justify-between gap-3">
                        <span className="text-[13px] font-medium text-white">{platform}</span>
                        <span className="font-mono text-[10px] text-white/35">{label}</span>
                      </div>
                      <div className="mt-2 h-[4px] overflow-hidden rounded-full bg-white/10">
                        <span
                          className="block h-full rounded-full bg-royal-400"
                          style={{ width: `${width}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardShell>
          </Reveal>
        </div>

        {/* Row 2 — wide asset card + permissions card */}
        <div className="mt-3.5 grid gap-3.5 lg:grid-cols-3">
          <Reveal className="lg:col-span-2">
            <CardShell>
              <div className="grid h-full gap-8 p-7 sm:grid-cols-[1fr_1.15fr] sm:p-8">
                <div>
                  <CardLabel Icon={RadioTower}>Business &amp; Assets</CardLabel>
                  <h3 className="mt-6 text-[21px] font-semibold leading-snug text-white">
                    Channels, assets and deals beside the work itself.
                  </h3>
                  <p className="mt-4 text-[14px] leading-6.5 text-chalk-dim">
                    Track channels, assets, and brand deals right beside the production schedule.
                  </p>
                </div>
                <div className="flex items-center">
                  <div className="w-full overflow-hidden rounded-[10px] border border-white/12 bg-ink-850 shadow-[0_24px_56px_-28px_rgba(2,10,26,.9)]">
                    <div className="flex items-center gap-2 border-b border-white/10 px-3 py-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-royal-400" />
                      <span className="font-mono text-[9px] uppercase tracking-[.12em] text-white/30">
                        Analytics · Admin portal
                      </span>
                    </div>
                    <Image
                      src="/screenshots/admin-analytics.png"
                      alt="ManthanOS admin analytics showing total views, engagement and per-platform metrics."
                      width={1280}
                      height={640}
                      className="block w-full"
                    />
                  </div>
                </div>
              </div>
            </CardShell>
          </Reveal>

          <Reveal delay={0.08}>
            <CardShell>
              <div className="flex h-full flex-col p-7">
                <CardLabel Icon={ShieldCheck}>Structure</CardLabel>
                <p className="mt-5 text-[13px] leading-6 text-chalk-dim">
                  Roles are seeded per workspace type, then scoped by resource and level.
                </p>
                <div className="mt-7 space-y-4">
                  {[
                    ["Creator team", "Owner · Manager · Editor · Designer · Viewer"],
                    ["Company", "Owner · Admin · Dept Lead · Project Manager · Employee"],
                  ].map(([label, roles]) => (
                    <div key={label} className="rounded-[8px] border border-white/08 bg-white/[.025] p-3.5">
                      <p className="text-[12.5px] font-medium text-white">{label}</p>
                      <p className="mt-1.5 font-mono text-[10px] leading-5 text-white/35">{roles}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-auto pt-7">
                  <p className="font-mono text-[9px] uppercase tracking-[.12em] text-white/25">Permission levels</p>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {permissionLevels.map((level) => (
                      <span
                        key={level}
                        className="rounded-[6px] border border-white/10 bg-white/[.03] px-2 py-1 font-mono text-[9px] text-white/40"
                      >
                        {level}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </CardShell>
          </Reveal>
        </div>

        {/* Row 3 — four operational tiles as an editorial horizontal row */}
        <div className="mt-3.5 grid gap-px overflow-hidden rounded-[12px] border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
          {[
            {
              Icon: CalendarDays,
              label: "Meetings",
              body: "In-meeting video rooms with transcripts, meeting notes and AI analysis written back onto the project.",
              accent: "text-status-coral",
            },
            {
              Icon: Files,
              label: "Daily Logs",
              body: "A short end-of-day record per person, so progress is reported rather than remembered.",
              accent: "text-signal",
            },
            {
              Icon: MessageSquareText,
              label: "Chatrooms",
              body: "Persistent team chat scoped to the workspace, with polls for lightweight decisions.",
              accent: "text-signal",
            },
            {
              Icon: UsersRound,
              label: "Attendance",
              body: "Clock in, breaks and screen sessions recorded for teams that bill by the hour.",
              accent: "text-signal",
            },
          ].map(({ Icon, label, body, accent }, index) => (
            <Reveal key={label} delay={index * 0.05}>
              <div className="flex h-full flex-col bg-ink-900 p-6">
                <span className={`mb-4 ${accent}`}>
                  <Icon size={18} strokeWidth={1.6} />
                </span>
                <p className="text-[14px] font-semibold text-white">{label}</p>
                <p className="mt-2.5 text-[13px] leading-6 text-chalk-dim">{body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
