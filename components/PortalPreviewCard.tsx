"use client";

import { CalendarDays, Clock3, TrendingUp, Wallet } from "lucide-react";
import Link from "next/link";
import PortalOverviewCharts from "@/components/PortalOverviewCharts";
import { useObraStore } from "@/hooks/useObraStore";
import { getPortalChartTheme } from "@/hooks/usePortalChartMode";
import { formatDeliveryLabel, getDaysElapsed, getSpentTotal } from "@/lib/obra-store";

const currencyFull = new Intl.NumberFormat("es-MX", {
  style: "currency",
  currency: "MXN",
  maximumFractionDigits: 0,
});

const previewTheme = getPortalChartTheme("dark");

export default function PortalPreviewCard() {
  const { state } = useObraStore();
  const spent = getSpentTotal(state);
  const progressShare = Math.round((spent / Math.max(state.budgetTotal, 1)) * 100);
  const daysElapsed = getDaysElapsed(state.startDate);
  const deliveryLabel = formatDeliveryLabel(state.deliveryDate);
  const startLabel = new Date(`${state.startDate}T12:00:00`).toLocaleDateString("es-MX", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  return (
    <Link
      href="/portal-cliente"
      className="group block overflow-hidden rounded-[1.5rem] border border-white/10 bg-[#0d0d0d] shadow-[0_60px_160px_rgba(0,0,0,.55)] transition duration-500 hover:border-[#d4b28c]/35"
    >
      <div className="flex items-center justify-between gap-3 border-b border-white/10 bg-white/[.025] px-4 py-4 md:px-5">
        <div className="flex min-w-0 items-center gap-3">
          <div className="grid size-10 shrink-0 place-items-center rounded-xl bg-[#d4b28c] text-xs font-bold text-black">
            R
          </div>
          <div className="min-w-0">
            <p className="font-editorial truncate text-xl leading-tight text-white sm:text-2xl">
              {state.projectName}
            </p>
            <p className="mt-0.5 text-[0.55rem] uppercase tracking-[0.16em] text-white/40">
              {state.projectCode} · Mazatlán, Sin.
            </p>
          </div>
        </div>
        <span className="hidden items-center gap-2 text-[0.52rem] uppercase tracking-[0.14em] text-[#d4b28c] sm:flex">
          <span className="size-1.5 rounded-full bg-[#d4b28c] shadow-[0_0_12px_#d4b28c]" />
          Actualizado
        </span>
      </div>

      <div className="border-b border-white/10 bg-[#0a0a0a] px-4 py-2.5 md:px-5">
        <div className="flex gap-1.5 overflow-x-auto rounded-xl border border-white/10 bg-white/[0.03] p-1">
          {["Resumen", "Finanzas", "Evidencias"].map((tab, index) => (
            <span
              key={tab}
              className={`shrink-0 flex-1 rounded-lg px-3 py-2 text-center text-[0.58rem] font-semibold uppercase tracking-[0.12em] ${
                index === 0
                  ? "bg-[#d4b28c] text-black"
                  : "bg-white/[0.08] text-white/85 ring-1 ring-white/20"
              }`}
            >
              {tab}
            </span>
          ))}
        </div>
      </div>

      <div className="space-y-4 p-4 md:p-5">
        <div>
          <p className="text-[0.55rem] uppercase tracking-[0.18em] text-white/25">
            Bienvenido de nuevo, Daniel
          </p>
          <h3 className="font-editorial mt-2 text-2xl text-white sm:text-3xl">
            Estado del proyecto
          </h3>
          <p className="mt-3 text-[0.55rem] font-semibold uppercase tracking-[0.12em] text-white/45">
            Presupuesto total
          </p>
          <p className="mt-1 font-editorial text-3xl tracking-tight text-[#d4b28c] sm:text-4xl">
            {currencyFull.format(state.budgetTotal)}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-2.5 xl:grid-cols-4">
          <PreviewMetric
            icon={TrendingUp}
            label="Avance general"
            value={`${state.progress}%`}
            note="+7% este mes"
          />
          <PreviewMetric
            icon={Clock3}
            label="Días transcurridos"
            value={`${daysElapsed}`}
            note={`Desde ${startLabel}`}
          />
          <PreviewMetric
            icon={CalendarDays}
            label="Entrega estimada"
            value={deliveryLabel}
            note="En tiempo"
          />
          <PreviewMetric
            icon={Wallet}
            label="Ejercido"
            value={currencyFull.format(spent)}
            note={`${progressShare}% del presupuesto`}
          />
        </div>

        <div className="pointer-events-none">
          <PortalOverviewCharts forcedMode="dark" compact />
        </div>
      </div>
    </Link>
  );
}

function PreviewMetric({
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
    <article className={`${previewTheme.card} !p-3 sm:!p-3.5`}>
      <div className="flex items-center justify-between gap-2">
        <span className={`text-[0.52rem] font-bold uppercase tracking-[0.1em] ${previewTheme.muted}`}>
          {label}
        </span>
        <Icon size={14} className="shrink-0 text-[#ff6b2c]" />
      </div>
      <p className={`mt-3 break-words text-lg font-semibold tracking-tight sm:text-xl ${previewTheme.title}`}>
        {value}
      </p>
      <p className="mt-1.5 text-[0.58rem] font-semibold text-[#027a48]">{note}</p>
    </article>
  );
}
