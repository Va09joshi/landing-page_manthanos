import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Header } from "../../components/site-header";
import { Footer } from "../../components/site-footer";
import { PageHead, Reveal, SectionHead } from "../../components/ui";
import { roleTemplates, workspaceTypes } from "../../lib/product";
import { pageMetadata } from "../../lib/site";

export const metadata = pageMetadata({
  path: "/use-cases",
  title: "Use cases",
  description:
    "How creator teams, agencies, studios and growing companies each use ManthanOS, and which modules carry the weight for each.",
});

/*
  Each use case alternates side on purpose. A four-up grid of identical cards
  says nothing about how the work differs, so the page alternates editorial
  rows instead, then closes with a dense role lookup — because that is what a
  role template genuinely is.
*/
const useCases = [
  {
    id: "creator",
    label: "Creator teams",
    kind: "Creator workspace",
    headline: "A small crew that publishes on a rhythm, not on inspiration",
    body: "A creator team is measured on output and sponsorship income. ManthanOS keeps scripts, phases, publishing dates and brand deliverables in one record, so the editor knows what is due and the owner knows what a deal owes them.",
    metrics: [
      ["Goal", "Publish long-form videos", "On a weekly cadence"],
      ["Deal", "Brand partnership", "In negotiation · terms stay in the workspace"],
    ],
    modules: workspaceTypes[0].modules,
  },
  {
    id: "agency",
    label: "Agencies",
    kind: "Agency workspace",
    headline: "Client work where the account and the delivery are the same room",
    body: "An agency must constantly answer three questions: what is due for the client, who owns it, and has it been approved. Client projects, project phases and roles keep all three answerable without a status meeting.",
    metrics: [
      ["Role", "Account Manager", "View · Comment · Edit"],
      ["Role", "Client", "View · Comment"],
    ],
    modules: workspaceTypes[2].modules,
  },
  {
    id: "company",
    label: "Growing companies",
    kind: "Company workspace",
    headline: "Delivery work spread across people who were never in the same room",
    body: "As headcount grows, work stops moving because context gets assumed. A company workspace puts phases, leads, attendance and approvals on records with named owners, so a new joiner can see what is actually happening in week one.",
    metrics: [
      ["Lead", "Inbound enquiry · fintech", "Needs a CRM rollout plan"],
      ["Lead", "Inbound enquiry · software", "Delivery dashboards"],
    ],
    modules: workspaceTypes[1].modules,
  },
  {
    id: "studio",
    label: "Studios",
    kind: "Creator workspace",
    headline: "Making the invisible work visible without making it heavy",
    body: "A studio runs the same pipeline as a creator but bills more people for it. Attendance records the hours, phases record the progress, and reports show the difference — without asking anyone to write a status paragraph.",
    metrics: [
      ["Attendance", "Clock in and breaks", "Recorded per person"],
      ["Reports", "Delivery by phase", "Snapshot per project"],
    ],
    modules: ["Attendance", "Reports", "Project Phases", "Meetings", "Daily Logs", "Chatrooms"],
  },
];

export default function UseCases() {
  return (
    <>
      <Header />
      <main>
        <PageHead
          eyebrow="For your kind of work"
          title="Different teams. The same underlying model."
          lede="A creator's bottleneck is publishing rhythm. An agency's is client visibility. A company's is context across people. ManthanOS is one data model serving three different pressure points."
        />

        <section className="band-paper band-pad relative">
          <div aria-hidden className="pointer-events-none absolute inset-0 mesh-light opacity-40" />
          <div className="shell relative">
            {useCases.map((useCase, index) => (
              <Reveal key={useCase.id} delay={0.04}>
                <article
                  className={`grid gap-10 border-t border-[#dbe5f4] py-14 lg:grid-cols-[.55fr_.45fr] lg:gap-16 ${
                    index % 2 === 1 ? "lg:[&>*:first-child]:order-2" : ""
                  }`}
                >
                  <div>
                    <p className="eyebrow">{useCase.kind}</p>
                    <h2 className="mt-5 max-w-[20ch] text-[clamp(22px,2.7vw,32px)] font-semibold leading-tight text-slate-ink">
                      {useCase.headline}
                    </h2>
                    <p className="lede mt-5">{useCase.body}</p>

                    <div className="mt-8 flex flex-wrap gap-2">
                      {useCase.modules.map((module) => (
                        <span key={module} className="rounded-md border border-[#dbe5f4] bg-white px-2.5 py-1.5 text-[12.5px] text-slate-dim">
                          {module}
                        </span>
                      ))}
                    </div>

                    <Link
                      href="/request-demo"
                      className="mt-8 inline-flex items-center gap-2 text-[14px] font-medium text-royal-600 transition-colors hover:text-royal-700"
                    >
                      Talk through this use case
                      <ArrowUpRight size={15} />
                    </Link>
                  </div>

                  {/* Live record panel: the data this team actually works with */}
                  <div className="plate-paper self-start p-7">
                    <p className="mono-label text-slate-dim">What it looks like</p>
                    <dl className="mt-6 space-y-5">
                      {useCase.metrics.map(([label, name, value]) => (
                        <div key={name} className="border-b border-[#eaf0f9] pb-5 last:border-0 last:pb-0">
                          <dt className="font-mono text-[10px] uppercase tracking-[.12em] text-slate-dim">{label}</dt>
                          <dd className="mt-2 text-[15px] font-medium text-slate-ink">{name}</dd>
                          <dd className="mt-1 text-[13.5px] leading-6 text-slate-dim">{value}</dd>
                        </div>
                      ))}
                    </dl>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </section>

        {/* Role templates: a dense table, because a role template genuinely is a lookup */}
        <section className="band-dark band-pad">
          <div className="shell">
            <Reveal>
              <SectionHead
                eyebrow="Who sees what"
                title="Roles are seeded for your workspace type"
                lede="You are not asked to design a permission model from scratch. Each workspace type starts with a role template you can adjust afterwards."
              />
            </Reveal>

            <div className="mt-14 overflow-x-auto scroll-rail">
              <table className="w-full min-w-[560px] border-collapse text-left">
                <thead>
                  <tr className="border-b border-white/12">
                    <th className="pb-4 pr-6 font-mono text-[11px] font-normal uppercase tracking-[.12em] text-white/30">
                      Workspace type
                    </th>
                    <th className="pb-4 font-mono text-[11px] font-normal uppercase tracking-[.12em] text-white/30">
                      Roles created on provisioning
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {Object.entries(roleTemplates).map(([type, roles]) => (
                    <tr key={type} className="border-b border-white/[.07]">
                      <td className="py-5 pr-6 align-top text-[15px] font-medium text-white">
                        {workspaceTypes.find((item) => item.id === type)?.label ?? type}
                      </td>
                      <td className="py-5">
                        <div className="flex flex-wrap gap-2">
                          {roles.map((role) => (
                            <span key={role} className="rounded-md border border-white/10 bg-white/[.04] px-2.5 py-1.5 text-[12.5px] text-chalk-dim">
                              {role}
                            </span>
                          ))}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
