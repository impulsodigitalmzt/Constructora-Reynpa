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
import { type PortalChartTheme, usePortalChartMode } from "@/hooks/usePortalChartMode";
import { getSpentTotal, withCostPercents } from "@/lib/obra-store";
import { FadeIn, FadeInItem, Stagger } from "@/components/motion/FadeIn";
import KpiCard3D from "@/components/motion/KpiCard3D";
import RevealHeading from "@/components/motion/RevealHeading";

/** Colores brillantes para gráficas (alta visibilidad) */
const CHART = {
  avance: "#00e5a8",
  spi: "#3b82ff",
  cpi: "#ff6b2c",
  programado: "#ff4d6d",
  ejecutado: "#22c55e",
  costos: "#38bdf8",
  trackSun: "#cfcfcf",
  trackDark: "#2a2a2a",
} as const;

const COST_BRIGHT: Record<string, string> = {
  materiales: "#2f6bff",
  manoObra: "#12b76a",
  equipos: "#ff7a1a",
  subcontratistas: "#a855f7",
  manoObraForanea: "#f43f5e",
};

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
  theme,
}: {
  active?: boolean;
  payload?: TooltipPayload[];
  label?: string;
  suffix?: string;
  theme: PortalChartTheme;
}) {
  if (!active || !payload?.length) return null;

  return (
    <div className={theme.tooltip}>
      {label ? (
        <p className="mb-2 text-[0.55rem] font-bold uppercase tracking-[0.14em] text-[#d4b28c]">
          {label}
        </p>
      ) : null}
      <div className="space-y-1.5">
        {payload.map((entry) => (
          <p key={String(entry.name)} className={`flex items-center gap-2 text-xs ${theme.tooltipTitle}`}>
            <span className="size-2.5 rounded-full" style={{ background: entry.color }} />
            <span className={theme.tooltipBody}>{entry.name}:</span>
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
  theme,
  track,
}: {
  label: string;
  value: number;
  displayValue?: string;
  color: string;
  note: string;
  theme: PortalChartTheme;
  track: string;
}) {
  const capped = Math.min(value, 100);
  const data = [
    { name: "done", value: capped },
    { name: "rest", value: Math.max(100 - capped, 0) },
  ];

  return (
    <KpiCard3D className={theme.card}>
      <div className="mb-2 flex items-center justify-between gap-2">
        <p className={`text-[0.62rem] font-bold uppercase tracking-[0.14em] ${theme.body}`}>
          {label}
        </p>
        <span className={`text-[0.55rem] font-semibold uppercase tracking-[0.1em] ${theme.muted}`}>
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
              isAnimationActive
              animationDuration={1100}
              animationEasing="ease-out"
            >
              <Cell fill={color} />
              <Cell fill={track} />
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
          <p className={`text-3xl font-semibold tracking-tight ${theme.title}`}>
            {displayValue ?? `${value}%`}
          </p>
        </div>
      </div>
    </KpiCard3D>
  );
}

export default function FinancialDashboard() {
  const { state } = useObraStore();
  const { mode, theme } = usePortalChartMode();
  const totalCost = getSpentTotal(state);
  const costBreakdown = withCostPercents(state).map((item) => ({
    ...item,
    color: COST_BRIGHT[item.id] ?? item.color,
  }));
  const budgetMillions = state.budgetTotal / 1_000_000;
  const spentMillions = totalCost / 1_000_000;
  const gaugeTrack = mode === "dark" ? CHART.trackDark : CHART.trackSun;

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
    <section className="min-w-0 space-y-4 sm:space-y-5">
      <Stagger className="flex flex-col gap-4">
        <FadeInItem>
          <div className="min-w-0">
            <p className="text-[0.58rem] uppercase tracking-[0.22em] text-[#d4b28c]">
              Control financiero y de avance
            </p>
            <RevealHeading className="font-editorial mt-2 text-2xl text-white sm:text-3xl md:text-4xl">
              Dashboard de obra
            </RevealHeading>
            <p className="mt-2 max-w-xl text-sm font-light leading-6 text-white/50">
              Datos en vivo desde el panel de residentes. {state.projectName} · {state.projectCode}.
            </p>
          </div>
        </FadeInItem>

        <FadeInItem>
          <div className="grid w-full grid-cols-2 gap-2 sm:max-w-md sm:w-auto sm:gap-3">
            <KpiCard3D className={`${theme.card} !p-3 sm:!px-4 sm:!py-4`}>
              <p className={`text-[0.58rem] font-bold uppercase tracking-[0.12em] sm:text-[0.68rem] sm:tracking-[0.14em] ${theme.muted}`}>
                Presupuesto
              </p>
              <p className={`mt-1.5 font-editorial text-2xl font-semibold tracking-luxury sm:mt-2 sm:text-4xl ${theme.title}`}>
                ${budgetMillions.toFixed(2)}
                <span className={`ml-0.5 text-base sm:text-xl ${theme.muted}`}>M</span>
              </p>
            </KpiCard3D>
            <KpiCard3D
              className={`${theme.card} !p-3 sm:!px-4 sm:!py-4 ${
                mode === "dark" ? "border-[#ff6b2c]/40" : "border-[#ff6b2c]/50"
              }`}
            >
              <p className="text-[0.58rem] font-bold uppercase tracking-[0.12em] text-[#ff6b2c] sm:text-[0.68rem] sm:tracking-[0.14em]">
                Ejercido
              </p>
              <p className="mt-1.5 font-editorial text-2xl font-semibold tracking-luxury text-[#ff6b2c] sm:mt-2 sm:text-4xl">
                ${spentMillions.toFixed(2)}
                <span className="ml-0.5 text-base opacity-70 sm:text-xl">M</span>
              </p>
            </KpiCard3D>
          </div>
        </FadeInItem>
      </Stagger>

      <Stagger className="grid gap-4 sm:grid-cols-3" delay={0.1}>
        {kpiGauges.map((gauge) => (
          <FadeInItem key={gauge.label}>
            <DonutGauge {...gauge} theme={theme} track={gaugeTrack} />
          </FadeInItem>
        ))}
      </Stagger>

      <FadeIn delay={0.2} y={24}>
      <div className="grid gap-5 xl:grid-cols-[1.35fr_0.85fr]">
        <article className={theme.card}>
          <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h4 className={`text-sm font-bold ${theme.title}`}>Curva de avance y costos</h4>
              <p className={`mt-1 text-[0.62rem] font-medium ${theme.muted}`}>
                Comparativa mensual · Enero a Diciembre
              </p>
            </div>
            <div className="flex flex-wrap gap-3 text-[0.58rem] font-bold uppercase tracking-[0.1em]">
              <LegendDot color={CHART.programado} label="Programado" className={theme.body} />
              <LegendDot color={CHART.ejecutado} label="Ejecutado" className={theme.body} />
              <LegendDot color={CHART.costos} label="Costos reales" className={theme.body} />
            </div>
          </div>
          <div className="h-64 w-full sm:h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={state.monthly} margin={{ top: 8, right: 8, left: -8, bottom: 0 }}>
                <CartesianGrid stroke={theme.grid} vertical={false} />
                <XAxis
                  dataKey="month"
                  tick={{ fill: theme.tickMuted, fontSize: 11, fontWeight: 600 }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fill: theme.tickMuted, fontSize: 11 }}
                  axisLine={false}
                  tickLine={false}
                  tickFormatter={(value: number) => `$${value}M`}
                />
                <Tooltip content={<ChartTooltip suffix="m" theme={theme} />} />
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

        <article className={theme.card}>
          <div className="mb-5 flex items-start justify-between gap-3">
            <div>
              <h4 className={`text-sm font-bold ${theme.title}`}>Desglose de costos</h4>
              <p className={`mt-1 text-[0.62rem] font-medium ${theme.muted}`}>
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
                    stroke={theme.pieStroke}
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
                <CartesianGrid stroke={theme.grid} horizontal={false} />
                <XAxis
                  type="number"
                  domain={[0, Math.max(...costBreakdown.map((item) => item.percent), 50)]}
                  tick={{ fill: theme.tickMuted, fontSize: 10, fontWeight: 600 }}
                  axisLine={false}
                  tickLine={false}
                  tickFormatter={(value: number) => `${value}%`}
                />
                <YAxis
                  type="category"
                  dataKey="name"
                  width={88}
                  tick={{ fill: theme.tick, fontSize: 10, fontWeight: 600 }}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip
                  content={({ active, payload }) => {
                    if (!active || !payload?.length) return null;
                    const item = payload[0]?.payload as (typeof costBreakdown)[number];
                    return (
                      <div className={`${theme.tooltip} text-xs`}>
                        <p className="font-bold" style={{ color: item.color }}>
                          {item.name}
                        </p>
                        <p className={`mt-1 font-semibold ${theme.tooltipTitle}`}>
                          {currency.format(item.amount)}
                        </p>
                        <p className={`mt-1 ${theme.tooltipBody}`}>{item.percent}% del ejercido</p>
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

          <ul className={`mt-4 space-y-2.5 border-t-2 pt-4 ${theme.hairline}`}>
            {costBreakdown.map((item) => (
              <li key={item.name} className="flex items-center justify-between gap-3 text-xs">
                <span className={`flex items-center gap-2 font-semibold ${theme.body}`}>
                  <i className="size-2.5 rounded-full" style={{ background: item.color }} />
                  {item.name}
                </span>
                <span className={`text-right font-semibold ${theme.title}`}>
                  {currency.format(item.amount)}
                  <span className={`ml-2 ${theme.muted}`}>{item.percent}%</span>
                </span>
              </li>
            ))}
          </ul>
        </article>
      </div>
      </FadeIn>
    </section>
  );
}

function LegendDot({
  color,
  label,
  className,
}: {
  color: string;
  label: string;
  className: string;
}) {
  return (
    <span className={`inline-flex items-center gap-2 ${className}`}>
      <i className="size-2.5 rounded-full" style={{ background: color }} />
      {label}
    </span>
  );
}
