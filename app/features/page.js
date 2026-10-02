import { Header } from "../../components/site-header";
import { Footer } from "../../components/site-footer";
import { PageHead, Reveal, SectionHead, StatusPill } from "../../components/ui";
import { ModuleBento } from "../../components/module-bento";
import { PipelineRail } from "../../components/pipeline-rail";
import { WorkspaceShowcase } from "../../components/workspace-showcase";
import { ClosingCTA } from "../../components/closing-cta";
import { platforms } from "../../lib/product";

export const metadata = {
  title: "Features",
  description:
    "Fourteen modules, eleven production stages and eight permission levels. Explore the ManthanOS workspace from the ideas engine to channel analytics.",
};

/* One deep dive per module group, each naming the specific thing it does. */
const deepDives = [
  {
    group: "Core",
    headline: "Know what is moving before anyone asks",
    body: "The Command Center pulls the state of the workspace into one view: active projects, pending ideas, tasks due today, overdue tasks and completed work this week. Goals Planner holds the targets those numbers are measured against, so progress and intention stay on the same screen.",
    points: [
      "Twelve live metrics covering projects, ideas, tasks, approvals and attendance",
      "Monthly and quarterly goals with current-versus-target tracking",
      "Activity and audit logs for every meaningful change",
    ],
  },
  {
    group: "Workflow",
    headline: "Nothing advances without an owner",
    body: "An idea becomes a content project, a content project splits into phases, and each phase carries an assignee, a status and a due date. Meetings, daily logs and tasks hang off the same project, so the record explains itself.",
    points: [
      "Eleven content stages from IDEA through PUBLISHED",
      "Project phases with assignment, position and status",
      "Ideas Engine with voting, discussion and one-click conversion",
    ],
  },
  {
    group: "Business & Assets",
    headline: "The commercial layer sits beside the work",
    body: "Brand deals track value, deliverables and status against the team producing the work. The Asset Library holds logos, thumbnails and raw media with visibility rules. Channels and platform accounts describe exactly where everything lands.",
    points: [
      "Brand deals with amount, deliverables and negotiation state",
      "Asset library with image, video, audio, document and logo types",
      "Platform accounts linked to the channels they publish through",
    ],
  },
  {
    group: "Admin",
    headline: "Structure that keeps a growing team predictable",
    body: "Roles are seeded from a template for your workspace type, then scoped per resource. Chatrooms and polls handle lightweight decisions, attendance records the hours, and audit logs record who changed what.",
    points: [
      "Role templates per workspace type, editable afterwards",
      "Eight permission levels applied across twenty-two resources",
      "Chatrooms, polls, attendance and full audit history",
    ],
  },
];
export default function Features() {
  return (
    <>
      <Header />
      <main>
        <PageHead
          eyebrow="The platform"
          title="One workspace, from the first idea to the published result"
          lede="ManthanOS is a set of modules that share one data model. That is why a goal, a script, a meeting and a view count can all describe the same piece of work."
        >
          <div className="flex flex-wrap gap-2">
            {["Ideas Engine", "Production Pipeline", "Meetings", "Analytics", "Roles"].map((item) => (
              <StatusPill key={item} tone="live">{item}</StatusPill>
            ))}
          </div>
        </PageHead>

        {/* Bento first: the reader sees the real UI before reading claims */}
        <ModuleBento />

        {/* Deep dives — alternating editorial rows, deliberately not carded */}
        <section className="band-dark band-pad">
          <div className="shell">
            <Reveal>
              <SectionHead
                eyebrow="In detail"
                title="Four groups, and what each one is for"
                lede="Grouped the way the navigation is grouped, so you can find the module you need before reading a word of marketing."
              />
            </Reveal>

            <div className="mt-16">
              {deepDives.map((dive, index) => (
                <Reveal key={dive.group} delay={0.04}>
                  <article
                    className={`grid gap-8 border-t border-white/10 py-14 lg:grid-cols-[.34fr_.66fr] lg:gap-16 ${
                      index % 2 === 1 ? "lg:[&>*:first-child]:order-2" : ""
                    }`}
                  >
                    <p className="font-mono text-[11px] uppercase tracking-[.16em] text-royal-400">
                      {String(index + 1).padStart(2, "0")} · {dive.group}
                    </p>
                    <div className="max-w-[68ch]">
                      <h3 className="text-[clamp(22px,2.6vw,32px)] font-semibold leading-tight text-white">
                        {dive.headline}
                      </h3>
                      <p className="lede mt-5">{dive.body}</p>
                      <ul className="mt-8 grid gap-y-3">
                        {dive.points.map((point) => (
                          <li key={point} className="flex gap-3 border-t border-white/[.08] pt-3 text-[14.5px] leading-6 text-chalk-dim">
                            <span className="mt-[9px] h-1 w-1 shrink-0 rounded-full bg-royal-400" />
                            {point}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Channels: a marquee of real platform options, not borrowed logos */}
        <section className="band-paper band-pad-sm relative">
          <div className="shell relative">
            <p className="eyebrow">Connected platforms</p>
            <p className="mt-4 max-w-[46ch] text-[14.5px] leading-6 text-slate-dim">
              Channels and platform accounts are first-class records. These are the platforms a
              workspace can be connected to.
            </p>
          </div>
          <div className="marquee-mask mt-10 overflow-hidden">
            <div className="marquee-track gap-3">
              {[...platforms, ...platforms].map((platform, index) => (
                <span
                  key={`${platform}-${index}`}
                  className="whitespace-nowrap rounded-[10px] border border-[#dbe5f4] bg-white px-5 py-3 text-[14px] font-medium text-slate-ink"
                >
                  {platform}
                </span>
              ))}
            </div>
          </div>
        </section>

        <WorkspaceShowcase />
        <ClosingCTA />
      </main>
      <Footer />
    </>
  );
}
