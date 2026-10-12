"use client";

import { createContext, useContext, type ReactNode } from "react";
import type { Content } from "./zh";

const Ctx = createContext<Content | null>(null);

export function ContentProvider({ value, children }: { value: Content; children: ReactNode }) {
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useContent() {
  const t = useContext(Ctx);
  if (!t) throw new Error("useContent must be used inside <ContentProvider>");
  return t;
}
