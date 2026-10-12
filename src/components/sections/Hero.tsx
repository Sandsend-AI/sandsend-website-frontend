"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { DuneField } from "@/components/fx/DuneField";
import { useIntroDone } from "@/components/fx/intro";
import { CtaButton } from "@/components/fx/Magnetic";
import { LineReveal, Scramble } from "@/components/fx/Reveal";
import { useContent } from "@/content/ContentProvider";

function Clock() {
  const [t, setT] = useState("--:--:--");
  useEffect(() => {
    const f = () =>
      setT(
        new Intl.DateTimeFormat("en-GB", {
          timeZone: "Asia/Shanghai",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
        }).format(new Date()),
      );
    f();
    const id = setInterval(f, 1000);
    return () => clearInterval(id);
  }, []);
  return <span className="tabular-nums">{t}</span>;
}

export function Hero() {
  const { hero, ui } = useContent();
  const ref = useRef<HTMLElement>(null);
  const ready = useIntroDone();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const yTitle = useTransform(scrollYProgress, [0, 1], ["0%", "-38%"]);
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.12]);

  return (
    <section ref={ref} id="top" className="relative min-h-[100svh] overflow-hidden bg-ink-deep md:h-[100svh] md:min-h-[680px]">
      <motion.div className="absolute inset-0" style={{ scale }} data-cursor-hide>
        <DuneField />
      </motion.div>
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_80%_at_0%_100%,rgba(6,15,29,.92)_0%,rgba(6,15,29,.55)_40%,transparent_70%)]" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-ink-deep to-transparent" />
      <div className="hairline-grid pointer-events-none absolute inset-0 opacity-40" />

      <motion.div style={{ opacity: fade }} className="wrap relative z-10 flex min-h-[100svh] flex-col pb-8 pt-24 md:h-full md:min-h-0 md:pt-32">
        <div className="label flex items-start justify-between text-paper/45">
          <div className="space-y-1.5">
            <div>
              <Scramble text="SS—001 / ENTERPRISE AI ENGINEERING" play={ready} />
            </div>
            <div className="text-gold/80">
              <Scramble text={hero.eyebrow.toUpperCase()} play={ready} delay={0.25} />
            </div>
          </div>
          <div className="hidden space-y-1.5 text-right md:block">
            <div>
              UTC+08:00 · <Clock />
            </div>
            <div className="flex items-center justify-end gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-gold shadow-[0_0_10px_2px_rgba(194,162,107,.6)]" />
              Systems nominal
            </div>
          </div>
        </div>

        <div className="mt-auto grid grid-cols-12 items-end gap-y-8 pt-12 md:gap-y-10">
          <motion.h1 style={{ y: yTitle }} className="h-hero col-span-12 lg:col-span-8">
            <LineReveal
              play={ready}
              delay={0.1}
              stagger={0.12}
              lines={[
                hero.titleLines[0],
                <>
                  {hero.titleLines[1]}
                  <span className="relative inline-block text-gold">
                    {hero.titleAccent}
                    <motion.span
                      className="absolute -bottom-[0.06em] left-0 h-[0.045em] w-full origin-left bg-gold"
                      initial={{ scaleX: 0 }}
                      animate={ready ? { scaleX: 1 } : undefined}
                      transition={{ delay: 1.1, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                    />
                  </span>
                </>,
              ]}
            />
          </motion.h1>

          <motion.div
            className="col-span-12 lg:col-span-4 lg:pb-4 lg:pl-6"
            initial={{ opacity: 0, y: 24 }}
            animate={ready ? { opacity: 1, y: 0 } : undefined}
            transition={{ delay: 0.55, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="text-pretty max-w-md text-[15px] leading-[1.9] text-paper/70 md:text-base">{hero.lede}</p>
            <div className="mt-7 flex flex-wrap items-center gap-4 md:mt-8">
              <CtaButton href="#contact" cursor="Begin">
                {ui.cta}
              </CtaButton>
              <a href="#practices" className="group label flex items-center gap-3 px-2 text-paper/60 transition-colors hover:text-paper">
                {hero.secondary}
                <span className="h-px w-8 bg-paper/40 transition-all duration-500 group-hover:w-12 group-hover:bg-gold" />
              </a>
            </div>
          </motion.div>
        </div>

        <motion.div
          className="mt-10 grid grid-cols-3 border-t border-paper/10 pt-5 md:mt-16"
          initial={{ opacity: 0 }}
          animate={ready ? { opacity: 1 } : undefined}
          transition={{ delay: 0.9, duration: 1.4 }}
        >
          {hero.stats.map((s, i) => (
            <div key={s.label} className={`pr-3 md:pr-4 ${i > 0 ? "border-l border-paper/10 pl-3 md:pl-8" : ""}`}>
              <div className="display flex items-baseline gap-1 text-[28px] text-paper md:text-5xl">
                {s.value}
                <span className="text-sm text-gold md:text-xl">{s.unit}</span>
              </div>
              <div className="mt-2 text-[11.5px] leading-relaxed text-paper/50 md:text-[13px]">{s.label}</div>
            </div>
          ))}
        </motion.div>
      </motion.div>

      <div className="label absolute bottom-8 right-[var(--gutter)] z-10 hidden items-center gap-3 text-paper/40 xl:flex">
        Scroll
        <span className="relative h-10 w-px overflow-hidden bg-paper/15">
          <span className="absolute inset-x-0 top-0 h-1/2 animate-[scrollcue_2s_ease-in-out_infinite] bg-gold" />
        </span>
      </div>
      <style>{`@keyframes scrollcue{0%{transform:translateY(-100%)}100%{transform:translateY(200%)}}`}</style>
    </section>
  );
}
