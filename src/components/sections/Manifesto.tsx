"use client";

import { motion, useScroll, useTransform, type MotionValue } from "motion/react";
import { useRef } from "react";
import { DunePattern } from "@/components/brand/DunePattern";
import { Reveal } from "@/components/fx/Reveal";
import { manifesto } from "@/content/site";

function Char({ ch, progress, range }: { ch: string; progress: MotionValue<number>; range: [number, number] }) {
  const opacity = useTransform(progress, range, [0.12, 1]);
  const color = useTransform(progress, [range[0], range[1], Math.min(1, range[1] + 0.08)], ["#0B1A30", "#A8864F", "#0B1A30"]);
  return <motion.span style={{ opacity, color }}>{ch}</motion.span>;
}

export function Manifesto() {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "end 0.45"] });
  const chars = Array.from(manifesto.statement);
  const n = chars.length;

  return (
    <section data-theme="light" className="relative overflow-hidden bg-paper py-28 text-ink md:py-44">
      <DunePattern tone="light" className="opacity-40" />
      <div className="wrap relative">
        <div className="grid grid-cols-12 gap-y-10">
          <div className="col-span-12 md:col-span-3">
            <div className="label flex items-center gap-3 text-muted">
              <span className="h-px w-8 bg-gold" />
              {manifesto.label}
            </div>
          </div>
          <p
            ref={ref}
            className="text-balance col-span-12 text-[clamp(30px,4.4vw,68px)] font-medium leading-[1.3] tracking-[-0.03em] md:col-span-9"
          >
            {chars.map((c, i) =>
              c === "\n" ? (
                <br key={i} />
              ) : (
                <Char key={i} ch={c} progress={scrollYProgress} range={[i / n, Math.min(1, (i + 1.5) / n)]} />
              ),
            )}
          </p>
        </div>

        <div className="mt-24 grid grid-cols-1 border-t border-ink/10 md:mt-36 md:grid-cols-3">
          {manifesto.points.map((p, i) => (
            <Reveal
              key={p.k}
              delay={i * 0.1}
              className={`group relative py-10 md:px-8 md:py-12 ${i > 0 ? "border-t border-ink/10 md:border-l md:border-t-0" : ""} md:first:pl-0`}
            >
              <span className="absolute left-0 top-0 h-px w-0 bg-gold transition-all duration-700 ease-[var(--ease-out-expo)] group-hover:w-full md:-top-px" />
              <div className="label text-gold">{p.k}</div>
              <h3 className="mt-6 text-2xl font-medium tracking-tight md:text-[28px]">{p.t}</h3>
              <p className="mt-4 max-w-sm text-[15px] leading-[1.9] text-ink/60">{p.d}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
