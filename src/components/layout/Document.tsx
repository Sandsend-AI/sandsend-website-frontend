import { Inter, JetBrains_Mono, Jost, Noto_Sans_SC } from "next/font/google";
import { Cursor } from "@/components/fx/Cursor";
import { Preloader } from "@/components/fx/Preloader";
import { SmoothScroll } from "@/components/fx/SmoothScroll";
import { buildJsonLd, content, type Locale } from "@/content";
import { ContentProvider } from "@/content/ContentProvider";
import "@/app/globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const jost = Jost({ subsets: ["latin"], variable: "--font-jost", display: "swap" });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono-face", display: "swap" });
const sc = Noto_Sans_SC({ subsets: ["latin"], weight: ["400", "500"], variable: "--font-sc", display: "swap", preload: false });

const introScript = `try{if(sessionStorage.getItem('ss-intro'))document.documentElement.classList.add('intro-seen')}catch(e){}`;

/** Shared <html> shell for each locale's root layout. */
export function Document({ locale, children }: { locale: Locale; children: React.ReactNode }) {
  const t = content[locale];
  return (
    <html
      lang={t.htmlLang}
      suppressHydrationWarning
      className={`${inter.variable} ${jost.variable} ${mono.variable} ${sc.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: introScript }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(buildJsonLd(locale)).replace(/</g, "\\u003c") }}
        />
      </head>
      <body>
        <ContentProvider value={t}>
          <Preloader />
          <SmoothScroll />
          <Cursor />
          {children}
        </ContentProvider>
        <div className="grain" aria-hidden="true" />
      </body>
    </html>
  );
}
