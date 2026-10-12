"use client";

import { useEffect, useRef } from "react";
import { RIDGE_BOTTOM, RIDGE_TOP } from "@/components/brand/Logo";

type P = {
  hx: number;
  hy: number;
  x: number;
  y: number;
  ox: number;
  oy: number;
  x0: number;
  y0: number;
  sp: number;
  amp: number;
  ph: number;
  delay: number;
  c: 0 | 1 | 2;
  s: number;
};

const COLORS = ["rgba(194,162,107,1)", "rgba(250,248,244,0.86)", "rgba(223,205,170,0.28)"];

/**
 * Sand drifting along sine streamlines (the brand's dune contour, set in
 * motion) gathers into the Sandsend mark as the section scrolls into view.
 * Targets are sampled from the real mark geometry rendered offscreen, so the
 * channel between gold and paper stays open in particle form too.
 */
export function SandParticles({ className }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current!;
    const ctx = canvas.getContext("2d")!;
    const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
    let W = 0,
      H = 0,
      dpr = 1,
      parts: P[] = [];

    const build = () => {
      const r = canvas.getBoundingClientRect();
      W = r.width;
      H = r.height;
      dpr = Math.min(devicePixelRatio || 1, 2);
      canvas.width = W * dpr;
      canvas.height = H * dpr;

      const mobile = W < 768;
      // Matches the top padding Closing reserves above its copy on small screens.
      const room = Math.min(innerHeight * 0.52, 440);
      const D = mobile ? Math.min(W * 0.72, room * 0.78) : Math.min(H * 0.66, W * 0.4);
      const cx = mobile ? W * 0.5 : W * 0.72;
      const cy = mobile ? room * 0.52 : H * 0.5;
      const target = mobile ? 2200 : 5400;

      const off = document.createElement("canvas");
      const S = Math.ceil(D);
      off.width = S;
      off.height = S;
      const o = off.getContext("2d")!;
      const k = S / 168;
      o.setTransform(k, 0, 0, k, -16 * k, -16 * k);
      o.beginPath();
      o.arc(100, 100, 84, 0, Math.PI * 2);
      o.clip();
      o.fillStyle = "#C2A26B";
      o.fill(new Path2D(RIDGE_TOP));
      o.fillStyle = "#FAF8F4";
      o.fill(new Path2D(RIDGE_BOTTOM));
      const img = o.getImageData(0, 0, S, S).data;

      const area = Math.PI * (S / 2) ** 2;
      const step = Math.max(3, Math.sqrt(area / target));
      const homes: { x: number; y: number; c: 0 | 1 }[] = [];
      for (let y = 0; y < S; y += step) {
        for (let x = 0; x < S; x += step) {
          const jx = x + (Math.random() - 0.5) * step * 0.5;
          const jy = y + (Math.random() - 0.5) * step * 0.5;
          const ix = Math.min(S - 1, Math.max(0, Math.round(jx)));
          const iy = Math.min(S - 1, Math.max(0, Math.round(jy)));
          const i = (iy * S + ix) * 4;
          if (img[i + 3] < 200) continue;
          homes.push({ x: cx - S / 2 + jx, y: cy - S / 2 + jy, c: img[i + 2] > 180 ? 1 : 0 });
        }
      }
      const dust = mobile ? 300 : 700;
      parts = [];
      const mk = (hx: number, hy: number, c: 0 | 1 | 2): P => {
        const x0 = Math.random() * (W + 200) - 100;
        const y0 = Math.random() * H;
        return {
          hx,
          hy,
          x: x0,
          y: y0,
          ox: 0,
          oy: 0,
          x0,
          y0,
          sp: 18 + Math.random() * 46,
          amp: 6 + Math.random() * 26,
          ph: Math.random() * Math.PI * 2,
          delay: Math.random() * 0.4 + (c === 1 ? 0.05 : 0) + ((hy - (cy - S / 2)) / S) * 0.15,
          c,
          s: c === 2 ? 1 + Math.random() : 1.5 + Math.random() * 1.1,
        };
      };
      homes.forEach((h) => parts.push(mk(h.x, h.y, h.c)));
      for (let i = 0; i < dust; i++) parts.push(mk(0, 0, 2));
    };
    build();
    let rt = 0;
    const ro = new ResizeObserver(() => {
      clearTimeout(rt);
      rt = window.setTimeout(build, 150);
    });
    ro.observe(canvas);

    const mouse = { x: -9999, y: -9999 };
    const onMove = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      mouse.x = e.clientX - r.left;
      mouse.y = e.clientY - r.top;
    };
    const onLeave = () => {
      mouse.x = mouse.y = -9999;
    };
    const onUp = (e: PointerEvent) => e.pointerType !== "mouse" && onLeave();
    addEventListener("pointermove", onMove, { passive: true });
    addEventListener("pointerup", onUp, { passive: true });
    addEventListener("pointercancel", onUp, { passive: true });
    document.addEventListener("pointerleave", onLeave);

    let visible = false;
    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting), { rootMargin: "200px" });
    io.observe(canvas);

    let raf = 0,
      assemble = 0;
    const t0 = performance.now();
    const ease = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

    const frame = (now: number) => {
      raf = requestAnimationFrame(frame);
      if (!visible || document.hidden) return;
      const t = (now - t0) / 1000;
      const r = canvas.getBoundingClientRect();
      const vh = innerHeight;
      const goal = reduce ? 1 : Math.max(0, Math.min(1, (vh * 0.9 - r.top) / (vh * 0.65)));
      assemble += (goal - assemble) * 0.05;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, W, H);
      const span = W + 200;
      const R = 90;

      for (let pass = 0; pass < 3; pass++) {
        ctx.fillStyle = COLORS[pass];
        ctx.beginPath();
        for (let i = 0; i < parts.length; i++) {
          const p = parts[i];
          if (p.c !== pass) continue;
          const sx = ((((p.x0 + p.sp * t) % span) + span) % span) - 100;
          const sy = p.y0 + Math.sin(sx * 0.006 + p.ph + t * 0.3) * p.amp;
          let tx = sx,
            ty = sy;
          if (p.c !== 2) {
            const a = ease(Math.max(0, Math.min(1, (assemble - p.delay) / 0.55)));
            const bx = p.hx + Math.sin(t * 1.3 + p.ph) * 0.7;
            const by = p.hy + Math.cos(t * 1.1 + p.ph) * 0.7;
            tx = sx + (bx - sx) * a;
            ty = sy + (by - sy) * a;
          }
          if (Math.abs(tx - p.x) > W * 0.5) p.x = tx;
          p.x += (tx - p.x) * 0.09;
          p.y += (ty - p.y) * 0.09;

          const dx = p.x + p.ox - mouse.x;
          const dy = p.y + p.oy - mouse.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < R * R) {
            const d = Math.sqrt(d2) || 1;
            const f = (1 - d / R) * 5;
            p.ox += (dx / d) * f;
            p.oy += (dy / d) * f;
          }
          p.ox *= 0.92;
          p.oy *= 0.92;
          ctx.rect(p.x + p.ox, p.y + p.oy, p.s, p.s);
        }
        ctx.fill();
      }
    };
    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      clearTimeout(rt);
      removeEventListener("pointermove", onMove);
      removeEventListener("pointerup", onUp);
      removeEventListener("pointercancel", onUp);
      document.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return <canvas ref={ref} className={`block h-full w-full ${className ?? ""}`} aria-hidden="true" />;
}
