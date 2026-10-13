import { NextResponse, type NextRequest } from "next/server";
import { LOCALE_COOKIE } from "@/content/locale";

/** Highest-weighted of zh / en in an Accept-Language header, or null if neither is listed. */
function preferred(header: string): "zh" | "en" | null {
  let best: { tag: "zh" | "en"; q: number } | null = null;
  for (const part of header.split(",")) {
    const [range, ...params] = part.trim().toLowerCase().split(";");
    const tag = range.split("-")[0];
    if (tag !== "zh" && tag !== "en") continue;
    const qParam = params.find((p) => p.trim().startsWith("q="));
    const q = qParam ? Number(qParam.trim().slice(2)) : 1;
    if (!Number.isNaN(q) && (!best || q > best.q)) best = { tag, q };
  }
  return best?.tag ?? null;
}

export function proxy(request: NextRequest) {
  const chosen = request.cookies.get(LOCALE_COOKIE)?.value;
  const header = request.headers.get("accept-language");

  // Crawlers usually send no Accept-Language; they keep the x-default (zh) page.
  const wantsEn = chosen ? chosen === "en" : !!header && preferred(header) !== "zh";

  if (!wantsEn) return NextResponse.next();

  const url = request.nextUrl.clone();
  url.pathname = "/en";
  const res = NextResponse.redirect(url, 307);
  res.headers.set("Vary", "Accept-Language, Cookie");
  res.headers.set("Cache-Control", "private, no-store");
  return res;
}

export const config = {
  matcher: [{ source: "/", missing: [{ type: "header", key: "next-router-prefetch" }] }],
};
