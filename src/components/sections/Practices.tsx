"use client";

import { motion, useInView, useMotionValueEvent, useScroll, useTransform } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { Reveal } from "@/components/fx/Reveal";
import { AgentLoop } from "@/components/visuals/AgentLoop";
import { ModelViz } from "@/components/visuals/ModelViz";
import { OrgGraph } from "@/components/visuals/OrgGraph";
import type { Practice } from "@/content";
import { useContent } from "@/content/ContentProvider";

const VISUALS = { fde: OrgGraph, agents: AgentLoop, models: ModelViz } as const;

function useIsDesktop() {
  const [d, setD] = useState(false);
  useEffect(() => {
    const mq = matchMedia("(min-width: 1024px)");
    const on = () => setD(mq.matches);
    on();
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);
  return d;
}

function Panel({ p, active, deliverables }: { p: Practice; active: boolean; deliverables: string }) {
  const Visual = VISUALS[p.id as keyof typeof VISUALS];
  return (
    <article className="relative flex w-full shrink-0 items-center lg:h-full lg:w-screen">
      <div className="wrap grid grid-cols-12 items-center gap-x-8 gap-y-10 py-16 md:gap-y-12 md:py-20 lg:pb-4 lg:pt-28">
        <div className="col-span-12 lg:col-span-6 xl:col-span-5">
          <div className="flex items-baseline gap-5">
            <span className="display text-[72px] leading-none text-transparent [-webkit-text-stroke:1px_rgba(194,162,107,.7)] md:text-[120px]">
              {p.index}
            </span>
            <div>
              <div className="label text-gold">{p.alt}</div>
              <div className="mt-1 text-[13px] text-paper/50">{p.scope}</div>
            </div>
          </div>
          <h3 className="mt-6 text-[clamp(36px,4.6vw,72px)] font-medium leading-[1.05] tracking-[-0.03em] md:mt-8 en:text-[clamp(32px,3.6vw,56px)]">{p.name}</h3>
          <p className="text-balance mt-5 text-lg leading-snug text-gold-soft/90 md:mt-6 md:text-2xl en:md:text-xl">{p.lead}</p>
          <p className="text-pretty mt-5 max-w-xl text-[15px] leading-[1.95] text-paper/60 md:mt-6 en:leading-[1.75]">{p.body}</p>
          <div className="mt-8 flex flex-wrap gap-2">
            {p.tags.map((t) => (
              <span key={t} className="rounded-full border border-gold/30 px-3 py-1 text-[12px] text-gold/90">
                {t}
              </span>
            ))}
          </div>
        </div>

        <div className="col-span-12 lg:col-span-6 xl:col-span-7">
          <div className="grid grid-cols-1 gap-10 xl:grid-cols-[1fr_260px] xl:items-center">
            <div className="relative mx-auto aspect-square w-full max-w-[460px] rounded-sm border border-paper/[0.07] bg-ink/40 p-6 md:p-10">
              <span className="absolute left-3 top-3 h-3 w-3 border-l border-t border-gold/60" />
              <span className="absolute right-3 top-3 h-3 w-3 border-r border-t border-gold/60" />
              <span className="absolute bottom-3 left-3 h-3 w-3 border-b border-l border-gold/60" />
              <span className="absolute bottom-3 right-3 h-3 w-3 border-b border-r border-gold/60" />
              <span className="label absolute -top-2.5 left-6 bg-ink-deep px-2 text-[9px] text-paper/40">
                FIG. {p.index}
              </span>
              <Visual active={active} />
            </div>
            <div>
              <div className="label mb-4 text-paper/40">{deliverables}</div>
              <ul className="divide-y divide-paper/[0.08] border-y border-paper/[0.08]">
                {p.deliverables.map((d, i) => (
                  <li key={d} className="group flex gap-4 py-3.5 text-[14px] leading-relaxed text-paper/80">
                    <span className="label pt-0.5 text-[10px] text-gold/70">{String(i + 1).padStart(2, "0")}</span>
                    <span className="transition-transform duration-500 group-hover:translate-x-1">{d}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

/** Stacked layout: each visual only animates while its panel is on screen. */
function StackedPanel({ p, deliverables }: { p: Practice; deliverables: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "-15% 0px -15% 0px" });
  return (
    <div ref={ref}>
      <Panel p={p} active={inView} deliverables={deliverables} />
    </div>
  );
}

export function Practices() {
  const { practices, practicesIntro } = useContent();
  const ref = useRef<HTMLDivElement>(null);
  const desktop = useIsDesktop();
  const [active, setActive] = useState(0);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  // Each panel holds still for a stretch of scroll before the next slides in.
  const stops = [0, 0.16, 0.42, 0.58, 0.84, 1];
  const x = useTransform(scrollYProgress, stops, ["0vw", "0vw", "-100vw", "-100vw", "-200vw", "-200vw"]);
  const bar = useTransform(scrollYProgress, [0, 1], [0, 1]);

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    if (!desktop) return;
    setActive(v < 0.29 ? 0 : v < 0.71 ? 1 : 2);
  });

  return (
    <section id="practices" className="relative bg-ink-deep">
      <div className="wrap pb-6 pt-24 md:pt-40">
        <div className="grid grid-cols-12 items-end gap-y-8">
          <div className="col-span-12 lg:col-span-7">
            <Reveal>
              <div className="label flex items-center gap-3 text-paper/50">
                <span className="h-px w-8 bg-gold" />
                {practicesIntro.label}
              </div>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 className="h-section text-balance mt-8">
                {practicesIntro.titleLines[0]}
                <br />
                {practicesIntro.titleLines[1]}
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.16} className="col-span-12 lg:col-span-4 lg:col-start-9">
            <p className="text-[15px] leading-[1.9] text-paper/60">{practicesIntro.lede}</p>
          </Reveal>
        </div>
      </div>

      {desktop ? (
        <div style={{ height: `${practices.length * 100 + 40}vh` }} ref={ref}>
          <div className="sticky top-0 h-screen overflow-hidden">
            <div className="wrap label absolute inset-x-0 top-24 z-10 flex items-center gap-6 text-paper/40">
              <span className="tabular-nums text-gold">0{active + 1}</span>
              <div className="relative h-px flex-1 bg-paper/10">
                <motion.div className="absolute inset-y-0 left-0 w-full origin-left bg-gold" style={{ scaleX: bar }} />
              </div>
              <span className="tabular-nums">0{practices.length}</span>
              <div className="ml-6 flex gap-6">
                {practices.map((p, i) => (
                  <span key={p.id} className={`transition-colors duration-500 ${i === active ? "text-paper" : ""}`}>
                    {p.name}
                  </span>
                ))}
              </div>
            </div>
            <motion.div className="flex h-full" style={{ x }}>
              {practices.map((p, i) => (
                <Panel key={p.id} p={p} active={i === active} deliverables={practicesIntro.deliverables} />
              ))}
            </motion.div>
          </div>
        </div>
      ) : (
        <div ref={ref} className="divide-y divide-paper/10 border-t border-paper/10">
          {practices.map((p) => (
            <StackedPanel key={p.id} p={p} deliverables={practicesIntro.deliverables} />
          ))}
        </div>
      )}
    </section>
  );
}
