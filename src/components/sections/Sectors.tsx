"use client";

import { useState } from "react";
import { Reveal } from "@/components/fx/Reveal";
import { useContent } from "@/content/ContentProvider";

export function Sectors() {
  const { sectors } = useContent();
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

        <ul className="mt-14 border-t border-paper/10 md:mt-20">
          {sectors.list.map((s, i) => {
            const on = open === i;
            return (
              <li
                key={s.name}
                className="group relative border-b border-paper/10"
                onPointerEnter={(e) => e.pointerType === "mouse" && setOpen(i)}
              >
                <button
                  className="relative grid w-full grid-cols-[36px_1fr_auto] items-baseline gap-x-4 py-7 text-left sm:gap-x-6 md:grid-cols-[80px_1.3fr_1fr_220px] md:py-10"
                  onClick={() => setOpen(on ? null : i)}
                  aria-expanded={on}
                >
                  <span className={`label transition-colors duration-500 ${on ? "text-gold" : "text-paper/35"}`}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span
                    className={`text-[clamp(28px,4.4vw,64px)] font-medium leading-none tracking-[-0.03em] transition-all duration-700 ease-[var(--ease-out-expo)] en:text-[clamp(26px,3.6vw,52px)] en:leading-[1.05] ${
                      on ? "translate-x-2 text-paper md:translate-x-3" : "text-paper/45"
                    }`}
                  >
                    {s.name}
                  </span>
                  <span className="hidden text-[14px] text-paper/45 md:block">{s.sub}</span>
                  <span className={`label hidden text-right transition-colors duration-500 sm:block ${on ? "text-gold" : "text-paper/30"}`}>{s.alt}</span>
                </button>
                <div
                  className="grid transition-[grid-template-rows] duration-700 ease-[var(--ease-out-expo)]"
                  style={{ gridTemplateRows: on ? "1fr" : "0fr" }}
                >
                  <div className="overflow-hidden">
                    <div className="grid grid-cols-1 gap-3 pb-8 md:grid-cols-[80px_1fr] md:gap-x-6 md:pb-10">
                      <span className="hidden md:block" />
                      <div>
                        <div className="mb-4 text-[13px] leading-relaxed text-paper/45 md:hidden">{s.sub}</div>
                        <div className="label mb-4 text-[10px] text-paper/35">{sectors.cases}</div>
                        <div className="flex flex-wrap gap-2">
                          {s.cases.map((c, k) => (
                            <span
                              key={c}
                              className="rounded-full border border-gold/30 bg-gold/[0.06] px-3.5 py-1.5 text-[13px] text-gold-soft transition-all duration-700 md:px-4 md:py-2 md:text-[14px]"
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
