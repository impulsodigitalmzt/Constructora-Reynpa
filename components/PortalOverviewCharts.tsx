"use client";

import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import {
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { useObraStore } from "@/hooks/useObraStore";
import { usePortalChartMode } from "@/hooks/usePortalChartMode";

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
  const { mode, theme, toggle } = usePortalChartMode();
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
    <div className="mt-5 space-y-3">
      <div className="flex justify-end">
        <button type="button" onClick={toggle} className={theme.toggleBtn} aria-label={mode === "sun" ? "Modo oscuro" : "Modo día"}>
          {mode === "sun" ? <Moon size={14} /> : <Sun size={14} />}
          <span>{mode === "sun" ? "Oscuro" : "Día"}</span>
        </button>
      </div>

      <div className="grid min-w-0 gap-4 lg:grid-cols-2 lg:gap-5">
        <section className={theme.card}>
          <div className="mb-2">
            <h3 className={`text-base font-bold tracking-tight md:text-lg ${theme.title}`}>
              Avance por Etapas
            </h3>
            <p className={`mt-1 text-[0.58rem] font-semibold uppercase tracking-[0.14em] ${theme.muted}`}>
              Distribución del avance físico
            </p>
          </div>

          <div className="relative mx-auto mt-2 h-[15.5rem] w-full max-w-[17rem] sm:h-[17rem] sm:max-w-[18.5rem]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={stageData}
                  dataKey="value"
                  nameKey="name"
                  innerRadius="58%"
                  outerRadius="86%"
                  paddingAngle={3.5}
                  stroke={theme.pieStroke}
                  strokeWidth={3}
                  isAnimationActive
                  animationDuration={1100}
                  animationBegin={120}
                >
                  {stageData.map((item) => (
                    <Cell
                      key={item.name}
                      fill={item.color}
                      style={{ filter: `drop-shadow(0 0 8px ${item.color}66)` }}
                    />
                  ))}
                </Pie>
                <Tooltip
                  cursor={false}
                  content={({ active, payload }) => {
                    if (!active || !payload?.length) return null;
                    const item = payload[0]?.payload as (typeof stageData)[number];
                    return (
                      <div className={theme.tooltip}>
                        <p className={`flex items-center gap-2 text-xs font-semibold ${theme.tooltipTitle}`}>
                          <i
                            className="size-2.5 rounded-full"
                            style={{ background: item.color, boxShadow: `0 0 8px ${item.color}` }}
                          />
                          {item.name}
                        </p>
                        <p className="mt-1.5 text-sm font-bold tabular-nums" style={{ color: item.color }}>
                          {item.complete}% completado
                        </p>
                      </div>
                    );
                  }}
                />
              </PieChart>
            </ResponsiveContainer>

            <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
              <p className={`text-[0.52rem] font-bold uppercase tracking-[0.18em] ${theme.muted}`}>Global</p>
              <p className={`font-editorial mt-1 text-4xl tabular-nums sm:text-5xl ${theme.title}`}>
                {state.progress}%
              </p>
            </div>
          </div>

          <ul className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2.5 sm:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3">
            {stageData.map((item) => (
              <li key={item.name} className={`flex items-center gap-2 text-[0.7rem] font-semibold ${theme.body}`}>
                <i
                  className="size-2.5 shrink-0 rounded-full"
                  style={{ background: item.color, boxShadow: `0 0 8px ${item.color}88` }}
                />
                <span className="truncate">{item.name}</span>
                <span className="ml-auto tabular-nums">{item.complete}%</span>
              </li>
            ))}
          </ul>
        </section>

        <section className={theme.card}>
          <div className="mb-5">
            <h3 className={`text-base font-bold tracking-tight md:text-lg ${theme.title}`}>
              Desglose Presupuestario
            </h3>
            <p className={`mt-1 text-[0.58rem] font-semibold uppercase tracking-[0.14em] ${theme.muted}`}>
              Ejercido por rubro
            </p>
          </div>

          <div className="space-y-4 sm:space-y-5">
            {financeRows.map((row, index) => (
              <div key={row.id} className="group">
                <p className={`mb-2 text-sm font-bold ${theme.title}`}>{row.label}</p>

                <div className="flex items-center gap-2 sm:gap-3">
                  <div
                    className={`relative h-10 min-w-0 flex-1 overflow-hidden rounded-xl sm:h-11 ${theme.track}`}
                  >
                    <div
                      className="absolute inset-y-0 left-0 flex items-center overflow-hidden rounded-[10px] transition-[width] duration-1000 ease-out"
                      style={{
                        width: animated ? `${Math.max(row.percent, 10)}%` : "0%",
                        background: row.gradient,
                        boxShadow: `0 0 18px ${row.glow}`,
                        transitionDelay: `${index * 90}ms`,
                      }}
                    >
                      <span
                        className="pointer-events-none absolute inset-0 opacity-35"
                        style={{
                          background:
                            "linear-gradient(180deg, rgba(255,255,255,0.35) 0%, transparent 42%, rgba(0,0,0,0.18) 100%)",
                        }}
                      />
                      {row.percent >= 32 ? (
                        <span className="relative z-[1] truncate px-2 text-[0.65rem] font-bold tabular-nums tracking-wide text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.65)] sm:px-3 sm:text-[0.72rem]">
                          {currency.format(row.amount)}
                        </span>
                      ) : null}
                    </div>
                  </div>
                  <span className={`w-10 shrink-0 text-right text-[0.72rem] font-bold tabular-nums sm:w-11 sm:text-[0.78rem] ${theme.title}`}>
                    {row.percent}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
