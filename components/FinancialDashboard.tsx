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

const GOLD = "#d4b28c";
const GOLD_SOFT = "#e4c9a8";
const GOLD_DEEP = "#b8925f";
const CHARCOAL = "#3a3a3a";
const STEEL = "#8fa3b5";

const kpiGauges = [
  { label: "Avance general", value: 68, color: GOLD, note: "Obra ejecutada" },
  { label: "SPI", value: 96, displayValue: "0.96", color: GOLD_SOFT, note: "Desempeño de tiempo" },
  { label: "CPI", value: 104, displayValue: "1.04", color: GOLD_DEEP, note: "Desempeño de costo" },
];

const monthlySeries = [
  { month: "Ene", programado: 0.18, ejecutado: 0.16, costos: 0.2 },
  { month: "Feb", programado: 0.35, ejecutado: 0.32, costos: 0.38 },
  { month: "Mar", programado: 0.55, ejecutado: 0.52, costos: 0.62 },
  { month: "Abr", programado: 0.78, ejecutado: 0.74, costos: 0.88 },
  { month: "May", programado: 1.05, ejecutado: 1.02, costos: 1.18 },
  { month: "Jun", programado: 1.32, ejecutado: 1.28, costos: 1.55 },
  { month: "Jul", programado: 1.58, ejecutado: 1.55, costos: 1.83 },
  { month: "Ago", programado: 1.85, ejecutado: 1.72, costos: 2.05 },
  { month: "Sep", programado: 2.15, ejecutado: 1.95, costos: 2.28 },
  { month: "Oct", programado: 2.45, ejecutado: 2.2, costos: 2.5 },
  { month: "Nov", programado: 2.75, ejecutado: 2.45, costos: 2.7 },
  { month: "Dic", programado: 3.0, ejecutado: 2.75, costos: 2.95 },
];

const costBreakdown = [
  { name: "Materiales", amount: 985262, percent: 42, color: GOLD },
  { name: "Mano de obra", amount: 721050, percent: 31, color: GOLD_DEEP },
  { name: "Equipos", amount: 278420, percent: 12, color: GOLD_SOFT },
  { name: "Subcontratistas", amount: 214210, percent: 9, color: STEEL },
  { name: "Mano de obra foránea", amount: 140180, percent: 6, color: CHARCOAL },
];

const currency = new Intl.NumberFormat("es-MX", {
  style: "currency",
  currency: "MXN",
  maximumFractionDigits: 0,
});

type TooltipPayload = {
  name?: string;
  value?: number | string;
  color?: string;
  payload?: Record<string, unknown>;
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
    <div className="rounded-xl border border-white/15 bg-[#121212]/95 px-3 py-2.5 shadow-2xl backdrop-blur-md">
      {label ? (
        <p className="mb-2 text-[0.55rem] uppercase tracking-[0.16em] text-[#d4b28c]">{label}</p>
      ) : null}
      <div className="space-y-1.5">
        {payload.map((entry) => (
          <p key={String(entry.name)} className="flex items-center gap-2 text-xs text-white/80">
            <span className="size-2 rounded-full" style={{ background: entry.color }} />
            <span className="text-white/50">{entry.name}:</span>
            <span>
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
    <article className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
      <div className="mb-2 flex items-center justify-between">
        <p className="text-[0.56rem] uppercase tracking-[0.18em] text-white/40">{label}</p>
        <span className="text-[0.52rem] uppercase tracking-[0.14em] text-[#d4b28c]">{note}</span>
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
              <Cell fill="rgba(255,255,255,0.08)" />
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
          <p className="text-3xl font-light tracking-tight text-white">
            {displayValue ?? `${value}%`}
          </p>
        </div>
      </div>
    </article>
  );
}

export default function FinancialDashboard() {
  const totalCost = costBreakdown.reduce((sum, item) => sum + item.amount, 0);

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
          <p className="mt-2 max-w-xl text-sm font-light leading-6 text-white/40">
            Indicadores clave, curva de avance mensual y desglose de costos con datos
            demostrativos coherentes para Residencia Lomas · REY-024.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-2 text-[0.55rem] uppercase tracking-[0.14em] sm:text-right">
          <div className="rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2 sm:min-w-[9rem]">
            <p className="text-white/35">Presupuesto</p>
            <p className="mt-1 text-sm tracking-normal text-white">$3.00M</p>
          </div>
          <div className="rounded-xl border border-white/10 bg-white/[0.03] px-3 py-2 sm:min-w-[9rem]">
            <p className="text-white/35">Ejercido</p>
            <p className="mt-1 text-sm tracking-normal text-[#d4b28c]">$1.83M</p>
          </div>
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-3">
        {kpiGauges.map((gauge) => (
          <DonutGauge key={gauge.label} {...gauge} />
        ))}
      </div>

      <div className="grid gap-5 xl:grid-cols-[1.35fr_0.85fr]">
        <article className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 md:p-6">
          <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h4 className="text-sm font-semibold text-white">Curva de avance y costos</h4>
              <p className="mt-1 text-[0.58rem] text-white/35">Comparativa mensual · Enero a Diciembre</p>
            </div>
            <div className="flex flex-wrap gap-3 text-[0.55rem] uppercase tracking-[0.12em]">
              <LegendDot color={GOLD} label="Programado" />
              <LegendDot color="#f4f4f5" label="Ejecutado" />
              <LegendDot color={STEEL} label="Costos reales" />
            </div>
          </div>
          <div className="h-64 w-full sm:h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={monthlySeries} margin={{ top: 8, right: 8, left: -8, bottom: 0 }}>
                <CartesianGrid stroke="rgba(255,255,255,0.06)" vertical={false} />
                <XAxis
                  dataKey="month"
                  tick={{ fill: "rgba(255,255,255,0.45)", fontSize: 11 }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fill: "rgba(255,255,255,0.35)", fontSize: 11 }}
                  axisLine={false}
                  tickLine={false}
                  tickFormatter={(value: number) => `$${value}M`}
                />
                <Tooltip content={<ChartTooltip suffix="m" />} />
                <Line
                  type="monotone"
                  dataKey="programado"
                  name="Trabajo programado"
                  stroke={GOLD}
                  strokeWidth={2.4}
                  dot={{ r: 3, fill: GOLD, strokeWidth: 0 }}
                  activeDot={{ r: 5 }}
                />
                <Line
                  type="monotone"
                  dataKey="ejecutado"
                  name="Trabajo ejecutado"
                  stroke="#f4f4f5"
                  strokeWidth={2.2}
                  dot={{ r: 3, fill: "#f4f4f5", strokeWidth: 0 }}
                  activeDot={{ r: 5 }}
                />
                <Line
                  type="monotone"
                  dataKey="costos"
                  name="Costos reales"
                  stroke={STEEL}
                  strokeWidth={2.2}
                  strokeDasharray="5 4"
                  dot={{ r: 3, fill: STEEL, strokeWidth: 0 }}
                  activeDot={{ r: 5 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </article>

        <article className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 md:p-6">
          <div className="mb-5 flex items-start justify-between gap-3">
            <div>
              <h4 className="text-sm font-semibold text-white">Desglose de costos</h4>
              <p className="mt-1 text-[0.58rem] text-white/35">
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
                    stroke="none"
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
                <CartesianGrid stroke="rgba(255,255,255,0.05)" horizontal={false} />
                <XAxis
                  type="number"
                  domain={[0, 50]}
                  tick={{ fill: "rgba(255,255,255,0.35)", fontSize: 10 }}
                  axisLine={false}
                  tickLine={false}
                  tickFormatter={(value: number) => `${value}%`}
                />
                <YAxis
                  type="category"
                  dataKey="name"
                  width={108}
                  tick={{ fill: "rgba(255,255,255,0.55)", fontSize: 11 }}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip
                  content={({ active, payload }) => {
                    if (!active || !payload?.length) return null;
                    const item = payload[0]?.payload as (typeof costBreakdown)[number];
                    return (
                      <div className="rounded-xl border border-white/15 bg-[#121212]/95 px-3 py-2.5 text-xs text-white shadow-2xl">
                        <p className="text-[#d4b28c]">{item.name}</p>
                        <p className="mt-1 text-white/80">{currency.format(item.amount)}</p>
                        <p className="mt-1 text-white/45">{item.percent}% del presupuesto</p>
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

          <ul className="mt-4 space-y-2.5 border-t border-white/10 pt-4">
            {costBreakdown.map((item) => (
              <li key={item.name} className="flex items-center justify-between gap-3 text-xs">
                <span className="flex items-center gap-2 text-white/55">
                  <i className="size-2 rounded-full" style={{ background: item.color }} />
                  {item.name}
                </span>
                <span className="text-right text-white/80">
                  {currency.format(item.amount)}
                  <span className="ml-2 text-white/35">{item.percent}%</span>
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
    <span className="inline-flex items-center gap-2 text-white/45">
      <i className="size-2 rounded-full" style={{ background: color }} />
      {label}
    </span>
  );
}
