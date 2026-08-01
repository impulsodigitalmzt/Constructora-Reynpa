"use client";

import { CalendarDays, CircleDollarSign, TrendingUp } from "lucide-react";
import Link from "next/link";
import { useObraStore } from "@/hooks/useObraStore";
import { getSpentTotal } from "@/lib/obra-store";

export default function PortalPreviewCard() {
  const { state } = useObraStore();
  const spent = getSpentTotal(state);
  const spentMillions = (spent / 1_000_000).toFixed(2);
  const budgetMillions = (state.budgetTotal / 1_000_000).toFixed(1);
  const progressShare = Math.round((spent / Math.max(state.budgetTotal, 1)) * 100);
  const estructura = state.stages.find((stage) => stage.label === "Estructura");
  const estructuraValue = estructura?.value ?? 0;
  const estructuraColor = estructura?.color || "#f5c542";

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
              {state.projectCode} · En ejecución
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
              className={`shrink-0 rounded-lg px-3 py-2 text-[0.58rem] font-semibold uppercase tracking-[0.12em] ${
                index === 0
                  ? "bg-[#d4b28c] text-black"
                  : "text-white/40"
              }`}
            >
              {tab}
            </span>
          ))}
        </div>
      </div>

      <div className="space-y-3 p-4 md:p-5">
        <div className="mb-1 flex items-end justify-between gap-2">
          <div>
            <p className="text-[0.52rem] uppercase tracking-[0.16em] text-white/30">
              Estado del proyecto
            </p>
            <p className="font-editorial mt-1 text-lg text-white">Vista ejecutiva</p>
          </div>
        </div>

        <div className="grid gap-2.5 sm:grid-cols-3">
          <PreviewMetric
            icon={TrendingUp}
            label="Avance general"
            value={`${state.progress}%`}
            note="+7% este mes"
          />
          <PreviewMetric
            icon={CircleDollarSign}
            label="Presupuesto ejercido"
            value={`${progressShare}%`}
            note={`$${spentMillions}M de $${budgetMillions}M`}
          />
          <PreviewMetric
            icon={CalendarDays}
            label="Entrega estimada"
            value="18 Oct"
            note="En tiempo"
          />
        </div>

        <div className="rounded-2xl border-[3px] border-[#b8b8b8] bg-[#e9e9e9] p-4 shadow-[0_8px_24px_rgba(0,0,0,0.2)]">
          <div className="mb-2.5 flex items-center justify-between gap-2 text-[0.68rem] font-bold uppercase tracking-[0.1em] text-[#1a1a1a]">
            <span className="flex items-center gap-2">
              <i className="size-2 rounded-full" style={{ background: estructuraColor }} />
              Estructura
            </span>
            <span className="tabular-nums">{estructuraValue}%</span>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-[#d0d0d0]">
            <div
              className="h-full rounded-full transition-all duration-700"
              style={{
                width: `${estructuraValue}%`,
                background: `linear-gradient(90deg, #b8925f 0%, ${estructuraColor} 100%)`,
              }}
            />
          </div>
          <p className="mt-2 text-[0.58rem] font-medium text-[#555]">
            Sincronizado desde panel de residentes
          </p>
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
    <article className="min-w-0 rounded-2xl border-[3px] border-[#b8b8b8] bg-[#e9e9e9] p-3.5 shadow-[0_8px_24px_rgba(0,0,0,0.2)] sm:p-4">
      <div className="flex items-center justify-between gap-2">
        <span className="text-[0.52rem] font-bold uppercase tracking-[0.1em] text-[#555]">
          {label}
        </span>
        <Icon size={14} className="shrink-0 text-[#ff6b2c]" />
      </div>
      <p className="mt-3 text-xl font-semibold tracking-tight text-[#0a0a0a] sm:text-2xl">
        {value}
      </p>
      <p className="mt-1.5 text-[0.58rem] font-semibold text-[#027a48]">{note}</p>
    </article>
  );
}
