#!/usr/bin/env node
// Vendors the fonts used by the Open Graph images into src/assets/fonts/.
//
// next/og (Satori) needs TTF/OTF/WOFF and cannot reach the network reliably at
// build time, so we commit subsets covering every character in src/content/.
// Re-run after changing copy: `npm run og:fonts` (honours http(s)_proxy via curl).

import { execFileSync } from "node:child_process";
import { mkdirSync, readFileSync, readdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const root = join(import.meta.dirname, "..");
const contentDir = join(root, "src/content");
const outDir = join(root, "src/assets/fonts");

const faces = [
  { family: "Jost", weight: 500, file: "Jost-Medium.ttf" },
  { family: "Noto Sans SC", weight: 500, file: "NotoSansSC-Medium.ttf" },
];

const text = readdirSync(contentDir)
  .filter((f) => f.endsWith(".ts"))
  .map((f) => readFileSync(join(contentDir, f), "utf8"))
  .join("");
const printableAscii = Array.from({ length: 95 }, (_, i) => String.fromCharCode(32 + i)).join("");
const chars = [...new Set(printableAscii + text.replace(/\s/g, ""))].sort().join("");

const curl = (url) => execFileSync("curl", ["-fsSL", "--max-time", "60", url], { maxBuffer: 64 << 20 });

mkdirSync(outDir, { recursive: true });
for (const face of faces) {
  const css = curl(
    `https://fonts.googleapis.com/css2?family=${encodeURIComponent(face.family)}:wght@${face.weight}&text=${encodeURIComponent(chars)}`,
  ).toString();
  const src = css.match(/src:\s*url\(([^)]+)\)\s*format\('truetype'\)/)?.[1];
  if (!src) throw new Error(`No TTF source for ${face.family}:\n${css}`);
  const font = curl(src);
  writeFileSync(join(outDir, face.file), font);
  console.log(`${face.file}  ${(font.length / 1024).toFixed(0)} KB  ${chars.length} chars`);
}
