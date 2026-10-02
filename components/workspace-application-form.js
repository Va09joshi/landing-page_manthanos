"use client";

import {
  ArrowLeft,
  ArrowRight,
  Building2,
  Check,
  CheckCircle2,
  Loader2,
  Palette,
  Users,
} from "lucide-react";
import { useState } from "react";
import { api } from "../lib/api";

const initialForm = {
  organizationName: "",
  applicantName: "",
  email: "",
  teamSize: 2,
  creatorNiche: "",
  companyKind: "STARTUP",
  industry: "",
  bio: "",
  useCase: "",
};

const steps = [
  { short: "Type",  title: "What kind of team are you?",          hint: "Pick one. We use this to pre-build your boards, folders and roles." },
  { short: "Team",  title: "Tell us about your team",             hint: "Just the basics — you can invite people after approval." },
  { short: "Owner", title: "Who owns this workspace?",            hint: "This person approves members and owns billing later." },
  { short: "Needs", title: "What should ManthanOS do for you?",   hint: "Write it like you would tell a friend. 2–3 sentences is perfect." },
  { short: "Check", title: "Check everything looks right",        hint: "Nothing goes live yet. We review every application by hand." },
];

const workspaceTypes = {
  CREATOR: {
    label: "Creator team",
    tag: "Videos, posts & brand deals",
    description: "For YouTubers, studios, editors and managers.",
    detail: "Ideas → scripts → edits → approvals → publishing, plus brand deals and channel numbers.",
    features: ["Content pipeline", "Publishing calendar", "Brand deals", "Channel analytics"],
    journey: ["Capture ideas", "Create content", "Approve work", "Publish & learn"],
    bestFor: "Creators, studios, editors, and content managers",
    Icon: Palette,
    iconClass: "border-[#8175d5]/55 bg-[linear-gradient(145deg,#8274e8_0%,#5040ae_68%,#292261_100%)] shadow-[inset_2px_2px_0_rgba(255,255,255,.2),inset_-3px_-4px_0_rgba(13,10,38,.62),0_3px_0_#17132f,0_10px_18px_-8px_rgba(3,5,15,.98)]",
  },
  COMPANY: {
    label: "Company",
    tag: "Clients, projects & team",
    description: "For agencies, startups and growing teams.",
    detail: "Leads → client work → approvals → delivery, with departments and clear permissions.",
    features: ["Simple CRM", "Client projects", "Approvals", "Team roles"],
    journey: ["Qualify leads", "Plan projects", "Assign phases", "Review & deliver"],
    bestFor: "Agencies, consultancies, startups, and growing teams",
    Icon: Building2,
    iconClass: "border-[#3d7bff]/50 bg-[linear-gradient(145deg,#3478ff_0%,#1748bb_68%,#10337f_100%)] shadow-[inset_2px_2px_0_rgba(255,255,255,.18),inset_-3px_-4px_0_rgba(4,18,63,.35),0_8px_16px_-7px_rgba(36,95,245,.95)]",
  },
};

function optional(value) {
  const trimmed = String(value || "").trim();
  return trimmed || undefined;
}

function makePayload(type, form) {
  const payload = {
    type,
    organizationName: form.organizationName.trim(),
    applicantName: form.applicantName.trim(),
    email: form.email.trim(),
    teamSize: Number(form.teamSize),
    bio: optional(form.bio),
    useCase: form.useCase.trim(),
  };

  return type === "CREATOR"
    ? { ...payload, creatorNiche: form.creatorNiche.trim() }
    : { ...payload, companyKind: form.companyKind, industry: form.industry.trim() };
}

function Field({ label, hint, prefix, ...props }) {
  return (
    <label className="apply-field">
      {label}
      <span className="apply-input-wrap">
        {prefix ? <span className="apply-prefix">{prefix}</span> : null}
        <input {...props} />
      </span>
      {hint ? <span className="apply-hintline">{hint}</span> : null}
    </label>
  );
}

function ReviewItem({ label, value }) {
  return (
    <div className="apply-review-item">
      <dt>{label}</dt>
      <dd>{value || "Not provided"}</dd>
    </div>
  );
}

export function WorkspaceApplicationForm() {
  const [type, setType] = useState("CREATOR");
  const [form, setForm] = useState(initialForm);
  const [step, setStep] = useState(0);
  const [state, setState] = useState({ loading: false, done: false, error: "" });
  const activeType = workspaceTypes[type];
  const ActiveIcon = activeType.Icon;

  const update = (event) => {
    let value = event.target.value;
    setForm((current) => ({ ...current, [event.target.name]: value }));
    if (state.error) setState((current) => ({ ...current, error: "" }));
  };

  const validationMessage = () => {
    if (step === 1) {
      if (form.organizationName.trim().length < 2) return "Enter a workspace name.";
      if (Number(form.teamSize) < 1) return "Team size must be at least 1.";
      if (type === "CREATOR" && form.creatorNiche.trim().length < 2) return "Tell us your creator niche.";
      if (type === "COMPANY" && form.industry.trim().length < 2) return "Tell us your industry.";
    }
    if (step === 2) {
      if (form.applicantName.trim().length < 2) return "Enter the workspace owner's name.";
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) return "Enter a valid work email address.";
    }
    if (step === 3 && form.useCase.trim().length < 20) return "Add a little more detail about your workflow (at least 20 characters).";
    return "";
  };

  const next = () => {
    const error = validationMessage();
    if (error) return setState({ loading: false, done: false, error });
    setState({ loading: false, done: false, error: "" });
    setStep((current) => Math.min(current + 1, steps.length - 1));
  };

  const back = () => {
    setState({ loading: false, done: false, error: "" });
    setStep((current) => Math.max(current - 1, 0));
  };

  async function submit(event) {
    event.preventDefault();
    if (step < steps.length - 1) return next();
    setState({ loading: true, done: false, error: "" });
    try {
      await api.applyForWorkspace(makePayload(type, form));
      setState({ loading: false, done: true, error: "" });
    } catch (error) {
      setState({ loading: false, done: false, error: error.message });
    }
  }

  if (state.done) {
    return (
      <div className="mx-auto flex min-h-[420px] w-full max-w-[560px] flex-col items-center justify-center rounded-2xl border border-emerald-500/25 bg-[linear-gradient(145deg,rgba(6,45,44,.92),rgba(3,25,33,.96))] p-8 text-center shadow-[inset_2px_2px_0_rgba(255,255,255,.05),inset_-4px_-5px_0_rgba(0,0,0,.3),0_14px_26px_-18px_rgba(0,0,0,.95)]" role="status">
        <span className="relative mx-auto flex h-16 w-16 items-center justify-center rounded-[20px] border border-emerald-300/40 bg-[linear-gradient(145deg,#16c99c,#08745f)] text-emerald-50 shadow-[inset_2px_2px_0_rgba(255,255,255,.28),inset_-3px_-4px_0_rgba(0,48,42,.5),0_5px_0_#064b43,0_12px_18px_-10px_rgba(0,0,0,.95)] before:absolute before:inset-[4px] before:rounded-[16px] before:border before:border-white/15 before:content-['']">
          <span className="relative z-[1] drop-shadow-[0_2px_1px_rgba(0,35,31,.7)]"><CheckCircle2 size={32} strokeWidth={2.5} /></span>
        </span>
        <p className="mt-5 text-[12px] font-black uppercase tracking-[.18em] text-emerald-400">Application sent</p>
        <h2 className="mt-2 text-2xl font-bold text-white">We'll review your workspace.</h2>
        <p className="mx-auto mt-4 max-w-sm text-[15px] leading-relaxed text-[#9fb0cc]">We'll send the decision and secure owner access to <strong>{form.email}</strong>. No workspace is created until the application is approved.</p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} noValidate className="flex flex-col flex-1 h-full">
      {/* ── Header ── */}
      <div className="apply-step-header">
        <p className="apply-step-count">
          Step {step + 1} of {steps.length}
        </p>
        <h2>{steps[step].title}</h2>
        <p>{steps[step].hint}</p>
      </div>

      {/* ── Error ── */}
      {state.error ? (
        <div className="apply-error" role="alert">
          {state.error}
        </div>
      ) : null}

      {/* ── Step content ── */}
      <div className="flex-1 py-6">
        {/* Step 0: Workspace type */}
        {step === 0 ? (
          <section className="workspace-choice-grid" aria-label="Workspace type">
            {Object.entries(workspaceTypes).map(([value, option]) => {
              const active = value === type;
              const OptionIcon = option.Icon;
              return (
                <button
                  key={value}
                  type="button"
                  aria-pressed={active}
                  onClick={() => setType(value)}
                  className="workspace-choice-card"
                  data-active={active}
                  data-tone={value.toLowerCase()}
                >
                  <span className="workspace-choice-topline">
                    <span className="workspace-choice-icon" aria-hidden="true"><OptionIcon size={24} strokeWidth={2} /></span>
                    <span className="workspace-choice-check"><Check size={13} strokeWidth={3} /></span>
                  </span>
                  <span className="workspace-choice-kicker">{value === "CREATOR" ? "For creative teams" : "For client teams"}</span>
                  <strong>{option.label} workspace</strong>
                  <span className="workspace-choice-copy">{option.description}</span>
                  <span className="workspace-choice-journey">
                    {option.journey.map((item, index) => (
                      <span className="workspace-choice-step" key={item}>
                        <i>{String(index + 1).padStart(2, "0")}</i>
                        <em>{item}</em>
                      </span>
                    ))}
                  </span>
                  <span className="workspace-choice-best">
                    <Users size={17} aria-hidden="true" />
                    <span><small>Best for</small>{option.bestFor}</span>
                  </span>
                </button>
              );
            })}
          </section>
        ) : null}

        {/* Step 1: Team details */}
        {step === 1 ? (
          <section className="w-full space-y-5" aria-label="Team details">
            <Field
              label={type === "CREATOR" ? "Creator, channel, or studio name" : "Company name"}
              name="organizationName"
              value={form.organizationName}
              onChange={update}
              placeholder={type === "CREATOR" ? "Northstar Studio" : "Northstar Labs"}
              required
            />
            <Field label="Team size" name="teamSize" type="number" min="1" max="100000" value={form.teamSize} onChange={update} required />
            {type === "CREATOR" ? (
              <>
                <Field label="Creator niche" name="creatorNiche" value={form.creatorNiche} onChange={update} placeholder="Technology education" required />
                <label className="apply-field">
                  Short bio
                  <span className="apply-input-wrap !items-start">
                    <textarea name="bio" value={form.bio} onChange={update} rows="4" maxLength="500" placeholder="Tell us what you create and who you create it for." />
                  </span>
                </label>
              </>
            ) : (
              <div className="grid gap-5 sm:grid-cols-2">
                <label className="apply-field">
                  Company type
                  <span className="apply-input-wrap">
                    <select name="companyKind" value={form.companyKind} onChange={update}>
                      <option value="STARTUP">Startup</option>
                      <option value="ENTERPRISE">Enterprise</option>
                      <option value="CONSULTANCY">Consultancy</option>
                      <option value="AGENCY">Agency</option>
                      <option value="OTHER">Other</option>
                    </select>
                  </span>
                </label>
                <Field label="Industry" name="industry" value={form.industry} onChange={update} placeholder="Technology consulting" required />
              </div>
            )}
          </section>
        ) : null}

        {/* Step 2: Owner */}
        {step === 2 ? (
          <section className="w-full space-y-5" aria-label="Workspace owner">
            <Field label="Owner's full name" name="applicantName" value={form.applicantName} onChange={update} placeholder="Your full name" required />
            <Field label="Work email" name="email" type="email" value={form.email} onChange={update} placeholder="you@company.com" required />
          </section>
        ) : null}

        {/* Step 3: Use case */}
        {step === 3 ? (
          <section className="w-full" aria-label="Workspace goals">
            <label className="apply-field">
              What would you like to manage in ManthanOS?
              <span className="apply-input-wrap !items-start">
                <textarea
                  name="useCase"
                  value={form.useCase}
                  onChange={update}
                  minLength="20"
                  maxLength="2000"
                  rows="5"
                  required
                  placeholder={type === "CREATOR" ? "For example: move video ideas through scripting, editing, approval, and publishing with our five-person team." : "For example: manage client leads, delivery projects, approvals, and responsibilities across three departments."}
                />
              </span>
            </label>
            <div className="mt-2 flex items-center justify-between gap-4 text-[12px] font-medium text-[#6278a0]">
              <span>Include your current workflow and biggest bottleneck.</span>
              <span>{form.useCase.length}/2000</span>
            </div>
          </section>
        ) : null}

        {/* Step 4: Review */}
        {step === 4 ? (
          <section className="w-full" aria-label="Review application">
            <div className="flex items-center gap-4 rounded-2xl bg-royal-950/20 border border-royal-500/20 p-4">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-royal-500 text-white"><ActiveIcon size={20} /></span>
              <div>
                <p className="text-[14px] font-bold text-[#eef3fb]">{activeType.label} workspace</p>
                <p className="mt-0.5 text-[12px] text-royal-300">Ready for ManthanOS review</p>
              </div>
            </div>
            <dl className="mt-5 grid rounded-2xl border border-[#1a263c] bg-[#0b1422] px-5 sm:grid-cols-2 sm:gap-x-6">
              <ReviewItem label="Workspace" value={form.organizationName} />
              <ReviewItem label="Owner" value={form.applicantName} />
              <ReviewItem label="Work email" value={form.email} />
              <ReviewItem label="Team size" value={`${form.teamSize} ${Number(form.teamSize) === 1 ? "person" : "people"}`} />
              <ReviewItem label={type === "CREATOR" ? "Creator niche" : "Industry"} value={type === "CREATOR" ? form.creatorNiche : form.industry} />
              <ReviewItem label="Bio" value={form.bio} />
            </dl>
            <div className="mt-5 rounded-2xl border border-[#1a263c] bg-[#0b1422] p-5">
              <p className="text-[11px] font-bold uppercase tracking-[.1em] text-[#6278a0]">Workspace goals</p>
              <p className="mt-2 text-[14px] leading-relaxed text-[#eef3fb]">{form.useCase}</p>
            </div>
          </section>
        ) : null}
      </div>

      {/* ── Footer nav ── */}
      <div className="apply-navigation">
        <button
          type="button"
          onClick={back}
          disabled={step === 0 || state.loading}
          className="apply-button apply-button-secondary"
        >
          <ArrowLeft size={16} /> Back
        </button>
        {step < steps.length - 1 ? (
          <button
            type="submit"
            className="apply-button apply-button-primary"
          >
            Continue <ArrowRight size={16} />
          </button>
        ) : (
          <button
            type="submit"
            disabled={state.loading}
            className="apply-button apply-button-primary"
          >
            {state.loading ? <Loader2 className="animate-spin" size={18} /> : <Check size={18} />}
            {state.loading ? "Sending application..." : "Send application"}
          </button>
        )}
      </div>
    </form>
  );
}
