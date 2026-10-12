"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { Reveal } from "@/components/fx/Reveal";
import { useContent } from "@/content/ContentProvider";

export function Engagement() {
  const { engagement } = useContent();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.8", "end 0.6"] });
  const line = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section id="engagement" data-theme="light" className="relative bg-paper py-28 text-ink md:py-40">
      <div className="wrap">
        <div className="grid grid-cols-12 items-end gap-y-8">
          <div className="col-span-12 lg:col-span-7">
            <Reveal>
              <div className="label flex items-center gap-3 text-muted">
                <span className="h-px w-8 bg-gold" />
                {engagement.label}
              </div>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 className="h-section text-balance mt-8">{engagement.title}</h2>
            </Reveal>
          </div>
          <Reveal delay={0.14} className="col-span-12 lg:col-span-4 lg:col-start-9">
            <p className="text-[15px] leading-[1.9] text-ink/60">{engagement.lede}</p>
          </Reveal>
        </div>

        <div ref={ref} className="relative mt-16 md:mt-28">
          <div className="absolute left-0 right-0 top-[7px] hidden h-px bg-ink/10 lg:block" />
          <motion.div className="absolute left-0 right-0 top-[7px] hidden h-px origin-left bg-gold lg:block" style={{ scaleX: line }} />
          <div className="grid grid-cols-1 gap-12 md:gap-16 lg:grid-cols-3 lg:gap-10">
            {engagement.phases.map((p, i) => (
              <Reveal key={p.k} delay={i * 0.12} className="relative">
                <div className="flex items-center gap-4">
                  <span className="relative flex h-[15px] w-[15px] items-center justify-center rounded-full border border-gold bg-paper">
                    <span className="h-[5px] w-[5px] rounded-full bg-gold" />
                  </span>
                  <span className="label relative -ml-2 bg-paper px-2 text-muted">{p.alt}</span>
                </div>
                <div className="mt-8 flex items-baseline justify-between gap-4 border-b border-ink/10 pb-6 md:mt-10">
                  <h3 className="text-[32px] font-medium tracking-tight md:text-[40px] en:lg:text-[clamp(30px,2.8vw,40px)]">{p.name}</h3>
                  <span className="display text-[64px] leading-none text-ink/[0.07] md:text-[88px]">{p.k}</span>
                </div>
                <div className="mt-6 flex items-center gap-3">
                  <span className="label rounded-full bg-ink px-3 py-1.5 text-[10px] text-gold">{p.dur}</span>
                </div>
                <p className="mt-6 text-lg leading-relaxed">{p.d}</p>
                <ul className="mt-6 space-y-3">
                  {p.items.map((it) => (
                    <li key={it} className="flex items-center gap-3 text-[14.5px] text-ink/65">
                      <span className="h-px w-4 bg-gold" />
                      {it}
                    </li>
                  ))}
                </ul>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
