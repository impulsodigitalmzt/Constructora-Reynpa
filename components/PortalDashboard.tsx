"use client";

import {
  Bell,
  CalendarDays,
  CircleDollarSign,
  LockKeyhole,
  Mail,
  Play,
  TrendingUp,
} from "lucide-react";
import { type FormEvent, useState } from "react";
import FinancialDashboard from "@/components/FinancialDashboard";
import PortalOverviewCharts from "@/components/PortalOverviewCharts";
import { useObraStore } from "@/hooks/useObraStore";
import { getSpentTotal } from "@/lib/obra-store";

const videos = [
  "AQM05lq19CEQAvO4u2f8rC41EUII7qBdO-2dZBUCDgUKXkEYPhpb3opA-pzwK6n2QzoUNUR7oau5crS2i1cJAt2FBg5zwxrtxkM8Icasnw.mp4",
  "AQMRwYR-7odwkxuYptMByjkRZWbhnebEIrITEk84RQF9k2Kd8fQdChU1QrQNBz-NDlT5lo40UQt48MyrpZTBlpJvlvHf3k89g6YXrRS6QQ.mp4",
  "AQNdaEgBPA6NKJD444IZJB76Lxxd6hvCkMaVJV93gZEcjOqfMr25jJW3ggnRl1rWNFnDte-YhIeD5KY0mEMIkpoijQpKK_qssSUZLk0TPA.mp4",
  "AQNJvG8irY7dXJ94Fz_Ztzk6EhZMVqTNHUPmwfc1JZSSEcOOAX5Yly1RCACaZQqDy-90VLS6bcThb4z6N7vRTYOPsgNrNY0mDxQ.mp4",
  "AQNqbltK9dOzw36bGq4UwslAuEgVBj-foQVdQcjwSctD1qLVirdoN7pTV42SxUK1sikK4M_s4vpaMAMEu_nyHoxXr1avNI3SdVYEEXyszw.mp4",
  "AQO7zqrBLunM_-AAN4WHpaT1zqtzOue-UyF083Xg_8pnZBty30YZ4REP1WPcnEbZYBYjx9yqOd_ewWPKXVA22ezJJLSGrEq8nkj_8pSneA.mp4",
  "AQOZndZd9yYINsDdvZXc09UpsWxEPwi77ZNP2_mxY5sVItMdzHnrtkHU4aLE25b9d8dTwPZoGVvbErQu3Gs6AV6SPiGBYwSiZaU.mp4",
];

export default function PortalDashboard() {
  const [authenticated, setAuthenticated] = useState(false);
  const [view, setView] = useState<"overview" | "finance" | "updates">("overview");
  const { state } = useObraStore();
  const spent = getSpentTotal(state);
  const spentMillions = (spent / 1_000_000).toFixed(2);
  const budgetMillions = (state.budgetTotal / 1_000_000).toFixed(1);
  const progressShare = Math.round((spent / Math.max(state.budgetTotal, 1)) * 100);

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
      <div className="flex items-center justify-between gap-4 border-b border-white/10 bg-white/[.025] px-4 py-5 md:px-6 md:py-6">
        <div className="flex min-w-0 items-center gap-3.5 md:gap-4">
          <div className="grid size-11 shrink-0 place-items-center rounded-xl bg-[#d4b28c] text-sm font-bold text-black md:size-12 md:text-base">
            R
          </div>
          <div className="min-w-0">
            <p className="font-editorial truncate text-2xl leading-tight text-white sm:text-3xl md:text-4xl">
              {state.projectName}
            </p>
            <p className="mt-1 text-[0.58rem] uppercase tracking-[0.16em] text-white/40 sm:text-[0.62rem]">
              {state.projectCode} · Mazatlán, Sin.
            </p>
          </div>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <button
            className="relative grid size-10 place-items-center rounded-full border border-white/10 bg-white/[.025]"
            aria-label="Notificaciones"
          >
            <Bell size={16} />
            <span className="absolute right-2.5 top-2.5 size-1.5 rounded-full bg-[#d4b28c]" />
          </button>
          <button
            onClick={() => setAuthenticated(false)}
            className="hidden rounded-full border border-white/10 px-4 py-2.5 text-[0.58rem] uppercase tracking-[0.15em] text-white/45 transition hover:border-white/25 hover:text-white sm:block"
          >
            Cerrar demo
          </button>
        </div>
      </div>

      <div className="border-b border-white/10 bg-[#0a0a0a] px-4 py-3 md:px-6">
        <div className="flex gap-2 overflow-x-auto rounded-2xl border border-white/10 bg-white/[0.03] p-1.5">
          {(
            [
              { id: "overview", label: "Resumen" },
              { id: "finance", label: "Finanzas" },
              { id: "updates", label: "Evidencias" },
            ] as const
          ).map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setView(tab.id)}
              className={`shrink-0 flex-1 rounded-xl px-4 py-3 text-[0.62rem] font-semibold uppercase tracking-[0.16em] transition-all duration-300 sm:px-5 ${
                view === tab.id
                  ? "bg-[#d4b28c] text-black shadow-[0_8px_24px_rgba(212,178,140,0.28)]"
                  : "text-white/45 hover:bg-white/[0.06] hover:text-white"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {view === "overview" ? (
        <div className="p-4 md:p-7">
          <div className="mb-7 flex items-end justify-between">
            <div>
              <p className="text-[0.58rem] uppercase tracking-[0.18em] text-white/25">Bienvenido de nuevo, Daniel</p>
              <h2 className="font-editorial mt-2 text-2xl sm:text-3xl">Estado del proyecto</h2>
            </div>
            <span className="hidden items-center gap-2 text-[0.55rem] uppercase tracking-[0.16em] text-[#d4b28c] sm:flex">
              <span className="size-1.5 rounded-full bg-[#d4b28c] shadow-[0_0_12px_#d4b28c]" /> Actualizado
            </span>
          </div>

          <div className="grid gap-3 md:grid-cols-3">
            <Metric icon={TrendingUp} label="Avance general" value={`${state.progress}%`} note="+7% este mes" />
            <Metric
              icon={CircleDollarSign}
              label="Presupuesto ejercido"
              value={`${progressShare}%`}
              note={`$${spentMillions}M de $${budgetMillions}M`}
            />
            <Metric icon={CalendarDays} label="Entrega estimada" value="18 Oct" note="En tiempo" />
          </div>

          <PortalOverviewCharts />
        </div>
      ) : view === "finance" ? (
        <div className="p-4 md:p-7">
          <FinancialDashboard />
        </div>
      ) : (
        <div className="p-4 md:p-7">
          <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-[0.58rem] uppercase tracking-[0.18em] text-white/25">Bitácora audiovisual</p>
              <h2 className="font-editorial mt-2 text-3xl">Avances recientes</h2>
            </div>
            <p className="text-[0.58rem] uppercase tracking-[0.16em] text-[#d4b28c]">
              {state.evidences.length + videos.length} evidencias
            </p>
          </div>

          {state.evidences.length > 0 ? (
            <div className="mb-8">
              <p className="mb-4 text-[0.56rem] uppercase tracking-[0.18em] text-[#d4b28c]">
                Publicadas desde campo
              </p>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {state.evidences.map((item) => (
                  <article
                    key={item.id}
                    className="group overflow-hidden rounded-2xl border-[3px] border-[#b8b8b8] bg-[#e9e9e9] shadow-[0_8px_24px_rgba(0,0,0,0.25)]"
                  >
                    <div className="relative aspect-[4/5] bg-neutral-900">
                      {item.type === "image" ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={item.dataUrl}
                          alt={item.description}
                          className="size-full object-cover"
                        />
                      ) : (
                        <video
                          src={item.dataUrl}
                          controls
                          playsInline
                          className="size-full object-cover"
                        />
                      )}
                      <span className="pointer-events-none absolute left-3 top-3 rounded-full bg-[#d4b28c] px-3 py-2 text-[0.58rem] font-bold uppercase tracking-[0.12em] text-black">
                        Nueva
                      </span>
                    </div>
                    <div className="p-4">
                      <p className="text-sm font-semibold text-[#0a0a0a]">{item.description}</p>
                      <p className="mt-1 text-[0.58rem] font-medium text-[#555]">
                        {new Date(item.createdAt).toLocaleString("es-MX")} · {item.author}
                      </p>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          ) : null}

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {videos.map((video, index) => (
              <article key={video} className="group overflow-hidden rounded-2xl border-[3px] border-[#b8b8b8] bg-[#e9e9e9] shadow-[0_8px_24px_rgba(0,0,0,0.25)]">
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
                  <p className="text-sm font-semibold text-[#0a0a0a]">
                    {index < 2 ? "Supervisión de estructura" : index < 5 ? "Avance de instalaciones" : "Recorrido de obra"}
                  </p>
                  <p className="mt-1 text-[0.58rem] font-medium text-[#555]">{28 - index * 2} Jul 2026 · Equipo REYPA</p>
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
    <article className="min-w-0 rounded-2xl border-[3px] border-[#b8b8b8] bg-[#e9e9e9] p-4 shadow-[0_8px_24px_rgba(0,0,0,0.25)] sm:p-5">
      <div className="flex items-center justify-between gap-2">
        <span className="text-[0.58rem] font-bold uppercase tracking-[0.1em] text-[#555] sm:text-[0.62rem] sm:tracking-[0.12em]">
          {label}
        </span>
        <Icon size={17} className="shrink-0 text-[#ff6b2c]" />
      </div>
      <p className="mt-4 text-2xl font-semibold tracking-tight text-[#0a0a0a] sm:mt-6 sm:text-3xl">{value}</p>
      <p className="mt-2 text-[0.65rem] font-semibold text-[#027a48] sm:text-[0.68rem]">{note}</p>
    </article>
  );
}
