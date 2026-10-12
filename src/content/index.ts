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
