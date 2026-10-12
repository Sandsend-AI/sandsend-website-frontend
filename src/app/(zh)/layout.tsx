import type { Viewport } from "next";
import { Document } from "@/components/layout/Document";
import { buildMetadata } from "@/content";

export const metadata = buildMetadata("zh");

export const viewport: Viewport = {
  themeColor: "#060F1D",
  colorScheme: "dark",
};

export default function ZhLayout({ children }: { children: React.ReactNode }) {
  return <Document locale="zh">{children}</Document>;
}
