import type { MetadataRoute } from "next";
import { content } from "@/content";
import { site } from "@/content/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const languages = Object.fromEntries(Object.values(content).map((t) => [t.htmlLang, new URL(t.home, site.url).href]));
  return Object.values(content).map((t) => ({
    url: new URL(t.home, site.url).href,
    changeFrequency: "monthly",
    priority: t.locale === "zh" ? 1 : 0.9,
    alternates: { languages },
  }));
}
