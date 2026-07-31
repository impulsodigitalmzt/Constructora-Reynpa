"use client";

import { CheckCircle2, LockKeyhole, LogOut, Moon, Sun } from "lucide-react";
import Link from "next/link";
import { FormEvent, useMemo, useState } from "react";
import { AdminTabs } from "@/components/admin/AdminModules";
import {
  ADMIN_VISUAL_MODE_KEY,
  AdminThemeProvider,
  type AdminVisualMode,
  getAdminTheme,
} from "@/components/admin/admin-theme";
import { useObraStore } from "@/hooks/useObraStore";
import { ADMIN_DEMO, isAdminSessionActive, setAdminSession } from "@/lib/obra-store";

function readVisualMode(): AdminVisualMode {
  if (typeof window === "undefined") return "sun";
  const stored = window.localStorage.getItem(ADMIN_VISUAL_MODE_KEY);
  return stored === "dark" ? "dark" : "sun";
}

export default function AdminPanel() {
  const { state, ready, save } = useObraStore();
  const [authenticated, setAuthenticated] = useState(() =>
    typeof window !== "undefined" ? isAdminSessionActive() : false,
  );
  const [mode, setMode] = useState<AdminVisualMode>(() => readVisualMode());
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");
  const theme = useMemo(() => getAdminTheme(mode), [mode]);

  const toggleMode = () => {
    const next: AdminVisualMode = mode === "sun" ? "dark" : "sun";
    setMode(next);
    window.localStorage.setItem(ADMIN_VISUAL_MODE_KEY, next);
  };

  const login = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const user = String(data.get("user") || "").trim().toLowerCase();
    const password = String(data.get("password") || "");

    if (user === ADMIN_DEMO.user && password === ADMIN_DEMO.password) {
      setAdminSession(true);
      setAuthenticated(true);
      setError("");
      return;
    }

    setError("Credenciales incorrectas. Usa las de demostración internas.");
  };

  const logout = () => {
    setAdminSession(false);
    setAuthenticated(false);
  };

  const flashStatus = (message: string) => {
    setStatus(message);
    setError("");
    window.setTimeout(() => setStatus(""), 3500);
  };

  const flashError = (message: string) => {
    setError(message);
    window.setTimeout(() => setError(""), 4000);
  };

  if (!ready) {
    return (
      <div className={`rounded-2xl p-10 text-center text-base font-semibold ${theme.shell}`}>
        Cargando panel de obra…
      </div>
    );
  }

  return (
    <AdminThemeProvider theme={theme}>
      <div
        className={`relative left-1/2 w-screen max-w-[100vw] -translate-x-1/2 px-4 py-5 sm:left-0 sm:w-auto sm:max-w-none sm:translate-x-0 sm:rounded-2xl sm:px-5 ${theme.page}`}
      >
        <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className={`text-[0.7rem] font-bold uppercase tracking-[0.14em] ${theme.accent}`}>
              Uso interno · campo
            </p>
            <h1 className={`font-editorial mt-1 text-2xl font-bold sm:text-3xl ${theme.title}`}>
              Panel de residentes
            </h1>
          </div>
          <button
            type="button"
            onClick={toggleMode}
            className={`inline-flex min-h-12 items-center justify-center gap-2 rounded-xl px-4 text-[0.68rem] font-bold uppercase tracking-[0.12em] ${
              mode === "sun"
                ? "border-2 border-[#111] bg-[#111] text-white"
                : "border-2 border-[#d4b28c] bg-[#d4b28c] text-black"
            }`}
            aria-label={mode === "sun" ? "Cambiar a modo oscuro" : "Cambiar a modo sol"}
          >
            {mode === "sun" ? <Moon size={16} /> : <Sun size={16} />}
            {mode === "sun" ? "Modo oscuro" : "Modo sol"}
          </button>
        </div>

        {!authenticated ? (
          <div className={`mx-auto max-w-md overflow-hidden rounded-2xl shadow-xl ${theme.shell}`}>
            <div className={`border-b-2 px-5 py-5 ${theme.divider}`}>
              <p className={`text-[0.7rem] font-bold uppercase tracking-[0.16em] ${theme.accent}`}>
                Acceso interno · campo
              </p>
              <h1 className={`font-editorial mt-2 text-3xl font-bold ${theme.title}`}>
                Panel de obra
              </h1>
              <p className={`mt-2 text-sm font-semibold ${theme.muted}`}>
                Optimizado para uso móvil a la luz del día.
              </p>
            </div>
            <form onSubmit={login} className="space-y-4 p-5">
              <label className="block">
                <span className={theme.label}>Usuario interno</span>
                <input
                  name="user"
                  type="email"
                  required
                  defaultValue={ADMIN_DEMO.user}
                  className={theme.input}
                />
              </label>
              <label className="block">
                <span className={theme.label}>Contraseña</span>
                <input
                  name="password"
                  type="password"
                  required
                  defaultValue={ADMIN_DEMO.password}
                  className={theme.input}
                />
              </label>
              {error ? (
                <p className={`rounded-xl px-3 py-2 text-sm font-semibold ${theme.statusErr}`}>
                  {error}
                </p>
              ) : null}
              <button type="submit" className={theme.btnPrimary}>
                <LockKeyhole size={16} /> Entrar al panel
              </button>
              <p className={`text-center text-xs font-medium ${theme.muted}`}>
                Demo: {ADMIN_DEMO.user} / {ADMIN_DEMO.password}
              </p>
            </form>
          </div>
        ) : (
          <div className="space-y-4">
            <header className={`rounded-2xl p-4 sm:p-5 ${theme.shell}`}>
              <p className={`text-[0.7rem] font-bold uppercase tracking-[0.14em] ${theme.accent}`}>
                Operación de obra · residentes
              </p>
              <h1 className={`font-editorial mt-2 text-3xl font-bold leading-tight sm:text-4xl ${theme.title}`}>
                {state.projectName}
              </h1>
              <p className={`mt-1 text-sm font-semibold ${theme.muted}`}>
                {state.projectCode} · Uso a pie de obra
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                <Link href="/portal-cliente" className={theme.btnSecondary}>
                  Ver portal cliente
                </Link>
                <button type="button" onClick={logout} className={theme.btnGhost}>
                  <LogOut size={15} /> Salir
                </button>
              </div>
            </header>

            {status ? (
              <div className={`flex items-center gap-3 rounded-xl px-4 py-3.5 text-sm font-bold ${theme.statusOk}`}>
                <CheckCircle2 size={18} /> {status}
              </div>
            ) : null}
            {error ? (
              <div className={`rounded-xl px-4 py-3.5 text-sm font-bold ${theme.statusErr}`}>
                {error}
              </div>
            ) : null}

            <AdminTabs state={state} save={save} onStatus={flashStatus} onError={flashError} />
          </div>
        )}
      </div>
    </AdminThemeProvider>
  );
}
