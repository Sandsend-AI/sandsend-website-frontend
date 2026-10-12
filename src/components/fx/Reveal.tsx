"use client";

import { motion, useInView } from "motion/react";
import { useEffect, useRef, useState, type ReactNode } from "react";

const EASE = [0.16, 1, 0.3, 1] as const;

export function Reveal({
  children,
  delay = 0,
  y = 28,
  className,
  as = "div",
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  as?: "div" | "li" | "p" | "span";
}) {
  const M = motion[as];
  return (
    <M
      className={className}
      initial={{ opacity: 0, y, filter: "blur(6px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "0px 0px -12% 0px" }}
      transition={{ duration: 1.1, delay, ease: EASE }}
    >
      {children}
    </M>
  );
}

/** Each line rises out of its own clipping mask, staggered. */
export function LineReveal({
  lines,
  className,
  lineClassName,
  delay = 0,
  stagger = 0.09,
  play,
}: {
  lines: ReactNode[];
  className?: string;
  lineClassName?: string;
  delay?: number;
  stagger?: number;
  play?: boolean;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });
  const on = play ?? inView;
  return (
    <span ref={ref} className={className}>
      {lines.map((l, i) => (
        <span key={i} className="block overflow-hidden pb-[0.08em] -mb-[0.08em]">
          <motion.span
            className={`block ${lineClassName ?? ""}`}
            initial={{ y: "110%", rotate: 2 }}
            animate={on ? { y: "0%", rotate: 0 } : undefined}
            transition={{ duration: 1.25, delay: delay + i * stagger, ease: EASE }}
          >
            {l}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789/·—";

/** Terminal-style decode: characters resolve left to right out of noise. */
export function Scramble({
  text,
  className,
  delay = 0,
  play,
}: {
  text: string;
  className?: string;
  delay?: number;
  play?: boolean;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const on = play ?? inView;
  const [out, setOut] = useState(text);

  useEffect(() => {
    if (!on) {
      setOut(text.replace(/\S/g, " "));
      return;
    }
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setOut(text);
      return;
    }
    let raf = 0;
    const start = performance.now() + delay * 1000;
    const dur = 500 + text.length * 28;
    const tick = (now: number) => {
      const p = Math.max(0, (now - start) / dur);
      const n = Math.floor(p * text.length);
      let s = "";
      for (let i = 0; i < text.length; i++) {
        const ch = text[i];
        if (i < n || ch === " ") s += ch;
        else if (i < n + 6 && p > 0) s += GLYPHS[(Math.random() * GLYPHS.length) | 0];
        else s += " ";
      }
      setOut(s);
      if (p < 1) raf = requestAnimationFrame(tick);
      else setOut(text);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [on, text, delay]);

  return (
    <span ref={ref} className={className} aria-label={text}>
      <span aria-hidden="true" className="whitespace-pre">
        {out}
      </span>
    </span>
  );
}

export function Counter({
  to,
  className,
  duration = 1.8,
  delay = 0,
  play,
}: {
  to: number;
  className?: string;
  duration?: number;
  delay?: number;
  play?: boolean;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const on = play ?? inView;
  const [v, setV] = useState(0);
  useEffect(() => {
    if (!on) return;
    let raf = 0;
    const start = performance.now() + delay * 1000;
    const tick = (now: number) => {
      const p = Math.min(1, Math.max(0, (now - start) / (duration * 1000)));
      setV(Math.round(to * (1 - Math.pow(1 - p, 4))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [on, to, duration, delay]);
  return (
    <span ref={ref} className={`tabular-nums ${className ?? ""}`}>
      {v}
    </span>
  );
}
