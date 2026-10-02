import { Header } from "../../components/site-header";
import { Footer } from "../../components/site-footer";
import { PageHead, Reveal } from "../../components/ui";
import { LeadForm } from "../../components/forms";
import { pipelineGroups, workspaceTypes } from "../../lib/product";

export const metadata = {
  title: "Request a demo",
  description:
    "See how ManthanOS fits the way your team already works. We will map one live campaign against the eleven-stage pipeline.",
};

/* What actually happens in the session — stated as commitments, not adjectives. */
const agenda = [
  {
    title: "We walk your workflow, not our demo data",
    body: "Bring a campaign or client engagement that is live right now. We will map it against the eleven stages and show you where it actually sits.",
  },
  {
    title: "We show the portal each role would use",
    body: "Admin, Employee and Public are different surfaces. You will see the one your team would open every morning.",
  },
  {
    title: "You leave with a next step, not a proposal",
    body: "If ManthanOS does not fit how your team works, we will say so on the call. That is more useful to both of us than a quote.",
  },
];

export default function RequestDemo() {
  return (
    <>
      <Header />
      <main>
        <PageHead
          eyebrow="See it in context"
          title="Let us run your work through it"
          lede="Tell us about your team and we will show you how ManthanOS fits the way you already operate — using your work, not a sample workspace."
        />

        <section className="band-paper band-pad relative">
          <div aria-hidden className="pointer-events-none absolute inset-0 mesh-light opacity-40" />
          <div className="shell relative">
            <div className="grid gap-12 lg:grid-cols-[.85fr_1.15fr] lg:gap-16">
              {/* Agenda, numbered because it is an ordered sequence */}
              <Reveal>
                <p className="eyebrow">In the session</p>
                <ol className="mt-8 border-t border-[#dbe5f4]">
                  {agenda.map((item, index) => (
                    <li key={item.title} className="grid gap-2 border-b border-[#dbe5f4] py-7 sm:grid-cols-[auto_1fr] sm:gap-6">
                      <span className="font-mono text-[11px] text-slate-dim">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <div>
                        <h2 className="text-[17px] font-medium text-slate-ink">{item.title}</h2>
                        <p className="mt-2.5 max-w-[42ch] text-[14.5px] leading-6 text-slate-dim">
                          {item.body}
                        </p>
                      </div>
                    </li>
                  ))}
                </ol>

                {/* The four layers the session covers — ties back to the hero 3D */}
                <div className="mt-10 rounded-[14px] bg-ink-950 p-7 text-chalk">
                  <p className="mono-label text-white/35">We will cover</p>
                  <div className="mt-5 grid gap-px overflow-hidden rounded-[10px] bg-white/10 sm:grid-cols-2">
                    {pipelineGroups.map((group) => (
                      <div key={group.id} className="bg-ink-950 px-5 py-4">
                        <p className="text-[14px] font-medium text-white">{group.id}</p>
                        <p className="mt-1.5 text-[12.5px] leading-5 text-chalk-dim">{group.caption}</p>
                      </div>
                    ))}
                  </div>
                  <p className="mt-6 text-[13px] leading-6 text-white/40">
                    Shaped for {workspaceTypes.map((type) => type.label.toLowerCase()).join(", ")}.
                  </p>
                </div>
              </Reveal>

              <Reveal delay={0.08}>
                <div className="plate-paper p-8 sm:p-9">
                  <h2 className="text-[21px] font-semibold text-slate-ink">Request a demo</h2>
                  <p className="mt-2.5 text-[14px] text-slate-dim">
                    We reply with times. If something is unclear we will ask before the call, not during it.
                  </p>
                  <div className="mt-8">
                    <LeadForm demo />
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
