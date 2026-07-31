"use client";

import { CheckCircle2, LockKeyhole, LogOut } from "lucide-react";
import Link from "next/link";
import { FormEvent, useState } from "react";
import { AdminTabs } from "@/components/admin/AdminModules";
import { useObraStore } from "@/hooks/useObraStore";
import { ADMIN_DEMO, isAdminSessionActive, setAdminSession } from "@/lib/obra-store";

export default function AdminPanel() {
  const { state, ready, save } = useObraStore();
  const [authenticated, setAuthenticated] = useState(() =>
    typeof window !== "undefined" ? isAdminSessionActive() : false,
  );
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");

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
      <div className="rounded-2xl border border-white/10 bg-[#121212] p-10 text-center text-sm text-white/50">
        Cargando panel de obra…
      </div>
    );
  }

  if (!authenticated) {
    return (
      <div className="mx-auto max-w-md overflow-hidden rounded-2xl border border-white/10 bg-[#0d0d0d] shadow-2xl">
        <div className="border-b border-white/10 bg-white/[0.03] px-6 py-5">
          <p className="text-[0.58rem] uppercase tracking-[0.2em] text-[#d4b28c]">Acceso interno</p>
          <h1 className="font-editorial mt-2 text-3xl text-white">Panel de obra</h1>
          <p className="mt-2 text-sm font-light text-white/45">
            Solo para residentes e ingenieros REYPA.
          </p>
        </div>
        <form onSubmit={login} className="space-y-4 p-6">
          <label className="block">
            <span className="mb-2 block text-[0.56rem] uppercase tracking-[0.18em] text-white/45">
              Usuario interno
            </span>
            <input
              name="user"
              type="email"
              required
              defaultValue={ADMIN_DEMO.user}
              className="h-12 w-full rounded-xl border border-white/12 bg-black/30 px-4 text-sm text-white outline-none focus:border-[#d4b28c]/60"
            />
          </label>
          <label className="block">
            <span className="mb-2 block text-[0.56rem] uppercase tracking-[0.18em] text-white/45">
              Contraseña
            </span>
            <input
              name="password"
              type="password"
              required
              defaultValue={ADMIN_DEMO.password}
              className="h-12 w-full rounded-xl border border-white/12 bg-black/30 px-4 text-sm text-white outline-none focus:border-[#d4b28c]/60"
            />
          </label>
          {error ? <p className="text-xs text-red-400">{error}</p> : null}
          <button
            type="submit"
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#f4f4f5] py-3.5 text-[0.62rem] font-semibold uppercase tracking-[0.18em] text-black"
          >
            <LockKeyhole size={14} /> Entrar al panel
          </button>
          <p className="text-center text-[0.55rem] leading-5 text-white/30">
            Demo: {ADMIN_DEMO.user} / {ADMIN_DEMO.password}
          </p>
        </form>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      <header className="flex flex-col gap-4 rounded-2xl border border-white/10 bg-[#0d0d0d] p-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-[0.58rem] uppercase tracking-[0.18em] text-[#d4b28c]">
            Operación de obra
          </p>
          <h1 className="font-editorial mt-2 text-3xl text-white">{state.projectName}</h1>
          <p className="mt-1 text-sm text-white/45">
            {state.projectCode} · Panel móvil para residentes
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Link
            href="/portal-cliente"
            className="rounded-full border border-white/15 px-4 py-2.5 text-[0.58rem] uppercase tracking-[0.14em] text-white/70"
          >
            Ver portal cliente
          </Link>
          <button
            type="button"
            onClick={logout}
            className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2.5 text-[0.58rem] uppercase tracking-[0.14em] text-white"
          >
            <LogOut size={13} /> Salir
          </button>
        </div>
      </header>

      {status ? (
        <div className="flex items-center gap-3 rounded-xl border border-[#d4b28c]/40 bg-[#d4b28c]/10 px-4 py-3 text-sm text-[#d4b28c]">
          <CheckCircle2 size={16} /> {status}
        </div>
      ) : null}
      {error ? (
        <div className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
          {error}
        </div>
      ) : null}

      <AdminTabs state={state} save={save} onStatus={flashStatus} onError={flashError} />
    </div>
  );
}
