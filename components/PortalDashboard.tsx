"use client";

import {
  Bell,
  CalendarDays,
  Check,
  CircleDollarSign,
  Clock3,
  HardHat,
  LockKeyhole,
  Mail,
  Play,
  TrendingUp,
} from "lucide-react";
import { type FormEvent, useState } from "react";

const videos = [
  "AQM05lq19CEQAvO4u2f8rC41EUII7qBdO-2dZBUCDgUKXkEYPhpb3opA-pzwK6n2QzoUNUR7oau5crS2i1cJAt2FBg5zwxrtxkM8Icasnw.mp4",
  "AQMRwYR-7odwkxuYptMByjkRZWbhnebEIrITEk84RQF9k2Kd8fQdChU1QrQNBz-NDlT5lo40UQt48MyrpZTBlpJvlvHf3k89g6YXrRS6QQ.mp4",
  "AQNdaEgBPA6NKJD444IZJB76Lxxd6hvCkMaVJV93gZEcjOqfMr25jJW3ggnRl1rWNFnDte-YhIeD5KY0mEMIkpoijQpKK_qssSUZLk0TPA.mp4",
  "AQNJvG8irY7dXJ94Fz_Ztzk6EhZMVqTNHUPmwfc1JZSSEcOOAX5Yly1RCACaZQqDy-90VLS6bcThb4z6N7vRTYOPsgNrNY0mDxQ.mp4",
  "AQNqbltK9dOzw36bGq4UwslAuEgVBj-foQVdQcjwSctD1qLVirdoN7pTV42SxUK1sikK4M_s4vpaMAMEu_nyHoxXr1avNI3SdVYEEXyszw.mp4",
  "AQO7zqrBLunM_-AAN4WHpaT1zqtzOue-UyF083Xg_8pnZBty30YZ4REP1WPcnEbZYBYjx9yqOd_ewWPKXVA22ezJJLSGrEq8nkj_8pSneA.mp4",
  "AQOZndZd9yYINsDdvZXc09UpsWxEPwi77ZNP2_mxY5sVItMdzHnrtkHU4aLE25b9d8dTwPZoGVvbErQu3Gs6AV6SPiGBYwSiZaU.mp4",
];

const stages = [
  { label: "Preliminares", value: 100 },
  { label: "Cimentación", value: 100 },
  { label: "Estructura", value: 82 },
  { label: "Instalaciones", value: 46 },
  { label: "Acabados", value: 12 },
];

export default function PortalDashboard() {
  const [authenticated, setAuthenticated] = useState(false);
  const [view, setView] = useState<"overview" | "updates">("overview");

  const enterDemo = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setAuthenticated(true);
  };

  if (!authenticated) {
    return (
      <div className="relative mx-auto max-w-6xl overflow-hidden rounded-[1.5rem] border border-white/10 bg-[#0d0d0d] shadow-[0_60px_160px_rgba(0,0,0,.65)]">
        <div className="grid min-h-[42rem] lg:grid-cols-[1.05fr_.95fr]">
          <div className="noise relative hidden overflow-hidden border-r border-white/10 lg:block">
            <video
              src={`/video/${videos[0]}`}
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              className="absolute inset-0 size-full object-cover opacity-50"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-black/25 to-black/25" />
            <div className="absolute inset-x-0 bottom-0 z-10 p-10">
              <span className="text-[0.58rem] uppercase tracking-[0.25em] text-[#d4b28c]">Portal privado REYPA</span>
              <p className="font-editorial mt-5 max-w-md text-4xl leading-tight">
                La tranquilidad de saber exactamente dónde está tu obra.
              </p>
              <div className="mt-8 flex items-center gap-3 text-[0.58rem] uppercase tracking-[0.18em] text-white/40">
                <span className="size-1.5 rounded-full bg-[#d4b28c] shadow-[0_0_14px_#d4b28c]" />
                Sistema operativo
              </div>
            </div>
          </div>

          <div className="flex items-center p-7 sm:p-12 lg:p-16">
            <div className="mx-auto w-full max-w-sm">
              <div className="mb-12 flex items-center justify-between">
                <div className="grid size-12 place-items-center rounded-xl bg-[#d4b28c] text-sm font-bold text-black">R</div>
                <span className="flex items-center gap-2 text-[0.55rem] uppercase tracking-[0.2em] text-white/30">
                  <LockKeyhole size={12} /> Acceso seguro
                </span>
              </div>
              <p className="text-[0.58rem] uppercase tracking-[0.25em] text-[#d4b28c]">Bienvenido</p>
              <h2 className="font-editorial mt-3 text-4xl">Accede a tu proyecto.</h2>
              <p className="mt-4 text-sm font-light leading-6 text-white/35">
                Consulta avances, presupuesto y evidencias en un mismo lugar.
              </p>

              <form className="mt-10 space-y-5" onSubmit={enterDemo}>
                <label className="block">
                  <span className="mb-2 block text-[0.56rem] uppercase tracking-[0.2em] text-white/35">Correo electrónico</span>
                  <span className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[.025] px-4 transition-colors focus-within:border-[#d4b28c]/50">
                    <Mail size={15} className="text-white/25" />
                    <input
                      type="email"
                      defaultValue="cliente@reypa.mx"
                      className="h-13 w-full bg-transparent text-sm font-light text-white outline-none placeholder:text-white/20"
                      aria-label="Correo electrónico"
                    />
                  </span>
                </label>
                <label className="block">
                  <span className="mb-2 block text-[0.56rem] uppercase tracking-[0.2em] text-white/35">Contraseña</span>
                  <span className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[.025] px-4 transition-colors focus-within:border-[#d4b28c]/50">
                    <LockKeyhole size={15} className="text-white/25" />
                    <input
                      type="password"
                      defaultValue="reypa-demo"
                      className="h-13 w-full bg-transparent text-sm font-light text-white outline-none"
                      aria-label="Contraseña"
                    />
                  </span>
                </label>
                <button
                  type="submit"
                  className="group relative mt-3 w-full overflow-hidden rounded-xl bg-[#f4f4f5] px-5 py-4 text-[0.62rem] font-semibold uppercase tracking-[0.2em] text-black transition-all duration-500 hover:bg-[#d4b28c]"
                >
                  <span className="absolute inset-y-0 -left-12 w-8 rotate-12 bg-white/70 blur-lg transition-all duration-700 group-hover:left-[120%]" />
                  <span className="relative">Entrar al proyecto demo</span>
                </button>
              </form>
              <p className="mt-6 text-center text-[0.55rem] leading-5 text-white/20">
                Experiencia demostrativa. No se almacenan credenciales.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-[1.5rem] border border-white/10 bg-[#0d0d0d] shadow-[0_60px_160px_rgba(0,0,0,.65)]">
      <div className="flex items-center justify-between border-b border-white/10 bg-white/[.025] px-4 py-4 md:px-6">
        <div className="flex items-center gap-3">
          <div className="grid size-9 place-items-center rounded-lg bg-[#d4b28c] text-xs font-bold text-black">R</div>
          <div>
            <p className="text-sm font-semibold">Residencia Lomas</p>
            <p className="mt-0.5 text-[0.56rem] uppercase tracking-[0.15em] text-white/25">REY-024 · Mazatlán, Sin.</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button className="relative grid size-9 place-items-center rounded-full border border-white/10 bg-white/[.025]" aria-label="Notificaciones">
            <Bell size={16} />
            <span className="absolute right-2 top-2 size-1.5 rounded-full bg-[#d4b28c]" />
          </button>
          <button
            onClick={() => setAuthenticated(false)}
            className="hidden rounded-full border border-white/10 px-4 py-2 text-[0.58rem] uppercase tracking-[0.15em] text-white/45 transition hover:text-white sm:block"
          >
            Cerrar demo
          </button>
        </div>
      </div>

      <div className="flex border-b border-white/10 bg-white/[.025] px-4 md:px-6">
        <button
          className={`border-b px-1 py-4 text-[0.58rem] font-semibold uppercase tracking-[0.18em] transition-colors ${
            view === "overview" ? "border-[#d4b28c] text-[#d4b28c]" : "border-transparent text-white/30"
          }`}
          onClick={() => setView("overview")}
        >
          Resumen
        </button>
        <button
          className={`ml-7 border-b px-1 py-4 text-[0.58rem] font-semibold uppercase tracking-[0.18em] transition-colors ${
            view === "updates" ? "border-[#d4b28c] text-[#d4b28c]" : "border-transparent text-white/30"
          }`}
          onClick={() => setView("updates")}
        >
          Evidencias
        </button>
      </div>

      {view === "overview" ? (
        <div className="p-4 md:p-7">
          <div className="mb-7 flex items-end justify-between">
            <div>
              <p className="text-[0.58rem] uppercase tracking-[0.18em] text-white/25">Bienvenido de nuevo, Daniel</p>
              <h2 className="font-editorial mt-2 text-3xl">Estado del proyecto</h2>
            </div>
            <span className="hidden items-center gap-2 text-[0.55rem] uppercase tracking-[0.16em] text-[#d4b28c] sm:flex">
              <span className="size-1.5 rounded-full bg-[#d4b28c] shadow-[0_0_12px_#d4b28c]" /> Actualizado
            </span>
          </div>

          <div className="grid gap-3 md:grid-cols-3">
            <Metric icon={TrendingUp} label="Avance general" value="68%" note="+7% este mes" />
            <Metric icon={CircleDollarSign} label="Presupuesto ejercido" value="61%" note="$1.83M de $3.0M" />
            <Metric icon={CalendarDays} label="Entrega estimada" value="18 Oct" note="En tiempo" />
          </div>

          <div className="mt-5 grid gap-5 lg:grid-cols-[1.35fr_0.65fr]">
            <section className="rounded-xl border border-white/8 bg-white/[.025] p-5 md:p-6">
              <div className="mb-7 flex items-start justify-between">
                <div>
                  <h3 className="font-semibold">Progreso por etapa</h3>
                  <p className="mt-1 text-[0.58rem] text-white/25">Actualizado hoy, 16:40</p>
                </div>
                <HardHat size={20} className="text-[#d4b28c]" />
              </div>
              <div className="space-y-5">
                {stages.map((stage) => (
                  <div key={stage.label}>
                    <div className="mb-2 flex justify-between text-[0.65rem]">
                      <span className="text-white/45">{stage.label}</span>
                      <span className="text-white/65">{stage.value}%</span>
                    </div>
                    <div className="h-px overflow-hidden bg-white/10">
                      <div className="h-full bg-[#d4b28c]" style={{ width: `${stage.value}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section className="rounded-xl border border-white/8 bg-[#151515] p-5 text-white md:p-6">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold">Próximas actividades</h3>
                <Clock3 size={18} className="text-[#d4b28c]" />
              </div>
              <div className="mt-7 space-y-6">
                {[
                  ["30 JUL", "Colado de losa", "Estructura"],
                  ["02 AGO", "Tubería hidráulica", "Instalaciones"],
                  ["06 AGO", "Revisión con cliente", "Seguimiento"],
                ].map(([date, task, area], index) => (
                  <div key={task} className="flex gap-4">
                    <div className={`mt-1 grid size-5 shrink-0 place-items-center rounded-full ${index === 0 ? "bg-[#d4b28c] text-black" : "border border-white/20"}`}>
                      {index === 0 && <Check size={12} />}
                    </div>
                    <div>
                      <p className="text-[0.6rem] font-bold tracking-[0.15em] text-white/35">{date}</p>
                      <p className="mt-1 text-sm">{task}</p>
                      <p className="mt-1 text-xs text-white/40">{area}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      ) : (
        <div className="p-4 md:p-7">
          <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-[0.58rem] uppercase tracking-[0.18em] text-white/25">Bitácora audiovisual</p>
              <h2 className="font-editorial mt-2 text-3xl">Avances recientes</h2>
            </div>
            <p className="text-[0.58rem] uppercase tracking-[0.16em] text-[#d4b28c]">7 evidencias verificadas</p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {videos.map((video, index) => (
              <article key={video} className="group overflow-hidden rounded-xl border border-white/8 bg-white/[.025]">
                <div className="group relative aspect-[4/5] bg-neutral-900">
                  <video
                    src={`/video/${video}`}
                    autoPlay
                    muted
                    loop
                    controls
                    playsInline
                    preload="auto"
                    className="size-full object-cover grayscale-[15%] transition duration-500 group-hover:grayscale-0"
                  />
                  <span className="pointer-events-none absolute left-3 top-3 flex items-center gap-2 rounded-full bg-black/65 px-3 py-2 text-[0.6rem] font-bold uppercase tracking-[0.12em] text-white backdrop-blur">
                    <Play size={10} fill="currentColor" /> Evidencia {String(index + 1).padStart(2, "0")}
                  </span>
                </div>
                <div className="p-4">
                  <p className="text-sm font-medium">
                    {index < 2 ? "Supervisión de estructura" : index < 5 ? "Avance de instalaciones" : "Recorrido de obra"}
                  </p>
                  <p className="mt-1 text-[0.58rem] text-white/25">{28 - index * 2} Jul 2026 · Equipo REYPA</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function Metric({
  icon: Icon,
  label,
  value,
  note,
}: {
  icon: typeof TrendingUp;
  label: string;
  value: string;
  note: string;
}) {
  return (
    <article className="rounded-xl border border-white/8 bg-white/[.025] p-5">
      <div className="flex items-center justify-between">
        <span className="text-[0.58rem] uppercase tracking-[0.15em] text-white/25">{label}</span>
        <Icon size={17} className="text-[#d4b28c]" />
      </div>
      <p className="mt-6 text-3xl font-light tracking-tight">{value}</p>
      <p className="mt-2 text-[0.6rem] text-white/28">{note}</p>
    </article>
  );
}
