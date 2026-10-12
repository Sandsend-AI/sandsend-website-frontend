"use client";

import { useEffect, useRef, useState } from "react";

const STAGES = ["DATA", "SFT", "LoRA", "DPO", "EVAL", "SERVE"];
const COLS = 28;
const ROWS = 16;

/**
 * A weight matrix that starts as noise and resolves into structure as training
 * runs, beside a loss curve that draws in step. It is an illustration of the
 * process, not a readout, so it carries no numbers that look like results.
 */
export function ModelViz({ active }: { active: boolean }) {
  const canvas = useRef<HTMLCanvasElement>(null);
  const curve = useRef<SVGPathElement>(null);
  const [stage, setStage] = useState(0);

  useEffect(() => {
    if (!active) return;
    const c = canvas.current!;
    const ctx = c.getContext("2d")!;
    const dpr = Math.min(devicePixelRatio || 1, 2);
    const resize = () => {
      const r = c.getBoundingClientRect();
      c.width = r.width * dpr;
      c.height = r.height * dpr;
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(c);

    const seed = Array.from({ length: COLS * ROWS }, () => Math.random());
    const structure = Array.from({ length: COLS * ROWS }, (_, k) => {
      const x = k % COLS,
        y = Math.floor(k / COLS);
      return 0.5 + 0.5 * Math.sin(x * 0.55 + Math.sin(y * 0.7) * 1.8) * Math.cos(y * 0.35 - x * 0.12);
    });

    const CYCLE = 9000;
    const t0 = performance.now();
    let raf = 0;
    const draw = (now: number) => {
      raf = requestAnimationFrame(draw);
      const p = ((now - t0) % CYCLE) / CYCLE;
      const train = Math.min(1, p / 0.8);
      setStage(Math.min(STAGES.length - 1, Math.floor(train * STAGES.length)));

      const w = c.width,
        h = c.height;
      ctx.clearRect(0, 0, w, h);
      const gap = 2 * dpr;
      const cw = (w - gap * (COLS - 1)) / COLS;
      const ch = (h - gap * (ROWS - 1)) / ROWS;
      const sweep = train * (COLS + 6) - 3;
      for (let y = 0; y < ROWS; y++) {
        for (let x = 0; x < COLS; x++) {
          const k = y * COLS + x;
          const learned = Math.max(0, Math.min(1, (sweep - x) / 4));
          const jitter = 0.5 + 0.5 * Math.sin(now * 0.004 + seed[k] * 40);
          const v = seed[k] * 0.6 * (1 - learned) * jitter + structure[k] * learned;
          const front = Math.exp(-Math.pow(x - sweep, 2) * 0.35);
          const a = 0.08 + v * 0.75 + front * 0.4;
          ctx.fillStyle =
            v > 0.72 || front > 0.6 ? `rgba(194,162,107,${Math.min(1, a)})` : `rgba(107,129,159,${Math.min(0.85, a * 0.8)})`;
          ctx.fillRect(x * (cw + gap), y * (ch + gap), cw, ch);
        }
      }
      if (curve.current) {
        const len = curve.current.getTotalLength();
        curve.current.style.strokeDasharray = `${len}`;
        curve.current.style.strokeDashoffset = `${len * (1 - train)}`;
      }
    };
    raf = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, [active]);

  return (
    <div className="flex h-full w-full flex-col justify-center gap-6">
      <div className="label flex items-center justify-between text-[9px] text-paper/40">
        <span>weights · layer 24 / attn.q_proj</span>
        <span className="text-gold">● training</span>
      </div>
      <canvas ref={canvas} className="aspect-[28/16] w-full" />
      <div className="grid grid-cols-6 gap-1">
        {STAGES.map((s, i) => (
          <div key={s} className="space-y-2">
            <div className={`h-px transition-colors duration-500 ${i <= stage ? "bg-gold" : "bg-paper/15"}`} />
            <div className={`label text-[9px] transition-colors duration-500 ${i === stage ? "text-gold" : i < stage ? "text-paper/60" : "text-paper/25"}`}>
              {s}
            </div>
          </div>
        ))}
      </div>
      <svg viewBox="0 0 400 80" className="h-16 w-full overflow-visible">
        {[0, 1, 2, 3].map((k) => (
          <line key={k} x1="0" x2="400" y1={k * 26} y2={k * 26} stroke="#FAF8F4" strokeOpacity=".06" />
        ))}
        <path
          ref={curve}
          d="M0,6 C30,10 40,34 70,40 S110,52 140,55 S190,58 215,64 S260,64 290,68 S350,70 400,71"
          fill="none"
          stroke="#C2A26B"
          strokeWidth="1.3"
        />
        <text x="0" y="78" fontSize="8" className="font-mono" fill="#FAF8F4" fillOpacity=".35" letterSpacing="1.5">
          LOSS
        </text>
        <text x="400" y="78" textAnchor="end" fontSize="8" className="font-mono" fill="#FAF8F4" fillOpacity=".35" letterSpacing="1.5">
          STEPS →
        </text>
      </svg>
    </div>
  );
}
