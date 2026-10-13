import { ogSize, renderOgImage } from "@/components/og/renderOgImage";
import { en } from "@/content/en";

export const alt = en.meta.ogTitle;
export const size = ogSize;
export const contentType = "image/png";

export default function Image() {
  return renderOgImage("en");
}
