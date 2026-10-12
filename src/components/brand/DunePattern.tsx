import { useId } from "react";

const WAVE = (y: number) =>
  `M-160,${y} c53.3,0 106.7,-15 160,-15 c53.3,0 106.7,15 160,15 c53.3,0 106.7,-15 160,-15 c53.3,0 106.7,15 160,15`;

/** The brand dune-contour watermark (brand/build.py), tiled seamlessly at its native period. */
export function DunePattern({ tone = "light", className }: { tone?: "light" | "dark"; className?: string }) {
  const id = useId();
  const band = tone === "light" ? "#DFCDAA" : "#22375C";
  const hair = "#C2A26B";
  return (
    <svg className={`pointer-events-none absolute inset-0 h-full w-full ${className ?? ""}`} aria-hidden="true">
      <defs>
        <pattern id={id} width="320" height="190" patternUnits="userSpaceOnUse">
          <path d={WAVE(22)} fill="none" stroke={band} strokeWidth="20" />
          <path d={WAVE(54)} fill="none" stroke={hair} strokeWidth="1.2" strokeOpacity=".7" />
          <path d={WAVE(212)} fill="none" stroke={band} strokeWidth="20" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${id})`} />
    </svg>
  );
}
