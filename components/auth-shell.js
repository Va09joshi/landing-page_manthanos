import Link from "next/link";
import { ArrowUpRight, Check, Layers3, ShieldCheck, X } from "lucide-react";
import { Logomark } from "./ui";

export function AuthShell({ title, subtitle, children, footer }) {
  return (
    <main className="auth-stage">
      <div aria-hidden="true" className="auth-ambient" />
      <div className="auth-window">
        <section className="auth-story">
          <Link href="/" aria-label="ManthanOS home" className="auth-brand"><Logomark className="h-[25px] w-auto" /></Link>
          <div className="auth-story-copy">
            <p className="auth-trust"><ShieldCheck size={15} /> Made for teams that create</p>
            <h2>Your ideas.<br />Your people.<br /><span>One workspace.</span></h2>
            <p>A little more clarity for everything<br className="hidden sm:block" /> you’re building together.</p>
          </div>
          <div className="auth-workspace-art" aria-hidden="true">
            <div className="auth-art-orbit" />
            <div className="auth-preview">
              <div className="auth-preview-header"><span><Layers3 size={17} /> Studio workspace</span><span className="auth-preview-avatar">M</span></div>
              <p className="auth-preview-eyebrow">A GOOD DAY TO MAKE THINGS</p>
              <p className="auth-preview-title">Big ideas. Moving forward.</p>
              <div className="auth-preview-tabs"><span>This week</span><span>Projects</span><span>Ideas</span></div>
              <div className="auth-preview-task"><span className="auth-task-check"><Check size={12} /></span><span>Give that idea a home<small>Ideas & inspiration</small></span><span className="auth-task-tag">Done</span></div>
              <div className="auth-preview-task"><span className="auth-task-dot" /><span>Bring the team together<small>Brand campaign</small></span><span className="auth-preview-avatar">A</span></div>
              <div className="auth-preview-task"><span className="auth-task-dot" /><span>Make something worth sharing<small>Content & creative</small></span><ArrowUpRight size={16} /></div>
              <div className="auth-preview-progress"><span /><span /><span /><span /></div>
            </div>
            <div className="auth-art-badge"><span><Check size={16} /></span> A little more progress.</div>
          </div>
          <p className="auth-story-note">From the first idea to the final delivery.</p>
        </section>
        <section className="auth-content">
          <Link href="/" aria-label="Back to home" className="auth-close"><X size={19} /></Link>
          <div className="auth-content-inner">
            <h1>{title}</h1>
            {subtitle && <p className="auth-subtitle">{subtitle}</p>}
            <div className="auth-form-slot">{children}</div>
            {footer && <div className="auth-bottom">{footer}</div>}
          </div>
        </section>
      </div>
    </main>
  );
}
