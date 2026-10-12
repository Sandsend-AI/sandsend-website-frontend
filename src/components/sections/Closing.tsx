"use client";

import { CtaButton } from "@/components/fx/Magnetic";
import { LineReveal, Reveal } from "@/components/fx/Reveal";
import { SandParticles } from "@/components/fx/SandParticles";
import { useContent } from "@/content/ContentProvider";
import { site } from "@/content/site";

export function Closing() {
  const { closing } = useContent();
  const subject = encodeURIComponent(closing.mailSubject);
  const body = encodeURIComponent(closing.mailBody);
  const mailto = `mailto:${site.email}?subject=${subject}&body=${body}`;

  return (
    <section id="contact" className="relative min-h-[100svh] overflow-hidden bg-ink-deep">
      <div className="absolute inset-0">
        <SandParticles />
      </div>
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(70%_70%_at_15%_60%,rgba(6,15,29,.9),transparent_70%)] max-md:bg-[linear-gradient(to_bottom,transparent_30%,rgba(6,15,29,.85)_60%)]" />

      <div className="wrap relative flex min-h-[100svh] flex-col justify-end pb-16 pt-[min(52vh,440px)] md:justify-center md:py-32">
        <div className="max-w-2xl en:max-w-3xl">
          <Reveal>
            <div className="label flex items-center gap-3 text-paper/50">
              <span className="h-px w-8 bg-gold" />
              {closing.label}
            </div>
          </Reveal>
          <h2 className="mt-6 text-[clamp(34px,5vw,80px)] font-medium leading-[1.12] tracking-[-0.035em] md:mt-8 en:text-[clamp(32px,4.2vw,64px)] en:leading-[1.08]">
            <LineReveal
              lines={[
                ...closing.questionLines,
                <span key="accent" className="text-gold">
                  {closing.questionAccent}
                </span>,
              ]}
            />
          </h2>
          <Reveal delay={0.2}>
            <p className="mt-6 max-w-lg text-[15px] leading-[1.9] text-paper/60 md:mt-8 md:text-base">{closing.lede}</p>
          </Reveal>
          <Reveal delay={0.3} className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-5 md:mt-10">
            <CtaButton href={mailto} cursor="Write">
              {closing.cta}
            </CtaButton>
            <a href={`mailto:${site.email}`} className="group font-mono text-[14px] text-paper/70 transition-colors hover:text-gold">
              {site.email}
              <span className="mt-1 block h-px w-full origin-left scale-x-0 bg-gold transition-transform duration-500 group-hover:scale-x-100" />
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
