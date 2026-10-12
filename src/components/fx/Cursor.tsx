"use client";

import { useEffect, useRef } from "react";

/**
 * A gold dot that tracks the pointer exactly, and a hairline ring that trails it
 * with spring lag. Elements with [data-cursor="label text"] expand the ring and
 * show the label; [data-cursor-hide] hides it (e.g. over canvases that draw
 * their own cursor response).
 */
export function Cursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const label = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    document.documentElement.classList.add("has-cursor");

    let x = innerWidth / 2,
      y = innerHeight / 2,
      rx = x,
      ry = y,
      scale = 1,
      targetScale = 1,
      raf = 0,
      visible = false;

    const move = (e: PointerEvent) => {
      x = e.clientX;
      y = e.clientY;
      if (!visible) {
        visible = true;
        rx = x;
        ry = y;
        dot.current!.style.opacity = "1";
        ring.current!.style.opacity = "1";
      }
      const t = (e.target as HTMLElement).closest<HTMLElement>("[data-cursor],a,button");
      const text = t?.dataset.cursor ?? "";
      targetScale = t ? (text ? 4.2 : 2.2) : 1;
      label.current!.textContent = text;
      ring.current!.dataset.active = t ? "1" : "0";
    };
    const leave = () => {
      visible = false;
      dot.current!.style.opacity = "0";
      ring.current!.style.opacity = "0";
    };

    const tick = () => {
      rx += (x - rx) * 0.16;
      ry += (y - ry) * 0.16;
      scale += (targetScale - scale) * 0.14;
      dot.current!.style.transform = `translate3d(${x}px,${y}px,0) translate(-50%,-50%)`;
      ring.current!.style.transform = `translate3d(${rx}px,${ry}px,0) translate(-50%,-50%) scale(${scale})`;
      label.current!.style.transform = `scale(${1 / scale})`;
      raf = requestAnimationFrame(tick);
    };

    addEventListener("pointermove", move, { passive: true });
    document.addEventListener("pointerleave", leave);
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      removeEventListener("pointermove", move);
      document.removeEventListener("pointerleave", leave);
      document.documentElement.classList.remove("has-cursor");
    };
  }, []);

  return (
    <>
      <div
        ref={ring}
        className="pointer-events-none fixed left-0 top-0 z-[80] flex h-9 w-9 items-center justify-center rounded-full border border-gold/60 opacity-0 transition-[background-color,border-color] duration-300 data-[active=1]:border-gold data-[active=1]:bg-gold/10 max-md:hidden"
        style={{ backdropFilter: "blur(1px)" }}
      >
        <span ref={label} className="label whitespace-nowrap text-[6px] tracking-[0.2em] text-gold" />
      </div>
      <div
        ref={dot}
        className="pointer-events-none fixed left-0 top-0 z-[81] h-1.5 w-1.5 rounded-full bg-gold opacity-0 max-md:hidden"
      />
    </>
  );
}
