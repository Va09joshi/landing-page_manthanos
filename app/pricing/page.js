import { Header } from "../../components/site-header";
import { Footer } from "../../components/site-footer";
import { Button, Reveal } from "../../components/ui";
import { FAQ } from "../../components/trust-faq";
import { StructuredData } from "../../components/structured-data";
import { workspaceTypes } from "../../lib/product";
import { pageMetadata } from "../../lib/site";
import { Check, ArrowRight } from "lucide-react";

export const metadata = pageMetadata({
  path: "/pricing",
  title: "Pricing",
  description:
    "ManthanOS pricing by workspace type. Creator teams and companies start from the same platform; the modules and scale follow your workspace shape.",
});

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
      <StructuredData />
      <Header />
      <main>
        {/* ── Hero ──────────────────────────────────────────────────────── */}
        <section className="relative min-h-[52vh] flex items-center overflow-hidden band-dark">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{
              backgroundImage:
                "radial-gradient(ellipse 70% 60% at 50% -10%, rgba(36,95,245,0.35) 0%, transparent 65%), radial-gradient(ellipse 50% 40% at 80% 60%, rgba(27,77,228,0.12) 0%, transparent 65%), linear-gradient(180deg,#060910 0%,#07101f 100%)",
            }}
          />
          <div aria-hidden className="pointer-events-none absolute inset-0 mesh-dark opacity-40" />
          <div className="shell relative z-10 py-32 lg:py-40">
            <Reveal>
              <p className="eyebrow">Simple by design</p>
              <h1 className="mt-5 max-w-[18ch] text-[clamp(38px,5vw,68px)] font-bold leading-[1.06] tracking-[-0.035em] text-white">
                Pricing that follows the shape of your work
              </h1>
              <p className="lede mt-6 max-w-[52ch]">
                Every workspace runs on the same platform. What changes is which modules carry the load and how many people need an account.
              </p>
              <div className="mt-10 flex flex-wrap gap-3">
                <Button href="/register" size="lg" withArrow>Get a workspace</Button>
                <Button href="/contact" size="lg" variant="outline">Ask a question first</Button>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ── Two tracks ────────────────────────────────────────────────── */}
        <section className="band-raise band-pad relative">
          <div aria-hidden className="pointer-events-none absolute inset-0 mesh-dark opacity-25" />
          <div className="shell relative">
            <Reveal>
              <p className="eyebrow mb-10">Workspace types</p>
            </Reveal>
            <div className="grid gap-5 lg:grid-cols-[.85fr_1.15fr]">
              {tracks.map((track) => (
                <Reveal key={track.id}>
                  <article
                    className={`relative flex h-full flex-col rounded-2xl border p-8 transition-all ${
                      track.featured
                        ? "border-royal-500/40 bg-ink-800 shadow-[0_0_0_1px_rgba(36,95,245,.18),0_32px_64px_-24px_rgba(36,95,245,.45)]"
                        : "border-white/[.08] bg-ink-850"
                    }`}
                  >
                    {track.featured && (
                      <div
                        aria-hidden
                        className="pointer-events-none absolute inset-0 rounded-2xl"
                        style={{ background: "radial-gradient(ellipse 80% 50% at 50% 0%, rgba(36,95,245,0.1), transparent 70%)" }}
                      />
                    )}
                    <div className="relative flex items-center justify-between gap-3">
                      <span
                        className={`rounded-full px-3 py-1 font-mono text-[10px] uppercase tracking-[.12em] ${
                          track.featured
                            ? "bg-royal-500 text-white"
                            : "border border-white/[.12] bg-ink-700 text-chalk-dim"
                        }`}
                      >
                        {track.type}
                      </span>
                      {track.featured && (
                        <span className="font-mono text-[10px] uppercase tracking-[.12em] text-signal">
                          Most provisioned
                        </span>
                      )}
                    </div>

                    <h2 className="relative mt-7 text-[26px] font-semibold text-chalk">{track.name}</h2>
                    <p className="relative mt-1.5 text-[13.5px] text-chalk-dim">{track.lead}</p>
                    <p className="relative mt-6 max-w-[44ch] text-[15px] leading-7 text-chalk-dim">{track.for}</p>

                    <div className="relative mt-8 border-t border-white/[.07] pt-7">
                      <p className="mono-label text-chalk-faint">Modules</p>
                      <ul className="mt-4 grid gap-2">
                        {track.includes.map((item) => (
                          <li key={item} className="flex items-center gap-2.5 text-[14px] text-chalk-dim">
                            <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-royal-500/20 text-signal">
                              <Check size={10} strokeWidth={3} />
                            </span>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="relative mt-8 border-t border-white/[.07] pt-7">
                      <p className="mono-label text-chalk-faint">Roles created</p>
                      <div className="mt-4 flex flex-wrap gap-1.5">
                        {track.roles.map((role) => (
                          <span key={role} className="rounded-md border border-white/[.08] bg-ink-700 px-2.5 py-1.5 text-[12.5px] text-chalk-dim">
                            {role}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="relative mt-auto pt-9">
                      <a
                        href="/register"
                        className={`group flex w-full items-center justify-center gap-2 rounded-[10px] py-3.5 text-[14px] font-semibold transition-all ${
                          track.featured
                            ? "bg-royal-500 text-white hover:bg-royal-400 shadow-[0_6px_20px_-8px_rgba(36,95,245,.7)]"
                            : "border border-white/[.12] bg-ink-700 text-chalk hover:bg-ink-600"
                        }`}
                      >
                        Request this workspace
                        <ArrowRight size={15} className="transition-transform duration-200 group-hover:translate-x-0.5" />
                      </a>
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>

            {/* ── Always included + What varies ── */}
            <Reveal delay={0.1}>
              <div className="mt-5 grid gap-5 lg:grid-cols-[1.35fr_.65fr]">
                <div className="rounded-2xl border border-white/[.08] bg-ink-850 p-8">
                  <h3 className="text-[20px] font-semibold text-chalk">Included on every workspace</h3>
                  <p className="mt-3 max-w-[54ch] text-[14.5px] leading-6 text-chalk-dim">
                    Neither track is a reduced edition. These are the parts of the platform that do not vary with workspace type.
                  </p>
                  <ul className="mt-8 grid gap-x-10 gap-y-3 sm:grid-cols-2">
                    {alwaysIncluded.map((item) => (
                      <li key={item} className="flex items-start gap-2.5 border-t border-white/[.06] pt-3 text-[14px] leading-6 text-chalk-dim">
                        <span className="mt-[9px] h-1 w-1 shrink-0 rounded-full bg-royal-500" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="rounded-2xl border border-royal-500/20 bg-ink-800 p-8"
                  style={{ background: "linear-gradient(145deg,#0e1626,#0a1020)" }}>
                  <p className="mono-label text-chalk-faint">What varies</p>
                  <dl className="mt-6 space-y-6">
                    {scaleNotes.map(([label, value]) => (
                      <div key={label}>
                        <dt className="text-[14px] font-medium text-chalk">{label}</dt>
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

        {/* ── Closing CTA ───────────────────────────────────────────────── */}
        <section className="band-dark relative overflow-hidden border-t border-white/[.06] py-24">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{ backgroundImage: "radial-gradient(ellipse 60% 50% at 50% 100%, rgba(36,95,245,0.18), transparent 65%)" }}
          />
          <div className="shell relative">
            <Reveal>
              <div className="flex flex-col items-center text-center">
                <p className="eyebrow">Ready when you are</p>
                <h2 className="mt-5 max-w-[24ch] text-[clamp(28px,3.5vw,44px)] font-bold leading-tight tracking-tight text-white">
                  Get a workspace provisioned for your team
                </h2>
                <p className="lede mt-5 max-w-[44ch]">
                  Tell us how your team works. We review every application and set up the right structure for you.
                </p>
                <Button href="/register" size="lg" withArrow className="mt-10">Request a workspace</Button>
              </div>
            </Reveal>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
