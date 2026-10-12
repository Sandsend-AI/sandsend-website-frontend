import { CtaButton } from "@/components/fx/Magnetic";
import { LineReveal, Reveal } from "@/components/fx/Reveal";
import { SandParticles } from "@/components/fx/SandParticles";
import { closing, site } from "@/content/site";

export function Closing() {
  const subject = encodeURIComponent("预约场景诊断");
  const body = encodeURIComponent("公司：\n行业：\n联系人 / 职位：\n希望讨论的业务问题：\n");
  const mailto = `mailto:${site.email}?subject=${subject}&body=${body}`;

  return (
    <section id="contact" className="relative min-h-[100svh] overflow-hidden bg-ink-deep">
      <div className="absolute inset-0">
        <SandParticles />
      </div>
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(70%_70%_at_15%_60%,rgba(6,15,29,.9),transparent_70%)]" />

      <div className="wrap relative flex min-h-[100svh] flex-col justify-end pb-20 pt-[52vh] md:justify-center md:py-32">
        <div className="max-w-2xl">
          <Reveal>
            <div className="label flex items-center gap-3 text-paper/50">
              <span className="h-px w-8 bg-gold" />
              {closing.label}
            </div>
          </Reveal>
          <h2 className="mt-8 text-[clamp(36px,5vw,80px)] font-medium leading-[1.12] tracking-[-0.035em]">
            <LineReveal lines={["你的公司，", "每天最贵的三个", <span key="g" className="text-gold">错误决策是什么？</span>]} />
          </h2>
          <Reveal delay={0.2}>
            <p className="mt-8 max-w-lg text-[15px] leading-[1.9] text-paper/60 md:text-base">{closing.lede}</p>
          </Reveal>
          <Reveal delay={0.3} className="mt-10 flex flex-wrap items-center gap-6">
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
