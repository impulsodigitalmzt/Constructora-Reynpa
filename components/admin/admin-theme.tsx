"use client";

import { createContext, useContext } from "react";

export type AdminVisualMode = "sun" | "dark";

export const ADMIN_VISUAL_MODE_KEY = "reypa-admin-visual-mode";

export type AdminTheme = {
  mode: AdminVisualMode;
  page: string;
  shell: string;
  card: string;
  form: string;
  title: string;
  muted: string;
  label: string;
  input: string;
  textarea: string;
  file: string;
  tabActive: string;
  tabIdle: string;
  btnPrimary: string;
  btnSecondary: string;
  btnGhost: string;
  stepperBtn: string;
  statusOk: string;
  statusErr: string;
  accent: string;
  divider: string;
  listItem: string;
};

export function getAdminTheme(mode: AdminVisualMode): AdminTheme {
  if (mode === "sun") {
    return {
      mode,
      page: "bg-[#e6e2d8]",
      shell: "border-2 border-[#111] bg-[#f5f2ea] text-[#0a0a0a]",
      card: "border-2 border-[#111] bg-white text-[#0a0a0a]",
      form: "border-2 border-[#111] bg-[#fffdf8] text-[#0a0a0a]",
      title: "text-[#0a0a0a]",
      muted: "text-[#1f1f1f]",
      label: "mb-2 block text-[0.7rem] font-bold uppercase tracking-[0.14em] text-[#0a0a0a]",
      input:
        "h-14 w-full rounded-xl border-2 border-[#111] bg-white px-4 text-base font-semibold text-[#0a0a0a] outline-none placeholder:text-[#0a0a0a]/40 focus:border-[#8a6a3d] focus:ring-4 focus:ring-[#d4b28c]/45",
      textarea:
        "w-full resize-none rounded-xl border-2 border-[#111] bg-white px-4 py-3.5 text-base font-semibold text-[#0a0a0a] outline-none placeholder:text-[#0a0a0a]/40 focus:border-[#8a6a3d] focus:ring-4 focus:ring-[#d4b28c]/45",
      file:
        "block w-full rounded-xl border-2 border-dashed border-[#111] bg-white px-4 py-7 text-sm font-semibold text-[#0a0a0a] file:mr-4 file:rounded-xl file:border-0 file:bg-[#d4b28c] file:px-4 file:py-3 file:text-[0.65rem] file:font-bold file:uppercase file:tracking-[0.12em] file:text-black",
      tabActive: "bg-[#111] text-white shadow-md",
      tabIdle: "border-2 border-[#111] bg-white text-[#0a0a0a]",
      btnPrimary:
        "inline-flex min-h-14 w-full items-center justify-center gap-2 rounded-xl bg-[#d4b28c] px-5 text-[0.72rem] font-bold uppercase tracking-[0.14em] text-black sm:w-auto",
      btnSecondary:
        "inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border-2 border-[#111] bg-white px-4 text-[0.65rem] font-bold uppercase tracking-[0.12em] text-[#0a0a0a]",
      btnGhost:
        "inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-[#111] px-4 text-[0.65rem] font-bold uppercase tracking-[0.12em] text-white",
      stepperBtn:
        "grid size-14 shrink-0 place-items-center rounded-xl border-2 border-[#111] bg-[#111] text-2xl font-bold leading-none text-white active:scale-95",
      statusOk: "border-2 border-[#166534] bg-[#dcfce7] text-[#14532d]",
      statusErr: "border-2 border-[#991b1b] bg-[#fee2e2] text-[#7f1d1d]",
      accent: "text-[#8a6a3d]",
      divider: "border-[#111]/20",
      listItem: "border-2 border-[#111] bg-white",
    };
  }

  return {
    mode,
    page: "bg-[#1c1c1c]",
    shell: "border-2 border-[#d4b28c] bg-[#2a2a2a] text-white",
    card: "border-2 border-[#d4b28c]/70 bg-[#333] text-white",
    form: "border-2 border-[#d4b28c] bg-[#3a3a3a] text-white",
    title: "text-white",
    muted: "text-white/90",
    label: "mb-2 block text-[0.7rem] font-bold uppercase tracking-[0.14em] text-white",
    input:
      "h-14 w-full rounded-xl border-2 border-[#d4b28c] bg-[#1f1f1f] px-4 text-base font-semibold text-white outline-none placeholder:text-white/40 focus:ring-4 focus:ring-[#d4b28c]/35",
    textarea:
      "w-full resize-none rounded-xl border-2 border-[#d4b28c] bg-[#1f1f1f] px-4 py-3.5 text-base font-semibold text-white outline-none placeholder:text-white/40 focus:ring-4 focus:ring-[#d4b28c]/35",
    file:
      "block w-full rounded-xl border-2 border-dashed border-[#d4b28c] bg-[#1f1f1f] px-4 py-7 text-sm font-semibold text-white file:mr-4 file:rounded-xl file:border-0 file:bg-[#d4b28c] file:px-4 file:py-3 file:text-[0.65rem] file:font-bold file:uppercase file:tracking-[0.12em] file:text-black",
    tabActive: "bg-[#d4b28c] text-black shadow-md",
    tabIdle: "border-2 border-[#d4b28c]/60 bg-[#1f1f1f] text-white",
    btnPrimary:
      "inline-flex min-h-14 w-full items-center justify-center gap-2 rounded-xl bg-[#d4b28c] px-5 text-[0.72rem] font-bold uppercase tracking-[0.14em] text-black sm:w-auto",
    btnSecondary:
      "inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border-2 border-[#d4b28c] bg-transparent px-4 text-[0.65rem] font-bold uppercase tracking-[0.12em] text-white",
    btnGhost:
      "inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-white px-4 text-[0.65rem] font-bold uppercase tracking-[0.12em] text-black",
    stepperBtn:
      "grid size-14 shrink-0 place-items-center rounded-xl border-2 border-[#d4b28c] bg-[#d4b28c] text-2xl font-bold leading-none text-black active:scale-95",
    statusOk: "border-2 border-[#d4b28c] bg-[#d4b28c]/20 text-[#f5e6d0]",
    statusErr: "border-2 border-red-400 bg-red-500/25 text-red-100",
    accent: "text-[#d4b28c]",
    divider: "border-white/25",
    listItem: "border-2 border-[#d4b28c]/50 bg-[#2f2f2f]",
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
