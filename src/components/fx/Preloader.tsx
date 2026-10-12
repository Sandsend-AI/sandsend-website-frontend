"use client";

import { useEffect, useRef, useState } from "react";
import { RIDGE_BOTTOM, RIDGE_LINE, RIDGE_TOP } from "@/components/brand/Logo";
import { markIntroDone } from "./intro";

const KEY = "ss-intro";

/**
 * First-visit intro: the mark is drawn as hairlines, fills in, then the screen
 * itself splits open along the brand ridge curve — the curtain *is* the logo's
 * channel, widened to the viewport.
 */
export function Preloader() {
  const [phase, setPhase] = useState<"draw" | "fill" | "open" | "gone">("draw");
  const count = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (document.documentElement.classList.contains("intro-seen")) {
      setPhase("gone");
      markIntroDone();
      return;
    }
    window.__lenis?.stop();
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const total = reduce ? 200 : 1700;
    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / total);
      const eased = 1 - Math.pow(1 - p, 3);
      if (count.current) count.current.textContent = String(Math.round(eased * 100)).padStart(3, "0");
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    const t1 = setTimeout(() => setPhase("fill"), total * 0.62);
    const t2 = setTimeout(() => {
      setPhase("open");
      try {
        sessionStorage.setItem(KEY, "1");
      } catch {}
      window.__lenis?.start();
      markIntroDone();
    }, total + 150);
    const t3 = setTimeout(() => setPhase("gone"), total + 1500);
    return () => {
      cancelAnimationFrame(raf);
      [t1, t2, t3].forEach(clearTimeout);
    };
  }, []);

  if (phase === "gone") return null;
  const open = phase === "open";
  const filled = phase !== "draw";

  return (
    <div className="preloader fixed inset-0 z-[100]" aria-hidden="true">
      <svg
        className="absolute inset-0 h-full w-full transition-transform duration-[1200ms] ease-[var(--ease-in-out-quart)]"
        style={{ transform: open ? "translateY(-100%)" : "none" }}
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        <path d="M0,0 H100 V41 C62,41 38,59.5 0,59.5 Z" fill="#060F1D" />
      </svg>
      <svg
        className="absolute inset-0 h-full w-full transition-transform duration-[1200ms] ease-[var(--ease-in-out-quart)]"
        style={{ transform: open ? "translateY(100%)" : "none" }}
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        <path d="M0,60.5 C38,60.5 62,42 100,42 V100 H0 Z" fill="#060F1D" />
      </svg>

      <div
        className="absolute inset-0 flex flex-col items-center justify-center transition-opacity duration-500"
        style={{ opacity: open ? 0 : 1 }}
      >
        <svg viewBox="0 0 200 200" className="h-28 w-28 overflow-visible md:h-36 md:w-36">
          <defs>
            <clipPath id="pl-clip">
              <circle cx="100" cy="100" r="84" />
            </clipPath>
          </defs>
          <circle
            cx="100"
            cy="100"
            r="84"
            fill="none"
            stroke="#C2A26B"
            strokeWidth="0.8"
            pathLength={1}
            strokeDasharray="1"
            style={{
              strokeDashoffset: 0,
              animation: "pl-draw 1.1s cubic-bezier(.65,0,.35,1) both",
            }}
          />
          <g clipPath="url(#pl-clip)">
            <path
              d={RIDGE_LINE}
              fill="none"
              stroke="#C2A26B"
              strokeWidth="0.8"
              pathLength={1}
              strokeDasharray="1"
              style={{ animation: "pl-draw 0.9s .45s cubic-bezier(.65,0,.35,1) both" }}
            />
            <path
              d={RIDGE_TOP}
              fill="#C2A26B"
              style={{
                transition: "opacity .6s, transform .9s cubic-bezier(.16,1,.3,1)",
                opacity: filled ? 1 : 0,
                transform: filled ? "none" : "translateY(-14px)",
              }}
            />
            <path
              d={RIDGE_BOTTOM}
              fill="#FAF8F4"
              style={{
                transition: "opacity .6s .08s, transform .9s .08s cubic-bezier(.16,1,.3,1)",
                opacity: filled ? 1 : 0,
                transform: filled ? "none" : "translateY(14px)",
              }}
            />
          </g>
        </svg>
        <div className="label mt-10 flex items-center gap-4 text-paper/50">
          <span>Sandsend</span>
          <span className="h-px w-10 bg-gold/50" />
          <span ref={count} className="tabular-nums text-gold">
            000
          </span>
        </div>
      </div>
      <style>{`@keyframes pl-draw{from{stroke-dashoffset:1}to{stroke-dashoffset:0}}`}</style>
    </div>
  );
}
