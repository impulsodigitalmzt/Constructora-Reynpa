"use client";

import {
  BookOpen,
  Camera,
  ChevronDown,
  ClipboardList,
  HardHat,
  ImagePlus,
  Package,
  Save,
  Trash2,
  Video,
} from "lucide-react";
import { FormEvent, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CurrencyInput } from "@/components/admin/CurrencyInput";
import { useAdminTheme } from "@/components/admin/admin-theme";
import { FadeIn } from "@/components/motion/FadeIn";
import HoverLift3D from "@/components/motion/HoverLift3D";
import SlideTitle from "@/components/motion/SlideTitle";
import RippleButton from "@/components/motion/RippleButton";
import {
  BITACORA_TIPOS,
  type BitacoraEntry,
  type BitacoraTipo,
  type ChangeOrder,
  type ChangeOrderStatus,
  type CostCategory,
  type EvidenceItem,
  type MaterialReceipt,
  type ObraState,
  fileToDataUrl,
  getSpentTotal,
} from "@/lib/obra-store";
import { tabSlide } from "@/lib/motion";

const currency = new Intl.NumberFormat("es-MX", {
  style: "currency",
  currency: "MXN",
  maximumFractionDigits: 0,
});

const STAGE_ACCENTS = ["#12b76a", "#2e90fa", "#f5a524", "#f79009", "#9e77ed"];

type TabId = "metricas" | "evidencias" | "bitacora" | "extras" | "materiales";

const TAB_ORDER: Record<TabId, number> = {
  metricas: 0,
  evidencias: 1,
  bitacora: 2,
  extras: 3,
  materiales: 4,
};

const TABS: { id: TabId; label: string; icon: typeof HardHat }[] = [
  { id: "metricas", label: "Métricas", icon: HardHat },
  { id: "evidencias", label: "Evidencias", icon: Camera },
  { id: "bitacora", label: "Bitácora", icon: BookOpen },
  { id: "extras", label: "Extras", icon: ClipboardList },
  { id: "materiales", label: "Materiales", icon: Package },
];

export function AdminTabs({
  state,
  save,
  onStatus,
  onError,
}: {
  state: ObraState;
  save: (next: ObraState | ((prev: ObraState) => ObraState)) => void;
  onStatus: (message: string) => void;
  onError: (message: string) => void;
}) {
  const t = useAdminTheme();
  const [tab, setTab] = useState<TabId>("metricas");
  const directionRef = useRef(0);

  const changeTab = (next: TabId) => {
    directionRef.current = TAB_ORDER[next] >= TAB_ORDER[tab] ? 1 : -1;
    setTab(next);
  };

  return (
    <div className="min-w-0 space-y-5 pb-8">
      <nav className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {TABS.map(({ id, label, icon: Icon }) => (
          <motion.button
            key={id}
            type="button"
            onClick={() => changeTab(id)}
            whileHover={{ y: -1, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`inline-flex min-h-10 shrink-0 items-center gap-1.5 rounded-full px-3 text-[0.62rem] font-semibold uppercase tracking-[0.08em] transition sm:gap-2 sm:px-3.5 sm:text-[0.68rem] ${
              tab === id ? t.tabActive : t.tabIdle
            }`}
          >
            <Icon size={14} className="shrink-0" />
            {label}
          </motion.button>
        ))}
      </nav>

      <div className="relative min-w-0 overflow-hidden">
        <AnimatePresence mode="wait" custom={directionRef.current}>
          <motion.div
            key={tab}
            custom={directionRef.current}
            variants={tabSlide}
            initial="enter"
            animate="center"
            exit="exit"
          >
            {tab === "metricas" ? <MetricsTab state={state} save={save} onStatus={onStatus} /> : null}
            {tab === "evidencias" ? (
              <EvidenceTab state={state} save={save} onStatus={onStatus} onError={onError} />
            ) : null}
            {tab === "bitacora" ? <BitacoraTab state={state} save={save} onStatus={onStatus} /> : null}
            {tab === "extras" ? <ChangeOrdersTab state={state} save={save} onStatus={onStatus} /> : null}
            {tab === "materiales" ? (
              <MaterialsTab state={state} save={save} onStatus={onStatus} onError={onError} />
            ) : null}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

function MetricsTab({
  state,
  save,
  onStatus,
}: {
  state: ObraState;
  save: (next: ObraState) => void;
  onStatus: (message: string) => void;
}) {
  const t = useAdminTheme();
  const spent = getSpentTotal(state);
  const [costsOpen, setCostsOpen] = useState(true);

  return (
    <div className="space-y-5">
      <FadeIn>
        <HoverLift3D>
          <section className={`overflow-hidden rounded-2xl ${t.elevated}`}>
            <div
              className={`px-5 py-5 sm:px-6 ${
                t.mode === "sun"
                  ? "bg-gradient-to-br from-[#101828] via-[#1d2939] to-[#344054] text-white"
                  : "bg-gradient-to-br from-[#2a241c] via-[#1a1a1a] to-[#121212] text-white"
              }`}
            >
              <p className="text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-[#d4b28c]">
                Métricas rápidas
              </p>
              <div className="mt-4 grid grid-cols-2 gap-3 sm:mt-5 sm:grid-cols-4 sm:gap-4">
                <div className="min-w-0">
                  <p className="text-[0.6rem] uppercase tracking-[0.1em] text-white/45">Avance</p>
                  <p className="mt-1 font-editorial text-3xl tracking-tight text-[#d4b28c] sm:text-4xl">
                    {state.progress}%
                  </p>
                </div>
                <div className="min-w-0">
                  <p className="text-[0.6rem] uppercase tracking-[0.1em] text-white/45">SPI</p>
                  <p className="mt-1 font-editorial text-3xl tracking-tight sm:text-4xl">
                    {state.spi.toFixed(2)}
                  </p>
                </div>
            <div className="min-w-0">
              <p className="text-[0.6rem] uppercase tracking-[0.1em] text-white/45">CPI</p>
              <p className="mt-1 font-editorial text-3xl tracking-tight sm:text-4xl">
                {state.cpi.toFixed(2)}
              </p>
            </div>
            <div className="min-w-0 col-span-2 sm:col-span-1">
              <p className="text-[0.6rem] uppercase tracking-[0.1em] text-white/45">Ejercido</p>
              <p className="mt-1 truncate text-lg font-semibold tracking-tight sm:text-2xl">
                {currency.format(spent)}
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-4 p-4 sm:p-6">
          <label className="block">
            <span className={t.label}>Avance general (%)</span>
            <div className="flex items-center gap-2 sm:gap-3">
              <input
                type="range"
                min={0}
                max={100}
                value={state.progress}
                onChange={(event) => save({ ...state, progress: Number(event.target.value) })}
                className="h-2 min-w-0 flex-1 cursor-pointer appearance-none rounded-full bg-[#eaecf0] accent-[#b8925f]"
              />
              <input
                type="number"
                inputMode="numeric"
                min={0}
                max={100}
                value={state.progress}
                onChange={(event) =>
                  save({
                    ...state,
                    progress: Math.min(100, Math.max(0, Number(event.target.value) || 0)),
                  })
                }
                className={t.inputPct}
              />
            </div>
          </label>

          <div className="grid grid-cols-2 gap-3 sm:flex sm:flex-wrap sm:gap-x-6 sm:gap-y-3">
            <label className="block">
              <span className={t.label}>SPI</span>
              <input
                type="number"
                inputMode="decimal"
                step={0.01}
                value={state.spi}
                onChange={(event) => save({ ...state, spi: Number(event.target.value) || 0 })}
                className={t.inputPct}
              />
            </label>
            <label className="block">
              <span className={t.label}>CPI</span>
              <input
                type="number"
                inputMode="decimal"
                step={0.01}
                value={state.cpi}
                onChange={(event) => save({ ...state, cpi: Number(event.target.value) || 0 })}
                className={t.inputPct}
              />
            </label>
            <label className="col-span-2 block sm:col-span-1">
              <span className={t.label}>Presupuesto total (MXN)</span>
              <CurrencyInput
                value={state.budgetTotal}
                onChange={(budgetTotal) => save({ ...state, budgetTotal })}
                className={t.inputAmt}
              />
            </label>
            <label className="col-span-2 block sm:col-span-1">
              <span className={t.label}>Inicio de obra</span>
              <input
                type="date"
                value={state.startDate}
                onChange={(event) => save({ ...state, startDate: event.target.value })}
                className={`${t.input} w-full max-w-[10.5rem]`}
              />
            </label>
            <label className="col-span-2 block sm:col-span-1">
              <span className={t.label}>Entrega estimada</span>
              <input
                type="date"
                value={state.deliveryDate}
                onChange={(event) => save({ ...state, deliveryDate: event.target.value })}
                className={`${t.input} w-full max-w-[10.5rem]`}
              />
            </label>
          </div>
        </div>
      </section>
        </HoverLift3D>
      </FadeIn>

      {/* Etapas */}
      <section className={`min-w-0 rounded-2xl p-4 sm:p-6 ${t.surface}`}>
        <div className="mb-4 flex items-end justify-between gap-3">
          <div>
            <SlideTitle from="left" distance={36} className={`text-lg font-semibold tracking-tight ${t.title}`}>
              Avance por etapa
            </SlideTitle>
            <p className={`mt-1 text-sm ${t.muted}`}>Alimenta el donut del portal</p>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
          {state.stages.map((stage, index) => {
            const accent = STAGE_ACCENTS[index % STAGE_ACCENTS.length];
            return (
              <div
                key={stage.label}
                className={`flex items-center justify-between gap-3 rounded-xl px-3.5 py-3 ${
                  t.mode === "sun" ? "bg-[#f9fafb] ring-1 ring-black/[0.04]" : "bg-white/[0.03] ring-1 ring-white/8"
                }`}
              >
                <span
                  className="flex min-w-0 items-center gap-2 text-[0.82rem] font-semibold"
                  style={{ color: accent }}
                >
                  <i className="size-2 shrink-0 rounded-full" style={{ background: accent }} />
                  <span className="truncate">{stage.label}</span>
                </span>
                <div className="flex shrink-0 items-center gap-1.5">
                  <input
                    type="number"
                    inputMode="numeric"
                    min={0}
                    max={100}
                    value={stage.value}
                    onChange={(event) => {
                      const value = Math.min(100, Math.max(0, Number(event.target.value) || 0));
                      save({
                        ...state,
                        stages: state.stages.map((item, i) =>
                          i === index ? { ...item, value } : item,
                        ),
                      });
                    }}
                    className={t.inputPct}
                  />
                  <span className={`text-sm font-semibold ${t.muted}`}>%</span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Costos colapsable + grid */}
      <section className={`rounded-2xl ${t.surface}`}>
        <button
          type="button"
          onClick={() => setCostsOpen((open) => !open)}
          className="flex w-full items-center justify-between gap-3 px-5 py-4 text-left sm:px-6"
        >
          <div>
            <SlideTitle from="left" distance={36} className={`text-lg font-semibold tracking-tight ${t.title}`}>
              Costos por categoría
            </SlideTitle>
            <p className={`mt-1 text-sm ${t.muted}`}>
              {state.costs.length} rubros · toca para {costsOpen ? "ocultar" : "editar"}
            </p>
          </div>
          <ChevronDown
            size={20}
            className={`shrink-0 transition-transform ${t.muted} ${costsOpen ? "rotate-180" : ""}`}
          />
        </button>

        {costsOpen ? (
          <div className={`border-t px-5 pb-5 pt-4 sm:px-6 ${t.hairline}`}>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {state.costs.map((cost) => (
                <CostCard
                  key={cost.id}
                  cost={cost}
                  onChange={(patch) =>
                    save({
                      ...state,
                      costs: state.costs.map((item) =>
                        item.id === cost.id ? { ...item, ...patch } : item,
                      ),
                    })
                  }
                />
              ))}
            </div>
          </div>
        ) : null}
      </section>

      {/* CTA sticky en móvil */}
      <div className="pointer-events-none sticky bottom-0 z-30 -mx-1 mt-2 px-1 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-4 sm:static sm:mx-0 sm:mt-0 sm:p-0 sm:pt-0">
        <div
          className={`pointer-events-auto ${
            t.mode === "sun"
              ? "bg-gradient-to-t from-[#f4f5f7] via-[#f4f5f7]/95 to-transparent sm:bg-none"
              : "bg-gradient-to-t from-[#121212] via-[#121212]/95 to-transparent sm:bg-none"
          } pb-1 pt-5 sm:p-0`}
        >
          <RippleButton
            type="button"
            onClick={() => {
              save({ ...state });
              onStatus("Métricas publicadas. El Portal de Clientes ya las refleja.");
            }}
            className={`${t.btnPrimary} w-full shadow-lg shadow-black/10 sm:w-auto`}
          >
            <Save size={16} /> Guardar y publicar
          </RippleButton>
        </div>
      </div>
    </div>
  );
}

function CostCard({
  cost,
  onChange,
}: {
  cost: CostCategory;
  onChange: (patch: Partial<Pick<CostCategory, "amount" | "budget">>) => void;
}) {
  const t = useAdminTheme();
  const pct = Math.min(100, Math.round((cost.amount / Math.max(cost.budget, 1)) * 100));

  return (
    <div
      className={`rounded-xl p-3.5 ${
        t.mode === "sun" ? "bg-[#f9fafb] ring-1 ring-black/[0.04]" : "bg-white/[0.03] ring-1 ring-white/8"
      }`}
    >
      <div className="mb-3 flex items-center justify-between gap-2">
        <span className={`flex min-w-0 items-center gap-2 text-sm font-semibold ${t.title}`}>
          <i className="size-2.5 shrink-0 rounded-full" style={{ background: cost.color }} />
          <span className="truncate">{cost.name}</span>
        </span>
        <span
          className={`shrink-0 rounded-full px-2 py-0.5 text-[0.65rem] font-semibold ${
            t.mode === "sun" ? "bg-[#ecfdf3] text-[#027a48]" : "bg-emerald-500/15 text-emerald-300"
          }`}
        >
          {pct}%
        </span>
      </div>
      <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-x-4 sm:gap-y-2.5">
        <label className="block min-w-0">
          <span className={t.label}>Presupuesto</span>
          <CurrencyInput
            value={cost.budget}
            onChange={(budget) => onChange({ budget })}
            className={t.inputAmt}
          />
        </label>
        <label className="block min-w-0">
          <span className={t.label}>Ejercido</span>
          <CurrencyInput
            value={cost.amount}
            onChange={(amount) => onChange({ amount })}
            className={t.inputAmt}
          />
        </label>
      </div>
    </div>
  );
}

function EvidenceTab({
  state,
  save,
  onStatus,
  onError,
}: {
  state: ObraState;
  save: (next: ObraState) => void;
  onStatus: (message: string) => void;
  onError: (message: string) => void;
}) {
  const t = useAdminTheme();
  const [publishing, setPublishing] = useState(false);
  const [description, setDescription] = useState("");
  const [preview, setPreview] = useState<{ type: "image" | "video"; dataUrl: string } | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const onFileChange = async (fileList: FileList | null) => {
    const file = fileList?.[0];
    if (!file) return;
    try {
      const dataUrl = await fileToDataUrl(file);
      setPreview({ type: file.type.startsWith("video/") ? "video" : "image", dataUrl });
    } catch (err) {
      onError(err instanceof Error ? err.message : "No se pudo cargar el archivo.");
      setPreview(null);
    }
  };

  const publishEvidence = () => {
    if (!preview) {
      onError("Captura o selecciona una foto/video antes de publicar.");
      return;
    }
    if (!description.trim()) {
      onError("Agrega una breve descripción.");
      return;
    }
    setPublishing(true);
    const item: EvidenceItem = {
      id: `ev-${Date.now()}`,
      type: preview.type,
      description: description.trim(),
      dataUrl: preview.dataUrl,
      createdAt: new Date().toISOString(),
      author: "Residente de obra",
    };
    save({ ...state, evidences: [item, ...state.evidences].slice(0, 12) });
    setDescription("");
    setPreview(null);
    if (fileRef.current) fileRef.current.value = "";
    onStatus("Evidencia publicada.");
    setPublishing(false);
  };

  return (
    <section className={`min-w-0 space-y-5 rounded-2xl p-4 sm:p-6 ${t.surface}`}>
      <div>
        <SlideTitle from="left" distance={36} className={`text-lg font-semibold ${t.title}`}>
          Evidencias desde campo
        </SlideTitle>
        <p className={`mt-1 text-sm ${t.muted}`}>Foto o video con bitácora breve</p>
      </div>

      <div className="space-y-3">
        <input
          ref={fileRef}
          type="file"
          accept="image/*,video/*"
          capture="environment"
          onChange={(event) => onFileChange(event.target.files)}
          className={t.file}
        />
        <label className="block">
          <span className={t.label}>Descripción</span>
          <textarea
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            rows={3}
            placeholder="Ej. Avance en colado de losa planta alta"
            className={t.textarea}
          />
        </label>
        <RippleButton
          type="button"
          disabled={publishing}
          onClick={publishEvidence}
          className={`${t.btnPrimary} w-full disabled:opacity-60`}
        >
          <ImagePlus size={16} />
          {publishing ? "Publicando…" : "Publicar evidencia"}
        </RippleButton>
      </div>

      <div
        className={`overflow-hidden rounded-xl ${
          t.mode === "sun" ? "bg-[#f2f4f7]" : "bg-black/30"
        }`}
      >
        {preview ? (
          preview.type === "image" ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={preview.dataUrl} alt="Vista previa" className="aspect-[4/3] w-full object-cover" />
          ) : (
            <video src={preview.dataUrl} controls className="aspect-[4/3] w-full object-cover" />
          )
        ) : (
          <div className={`flex aspect-[4/3] flex-col items-center justify-center gap-2 ${t.muted}`}>
            <Video size={28} />
            <p className="text-sm">Vista previa</p>
          </div>
        )}
      </div>

      {state.evidences.length > 0 ? (
        <ul className="grid grid-cols-2 gap-3">
          {state.evidences.map((item) => (
            <li key={item.id} className={`overflow-hidden rounded-xl ${t.elevated}`}>
              {item.type === "image" ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={item.dataUrl} alt={item.description} className="aspect-video w-full object-cover" />
              ) : (
                <video src={item.dataUrl} className="aspect-video w-full object-cover" muted />
              )}
              <div className="flex items-start justify-between gap-2 p-2.5">
                <p className={`line-clamp-2 text-xs font-medium ${t.title}`}>{item.description}</p>
                <button
                  type="button"
                  onClick={() =>
                    save({
                      ...state,
                      evidences: state.evidences.filter((entry) => entry.id !== item.id),
                    })
                  }
                  className={`grid size-8 shrink-0 place-items-center rounded-lg ${t.btnGhost}`}
                  aria-label="Eliminar"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </li>
          ))}
        </ul>
      ) : null}
    </section>
  );
}

function BitacoraTab({
  state,
  save,
  onStatus,
}: {
  state: ObraState;
  save: (next: ObraState) => void;
  onStatus: (message: string) => void;
}) {
  const t = useAdminTheme();
  const [date, setDate] = useState(() => new Date().toISOString().slice(0, 10));
  const [tipo, setTipo] = useState<BitacoraTipo>("general");
  const [notes, setNotes] = useState("");

  const submit = (event: FormEvent) => {
    event.preventDefault();
    if (!notes.trim()) return;
    const entry: BitacoraEntry = {
      id: `bit-${Date.now()}`,
      date,
      tipo,
      notes: notes.trim(),
      createdAt: new Date().toISOString(),
      author: "Residente de obra",
    };
    save({ ...state, bitacora: [entry, ...state.bitacora].slice(0, 40) });
    setNotes("");
    onStatus("Entrada registrada en bitácora.");
  };

  const tipoLabel = (id: BitacoraTipo) =>
    BITACORA_TIPOS.find((item) => item.id === id)?.label ?? id;

  return (
    <section className={`min-w-0 space-y-5 rounded-2xl p-4 sm:p-6 ${t.surface}`}>
      <div>
        <SlideTitle from="left" distance={36} className={`text-lg font-semibold ${t.title}`}>
          Bitácora de obra
        </SlideTitle>
        <p className={`mt-1 text-sm ${t.muted}`}>Registro rápido de incidencias</p>
      </div>

      <form onSubmit={submit} className="space-y-3">
        <div className="flex flex-wrap gap-3">
          <label className="block">
            <span className={t.label}>Fecha</span>
            <input
              type="date"
              value={date}
              onChange={(event) => setDate(event.target.value)}
              className={`${t.input} w-full max-w-[10.5rem]`}
              required
            />
          </label>
          <label className="block min-w-[10rem] flex-1">
            <span className={t.label}>Tipo</span>
            <select
              value={tipo}
              onChange={(event) => setTipo(event.target.value as BitacoraTipo)}
              className={t.select}
            >
              {BITACORA_TIPOS.map((item) => (
                <option
                  key={item.id}
                  value={item.id}
                  style={{ color: "#101828", backgroundColor: "#ffffff" }}
                >
                  {item.label}
                </option>
              ))}
            </select>
          </label>
        </div>
        <label className="block">
          <span className={t.label}>Notas</span>
          <textarea
            value={notes}
            onChange={(event) => setNotes(event.target.value)}
            rows={3}
            placeholder="Describe lo ocurrido…"
            className={t.textarea}
            required
          />
        </label>
        <RippleButton type="submit" className={`${t.btnPrimary} w-full`}>
          <Save size={16} /> Registrar
        </RippleButton>
      </form>

      <ul className="space-y-2.5">
        {state.bitacora.map((entry) => (
          <li key={entry.id} className={`rounded-xl p-4 ${t.elevated}`}>
            <div className="flex items-start justify-between gap-2">
              <span className="rounded-full bg-[#eff8ff] px-2.5 py-1 text-[0.65rem] font-semibold text-[#175cd3]">
                {tipoLabel(entry.tipo)}
              </span>
              <button
                type="button"
                onClick={() =>
                  save({
                    ...state,
                    bitacora: state.bitacora.filter((item) => item.id !== entry.id),
                  })
                }
                className={`grid size-8 place-items-center rounded-lg ${t.btnGhost}`}
                aria-label="Eliminar"
              >
                <Trash2 size={14} />
              </button>
            </div>
            <p className={`mt-2.5 text-sm leading-6 ${t.title}`}>{entry.notes}</p>
            <p className={`mt-2 text-xs ${t.muted}`}>
              {new Date(`${entry.date}T12:00:00`).toLocaleDateString("es-MX")}
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}

function ChangeOrdersTab({
  state,
  save,
  onStatus,
}: {
  state: ObraState;
  save: (next: ObraState) => void;
  onStatus: (message: string) => void;
}) {
  const t = useAdminTheme();
  const [description, setDescription] = useState("");
  const [cost, setCost] = useState(0);

  const submit = (event: FormEvent) => {
    event.preventDefault();
    if (!description.trim()) return;
    const order: ChangeOrder = {
      id: `oc-${Date.now()}`,
      description: description.trim(),
      cost,
      status: "pendiente",
      createdAt: new Date().toISOString(),
    };
    save({ ...state, changeOrders: [order, ...state.changeOrders] });
    setDescription("");
    setCost(0);
    onStatus("Orden de cambio registrada.");
  };

  const totalExtras = state.changeOrders
    .filter((item) => item.status === "aprobado")
    .reduce((sum, item) => sum + item.cost, 0);

  return (
    <section className={`min-w-0 space-y-5 rounded-2xl p-4 sm:p-6 ${t.surface}`}>
      <div className="flex items-start justify-between gap-3">
        <div>
          <SlideTitle from="left" distance={36} className={`text-lg font-semibold ${t.title}`}>
            Órdenes de cambio
          </SlideTitle>
          <p className={`mt-1 text-sm ${t.muted}`}>Extras fuera de contrato</p>
        </div>
        <div className="rounded-xl bg-[#ecfdf3] px-3 py-2 text-right">
          <p className="text-[0.6rem] font-semibold uppercase tracking-[0.08em] text-[#027a48]">
            Aprobados
          </p>
          <p className="text-sm font-semibold text-[#027a48]">{currency.format(totalExtras)}</p>
        </div>
      </div>

      <form onSubmit={submit} className="space-y-3">
        <label className="block">
          <span className={t.label}>Descripción</span>
          <input
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            placeholder="Ej. Ampliación de terraza"
            className={t.input}
            required
          />
        </label>
        <label className="block">
          <span className={t.label}>Costo extra (MXN)</span>
          <CurrencyInput
            value={cost}
            onChange={setCost}
            className={t.inputAmt}
            required
          />
        </label>
        <RippleButton type="submit" className={`${t.btnPrimary} w-full`}>
          <Save size={16} /> Registrar solicitud
        </RippleButton>
      </form>

      <ul className="space-y-2.5">
        {state.changeOrders.map((order) => (
          <li key={order.id} className={`rounded-xl p-4 ${t.elevated}`}>
            <p className={`text-sm font-semibold ${t.title}`}>{order.description}</p>
            <p className={`mt-1 text-base font-semibold ${t.accent}`}>
              {currency.format(order.cost)}
            </p>
            <div className="mt-3 flex flex-wrap items-center gap-2">
              {(["pendiente", "aprobado"] as ChangeOrderStatus[]).map((status) => (
                <button
                  key={status}
                  type="button"
                  onClick={() =>
                    save({
                      ...state,
                      changeOrders: state.changeOrders.map((item) =>
                        item.id === order.id ? { ...item, status } : item,
                      ),
                    })
                  }
                  className={`rounded-full px-3 py-1.5 text-[0.65rem] font-semibold uppercase tracking-[0.06em] ${
                    order.status === status
                      ? status === "aprobado"
                        ? "bg-[#ecfdf3] text-[#027a48]"
                        : "bg-[#f2f4f7] text-[#344054]"
                      : t.mode === "sun"
                        ? "text-[#98a2b3] ring-1 ring-[#eaecf0]"
                        : "text-white/35 ring-1 ring-white/10"
                  }`}
                >
                  {status}
                </button>
              ))}
              <button
                type="button"
                onClick={() =>
                  save({
                    ...state,
                    changeOrders: state.changeOrders.filter((item) => item.id !== order.id),
                  })
                }
                className={`ml-auto grid size-8 place-items-center rounded-lg ${t.btnGhost}`}
                aria-label="Eliminar"
              >
                <Trash2 size={14} />
              </button>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}

function MaterialsTab({
  state,
  save,
  onStatus,
  onError,
}: {
  state: ObraState;
  save: (next: ObraState) => void;
  onStatus: (message: string) => void;
  onError: (message: string) => void;
}) {
  const t = useAdminTheme();
  const [provider, setProvider] = useState("");
  const [material, setMaterial] = useState("");
  const [ticketPreview, setTicketPreview] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const onTicket = async (files: FileList | null) => {
    const file = files?.[0];
    if (!file) return;
    try {
      setTicketPreview(await fileToDataUrl(file));
    } catch (err) {
      onError(err instanceof Error ? err.message : "No se pudo cargar el ticket.");
    }
  };

  const submit = (event: FormEvent) => {
    event.preventDefault();
    if (!provider.trim() || !material.trim()) return;
    const receipt: MaterialReceipt = {
      id: `mat-${Date.now()}`,
      provider: provider.trim(),
      material: material.trim(),
      ticketDataUrl: ticketPreview || undefined,
      createdAt: new Date().toISOString(),
    };
    save({ ...state, materials: [receipt, ...state.materials].slice(0, 30) });
    setProvider("");
    setMaterial("");
    setTicketPreview(null);
    if (fileRef.current) fileRef.current.value = "";
    onStatus("Recepción registrada.");
  };

  return (
    <section className={`min-w-0 space-y-5 rounded-2xl p-4 sm:p-6 ${t.surface}`}>
      <div>
        <SlideTitle from="left" distance={36} className={`text-lg font-semibold ${t.title}`}>
          Recepción de materiales
        </SlideTitle>
        <p className={`mt-1 text-sm ${t.muted}`}>Remisiones y tickets</p>
      </div>

      <form onSubmit={submit} className="space-y-3">
        <label className="block">
          <span className={t.label}>Proveedor</span>
          <input
            value={provider}
            onChange={(event) => setProvider(event.target.value)}
            placeholder="Ej. Aceros del Pacífico"
            className={t.input}
            required
          />
        </label>
        <label className="block">
          <span className={t.label}>Material</span>
          <input
            value={material}
            onChange={(event) => setMaterial(event.target.value)}
            placeholder="Ej. Varilla 3/8 · 2 ton"
            className={t.input}
            required
          />
        </label>
        <label className="block">
          <span className={t.label}>Foto del ticket</span>
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            capture="environment"
            onChange={(event) => onTicket(event.target.files)}
            className={t.file}
          />
        </label>
        {ticketPreview ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={ticketPreview} alt="Ticket" className="max-h-40 w-full rounded-xl object-cover" />
        ) : null}
        <RippleButton type="submit" className={`${t.btnPrimary} w-full`}>
          <Save size={16} /> Registrar recepción
        </RippleButton>
      </form>

      <ul className="grid grid-cols-2 gap-3">
        {state.materials.map((item) => (
          <li key={item.id} className={`overflow-hidden rounded-xl ${t.elevated}`}>
            {item.ticketDataUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={item.ticketDataUrl}
                alt={item.material}
                className="aspect-video w-full object-cover"
              />
            ) : null}
            <div className="flex items-start justify-between gap-2 p-3">
              <div>
                <p className={`text-sm font-semibold ${t.title}`}>{item.material}</p>
                <p className={`mt-0.5 text-xs ${t.muted}`}>{item.provider}</p>
              </div>
              <button
                type="button"
                onClick={() =>
                  save({
                    ...state,
                    materials: state.materials.filter((entry) => entry.id !== item.id),
                  })
                }
                className={`grid size-8 shrink-0 place-items-center rounded-lg ${t.btnGhost}`}
                aria-label="Eliminar"
              >
                <Trash2 size={14} />
              </button>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
