"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useObraStore } from "@/hooks/useObraStore";
import { getSpentTotal, withCostPercents } from "@/lib/obra-store";

/** Colores brillantes para gráficas (alta visibilidad) */
const CHART = {
  avance: "#00e5a8",
  spi: "#3b82ff",
  cpi: "#ff6b2c",
  programado: "#ff4d6d",
  ejecutado: "#22c55e",
  costos: "#38bdf8",
  track: "#cfcfcf",
} as const;

const COST_BRIGHT: Record<string, string> = {
  materiales: "#2f6bff",
  manoObra: "#12b76a",
  equipos: "#ff7a1a",
  subcontratistas: "#a855f7",
  manoObraForanea: "#f43f5e",
};

const cardClass =
  "rounded-2xl border-[3px] border-[#b8b8b8] bg-[#e9e9e9] p-5 shadow-[0_8px_24px_rgba(0,0,0,0.25)]";

const currency = new Intl.NumberFormat("es-MX", {
  style: "currency",
  currency: "MXN",
  maximumFractionDigits: 0,
});

type TooltipPayload = {
  name?: string;
  value?: number | string;
  color?: string;
};

function ChartTooltip({
  active,
  payload,
  label,
  suffix = "",
}: {
  active?: boolean;
  payload?: TooltipPayload[];
  label?: string;
  suffix?: string;
}) {
  if (!active || !payload?.length) return null;

  return (
    <div className="rounded-xl border-2 border-[#b8b8b8] bg-white px-3 py-2.5 shadow-xl">
      {label ? (
        <p className="mb-2 text-[0.55rem] font-bold uppercase tracking-[0.14em] text-[#8a6a3d]">
          {label}
        </p>
      ) : null}
      <div className="space-y-1.5">
        {payload.map((entry) => (
          <p key={String(entry.name)} className="flex items-center gap-2 text-xs text-[#1a1a1a]">
            <span className="size-2.5 rounded-full" style={{ background: entry.color }} />
            <span className="text-[#555]">{entry.name}:</span>
            <span className="font-semibold">
              {typeof entry.value === "number"
                ? suffix === "m"
                  ? `$${entry.value.toFixed(2)}M`
                  : suffix === "%"
                    ? `${entry.value}%`
                    : entry.value
                : entry.value}
            </span>
          </p>
        ))}
      </div>
    </div>
  );
}

function DonutGauge({
  label,
  value,
  displayValue,
  color,
  note,
}: {
  label: string;
  value: number;
  displayValue?: string;
  color: string;
  note: string;
}) {
  const capped = Math.min(value, 100);
  const data = [
    { name: "done", value: capped },
    { name: "rest", value: Math.max(100 - capped, 0) },
  ];

  return (
    <article className={cardClass}>
      <div className="mb-2 flex items-center justify-between gap-2">
        <p className="text-[0.62rem] font-bold uppercase tracking-[0.14em] text-[#1a1a1a]">
          {label}
        </p>
        <span className="text-[0.55rem] font-semibold uppercase tracking-[0.1em] text-[#555]">
          {note}
        </span>
      </div>
      <div className="relative mx-auto h-40 w-full max-w-[11rem]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              innerRadius="68%"
              outerRadius="88%"
              startAngle={90}
              endAngle={-270}
              stroke="none"
              paddingAngle={1}
            >
              <Cell fill={color} />
              <Cell fill={CHART.track} />
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
          <p className="text-3xl font-semibold tracking-tight text-[#0a0a0a]">
            {displayValue ?? `${value}%`}
          </p>
        </div>
      </div>
    </article>
  );
}

export default function FinancialDashboard() {
  const { state } = useObraStore();
  const totalCost = getSpentTotal(state);
  const costBreakdown = withCostPercents(state).map((item) => ({
    ...item,
    color: COST_BRIGHT[item.id] ?? item.color,
  }));
  const budgetMillions = state.budgetTotal / 1_000_000;
  const spentMillions = totalCost / 1_000_000;

  const kpiGauges = [
    {
      label: "Avance general",
      value: state.progress,
      color: CHART.avance,
      note: "Obra ejecutada",
    },
    {
      label: "SPI",
      value: Math.round(state.spi * 100),
      displayValue: state.spi.toFixed(2),
      color: CHART.spi,
      note: "Desempeño de tiempo",
    },
    {
      label: "CPI",
      value: Math.round(state.cpi * 100),
      displayValue: state.cpi.toFixed(2),
      color: CHART.cpi,
      note: "Desempeño de costo",
    },
  ];

  return (
    <section className="space-y-5">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-[0.58rem] uppercase tracking-[0.18em] text-[#d4b28c]">
            Control financiero y de avance
          </p>
          <h3 className="font-editorial mt-2 text-3xl text-white md:text-4xl">
            Dashboard de obra
          </h3>
          <p className="mt-2 max-w-xl text-sm font-light leading-6 text-white/50">
            Datos en vivo desde el panel de residentes. {state.projectName} · {state.projectCode}.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-2 text-[0.55rem] uppercase tracking-[0.14em] sm:text-right">
          <div className="rounded-xl border-[3px] border-[#b8b8b8] bg-[#e9e9e9] px-3 py-2.5 sm:min-w-[9rem]">
            <p className="font-bold text-[#555]">Presupuesto</p>
            <p className="mt-1 text-sm font-semibold tracking-normal text-[#0a0a0a]">
              ${budgetMillions.toFixed(2)}M
            </p>
          </div>
          <div className="rounded-xl border-[3px] border-[#b8b8b8] bg-[#e9e9e9] px-3 py-2.5 sm:min-w-[9rem]">
            <p className="font-bold text-[#555]">Ejercido</p>
            <p className="mt-1 text-sm font-semibold tracking-normal text-[#ff6b2c]">
              ${spentMillions.toFixed(2)}M
            </p>
          </div>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        {kpiGauges.map((gauge) => (
          <DonutGauge key={gauge.label} {...gauge} />
        ))}
      </div>

      <div className="grid gap-5 xl:grid-cols-[1.35fr_0.85fr]">
        <article className={`${cardClass} md:p-6`}>
          <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h4 className="text-sm font-bold text-[#0a0a0a]">Curva de avance y costos</h4>
              <p className="mt-1 text-[0.62rem] font-medium text-[#555]">
                Comparativa mensual · Enero a Diciembre
              </p>
            </div>
            <div className="flex flex-wrap gap-3 text-[0.58rem] font-bold uppercase tracking-[0.1em]">
              <LegendDot color={CHART.programado} label="Programado" />
              <LegendDot color={CHART.ejecutado} label="Ejecutado" />
              <LegendDot color={CHART.costos} label="Costos reales" />
            </div>
          </div>
          <div className="h-64 w-full sm:h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={state.monthly} margin={{ top: 8, right: 8, left: -8, bottom: 0 }}>
                <CartesianGrid stroke="rgba(0,0,0,0.08)" vertical={false} />
                <XAxis
                  dataKey="month"
                  tick={{ fill: "#444", fontSize: 11, fontWeight: 600 }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fill: "#666", fontSize: 11 }}
                  axisLine={false}
                  tickLine={false}
                  tickFormatter={(value: number) => `$${value}M`}
                />
                <Tooltip content={<ChartTooltip suffix="m" />} />
                <Line
                  type="monotone"
                  dataKey="programado"
                  name="Trabajo programado"
                  stroke={CHART.programado}
                  strokeWidth={3}
                  dot={{ r: 4, fill: CHART.programado, strokeWidth: 0 }}
                  activeDot={{ r: 6 }}
                />
                <Line
                  type="monotone"
                  dataKey="ejecutado"
                  name="Trabajo ejecutado"
                  stroke={CHART.ejecutado}
                  strokeWidth={3}
                  dot={{ r: 4, fill: CHART.ejecutado, strokeWidth: 0 }}
                  activeDot={{ r: 6 }}
                />
                <Line
                  type="monotone"
                  dataKey="costos"
                  name="Costos reales"
                  stroke={CHART.costos}
                  strokeWidth={3}
                  strokeDasharray="6 4"
                  dot={{ r: 4, fill: CHART.costos, strokeWidth: 0 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </article>

        <article className={`${cardClass} md:p-6`}>
          <div className="mb-5 flex items-start justify-between gap-3">
            <div>
              <h4 className="text-sm font-bold text-[#0a0a0a]">Desglose de costos</h4>
              <p className="mt-1 text-[0.62rem] font-medium text-[#555]">
                Total acumulado · {currency.format(totalCost)}
              </p>
            </div>
            <div className="relative h-24 w-24 shrink-0">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={costBreakdown}
                    dataKey="percent"
                    innerRadius="58%"
                    outerRadius="88%"
                    paddingAngle={2}
                    stroke="#e9e9e9"
                    strokeWidth={2}
                  >
                    {costBreakdown.map((item) => (
                      <Cell key={item.name} fill={item.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="h-56 w-full sm:h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                layout="vertical"
                data={costBreakdown}
                margin={{ top: 0, right: 18, left: 8, bottom: 0 }}
              >
                <CartesianGrid stroke="rgba(0,0,0,0.06)" horizontal={false} />
                <XAxis
                  type="number"
                  domain={[0, Math.max(...costBreakdown.map((item) => item.percent), 50)]}
                  tick={{ fill: "#555", fontSize: 10, fontWeight: 600 }}
                  axisLine={false}
                  tickLine={false}
                  tickFormatter={(value: number) => `${value}%`}
                />
                <YAxis
                  type="category"
                  dataKey="name"
                  width={108}
                  tick={{ fill: "#1a1a1a", fontSize: 11, fontWeight: 600 }}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip
                  content={({ active, payload }) => {
                    if (!active || !payload?.length) return null;
                    const item = payload[0]?.payload as (typeof costBreakdown)[number];
                    return (
                      <div className="rounded-xl border-2 border-[#b8b8b8] bg-white px-3 py-2.5 text-xs shadow-xl">
                        <p className="font-bold" style={{ color: item.color }}>
                          {item.name}
                        </p>
                        <p className="mt-1 font-semibold text-[#0a0a0a]">
                          {currency.format(item.amount)}
                        </p>
                        <p className="mt-1 text-[#555]">{item.percent}% del ejercido</p>
                      </div>
                    );
                  }}
                />
                <Bar dataKey="percent" radius={[0, 8, 8, 0]} barSize={16}>
                  {costBreakdown.map((item) => (
                    <Cell key={item.name} fill={item.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          <ul className="mt-4 space-y-2.5 border-t-2 border-[#cfcfcf] pt-4">
            {costBreakdown.map((item) => (
              <li key={item.name} className="flex items-center justify-between gap-3 text-xs">
                <span className="flex items-center gap-2 font-semibold text-[#1a1a1a]">
                  <i className="size-2.5 rounded-full" style={{ background: item.color }} />
                  {item.name}
                </span>
                <span className="text-right font-semibold text-[#0a0a0a]">
                  {currency.format(item.amount)}
                  <span className="ml-2 text-[#555]">{item.percent}%</span>
                </span>
              </li>
            ))}
          </ul>
        </article>
      </div>
    </section>
  );
}

function LegendDot({ color, label }: { color: string; label: string }) {
  return (
    <span className="inline-flex items-center gap-2 text-[#1a1a1a]">
      <i className="size-2.5 rounded-full" style={{ background: color }} />
      {label}
    </span>
  );
}
