import Link from "next/link";
import { WorkspaceApplicationForm } from "../../components/forms";

export const metadata = { title: "Request a workspace" };

const steps = [
  ["01", "Choose your model", "Creator and company workspaces start with different operating defaults."],
  ["02", "Tell us how you work", "Team size, workflow, and goals shape the initial setup."],
  ["03", "Superadmin review", "Your workspace and owner access are created only after approval."],
];

export default function Register() {
  return (
    <main className="min-h-screen bg-[#f4f7fb] px-4 py-6 sm:px-6 sm:py-10">
      <div className="mx-auto w-full max-w-6xl">
        <div className="mb-6 flex items-center justify-between">
          <Link href="/" className="display-font text-xl font-bold text-slate-950">manthan<span className="text-[#1677ff]">OS</span></Link>
          <Link href="/login" className="text-sm font-semibold text-[#44566c] transition hover:text-[#0b5fcc]">Already approved? Sign in</Link>
        </div>
        <div className="grid overflow-hidden rounded-[28px] border border-[#d9e4f0] bg-white shadow-[0_28px_90px_rgba(23,48,77,.10)] lg:grid-cols-[310px_1fr]">
          <aside className="relative overflow-hidden bg-[#0b2545] p-7 text-white sm:p-9">
            <div className="absolute -right-20 -top-20 h-56 w-56 rounded-full border-[42px] border-[#1677ff]/20" />
            <div className="relative">
              <p className="text-xs font-bold uppercase tracking-[.2em] text-[#8dc2ff]">Workspace handoff</p>
              <h2 className="display-font mt-4 text-3xl font-bold leading-tight">From request to a ready operating system.</h2>
              <div className="mt-9 space-y-7">
                {steps.map(([number, title, detail], index) => (
                  <div key={number} className="relative flex gap-4">
                    {index < steps.length - 1 ? <span className="absolute left-[15px] top-9 h-[calc(100%+12px)] w-px bg-white/15" /> : null}
                    <span className="relative flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[#8dc2ff]/50 bg-[#102f55] text-[10px] font-black tracking-wider text-[#8dc2ff]">{number}</span>
                    <div><h3 className="font-bold">{title}</h3><p className="mt-1 text-sm leading-5 text-blue-100/70">{detail}</p></div>
                  </div>
                ))}
              </div>
              <div className="mt-10 rounded-2xl border border-white/10 bg-white/5 p-4 text-sm leading-6 text-blue-50/80">Common tools include projects, tasks, meetings, chat, attendance, files, and role-based team access.</div>
            </div>
          </aside>
          <section className="p-6 sm:p-9 lg:p-11">
            <div className="max-w-2xl">
              <p className="text-xs font-bold uppercase tracking-[.18em] text-[#0b5fcc]">Workspace application</p>
              <h1 className="display-font mt-2 text-3xl font-bold leading-tight text-slate-950 sm:text-4xl">Choose the operating model that fits your team.</h1>
              <p className="mt-3 text-sm leading-6 text-[#64748b]">Creator and company workspaces share collaboration tools, then add workflows built for their kind of operation.</p>
            </div>
            <div className="mt-8"><WorkspaceApplicationForm /></div>
          </section>
        </div>
      </div>
    </main>
  );
}
