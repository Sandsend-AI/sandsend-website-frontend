"use client";

import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { useContent } from "@/content/ContentProvider";

const C = { x: 240, y: 240 };
const NODES = [
  { k: "ERP", a: -150 },
  { k: "MES", a: -105 },
  { k: "WMS", a: -60 },
  { k: "SRM", a: -15 },
  { k: "CRM", a: 30 },
  { k: "PLM", a: 75 },
  { k: "IoT", a: 120 },
  { k: "BI", a: 165 },
].map((n, i) => {
  const r = i % 2 ? 176 : 150;
  const rad = (n.a * Math.PI) / 180;
  return { ...n, x: C.x + Math.cos(rad) * r, y: C.y + Math.sin(rad) * r };
});

const edge = (n: { x: number; y: number }) => {
  const mx = (n.x + C.x) / 2 + (n.y - C.y) * 0.18;
  const my = (n.y + C.y) / 2 - (n.x - C.x) * 0.18;
  return `M${n.x},${n.y} Q${mx},${my} ${C.x},${C.y}`;
};

/**
 * Islands of enterprise systems; a forward-deployed engineer (gold dot) visits
 * each in turn and wires it into a shared ontology at the centre. Once every
 * island is connected, data pulses flow inward continuously.
 */
export function OrgGraph({ active }: { active: boolean }) {
  const { visuals } = useContent();
  const [step, setStep] = useState(-1);

  useEffect(() => {
    if (!active) return;
    setStep(-1);
    let s = -1;
    const id = setInterval(() => {
      s += 1;
      if (s > NODES.length + 6) s = -1;
      setStep(s);
    }, 700);
    return () => clearInterval(id);
  }, [active]);

  const done = step >= NODES.length;
  const at = step >= 0 && step < NODES.length ? NODES[step] : null;
  const fde = at ?? (done ? C : { x: 30, y: 420 });

  return (
    <svg viewBox="0 0 480 480" className="h-full w-full overflow-visible">
      <defs>
        <radialGradient id="og-glow">
          <stop offset="0" stopColor="#C2A26B" stopOpacity=".35" />
          <stop offset="1" stopColor="#C2A26B" stopOpacity="0" />
        </radialGradient>
      </defs>
      {[60, 120, 190].map((r) => (
        <circle key={r} cx={C.x} cy={C.y} r={r} fill="none" stroke="#FAF8F4" strokeOpacity=".06" />
      ))}
      <line x1="0" y1={C.y} x2="480" y2={C.y} stroke="#FAF8F4" strokeOpacity=".05" />
      <line x1={C.x} y1="0" x2={C.x} y2="480" stroke="#FAF8F4" strokeOpacity=".05" />

      {NODES.map((n, i) => {
        const on = step >= i;
        return (
          <g key={n.k}>
            <path d={edge(n)} fill="none" stroke="#FAF8F4" strokeOpacity=".07" />
            <motion.path
              d={edge(n)}
              fill="none"
              stroke="#C2A26B"
              strokeWidth="1"
              initial={false}
              animate={{ pathLength: on ? 1 : 0, opacity: on ? 0.7 : 0 }}
              transition={{ duration: 0.7, ease: [0.65, 0, 0.35, 1] }}
            />
            {done && (
              <circle r="2.2" fill="#C2A26B">
                <animateMotion dur={`${1.6 + (i % 3) * 0.35}s`} repeatCount="indefinite" path={edge(n)} />
              </circle>
            )}
          </g>
        );
      })}

      {NODES.map((n, i) => {
        const on = step >= i;
        return (
          <g key={n.k} transform={`translate(${n.x},${n.y})`}>
            <rect
              x="-26"
              y="-13"
              width="52"
              height="26"
              fill="#060F1D"
              stroke={on ? "#C2A26B" : "#FAF8F4"}
              strokeOpacity={on ? 0.9 : 0.22}
              style={{ transition: "stroke .5s, stroke-opacity .5s" }}
            />
            <text
              textAnchor="middle"
              dy="4"
              className="font-mono"
              fontSize="10"
              letterSpacing="1.5"
              fill={on ? "#C2A26B" : "#FAF8F4"}
              fillOpacity={on ? 1 : 0.45}
              style={{ transition: "fill .5s" }}
            >
              {n.k}
            </text>
          </g>
        );
      })}

      <circle cx={C.x} cy={C.y} r="70" fill="url(#og-glow)" opacity={done ? 1 : 0.25} style={{ transition: "opacity .8s" }} />
      <g transform={`translate(${C.x},${C.y})`}>
        <circle r="34" fill="#060F1D" stroke="#C2A26B" strokeOpacity={done ? 1 : 0.4} />
        {done && (
          <circle r="34" fill="none" stroke="#C2A26B">
            <animate attributeName="r" from="34" to="70" dur="1.8s" repeatCount="indefinite" />
            <animate attributeName="stroke-opacity" from=".6" to="0" dur="1.8s" repeatCount="indefinite" />
          </circle>
        )}
        <text textAnchor="middle" dy="-2" fontSize="9" letterSpacing="1.6" className="font-mono" fill="#C2A26B">
          ONTOLOGY
        </text>
        <text textAnchor="middle" dy="12" fontSize="9" fill="#FAF8F4" fillOpacity=".6">
          {visuals.ontology}
        </text>
      </g>

      <motion.g initial={false} animate={{ x: fde.x, y: fde.y, scale: done ? 0 : 1 }} transition={{ duration: 0.6, ease: [0.65, 0, 0.35, 1] }}>
        <circle r="5" fill="#C2A26B" />
        <circle r="11" fill="none" stroke="#C2A26B" strokeOpacity=".5" />
        <text
          x="16"
          y="-12"
          fontSize="9"
          letterSpacing="1.5"
          className="font-mono"
          fill="#C2A26B"
          opacity={done ? 0 : 1}
          style={{ transition: "opacity .3s" }}
        >
          FDE
        </text>
      </motion.g>
    </svg>
  );
}
