import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Header } from "../../components/site-header";
import { Footer } from "../../components/site-footer";
import { PageHead, Reveal, SectionHead } from "../../components/ui";
import { pageMetadata } from "../../lib/site";

export const metadata = pageMetadata({
  path: "/about",
  title: "About",
  description:
    "ManthanOS is a multi-portal operations platform for creator teams, agencies and companies — built so operational work stops competing with the craft.",
});

/* Stated as positions rather than adjectives. */
const positions = [
  {
    headline: "The operational layer should be considered too",
    body: "We build admin tooling that gets used eight hours a day. That earns the same care as a customer-facing product, so records are typed, permissions are explicit and states are never guessed.",
  },
  {
    headline: "Structure should reduce ceremony, not add it",
    body: "A workspace has opinions about what a project is and what a phase is. Those opinions save a team from designing its own, and they cost nothing once adopted.",
  },
  {
    headline: "Honest status beats optimistic reporting",
    body: "A phase that has not moved shows as not moved. We would rather a Command Center be uncomfortable than comfortable and wrong.",
  },
  {
    headline: "Show the product, not the aspiration",
    body: "Every screenshot and record on this site comes from the running application. We have not published testimonials or adoption numbers, because there are none to publish yet.",
  },
];

export default function About() {
  return (
    <>
      <Header />
      <main>
        <PageHead
          eyebrow="About ManthanOS"
          title="Operations software, held to a product standard"
          lede="ManthanOS is the layer a creator team, agency or company runs on once the craft and the operations both have to be good."
        />

        {/* Editorial split: statement left, argument right — not two equal cards */}
        <section className="band-paper band-pad relative">
          <div aria-hidden className="pointer-events-none absolute inset-0 mesh-light opacity-40" />
          <div className="shell relative">
            <div className="grid gap-12 lg:grid-cols-[.8fr_1.2fr] lg:gap-20">
              <Reveal>
                <p className="eyebrow">What we think</p>
                <h2 className="mt-5 max-w-[16ch] text-[clamp(24px,3vw,38px)] font-semibold leading-tight text-slate-ink">
                  Four positions that shaped the product
                </h2>
              </Reveal>

              <div>
                {positions.map((position, index) => (
                  <Reveal key={position.headline} delay={0.04}>
                    <article className="grid gap-4 border-t border-[#dbe5f4] py-9 sm:grid-cols-[auto_1fr] sm:gap-8">
                      <span className="font-mono text-[11px] text-slate-dim">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <div>
                        <h3 className="text-[19px] font-semibold leading-snug text-slate-ink">
                          {position.headline}
                        </h3>
                        <p className="mt-3 max-w-[60ch] text-[15px] leading-7 text-slate-dim">
                          {position.body}
                        </p>
                      </div>
                    </article>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Scale, stated as structure rather than achievement */}
        <section className="band-dark band-pad">
          <div className="shell">
            <Reveal>
              <SectionHead
                eyebrow="Where it stands"
                title="What exists today"
                lede="An honest inventory of the product as it is built, not a roadmap of things we hope to ship."
              />
            </Reveal>

            <div className="mt-14 grid gap-px overflow-hidden rounded-[14px] border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
              {[
                ["60+", "typed entities", "Content projects, phases, tasks, goals, leads, deals, attendance, credentials and audit history — all first-class records."],
                ["22", "permission resources", "From team and roles to credentials and AI runs, each scopeable at eight levels."],
                ["3", "portals", "Admin, Employee and Public, each scoped to what that role actually needs."],
                ["1", "shared model", "A goal, a script, a meeting and a view count all describe the same work."],
              ].map(([value, label, detail], index) => (
                <Reveal key={label} delay={index * 0.05}>
                  <div className="h-full bg-ink-950 p-8">
                    <p className="text-[clamp(32px,3.6vw,44px)] font-semibold leading-none text-white">
                      {value}
                    </p>
                    <p className="mt-3 font-mono text-[11px] uppercase tracking-[.13em] text-signal">
                      {label}
                    </p>
                    <p className="mt-5 text-[13.5px] leading-6 text-chalk-dim">{detail}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
