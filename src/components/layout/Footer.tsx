import { LATIN } from "@/components/brand/paths";
import { Mark } from "@/components/brand/Logo";
import { nav, practices, site } from "@/content/site";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative overflow-hidden border-t border-paper/10 bg-ink-deep pt-20">
      <div className="wrap">
        <div className="grid grid-cols-2 gap-y-12 md:grid-cols-12">
          <div className="col-span-2 md:col-span-5">
            <div className="flex items-center gap-4">
              <Mark className="h-10 w-10" />
              <div>
                <div className="text-lg font-medium">{site.name}</div>
                <div className="label text-[10px] text-paper/40">{site.nameEn}</div>
              </div>
            </div>
            <p className="mt-6 max-w-sm text-[14px] leading-[1.9] text-paper/50">
              企业 AI 工程公司。前线部署工程、智能体系统与模型工程，从一个值钱的业务问题开始。
            </p>
          </div>
          <div className="md:col-span-2 md:col-start-7">
            <div className="label mb-5 text-[10px] text-paper/35">业务</div>
            <ul className="space-y-3 text-[14px] text-paper/70">
              {practices.map((p) => (
                <li key={p.id}>
                  <a href="#practices" className="transition-colors hover:text-gold">
                    {p.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className="md:col-span-2">
            <div className="label mb-5 text-[10px] text-paper/35">导航</div>
            <ul className="space-y-3 text-[14px] text-paper/70">
              {nav.map((n) => (
                <li key={n.href}>
                  <a href={n.href} className="transition-colors hover:text-gold">
                    {n.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className="col-span-2 md:col-span-2">
            <div className="label mb-5 text-[10px] text-paper/35">联系</div>
            <a href={`mailto:${site.email}`} className="font-mono text-[13px] text-paper/70 transition-colors hover:text-gold">
              {site.email}
            </a>
          </div>
        </div>

        <svg viewBox="2 -71 500 75" className="mt-24 w-full" aria-hidden="true">
          <path fill="#FAF8F4" d={LATIN.d} />
        </svg>

        <div className="mt-10 flex flex-col gap-3 border-t border-paper/10 py-8 text-[12px] text-paper/40 md:flex-row md:items-center md:justify-between">
          <span>
            © {year} {site.name} {site.nameEn} · {site.group} 旗下运营公司
          </span>
          <span className="flex gap-6">
            {site.icp && (
              <a href="https://beian.miit.gov.cn/" target="_blank" rel="noreferrer" className="hover:text-paper/70">
                {site.icp}
              </a>
            )}
            <span className="label text-[10px]">Forward deployed · Since 2026</span>
          </span>
        </div>
      </div>
    </footer>
  );
}
