"use client";

import { useEffect, useState } from "react";

const EVENT = "sandsend:intro-done";

export function markIntroDone() {
  (window as unknown as { __introDone?: boolean }).__introDone = true;
  window.dispatchEvent(new Event(EVENT));
}

function isDone() {
  if (typeof window === "undefined") return false;
  return (
    (window as unknown as { __introDone?: boolean }).__introDone === true ||
    document.documentElement.classList.contains("intro-seen")
  );
}

/** True once the preloader curtain has opened (immediately on repeat visits). */
export function useIntroDone() {
  const [done, setDone] = useState(false);
  useEffect(() => {
    if (isDone()) {
      setDone(true);
      return;
    }
    const on = () => setDone(true);
    window.addEventListener(EVENT, on);
    return () => window.removeEventListener(EVENT, on);
  }, []);
  return done;
}
