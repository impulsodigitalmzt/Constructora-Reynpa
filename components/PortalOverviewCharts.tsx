"use client";

import { useEffect, useState } from "react";
import {
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { useObraStore } from "@/hooks/useObraStore";

const currency = new Intl.NumberFormat("es-MX", {
  style: "currency",
  currency: "MXN",
  maximumFractionDigits: 0,
});

const STAGE_COLORS: Record<string, string> = {
  Preliminares: "#00d68f",
  Cimentación: "#3b82ff",
  Estructura: "#f5c542",
  Instalaciones: "#ff7a1a",
  Acabados: "#8b5cf6",
};

const RUBRO_META: Record<
  string,
  { label: string; gradient: string; glow: string }
> = {
  materiales: {
    label: "Materiales",
    gradient: "linear-gradient(90deg, #0b1f4a 0%, #1d4ed8 45%, #22d3ee 100%)",
    glow: "rgba(34, 211, 238, 0.35)",
  },
  manoObra: {
    label: "Mano de Obra",
    gradient: "linear-gradient(90deg, #052e1c 0%, #059669 45%, #34d399 100%)",
    glow: "rgba(52, 211, 153, 0.35)",
  },
  equipos: {
    label: "Equipo",
    gradient: "linear-gradient(90deg, #4a1a05 0%, #ea580c 45%, #fb923c 100%)",
    glow: "rgba(251, 146, 60, 0.35)",
  },
  subcontratistas: {
    label: "Subcontratistas",
    gradient: "linear-gradient(90deg, #2e1065 0%, #7c3aed 45%, #c084fc 100%)",
    glow: "rgba(192, 132, 252, 0.35)",
  },
};

const FINANCE_ORDER = ["materiales", "manoObra", "equipos", "subcontratistas"] as const;

export default function PortalOverviewCharts() {
  const { state } = useObraStore();
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => setAnimated(true));
    return () => window.cancelAnimationFrame(frame);
  }, [state.costs, state.stages, state.progress]);

  const stageData = state.stages.map((stage) => ({
    name: stage.label,
    value: Math.max(stage.value, 2),
    complete: stage.value,
    color: STAGE_COLORS[stage.label] ?? stage.color ?? "#d4b28c",
  }));

  const financeRows = FINANCE_ORDER.map((id) => {
    const cost = state.costs.find((item) => item.id === id);
    const meta = RUBRO_META[id];
    const amount = cost?.amount ?? 0;
    const budget = Math.max(cost?.budget ?? 1, 1);
    const percent = Math.min(100, Math.round((amount / budget) * 100));
    return {
      id,
      label: meta.label,
      amount,
      percent,
      gradient: meta.gradient,
      glow: meta.glow,
    };
  });

  return (
    <div className="mt-5 grid gap-5 lg:grid-cols-2">
      {/* A) Donut — Avance por Etapas */}
      <section className="rounded-xl border border-white/8 bg-gradient-to-b from-white/[0.04] to-white/[0.015] p-5 md:p-6">
        <div className="mb-2">
          <h3 className="text-base font-semibold tracking-tight text-white md:text-lg">
            Avance por Etapas
          </h3>
          <p className="mt-1 text-[0.58rem] uppercase tracking-[0.16em] text-white/30">
            Distribución del avance físico
          </p>
        </div>

        <div className="relative mx-auto mt-2 h-[15.5rem] w-full max-w-[17rem] sm:h-[17rem] sm:max-w-[18.5rem]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <defs>
                {stageData.map((item) => (
                  <linearGradient
                    key={`grad-${item.name}`}
                    id={`stage-${item.name}`}
                    x1="0"
                    y1="0"
                    x2="1"
                    y2="1"
                  >
                    <stop offset="0%" stopColor={item.color} stopOpacity={0.75} />
                    <stop offset="100%" stopColor={item.color} stopOpacity={1} />
                  </linearGradient>
                ))}
              </defs>
              <Pie
                data={stageData}
                dataKey="value"
                nameKey="name"
                innerRadius="58%"
                outerRadius="86%"
                paddingAngle={3.5}
                stroke="rgba(10,10,10,0.85)"
                strokeWidth={3}
                isAnimationActive
                animationDuration={1100}
                animationBegin={120}
              >
                {stageData.map((item) => (
                  <Cell
                    key={item.name}
                    fill={`url(#stage-${item.name})`}
                    style={{ filter: `drop-shadow(0 0 10px ${item.color}55)` }}
                  />
                ))}
              </Pie>
              <Tooltip
                cursor={false}
                content={({ active, payload }) => {
                  if (!active || !payload?.length) return null;
                  const item = payload[0]?.payload as (typeof stageData)[number];
                  return (
                    <div className="rounded-xl border border-white/15 bg-[#0d0d0d]/95 px-3.5 py-2.5 shadow-2xl backdrop-blur-md">
                      <p className="flex items-center gap-2 text-xs font-medium text-white">
                        <i
                          className="size-2.5 rounded-full"
                          style={{ background: item.color, boxShadow: `0 0 8px ${item.color}` }}
                        />
                        {item.name}
                      </p>
                      <p className="mt-1.5 text-sm tabular-nums text-[#d4b28c]">
                        {item.complete}% completado
                      </p>
                    </div>
                  );
                }}
              />
            </PieChart>
          </ResponsiveContainer>

          <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
            <p className="text-[0.52rem] uppercase tracking-[0.2em] text-white/35">Global</p>
            <p className="font-editorial mt-1 text-4xl tabular-nums text-[#d4b28c] sm:text-5xl">
              {state.progress}%
            </p>
          </div>
        </div>

        <ul className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2.5 sm:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3">
          {stageData.map((item) => (
            <li key={item.name} className="flex items-center gap-2 text-[0.7rem] text-white/60">
              <i
                className="size-2.5 shrink-0 rounded-full"
                style={{ background: item.color, boxShadow: `0 0 8px ${item.color}88` }}
              />
              <span className="truncate">{item.name}</span>
              <span className="ml-auto tabular-nums text-white/85">{item.complete}%</span>
            </li>
          ))}
        </ul>
      </section>

      {/* B) Barras horizontales — Desglose Presupuestario */}
      <section className="rounded-xl border border-white/8 bg-gradient-to-b from-white/[0.04] to-white/[0.015] p-5 md:p-6">
        <div className="mb-6">
          <h3 className="text-base font-semibold tracking-tight text-white md:text-lg">
            Desglose Presupuestario
          </h3>
          <p className="mt-1 text-[0.58rem] uppercase tracking-[0.16em] text-white/30">
            Ejercido por rubro · con gradiente
          </p>
        </div>

        <div className="space-y-5">
          {financeRows.map((row, index) => (
            <div key={row.id} className="group">
              <p className="mb-2 text-sm font-medium text-white/85">{row.label}</p>

              <div className="flex items-center gap-3">
                <div className="relative h-11 min-w-0 flex-1 overflow-hidden rounded-xl bg-white/[0.06] ring-1 ring-white/5">
                  <div
                    className="absolute inset-y-0 left-0 flex items-center overflow-hidden rounded-xl transition-[width] duration-1000 ease-out"
                    style={{
                      width: animated ? `${Math.max(row.percent, 10)}%` : "0%",
                      background: row.gradient,
                      boxShadow: `0 0 24px ${row.glow}`,
                      transitionDelay: `${index * 90}ms`,
                    }}
                  >
                    <span
                      className="pointer-events-none absolute inset-0 opacity-40"
                      style={{
                        background:
                          "linear-gradient(180deg, rgba(255,255,255,0.28) 0%, transparent 42%, rgba(0,0,0,0.22) 100%)",
                      }}
                    />
                    {row.percent >= 28 || animated ? (
                      <span className="relative z-[1] whitespace-nowrap px-3 text-[0.7rem] font-semibold tabular-nums tracking-wide text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.65)] sm:text-[0.72rem]">
                        {currency.format(row.amount)}
                      </span>
                    ) : null}
                  </div>
                </div>
                <span className="w-11 shrink-0 text-right text-[0.78rem] font-semibold tabular-nums text-white/80">
                  {row.percent}%
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
