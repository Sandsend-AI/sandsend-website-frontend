import type { Metadata } from "next";
import { en } from "./en";
import { site } from "./site";
import { zh } from "./zh";

export type { Content, Practice } from "./zh";

export const content = { zh, en };
export type Locale = keyof typeof content;

export function buildMetadata(locale: Locale): Metadata {
  const t = content[locale];
  return {
    metadataBase: new URL(site.url),
    title: { default: t.meta.title, template: t.meta.template },
    description: t.meta.description,
    keywords: t.meta.keywords,
    alternates: {
      canonical: t.home,
      languages: { "zh-CN": zh.home, en: en.home, "x-default": zh.home },
    },
    openGraph: {
      type: "website",
      locale: t.ogLocale,
      url: t.home,
      siteName: `${site.name} ${site.nameEn}`,
      title: t.meta.ogTitle,
      description: t.meta.description,
    },
    twitter: { card: "summary_large_image" },
  };
}

/** schema.org Organization + WebSite graph for the locale's home page. */
export function buildJsonLd(locale: Locale) {
  const t = content[locale];
  const orgId = new URL("/#organization", site.url).href;
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": orgId,
        name: locale === "zh" ? site.name : site.nameEn,
        alternateName: locale === "zh" ? site.nameEn : site.name,
        url: site.url,
        logo: new URL("/brand/sandsend-logo@2x.png", site.url).href,
        email: site.email,
        description: t.meta.description,
        slogan: t.meta.ogTitle.split(" · ").pop(),
        knowsAbout: t.meta.keywords.filter((k) => k !== site.name && k !== site.nameEn),
        contactPoint: { "@type": "ContactPoint", contactType: "sales", email: site.email, availableLanguage: ["zh-CN", "en"] },
      },
      {
        "@type": "WebSite",
        "@id": new URL(`${t.home === "/" ? "" : t.home}/#website`, site.url).href,
        name: `${site.name} ${site.nameEn}`,
        url: new URL(t.home, site.url).href,
        inLanguage: t.htmlLang,
        publisher: { "@id": orgId },
      },
    ],
  };
}
