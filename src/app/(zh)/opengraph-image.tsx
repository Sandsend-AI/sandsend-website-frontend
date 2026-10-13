import { ogSize, renderOgImage } from "@/components/og/renderOgImage";
import { zh } from "@/content/zh";

export const alt = zh.meta.ogTitle;
export const size = ogSize;
export const contentType = "image/png";

export default function Image() {
  return renderOgImage("zh");
}
