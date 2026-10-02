"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { Reveal, SectionHead, StatusPill, UiWindow } from "./ui";

/* ---------------------------------------------------------------------------
   CONTENT & CREATIVE WORK

   Pattern   B, set as an editorial spread. A LARGE content interface sits
              centre-left at full width, with the argument set in a narrow
              column to its right. Asymmetric, not a centred stack.
   Story     idea -> creation -> review -> delivery, drawn as a single
              horizontal track with a marker per stage.
   Accent    Orange is used for ONE thing only: the creative stage marker and
              the idea state. Everywhere else the section is blue and neutral.
   3D        A small stylised "content block" mark sits beside the copy. It is
              a stack of layered sheets — the shape of a draft, not a camera.
              No camera icon: this product is not a media editor.
   ------------------------------------------------------------------------- */

/* The four stages creative work actually moves through. `color` is the single
   value the stage rule and its label both read from, so they can never drift
   apart. Orange appears here and nowhere else in this section. */
const stages = [
  { id: "idea", label: "Idea", color: "#F97316", note: "An angle with a channel and an owner." },
  { id: "creation", label: "Creation", color: "#4B82F2", note: "Drafts and versions beside the work." },
  { id: "review", label: "Review", color: "#FBBF24", note: "Approval is a phase, not a message." },
  { id: "delivery", label: "Delivery", color: "#34D399", note: "Scheduled, then measured on the record." },
];

const documents = [
  { title: "Launch script — draft v2", meta: "Edited 20 min ago", tone: "idea", stage: "Creation" },
  { title: "Hero visual set", meta: "3 versions · awaiting review", tone: "warn", stage: "Review" },
  { title: "Launch email copy", meta: "Approved · scheduled", tone: "ok", stage: "Delivery" },
];

export function ContentCreative() {
  const reduced = useReducedMotion();

  return (
    <section className="band-deep relative z-20">
      {/* Seam blend: soften the hard step from the previous (ink-900) band
          into this ink-800 band so there is no sharp dividing line. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[160px]"
        style={{
          background: "linear-gradient(to bottom, #0A101C 0%, rgba(10,16,28,0) 100%)",
        }}
      />
      {/* Folder bridging the seam — same pattern as the project-board bridge
          above the clients section. Two shadows: soft contact ellipse under
          the object + drop-shadow on the image for depth. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 z-20 flex -translate-y-[46%] justify-center px-6"
      >
        <div className="relative w-[min(58vw,260px)] lg:w-[300px]">
          <div className="absolute bottom-[12%] left-1/2 h-[12%] w-[70%] -translate-x-1/2 rounded-full bg-black/70 blur-[24px] sm:blur-[32px]" />
          <Image
            src="/illustrations/Workspace_folder_illustration_fo__2K_20261002152824-removebg-preview.png"
            alt=""
            width={512}
            height={512}
            sizes="(max-width: 640px) 60vw, 300px"
            className="relative h-auto w-full drop-shadow-[0_28px_22px_rgba(2,6,15,.62)]"
          />
        </div>
      </div>
      {/* Keep the section texture clipped without clipping the seam artwork. */}
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 ambient-soft" />
        <div className="absolute inset-0 mesh-dark opacity-40" />
      </div>

      <div className="shell relative band-pad !pt-[clamp(130px,14vw,200px)]">
        {/* ---- Header: the folder above is the only illustration --------- */}
        <div>
          <Reveal>
            <div className="max-w-[52ch]">
              <p className="eyebrow">Content &amp; creative work</p>
              <h2 className="mt-5 text-[clamp(26px,3.3vw,42px)] font-semibold leading-[1.08] text-white">
                A draft, a review and a delivery that all live on one record.
              </h2>
              <p className="lede mt-5">
                Creative work in a team usually dies in the gap between the draft
                and the approval. Here the draft, the feedback and the sign-off
                are the same object — so nothing gets lost in a folder called
                final_v3.
              </p>
            </div>
          </Reveal>

        </div>

        <div
          aria-hidden="true"
          className="mt-8 flex items-center justify-center gap-3 sm:mt-10"
        >
          <span className="h-px w-10 bg-white/[.12] sm:w-14" />
          <span className="h-1 w-1 shrink-0 rounded-full bg-royal-400/80" />
          <span className="font-mono text-[9px] uppercase tracking-[.18em] text-white/30">
            Creative flow
          </span>
          <span className="h-1 w-1 shrink-0 rounded-full bg-royal-400/80" />
          <span className="h-px w-10 bg-white/[.12] sm:w-14" />
        </div>

        {/* ---- The stage track ------------------------------------------- */}
        <Reveal delay={0.1}>
          <ol className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-[12px] border border-white/[.09] bg-white/[.09] sm:mt-12 sm:grid-cols-4">
            {stages.map((stage, index) => (
              <li key={stage.id} className="relative bg-ink-900 px-5 py-5">
                <span className="font-mono text-[10px] tabular-nums text-white/20">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <p className="mt-3 text-[15px] font-semibold text-white">{stage.label}</p>
                <p className="mt-1.5 text-[13px] leading-6 text-chalk-dim">{stage.note}</p>
                <span
                  className="absolute inset-x-0 top-0 h-[2px]"
                  style={{ background: stage.color }}
                  aria-hidden
                />
              </li>
            ))}
          </ol>
        </Reveal>

        {/* ---- The product: large content interface ---------------------- */}
        <Reveal delay={0.12}>
          <UiWindow label="Content · project workspace" className="mt-4">
            <div className="p-6 sm:p-7">
              <div className="flex flex-wrap items-start justify-between gap-4 border-b border-white/[.08] pb-5">
                <div>
                  <p className="mono-label text-white/25">Content project</p>
                  <p className="mt-1.5 text-[17px] font-semibold text-white">
                    Product launch — content set
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <StatusPill tone="idea">Idea</StatusPill>
                  <StatusPill tone="live">In creation</StatusPill>
                </div>
              </div>

              <ul className="mt-2">
                {documents.map((doc, index) => (
                  <motion.li
                    key={doc.title}
                    initial={reduced ? false : { opacity: 0, y: 8 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.4 }}
                    transition={{ duration: 0.4, delay: index * 0.07 }}
                    className="ui-row flex flex-wrap items-center gap-4 px-1 py-4"
                  >
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-[14.5px] font-medium text-white">{doc.title}</p>
                      <p className="mt-0.5 truncate text-[12.5px] text-chalk-dim">{doc.meta}</p>
                    </div>
                    <span className="font-mono text-[10px] uppercase tracking-[.1em] text-white/25">
                      {doc.stage}
                    </span>
                    <StatusPill tone={doc.tone}>
                      {doc.tone === "ok" ? "Delivered" : doc.tone === "warn" ? "Review" : "Draft"}
                    </StatusPill>
                  </motion.li>
                ))}
              </ul>
            </div>
          </UiWindow>
        </Reveal>
      </div>
    </section>
  );
}
