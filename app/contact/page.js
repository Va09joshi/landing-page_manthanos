import { Header } from "../../components/site-header";
import { Footer } from "../../components/site-footer";
import { PageHead, Reveal } from "../../components/ui";
import { LeadForm } from "../../components/forms";
import { pageMetadata } from "../../lib/site";

export const metadata = pageMetadata({
  path: "/contact",
  title: "Contact",
  description:
    "Tell us what you are building, where the work gets stuck, or what you want to make easier. A person reads every message.",
});

/* Direct, specific routes rather than a generic "get in touch" panel. */
const routes = [
  { label: "Seeing the product in context", body: "Book a demo and we will walk a real campaign through the pipeline with you.", action: "Book a demo", href: "/request-demo" },
  { label: "Ready to start", body: "Submit a workspace application and we will provision the right shape for your team.", action: "Request a workspace", href: "/register" },
  { label: "Early access", body: "Join the testing programme and shape what gets built next.", action: "Become a tester", href: "/tester" },
];

export default function Contact() {
  return (
    <>
      <Header />
      <main>
        <PageHead
          eyebrow="Contact"
          title="Tell us where the work gets stuck"
          lede="A person reads every message. Share the specific thing that is not working rather than a general enquiry — it gets a far more useful answer."
        />

        <section className="band-paper band-pad relative">
          <div aria-hidden className="pointer-events-none absolute inset-0 mesh-light opacity-40" />
          <div className="shell relative">
            <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:gap-16">
              {/* Routes as an open list, not cards */}
              <div>
                <p className="eyebrow">Faster routes</p>
                <div className="mt-8 border-t border-white/10">
                  {routes.map((route) => (
                    <Reveal key={route.action}>
                      <div className="group border-b border-white/10 py-7">
                        <h2 className="text-[17px] font-medium text-chalk">{route.label}</h2>
                        <p className="mt-2.5 max-w-[44ch] text-[14.5px] leading-6 text-chalk-dim">
                          {route.body}
                        </p>
                        <a
                          href={route.href}
                          className="mt-4 inline-flex items-center gap-2 text-[14px] font-medium text-royal-400 transition-colors hover:text-soft"
                        >
                          {route.action}
                          <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">
                            &rarr;
                          </span>
                        </a>
                      </div>
                    </Reveal>
                  ))}
                </div>

                <p className="mt-10 max-w-[42ch] text-[13.5px] leading-6 text-chalk-dim">
                  Workspace applications go to a review queue before anything is created, so you will
                  hear back with specifics rather than an autoresponder.
                </p>
              </div>

              <Reveal delay={0.08}>
                <div className="glass-panel p-8 sm:p-9">
                  <h2 className="text-[21px] font-semibold text-chalk">Send a message</h2>
                  <p className="mt-2.5 text-[14px] text-chalk-dim">
                    All fields marked required are needed to route your message.
                  </p>
                  <div className="mt-8">
                    <LeadForm />
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
