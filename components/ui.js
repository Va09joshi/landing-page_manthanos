"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, ArrowUpRight, Check } from "lucide-react";

/* ---------------------------------------------------------------------------
   Logomark — the one place the wordmark is defined.

   Lives in ui.js rather than site-header.js so the server-rendered Footer can
   use it without importing from a "use client" module, which would pull the
   entire footer into the client bundle for the sake of one image.

   public/logo.png was cropped to its actual content bounds (448x79, ~5.67:1).
   It previously shipped as a 707x353 canvas with the artwork occupying only the
   middle 448x79, so anything sized by height rendered a logo at roughly a
   quarter of the intended size — the smudge in the footer. These dimensions
   match the file exactly, so `h-* w-auto` is always correct. Never pass a
   width/height pair whose ratio disagrees with the source image.

   The base deliberately sets WIDTH ONLY (`w-auto`) and never a height. A
   height utility here would fight the caller: Tailwind emits `.h-auto` after
   its arbitrary values, so `h-auto` placed in this prefix beat every caller's
   `h-[22px]` / `h-[27px]` below the `lg` breakpoint. The image carries
   `width={448} height={79}` intrinsics, so the winning declaration was
   `height:auto` + `width:auto` — the wordmark rendered at its full 448x79 on
   phones, overflowed the header pill, and pushed the menu button off-screen.
   Every call site passes its own height, so the base must not supply one.
   ------------------------------------------------------------------------- */
const LOGO_W = 448;
const LOGO_H = 79;

export function Logomark({ className = "" }) {
  return (
    <Image
      src="/logo.png"
      alt="ManthanOS"
      width={LOGO_W}
      height={LOGO_H}
      className={`w-auto ${className}`}
      priority
    />
  );
}

/* ---------------------------------------------------------------------------
   Buttons — one height scale (40 / 44 / 52), one radius (10px).
   Magnetic pull on desktop only, no more than a few px.
   ------------------------------------------------------------------------- */

function useMagnetic() {
  const reduced = useReducedMotion();
  if (reduced) return {};
  return {
    onPointerMove(event) {
      if (event.pointerType !== "mouse") return;
      const rect = event.currentTarget.getBoundingClientRect();
      const x = (event.clientX - (rect.left + rect.width / 2)) * 0.15;
      const y = (event.clientY - (rect.top + rect.height / 2)) * 0.20;
      event.currentTarget.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    },
    onPointerLeave(event) {
      event.currentTarget.style.transform = "translate3d(0,0,0)";
    },
  };
}

const sizes = {
  sm: "h-10 px-4 text-[14px]",
  md: "h-11 px-5 text-[15px]",
  lg: "h-[52px] px-7 text-[15px]",
};

/* Primary is a solid premium blue with a soft shadow that only strengthens on
   hover. Secondary is an elevated dark surface with a hairline border. Neither
   is a pill, and both share one height scale so mixed rows stay aligned. */
const tones = {
  primary:
    "bg-royal-500 text-white border border-royal-400/40 shadow-[0_6px_20px_-8px_rgba(36,95,245,.7)] hover:bg-royal-400 hover:border-royal-400 hover:shadow-[0_10px_30px_-8px_rgba(36,95,245,.85)]",
  outline:
    "bg-white/[.03] border border-white/12 text-chalk hover:bg-white/[.07] hover:border-white/25",
  ghost:
    "text-chalk-dim hover:text-white hover:bg-white/[.06]",
};

export function Button({
  children,
  href,
  variant = "primary",
  size = "md",
  withArrow = false,
  className = "",
}) {
  const pull = useMagnetic();
  const classes = `group inline-flex items-center justify-center gap-2 rounded-[10px] font-medium transition-[background-color,border-color,box-shadow,transform] duration-300 disabled:opacity-50 ${sizes[size]} ${tones[variant]} ${className}`;

  const inner = (
    <>
      {children}
      {withArrow && (
        <ArrowUpRight
          size={16}
          className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
        />
      )}
    </>
  );

  if (href) {
    return <Link href={href} className={classes} {...pull}>{inner}</Link>;
  }
  return (
    <button type="button" className={classes} {...pull}>
      {inner}
    </button>
  );
}

/* ---------------------------------------------------------------------------
   Section heading — one component so vertical rhythm never drifts.
   Supports left-aligned (default), center, and right alignments.
   ------------------------------------------------------------------------- */

export function SectionHead({ eyebrow, title, lede, align = "left", className = "" }) {
  const centered = align === "center";
  return (
    <div className={`${centered ? "mx-auto max-w-[62ch] text-center" : "max-w-[58ch]"} ${className}`}>
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      <ScrollReveal
        as="h2"
        text={title}
        className="mt-5 text-[clamp(26px,3.3vw,42px)] font-semibold leading-[1.08] text-white"
      />
      {lede && (
        <p className={`lede mt-5 ${centered ? "mx-auto" : ""}`}>{lede}</p>
      )}
    </div>
  );
}

/* ---------------------------------------------------------------------------
   ScrollReveal — word-by-word headline entrance on scroll.

   Each word is wrapped in a span carrying an --i index; the parent adds
   .is-revealed once it enters the viewport and CSS staggers the words.

   Deliberate choices:
   - No JS animation loop. One IntersectionObserver toggles a class, CSS does
     the rest. A headline that depends on a rAF loop to become visible is a
     headline that can stay invisible.
   - Reduced motion and no-JS both resolve to fully visible text, because the
     resting state of .reveal-text > span is only translated once JS confirms
     it should animate.
   - Words are split on spaces only. Punctuation stays attached to its word so
     a line never breaks between "work." and the next token.
   ------------------------------------------------------------------------- */
export function ScrollReveal({ text, as: Tag = "h2", className = "", wordClassName = "", scrub = false }) {
  const ref = useRef(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const node = ref.current;
    if (!node || reduced || scrub) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          node.classList.add("is-revealed");
          observer.disconnect();
        }
      },
      { threshold: 0.2, rootMargin: "0px 0px -8% 0px" }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [reduced, scrub]);

  const words = String(text).split(" ");

  useEffect(() => {
    const node = ref.current;
    if (!node || !scrub || reduced) return undefined;

    let frame = 0;
    const update = () => {
      frame = 0;
      const top = node.getBoundingClientRect().top;
      const viewport = window.innerHeight;
      const progress = Math.max(0, Math.min(1, (viewport * 0.9 - top) / (viewport * 0.38)));
      const wordNodes = node.querySelectorAll(".reveal-text > span");

      wordNodes.forEach((wordNode, index) => {
        const start = index / words.length;
        const localProgress = Math.max(0, Math.min(1, (progress - start) * words.length));
        wordNode.style.opacity = String(localProgress);
        wordNode.style.transform = `translateY(${(1 - localProgress) * 72}%)`;
      });
    };
    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [reduced, scrub, words.length]);

  return (
    <Tag ref={ref} className={`${scrub ? "scroll-scrub" : ""} ${className}`}>
      {words.map((word, index) => (
        <span
          key={`${word}-${index}`}
          className={`reveal-text ${wordClassName}`}
          style={{ "--i": index }}
          aria-hidden="true"
        >
          <span>{word}</span>
          {index < words.length - 1 ? " " : ""}
        </span>
      ))}
      {/* Screen readers get the sentence once, intact. */}
      <span className="sr-only">{text}</span>
    </Tag>
  );
}

/* ---------------------------------------------------------------------------
   AssetSlot — a visible marker for artwork that has not been supplied yet.

   Purpose: this is a handover tool, not decoration. It tells whoever fills
   the slot what the asset should be, roughly how large it needs to be, and
   which formats work, so nobody has to guess from the CSS.

   When real art is ready, pass `src` and the placeholder chrome retires
   itself — you swap <AssetSlot> for <Image> and the layout does not move.
   ------------------------------------------------------------------------- */
export function AssetSlot({
  label,
  hint = "Drop your artwork here",
  ratio = "16:9 landscape",
  formats = "PNG or WebP, transparent background",
  tone = "dark",
  className = "",
}) {
  return (
    <div
      className={`asset-slot ${tone === "light" ? "asset-slot--light" : ""} ${className}`}
      data-filled="false"
    >
      <svg
        width="26"
        height="26"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <rect x="3" y="4" width="18" height="16" rx="2" />
        <circle cx="8.5" cy="9.5" r="1.4" />
        <path d="M21 16l-5-5-6.5 6.5" />
      </svg>

      <div className="space-y-1">
        <p className="font-mono text-[10px] uppercase tracking-[.16em]">{label}</p>
        <p className="text-[13px] text-current opacity-80">{hint}</p>
      </div>

      <dl className="mt-1 flex flex-wrap items-center justify-center gap-x-5 gap-y-1 font-mono text-[10px] opacity-70">
        <div className="flex gap-1.5">
          <dt>size</dt>
          <dd className="opacity-80">{ratio}</dd>
        </div>
        <div className="flex gap-1.5">
          <dt>format</dt>
          <dd className="opacity-80">{formats}</dd>
        </div>
      </dl>
    </div>
  );
}

/* ---------------------------------------------------------------------------
   Section index — a quiet editorial counter that gives long pages a spine.
   Deliberately mono, faint and never interactive.
   ------------------------------------------------------------------------- */
export function SectionIndex({ children }) {
  return (
    <span className="font-mono text-[10px] tracking-[.16em] text-white/25 tabular-nums">
      {children}
    </span>
  );
}

/* ---------------------------------------------------------------------------
   UiWindow — the shared chrome for every product interface on this site.

   Real ManthanOS surfaces, built as DOM rather than screenshots: they stay
   crisp at any density, respect the type scale, and carry real product copy.
   A labelled figure makes the distinction from decoration explicit.
   ------------------------------------------------------------------------- */
export function UiWindow({ label, children, className = "", bodyClassName = "" }) {
  return (
    <figure className={`ui-window ${className}`}>
      {label && (
        <figcaption className="flex items-center gap-2.5 border-b border-white/[.07] px-4 py-2.5">
          <span className="flex gap-1.5" aria-hidden>
            <span className="h-2 w-2 rounded-full bg-white/15" />
            <span className="h-2 w-2 rounded-full bg-white/15" />
            <span className="h-2 w-2 rounded-full bg-white/15" />
          </span>
          <span className="mono-label text-white/30">{label}</span>
        </figcaption>
      )}
      <div className={bodyClassName}>{children}</div>
    </figure>
  );
}

/* ---------------------------------------------------------------------------
   Reveal — scroll-driven entrance. Reduced motion renders the final state
   immediately.
   ------------------------------------------------------------------------- */

/* `data-reveal` is what makes the entrance animation optional.

   The hidden state lives in this element's inline style, so a browser without
   JavaScript would render it at opacity 0 forever. The marker lets the noscript
   block in app/layout.js lift it back to visible without touching the animated
   case at all. Any new animated wrapper should carry the same attribute. */
export function Reveal({ children, delay = 0, y = 16, className = "" }) {
  const reduced = useReducedMotion();
  if (reduced) return <div className={className}>{children}</div>;

  return (
    <motion.div
      className={className}
      data-reveal=""
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2, margin: "0px 0px -60px 0px" }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

/* ---------------------------------------------------------------------------
   Status pill — shared vocabulary across every product UI mock on the site.
   Maps to PhaseStatus / TaskStatus values in the schema.
   ------------------------------------------------------------------------- */

const statusTone = {
  live:   "pill-blue",
  ok:     "pill-green",
  warn:   "pill-yellow",
  idea:   "pill-orange",
  meet:   "pill-coral",
  ai:     "pill-purple",
  idle:   "pill-idle",
};

export function StatusPill({ children, tone = "idle", dot = false, className = "" }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 font-mono text-[10px] uppercase tracking-[.1em] ${statusTone[tone]} ${className}`}
    >
      {(tone === "live" || dot) && (
        <span className="h-1.5 w-1.5 rounded-full bg-current opacity-70" />
      )}
      {children}
    </span>
  );
}

/* ---------------------------------------------------------------------------
   CheckList — shared by features and pricing.
   ------------------------------------------------------------------------- */

export function CheckList({ items, columns = 1, className = "" }) {
  const grid = columns === 2 ? "sm:grid-cols-2" : "";
  return (
    <ul className={`grid gap-x-6 gap-y-3 ${grid} ${className}`}>
      {items.map((item) => (
        <li key={item} className="flex gap-2.5 text-[14.5px] leading-6 text-chalk-dim">
          <Check size={15} className="mt-[3px] shrink-0 text-signal" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

/* ---------------------------------------------------------------------------
   Page head — for every route except home.
   ------------------------------------------------------------------------- */

export function PageHead({ eyebrow, title, lede, children }) {
  return (
    <section className="band-dark relative overflow-hidden border-b border-white/10 pt-[136px] lg:pt-[168px]">
      <div aria-hidden className="pointer-events-none absolute inset-0 mesh-dark opacity-60" />
      <div
        aria-hidden
        className="pointer-events-none absolute -left-40 top-0 h-[420px] w-[520px] rounded-full opacity-[.15] blur-[130px]"
        style={{ background: "radial-gradient(circle, #245FF5 0%, transparent 70%)" }}
      />
      <div className="shell relative">
        <div className="grid gap-10 pb-16 lg:grid-cols-[1.15fr_.85fr] lg:items-end lg:gap-16 lg:pb-20">
          <div>
            {eyebrow && <p className="eyebrow">{eyebrow}</p>}
            <h1 className="mt-5 text-[clamp(32px,4.6vw,58px)] font-semibold leading-[1.02] text-white">
              {title}
            </h1>
            {lede && <p className="lede mt-6">{lede}</p>}
          </div>
          {children && <div className="lg:pb-2">{children}</div>}
        </div>
      </div>
    </section>
  );
}
