"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Check, CircleDot, Sparkles } from "lucide-react";

/* ---------------------------------------------------------------------------
   HERO — text and nothing else.

   Centred copy on a gradient field. No watermark behind the headline —
   the headline itself carries a glossy shine sweep for depth.
   ------------------------------------------------------------------------- */

export function Hero() {
  const reduced = useReducedMotion();

  return (
    <section className="band-dark hero-scene relative z-20 flex min-h-[100svh] items-center overflow-hidden lg:min-h-[92vh] lg:overflow-visible">
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

      <div className="shell relative z-10 pb-12 pt-28 sm:pb-16 sm:pt-32 lg:py-36">
        <div className="mx-auto grid max-w-[1240px] items-center gap-7 sm:gap-10 lg:grid-cols-[minmax(0,1.2fr)_minmax(400px,0.8fr)] lg:gap-16">
          <motion.div
            className="flex max-w-[720px] flex-col items-start text-left"
          >
            <motion.p
              initial={reduced ? false : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="eyebrow inline-flex items-center gap-2 rounded-full border border-royal-400/20 bg-royal-500/[.08] px-3 py-2 sm:border-0 sm:bg-transparent sm:p-0"
            >
              <Sparkles aria-hidden size={13} className="sm:hidden" />
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
              className="hero-title mt-5 text-[clamp(42px,12.5vw,58px)] font-bold leading-[.98] tracking-[-0.05em] text-white sm:mt-7 sm:text-[clamp(48px,5.5vw,84px)] sm:leading-[1.04] sm:tracking-[-0.035em]"
            >
              <span className="hero-shine hero-shine--white">One workspace</span>{" "}
              <br className="hidden sm:block" />
              <span className="hero-shine hero-shine--white">for ideas, projects,</span>{" "}
              <br className="hidden sm:block" />
              <span className="hero-shine hero-shine--white">clients and</span>{" "}
              <span className="hero-shine hero-shine--blue">content</span>
              <span className="text-white">.</span>
            </motion.h1>

            <motion.p
              initial={reduced ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.16 }}
              className="lede mt-5 max-w-[56ch] text-[16px] leading-[1.55] sm:mt-7 sm:text-[clamp(17px,1.5vw,20px)] sm:leading-[1.6]"
            >
              ManthanOS brings your ideas, tasks, client work, meetings and
              publishing into one connected place — so every handoff is a
              recorded step, not a message you hope someone read.
            </motion.p>

            <motion.div
              initial={reduced ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.24 }}
              className="mt-7 flex w-full flex-wrap items-center gap-3 sm:mt-10 sm:w-auto"
            >
              <Link
                href="/register"
                className="group inline-flex h-[54px] w-full items-center justify-center gap-2 rounded-[12px] border border-royal-400/40 bg-royal-500 px-8 text-[15px] font-semibold text-white shadow-[0_12px_30px_-10px_rgba(2,8,20,.85)] transition-all hover:bg-royal-400 hover:shadow-[0_10px_28px_-8px_rgba(2,8,20,.9)] sm:w-auto"
              >
                Request a workspace
                <ArrowRight
                  size={16}
                  className="transition-transform duration-300 group-hover:translate-x-0.5"
                />
              </Link>
            </motion.div>

            <motion.div
              initial={reduced ? false : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.32 }}
              className="mt-5 flex items-center gap-2 text-[12px] text-chalk-dim sm:hidden"
            >
              {/* A fanned stack of coins — Ideas, Projects, Clients — drawn
                  with real perspective, plus a fourth "verified" coin carrying
                  the check. The Z/rotation order is set inline here (leftmost
                  coin frontmost); styling and the idle bob live in the
                  .hero-stack block in globals.css. */}
              <span className="hero-stack" aria-hidden>
                {["I", "P", "C"].map((letter, index) => (
                  <span
                    key={letter}
                    className="hero-stack__disc"
                    style={{
                      zIndex: 3 - index,
                      transform: `translateZ(${20 - index * 10}px) rotateY(${(1 - index) * 22}deg)`,
                    }}
                  >
                    {letter}
                  </span>
                ))}
                <span className="hero-stack__check">
                  <Check size={12} strokeWidth={2.5} />
                </span>
              </span>
              No more work lost between apps
            </motion.div>
          </motion.div>

          {/* Supporting facts removed per design update. */}

          <motion.div
            initial={reduced ? false : { opacity: 0, scale: 0.94, y: 18 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
            className="hero-visual relative mx-auto mt-1 w-full max-w-[620px] sm:mt-12 lg:absolute lg:-bottom-[320px] lg:right-[-12px] lg:m-0 lg:w-[min(54vw,720px)] lg:max-w-none"
          >
            <div className="hero-flow sm:hidden" aria-label="Ideas move through projects and clients into published content">
              {["Ideas", "Projects", "Clients", "Content"].map((item, index) => (
                <div key={item} className="hero-flow__step">
                  <span>{index === 0 ? <CircleDot size={13} /> : <Check size={13} />}</span>
                  {item}
                </div>
              ))}
            </div>
            <Image
              src="/illustrations/manthanos-hero-illustration.png"
              alt="A connected creative workspace turning ideas into organised work"
              width={768}
              height={768}
              priority
              className="relative z-10 mx-auto h-auto w-[92%] object-contain sm:w-full"
              style={{ filter: "drop-shadow(18px 26px 4px rgba(0, 0, 0, 0.82))" }}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
