"use client";

import { motion, useMotionValue, useSpring } from "motion/react";
import { useRef, type ReactNode } from "react";

export function Magnetic({
  children,
  strength = 0.35,
  className,
}: {
  children: ReactNode;
  strength?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useSpring(useMotionValue(0), { stiffness: 180, damping: 16, mass: 0.4 });
  const y = useSpring(useMotionValue(0), { stiffness: 180, damping: 16, mass: 0.4 });

  return (
    <motion.div
      ref={ref}
      className={`inline-block ${className ?? ""}`}
      style={{ x, y }}
      onPointerMove={(e) => {
        if (e.pointerType !== "mouse") return;
        const r = ref.current!.getBoundingClientRect();
        x.set((e.clientX - (r.left + r.width / 2)) * strength);
        y.set((e.clientY - (r.top + r.height / 2)) * strength);
      }}
      onPointerLeave={() => {
        x.set(0);
        y.set(0);
      }}
    >
      {children}
    </motion.div>
  );
}

export function CtaButton({
  href,
  children,
  tone = "gold",
  cursor,
}: {
  href: string;
  children: ReactNode;
  tone?: "gold" | "ghost" | "ink";
  cursor?: string;
}) {
  const styles = {
    gold: "bg-gold text-ink",
    ghost: "border border-paper/25 text-paper",
    ink: "bg-ink text-paper",
  }[tone];
  const fill = tone === "gold" ? "bg-paper" : tone === "ink" ? "bg-gold" : "bg-gold";
  return (
    <Magnetic>
      <a
        href={href}
        data-cursor={cursor}
        className={`group relative inline-flex h-14 items-center gap-4 overflow-hidden rounded-full pl-7 pr-2 text-[15px] font-medium tracking-wide ${styles}`}
      >
        <span
          className={`absolute inset-0 origin-bottom scale-y-0 rounded-full ${fill} transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:scale-y-100`}
        />
        <span className="relative z-10 transition-colors duration-500 group-hover:text-ink">{children}</span>
        <span
          className={`relative z-10 flex h-10 w-10 items-center justify-center rounded-full transition-colors duration-500 ${
            tone === "gold" ? "bg-ink text-gold" : "bg-gold text-ink"
          } group-hover:bg-ink group-hover:text-gold`}
        >
          <svg viewBox="0 0 16 16" className="h-3.5 w-3.5 transition-transform duration-500 group-hover:-rotate-45">
            <path d="M2 8h11M9 4l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.4" />
          </svg>
        </span>
      </a>
    </Magnetic>
  );
}
