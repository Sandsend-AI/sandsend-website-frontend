import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { CJK, LATIN } from "@/components/brand/paths";
import { RIDGE_BOTTOM, RIDGE_TOP } from "@/components/brand/Logo";
import { content, type Locale } from "@/content";
import { site } from "@/content/site";

export const ogSize = { width: 1200, height: 630 };

const INK_DEEP = "#060F1D";
const GOLD = "#C2A26B";
const PAPER = "#FAF8F4";
const INK_3 = "#6B819F";

const fontDir = join(process.cwd(), "src/assets/fonts");
const fonts = Promise.all([
  readFile(join(fontDir, "Jost-Medium.ttf")),
  readFile(join(fontDir, "NotoSansSC-Medium.ttf")),
]);

const logoSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="53 53 742 162"><clipPath id="c"><circle cx="100" cy="100" r="84"/></clipPath><g transform="translate(40,40) scale(0.94)"><g clip-path="url(#c)"><path fill="${GOLD}" d="${RIDGE_TOP}"/><path fill="${PAPER}" d="${RIDGE_BOTTOM}"/></g></g><path fill="${PAPER}" transform="translate(${LATIN.translate.join(",")})" d="${LATIN.d}"/><path fill="${PAPER}" transform="translate(${CJK.translate.join(",")})" d="${CJK.d}"/></svg>`;
const logoSrc = `data:image/svg+xml;base64,${Buffer.from(logoSvg).toString("base64")}`;

const dunes = Array.from({ length: 7 }, (_, i) => {
  const y = 520 + i * 26;
  return `<path d="M0,${y} C420,${y} 640,${y - 190} 1200,${y - 190}" fill="none" stroke="${GOLD}" stroke-width="${i === 0 ? 2 : 1}" stroke-opacity="${(0.55 - i * 0.07).toFixed(2)}"/>`;
}).join("");
const dunesSrc = `data:image/svg+xml;base64,${Buffer.from(
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 630">${dunes}</svg>`,
).toString("base64")}`;

export async function renderOgImage(locale: Locale) {
  const t = content[locale];
  const [jost, noto] = await fonts;
  const [firstLine, lead] = t.hero.titleLines;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px 72px",
          background: INK_DEEP,
          color: PAPER,
          fontFamily: "Jost, Noto Sans SC",
          position: "relative",
        }}
      >
        <img src={dunesSrc} width={1200} height={630} style={{ position: "absolute", left: 0, top: 0 }} alt="" />

        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <img src={logoSrc} height={56} width={Math.round((56 * 742) / 162)} alt="" />
          <div style={{ display: "flex", fontSize: 20, letterSpacing: "0.16em", color: GOLD, textTransform: "uppercase" }}>
            {t.hero.eyebrow}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", fontSize: locale === "zh" ? 104 : 92, lineHeight: 1.12, letterSpacing: "-0.03em" }}>
          <div style={{ display: "flex" }}>{firstLine}</div>
          <div style={{ display: "flex", whiteSpace: "pre" }}>
            <span>{lead}</span>
            <span style={{ color: GOLD }}>{t.hero.titleAccent}</span>
            <span>{t.hero.titleEnd}</span>
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", fontSize: 26 }}>
          <div style={{ display: "flex", color: INK_3 }}>{t.practices.map((p) => p.name).join("  ·  ")}</div>
          <div style={{ display: "flex", color: PAPER }}>{new URL(site.url).host}</div>
        </div>
      </div>
    ),
    {
      ...ogSize,
      fonts: [
        { name: "Jost", data: jost, weight: 500, style: "normal" },
        { name: "Noto Sans SC", data: noto, weight: 500, style: "normal" },
      ],
    },
  );
}
