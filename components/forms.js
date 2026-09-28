"use client";
/* eslint-disable react/no-unescaped-entities */

import Link from "next/link";
import { useState } from "react";
import { api } from "../lib/api";

const initial = { name: "", email: "", company: "", message: "", workspaceSlug: "main" };

export function LeadForm({ demo = false }) {
  const [form, setForm] = useState(initial);
  const [state, setState] = useState({ loading: false, done: false, error: "" });
  const update = (event) => setForm({ ...form, [event.target.name]: event.target.value });
  async function submit(event) {
    event.preventDefault(); setState({ loading: true, done: false, error: "" });
    try { await api.lead({ ...form, source: demo ? "request-demo" : "contact" }); setState({ loading: false, done: true, error: "" }); setForm(initial); }
    catch (error) { setState({ loading: false, done: false, error: error.message }); }
  }
  if (state.done) return <div className="rounded-2xl border border-[#b9e6cf] bg-[#effbf4] p-8 text-center"><div className="mx-auto mb-4 flex h-11 w-11 items-center justify-center rounded-full bg-[#1c9b5c] text-white">âœ“</div><h3 className="display-font text-2xl font-bold">Request received.</h3><p className="mt-2 text-sm text-[#52647a]">We will be in touch soon.</p></div>;
  return <form onSubmit={submit} className="space-y-4">{state.error && <p className="rounded-lg bg-[#fff0f0] p-3 text-sm text-[#b42318]">{state.error}</p>}<div className="grid gap-4 sm:grid-cols-2"><Field label="Name" name="name" value={form.name} onChange={update} required /><Field label="Work email" name="email" type="email" value={form.email} onChange={update} required /></div><div className="grid gap-4 sm:grid-cols-2"><Field label="Company or studio" name="company" value={form.company} onChange={update} /><Field label="Workspace slug" name="workspaceSlug" value={form.workspaceSlug} onChange={update} required /></div><label className="block text-sm font-medium text-[#17304d]">What are you working on?<textarea name="message" value={form.message} onChange={update} rows="5" className="mt-2 w-full resize-none rounded-xl border border-[#cdd9e6] bg-white px-4 py-3 outline-none focus:border-[#1677ff]" placeholder="Tell us a little about your team and workflow." /></label><button disabled={state.loading} className="w-full rounded-full bg-[#1677ff] px-5 py-3 font-semibold text-white transition hover:bg-[#0966e8] disabled:opacity-60">{state.loading ? "Sending..." : demo ? "Request a demo" : "Send message"}</button></form>;
}

function Field({ label, ...props }) { return <label className="block text-sm font-medium text-[#17304d] mb-1">{label}<input {...props} className="mt-2 w-full rounded-xl border border-[#cdd9e6] bg-slate-50/50 px-4 py-3 outline-none focus:border-[#1677ff] focus:bg-white focus:ring-4 focus:ring-[#1677ff]/10 transition-all duration-200" /></label>; }

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

export function AuthForm({ mode }) {
  const [form, setForm] = useState({ name: "", email: "", password: "", token: "" }); const [error, setError] = useState(""); const [loading, setLoading] = useState(false);
  async function submit(event) { event.preventDefault(); setLoading(true); setError(""); try { const data = mode === "login" ? await api.login({ email: form.email, password: form.password }) : mode === "register" ? await api.register(form) : await api.acceptInvite({ token: form.token, password: form.password }); localStorage.setItem("manthanos_token", data.token); const profile = await api.me(data.token); const membership = profile.memberships?.[0]; const role = membership?.role?.name?.toLowerCase() || "employee"; window.location.href = role.includes("admin") || membership?.isOwner ? (process.env.NEXT_PUBLIC_ADMIN_URL || "http://localhost:3001") : (process.env.NEXT_PUBLIC_EMPLOYEE_URL || "http://localhost:3002"); } catch (err) { setError(err.message); setLoading(false); } }
  const isInvite = mode === "invite"; return <form onSubmit={submit} className="space-y-4">{error && <p className="rounded-lg bg-[#fff0f0] p-3 text-sm text-[#b42318]">{error}</p>}{mode === "register" && <Field label="Full name" name="name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />}{isInvite && <Field label="Invitation token" name="token" value={form.token} onChange={(e) => setForm({ ...form, token: e.target.value })} required />}{!isInvite && <Field label="Email" type="email" name="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />}<Field label="Password" type="password" name="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} minLength="8" required /><button disabled={loading} className="w-full rounded-full bg-[#1677ff] px-5 py-3 font-semibold text-white disabled:opacity-60">{loading ? "Working..." : isInvite ? "Accept invitation" : mode === "login" ? "Sign in" : "Create account"}</button>{!isInvite && <p className="text-center text-sm text-[#64748b]">{mode === "login" ? <>Need an account? <Link className="text-[#1677ff]" href="/register">Register</Link></> : <>Already have an account? <Link className="text-[#1677ff]" href="/login">Sign in</Link></>}</p>}</form>;
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
  if (state.done) return <div className="rounded-2xl border border-[#b9e6cf] bg-[#effbf4] p-8 text-center"><div className="mx-auto flex h-11 w-11 items-center justify-center rounded-full bg-[#1c9b5c] font-bold text-white">✓</div><h2 className="display-font mt-4 text-2xl font-bold text-slate-900">Application received</h2><p className="mt-2 text-sm text-[#52647a]">A ManthanOS administrator will review your workspace request. Owner access details arrive by email after approval.</p></div>;
  return <form onSubmit={submit} className="space-y-5">
    {state.error ? <p className="rounded-lg bg-[#fff0f0] p-3 text-sm text-[#b42318]">{state.error}</p> : null}
    <div className="grid grid-cols-2 rounded-xl bg-[#edf3fb] p-1"><button type="button" onClick={() => setType("CREATOR")} className={`rounded-lg px-4 py-3 text-sm font-bold transition ${type === "CREATOR" ? "bg-white text-[#0b5fcc] shadow-sm" : "text-[#44566c]"}`}>Creator team</button><button type="button" onClick={() => setType("COMPANY")} className={`rounded-lg px-4 py-3 text-sm font-bold transition ${type === "COMPANY" ? "bg-white text-[#0b5fcc] shadow-sm" : "text-[#44566c]"}`}>Company</button></div>
    <p className="rounded-xl border border-[#dce7f4] bg-[#f7faff] p-4 text-sm leading-6 text-[#52647a]">{type === "CREATOR" ? "For creators and compact production teams managing ideas, scripts, publishing, brand deals, and content analytics." : "For startups, enterprises, consultancies, and agencies managing clients, departments, CRM, delivery phases, and larger teams."}</p>
    <div className="grid gap-4 sm:grid-cols-2"><Field label={type === "CREATOR" ? "Creator or brand name" : "Company name"} name="organizationName" value={form.organizationName} onChange={update} required /><Field label="Preferred workspace slug" name="desiredSlug" value={form.desiredSlug} onChange={update} pattern="[a-z0-9]+(?:-[a-z0-9]+)*" placeholder="northstar-media" /></div>
    <div className="grid gap-4 sm:grid-cols-2"><Field label="Your name" name="applicantName" value={form.applicantName} onChange={update} required /><Field label="Work email" name="email" type="email" value={form.email} onChange={update} required /></div>
    <div className="grid gap-4 sm:grid-cols-3"><Field label="Phone" name="phone" value={form.phone} onChange={update} /><Field label="Website" name="website" type="url" value={form.website} onChange={update} placeholder="https://" /><Field label="Team size" name="teamSize" type="number" min="1" value={form.teamSize} onChange={update} required /></div>
    {type === "CREATOR" ? <div className="grid gap-4 sm:grid-cols-3"><Field label="Creator niche" name="creatorNiche" value={form.creatorNiche} onChange={update} placeholder="Tech education" required /><Field label="Platforms (comma separated)" name="primaryPlatforms" value={form.primaryPlatforms} onChange={update} /><Field label="Posts per month" name="monthlyOutput" type="number" min="0" value={form.monthlyOutput} onChange={update} /></div> : <div className="grid gap-4 sm:grid-cols-2"><label className="block text-sm font-medium text-[#17304d]">Company type<select name="companyKind" value={form.companyKind} onChange={update} className="mt-2 w-full rounded-xl border border-[#cdd9e6] bg-slate-50/50 px-4 py-3 outline-none focus:border-[#1677ff]"><option value="STARTUP">Startup</option><option value="ENTERPRISE">Enterprise / big tech</option><option value="CONSULTANCY">Consultancy</option><option value="AGENCY">Agency</option><option value="OTHER">Other</option></select></label><Field label="Industry" name="industry" value={form.industry} onChange={update} placeholder="Software, consulting, media…" required /></div>}
    <label className="block text-sm font-medium text-[#17304d]">How will your team use ManthanOS?<textarea name="useCase" value={form.useCase} onChange={update} minLength="20" rows="5" required className="mt-2 w-full resize-none rounded-xl border border-[#cdd9e6] bg-white px-4 py-3 outline-none focus:border-[#1677ff]" placeholder={type === "CREATOR" ? "Describe your content workflow and team…" : "Describe your CRM, projects, departments, and approval workflow…"} /></label>
    <button disabled={state.loading} className="w-full rounded-full bg-[#0b63ce] px-5 py-3 font-semibold text-white transition hover:bg-[#084fa5] disabled:opacity-60">{state.loading ? "Submitting…" : `Request ${type === "CREATOR" ? "creator" : "company"} workspace`}</button>
  </form>;
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
  
  if (state.done) return <div className="rounded-2xl border border-[#b9e6cf] bg-[#effbf4] p-8 text-center"><div className="mx-auto mb-4 flex h-11 w-11 items-center justify-center rounded-full bg-[#1c9b5c] text-white">✓</div><h3 className="display-font text-2xl font-bold">Application received.</h3><p className="mt-2 text-sm text-[#52647a]">We'll let you know if you're selected for user testing.</p></div>;
  
  return (
    <form onSubmit={submit} className="space-y-4">
      {state.error && <p className="rounded-lg bg-[#fff0f0] p-3 text-sm text-[#b42318]">{state.error}</p>}
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Name" name="name" value={form.name} onChange={update} required />
        <Field label="Work email" name="email" type="email" value={form.email} onChange={update} required />
      </div>
      <Field label="Company or studio" name="company" value={form.company} onChange={update} />
      <Field label="Primary Use Case" name="useCase" value={form.useCase} onChange={update} placeholder="e.g. Content creation, Team management..." required />
      <label className="block text-sm font-medium text-[#17304d]">Why do you want to test ManthanOS?
        <textarea name="message" value={form.message} onChange={update} rows="4" className="mt-2 w-full resize-none rounded-xl border border-[#cdd9e6] bg-white px-4 py-3 outline-none focus:border-[#1677ff]" required />
      </label>
      <button disabled={state.loading} className="w-full rounded-full bg-[#1677ff] px-5 py-3 font-semibold text-white transition hover:bg-[#0966e8] disabled:opacity-60">{state.loading ? "Sending..." : "Apply for User Testing"}</button>
    </form>
  );
}
