import { Header } from "../../components/site-header";
import { Footer } from "../../components/site-footer";
import { PageHead, Reveal } from "../../components/ui";
import { pageMetadata } from "../../lib/site";

export const metadata = pageMetadata({
  path: "/privacy",
  title: "Privacy policy",
  description: "What ManthanOS collects, why, and what you can ask us to do about it.",
});

const sections = [
  {
    heading: "What we collect",
    body: [
      "Account details you give us: name, email and a hashed password.",
      "Workspace information you enter: projects, phases, tasks, goals, leads, brand deals and files you upload.",
      "Messages you send through this website, including demo and workspace requests.",
    ],
  },
  {
    heading: "How we use it",
    body: [
      "To operate the service — authenticating you, storing your workspace and rendering what you see.",
      "To respond to requests you make, such as a demo or workspace application.",
      "To improve the product, based on aggregate usage rather than individual tracking.",
    ],
  },
  {
    heading: "What we do not do",
    body: [
      "We do not sell your personal information.",
      "We do not use third-party advertising trackers on this website.",
      "We do not send marketing email unless you have asked for it.",
    ],
  },
  {
    heading: "Media and credentials",
    body: [
      "Files you upload are stored in the workspace asset library and are visible according to the permissions you set.",
      "Stored credentials can only be opened by roles explicitly granted that permission, and every access is written to the audit log.",
    ],
  },
  {
    heading: "Your choices",
    body: [
      "You can ask us to access, correct or delete your personal information at any time.",
      "You can ask us to close your workspace, which removes its records subject to any retention we are required to keep.",
      "Write to us through the contact page and a person will handle the request.",
    ],
  },
];

export default function Privacy() {
  return (
    <>
      <Header />
      <main>
        <PageHead eyebrow="Legal" title="Privacy, in plain language" lede="What we collect, why we collect it, and what you can ask us to change." />

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
                Last reviewed with this redesign. For any request, use the contact page.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
