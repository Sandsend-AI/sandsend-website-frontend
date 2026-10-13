"use client";

import { useEffect, useState } from "react";
import { LATIN } from "@/components/brand/paths";
import { Mark } from "@/components/brand/Logo";
import { useContent } from "@/content/ContentProvider";
import { rememberLocale } from "@/content/locale";
import { site } from "@/content/site";

/** Inlined at build so server HTML and hydration agree; the effect then catches up after New Year. */
const BUILD_YEAR = Number(process.env.BUILD_YEAR);

export function Footer() {
  const t = useContent();
  const [year, setYear] = useState(BUILD_YEAR);
  useEffect(() => setYear(new Date().getFullYear()), []);
  return (
    <footer className="relative overflow-hidden border-t border-paper/10 bg-ink-deep pt-16 md:pt-20">
      <div className="wrap">
        <div className="grid grid-cols-2 gap-x-6 gap-y-12 md:grid-cols-12">
          <div className="col-span-2 md:col-span-5">
            <div className="flex items-center gap-4">
              <Mark className="h-10 w-10" />
              <div>
                <div className="text-lg font-medium">{t.brand.name}</div>
                <div className="label text-[10px] text-paper/40">{t.brand.alt}</div>
              </div>
            </div>
            <p className="mt-6 max-w-sm text-[14px] leading-[1.9] text-paper/50">{t.footer.blurb}</p>
          </div>
          <div className="md:col-span-2 md:col-start-7">
            <div className="label mb-5 text-[10px] text-paper/35">{t.footer.practices}</div>
            <ul className="space-y-3 text-[14px] text-paper/70">
              {t.practices.map((p) => (
                <li key={p.id}>
                  <a href="#practices" className="transition-colors hover:text-gold">
                    {p.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className="md:col-span-2">
            <div className="label mb-5 text-[10px] text-paper/35">{t.footer.nav}</div>
            <ul className="space-y-3 text-[14px] text-paper/70">
              {t.nav.map((n) => (
                <li key={n.href}>
                  <a href={n.href} className="transition-colors hover:text-gold">
                    {n.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className="col-span-2 md:col-span-2">
            <div className="label mb-5 text-[10px] text-paper/35">{t.footer.contact}</div>
            <a href={`mailto:${site.email}`} className="break-all font-mono text-[13px] text-paper/70 transition-colors hover:text-gold">
              {site.email}
            </a>
            <div className="mt-3 text-[13px] text-paper/50">{t.footer.hq}</div>
            <a href={t.ui.lang.href} hrefLang={t.ui.lang.hrefLang} onClick={() => rememberLocale(t.ui.lang.locale)} className="label mt-4 block text-[10px] text-paper/40 transition-colors hover:text-gold">
              {t.ui.lang.aria} →
            </a>
          </div>
        </div>

        <svg viewBox="2 -71 500 75" className="mt-16 w-full md:mt-24" aria-hidden="true">
          <path fill="#FAF8F4" d={LATIN.d} />
        </svg>

        <div className="mt-10 flex flex-col gap-3 border-t border-paper/10 py-8 text-[12px] text-paper/40 md:flex-row md:items-center md:justify-between">
          <span>
            © {year} {t.footer.legal}
          </span>
          <span className="flex flex-wrap gap-x-6 gap-y-2">
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
