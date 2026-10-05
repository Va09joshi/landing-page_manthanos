"use client";
/* eslint-disable react/no-unescaped-entities */

import Link from "next/link";
import { ArrowLeft, ArrowRight, Building2, CheckCircle2, Clapperboard, Loader2 } from "lucide-react";
import { useState } from "react";
import { api } from "../lib/api";

const initial = { name: "", email: "", company: "", message: "" };

export function LeadForm({ demo = false }) {
  const [form, setForm] = useState(initial);
  const [state, setState] = useState({ loading: false, done: false, error: "" });
  const update = (event) => setForm({ ...form, [event.target.name]: event.target.value });
  async function submit(event) {
    event.preventDefault(); setState({ loading: true, done: false, error: "" });
    try { await api.lead({ ...form, source: demo ? "request-demo" : "contact" }); setState({ loading: false, done: true, error: "" }); setForm(initial); }
    catch (error) { setState({ loading: false, done: false, error: error.message }); }
  }
  if (state.done) return <div className="rounded-2xl border border-emerald-400/25 bg-emerald-500/10 p-8 text-center"><div className="mx-auto mb-4 flex h-11 w-11 items-center justify-center rounded-full bg-emerald-500 text-white shadow-[0_10px_24px_-10px_rgba(16,185,129,.8)]">✓</div><h3 className="display-font text-2xl font-bold text-chalk">Request received.</h3><p className="mt-2 text-sm text-white/65">We will be in touch soon.</p></div>;
  return <form onSubmit={submit} className="space-y-4">{state.error && <p className="rounded-lg border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-300">{state.error}</p>}<div className="grid gap-4 sm:grid-cols-2"><Field label="Name" name="name" value={form.name} onChange={update} required /><Field label="Work email" name="email" type="email" value={form.email} onChange={update} required /></div><Field label="Company or studio" name="company" value={form.company} onChange={update} /><label className="block text-[13px] font-medium text-white/70">What are you working on?<textarea name="message" value={form.message} onChange={update} rows="5" className="mt-2 w-full resize-none rounded-xl border border-white/[.12] bg-white/[.05] px-4 py-3 text-[15px] text-chalk shadow-[inset_0_2px_6px_rgba(2,6,16,.6),inset_0_-1px_0_rgba(255,255,255,.05)] outline-none transition placeholder:text-white/35 focus:border-royal-400 focus:bg-white/[.07] focus:ring-4 focus:ring-royal-500/20" placeholder="Tell us a little about your team and workflow." /></label><button disabled={state.loading} className="w-full h-11 rounded-[10px] bg-royal-500 px-5 font-semibold text-white shadow-[inset_0_1px_0_rgba(255,255,255,.3),0_26px_50px_-18px_rgba(1,3,8,.98),0_12px_26px_-12px_rgba(1,3,8,.95),0_0_20px_-8px_rgba(36,95,245,.35)] transition active:translate-y-px hover:bg-royal-600 disabled:opacity-60">{state.loading ? "Sending..." : demo ? "Request a demo" : "Send message"}</button></form>;
}

function Field({ label, ...props }) { return <label className="block text-[13px] font-medium text-white/70">{label}<input {...props} className="mt-2 w-full rounded-xl border border-white/[.12] bg-white/[.05] px-4 py-3 text-[15px] text-chalk shadow-[inset_0_2px_6px_rgba(2,6,16,.6),inset_0_-1px_0_rgba(255,255,255,.05)] outline-none transition-all duration-200 placeholder:text-white/35 focus:border-royal-400 focus:bg-white/[.07] focus:ring-4 focus:ring-royal-500/20" /></label>; }

const workspaceApplicationInitial = {
  organizationName: "",
  desiredSlug: "",
  applicantName: "",
  email: "",
  phone: "",
  website: "",
  teamSize: 1,
  creatorNiche: "",
  primaryPlatforms: "YouTube",
  monthlyOutput: 4,
  companyKind: "STARTUP",
  industry: "",
  useCase: "",
};

function optionalText(value) {
  const trimmed = String(value || "").trim();
  return trimmed ? trimmed : undefined;
}

function buildWorkspaceApplicationPayload(type, form) {
  const common = {
    type,
    organizationName: form.organizationName.trim(),
    desiredSlug: optionalText(form.desiredSlug),
    applicantName: form.applicantName.trim(),
    email: form.email.trim(),
    phone: optionalText(form.phone),
    website: optionalText(form.website),
    teamSize: Number(form.teamSize),
    primaryPlatforms: type === "CREATOR"
      ? form.primaryPlatforms.split(",").map((item) => item.trim()).filter(Boolean)
      : [],
    useCase: form.useCase.trim(),
  };

  if (type === "CREATOR") {
    return {
      ...common,
      creatorNiche: form.creatorNiche.trim(),
      monthlyOutput: Number(form.monthlyOutput),
    };
  }

  return {
    ...common,
    companyKind: form.companyKind,
    industry: form.industry.trim(),
  };
}

const workspaceTypeOptions = {
  CREATOR: {
    label: "Creator team",
    subtitle: "Studios, creators, editors, managers",
    Icon: Clapperboard,
    intro: "For creators managing ideas, scripts, publishing, brand deals, content analytics, and a compact production crew.",
    features: ["Scripts", "Publishing calendar", "Brand deals", "Creator analytics"],
  },
  COMPANY: {
    label: "Company",
    subtitle: "Agencies, consultancies, startups, enterprise",
    Icon: Building2,
    intro: "For teams managing CRM, client delivery, departments, approvals, employee phases, and larger operating workflows.",
    features: ["CRM", "Departments", "Project phases", "Team permissions"],
  },
};

function WorkspaceTypeButton({ option, active, onClick }) {
  const Icon = option.Icon;
  return (
    <button
      type="button"
      onClick={onClick}
      className={`group relative flex min-h-32 flex-col items-start gap-3 rounded-2xl border p-4 text-left transition-colors duration-200 focus:outline-none focus-visible:ring-4 focus-visible:ring-[#245ff5]/20 ${
        active
          ? "border-[#0b63ce] bg-[#eef3ff]"
          : "border-[#dbe8f6] bg-white hover:border-[#9ec8f4]"
      }`}
      aria-pressed={active}
    >
      <span className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl transition-colors ${active ? "bg-[#245ff5] text-white" : "bg-[#edf3fb] text-[#38536f] group-hover:bg-[#e2eefb]"}`}>
        <Icon size={20} aria-hidden="true" />
      </span>
      <span className="block">
        <span className="block text-sm font-black text-[#11243d]">{option.label}</span>
        <span className="mt-1 block text-xs leading-5 text-[#607086]">{option.subtitle}</span>
      </span>
      {active ? <CheckCircle2 size={18} className="absolute right-4 top-4 text-[#1b4de4]" aria-hidden="true" /> : null}
    </button>
  );
}

const wizardSteps = [
  { label: "Type", title: "What workspace do you need?" },
  { label: "Name", title: "What is the workspace name?" },
  { label: "Owner", title: "Who should own it?" },
  { label: "Email", title: "Where should we send access?" },
  { label: "Team", title: "How large is the team?" },
  { label: "Work", title: "What kind of work is this for?" },
  { label: "Use", title: "How will you use ManthanOS?" },
  { label: "Review", title: "Review your request" },
];

function ReviewRow({ label, value }) {
  return (
    <div className="rounded-2xl border border-[#dbe8f6] bg-white p-4 shadow-[0_6px_18px_rgba(15,37,68,.04)]">
      <p className="text-[11px] font-black uppercase tracking-[.14em] text-[#6b7c90]">{label}</p>
      <p className="mt-1.5 break-words text-sm font-bold text-[#11243d]">{value || "Not provided"}</p>
    </div>
  );
}

export function AuthForm({ mode }) {
  // Hooks first — the early return below must not come before them.
  const [form, setForm] = useState({ token: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  // Sign-in / self-registration are retired on the marketing site.
  // Workspaces are granted via application (register) or invite. If an old
  // link still lands here with mode="login", guide the visitor back to the
  // single apply flow instead of showing a password form.
  if (mode === "login" || mode === "register") {
    return (
      <div className="rounded-2xl border border-[#dce8f5] bg-[#fbfdff] p-6 text-center">
        <p className="text-sm font-black text-[#11243d]">Workspaces are invite-only</p>
        <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-[#52647a]">
          Tell us how your team works and we will set up the right starting structure.
        </p>
        <Link href="/register" className="mt-4 inline-flex h-11 items-center justify-center rounded-[10px] bg-[#245ff5] px-6 text-sm font-bold text-white transition hover:bg-[#1b4de4]">
          Apply for a workspace
        </Link>
      </div>
    );
  }
  async function submit(event) {
    event.preventDefault();
    setLoading(true);
    setError("");
    try {
      await api.acceptInvite({ token: form.token, password: form.password });
      setError("Invite accepted. Check your email for workspace access.");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }
  return (
    <form onSubmit={submit} className="space-y-4">
      {error && <p className="rounded-lg bg-[#fff0f0] p-3 text-sm text-[#b42318]">{error}</p>}
      <Field label="Invitation token" name="token" value={form.token} onChange={(e) => setForm({ ...form, token: e.target.value })} required />
      <Field label="Password" type="password" name="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} minLength="8" required />
      <button disabled={loading} className="h-11 w-full rounded-[10px] bg-[#245ff5] px-5 font-semibold text-white disabled:opacity-60">{loading ? "Working..." : "Accept invitation"}</button>
    </form>
  );
}

export function WorkspaceApplicationForm() {
  const [type, setType] = useState("CREATOR");
  const [form, setForm] = useState(workspaceApplicationInitial);
  const [state, setState] = useState({ loading: false, done: false, error: "" });
  const update = (event) => setForm({ ...form, [event.target.name]: event.target.value });
  const submit = async (event) => {
    event.preventDefault(); setState({ loading: true, done: false, error: "" });
    try {
      await api.applyForWorkspace(buildWorkspaceApplicationPayload(type, form));
      setState({ loading: false, done: true, error: "" });
      setForm(workspaceApplicationInitial);
    } catch (error) { setState({ loading: false, done: false, error: error.message }); }
  };
  if (state.done) return <div className="rounded-2xl border border-[#b9e6cf] bg-[#effbf4] p-8 text-center"><div className="mx-auto flex h-11 w-11 items-center justify-center rounded-full bg-[#1c9b5c] font-bold text-white">?</div><h2 className="display-font mt-4 text-2xl font-bold text-slate-900">Application received</h2><p className="mt-2 text-sm text-[#52647a]">A ManthanOS administrator will review your workspace request. Owner access details arrive by email after approval.</p></div>;
  return <form onSubmit={submit} className="space-y-5">
    {state.error ? <p className="rounded-lg bg-[#fff0f0] p-3 text-sm text-[#b42318]">{state.error}</p> : null}
    <div className="grid grid-cols-2 rounded-xl bg-[#edf3fb] p-1"><button type="button" onClick={() => setType("CREATOR")} className={`rounded-lg px-4 py-3 text-sm font-bold transition ${type === "CREATOR" ? "bg-white text-[#0b5fcc] shadow-sm" : "text-[#44566c]"}`}>Creator team</button><button type="button" onClick={() => setType("COMPANY")} className={`rounded-lg px-4 py-3 text-sm font-bold transition ${type === "COMPANY" ? "bg-white text-[#0b5fcc] shadow-sm" : "text-[#44566c]"}`}>Company</button></div>
    <p className="rounded-xl border border-[#dce7f4] bg-[#f7faff] p-4 text-sm leading-6 text-[#52647a]">{type === "CREATOR" ? "For creators and compact production teams managing ideas, scripts, publishing, brand deals, and content analytics." : "For startups, enterprises, consultancies, and agencies managing clients, departments, CRM, delivery phases, and larger teams."}</p>
    <div className="grid gap-4 sm:grid-cols-2"><Field label={type === "CREATOR" ? "Creator or brand name" : "Company name"} name="organizationName" value={form.organizationName} onChange={update} required /><Field label="Preferred workspace slug" name="desiredSlug" value={form.desiredSlug} onChange={update} pattern="[a-z0-9]+(?:-[a-z0-9]+)*" placeholder="northstar-media" /></div>
    <div className="grid gap-4 sm:grid-cols-2"><Field label="Your name" name="applicantName" value={form.applicantName} onChange={update} required /><Field label="Work email" name="email" type="email" value={form.email} onChange={update} required /></div>
    <div className="grid gap-4 sm:grid-cols-3"><Field label="Phone" name="phone" value={form.phone} onChange={update} /><Field label="Website" name="website" type="url" value={form.website} onChange={update} placeholder="https://" /><Field label="Team size" name="teamSize" type="number" min="1" value={form.teamSize} onChange={update} required /></div>
    {type === "CREATOR" ? <div className="grid gap-4 sm:grid-cols-3"><Field label="Creator niche" name="creatorNiche" value={form.creatorNiche} onChange={update} placeholder="Tech education" required /><Field label="Platforms (comma separated)" name="primaryPlatforms" value={form.primaryPlatforms} onChange={update} /><Field label="Posts per month" name="monthlyOutput" type="number" min="0" value={form.monthlyOutput} onChange={update} /></div> : <div className="grid gap-4 sm:grid-cols-2"><label className="block text-sm font-medium text-[#17304d]">Company type<select name="companyKind" value={form.companyKind} onChange={update} className="mt-2 w-full rounded-xl border border-[#cdd9e6] bg-slate-50/50 px-4 py-3 outline-none focus:border-[#245ff5]"><option value="STARTUP">Startup</option><option value="ENTERPRISE">Enterprise / big tech</option><option value="CONSULTANCY">Consultancy</option><option value="AGENCY">Agency</option><option value="OTHER">Other</option></select></label><Field label="Industry" name="industry" value={form.industry} onChange={update} placeholder="Software, consulting, media…" required /></div>}
    <label className="block text-sm font-medium text-[#17304d]">How will your team use ManthanOS?<textarea name="useCase" value={form.useCase} onChange={update} minLength="20" rows="5" required className="mt-2 w-full resize-none rounded-xl border border-[#cdd9e6] bg-white px-4 py-3 outline-none focus:border-[#245ff5]" placeholder={type === "CREATOR" ? "Describe your content workflow and team…" : "Describe your CRM, projects, departments, and approval workflow…"} /></label>
    <button disabled={state.loading} className="w-full rounded-full bg-[#0b63ce] px-5 py-3 font-semibold text-white transition hover:bg-[#1b4de4] disabled:opacity-60">{state.loading ? "Submitting…" : `Request ${type === "CREATOR" ? "creator" : "company"} workspace`}</button>
  </form>;
}

export function PublicWorkspaceApplicationForm() {
  const [type, setType] = useState("CREATOR");
  const [form, setForm] = useState(workspaceApplicationInitial);
  const [state, setState] = useState({ loading: false, done: false, error: "" });
  const [step, setStep] = useState(0);
  const activeOption = workspaceTypeOptions[type];
  const ActiveIcon = activeOption.Icon;
  const update = (event) => setForm({ ...form, [event.target.name]: event.target.value });
  const totalSteps = wizardSteps.length;
  const useCaseReady = form.useCase.trim().length >= 20;
  const workReady = type === "CREATOR" ? form.creatorNiche.trim() : form.industry.trim();
  const canContinue = [
    true,
    Boolean(form.organizationName.trim()),
    Boolean(form.applicantName.trim()),
    Boolean(form.email.trim()),
    Number(form.teamSize) >= 1,
    Boolean(workReady),
    useCaseReady,
    true,
  ][step];

  const nextStep = () => {
    setState({ loading: false, done: false, error: "" });
    if (!canContinue) {
      setState({ loading: false, done: false, error: "Complete the visible fields before moving to the next step." });
      return;
    }
    setStep((current) => Math.min(current + 1, totalSteps - 1));
  };

  const previousStep = () => {
    setState({ loading: false, done: false, error: "" });
    setStep((current) => Math.max(current - 1, 0));
  };

  const submit = async (event) => {
    event.preventDefault();
    if (step !== totalSteps - 1) {
      nextStep();
      return;
    }
    setState({ loading: true, done: false, error: "" });
    try {
      await api.applyForWorkspace(buildWorkspaceApplicationPayload(type, form));
      setState({ loading: false, done: true, error: "" });
      setForm(workspaceApplicationInitial);
      setStep(0);
    } catch (error) {
      setState({ loading: false, done: false, error: error.message });
    }
  };

  if (state.done) {
    return (
      <div className="rounded-2xl border border-[#b9e6cf] bg-[#effbf4] p-8 text-center">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#1c9b5c] text-white">
          <CheckCircle2 size={26} aria-hidden="true" />
        </div>
        <h2 className="display-font mt-4 text-2xl font-black text-slate-900">Application received</h2>
        <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-[#52647a]">A ManthanOS administrator will review your request. Owner access details arrive by email after approval.</p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="flex min-h-[520px] flex-col rounded-2xl border border-[#e2ecf7] bg-[#fbfdff] p-5 sm:p-7">
      <div className="mb-7">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-[11px] font-black uppercase tracking-[.18em] text-[#1b4de4]">Step {step + 1} of {totalSteps} — {wizardSteps[step].label}</p>
            <h2 className="display-font mt-2 text-2xl font-black leading-tight text-[#11243d] sm:text-[28px]">{wizardSteps[step].title}</h2>
          </div>
          <span className="hidden h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#0b63ce] text-sm font-black text-white sm:flex">
            {String(step + 1).padStart(2, "0")}
          </span>
        </div>
        <div className="mt-5 h-1.5 w-full overflow-hidden rounded-full bg-[#dbe8f6]" role="progressbar" aria-valuemin={1} aria-valuemax={totalSteps} aria-valuenow={step + 1} aria-label="Application progress">
          <div className="h-full rounded-full bg-[#0b63ce] transition-all duration-500 ease-out" style={{ width: `${((step + 1) / totalSteps) * 100}%` }} />
        </div>
      </div>

      {state.error ? <p className="rounded-xl border border-[#ffd4d4] bg-[#fff0f0] p-4 text-sm font-medium text-[#b42318]">{state.error}</p> : null}

      <div className="flex flex-1 items-center">
        {step === 0 ? (
          <section aria-label="Workspace type" className="w-full space-y-3">
            <div className="grid gap-3 sm:grid-cols-2">
              {Object.entries(workspaceTypeOptions).map(([value, option]) => (
                <WorkspaceTypeButton key={value} option={option} active={type === value} onClick={() => setType(value)} />
              ))}
            </div>
            <div className="rounded-2xl border border-[#e2ecf7] bg-white p-4">
              <p className="text-sm leading-6 text-[#5b6b81]">{activeOption.intro}</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {activeOption.features.map((feature) => (
                  <span key={feature} className="rounded-full border border-[#c9def4] bg-[#f2f8ff] px-3 py-1 text-xs font-bold text-[#244968]">{feature}</span>
                ))}
              </div>
            </div>
          </section>
        ) : null}

        {step === 1 ? (
          <section className="w-full" aria-label="Workspace name">
            <Field label={type === "CREATOR" ? "Creator or brand name" : "Company name"} name="organizationName" value={form.organizationName} onChange={update} placeholder={type === "CREATOR" ? "Your studio or channel name" : "Your company name"} required />
            <div className="mt-4">
              <Field label="Preferred slug (optional)" name="desiredSlug" value={form.desiredSlug} onChange={update} pattern="[a-z0-9]+(?:-[a-z0-9]+)*" placeholder="northstar-media" />
            </div>
          </section>
        ) : null}

        {step === 2 ? (
          <section className="w-full" aria-label="Workspace owner">
            <Field label="Owner name" name="applicantName" value={form.applicantName} onChange={update} placeholder="Your full name" required />
          </section>
        ) : null}

        {step === 3 ? (
          <section className="w-full" aria-label="Owner email">
            <Field label="Work email" name="email" type="email" value={form.email} onChange={update} placeholder="you@company.com" required />
          </section>
        ) : null}

        {step === 4 ? (
          <section className="w-full" aria-label="Team size">
            <Field label="Team size" name="teamSize" type="number" min="1" value={form.teamSize} onChange={update} required />
          </section>
        ) : null}

        {step === 5 ? (
          <section className="w-full space-y-4" aria-label="Work type">
            {type === "CREATOR" ? (
              <>
                <Field label="Creator niche" name="creatorNiche" value={form.creatorNiche} onChange={update} placeholder="Technology education" required />
                <Field label="Platforms (optional)" name="primaryPlatforms" value={form.primaryPlatforms} onChange={update} placeholder="YouTube, Instagram" />
              </>
            ) : (
              <>
                <label className="block text-sm font-medium text-[#17304d]">Company type
                  <select name="companyKind" value={form.companyKind} onChange={update} className="mt-2 w-full rounded-xl border border-[#cdd9e6] bg-white px-4 py-3 outline-none transition-all duration-200 focus:border-[#245ff5] focus:ring-4 focus:ring-[#245ff5]/10">
                    <option value="STARTUP">Startup</option>
                    <option value="ENTERPRISE">Enterprise / big tech</option>
                    <option value="CONSULTANCY">Consultancy</option>
                    <option value="AGENCY">Agency</option>
                    <option value="OTHER">Other</option>
                  </select>
                </label>
                <Field label="Industry" name="industry" value={form.industry} onChange={update} placeholder="Technology consulting" required />
              </>
            )}
          </section>
        ) : null}

        {step === 6 ? (
          <section className="w-full" aria-label="Use case">
            <label className="block text-sm font-medium text-[#17304d]">How will your team use ManthanOS?
              <textarea
                name="useCase"
                value={form.useCase}
                onChange={update}
                minLength="20"
                rows="6"
                required
                className="mt-2 w-full resize-none rounded-xl border border-[#cdd9e6] bg-white px-4 py-3 outline-none transition-all duration-200 focus:border-[#245ff5] focus:ring-4 focus:ring-[#245ff5]/10"
                placeholder={type === "CREATOR" ? "Scripts, editing, publishing, and brand approvals." : "CRM, project delivery, departments, and employee phases."}
              />
            </label>
            <p className="mt-2 text-xs font-semibold text-[#64748b]">Minimum 20 characters.</p>
          </section>
        ) : null}

        {step === 7 ? (
          <section className="w-full space-y-4" aria-label="Review workspace request">
            <div className="flex items-center gap-3 rounded-2xl border border-[#dbe8f6] bg-[#f2f8ff] p-4">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#245ff5] text-white">
                <ActiveIcon size={20} aria-hidden="true" />
              </span>
              <div>
                <p className="text-sm font-black text-[#11243d]">{activeOption.label} workspace</p>
                <p className="text-xs text-[#607086]">Confirm the details below before sending to the ManthanOS team.</p>
              </div>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <ReviewRow label="Workspace type" value={activeOption.label} />
              <ReviewRow label="Organization" value={form.organizationName} />
              <ReviewRow label="Applicant" value={form.applicantName} />
              <ReviewRow label="Email" value={form.email} />
              <ReviewRow label="Team size" value={form.teamSize} />
              <ReviewRow label={type === "CREATOR" ? "Creator niche" : "Industry"} value={type === "CREATOR" ? form.creatorNiche : form.industry} />
            </div>
          </section>
        ) : null}
      </div>

      <div className="mt-8 border-t border-[#e2ecf7] pt-5">
        <div className="flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
          <button
            type="button"
            onClick={previousStep}
            disabled={step === 0 || state.loading}
            className="inline-flex items-center justify-center gap-2 rounded-full border border-[#cdd9e6] bg-white px-5 py-3 text-sm font-bold text-[#38536f] transition hover:bg-[#f7fbff] disabled:cursor-not-allowed disabled:opacity-40"
          >
            <ArrowLeft size={17} aria-hidden="true" />
            Back
          </button>
          {step < totalSteps - 1 ? (
            <button
              type="button"
              onClick={nextStep}
              disabled={!canContinue || state.loading}
              className="group inline-flex items-center justify-center gap-2 h-12 rounded-[10px] bg-[#245ff5] px-6 text-sm font-bold text-white transition-colors hover:bg-[#1b4de4] disabled:cursor-not-allowed disabled:opacity-50"
            >
              Continue
              <ArrowRight size={17} aria-hidden="true" />
            </button>
          ) : (
            <button disabled={state.loading} className="inline-flex items-center justify-center gap-2 h-12 rounded-[10px] bg-[#245ff5] px-6 text-sm font-bold text-white transition-colors hover:bg-[#1b4de4] disabled:cursor-not-allowed disabled:opacity-60">
              {state.loading ? <Loader2 className="animate-spin" size={18} aria-hidden="true" /> : <ArrowRight size={18} aria-hidden="true" />}
              {state.loading ? "Submitting..." : `Request ${type === "CREATOR" ? "creator" : "company"} workspace`}
            </button>
          )}
        </div>
        <p className="mt-3 text-center text-xs leading-5 text-[#64748b]">Your request goes to the superadmin review queue before any workspace is created.</p>
      </div>
    </form>
  );
}

export function TesterForm() {
  const [form, setForm] = useState({ name: "", email: "", company: "", useCase: "", message: "" });
  const [state, setState] = useState({ loading: false, done: false, error: "" });
  const update = (event) => setForm({ ...form, [event.target.name]: event.target.value });
  
  async function submit(event) {
    event.preventDefault(); setState({ loading: true, done: false, error: "" });
    try { 
      await api.lead({ ...form, message: `Use case: ${form.useCase}\n\n${form.message}`, source: "user-tester" }); 
      setState({ loading: false, done: true, error: "" }); 
      setForm({ name: "", email: "", company: "", useCase: "", message: "" }); 
    }
    catch (error) { setState({ loading: false, done: false, error: error.message }); }
  }
  
  if (state.done) return <div className="rounded-2xl border border-emerald-400/25 bg-emerald-500/10 p-8 text-center"><div className="mx-auto mb-4 flex h-11 w-11 items-center justify-center rounded-full bg-emerald-500 text-white">?</div><h3 className="display-font text-2xl font-bold text-chalk">Application received.</h3><p className="mt-2 text-sm text-white/65">We'll let you know if you're selected for user testing.</p></div>;
  
  return (
    <form onSubmit={submit} className="space-y-4">
      {state.error && <p className="rounded-lg border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-300">{state.error}</p>}
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Name" name="name" value={form.name} onChange={update} required />
        <Field label="Work email" name="email" type="email" value={form.email} onChange={update} required />
      </div>
      <Field label="Company or studio" name="company" value={form.company} onChange={update} />
      <Field label="Primary Use Case" name="useCase" value={form.useCase} onChange={update} placeholder="e.g. Content creation, Team management..." required />
      <label className="block text-[13px] font-medium text-white/70">Why do you want to test ManthanOS?
        <textarea name="message" value={form.message} onChange={update} rows="4" className="mt-2 w-full resize-none rounded-xl border border-white/[.12] bg-white/[.05] px-4 py-3 text-[15px] text-chalk shadow-[inset_0_2px_6px_rgba(2,6,16,.6),inset_0_-1px_0_rgba(255,255,255,.05)] outline-none transition placeholder:text-white/35 focus:border-royal-400 focus:ring-4 focus:ring-royal-500/20" required />
      </label>
      <button disabled={state.loading} className="w-full h-11 rounded-[10px] bg-[#245ff5] px-5 font-semibold text-white shadow-[inset_0_1px_0_rgba(255,255,255,.3),0_26px_50px_-18px_rgba(1,3,8,.98),0_12px_26px_-12px_rgba(1,3,8,.95),0_0_20px_-8px_rgba(36,95,245,.35)] transition active:translate-y-px hover:bg-[#1b4de4] disabled:opacity-60">{state.loading ? "Sending..." : "Apply for User Testing"}</button>
    </form>
  );
}
