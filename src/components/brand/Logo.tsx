import { useId } from "react";
import { CJK, LATIN } from "./paths";

/** Ridge geometry from brand/build.py: one cubic with a single inflection; the
 *  6-unit gap between the two fills is the channel and must stay transparent. */
export const RIDGE_TOP = "M-24,135 C68,135 116,81 224,81 L224,-400 L-24,-400 Z";
export const RIDGE_BOTTOM = "M-24,141 C68,141 116,87 224,87 L224,600 L-24,600 Z";
export const RIDGE_LINE = "M-24,138 C68,138 116,84 224,84";

type Tone = "dark" | "light";

const fills = (tone: Tone) => ({
  top: "#C2A26B",
  bottom: tone === "dark" ? "#FAF8F4" : "#0B1A30",
  text: tone === "dark" ? "#FAF8F4" : "#0B1A30",
});

export function MarkGlyph({ tone = "dark" }: { tone?: Tone }) {
  const id = useId();
  const c = fills(tone);
  return (
    <>
      <clipPath id={id}>
        <circle cx="100" cy="100" r="84" />
      </clipPath>
      <g clipPath={`url(#${id})`}>
        <path fill={c.top} d={RIDGE_TOP} />
        <path fill={c.bottom} d={RIDGE_BOTTOM} />
      </g>
    </>
  );
}

export function Mark({ tone = "dark", className }: { tone?: Tone; className?: string }) {
  return (
    <svg viewBox="16 16 168 168" className={className} aria-hidden="true">
      <MarkGlyph tone={tone} />
    </svg>
  );
}

/** Horizontal lockup, cropped to ink bounds so it sits on a baseline grid. */
export function Logo({
  tone = "dark",
  className,
  showCjk = true,
}: {
  tone?: Tone;
  className?: string;
  showCjk?: boolean;
}) {
  const c = fills(tone);
  return (
    <svg viewBox="53 53 742 162" className={className} role="img" aria-label="沙尘彼岸 Sandsend">
      <g transform="translate(40,40) scale(0.94)">
        <MarkGlyph tone={tone} />
      </g>
      <path fill={c.text} transform={`translate(${LATIN.translate.join(",")})`} d={LATIN.d} />
      {showCjk && (
        <path fill={c.text} transform={`translate(${CJK.translate.join(",")})`} d={CJK.d} />
      )}
    </svg>
  );
}
