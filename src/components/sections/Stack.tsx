"use client";

import { motion, useMotionValue, useScroll, useTransform, type MotionValue } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { DunePattern } from "@/components/brand/DunePattern";
import { Reveal } from "@/components/fx/Reveal";
import { useContent } from "@/content/ContentProvider";

export function Stack() {
  const { practices, stack } = useContent();
  const ref = useRef<HTMLElement>(null);
  const [practice, setPractice] = useState<string | null>(null);
  const [hover, setHover] = useState<number | null>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const factor = useMotionValue(1);
  useEffect(() => {
    const mq = matchMedia("(max-width: 767px)");
    const on = () => factor.set(mq.matches ? 0.55 : 1);
    on();
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, [factor]);
  const spread = useTransform(scrollYProgress, [0.15, 0.55], [14, 62]);
  const gap = useTransform(() => spread.get() * factor.get());
  const spin = useTransform(scrollYProgress, [0, 1], [-52, -38]);

  const lit = new Set<number>(
    hover !== null ? [hover] : practice ? practices.find((p) => p.id === practice)!.layers : [],
  );
  const anyLit = lit.size > 0;

  return (
    <section id="stack" ref={ref} className="relative overflow-hidden bg-ink py-28 md:py-40">
      <DunePattern tone="dark" className="opacity-30" />
      <div className="wrap relative grid grid-cols-12 gap-x-8 gap-y-16">
        <div className="col-span-12 lg:col-span-5">
          <Reveal>
            <div className="label flex items-center gap-3 text-paper/50">
              <span className="h-px w-8 bg-gold" />
              {stack.label}
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="h-section text-balance mt-8">{stack.title}</h2>
          </Reveal>
          <Reveal delay={0.14}>
            <p className="mt-6 max-w-md text-[15px] leading-[1.9] text-paper/60">{stack.lede}</p>
          </Reveal>

          <Reveal delay={0.2} className="mt-10 flex flex-wrap gap-2">
            {practices.map((p) => {
              const on = practice === p.id;
              return (
                <button
                  key={p.id}
                  onPointerEnter={(e) => e.pointerType === "mouse" && setPractice(p.id)}
                  onPointerLeave={(e) => e.pointerType === "mouse" && setPractice(null)}
                  onClick={() => setPractice((v) => (v === p.id ? null : p.id))}
                  className={`flex items-center gap-2.5 rounded-full border px-4 py-2 text-[13px] transition-all duration-500 ${
                    on ? "border-gold bg-gold text-ink" : "border-paper/20 text-paper/75 hover:border-paper/40"
                  }`}
                >
                  <span className={`label text-[10px] ${on ? "text-ink/70" : "text-gold"}`}>{p.index}</span>
                  {p.name}
                </button>
              );
            })}
          </Reveal>

          <ul className="mt-10 border-t border-paper/10">
            {[...stack.layers].reverse().map((l) => {
              const i = stack.layers.indexOf(l);
              const on = lit.has(i);
              return (
                <li
                  key={l.code}
                  onPointerEnter={() => setHover(i)}
                  onPointerLeave={() => setHover(null)}
                  className={`grid grid-cols-[44px_1fr] gap-x-4 border-b border-paper/10 py-4 transition-opacity duration-500 ${
                    anyLit && !on ? "opacity-35" : "opacity-100"
                  }`}
                >
                  <span className={`label pt-1 text-[10px] transition-colors ${on ? "text-gold" : "text-paper/40"}`}>{l.code}</span>
                  <div>
                    <div className="flex items-baseline gap-3">
                      <span className="text-[17px] font-medium">{l.name}</span>
                      <span className="label text-[10px] text-paper/40">{l.alt}</span>
                    </div>
                    <p className="mt-1.5 text-[13.5px] leading-relaxed text-paper/55">{l.d}</p>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="col-span-12 flex items-center justify-center lg:col-span-7">
          <div className="relative h-[460px] w-full max-w-[640px] [perspective:2400px] md:h-[720px]">
            <motion.div
              className="absolute left-1/2 top-[68%] h-0 w-0 [transform-style:preserve-3d] md:top-[62%]"
              style={{ rotateX: 58, rotateZ: spin }}
            >
              {stack.layers.map((l, i) => {
                const on = lit.has(i);
                return (
                  <Plate key={l.code} i={i} gap={gap} on={on} dim={anyLit && !on} code={l.code} alt={l.alt} name={l.name} onHover={setHover} />
                );
              })}
            </motion.div>
            <div className="label absolute bottom-0 left-0 text-[9px] text-paper/30">FIG. 04 — Sandsend operating stack, exploded view</div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Plate({
  i,
  gap,
  on,
  dim,
  code,
  alt,
  name,
  onHover,
}: {
  i: number;
  gap: MotionValue<number>;
  on: boolean;
  dim: boolean;
  code: string;
  alt: string;
  name: string;
  onHover: (i: number | null) => void;
}) {
  const z = useTransform(gap, (g) => i * g * 1.6);
  const size = "min(64vw, 340px)";
  return (
    <motion.div
      className="absolute [transform-style:preserve-3d]"
      style={{ z, width: size, height: size, left: `calc(${size} / -2)`, top: `calc(${size} / -2)` }}
      onPointerEnter={() => onHover(i)}
      onPointerLeave={() => onHover(null)}
    >
      <div
        className={`absolute inset-0 border transition-all duration-700 ${
          on
            ? "border-gold bg-gold/[0.16] shadow-[0_0_60px_-10px_rgba(194,162,107,.55)]"
            : dim
              ? "border-paper/10 bg-ink-deep/40"
              : "border-paper/25 bg-ink-deep/55"
        }`}
        style={{
          backgroundImage:
            "linear-gradient(rgba(250,248,244,.05) 1px, transparent 1px), linear-gradient(90deg, rgba(250,248,244,.05) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
          backdropFilter: "blur(2px)",
        }}
      />
      <div className={`absolute left-3 top-3 font-mono text-[10px] tracking-[0.2em] transition-colors duration-500 md:text-[11px] ${on ? "text-gold" : "text-paper/50"}`}>
        {code} · {alt.toUpperCase()}
      </div>
      <div className={`absolute bottom-3 right-4 text-[18px] font-medium transition-colors duration-500 md:text-[22px] ${on ? "text-paper" : "text-paper/40"}`}>
        {name}
      </div>
      <span
        className="absolute left-1/2 top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold"
        style={{ animation: `stackpulse 2.4s ${i * 0.3}s ease-in-out infinite` }}
      />
      <style>{`@keyframes stackpulse{0%,100%{opacity:.15;box-shadow:0 0 0 0 rgba(194,162,107,0)}20%{opacity:1;box-shadow:0 0 0 10px rgba(194,162,107,.18)}}`}</style>
    </motion.div>
  );
}
