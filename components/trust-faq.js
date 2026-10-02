"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Minus, Plus } from "lucide-react";
import { infrastructure, portals } from "../lib/product";
import { Reveal, ScrollReveal, SectionHead } from "./ui";

/* ---------------------------------------------------------------------------
   Trust — architecture the product actually runs on, no fake testimonials.
   FAQ — questions a real buyer would ask.

   Pattern (Trust): Text left + infrastructure grid right.
   Pattern (FAQ): Asymmetric editorial — sticky label left, accordion right.

   Background: Trust on band-deep (ink-800), FAQ on band-dark (ink-950).
   ------------------------------------------------------------------------- */

export function TrustSection() {
  return (
    /* The one light band on the page.

       It earns its place by content, not decoration: this is the section that
       states the reasoning, and reading it on paper-white separates argument
       from the dark product sections either side of it. It is also the only
       section with no dark product surface in it — a light band behind a dark
       UI window reads as a mistake, which is why the handover section that used
       to hold this slot was removed rather than moved here. */
    <section className="band-light relative overflow-hidden">
      <div aria-hidden className="pointer-events-none absolute inset-0 mesh-ink" />
      <div
        aria-hidden
        className="pointer-events-none absolute -left-40 top-1/2 h-[460px] w-[460px] -translate-y-1/2 rounded-full opacity-[.07] blur-[120px]"
        style={{ background: "radial-gradient(circle, #245FF5 0%, transparent 70%)" }}
      />

      <div className="shell relative band-pad">
        <div className="grid gap-14 lg:grid-cols-[.95fr_1.05fr] lg:gap-20">
          <div>
            <Reveal>
              <div className="on-light-head">
                <p className="font-mono text-[11px] font-medium uppercase tracking-[0.16em] text-royal-600">
                  Underneath
                </p>
                <ScrollReveal
                  as="h2"
                  text="Built on a structured model, not on spreadsheets"
                  className="mt-5 text-[clamp(26px,3.3vw,42px)] font-semibold leading-[1.08] text-ink-950"
                />
                <p className="mt-5 max-w-[46ch] text-[16px] leading-8 text-[#4A5568]">
                  Every record in ManthanOS has a type, an owner and a history, so
                  a status is read from the system rather than typed into it by
                  whoever has time that week.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="mt-10 grid gap-3 sm:grid-cols-3">
                {portals.map((portal) => (
                  <div
                    key={portal.label}
                    className="rounded-[10px] border border-black/[.08] bg-white p-5"
                  >
                    <p className="text-[14px] font-semibold text-ink-950">{portal.label}</p>
                    <p className="mt-2 text-[12.5px] leading-5 text-[#4A5568]">{portal.detail}</p>
                  </div>
                ))}
              </div>
            </Reveal>

            <Reveal delay={0.16}>
              <p className="mt-8 max-w-[50ch] text-[13.5px] leading-6 text-[#6B7688]">
                Each person sees the portal built for their role. An employee opens
                My Phases and nothing else; an admin holds the whole workspace.
              </p>
            </Reveal>
          </div>

          {/* Capability grid — ink on paper, matching the band */}
          <Reveal delay={0.08}>
            <div className="grid gap-px overflow-hidden rounded-[12px] border border-black/[.08] bg-black/[.08] sm:grid-cols-2">
              {infrastructure.map((item) => (
                <div key={item.label} className="bg-white p-6">
                  <p className="font-mono text-[11px] tracking-[.06em] text-royal-600">
                    {item.label}
                  </p>
                  <p className="mt-3 text-[13px] leading-6 text-[#4A5568]">{item.detail}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------------------
   FAQ
   ------------------------------------------------------------------------- */

const faqs = [
  {
    q: "Who is ManthanOS built for?",
    a: "Three workspace types ship today. A creator team runs scripts, production phases, publishing and sponsor deals. A company runs CRM, client projects, departments and employee phase tracking. A platform workspace handles provisioning and audit across all of them.",
  },
  {
    q: "How does a workspace get created?",
    a: "You submit an application describing your team, your platforms and how you plan to use it. A platform admin reviews it and provisions the workspace with the right role templates already in place. You are not configuring a blank system.",
  },
  {
    q: "Do I need to migrate my existing work in?",
    a: "No. The workspace starts with its own records and a shape designed for the work. Importing history is a separate conversation we can have once you know how you want to run the new system.",
  },
  {
    q: "What happens to a piece of work that gets stuck?",
    a: "It surfaces on the Command Center as an overdue task or a phase that has not moved, with an owner attached. You do not have to go looking for it in a channel.",
  },
  {
    q: "How do permissions actually work?",
    a: "Roles are seeded per workspace type, then each role is granted a level per resource — from NO_ACCESS up to ADMIN_CONTROL. An intern can hold VIEW on brand assets while a reviewer holds APPROVE on content projects.",
  },
  {
    q: "Is this a self-serve product?",
    a: "Not yet. Workspaces are reviewed and provisioned by our team, which is how we keep the role templates and module setup correct on day one. Tell us what you need and we will set it up.",
  },
];

export function FAQ() {
  const [open, setOpen] = useState(0);

  return (
    /* band-raise (ink-900), not band-flat. band-flat resolves to ink-950, and the
       light Trust section above plus the closing CTA below already bracket this
       beat — leaving it at 950 would make the FAQ read as a continuation of the
       CTA rather than the pause between them. */
    <section className="band-raise relative band-pad">
      <div className="shell relative">
        <div className="grid gap-12 lg:grid-cols-[.75fr_1.25fr] lg:gap-20">
          <Reveal>
            <div className="lg:sticky lg:top-28">
              <SectionHead eyebrow="Questions" title="The things worth asking before you commit" />
              <p className="mt-6 max-w-[38ch] text-[14px] leading-6.5 text-chalk-dim">
                Still unanswered? Tell us and we will reply with specifics rather than a brochure.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="border-t border-white/10">
              {faqs.map((faq, index) => {
                const isOpen = open === index;
                return (
                  <div key={faq.q} className="border-b border-white/10">
                    <h3>
                      <button
                        type="button"
                        onClick={() => setOpen(isOpen ? -1 : index)}
                        aria-expanded={isOpen}
                        className="group flex w-full items-start gap-5 py-6 text-left"
                      >
                        <span className="mt-1 font-mono text-[10px] text-white/20">
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <span
                          className={`flex-1 text-[16.5px] font-medium leading-snug transition-colors ${
                            isOpen ? "text-white" : "text-chalk-dim group-hover:text-white"
                          }`}
                        >
                          {faq.q}
                        </span>
                        <span
                          className={`mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border transition-colors ${
                            isOpen
                              ? "border-royal-400/40 bg-royal-500/10 text-soft"
                              : "border-white/12 text-white/40 group-hover:border-white/25 group-hover:text-white"
                          }`}
                        >
                          {isOpen ? <Minus size={12} /> : <Plus size={12} />}
                        </span>
                      </button>
                    </h3>
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                          className="overflow-hidden"
                        >
                          <p className="max-w-[62ch] pb-7 pl-[44px] text-[14.5px] leading-7 text-chalk-dim">
                            {faq.a}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
