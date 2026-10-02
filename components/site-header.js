"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { Logomark } from "./ui";

export const navLinks = [
  ["Product", "/features"],
  ["Use cases", "/use-cases"],
  ["Pricing", "/pricing"],
  ["Journal", "/blog"],
  ["About", "/about"],
];

export function Logo() {
  return (
    <Link href="/" aria-label="ManthanOS home" className="group inline-flex items-center">
      <Logomark className="h-[22px] lg:h-[24px]" />
    </Link>
  );
}

/* ---------------------------------------------------------------------------
   HEADER — a floating pill.

   The shape is a single wide capsule inset from both edges, floating above the
   page. It keeps a visible surface and border at all times rather than fading
   in only on scroll: the previous version started fully transparent and only
   gained a background once you scrolled, which meant the links sat directly on
   the hero with no container and the whole bar dissolved on light sections.

   Structure is strictly three zones so the bar never reflows as the viewport
   changes: brand on the left, links centred, actions on the right. On desktop
   the centre zone is absolutely positioned so the links stay optically centred
   in the viewport regardless of how wide the brand and actions are.
   ------------------------------------------------------------------------- */
export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const sentinel = useRef(null);

  useEffect(() => {
    const node = sentinel.current;
    if (!node) return undefined;
    const observer = new IntersectionObserver(
      ([entry]) => setScrolled(!entry.isIntersecting),
      { threshold: 0, rootMargin: "-64px 0px 0px 0px" }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  // Escape closes the mobile sheet; the sheet is a dialog-like surface.
  useEffect(() => {
    if (!open) return undefined;
    const onKey = (event) => event.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <div ref={sentinel} aria-hidden className="pointer-events-none absolute top-0 h-[40px] w-full" />

      <header className="fixed inset-x-0 top-4 z-50 px-4 lg:top-5">
        <div
          className={`pointer-events-auto relative mx-auto flex max-w-[1240px] items-center justify-between gap-4 rounded-full border transition-[background-color,border-color,box-shadow,backdrop-filter] duration-300 ${
            scrolled
              ? "border-white/[.10] bg-ink-950/80 shadow-[0_18px_44px_-16px_rgba(0,0,0,.9)] backdrop-blur-xl"
              : "border-white/[.09] bg-ink-950/55 backdrop-blur-lg"
          } h-14 px-4 lg:h-16 lg:px-5`}
        >
          {/* ---- Left: brand ------------------------------------------- */}
          <div className="flex shrink-0 items-center">
            <Logo />
          </div>

          {/* ---- Centre: links, optically centred -----------------------
              Absolute so the group is centred on the viewport, not on the
              leftover space between the two side zones. */}
          <nav
            aria-label="Primary"
            className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-1 lg:flex"
          >
            {navLinks.map(([label, href]) => {
              const active = pathname === href;
              return (
                <Link
                  key={href}
                  href={href}
                  aria-current={active ? "page" : undefined}
                  className={`relative rounded-full px-4 py-2 text-[14px] font-medium transition-colors duration-200 ${
                    active ? "text-white" : "text-chalk-dim hover:text-white"
                  }`}
                >
                  {label}
                  {/* Active state is a filled pill, not an underline — it stays
                      legible at a glance and matches the pill language used
                      everywhere else on the site. */}
                  <span
                    aria-hidden
                    className={`absolute inset-0 -z-10 rounded-full bg-white/[.08] transition-opacity duration-200 ${
                      active ? "opacity-100" : "opacity-0"
                    }`}
                  />
                </Link>
              );
            })}
          </nav>

          {/* ---- Right: actions ---------------------------------------- */}
          <div className="flex shrink-0 items-center gap-2">
            <Link
              href="/login"
              className="hidden rounded-full px-4 py-2 text-[14px] font-medium text-chalk-dim transition-colors hover:text-white lg:inline-flex"
            >
              Sign in
            </Link>

            {/* The single pill CTA. Solid blue on hover, outlined at rest —
                the reference pattern, and it keeps the loudest element on the
                page inside the hero rather than in the chrome. */}
            <Link
              href="/request-demo"
              className="group inline-flex h-10 items-center gap-1.5 rounded-full border border-white/[.14] bg-white/[.05] px-4 text-[14px] font-medium text-white transition-colors duration-200 hover:border-royal-400/60 hover:bg-royal-500 lg:px-5"
            >
              Book a demo
              <ArrowUpRight
                size={15}
                className="transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </Link>

            <button
              type="button"
              onClick={() => setOpen((value) => !value)}
              aria-expanded={open}
              aria-controls="mobile-nav"
              aria-label={open ? "Close menu" : "Open menu"}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/[.12] text-white transition-colors hover:bg-white/[.06] lg:hidden"
            >
              {open ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>

        {/* ---- Mobile sheet --------------------------------------------
            Anchored under the pill rather than full-screen: the pill is still
            visible above it, so the close button is never out of reach. */}
        {open && (
          <div
            id="mobile-nav"
            className="pointer-events-auto mx-auto mt-2 max-w-[1240px] overflow-hidden rounded-[18px] border border-white/[.09] bg-ink-900/95 p-2 shadow-[0_30px_70px_-30px_rgba(0,0,0,.9)] backdrop-blur-xl lg:hidden"
          >
            <nav aria-label="Mobile" className="flex flex-col">
              {navLinks.map(([label, href]) => {
                const active = pathname === href;
                return (
                  <Link
                    key={href}
                    href={href}
                    aria-current={active ? "page" : undefined}
                    className={`flex items-center justify-between rounded-[12px] px-4 py-3.5 text-[15px] font-medium transition-colors ${
                      active ? "bg-white/[.07] text-white" : "text-chalk-dim hover:bg-white/[.04] hover:text-white"
                    }`}
                  >
                    {label}
                    <ArrowUpRight size={15} className="opacity-40" />
                  </Link>
                );
              })}
            </nav>
            <div className="my-2 h-px bg-white/[.08]" />
            <Link
              href="/login"
              className="flex items-center rounded-[12px] px-4 py-3.5 text-[15px] font-medium text-chalk-dim transition-colors hover:bg-white/[.04] hover:text-white"
            >
              Sign in
            </Link>
          </div>
        )}
      </header>
    </>
  );
}