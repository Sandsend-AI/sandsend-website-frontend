"use client";

import { useInView } from "motion/react";
import { useEffect, useMemo, useRef, useState } from "react";
import { Counter, Reveal } from "@/components/fx/Reveal";
import { useContent } from "@/content/ContentProvider";

const TAG_STYLE: Record<string, string> = {
  DETECT: "text-[#E0B872]",
  LINK: "text-ink-3",
  INFER: "text-ink-3",
  PLAN: "text-gold",
  CITE: "text-paper/40",
  HUMAN: "text-paper",
  ACT: "text-gold",
};

function useTypedLog(lines: { text: string }[], on: boolean) {
  const [state, setState] = useState({ line: 0, ch: 0 });
  useEffect(() => {
    if (!on) return;
    let line = 0,
      ch = 0,
      wait = 0;
    const id = setInterval(() => {
      if (wait > 0) {
        wait--;
        return;
      }
      if (line >= lines.length) {
        line = 0;
        ch = 0;
        setState({ line, ch });
        return;
      }
      const len = Array.from(lines[line].text).length;
      ch += 2;
      if (ch >= len) {
        line++;
        ch = 0;
        wait = line === lines.length ? 140 : line === 5 ? 40 : 12;
      }
      setState({ line, ch });
    }, 28);
    return () => clearInterval(id);
  }, [on, lines]);
  return state;
}

function RiskChart({ on }: { on: boolean }) {
  const pts = useMemo(() => {
    const a: number[] = [];
    let v = 40;
    for (let i = 0; i < 30; i++) {
      v += Math.sin(i * 0.9) * 4 + (i > 20 ? 4.5 : -0.3);
      a.push(Math.max(10, Math.min(92, v)));
    }
    return a;
  }, []);
  const d = pts.map((v, i) => `${i === 0 ? "M" : "L"}${(i / 29) * 400},${100 - v}`).join(" ");
  return (
    <svg viewBox="0 0 400 100" preserveAspectRatio="none" className="h-full w-full overflow-visible">
      <defs>
        <linearGradient id="cc-fill" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#C2A26B" stopOpacity=".35" />
          <stop offset="1" stopColor="#C2A26B" stopOpacity="0" />
        </linearGradient>
      </defs>
      {[20, 40, 60, 80].map((y) => (
        <line key={y} x1="0" x2="400" y1={y} y2={y} stroke="#FAF8F4" strokeOpacity=".06" vectorEffect="non-scaling-stroke" />
      ))}
      <line x1="0" x2="400" y1="30" y2="30" stroke="#C2A26B" strokeOpacity=".5" strokeDasharray="3 4" vectorEffect="non-scaling-stroke" />
      <path
        d={`${d} L400,100 L0,100 Z`}
        fill="url(#cc-fill)"
        style={{ opacity: on ? 1 : 0, transition: "opacity 1.5s .8s" }}
      />
      <path
        d={d}
        fill="none"
        stroke="#C2A26B"
        strokeWidth="1.5"
        vectorEffect="non-scaling-stroke"
        pathLength={1}
        strokeDasharray="1"
        style={{ strokeDashoffset: on ? 0 : 1, transition: "stroke-dashoffset 2.2s cubic-bezier(.65,0,.35,1)" }}
      />
    </svg>
  );
}

function SupplierGrid({ on }: { on: boolean }) {
  const cells = useMemo(
    () => Array.from({ length: 48 }, (_, i) => ({ risk: [5, 13, 19, 22, 30, 38, 41].includes(i) ? 2 : i % 7 === 3 ? 1 : 0 })),
    [],
  );
  return (
    <div className="grid h-full grid-cols-8 gap-1">
      {cells.map((c, i) => (
        <div
          key={i}
          className={`relative rounded-[1px] transition-colors duration-700 ${
            !on ? "bg-paper/5" : c.risk === 2 ? "bg-gold" : c.risk === 1 ? "bg-gold/35" : "bg-ink-2/60"
          }`}
          style={{ transitionDelay: `${i * 18}ms` }}
        >
          {on && c.risk === 2 && <span className="absolute inset-0 animate-ping rounded-[1px] bg-gold/50 [animation-duration:2.4s]" />}
        </div>
      ))}
    </div>
  );
}

export function ControlCenter() {
  const { control } = useContent();
  const ref = useRef<HTMLDivElement>(null);
  const on = useInView(ref, { once: false, margin: "-20% 0px -20% 0px" });
  const seen = useInView(ref, { once: true, margin: "-20% 0px" });
  const { line, ch } = useTypedLog(control.log, on);

  return (
    <section className="relative bg-ink-deep py-28 md:py-40">
      <div className="wrap grid grid-cols-12 gap-x-8 gap-y-14">
        <div className="col-span-12 lg:col-span-4">
          <Reveal>
            <div className="label flex items-center gap-3 text-paper/50">
              <span className="h-px w-8 bg-gold" />
              {control.label}
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="h-section text-balance mt-8 !text-[clamp(30px,3.6vw,56px)] en:!text-[clamp(28px,2.8vw,44px)]">{control.title}</h2>
          </Reveal>
          <Reveal delay={0.14}>
            <p className="mt-6 text-[15px] leading-[1.9] text-paper/60">{control.lede}</p>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="label mt-10 inline-flex items-center gap-2 rounded-full border border-paper/15 px-3 py-1.5 text-[10px] text-paper/45">
              <span className="h-1 w-1 rounded-full bg-gold" />
              {control.disclaimer}
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.1} className="col-span-12 lg:col-span-8">
          <div ref={ref} className="relative overflow-hidden rounded-md border border-paper/10 bg-[#081426] shadow-[0_40px_120px_-40px_rgba(0,0,0,.8)]">
            <div className="flex items-center justify-between border-b border-paper/10 px-5 py-3">
              <div className="label flex items-center gap-3 text-[10px] text-paper/60">
                <svg viewBox="16 16 168 168" className="h-3.5 w-3.5">
                  <clipPath id="cc-m">
                    <circle cx="100" cy="100" r="84" />
                  </clipPath>
                  <g clipPath="url(#cc-m)">
                    <path fill="#C2A26B" d="M-24,135 C68,135 116,81 224,81 L224,-400 L-24,-400 Z" />
                    <path fill="#FAF8F4" d="M-24,141 C68,141 116,87 224,87 L224,600 L-24,600 Z" />
                  </g>
                </svg>
                Supply Chain Control Center
              </div>
              <div className="label flex items-center gap-4 text-[10px] text-paper/40">
                <span className="rounded-sm border border-gold/40 px-1.5 py-0.5 text-gold">DEMO</span>
                <span className="hidden sm:inline">Agent · online</span>
              </div>
            </div>

            <div className="grid grid-cols-2 border-b border-paper/10 md:grid-cols-4">
              {control.metrics.map((m, i) => (
                <div key={m.label} className={`px-4 py-4 md:px-5 md:py-5 ${i % 2 ? "border-l" : ""} ${i >= 2 ? "border-t md:border-t-0" : ""} border-paper/10 md:border-l md:first:border-l-0`}>
                  <div className="text-[12px] leading-snug text-paper/45">{m.label}</div>
                  <div className={`display mt-2 text-3xl md:text-4xl ${i === 3 ? "text-gold" : "text-paper"}`}>
                    <Counter to={m.value} play={seen} delay={0.2 + i * 0.12} />
                  </div>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 border-b border-paper/10 md:grid-cols-[1.6fr_1fr]">
              <div className="px-5 py-5">
                <div className="label mb-3 flex flex-wrap justify-between gap-x-4 gap-y-1 text-[9px] text-paper/40">
                  <span>{control.chart}</span>
                  <span className="text-gold">{control.threshold}</span>
                </div>
                <div className="h-32">
                  <RiskChart on={seen} />
                </div>
              </div>
              <div className="border-t border-paper/10 px-5 py-5 md:border-l md:border-t-0">
                <div className="label mb-3 text-[9px] text-paper/40">{control.grid}</div>
                <div className="h-32">
                  <SupplierGrid on={seen} />
                </div>
              </div>
            </div>

            <div className="px-4 py-5 font-mono text-[11.5px] leading-[1.9] md:px-5 md:text-[13px] md:leading-[2]">
              <div className="label mb-2 text-[9px] text-paper/35">Agent trace</div>
              {/* Every line is laid out from the start (untyped ones invisible) so the console never changes height. */}
              {control.log.map((l, i) => {
                const chars = Array.from(l.text);
                const shown = i < line ? l.text : i === line ? chars.slice(0, ch).join("") : "";
                return (
                  <div
                    key={i}
                    className={`flex gap-3 ${i > line ? "invisible" : ""} ${l.tag === "HUMAN" ? "-mx-2 my-1 rounded-sm bg-gold/10 px-2" : ""}`}
                  >
                    <span className="hidden text-paper/25 sm:inline">{l.t}</span>
                    <span className={`w-14 shrink-0 ${TAG_STYLE[l.tag]}`}>{l.tag}</span>
                    <span className={`relative ${l.tag === "CITE" ? "text-paper/45" : "text-paper/85"}`}>
                      <span className="invisible">{l.text}</span>
                      <span className="absolute inset-0">
                        {shown}
                        {i === line && <span className="caret ml-0.5 inline-block h-3.5 w-1.5 translate-y-0.5 bg-gold" />}
                      </span>
                    </span>
                  </div>
                );
              })}
              <div className={`flex gap-3 text-paper/40 ${line >= control.log.length ? "" : "invisible"}`}>
                <span className="hidden text-paper/25 sm:inline">--:--:--</span>
                <span className="w-14 shrink-0 text-gold">DONE</span>
                <span>
                  {control.done}
                  <span className="caret ml-1 inline-block h-3.5 w-1.5 translate-y-0.5 bg-gold" />
                </span>
              </div>
            </div>
            <div className="pointer-events-none absolute inset-0 bg-[repeating-linear-gradient(0deg,rgba(255,255,255,.015)_0px,rgba(255,255,255,.015)_1px,transparent_1px,transparent_3px)]" />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
