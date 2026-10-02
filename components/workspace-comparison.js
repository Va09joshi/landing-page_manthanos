import Link from "next/link";
import {
  ArrowRight,
  Building2,
  Check,
  Clapperboard,
  Users,
} from "lucide-react";
import { Reveal, SectionHead } from "./ui";

export const workspaceLanes = [
  {
    id: "creator",
    label: "Creator workspace",
    shortLabel: "For creators",
    icon: Clapperboard,
    accent: "text-signal",
    border: "border-royal-400/45",
    glow: "from-royal-500/20",
    summary:
      "See and manage every piece of content from the first idea to the final publish date, including scripts, approvals, files, brand deals, and performance.",
    journey: ["Plan the idea", "Create the content", "Review and approve", "Publish and track"],
    bestFor: "Creators, studios, editors, and content managers",
    modules: [
      "Content ideas and briefs",
      "Production stages",
      "Scripts and revisions",
      "Content calendar",
      "Brand deals and deliverables",
      "Files and media assets",
      "Channel performance",
      "Tasks and meetings",
    ],
    outcome: "A clear, repeatable publishing process",
  },
  {
    id: "company",
    label: "Company workspace",
    shortLabel: "For companies",
    icon: Building2,
    accent: "text-status-coral",
    border: "border-status-coral/35",
    glow: "from-status-coral/15",
    summary:
      "See and manage leads, client projects, team responsibilities, deadlines, approvals, attendance, and reports in one connected workspace.",
    journey: ["Capture the request", "Plan the project", "Assign the work", "Review and deliver"],
    bestFor: "Agencies, consultancies, startups, and growing teams",
    modules: [
      "Clients and projects",
      "Leads and follow-ups",
      "Project stages and deadlines",
      "Team roles and access",
      "Attendance and work hours",
      "Reports and approvals",
      "Team conversations",
      "Tasks and meetings",
    ],
    outcome: "Clear ownership and reliable delivery",
  },
];

export const comparisonRows = [
  ["Best suited to", "Content creation and publishing", "Client work and internal operations"],
  ["Work moves from", "Idea to script to production to publishing", "Lead to project to assigned work to delivery"],
  ["What you can see", "Content status, scripts, files, deadlines, and performance", "Lead status, project progress, owners, deadlines, and approvals"],
  ["Business information", "Brand deals, deliverables, income, and channel results", "Client history, sales opportunities, delivery reports, and attendance"],
  ["Team access", "Separate access for owners, managers, editors, designers, and viewers", "Separate access for owners, admins, team leads, employees, and reviewers"],
  ["Included in both", "Tasks, meetings, files, team chat, and access controls", "Tasks, meetings, files, team chat, and access controls"],
  ["Main benefit", "Publish consistently without losing track of a handoff", "Deliver reliably with a clear owner for every task"],
];

function LaneCard({ lane, compact = false }) {
  const Icon = lane.icon;

  return (
    <article className={`workspace-lane-card workspace-lane-card--${lane.id} relative overflow-hidden rounded-[18px] border ${lane.border} bg-ink-850`}>
      <div
        aria-hidden
        className={`pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b ${lane.glow} to-transparent`}
      />
      <div className={compact ? "relative p-6 sm:p-8" : "relative p-7 sm:p-9"}>
        <div className="flex items-start justify-between gap-4">
          <span className={`workspace-lane-icon ${lane.accent}`} aria-hidden>
            <span className="workspace-lane-icon__face">
              <Icon size={24} strokeWidth={1.9} />
            </span>
          </span>
          <span className="font-mono text-[10px] uppercase tracking-[.15em] text-white/35">
            {lane.id === "creator" ? "Publish" : "Deliver"}
          </span>
        </div>

        <p className={`mt-7 font-mono text-[10px] uppercase tracking-[.15em] ${lane.accent}`}>
          {lane.shortLabel}
        </p>
        <h3 className="mt-3 text-[clamp(23px,2.4vw,32px)] font-semibold leading-tight text-white">
          {lane.label}
        </h3>
        <p className="mt-4 max-w-[52ch] text-[14.5px] leading-6 text-chalk-dim">
          {lane.summary}
        </p>

        <ol className="workspace-journey mt-8 grid grid-cols-2 gap-x-4 gap-y-6 rounded-[14px] px-4 py-5 sm:grid-cols-4 sm:px-5">
          {lane.journey.map((step, index) => (
            <li key={step} className="workspace-journey__step relative text-[12.5px] leading-5 text-chalk">
              <span className={`workspace-journey__node ${lane.accent}`}>
                <span aria-hidden className="workspace-journey__dot" />
                <span className="font-mono text-[9px]">
                {String(index + 1).padStart(2, "0")}
                </span>
              </span>
              <span className="mt-3 block max-w-[14ch]">{step}</span>
            </li>
          ))}
        </ol>

        {!compact && (
          <>
            <p className="mt-7 text-[12px] font-medium text-white">What you can see and manage</p>
            <ul className="mt-4 grid gap-3 sm:grid-cols-2">
              {lane.modules.map((module) => (
                <li key={module} className="flex items-start gap-2.5 text-[13px] leading-5 text-chalk-dim">
                  <Check size={14} className={`mt-0.5 shrink-0 ${lane.accent}`} aria-hidden />
                  {module}
                </li>
              ))}
            </ul>
          </>
        )}

        <div className="mt-7 flex items-start gap-3 rounded-xl border border-white/[.08] bg-black/10 p-4">
          <Users size={16} className={`mt-0.5 shrink-0 ${lane.accent}`} aria-hidden />
          <div>
            <p className="font-mono text-[9px] uppercase tracking-[.14em] text-white/35">Best for</p>
            <p className="mt-1 text-[13px] leading-5 text-chalk-dim">{lane.bestFor}</p>
          </div>
        </div>
      </div>
    </article>
  );
}

export function HomeWorkspaceComparison() {
  return (
    <section className="band-dark band-pad relative overflow-hidden">
      <div aria-hidden className="pointer-events-none absolute inset-0 mesh-dark opacity-40" />
      <div className="shell relative">
        <Reveal>
          <SectionHead
            eyebrow="Choose your workspace"
            title="See exactly what each workspace helps you manage"
            lede="Choose a Creator workspace for content and publishing, or a Company workspace for clients, projects, and team operations. Both include tasks, meetings, files, chat, and access controls."
          />
        </Reveal>

        <div className="mt-12 grid gap-5 lg:grid-cols-2">
          {workspaceLanes.map((lane, index) => (
            <Reveal key={lane.id} delay={index * 0.06}>
              <LaneCard lane={lane} compact />
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-9 flex flex-col gap-4 pt-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-[54ch] text-[14px] leading-6 text-chalk-dim">
            Not sure which one fits? Compare what your team can see, manage, and complete in each workspace.
          </p>
          <Link
            href="/compare"
            className="group inline-flex min-h-11 shrink-0 items-center gap-2 self-start rounded-[10px] border border-white bg-white px-5 text-[14px] font-semibold text-ink-950 shadow-[0_12px_24px_-10px_rgba(0,0,0,.9)] transition-all hover:-translate-y-0.5 hover:bg-chalk hover:shadow-[0_16px_28px_-10px_rgba(0,0,0,.95)] sm:self-auto"
          >
            Compare workspaces
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" aria-hidden />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}

export function FullWorkspaceComparison() {
  return (
    <>
      <section className="band-surface band-pad relative overflow-hidden">
        <div className="shell relative">
          <div className="grid gap-5 lg:grid-cols-2">
            {workspaceLanes.map((lane, index) => (
              <Reveal key={lane.id} delay={index * 0.06}>
                <LaneCard lane={lane} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="band-dark band-pad">
        <div className="shell">
          <Reveal>
            <SectionHead
              eyebrow="Compare workspaces"
              title="Choose based on the work your team manages every day"
              lede="Your team size does not decide the workspace. Choose Creator for content production and publishing, or Company for leads, clients, projects, and internal operations."
            />
          </Reveal>

          <Reveal className="mt-12 overflow-hidden rounded-[16px] border border-white/10 bg-ink-850">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[760px] border-collapse text-left">
                <thead>
                  <tr className="border-b border-white/10 bg-white/[.025]">
                    <th className="w-[24%] px-6 py-5 font-mono text-[10px] font-normal uppercase tracking-[.14em] text-white/35">Compare</th>
                    <th className="w-[38%] px-6 py-5 text-[14px] font-semibold text-signal">Creator workspace</th>
                    <th className="w-[38%] px-6 py-5 text-[14px] font-semibold text-status-coral">Company workspace</th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonRows.map(([label, creator, company]) => (
                    <tr key={label} className="border-b border-white/[.07] last:border-0">
                      <th scope="row" className="px-6 py-5 text-[13px] font-medium text-white">{label}</th>
                      <td className="px-6 py-5 text-[13.5px] leading-6 text-chalk-dim">{creator}</td>
                      <td className="px-6 py-5 text-[13.5px] leading-6 text-chalk-dim">{company}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Reveal>

          <Reveal className="mt-10 grid gap-5 rounded-[16px] border border-royal-400/25 bg-royal-500/[.08] p-6 sm:p-8 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <p className="text-[18px] font-semibold text-white">Still deciding?</p>
              <p className="mt-2 max-w-[62ch] text-[14px] leading-6 text-chalk-dim">
                Tell us what your team ships and where work currently slows down. We will recommend the right workspace and role setup.
              </p>
            </div>
            <Link href="/register" className="group inline-flex min-h-11 items-center justify-center gap-2 rounded-[10px] bg-royal-500 px-5 text-[14px] font-medium text-white transition-colors hover:bg-royal-400">
              Register your workspace
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" aria-hidden />
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
