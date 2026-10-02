import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Logomark } from "./ui";
import { FooterArt } from "./footer-art";
import { FooterSubscribe } from "./footer-subscribe";

const columns = [
  { title: "Product", links: [["Features", "/features"], ["Compare", "/compare"], ["Use cases", "/use-cases"], ["Pricing", "/pricing"]] },
  { title: "Resources", links: [["Journal", "/blog"], ["About", "/about"]] },
  { title: "Account", links: [["Get a workspace", "/register"]] },
];

export function Footer() {
  return (
    <footer className="relative bg-[linear-gradient(to_bottom,var(--color-ink-950)_112px,var(--color-ink-850)_112px)] px-4 pt-8 text-chalk sm:px-6 md:-mt-4 md:pt-0 lg:-mt-6">
      <div className="relative mx-auto w-full max-w-[1240px]">
        <section aria-labelledby="footer-newsletter-title" className="relative mx-3 min-h-[300px] w-[calc(100%-24px)] rounded-[20px] border border-royal-400/60 bg-royal-500 shadow-[0_34px_78px_-20px_rgba(0,0,0,.9),0_14px_32px_-18px_rgba(0,0,0,.65)] sm:mx-8 sm:w-[calc(100%-64px)] md:min-h-[334px] lg:mx-16 lg:w-[calc(100%-128px)]">
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden rounded-[inherit]">
            <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(255,255,255,.06),transparent_45%,rgba(0,30,140,.3))]" />
            <svg className="absolute inset-0 h-full w-full text-white/[.035]" viewBox="0 0 1100 320" preserveAspectRatio="none" fill="currentColor">
              <path d="M0 180 340 320H0Z" />
              <path d="M1100 0H960L710 320H1100Z" />
            </svg>
          </div>
          <div className="relative flex min-h-[300px] items-center px-6 pb-7 pt-32 sm:px-8 sm:pb-9 sm:pt-36 md:min-h-[334px] md:py-10 md:pl-[34%] md:pr-8 lg:py-10 lg:pl-[39%] lg:pr-12">
            <FooterArt className="pointer-events-none absolute -top-16 left-5 h-auto w-[190px] sm:-top-20 sm:left-8 sm:w-[220px] md:-top-20 md:left-0 md:w-[32%] lg:-top-24 lg:left-6 lg:w-[33%]" />
            <div className="relative">
              <h2 id="footer-newsletter-title" className="text-[clamp(24px,2.6vw,34px)] font-semibold leading-[1.2] tracking-[-0.04em] text-white">
                A little less noise.<br />A little more progress.
              </h2>
              <p className="mt-3 max-w-[42ch] text-[14px] leading-6 text-white/90">Fresh updates from ManthanOS. Once a month, at most.</p>
              <div className="mt-5"><FooterSubscribe /></div>
            </div>
          </div>
        </section>
        <div className="relative px-3 sm:px-8 lg:px-16">
          <div className="grid gap-8 py-8 sm:py-10 lg:grid-cols-[1.05fr_1.65fr] lg:gap-20">
            <div>
              <Link href="/" aria-label="ManthanOS home" className="inline-flex min-h-10 items-center rounded-sm"><Logomark className="h-[27px] w-auto lg:h-[29px]" /></Link>
              <p className="mt-3 max-w-[34ch] text-[14px] leading-6 text-slate-400">One workspace for your ideas, projects and everything in between.</p>
              <Link href="/register" className="group mt-5 inline-flex min-h-11 items-center gap-3 rounded-lg border border-white/15 bg-white/5 px-4 text-[14px] font-medium text-white transition-colors hover:border-royal-400/60 hover:bg-royal-500">
                Request a workspace<ArrowRight aria-hidden="true" size={17} className="transition-transform group-hover:translate-x-1 motion-reduce:transform-none" />
              </Link>
            </div>
            <nav aria-label="Footer" className="grid grid-cols-2 gap-x-6 gap-y-8 min-[480px]:grid-cols-3 lg:gap-x-10">
              {columns.map((column) => (
                <div key={column.title}>
                  <h3 className="font-sans text-[13px] font-semibold tracking-normal text-chalk">{column.title}</h3>
                  <ul className="mt-2">
                    {column.links.map(([label, href]) => (
                      <li key={label}><Link href={href} className="inline-flex min-h-11 items-center rounded-sm text-[14px] leading-5 text-slate-400 transition-colors hover:text-white">{label}</Link></li>
                    ))}
                  </ul>
                </div>
              ))}
            </nav>
          </div>
          <div className="flex flex-col gap-2 border-t border-white/10 py-4 text-[13px] leading-5 text-slate-400 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
            <p>© {new Date().getFullYear()} ManthanOS. All rights reserved.</p>
            <nav aria-label="Legal and contact" className="flex items-center gap-4">
              <Link href="/privacy" className="inline-flex min-h-11 items-center rounded-sm transition-colors hover:text-white">Privacy</Link>
              <span aria-hidden="true" className="text-slate-600">·</span>
              <Link href="/terms" className="inline-flex min-h-11 items-center rounded-sm transition-colors hover:text-white">Terms</Link>
              <span aria-hidden="true" className="text-slate-600">·</span>
              <Link href="/contact" className="inline-flex min-h-11 items-center rounded-sm transition-colors hover:text-white">Contact</Link>
            </nav>
          </div>
        </div>
      </div>
    </footer>
  );
}
