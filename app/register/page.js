import Link from "next/link";
import Image from "next/image";
import { PublicWorkspaceApplicationForm } from "../../components/forms";

export const metadata = { title: "Request a workspace" };

const steps = [
  ["01", "Choose workspace", "Pick creator or company so the request reaches the right review flow."],
  ["02", "Share team details", "Tell us the people, platforms, industry, and work model you need."],
  ["03", "Review and setup", "Superadmin approves the request and creates owner access."],
];

export default function Register() {
  return (
    <main className="min-h-screen bg-[#eef4fb] px-3 py-4 sm:px-6 sm:py-8 lg:py-10">
      <div className="mx-auto w-full max-w-7xl">
        <div className="mb-5 flex items-center justify-center sm:mb-6">
          <Link href="/" aria-label="ManthanOS home" className="inline-flex items-center">
            <Image src="/dark_logo.png" alt="ManthanOS" width={186} height={56} priority className="h-10 w-auto sm:h-12" />
          </Link>
        </div>
        <div className="grid overflow-hidden rounded-[24px] border border-[#d9e4f0] bg-white shadow-[0_28px_90px_rgba(23,48,77,.10)] lg:grid-cols-[390px_1fr] xl:grid-cols-[420px_1fr]">
          <aside className="relative overflow-hidden bg-[#0b2545] p-6 text-white sm:p-8 lg:p-9">
            <div className="absolute -right-20 -top-20 h-56 w-56 rounded-full border-[42px] border-[#1677ff]/18" />
            <div className="absolute bottom-0 left-0 h-36 w-full bg-[linear-gradient(0deg,rgba(22,119,255,.18),transparent)]" />
            <div className="relative flex h-full flex-col">
              <Image src="/light_logo.png" alt="ManthanOS" width={212} height={64} priority className="mb-8 h-11 w-auto object-contain" />
              <p className="text-xs font-bold uppercase tracking-[.2em] text-[#8dc2ff]">Public workspace request</p>
              <h2 className="display-font mt-4 text-3xl font-bold leading-tight sm:text-4xl lg:text-[2.45rem]">Apply once. Superadmin creates the right operating system.</h2>
              <p className="mt-4 text-sm leading-6 text-blue-100/75">Creator teams and companies share the same access foundation, then receive the tools that fit their work model.</p>
              <div className="mt-9 grid gap-4">
                {steps.map(([number, title, detail], index) => (
                  <div key={number} className="relative rounded-2xl border border-white/10 bg-white/[.045] p-4">
                    {index < steps.length - 1 ? <span className="absolute -bottom-4 left-8 h-4 w-px bg-white/15" /> : null}
                    <div className="flex gap-4">
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-[#8dc2ff]/45 bg-[#102f55] text-[11px] font-black tracking-wider text-[#8dc2ff]">{number}</span>
                      <div>
                        <h3 className="font-bold">{title}</h3>
                        <p className="mt-1 text-sm leading-5 text-blue-100/70">{detail}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-8 grid gap-3 lg:mt-auto lg:pt-8">
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm leading-6 text-blue-50/80">Common tools include projects, tasks, meetings, chat, attendance, files, and role-based team access.</div>
                <div className="rounded-2xl border border-[#8dc2ff]/20 bg-[#8dc2ff]/10 p-4 text-sm leading-6 text-blue-50/85">Creator requests unlock content planning and brand workflows. Company requests unlock CRM, departments, and delivery phases.</div>
              </div>
            </div>
          </aside>
          <section className="bg-[#fbfdff] p-4 sm:p-7 lg:p-10">
            <div className="mx-auto max-w-4xl">
              <p className="text-xs font-bold uppercase tracking-[.18em] text-[#0b5fcc]">Workspace application</p>
              <h1 className="display-font mt-2 text-3xl font-bold leading-tight text-slate-950 sm:text-4xl">Choose the operating model that fits your team.</h1>
              <p className="mt-3 text-sm leading-6 text-[#64748b]">Creator and company workspaces share collaboration tools, then add workflows built for their kind of operation.</p>
            </div>
            <div className="mx-auto mt-7 max-w-4xl rounded-[22px] border border-[#dbe8f6] bg-white p-4 shadow-[0_20px_70px_rgba(17,36,61,.08)] sm:p-6 lg:p-7"><PublicWorkspaceApplicationForm /></div>
          </section>
        </div>
      </div>
    </main>
  );
}
