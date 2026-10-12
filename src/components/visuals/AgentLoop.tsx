"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";

const STEPS = [
  { k: "理解", en: "Understand", d: "解析任务意图与约束" },
  { k: "读取", en: "Retrieve", d: "查询 SRM · WMS · 生产计划" },
  { k: "判断", en: "Reason", d: "基于业务对象与规则推理" },
  { k: "调用", en: "Tool Call", d: "库存测算 · 替代供应商检索" },
  { k: "审批", en: "Human Gate", d: "关键动作交由负责人确认", human: true },
  { k: "执行", en: "Execute", d: "生成采购任务 · 写回系统" },
  { k: "回读", en: "Observe", d: "核对执行结果，进入下一轮" },
];

const R = 168;
const pos = (i: number) => {
  const a = (i / STEPS.length) * Math.PI * 2 - Math.PI / 2;
  return { x: 240 + Math.cos(a) * R, y: 240 + Math.sin(a) * R, a };
};

export function AgentLoop({ active }: { active: boolean }) {
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!active) return;
    const id = setInterval(() => setN((v) => v + 1), 1500);
    return () => clearInterval(id);
  }, [active]);

  const i = n % STEPS.length;
  const angle = (n / STEPS.length) * 360;
  const s = STEPS[i];

  return (
    <div className="relative h-full w-full">
      <svg viewBox="0 0 480 480" className="h-full w-full overflow-visible">
        <defs>
          <linearGradient id="al-comet" gradientUnits="userSpaceOnUse" x1="109" y1="134" x2="240" y2="72">
            <stop offset="0" stopColor="#C2A26B" stopOpacity="0" />
            <stop offset="1" stopColor="#C2A26B" stopOpacity="1" />
          </linearGradient>
        </defs>
        <circle cx="240" cy="240" r={R} fill="none" stroke="#FAF8F4" strokeOpacity=".1" />
        <circle cx="240" cy="240" r={R - 22} fill="none" stroke="#FAF8F4" strokeOpacity=".05" strokeDasharray="2 5" />
        <circle cx="240" cy="240" r="96" fill="none" stroke="#FAF8F4" strokeOpacity=".06" />

        <g
          style={{
            transform: `rotate(${angle}deg)`,
            transformOrigin: "240px 240px",
            transformBox: "view-box",
            transition: "transform 1.1s cubic-bezier(.65,0,.35,1)",
          }}
        >
          <path
            d={`M ${240 + Math.cos(-Math.PI / 2 - 0.9) * R} ${240 + Math.sin(-Math.PI / 2 - 0.9) * R} A ${R} ${R} 0 0 1 240 ${240 - R}`}
            fill="none"
            stroke="url(#al-comet)"
            strokeWidth="2"
          />
          <circle cx="240" cy={240 - R} r="4" fill="#C2A26B" />
          <circle cx="240" cy={240 - R} r="12" fill="#C2A26B" fillOpacity=".15" />
        </g>

        {STEPS.map((st, k) => {
          const p = pos(k);
          const on = k === i;
          const lx = 240 + Math.cos(p.a) * (R + 34);
          const ly = 240 + Math.sin(p.a) * (R + 34);
          return (
            <g key={st.k}>
              <circle
                cx={p.x}
                cy={p.y}
                r={on ? 7 : 4}
                fill={on ? "#C2A26B" : "#060F1D"}
                stroke={st.human ? "#C2A26B" : "#FAF8F4"}
                strokeOpacity={on ? 1 : st.human ? 0.8 : 0.35}
                strokeDasharray={st.human && !on ? "2 2" : undefined}
                style={{ transition: "all .5s" }}
              />
              <text
                x={lx}
                y={ly}
                textAnchor={Math.abs(Math.cos(p.a)) < 0.2 ? "middle" : Math.cos(p.a) > 0 ? "start" : "end"}
                dy="4"
                fontSize="13"
                fill={on ? "#C2A26B" : "#FAF8F4"}
                fillOpacity={on ? 1 : 0.5}
                style={{ transition: "all .5s" }}
              >
                {st.k}
              </text>
            </g>
          );
        })}
      </svg>

      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={i}
            className="text-center"
            initial={{ opacity: 0, y: 10, filter: "blur(4px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -10, filter: "blur(4px)" }}
            transition={{ duration: 0.45 }}
          >
            <div className="label text-[9px] text-gold">
              Step {String(i + 1).padStart(2, "0")} · {s.en}
            </div>
            <div className="mt-2 text-3xl font-medium text-paper">{s.k}</div>
            <div className="mx-auto mt-2 max-w-[150px] text-[11px] leading-relaxed text-paper/50">{s.d}</div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
