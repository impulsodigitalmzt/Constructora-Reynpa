"use client";

import { createContext, useContext } from "react";

export type AdminVisualMode = "sun" | "dark";

export const ADMIN_VISUAL_MODE_KEY = "reypa-admin-visual-mode";

export type AdminTheme = {
  mode: AdminVisualMode;
  page: string;
  surface: string;
  elevated: string;
  title: string;
  muted: string;
  label: string;
  input: string;
  /** % / SPI / CPI · 2–4 dígitos */
  inputPct: string;
  /** Montos MXN · hasta ~7 dígitos */
  inputAmt: string;
  textarea: string;
  file: string;
  tabActive: string;
  tabIdle: string;
  btnPrimary: string;
  btnSecondary: string;
  btnGhost: string;
  statusOk: string;
  statusErr: string;
  accent: string;
  hairline: string;
};

const inputBaseSun =
  "h-11 rounded-xl border border-[#d0d5dd] bg-[#f9fafb] text-[0.95rem] font-semibold text-[#101828] outline-none transition placeholder:text-[#98a2b3] focus:border-[#b8925f] focus:bg-white focus:ring-4 focus:ring-[#d4b28c]/25";
const inputBaseDark =
  "h-11 rounded-xl border border-white/12 bg-white/[0.04] text-[0.95rem] font-semibold text-white outline-none transition placeholder:text-white/30 focus:border-[#d4b28c]/60 focus:ring-4 focus:ring-[#d4b28c]/15";

export function getAdminTheme(mode: AdminVisualMode): AdminTheme {
  if (mode === "sun") {
    return {
      mode,
      page: "bg-[#f4f5f7]",
      surface: "border border-black/[0.06] bg-white shadow-[0_1px_2px_rgba(16,24,40,0.04)]",
      elevated:
        "border border-black/[0.06] bg-white shadow-[0_8px_30px_rgba(16,24,40,0.06)]",
      title: "text-[#101828]",
      muted: "text-[#667085]",
      label: "mb-1.5 block text-[0.68rem] font-semibold uppercase tracking-[0.08em] text-[#667085]",
      input: `${inputBaseSun} w-full px-3.5`,
      inputPct: `${inputBaseSun} w-[4.25rem] max-w-full shrink-0 px-2 text-center tabular-nums`,
      inputAmt: `${inputBaseSun} w-full max-w-[10.5rem] shrink-0 px-3 text-right tabular-nums`,
      textarea:
        "w-full resize-none rounded-xl border border-[#d0d5dd] bg-[#f9fafb] px-3.5 py-3 text-[0.95rem] font-medium text-[#101828] outline-none transition placeholder:text-[#98a2b3] focus:border-[#b8925f] focus:bg-white focus:ring-4 focus:ring-[#d4b28c]/25",
      file:
        "block w-full max-w-full overflow-hidden rounded-xl border border-dashed border-[#d0d5dd] bg-[#f9fafb] px-3 py-5 text-sm font-medium text-[#344054] file:mr-2 file:rounded-lg file:border-0 file:bg-[#101828] file:px-3 file:py-2 file:text-[0.6rem] file:font-semibold file:uppercase file:tracking-[0.08em] file:text-white sm:px-4 sm:py-6 sm:file:mr-3",
      tabActive: "bg-[#101828] text-white shadow-sm",
      tabIdle: "bg-white text-[#667085] ring-1 ring-black/[0.06] hover:text-[#101828]",
      btnPrimary:
        "inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-[#101828] px-5 text-[0.72rem] font-semibold uppercase tracking-[0.1em] text-white transition hover:bg-[#1d2939]",
      btnSecondary:
        "inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-white px-4 text-[0.68rem] font-semibold uppercase tracking-[0.08em] text-[#344054] ring-1 ring-black/[0.08]",
      btnGhost:
        "inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-[#f2f4f7] px-4 text-[0.68rem] font-semibold uppercase tracking-[0.08em] text-[#344054]",
      statusOk: "border border-emerald-200 bg-emerald-50 text-emerald-800",
      statusErr: "border border-rose-200 bg-rose-50 text-rose-800",
      accent: "text-[#b8925f]",
      hairline: "border-black/[0.06]",
    };
  }

  return {
    mode,
    page: "bg-[#121212]",
    surface: "border border-white/10 bg-[#1a1a1a]",
    elevated: "border border-white/10 bg-[#1f1f1f] shadow-[0_12px_40px_rgba(0,0,0,0.35)]",
    title: "text-white",
    muted: "text-white/55",
    label: "mb-1.5 block text-[0.68rem] font-semibold uppercase tracking-[0.08em] text-white/45",
    input: `${inputBaseDark} w-full px-3.5`,
    inputPct: `${inputBaseDark} w-[4.25rem] max-w-full shrink-0 px-2 text-center tabular-nums`,
    inputAmt: `${inputBaseDark} w-full max-w-[10.5rem] shrink-0 px-3 text-right tabular-nums`,
    textarea:
      "w-full resize-none rounded-xl border border-white/12 bg-white/[0.04] px-3.5 py-3 text-[0.95rem] font-medium text-white outline-none transition placeholder:text-white/30 focus:border-[#d4b28c]/60 focus:ring-4 focus:ring-[#d4b28c]/15",
    file:
      "block w-full max-w-full overflow-hidden rounded-xl border border-dashed border-white/15 bg-white/[0.04] px-3 py-5 text-sm font-medium text-white/70 file:mr-2 file:rounded-lg file:border-0 file:bg-[#d4b28c] file:px-3 file:py-2 file:text-[0.6rem] file:font-semibold file:uppercase file:tracking-[0.08em] file:text-black sm:px-4 sm:py-6 sm:file:mr-3",
    tabActive: "bg-[#d4b28c] text-black shadow-sm",
    tabIdle: "bg-white/[0.04] text-white/50 ring-1 ring-white/10 hover:text-white",
    btnPrimary:
      "inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-[#d4b28c] px-5 text-[0.72rem] font-semibold uppercase tracking-[0.1em] text-black",
    btnSecondary:
      "inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-transparent px-4 text-[0.68rem] font-semibold uppercase tracking-[0.08em] text-white/70 ring-1 ring-white/15",
    btnGhost:
      "inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-white/10 px-4 text-[0.68rem] font-semibold uppercase tracking-[0.08em] text-white",
    statusOk: "border border-emerald-500/30 bg-emerald-500/10 text-emerald-200",
    statusErr: "border border-rose-500/30 bg-rose-500/10 text-rose-200",
    accent: "text-[#d4b28c]",
    hairline: "border-white/10",
  };
}

const AdminThemeContext = createContext<AdminTheme>(getAdminTheme("sun"));

export function AdminThemeProvider({
  theme,
  children,
}: {
  theme: AdminTheme;
  children: React.ReactNode;
}) {
  return <AdminThemeContext.Provider value={theme}>{children}</AdminThemeContext.Provider>;
}

export function useAdminTheme() {
  return useContext(AdminThemeContext);
}
