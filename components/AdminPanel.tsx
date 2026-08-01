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
import RippleButton from "@/components/motion/RippleButton";
import { useObraStore } from "@/hooks/useObraStore";
import { ADMIN_DEMO, isAdminSessionActive, setAdminSession } from "@/lib/obra-store";

function readVisualMode(): AdminVisualMode {
  if (typeof window === "undefined") return "sun";
  return window.localStorage.getItem(ADMIN_VISUAL_MODE_KEY) === "dark" ? "dark" : "sun";
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
    window.setTimeout(() => setStatus(""), 3200);
  };

  const flashError = (message: string) => {
    setError(message);
    window.setTimeout(() => setError(""), 4000);
  };

  if (!ready) {
    return (
      <div className={`rounded-2xl p-8 text-center text-sm sm:p-10 ${theme.surface} ${theme.muted}`}>
        Cargando panel…
      </div>
    );
  }

  return (
    <AdminThemeProvider theme={theme}>
      <div className={`min-w-0 overflow-x-hidden rounded-2xl px-3 py-4 sm:rounded-3xl sm:px-6 sm:py-6 ${theme.page}`}>
        <div className="mb-4 flex items-start justify-between gap-3 sm:mb-5">
          <div className="min-w-0">
            <p className={`text-[0.65rem] font-semibold uppercase tracking-[0.12em] sm:text-[0.68rem] ${theme.accent}`}>
              Residentes · campo
            </p>
            <h1 className={`mt-1 text-xl font-semibold tracking-tight sm:text-3xl ${theme.title}`}>
              Panel de obra
            </h1>
          </div>
          <button
            type="button"
            onClick={toggleMode}
            className={`${theme.btnGhost} shrink-0`}
            aria-label={mode === "sun" ? "Modo oscuro" : "Modo sol"}
          >
            {mode === "sun" ? <Moon size={15} /> : <Sun size={15} />}
            <span className="hidden sm:inline">{mode === "sun" ? "Oscuro" : "Sol"}</span>
          </button>
        </div>

        {!authenticated ? (
          <div className={`mx-auto w-full max-w-md overflow-hidden rounded-2xl ${theme.elevated}`}>
            <div className={`border-b px-4 py-4 sm:px-5 sm:py-5 ${theme.hairline}`}>
              <h2 className={`text-lg font-semibold sm:text-xl ${theme.title}`}>Acceso interno</h2>
              <p className={`mt-1 text-sm ${theme.muted}`}>
                Interfaz clara para operar a la luz del día.
              </p>
            </div>
            <form onSubmit={login} className="space-y-3.5 p-4 sm:p-5">
              <label className="block">
                <span className={theme.label}>Usuario</span>
                <input
                  name="user"
                  type="email"
                  required
                  defaultValue={ADMIN_DEMO.user}
                  className={theme.input}
                  autoComplete="username"
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
                  autoComplete="current-password"
                />
              </label>
              {error ? (
                <p className={`rounded-xl px-3 py-2 text-sm font-medium ${theme.statusErr}`}>
                  {error}
                </p>
              ) : null}
              <RippleButton type="submit" className={`${theme.btnPrimary} w-full`}>
                <LockKeyhole size={15} /> Entrar
              </RippleButton>
              <p className={`break-all text-center text-xs ${theme.muted}`}>
                {ADMIN_DEMO.user} · {ADMIN_DEMO.password}
              </p>
            </form>
          </div>
        ) : (
          <div className="min-w-0 space-y-4">
            <header className={`rounded-2xl p-4 sm:p-5 ${theme.elevated}`}>
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="min-w-0">
                  <p className={`text-[0.68rem] font-semibold uppercase tracking-[0.1em] ${theme.accent}`}>
                    {state.projectCode}
                  </p>
                  <h2 className={`mt-1 font-editorial text-2xl tracking-tight sm:text-4xl ${theme.title}`}>
                    {state.projectName}
                  </h2>
                  <p className={`mt-1 text-sm ${theme.muted}`}>Actualización desde campo</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Link href="/portal-cliente" className={`${theme.btnSecondary} flex-1 sm:flex-none`}>
                    Portal cliente
                  </Link>
                  <button type="button" onClick={logout} className={`${theme.btnGhost} flex-1 sm:flex-none`}>
                    <LogOut size={14} /> Salir
                  </button>
                </div>
              </div>
            </header>

            {status ? (
              <div
                className={`flex items-start gap-2.5 rounded-xl px-4 py-3 text-sm font-medium sm:items-center ${theme.statusOk}`}
              >
                <CheckCircle2 size={16} className="mt-0.5 shrink-0 sm:mt-0" /> {status}
              </div>
            ) : null}
            {error ? (
              <div className={`rounded-xl px-4 py-3 text-sm font-medium ${theme.statusErr}`}>
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
