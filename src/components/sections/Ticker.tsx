import { ticker } from "@/content/site";

export function Ticker() {
  const row = [...ticker, ...ticker];
  return (
    <div className="relative overflow-hidden border-y border-paper/[0.08] bg-ink-deep py-5" aria-hidden="true">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-32 bg-gradient-to-r from-ink-deep to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-32 bg-gradient-to-l from-ink-deep to-transparent" />
      <div className="marquee flex w-max items-center">
        {row.map((t, i) => (
          <span key={i} className="label flex items-center whitespace-nowrap text-[12px] text-paper/55">
            <span className="px-8">{t}</span>
            <svg viewBox="0 0 10 10" className="h-2 w-2">
              <circle cx="5" cy="5" r="4.2" fill="none" stroke="#C2A26B" strokeWidth="0.9" />
              <path d="M0.8 6.2 C3.5 6.2 5.2 3.8 9.2 3.8" fill="none" stroke="#C2A26B" strokeWidth="0.9" />
            </svg>
          </span>
        ))}
      </div>
    </div>
  );
}
