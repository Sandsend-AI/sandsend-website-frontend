import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono, Jost, Noto_Sans_SC } from "next/font/google";
import { Cursor } from "@/components/fx/Cursor";
import { Preloader } from "@/components/fx/Preloader";
import { SmoothScroll } from "@/components/fx/SmoothScroll";
import { site } from "@/content/site";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const jost = Jost({ subsets: ["latin"], variable: "--font-jost", display: "swap" });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono-face", display: "swap" });
const sc = Noto_Sans_SC({ subsets: ["latin"], weight: ["400", "500"], variable: "--font-sc", display: "swap", preload: false });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} ${site.nameEn} · 企业 AI 工程`,
    template: `%s · ${site.name} ${site.nameEn}`,
  },
  description: site.description,
  keywords: ["企业 AI", "AI 转型", "前线部署工程", "FDE", "AI Agent", "智能体", "私有化部署", "模型微调", "训练数据", "Sandsend", "沙尘彼岸"],
  openGraph: {
    type: "website",
    locale: "zh_CN",
    siteName: `${site.name} ${site.nameEn}`,
    title: `${site.name} ${site.nameEn} · 让 AI 抵达业务的彼岸`,
    description: site.description,
  },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = {
  themeColor: "#060F1D",
  colorScheme: "dark",
};

const introScript = `try{if(sessionStorage.getItem('ss-intro'))document.documentElement.classList.add('intro-seen')}catch(e){}`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="zh-CN"
      suppressHydrationWarning
      className={`${inter.variable} ${jost.variable} ${mono.variable} ${sc.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: introScript }} />
      </head>
      <body>
        <Preloader />
        <SmoothScroll />
        <Cursor />
        {children}
        <div className="grain" aria-hidden="true" />
      </body>
    </html>
  );
}
