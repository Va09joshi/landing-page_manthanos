import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, Check, ShieldCheck, X } from "lucide-react";
import { Logomark } from "./ui";

/* Register-only shell: full-viewport two-column split.
   Left = brand story with the workspace dashboard illustration.
   Right = form content, no internal scroll — fits the viewport. */
export function AuthShell({ title, subtitle, children, footer }) {
  return (
    <main className="auth-stage">
      <div aria-hidden="true" className="auth-ambient" />
      <div className="auth-window">
        {/* ── Left: brand panel ─────────────────────────────────────── */}
        <section className="auth-story" aria-label="About ManthanOS">
          <Link href="/" aria-label="ManthanOS home" className="auth-brand">
            <Logomark className="h-[26px] w-auto auth-brand-logo" />
          </Link>
          <div className="auth-story-copy">
            <p className="auth-trust"><ShieldCheck size={15} /> Made for teams that create</p>
            <h2>Your ideas.<br />Your people.<br /><span>One workspace.</span></h2>
            <p className="auth-story-lede">One calm place for ideas, work and people.<br className="hidden sm:block" /> No lost messages. No scattered tools.</p>
          </div>
          <figure className="auth-figure" aria-hidden="true">
            <span className="auth-figure-glow" />
            <Image
              src="/illustrations/dashboard-illustration.png"
              alt=""
              width={880}
              height={620}
              priority
              className="auth-figure-img"
            />
            <figcaption className="auth-figure-cap">
              <span className="auth-figure-cap-dot"><Check size={13} /></span>
              <span><strong>Your workspace, at a glance.</strong><small>Ideas, tasks and people — together.</small></span>
              <ArrowUpRight size={16} />
            </figcaption>
          </figure>
          <p className="auth-story-note">From the first idea to the final delivery.</p>
        </section>

        {/* ── Right: form panel ─────────────────────────────────────── */}
        <section className="auth-content" aria-label="Application form">
          <Link href="/" aria-label="Back to home" className="absolute top-[28px] left-[28px] z-10 flex items-center gap-2 rounded-xl bg-[#0b1422] border border-[#1e2e48] px-4 py-2 text-[13px] font-bold text-[#eef3fb] transition hover:bg-[#15233b]">
            <ArrowLeft size={16} /> Back
          </Link>
          <div className="auth-content-inner pt-24">
            <div className="auth-mini-brand">
              <span className="auth-mini-logo"><Logomark className="h-[22px] w-auto" /></span>
            </div>
            <h1>{title}</h1>
            {subtitle && <p className="auth-subtitle">{subtitle}</p>}
            <div className="auth-form-slot">{children}</div>
            {footer ? <div className="auth-bottom">{footer}</div> : null}
          </div>
        </section>
      </div>
    </main>
  );
}
