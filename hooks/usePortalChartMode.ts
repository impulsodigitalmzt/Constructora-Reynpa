"use client";

import { useEffect, useState } from "react";

export type PortalChartMode = "sun" | "dark";

export const PORTAL_CHART_MODE_KEY = "reypa-portal-chart-mode";

function readMode(): PortalChartMode {
  if (typeof window === "undefined") return "sun";
  return window.localStorage.getItem(PORTAL_CHART_MODE_KEY) === "dark" ? "dark" : "sun";
}

export type PortalChartTheme = {
  mode: PortalChartMode;
  card: string;
  title: string;
  muted: string;
  body: string;
  track: string;
  trackBorder: string;
  pieStroke: string;
  grid: string;
  tick: string;
  tickMuted: string;
  tooltip: string;
  tooltipTitle: string;
  tooltipBody: string;
  hairline: string;
  toggleBtn: string;
};

export function getPortalChartTheme(mode: PortalChartMode): PortalChartTheme {
  if (mode === "dark") {
    return {
      mode,
      card: "min-w-0 overflow-hidden rounded-2xl border border-white/12 bg-[#141414] p-4 shadow-[0_8px_24px_rgba(0,0,0,0.45)] sm:p-5 md:p-6",
      title: "text-white",
      muted: "text-white/45",
      body: "text-white/90",
      track: "border border-white/10 bg-white/[0.06]",
      trackBorder: "border-white/10",
      pieStroke: "#141414",
      grid: "rgba(255,255,255,0.08)",
      tick: "#f4f4f5",
      tickMuted: "#a3a3a3",
      tooltip: "rounded-xl border border-white/15 bg-[#1a1a1a] px-3.5 py-2.5 shadow-xl",
      tooltipTitle: "text-white",
      tooltipBody: "text-white/70",
      hairline: "border-white/10",
      toggleBtn:
        "inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.06] px-3 py-2 text-[0.58rem] font-semibold uppercase tracking-[0.14em] text-white/85 transition hover:border-white/30 hover:bg-white/[0.1] hover:text-white",
    };
  }

  return {
    mode,
    card: "min-w-0 overflow-hidden rounded-2xl border-[3px] border-[#b8b8b8] bg-[#e9e9e9] p-4 shadow-[0_8px_24px_rgba(0,0,0,0.25)] sm:p-5 md:p-6",
    title: "text-[#0a0a0a]",
    muted: "text-[#555]",
    body: "text-[#1a1a1a]",
    track: "border-2 border-[#cfcfcf] bg-[#d8d8d8]",
    trackBorder: "border-[#cfcfcf]",
    pieStroke: "#e9e9e9",
    grid: "rgba(0,0,0,0.08)",
    tick: "#1a1a1a",
    tickMuted: "#666",
    tooltip: "rounded-xl border-2 border-[#b8b8b8] bg-white px-3.5 py-2.5 shadow-xl",
    tooltipTitle: "text-[#0a0a0a]",
    tooltipBody: "text-[#555]",
    hairline: "border-[#cfcfcf]",
    toggleBtn:
      "inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/[0.08] px-3 py-2 text-[0.58rem] font-semibold uppercase tracking-[0.14em] text-white/90 transition hover:border-[#d4b28c]/50 hover:bg-white/[0.14] hover:text-white",
  };
}

const MODE_EVENT = "reypa-portal-chart-mode";

export function usePortalChartMode() {
  const [mode, setMode] = useState<PortalChartMode>("sun");

  useEffect(() => {
    setMode(readMode());
    const sync = () => setMode(readMode());
    window.addEventListener(MODE_EVENT, sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener(MODE_EVENT, sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  const toggle = () => {
    const next: PortalChartMode = mode === "sun" ? "dark" : "sun";
    setMode(next);
    window.localStorage.setItem(PORTAL_CHART_MODE_KEY, next);
    window.dispatchEvent(new Event(MODE_EVENT));
  };

  return { mode, theme: getPortalChartTheme(mode), toggle };
}
