"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { Reveal, SectionHead, StatusPill, UiWindow } from "./ui";

/* ---------------------------------------------------------------------------
   CLIENTS & CRM

   Pattern   G — asymmetric editorial. Copy left and narrow, a LARGE client
              record right. Deliberately not a card grid.
   Story     client -> project -> communication -> delivery, read as one record
              rather than four separate objects.
   Accent    Blue dominant. Coral appears once, on the communication row,
             because that is the only place it carries meaning.
   Voice     A working freelancer or a two-person studio, not a sales team.
             No pipeline stages, no lead scoring, no enterprise CRM chrome.

   The client name below is a generic placeholder. No customer, client or real
   person is depicted anywhere on this public page.
   ------------------------------------------------------------------------- */

const record = {
  name: "Northwind Studio",
  meta: "Retainer · 2 active projects",
  rows: [
    { label: "Website redesign", detail: "6 of 9 phases complete", tone: "live", value: 66 },
    { label: "Launch campaign", detail: "Script in review", tone: "warn", value: 34 },
    { label: "Brand guidelines v2", detail: "Delivered · approved", tone: "ok", value: 100 },
  ],
  communication: {
    label: "Latest communication",
    body: "“Approved the second direction — please proceed to production.”",
    when: "Today, 11:04",
  },
  delivery: [
    ["In production", "3"],
    ["Awaiting review", "2"],
    ["Delivered", "11"],
  ],
};

const spine = [
  ["Client", "One record per client or brand you work with."],
  ["Project", "Their work lives under them, not in a separate tracker."],
  ["Communication", "Feedback and approvals attach to the project."],
  ["Delivery", "What shipped, and what is still open."],
];

const barColor = {
  ok: "bg-status-green",
  warn: "bg-status-yellow",
  live: "bg-royal-400",
};

export function ClientsCRM() {
  const reduced = useReducedMotion();


  return (
    <section className="band-raise relative z-20">
      {/* ambient-soft: already high on the ladder, a strong pool would stain. */}
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 ambient-soft" />
        <div className="absolute inset-0 mesh-dark opacity-50" />
      </div>

      {/* The project board bridges the public pipeline and the client record.
          Its two shadows do different jobs: one gives the object depth, the
          other is the soft contact shadow that seats it on the dark band. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 z-20 flex -translate-y-1/2 justify-center px-6"
      >
        <div className="relative w-[min(82vw,460px)] lg:w-[500px]">
          <div className="absolute bottom-[17%] left-1/2 h-[13%] w-[68%] -translate-x-1/2 rounded-full bg-black/70 blur-[24px] sm:blur-[32px]" />
          <Image
            src="/illustrations/Project_board_illustration_design_2K_20261002152811-removebg-preview.png"
            alt=""
            width={512}
            height={512}
            sizes="(max-width: 640px) 88vw, 560px"
            className="relative h-auto w-full drop-shadow-[0_28px_22px_rgba(2,6,15,.62)]"
          />
        </div>
      </div>

      <div className="shell relative pb-[clamp(80px,10vw,148px)] pt-[clamp(170px,15vw,240px)]">
        <div className="grid gap-14 lg:grid-cols-[.8fr_1.2fr] lg:gap-20">
          {/* ---- Copy: narrow, left aligned, generous whitespace --------- */}
          <div className="max-w-[440px]">
            <Reveal>
              <SectionHead
                eyebrow="Clients"
                title="The client is part of the work, not a contact above it."
                lede="Open a client and you are already inside their projects, their conversations and what has actually shipped. No pipeline to configure, no second CRM to keep in sync."
              />
            </Reveal>

            <Reveal delay={0.1}>
              <ol className="mt-10 border-t border-white/[.08]">
                {spine.map(([label, body], index) => (
                  <li key={label} className="flex gap-4 border-b border-white/[.08] py-4">
                    <span className="mt-0.5 font-mono text-[10px] tabular-nums text-white/20">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <p className="text-[14px] font-medium text-white">{label}</p>
                      <p className="mt-1 text-[13.5px] leading-6 text-chalk-dim">{body}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </Reveal>
          </div>

          {/* ---- The product: one large client record -------------------- */}
          <Reveal delay={0.08}>
            <UiWindow label="Clients · client record" className="client-record-window">
              <div className="client-record-body p-6 sm:p-7">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <span
                      className="client-record-avatar flex h-11 w-11 items-center justify-center rounded-[10px] text-[14px] font-semibold text-soft"
                      aria-hidden
                    >
                      N
                    </span>
                    <div>
                      <p className="text-[17px] font-semibold leading-tight text-white">
                        {record.name}
                      </p>
                      <p className="mt-1 text-[13px] text-chalk-dim">{record.meta}</p>
                    </div>
                  </div>
                  <StatusPill tone="ok" className="client-record-status">Active</StatusPill>
                </div>

                <div className="mt-8">
                  <p className="mono-label text-white/25">Projects</p>
                  <ul className="mt-3 space-y-2.5">
                    {record.rows.map((row, index) => (
                      <motion.li
                        key={row.label}
                        initial={reduced ? false : { opacity: 0, y: 8 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.4 }}
                        transition={{ duration: 0.4, delay: index * 0.07 }}
                        className={`ui-well ui-row client-project-row client-project-row-${index + 1} px-4 py-3.5`}
                      >
                        <div className="flex items-center justify-between gap-4">
                          <div className="min-w-0">
                            <p className="truncate text-[14px] font-medium text-white">{row.label}</p>
                            <p className="mt-0.5 truncate text-[12.5px] text-chalk-dim">{row.detail}</p>
                          </div>
                          <span className="track client-progress-track w-24 shrink-0">
                            <span className={barColor[row.tone]} style={{ width: `${row.value}%` }} />
                          </span>
                        </div>
                      </motion.li>
                    ))}
                  </ul>
                </div>

                {/* Communication — the one place coral is used */}
                <div className="client-communication mt-6 rounded-[10px] px-4 py-3.5">
                  <div className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-status-coral" aria-hidden />
                    <p className="text-[12px] font-medium text-white">{record.communication.label}</p>
                    <span className="ml-auto font-mono text-[10px] text-white/30">
                      {record.communication.when}
                    </span>
                  </div>
                  <p className="mt-2 text-[13.5px] leading-6 text-chalk">{record.communication.body}</p>
                </div>

                <div className="client-delivery mt-6 grid grid-cols-3 pt-5">
                  {record.delivery.map(([label, value], index) => (
                    <div key={label} className={index > 0 ? "border-l border-white/[.08] pl-5" : ""}>
                      <p className="text-[19px] font-semibold leading-none text-white">{value}</p>
                      <p className="mt-2 text-[12px] leading-4 text-chalk-dim">{label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </UiWindow>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
