import { Header } from "../../components/site-header";
import { Footer } from "../../components/site-footer";
import { Button, PageHead, Reveal } from "../../components/ui";
import { FAQ } from "../../components/trust-faq";
import { workspaceTypes } from "../../lib/product";

export const metadata = {
  title: "Pricing",
  description:
    "ManthanOS pricing by workspace type. Creator teams and companies start from the same platform; the modules and scale follow your workspace shape.",
};

/*
  There is deliberately no invented price ladder here. Subscription, Plan and
  Enquiry all exist in the schema, but no published price does — so this page
  sells the shape of the plan and routes to a real conversation. A fabricated
  "$29/mo" would have been the easiest thing to write and the least honest.
*/
const tracks = [
  {
    id: "creator",
    type: "CREATOR",
    name: "Creator team",
    lead: "Studios, creators, editors, managers",
    for: "For a compact production crew measured on output and sponsorship income.",
    includes: workspaceTypes[0].modules,
    roles: ["Owner", "Manager", "Editor", "Designer", "Viewer"],
  },
  {
    id: "company",
    type: "COMPANY",
    name: "Company",
    lead: "Agencies, consultancies, startups, enterprise",
    for: "For teams delivering to other people, where approvals and visibility carry the risk.",
    includes: workspaceTypes[1].modules,
    roles: ["Owner", "Admin", "Department Lead", "Project Manager", "Employee", "Reviewer", "Viewer"],
    featured: true,
  },
];

const alwaysIncluded = [
  "Workspace provisioned by our team, not self-configured",
  "Role template created for your workspace type",
  "Ideas, content projects, phases, tasks and daily logs",
  "Meetings with rooms, transcripts and notes",
  "Asset library, channels, platform accounts and links",
  "Analytics and report snapshots",
  "Audit and activity logs",
];

const scaleNotes = [
  ["Seats", "Priced per person who needs an account"],
  ["Workspaces", "One per organisation, provisioned after review"],
  ["Storage", "Media held in the asset library, scaled to your plan"],
  ["Billing", "Subscription and plan records exist in the model"],
];

export default function Pricing() {
  return (
    <>
      <Header />
      <main>
        <PageHead
          eyebrow="Simple by design"
          title="Pricing follows the shape of your work"
          lede="Every workspace runs on the same platform. What changes is which modules carry the load and how many people need an account. Tell us which shape you are and we will price it properly."
        >
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button href="/request-demo" size="lg" withArrow>Book a demo</Button>
            <Button href="/contact" size="lg" variant="outline">Ask a question first</Button>
          </div>
        </PageHead>

        {/* Two tracks, asymmetric: the featured one gets more room */}
        <section className="band-paper band-pad relative">
          <div aria-hidden className="pointer-events-none absolute inset-0 mesh-light opacity-40" />
          <div className="shell relative">
            <div className="grid gap-4 lg:grid-cols-[.85fr_1.15fr]">
              {tracks.map((track) => (
                <Reveal key={track.id}>
                  <article
                    className={`flex h-full flex-col rounded-[16px] border p-9 ${
                      track.featured
                        ? "border-royal-400 bg-white shadow-[0_30px_70px_-40px_rgba(27,77,228,.55)]"
                        : "border-[#dbe5f4] bg-white/70"
                    }`}
                  >
                    <div className="flex items-center justify-between gap-3">
                      <span
                        className={`rounded-full px-3 py-1 font-mono text-[10px] uppercase tracking-[.12em] ${
                          track.featured
                            ? "bg-royal-500 text-white"
                            : "border border-[#d5e1f2] bg-paper-2 text-slate-dim"
                        }`}
                      >
                        {track.type}
                      </span>
                      {track.featured && (
                        <span className="font-mono text-[10px] uppercase tracking-[.12em] text-royal-600">
                          Most provisioned
                        </span>
                      )}
                    </div>

                    <h2 className="mt-7 text-[26px] font-semibold text-slate-ink">{track.name}</h2>
                    <p className="mt-1.5 text-[13.5px] text-slate-dim">{track.lead}</p>
                    <p className="mt-6 max-w-[44ch] text-[15px] leading-7 text-slate-dim">{track.for}</p>

                    <div className="mt-8 border-t border-[#eaf0f9] pt-7">
                      <p className="mono-label text-slate-dim">Modules</p>
                      <ul className="mt-4 grid gap-2">
                        {track.includes.map((item) => (
                          <li key={item} className="flex items-center gap-2.5 text-[14px] text-slate-ink">
                            <span className="h-1 w-1 rounded-full bg-royal-500" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="mt-8 border-t border-[#eaf0f9] pt-7">
                      <p className="mono-label text-slate-dim">Roles created</p>
                      <div className="mt-4 flex flex-wrap gap-1.5">
                        {track.roles.map((role) => (
                          <span key={role} className="rounded-md border border-[#dbe5f4] bg-paper px-2.5 py-1.5 text-[12.5px] text-slate-dim">
                            {role}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="mt-auto pt-9">
                      <Button
                        href="/request-demo"
                        variant={track.featured ? "primary" : "paperOutline"}
                        className="w-full"
                      >
                        Request this workspace
                      </Button>
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>

            {/* What does not vary between tracks — stated once, openly */}
            <Reveal delay={0.1}>
              <div className="mt-4 grid gap-4 lg:grid-cols-[1.35fr_.65fr]">
                <div className="rounded-[16px] border border-[#dbe5f4] bg-white p-9">
                  <h3 className="text-[20px] font-semibold text-slate-ink">Included on every workspace</h3>
                  <p className="mt-3 max-w-[54ch] text-[14.5px] leading-6 text-slate-dim">
                    Neither track is a reduced edition. These are the parts of the platform that do
                    not vary with workspace type.
                  </p>
                  <ul className="mt-8 grid gap-x-10 gap-y-3 sm:grid-cols-2">
                    {alwaysIncluded.map((item) => (
                      <li key={item} className="flex items-start gap-2.5 border-t border-[#eaf0f9] pt-3 text-[14px] leading-6 text-slate-dim">
                        <span className="mt-[9px] h-1 w-1 shrink-0 rounded-full bg-royal-500" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="rounded-[16px] bg-ink-950 p-9 text-chalk">
                  <p className="mono-label text-white/35">What varies</p>
                  <dl className="mt-6 space-y-6">
                    {scaleNotes.map(([label, value]) => (
                      <div key={label}>
                        <dt className="text-[14px] font-medium text-white">{label}</dt>
                        <dd className="mt-1.5 text-[13.5px] leading-6 text-chalk-dim">{value}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        <FAQ />

        <section className="band-white border-t border-[#dbe5f4] py-20">
          <div className="shell">
            <Reveal>
              <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
                <div>
                  <p className="eyebrow">Ready when you are</p>
                  <h2 className="mt-4 max-w-[24ch] text-[clamp(24px,3vw,36px)] font-semibold leading-tight text-slate-ink">
                    Get a workspace provisioned for your team
                  </h2>
                </div>
                <Button href="/register" size="lg" withArrow>Request a workspace</Button>
              </div>
            </Reveal>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

