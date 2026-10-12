"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { Logo } from "@/components/brand/Logo";
import { nav, site } from "@/content/site";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const [light, setLight] = useState(false);

  useEffect(() => {
    let last = scrollY;
    const lightSections = document.querySelectorAll<HTMLElement>('[data-theme="light"]');
    const on = () => {
      const y = scrollY;
      setScrolled(y > 40);
      setLight(
        [...lightSections].some((el) => {
          const r = el.getBoundingClientRect();
          return r.top <= 36 && r.bottom >= 36;
        }),
      );
      setHidden(y > 400 && y > last + 2);
      if (y < last - 2) setHidden(false);
      last = y;
    };
    on();
    addEventListener("scroll", on, { passive: true });
    return () => removeEventListener("scroll", on);
  }, []);

  useEffect(() => {
    if (open) window.__lenis?.stop();
    else window.__lenis?.start();
  }, [open]);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-[transform,background-color,border-color] duration-700 ease-[var(--ease-out-expo)] ${
          hidden && !open ? "-translate-y-full" : "translate-y-0"
        } ${
          scrolled && !open
            ? light
              ? "border-b border-ink/[0.08] bg-paper/80 backdrop-blur-xl backdrop-saturate-150"
              : "border-b border-paper/[0.07] bg-ink-deep/70 backdrop-blur-xl backdrop-saturate-150"
            : "border-b border-transparent"
        }`}
        data-light={light && !open ? "1" : "0"}
      >
        <div className="wrap flex h-[72px] items-center justify-between">
          <a href="#top" className="relative z-10 block" aria-label={`${site.name} 首页`}>
            <Logo tone={light && !open ? "light" : "dark"} className="h-9 w-auto md:h-10" />
          </a>

          <nav className="hidden items-center gap-10 lg:flex">
            {nav.map((n, i) => (
              <a key={n.href} href={n.href} className={`group relative flex items-baseline gap-2 py-2 text-[14px] transition-colors ${light ? "text-ink/70 hover:text-ink" : "text-paper/70 hover:text-paper"}`}>
                <span className="label text-[9px] text-gold/70">0{i + 1}</span>
                <span>{n.label}</span>
                <span className="absolute -bottom-0.5 left-0 h-px w-full origin-right scale-x-0 bg-gold transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:origin-left group-hover:scale-x-100" />
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <a
              href="#contact"
              className={`hidden h-10 items-center gap-3 rounded-full border px-5 text-[13px] transition-colors duration-500 hover:bg-gold hover:text-ink md:inline-flex ${
                light ? "border-ink/25 text-ink" : "border-gold/50 text-gold"
              }`}
            >
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-gold opacity-60" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-gold" />
              </span>
              预约场景诊断
            </a>
            <button
              onClick={() => setOpen((o) => !o)}
              className={`relative z-10 flex h-10 w-10 flex-col items-center justify-center gap-[5px] rounded-full border lg:hidden ${
                light && !open ? "border-ink/20 [&>span]:bg-ink" : "border-paper/15"
              }`}
              aria-label={open ? "关闭菜单" : "打开菜单"}
              aria-expanded={open}
            >
              <span className={`h-px w-4 bg-paper transition-transform duration-500 ${open ? "translate-y-[3px] rotate-45" : ""}`} />
              <span className={`h-px w-4 bg-paper transition-transform duration-500 ${open ? "-translate-y-[3px] -rotate-45" : ""}`} />
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-40 flex flex-col justify-end bg-ink-deep px-[var(--gutter)] pb-12 lg:hidden"
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          >
            <ul className="space-y-2">
              {nav.map((n, i) => (
                <motion.li
                  key={n.href}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.25 + i * 0.06, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                >
                  <a href={n.href} onClick={() => setOpen(false)} className="flex items-baseline gap-4 border-b border-paper/10 py-4">
                    <span className="label text-gold">0{i + 1}</span>
                    <span className="text-4xl font-medium">{n.label}</span>
                    <span className="label ml-auto text-paper/40">{n.en}</span>
                  </a>
                </motion.li>
              ))}
            </ul>
            <a href="#contact" onClick={() => setOpen(false)} className="mt-10 inline-flex h-14 items-center justify-center rounded-full bg-gold text-ink">
              预约场景诊断
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
