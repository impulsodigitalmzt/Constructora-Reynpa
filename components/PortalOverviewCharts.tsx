"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useObraStore } from "@/hooks/useObraStore";
import { getSpentTotal } from "@/lib/obra-store";

const currency = new Intl.NumberFormat("es-MX", {
  style: "currency",
  currency: "MXN",
  maximumFractionDigits: 0,
});

const DONUT_FOCUS = ["Cimentación", "Estructura", "Instalaciones", "Acabados"];

export default function PortalOverviewCharts() {
  const { state } = useObraStore();
  const spent = getSpentTotal(state);

  const stageData = state.stages
    .filter((stage) => DONUT_FOCUS.includes(stage.label))
    .map((stage) => ({
      name: stage.label,
      value: Math.max(stage.value, 1),
      complete: stage.value,
      color: stage.color,
    }));

  const financeData = state.costs.map((cost) => ({
    name: cost.name.replace("Mano de obra foránea", "MO foránea"),
    presupuesto: Math.round(cost.budget / 1000) / 1000,
    ejercido: Math.round(cost.amount / 1000) / 1000,
    presupuestoRaw: cost.budget,
    ejercidoRaw: cost.amount,
    color: cost.color,
  }));

  const avgStage =
    stageData.length > 0
      ? Math.round(stageData.reduce((sum, s) => sum + s.complete, 0) / stageData.length)
      : state.progress;

  return (
    <div className="mt-5 grid gap-5 lg:grid-cols-2">
      <section className="rounded-xl border border-white/8 bg-white/[.025] p-5 md:p-6">
        <div className="mb-5 flex items-start justify-between gap-3">
          <div>
            <h3 className="font-semibold text-white">Avance por categoría</h3>
            <p className="mt-1 text-[0.58rem] text-white/30">
              Cimentación · Estructura · Instalaciones · Acabados
            </p>
          </div>
          <span className="rounded-full border border-[#d4b28c]/30 bg-[#d4b28c]/10 px-3 py-1 text-[0.52rem] uppercase tracking-[0.14em] text-[#d4b28c]">
            En vivo
          </span>
        </div>

        <div className="grid items-center gap-6 sm:grid-cols-[1fr_1.05fr]">
          <div className="relative mx-auto h-52 w-full max-w-[14rem]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={stageData}
                  dataKey="value"
                  innerRadius="62%"
                  outerRadius="88%"
                  paddingAngle={3}
                  stroke="none"
                >
                  {stageData.map((item) => (
                    <Cell key={item.name} fill={item.color} />
                  ))}
                </Pie>
                <Tooltip
                  content={({ active, payload }) => {
                    if (!active || !payload?.length) return null;
                    const item = payload[0]?.payload as (typeof stageData)[number];
                    return (
                      <div className="rounded-xl border border-white/15 bg-[#121212]/95 px-3 py-2.5 text-xs shadow-2xl">
                        <p className="text-[#d4b28c]">{item.name}</p>
                        <p className="mt-1 text-white/80">{item.complete}% completado</p>
                      </div>
                    );
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
              <p className="text-[0.52rem] uppercase tracking-[0.16em] text-white/35">Promedio</p>
              <p className="font-editorial text-3xl text-white">{avgStage}%</p>
            </div>
          </div>

          <ul className="space-y-3">
            {stageData.map((item) => (
              <li key={item.name}>
                <div className="mb-1.5 flex items-center justify-between gap-2 text-xs">
                  <span className="flex items-center gap-2 text-white/60">
                    <i className="size-2.5 rounded-full" style={{ background: item.color }} />
                    {item.name}
                  </span>
                  <span className="tabular-nums text-white/85">{item.complete}%</span>
                </div>
                <div className="h-1 overflow-hidden rounded-full bg-white/10">
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{ width: `${item.complete}%`, background: item.color }}
                  />
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="rounded-xl border border-white/8 bg-white/[.025] p-5 md:p-6">
        <div className="mb-5 flex items-start justify-between gap-3">
          <div>
            <h3 className="font-semibold text-white">Desglose financiero</h3>
            <p className="mt-1 text-[0.58rem] text-white/30">
              Presupuesto vs. ejercido por rubro · {currency.format(spent)} ejercidos
            </p>
          </div>
          <div className="hidden gap-3 text-[0.52rem] uppercase tracking-[0.12em] sm:flex">
            <span className="inline-flex items-center gap-1.5 text-white/40">
              <i className="size-2 rounded-full bg-white/35" /> Presupuesto
            </span>
            <span className="inline-flex items-center gap-1.5 text-white/40">
              <i className="size-2 rounded-full bg-[#d4b28c]" /> Ejercido
            </span>
          </div>
        </div>

        <div className="h-64 w-full sm:h-72">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={financeData}
              margin={{ top: 4, right: 4, left: -12, bottom: 8 }}
              barGap={4}
              barCategoryGap="22%"
            >
              <CartesianGrid stroke="rgba(255,255,255,0.06)" vertical={false} />
              <XAxis
                dataKey="name"
                tick={{ fill: "rgba(255,255,255,0.4)", fontSize: 10 }}
                axisLine={false}
                tickLine={false}
                interval={0}
                angle={-18}
                textAnchor="end"
                height={48}
              />
              <YAxis
                tick={{ fill: "rgba(255,255,255,0.3)", fontSize: 10 }}
                axisLine={false}
                tickLine={false}
                tickFormatter={(value: number) => `$${value}M`}
              />
              <Tooltip
                cursor={{ fill: "rgba(255,255,255,0.04)" }}
                content={({ active, payload }) => {
                  if (!active || !payload?.length) return null;
                  const item = payload[0]?.payload as (typeof financeData)[number];
                  return (
                    <div className="rounded-xl border border-white/15 bg-[#121212]/95 px-3 py-2.5 text-xs shadow-2xl">
                      <p className="mb-2 text-[#d4b28c]">{item.name}</p>
                      <p className="text-white/55">
                        Presupuesto:{" "}
                        <span className="text-white">{currency.format(item.presupuestoRaw)}</span>
                      </p>
                      <p className="mt-1 text-white/55">
                        Ejercido:{" "}
                        <span className="text-white">{currency.format(item.ejercidoRaw)}</span>
                      </p>
                    </div>
                  );
                }}
              />
              <Bar dataKey="presupuesto" name="Presupuesto" fill="rgba(255,255,255,0.22)" radius={[6, 6, 0, 0]} />
              <Bar dataKey="ejercido" name="Ejercido" fill="#d4b28c" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </section>
    </div>
  );
}
