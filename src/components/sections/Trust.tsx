"use client";

import { Reveal } from "@/components/fx/Reveal";
import { useContent } from "@/content/ContentProvider";

const GLYPHS = [
  // private deployment: a sealed perimeter
  <g key="0">
    <rect x="6" y="6" width="28" height="28" />
    <rect x="13" y="13" width="14" height="14" />
  </g>,
  // read-only: an arrow that only enters
  <g key="1">
    <path d="M4 20h22M20 14l6 6-6 6" />
    <path d="M32 6v28" />
  </g>,
  // traceable: a chain of evidence
  <g key="2">
    <circle cx="9" cy="20" r="4" />
    <circle cx="20" cy="20" r="4" />
    <circle cx="31" cy="20" r="4" />
    <path d="M13 20h3M24 20h3" />
  </g>,
  // human in the loop
  <g key="3">
    <circle cx="20" cy="13" r="5" />
    <path d="M9 34c0-6 5-10 11-10s11 4 11 10" />
  </g>,
  // audit trail
  <g key="4">
    <path d="M8 10h24M8 17h24M8 24h16M8 31h10" />
  </g>,
  // assets: the mark itself
  <g key="5">
    <circle cx="20" cy="20" r="14" />
    <path d="M6 24c9 0 13-8 28-8" />
  </g>,
];

export function Trust() {
  const { trust } = useContent();
  return (
    <section id="trust" data-theme="light" className="relative bg-paper pb-28 text-ink md:pb-40">
      <div className="wrap">
        <div className="border-t border-ink/10 pt-20 md:pt-28">
          <div className="grid grid-cols-12 gap-y-8">
            <div className="col-span-12 lg:col-span-4">
              <Reveal>
                <div className="label flex items-center gap-3 text-muted">
                  <span className="h-px w-8 bg-gold" />
                  {trust.label}
                </div>
              </Reveal>
            </div>
            <div className="col-span-12 lg:col-span-8">
              <Reveal delay={0.06}>
                <h2 className="h-section text-balance whitespace-pre-line !text-[clamp(28px,3.8vw,60px)] en:!text-[clamp(28px,3.2vw,48px)]">{trust.title}</h2>
              </Reveal>
              <Reveal delay={0.12}>
                <p className="mt-6 text-[15px] leading-[1.9] text-ink/60">{trust.lede}</p>
              </Reveal>
            </div>
          </div>

          <div className="mt-16 grid grid-cols-1 border-l border-t border-ink/10 sm:grid-cols-2 lg:grid-cols-3">
            {trust.items.map((it, i) => (
              <Reveal
                key={it.k}
                delay={(i % 3) * 0.08}
                className="group relative overflow-hidden border-b border-r border-ink/10 p-7 md:p-10"
              >
                <span className="absolute inset-0 origin-bottom scale-y-0 bg-ink transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:scale-y-100" />
                <div className="relative">
                  <div className="flex items-start justify-between">
                    <svg
                      viewBox="0 0 40 40"
                      className="h-10 w-10 fill-none stroke-gold"
                      strokeWidth="1.2"
                    >
                      {GLYPHS[i]}
                    </svg>
                    <span className="label text-[10px] text-muted transition-colors duration-500 group-hover:text-paper/40">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <h3 className="mt-8 text-2xl font-medium md:mt-10 tracking-tight transition-colors duration-500 group-hover:text-paper">{it.k}</h3>
                  <p className="mt-3 text-[14.5px] leading-[1.85] text-ink/60 transition-colors duration-500 group-hover:text-paper/60">{it.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
