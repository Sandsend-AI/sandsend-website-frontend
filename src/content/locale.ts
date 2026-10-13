export const LOCALE_COOKIE = "locale";

/** Pins the visitor's explicit language choice so the root no longer follows Accept-Language. */
export function rememberLocale(locale: "zh" | "en") {
  document.cookie = `${LOCALE_COOKIE}=${locale}; path=/; max-age=31536000; samesite=lax`;
}
