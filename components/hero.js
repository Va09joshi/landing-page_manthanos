"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";

/* ---------------------------------------------------------------------------
   HERO — text and nothing else.

   Centred copy on a gradient field. No watermark behind the headline —
   the headline itself carries a glossy shine sweep for depth.
   ------------------------------------------------------------------------- */

export function Hero() {
  const reduced = useReducedMotion();

  return (
    <section className="band-dark relative z-20 flex min-h-[92vh] items-center overflow-visible">
      {/* ---- Background: a layered royal-blue bloom on deep ink -----------
          The brighter core sits behind the headline, with a wider, dimmer
          wash giving the rest of the hero depth without competing with type. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(ellipse 64% 58% at 58% 27%, rgba(36,95,245,0.42) 0%, rgba(27,77,228,0.2) 43%, transparent 76%), radial-gradient(ellipse 100% 78% at 50% 0%, rgba(20,59,180,0.2) 0%, transparent 70%), radial-gradient(ellipse 46% 30% at 82% 48%, rgba(36,95,245,0.14) 0%, transparent 72%), linear-gradient(180deg, #0b1837 0%, #071020 50%, #050810 100%)",
        }}
      />
      <div aria-hidden className="pointer-events-none absolute inset-x-[12%] top-24 h-[420px] rounded-full bg-royal-500/[.07] blur-[120px]" />
      {/* Fade the bloom gently into the next section instead of masking it. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[30vh]"
        style={{
          background: "linear-gradient(to top, rgba(6,9,16,.72), transparent)",
        }}
      />
      <div aria-hidden className="pointer-events-none absolute inset-0 mesh-dark opacity-40" />

      <div className="shell relative z-10 py-28 lg:py-36">
        <div className="mx-auto grid max-w-[1240px] items-center gap-10 lg:grid-cols-[minmax(0,1.2fr)_minmax(400px,0.8fr)] lg:gap-16">
          <motion.div
            className="flex max-w-[720px] flex-col items-start text-left"
          >
            <motion.p
              initial={reduced ? false : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="eyebrow"
            >
              For creators, freelancers and small teams
            </motion.p>

            {/* The headline names the product's actual nouns — workspace,
                ideas, projects, clients, content — instead of the earlier
                "the work behind the work", which was evocative but told a
                first-time visitor nothing about what ManthanOS holds. It is
                also the phrase search engines and the sharing previews read,
                so it has to say the thing plainly. */}
            <motion.h1
              initial={reduced ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="hero-title mt-7 text-[clamp(48px,5.5vw,84px)] font-bold leading-[1.04] tracking-[-0.035em] text-white"
            >
              <span className="hero-shine hero-shine--white">One workspace</span>{" "}
              <br />
              <span className="hero-shine hero-shine--white">for ideas, projects,</span>{" "}
              <br />
              <span className="hero-shine hero-shine--white">clients and</span>{" "}
              <span className="hero-shine hero-shine--blue">content</span>
              <span className="text-white">.</span>
            </motion.h1>

            <motion.p
              initial={reduced ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.16 }}
              className="lede mt-7 max-w-[56ch] text-[clamp(17px,1.5vw,20px)] leading-[1.6]"
            >
              ManthanOS brings your ideas, tasks, client work, meetings and
              publishing into one connected place — so every handoff is a
              recorded step, not a message you hope someone read.
            </motion.p>

            <motion.div
              initial={reduced ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.24 }}
              className="mt-10 flex flex-wrap items-center gap-3"
            >
              <Link
                href="/request-demo"
                className="group inline-flex h-[54px] items-center gap-2 rounded-[10px] bg-royal-500 px-8 text-[15px] font-medium text-white border border-royal-400/40 shadow-[0_6px_20px_-8px_rgba(36,95,245,.7)] transition-all hover:bg-royal-400 hover:shadow-[0_10px_30px_-8px_rgba(36,95,245,.85)]"
              >
                Request a workspace
                <ArrowRight
                  size={16}
                  className="transition-transform duration-300 group-hover:translate-x-0.5"
                />
              </Link>
            </motion.div>
          </motion.div>

          {/* Supporting facts removed per design update. */}

          <motion.div
            initial={reduced ? false : { opacity: 0, scale: 0.94, y: 18 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
            className="relative mx-auto mt-10 w-full max-w-[620px] sm:mt-12 lg:absolute lg:-bottom-[320px] lg:right-[-12px] lg:m-0 lg:w-[min(54vw,720px)] lg:max-w-none"
          >
            <Image
              src="/illustrations/manthanos-hero-illustration.png"
              alt="A connected creative workspace turning ideas into organised work"
              width={768}
              height={768}
              priority
              className="relative z-10 h-auto w-full object-contain"
              style={{ filter: "drop-shadow(18px 26px 4px rgba(0, 0, 0, 0.82))" }}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
