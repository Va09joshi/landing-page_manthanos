"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Check, Eye, Globe2, Minus, Plus, ShieldCheck, UserRound } from "lucide-react";
import { infrastructure, portals } from "../lib/product";
import { faqs } from "../lib/faq";
import { Reveal, ScrollReveal, SectionHead } from "./ui";

/* ---------------------------------------------------------------------------
   Trust — architecture the product actually runs on, no fake testimonials.
   FAQ — questions a real buyer would ask.

   Pattern (Trust): Text left + infrastructure grid right.
   Pattern (FAQ): Asymmetric editorial — sticky label left, accordion right.

   Background: Trust on band-deep (ink-800), FAQ on band-dark (ink-950).
   ------------------------------------------------------------------------- */

export function TrustSection() {
  const [activePortal, setActivePortal] = useState(0);
  const reduceMotion = useReducedMotion();
  const roleViews = [
    { label: "Admin", Icon: ShieldCheck, access: "Full workspace", visible: ["Projects", "Team", "Permissions", "Settings"], tone: "#245FF5" },
    { label: "Employee", Icon: UserRound, access: "Assigned work", visible: ["My phases", "My tasks", "Team chat"], tone: "#7C5CFC" },
    { label: "Public", Icon: Globe2, access: "Public website", visible: ["Product", "Pricing", "Workspace request"], tone: "#12A36D" },
  ];
  const activeRole = roleViews[activePortal];

  useEffect(() => {
    if (reduceMotion) return undefined;
    const timer = window.setInterval(
      () => setActivePortal((current) => (current + 1) % roleViews.length),
      3200,
    );
    return () => window.clearInterval(timer);
  }, [reduceMotion, roleViews.length]);

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
              <div
                role="tablist"
                aria-label="Portal view"
                className="mt-10 grid overflow-hidden rounded-[14px] border border-black/[.1] bg-[#E5EAF1] p-px shadow-[0_12px_30px_-26px_rgba(15,23,42,.5)] sm:grid-cols-3"
              >
                {portals.map((portal, index) => {
                  const RoleIcon = roleViews[index].Icon;
                  const active = index === activePortal;
                  return (
                  <button
                    type="button"
                    role="tab"
                    key={portal.label}
                    onClick={() => setActivePortal(index)}
                    aria-selected={active}
                    className={`relative p-5 text-left transition duration-300 focus-visible:z-10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-royal-500/40 ${active ? "z-[1] bg-white shadow-[0_8px_22px_-14px_rgba(15,23,42,.42),inset_0_-2px_0_#245FF5]" : "bg-[#F8FAFC] hover:bg-white"}`}
                  >
                    <span className={`mb-4 flex h-8 w-8 items-center justify-center rounded-lg transition ${active ? "bg-royal-600 text-white" : "bg-[#F1F4F8] text-[#6B7688]"}`}><RoleIcon size={15} /></span>
                    <p className="text-[14px] font-semibold text-ink-950">{portal.label}</p>
                    <p className="mt-2 text-[12.5px] leading-5 text-[#4A5568]">{portal.detail}</p>
                  </button>
                  );
                })}
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
            <div>
              <div className="relative isolate min-h-[430px] sm:min-h-[510px]">
                {/* The artwork is transparent, so a single large drop-shadow makes
                    every cutout look smoky. These two ellipses do separate jobs:
                    the wide one gives the scene atmosphere, while the narrow one
                    creates a believable contact point under the floating object. */}
                <motion.div
                  aria-hidden
                  className="absolute inset-x-[10%] bottom-[9%] h-[14%] rounded-[50%] bg-black/30 blur-[34px]"
                  animate={reduceMotion ? undefined : { opacity: [.5, .3, .5], scaleX: [1, .9, 1], scaleY: [1, .82, 1] }}
                  transition={{ duration: 7.2, repeat: Infinity, ease: "easeInOut" }}
                />
                <motion.div
                  aria-hidden
                  className="absolute inset-x-[24%] bottom-[11%] h-[6%] rounded-[50%] bg-black/55 blur-[14px]"
                  animate={reduceMotion ? undefined : { opacity: [.68, .42, .68], scaleX: [1, .84, 1] }}
                  transition={{ duration: 7.2, repeat: Infinity, ease: "easeInOut" }}
                />
                <motion.div
                  className="absolute inset-x-0 top-0 origin-[52%_70%] will-change-transform"
                  animate={reduceMotion ? undefined : { y: [0, -10, 0], rotate: [0, .35, 0], scale: [1, 1.008, 1] }}
                  transition={{ duration: 7.2, repeat: Infinity, ease: [0.45, 0, 0.55, 1] }}
                >
                  <Image
                    src="/illustrations/Connected Creative Workflow Hub.png"
                    alt="A connected creative team working through one shared ManthanOS workspace"
                    width={1674}
                    height={943}
                    sizes="(max-width: 1024px) 92vw, 52vw"
                    className="h-auto w-full object-contain"
                    style={{ filter: "drop-shadow(0 5px 4px rgba(0, 0, 0, .18)) drop-shadow(0 22px 17px rgba(0, 0, 0, .28))" }}
                  />
                </motion.div>

                <div className="absolute bottom-2 left-1/2 w-[min(94%,430px)] -translate-x-1/2 sm:bottom-4">
                  <AnimatePresence mode="wait" initial={false}>
                    <motion.div
                      key={activeRole.label}
                      initial={reduceMotion ? false : { opacity: 0, y: 14, scale: .97 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={reduceMotion ? undefined : { opacity: 0, y: -8, scale: .98 }}
                      transition={{ duration: .35, ease: [0.22, 1, 0.36, 1] }}
                      className="relative rounded-[14px_14px_8px_8px] border border-[#CBD6E4] border-b-[#AEBCCF] bg-white/95 px-4 py-3 shadow-[0_18px_34px_-22px_rgba(0,0,0,.58),inset_0_1px_0_rgba(255,255,255,.95)] backdrop-blur-xl before:absolute before:left-1/2 before:top-0 before:h-[3px] before:w-20 before:-translate-x-1/2 before:rounded-b-full before:bg-royal-500"
                    >
                      <div className="flex items-center gap-3">
                        <span className="flex h-10 w-10 items-center justify-center rounded-xl text-white" style={{ backgroundColor: activeRole.tone }}><activeRole.Icon size={18} /></span>
                        <div className="min-w-0 flex-1">
                          <p className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[.12em] text-[#718196]"><Eye size={13} /> Viewing as</p>
                          <p className="mt-0.5 text-[15px] font-bold text-[#11243D]">{activeRole.label} <span className="font-normal text-[#718196]">· {activeRole.access}</span></p>
                        </div>
                        <motion.span
                          className="h-2.5 w-2.5 rounded-full bg-[#22B979] shadow-[0_0_0_5px_rgba(34,185,121,.12)]"
                          animate={reduceMotion ? undefined : { boxShadow: ["0 0 0 5px rgba(34,185,121,.12)", "0 0 0 9px rgba(34,185,121,0)", "0 0 0 5px rgba(34,185,121,.12)"] }}
                          transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
                        />
                      </div>
                      <div className="mt-4 flex flex-wrap gap-2">
                        {activeRole.visible.map((item) => (
                          <span key={item} className="inline-flex items-center gap-1.5 rounded-full border border-[#DCE7F3] bg-white px-2.5 py-1 text-[11px] font-semibold text-[#3F5268]"><Check size={11} style={{ color: activeRole.tone }} />{item}</span>
                        ))}
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>

              <div className="mt-7 grid gap-px overflow-hidden rounded-[12px] border border-black/[.08] bg-black/[.08] sm:grid-cols-3">
                {infrastructure.slice(0, 3).map((item) => (
                  <div key={item.label} className="bg-white p-4">
                    <p className="font-mono text-[10px] tracking-[.06em] text-royal-600">{item.label}</p>
                    <p className="mt-2 text-[12px] leading-5 text-[#4A5568]">{item.detail}</p>
                  </div>
                ))}
              </div>
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

/* The questions live in lib/faq.js so the FAQPage structured data on the home
   and pricing pages renders the identical text. Duplicating them here is how
   the markup and the visible page drift apart. */
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
