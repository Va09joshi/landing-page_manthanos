import { Header } from "../../components/site-header";
import { Footer } from "../../components/site-footer";
import { PageHead, Reveal } from "../../components/ui";

export const metadata = {
  title: "Terms of service",
  description: "The terms that apply when you use ManthanOS.",
};

const sections = [
  {
    heading: "Using ManthanOS",
    body: [
      "You are responsible for your account and for the content your team creates inside it.",
      "Keep your credentials secure and tell us promptly if you believe an account has been accessed without permission.",
      "The service is provided to help teams organise legitimate creative and business work.",
    ],
  },
  {
    heading: "Your content",
    body: [
      "You keep ownership of everything you upload to a workspace.",
      "You grant us only the permission needed to store, process and display that content to the people you share it with.",
      "You are responsible for having the rights to the material you upload.",
    ],
  },
  {
    heading: "Acceptable use",
    body: [
      "Do not use the service to harm others, break the law, or send unsolicited bulk messages.",
      "Do not attempt to access workspaces or records that do not belong to you.",
      "Automated access that degrades the service for other workspaces is not permitted.",
    ],
  },
  {
    heading: "Our service",
    body: [
      "We work to keep ManthanOS reliable and secure, and may change features as the product evolves.",
      "We may suspend a workspace that breaches these terms, and will explain why where we can.",
      "These terms are written to be read. If any part is unclear, ask us before you rely on it.",
    ],
  },
];

export default function Terms() {
  return (
    <>
      <Header />
      <main>
        <PageHead eyebrow="Legal" title="The terms, in a form you can read" lede="Four sections, plain language. If something here does not make sense for your situation, ask before you commit." />

        <section className="band-paper band-pad">
          <div className="shell">
            <div className="max-w-[72ch]">
              {sections.map((section) => (
                <Reveal key={section.heading}>
                  <div className="border-t border-[#dbe5f4] py-10">
                    <h2 className="text-[20px] font-semibold text-slate-ink">{section.heading}</h2>
                    <ul className="mt-5 space-y-3">
                      {section.body.map((item) => (
                        <li key={item} className="flex gap-3 text-[15px] leading-7 text-slate-dim">
                          <span className="mt-[11px] h-1 w-1 shrink-0 rounded-full bg-royal-500" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </Reveal>
              ))}
              <p className="border-t border-[#dbe5f4] pt-8 text-[13.5px] text-slate-dim">
                Questions about these terms belong on the contact page, where a person will answer.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
