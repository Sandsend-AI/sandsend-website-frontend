"use client";

import { useState } from "react";
import { Reveal } from "@/components/fx/Reveal";
import { sectors } from "@/content/site";

export function Sectors() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="sectors" className="relative bg-ink py-28 md:py-40">
      <div className="wrap">
        <div className="grid grid-cols-12 items-end gap-y-8">
          <div className="col-span-12 lg:col-span-7">
            <Reveal>
              <div className="label flex items-center gap-3 text-paper/50">
                <span className="h-px w-8 bg-gold" />
                {sectors.label}
              </div>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 className="h-section text-balance mt-8">{sectors.title}</h2>
            </Reveal>
          </div>
          <Reveal delay={0.14} className="col-span-12 lg:col-span-4 lg:col-start-9">
            <p className="text-[15px] leading-[1.9] text-paper/60">{sectors.lede}</p>
          </Reveal>
        </div>

        <ul className="mt-20 border-t border-paper/10">
          {sectors.list.map((s, i) => {
            const on = open === i;
            return (
              <li
                key={s.en}
                className="group relative border-b border-paper/10"
                onPointerEnter={(e) => e.pointerType === "mouse" && setOpen(i)}
              >
                <button
                  className="relative grid w-full grid-cols-[48px_1fr_auto] items-baseline gap-x-6 py-8 text-left md:grid-cols-[80px_1.3fr_1fr_220px] md:py-10"
                  onClick={() => setOpen(on ? null : i)}
                  aria-expanded={on}
                >
                  <span className={`label transition-colors duration-500 ${on ? "text-gold" : "text-paper/35"}`}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span
                    className={`text-[clamp(30px,4.4vw,64px)] font-medium leading-none tracking-[-0.03em] transition-all duration-700 ease-[var(--ease-out-expo)] ${
                      on ? "translate-x-3 text-paper" : "text-paper/45"
                    }`}
                  >
                    {s.name}
                  </span>
                  <span className="hidden text-[14px] text-paper/45 md:block">{s.sub}</span>
                  <span className={`label hidden text-right transition-colors duration-500 sm:block ${on ? "text-gold" : "text-paper/30"}`}>{s.en}</span>
                </button>
                <div
                  className="grid transition-[grid-template-rows] duration-700 ease-[var(--ease-out-expo)]"
                  style={{ gridTemplateRows: on ? "1fr" : "0fr" }}
                >
                  <div className="overflow-hidden">
                    <div className="grid grid-cols-1 gap-3 pb-10 md:grid-cols-[80px_1fr] md:gap-x-6">
                      <span />
                      <div>
                        <div className="mb-4 text-[13px] text-paper/45 md:hidden">{s.sub}</div>
                        <div className="label mb-4 text-[10px] text-paper/35">典型场景</div>
                        <div className="flex flex-wrap gap-2">
                          {s.cases.map((c, k) => (
                            <span
                              key={c}
                              className="rounded-full border border-gold/30 bg-gold/[0.06] px-4 py-2 text-[14px] text-gold-soft transition-all duration-700"
                              style={{
                                transitionDelay: on ? `${150 + k * 60}ms` : "0ms",
                                opacity: on ? 1 : 0,
                                transform: on ? "none" : "translateY(10px)",
                              }}
                            >
                              {c}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <span
                  className={`absolute bottom-[-1px] left-0 h-px bg-gold transition-all duration-1000 ease-[var(--ease-out-expo)] ${on ? "w-full" : "w-0"}`}
                />
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
