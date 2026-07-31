"use client";

import {
  BookOpen,
  Camera,
  ClipboardList,
  HardHat,
  ImagePlus,
  Package,
  Save,
  Trash2,
  Video,
} from "lucide-react";
import { FormEvent, useMemo, useRef, useState } from "react";
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

const currency = new Intl.NumberFormat("es-MX", {
  style: "currency",
  currency: "MXN",
  maximumFractionDigits: 0,
});

const inputClass =
  "h-12 w-full rounded-xl border border-white/12 bg-black/30 px-4 text-sm text-white outline-none focus:border-[#d4b28c]/60";
const labelClass = "mb-2 block text-[0.56rem] uppercase tracking-[0.18em] text-white/45";

type TabId = "metricas" | "evidencias" | "bitacora" | "extras" | "materiales";

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
  const [tab, setTab] = useState<TabId>("metricas");

  return (
    <div className="space-y-5">
      <nav className="-mx-1 flex gap-1 overflow-x-auto pb-1">
        {TABS.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            type="button"
            onClick={() => setTab(id)}
            className={`inline-flex shrink-0 items-center gap-2 rounded-full px-4 py-2.5 text-[0.58rem] font-semibold uppercase tracking-[0.14em] transition ${
              tab === id
                ? "bg-[#d4b28c] text-black"
                : "border border-white/12 bg-white/[0.03] text-white/55"
            }`}
          >
            <Icon size={13} />
            {label}
          </button>
        ))}
      </nav>

      {tab === "metricas" ? (
        <MetricsTab state={state} save={save} onStatus={onStatus} />
      ) : null}
      {tab === "evidencias" ? (
        <EvidenceTab state={state} save={save} onStatus={onStatus} onError={onError} />
      ) : null}
      {tab === "bitacora" ? (
        <BitacoraTab state={state} save={save} onStatus={onStatus} />
      ) : null}
      {tab === "extras" ? (
        <ChangeOrdersTab state={state} save={save} onStatus={onStatus} />
      ) : null}
      {tab === "materiales" ? (
        <MaterialsTab state={state} save={save} onStatus={onStatus} onError={onError} />
      ) : null}
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
  const spent = useMemo(() => getSpentTotal(state), [state]);

  return (
    <div className="space-y-5">
      <section className="rounded-2xl border border-white/10 bg-[#0d0d0d] p-5 md:p-6">
        <div className="mb-5 flex items-center gap-3">
          <span className="grid size-10 place-items-center rounded-xl bg-[#d4b28c]/15 text-[#d4b28c]">
            <HardHat size={18} />
          </span>
          <div>
            <h2 className="text-lg font-semibold text-white">Control de avance</h2>
            <p className="text-xs text-white/40">Porcentaje general y avance por etapa</p>
          </div>
        </div>

        <div className="grid gap-5 md:grid-cols-[1.2fr_.8fr]">
          <label className="block">
            <div className="mb-3 flex items-center justify-between text-sm">
              <span className="text-white/55">Avance general</span>
              <span className="font-editorial text-3xl text-[#d4b28c]">{state.progress}%</span>
            </div>
            <input
              type="range"
              min={0}
              max={100}
              value={state.progress}
              onChange={(event) => save({ ...state, progress: Number(event.target.value) })}
              className="h-2 w-full cursor-pointer appearance-none rounded-full bg-white/10 accent-[#d4b28c]"
            />
            <input
              type="number"
              min={0}
              max={100}
              value={state.progress}
              onChange={(event) =>
                save({
                  ...state,
                  progress: Math.min(100, Math.max(0, Number(event.target.value) || 0)),
                })
              }
              className={`mt-4 ${inputClass}`}
            />
          </label>

          <div className="grid grid-cols-2 gap-3">
            <NumberField
              label="SPI"
              value={state.spi}
              step={0.01}
              onChange={(value) => save({ ...state, spi: value })}
            />
            <NumberField
              label="CPI"
              value={state.cpi}
              step={0.01}
              onChange={(value) => save({ ...state, cpi: value })}
            />
            <div className="col-span-2 rounded-xl border border-white/10 bg-white/[0.03] p-4">
              <p className="text-[0.55rem] uppercase tracking-[0.16em] text-white/35">
                Presupuesto total
              </p>
              <input
                type="number"
                value={state.budgetTotal}
                onChange={(event) =>
                  save({ ...state, budgetTotal: Number(event.target.value) || 0 })
                }
                className="mt-2 h-11 w-full rounded-lg border border-white/10 bg-black/20 px-3 text-sm text-white outline-none"
              />
              <p className="mt-3 text-xs text-white/40">
                Ejercido: <span className="text-[#d4b28c]">{currency.format(spent)}</span>
              </p>
            </div>
          </div>
        </div>

        <div className="mt-6 border-t border-white/10 pt-5">
          <h3 className="text-sm font-semibold text-white">Avance por etapa</h3>
          <p className="mt-1 text-xs text-white/40">
            Alimenta el donut del Resumen en el Portal de Clientes.
          </p>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {state.stages.map((stage, index) => (
              <label
                key={stage.label}
                className="rounded-xl border border-white/10 bg-white/[0.03] p-4"
              >
                <span className="flex items-center gap-2 text-sm text-white/70">
                  <i className="size-2.5 rounded-full" style={{ background: stage.color }} />
                  {stage.label}
                </span>
                <div className="mt-3 flex items-center gap-3">
                  <input
                    type="range"
                    min={0}
                    max={100}
                    value={stage.value}
                    onChange={(event) => {
                      const value = Number(event.target.value);
                      save({
                        ...state,
                        stages: state.stages.map((item, i) =>
                          i === index ? { ...item, value } : item,
                        ),
                      });
                    }}
                    className="h-2 flex-1 cursor-pointer appearance-none rounded-full bg-white/10 accent-[#d4b28c]"
                  />
                  <input
                    type="number"
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
                    className="h-10 w-16 rounded-lg border border-white/10 bg-black/20 px-2 text-center text-sm text-white outline-none"
                  />
                </div>
              </label>
            ))}
          </div>
        </div>
      </section>

      <section className="rounded-2xl border border-white/10 bg-[#0d0d0d] p-5 md:p-6">
        <h2 className="text-lg font-semibold text-white">Costos por categoría</h2>
        <p className="mt-1 text-xs text-white/40">
          Presupuesto y ejercido alimentan las gráficas del portal.
        </p>
        <div className="mt-5 grid gap-3">
          {state.costs.map((cost) => (
            <CostField
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
        <button
          type="button"
          onClick={() => {
            save({ ...state });
            onStatus("Avance y costos publicados. El Portal de Clientes ya los refleja.");
          }}
          className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#d4b28c] px-5 py-3.5 text-[0.62rem] font-semibold uppercase tracking-[0.16em] text-black sm:w-auto"
        >
          <Save size={14} /> Guardar y publicar métricas
        </button>
      </section>
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
  const [publishing, setPublishing] = useState(false);
  const [description, setDescription] = useState("");
  const [preview, setPreview] = useState<{ type: "image" | "video"; dataUrl: string } | null>(
    null,
  );
  const fileRef = useRef<HTMLInputElement>(null);

  const onFileChange = async (fileList: FileList | null) => {
    const file = fileList?.[0];
    if (!file) return;
    try {
      const dataUrl = await fileToDataUrl(file);
      const type = file.type.startsWith("video/") ? "video" : "image";
      setPreview({ type, dataUrl });
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
      onError("Agrega una breve bitácora o descripción.");
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

    save({
      ...state,
      evidences: [item, ...state.evidences].slice(0, 12),
    });

    setDescription("");
    setPreview(null);
    if (fileRef.current) fileRef.current.value = "";
    onStatus("Evidencia publicada. Ya aparece en el Portal de Clientes.");
    setPublishing(false);
  };

  return (
    <section className="rounded-2xl border border-white/10 bg-[#0d0d0d] p-5 md:p-6">
      <div className="mb-5 flex items-center gap-3">
        <span className="grid size-10 place-items-center rounded-xl bg-[#d4b28c]/15 text-[#d4b28c]">
          <Camera size={18} />
        </span>
        <div>
          <h2 className="text-lg font-semibold text-white">Evidencias desde campo</h2>
          <p className="text-xs text-white/40">Usa la cámara del celular o adjunta un archivo</p>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <div className="space-y-4">
          <input
            ref={fileRef}
            type="file"
            accept="image/*,video/*"
            capture="environment"
            onChange={(event) => onFileChange(event.target.files)}
            className="block w-full rounded-xl border border-dashed border-white/20 bg-black/20 px-4 py-8 text-sm text-white/70 file:mr-4 file:rounded-full file:border-0 file:bg-[#d4b28c] file:px-4 file:py-2 file:text-[0.58rem] file:font-semibold file:uppercase file:tracking-[0.14em] file:text-black"
          />

          <label className="block">
            <span className={labelClass}>Bitácora / descripción</span>
            <textarea
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              rows={4}
              placeholder="Ej. Avance en colado de losa planta alta"
              className="w-full resize-none rounded-xl border border-white/12 bg-black/30 px-4 py-3 text-sm text-white outline-none placeholder:text-white/25 focus:border-[#d4b28c]/60"
            />
          </label>

          <button
            type="button"
            disabled={publishing}
            onClick={publishEvidence}
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#f4f4f5] px-5 py-3.5 text-[0.62rem] font-semibold uppercase tracking-[0.16em] text-black disabled:opacity-60"
          >
            <ImagePlus size={14} />
            {publishing ? "Publicando…" : "Guardar / Publicar evidencia"}
          </button>
        </div>

        <div className="overflow-hidden rounded-xl border border-white/10 bg-black/30">
          {preview ? (
            preview.type === "image" ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={preview.dataUrl} alt="Vista previa" className="aspect-[4/3] w-full object-cover" />
            ) : (
              <video src={preview.dataUrl} controls className="aspect-[4/3] w-full object-cover" />
            )
          ) : (
            <div className="flex aspect-[4/3] flex-col items-center justify-center gap-3 text-white/35">
              <Video size={28} />
              <p className="text-sm">Vista previa de captura</p>
            </div>
          )}
        </div>
      </div>

      <div className="mt-6 space-y-3">
        <p className="text-[0.56rem] uppercase tracking-[0.18em] text-white/40">
          Publicadas ({state.evidences.length})
        </p>
        {state.evidences.length === 0 ? (
          <p className="text-sm text-white/35">Aún no hay evidencias publicadas desde campo.</p>
        ) : (
          <ul className="grid gap-3 sm:grid-cols-2">
            {state.evidences.map((item) => (
              <li
                key={item.id}
                className="overflow-hidden rounded-xl border border-white/10 bg-white/[0.03]"
              >
                {item.type === "image" ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={item.dataUrl}
                    alt={item.description}
                    className="aspect-video w-full object-cover"
                  />
                ) : (
                  <video src={item.dataUrl} className="aspect-video w-full object-cover" muted />
                )}
                <div className="flex items-start justify-between gap-2 p-3">
                  <div>
                    <p className="text-sm text-white">{item.description}</p>
                    <p className="mt-1 text-[0.55rem] text-white/35">
                      {new Date(item.createdAt).toLocaleString("es-MX")}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() =>
                      save({
                        ...state,
                        evidences: state.evidences.filter((entry) => entry.id !== item.id),
                      })
                    }
                    className="grid size-8 place-items-center rounded-full border border-white/15 text-white/50"
                    aria-label="Eliminar evidencia"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
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

    save({
      ...state,
      bitacora: [entry, ...state.bitacora].slice(0, 40),
    });
    setNotes("");
    onStatus("Entrada de bitácora registrada.");
  };

  const tipoLabel = (id: BitacoraTipo) =>
    BITACORA_TIPOS.find((item) => item.id === id)?.label ?? id;

  return (
    <section className="rounded-2xl border border-white/10 bg-[#0d0d0d] p-5 md:p-6">
      <div className="mb-5 flex items-center gap-3">
        <span className="grid size-10 place-items-center rounded-xl bg-[#d4b28c]/15 text-[#d4b28c]">
          <BookOpen size={18} />
        </span>
        <div>
          <h2 className="text-lg font-semibold text-white">Bitácora de obra oficial</h2>
          <p className="text-xs text-white/40">Diario de campo · clima, visitas y retrasos</p>
        </div>
      </div>

      <form onSubmit={submit} className="space-y-4 rounded-xl border border-white/10 bg-white/[0.03] p-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block">
            <span className={labelClass}>Fecha</span>
            <input
              type="date"
              value={date}
              onChange={(event) => setDate(event.target.value)}
              className={inputClass}
              required
            />
          </label>
          <label className="block">
            <span className={labelClass}>Tipo de incidencia</span>
            <select
              value={tipo}
              onChange={(event) => setTipo(event.target.value as BitacoraTipo)}
              className={inputClass}
            >
              {BITACORA_TIPOS.map((item) => (
                <option key={item.id} value={item.id} className="bg-[#121212]">
                  {item.label}
                </option>
              ))}
            </select>
          </label>
        </div>
        <label className="block">
          <span className={labelClass}>Notas</span>
          <textarea
            value={notes}
            onChange={(event) => setNotes(event.target.value)}
            rows={3}
            placeholder="Describe lo ocurrido en campo…"
            className="w-full resize-none rounded-xl border border-white/12 bg-black/30 px-4 py-3 text-sm text-white outline-none placeholder:text-white/25 focus:border-[#d4b28c]/60"
            required
          />
        </label>
        <button
          type="submit"
          className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#d4b28c] px-5 py-3.5 text-[0.62rem] font-semibold uppercase tracking-[0.16em] text-black sm:w-auto"
        >
          <Save size={14} /> Registrar en bitácora
        </button>
      </form>

      <div className="mt-6 space-y-3">
        <p className="text-[0.56rem] uppercase tracking-[0.18em] text-white/40">
          Historial ({state.bitacora.length})
        </p>
        {state.bitacora.length === 0 ? (
          <p className="text-sm text-white/35">Sin entradas registradas.</p>
        ) : (
          <ol className="relative space-y-3 border-l border-white/10 pl-5">
            {state.bitacora.map((entry) => (
              <li key={entry.id} className="relative">
                <span className="absolute -left-[1.4rem] top-3 size-2.5 rounded-full bg-[#d4b28c]" />
                <article className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="rounded-full border border-[#d4b28c]/30 bg-[#d4b28c]/10 px-2.5 py-1 text-[0.52rem] uppercase tracking-[0.12em] text-[#d4b28c]">
                      {tipoLabel(entry.tipo)}
                    </span>
                    <div className="flex items-center gap-2">
                      <time className="text-[0.55rem] text-white/35">
                        {new Date(`${entry.date}T12:00:00`).toLocaleDateString("es-MX", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        })}
                      </time>
                      <button
                        type="button"
                        onClick={() =>
                          save({
                            ...state,
                            bitacora: state.bitacora.filter((item) => item.id !== entry.id),
                          })
                        }
                        className="grid size-7 place-items-center rounded-full border border-white/12 text-white/40"
                        aria-label="Eliminar entrada"
                      >
                        <Trash2 size={12} />
                      </button>
                    </div>
                  </div>
                  <p className="mt-3 text-sm leading-6 text-white/80">{entry.notes}</p>
                  <p className="mt-2 text-[0.55rem] text-white/30">{entry.author}</p>
                </article>
              </li>
            ))}
          </ol>
        )}
      </div>
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
  const [description, setDescription] = useState("");
  const [cost, setCost] = useState("");

  const submit = (event: FormEvent) => {
    event.preventDefault();
    if (!description.trim()) return;

    const order: ChangeOrder = {
      id: `oc-${Date.now()}`,
      description: description.trim(),
      cost: Number(cost) || 0,
      status: "pendiente",
      createdAt: new Date().toISOString(),
    };

    save({
      ...state,
      changeOrders: [order, ...state.changeOrders],
    });
    setDescription("");
    setCost("");
    onStatus("Orden de cambio registrada.");
  };

  const setStatus = (id: string, status: ChangeOrderStatus) => {
    save({
      ...state,
      changeOrders: state.changeOrders.map((item) =>
        item.id === id ? { ...item, status } : item,
      ),
    });
  };

  const totalExtras = state.changeOrders
    .filter((item) => item.status === "aprobado")
    .reduce((sum, item) => sum + item.cost, 0);

  return (
    <section className="rounded-2xl border border-white/10 bg-[#0d0d0d] p-5 md:p-6">
      <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <span className="grid size-10 place-items-center rounded-xl bg-[#d4b28c]/15 text-[#d4b28c]">
            <ClipboardList size={18} />
          </span>
          <div>
            <h2 className="text-lg font-semibold text-white">Órdenes de cambio / extras</h2>
            <p className="text-xs text-white/40">Solicitudes fuera del contrato original</p>
          </div>
        </div>
        <div className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-2 text-right">
          <p className="text-[0.52rem] uppercase tracking-[0.14em] text-white/35">Aprobados</p>
          <p className="text-sm text-[#d4b28c]">{currency.format(totalExtras)}</p>
        </div>
      </div>

      <form onSubmit={submit} className="space-y-4 rounded-xl border border-white/10 bg-white/[0.03] p-4">
        <label className="block">
          <span className={labelClass}>Descripción</span>
          <input
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            placeholder="Ej. Ampliación de terraza posterior"
            className={inputClass}
            required
          />
        </label>
        <label className="block">
          <span className={labelClass}>Costo extra (MXN)</span>
          <input
            type="number"
            min={0}
            value={cost}
            onChange={(event) => setCost(event.target.value)}
            placeholder="0"
            className={inputClass}
            required
          />
        </label>
        <button
          type="submit"
          className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#d4b28c] px-5 py-3.5 text-[0.62rem] font-semibold uppercase tracking-[0.16em] text-black sm:w-auto"
        >
          <Save size={14} /> Registrar solicitud
        </button>
      </form>

      <div className="mt-6 overflow-hidden rounded-xl border border-white/10">
        <div className="hidden grid-cols-[1.4fr_.7fr_.7fr_auto] gap-3 border-b border-white/10 bg-white/[0.04] px-4 py-3 text-[0.52rem] uppercase tracking-[0.14em] text-white/35 sm:grid">
          <span>Descripción</span>
          <span>Costo</span>
          <span>Estatus</span>
          <span />
        </div>
        {state.changeOrders.length === 0 ? (
          <p className="px-4 py-8 text-center text-sm text-white/35">Sin órdenes de cambio.</p>
        ) : (
          <ul className="divide-y divide-white/8">
            {state.changeOrders.map((order) => (
              <li
                key={order.id}
                className="grid gap-3 px-4 py-4 sm:grid-cols-[1.4fr_.7fr_.7fr_auto] sm:items-center"
              >
                <div>
                  <p className="text-sm text-white">{order.description}</p>
                  <p className="mt-1 text-[0.55rem] text-white/30 sm:hidden">
                    {currency.format(order.cost)}
                  </p>
                </div>
                <p className="hidden text-sm text-white/70 sm:block">
                  {currency.format(order.cost)}
                </p>
                <div className="flex flex-wrap gap-2">
                  {(["pendiente", "aprobado"] as ChangeOrderStatus[]).map((status) => (
                    <button
                      key={status}
                      type="button"
                      onClick={() => setStatus(order.id, status)}
                      className={`rounded-full px-3 py-1.5 text-[0.52rem] uppercase tracking-[0.12em] ${
                        order.status === status
                          ? status === "aprobado"
                            ? "bg-[#d4b28c] text-black"
                            : "bg-white/15 text-white"
                          : "border border-white/12 text-white/40"
                      }`}
                    >
                      {status}
                    </button>
                  ))}
                </div>
                <button
                  type="button"
                  onClick={() =>
                    save({
                      ...state,
                      changeOrders: state.changeOrders.filter((item) => item.id !== order.id),
                    })
                  }
                  className="grid size-8 place-items-center justify-self-end rounded-full border border-white/12 text-white/40"
                  aria-label="Eliminar orden"
                >
                  <Trash2 size={13} />
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
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
  const [provider, setProvider] = useState("");
  const [material, setMaterial] = useState("");
  const [ticketPreview, setTicketPreview] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const onTicket = async (files: FileList | null) => {
    const file = files?.[0];
    if (!file) return;
    try {
      const dataUrl = await fileToDataUrl(file);
      setTicketPreview(dataUrl);
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

    save({
      ...state,
      materials: [receipt, ...state.materials].slice(0, 30),
    });
    setProvider("");
    setMaterial("");
    setTicketPreview(null);
    if (fileRef.current) fileRef.current.value = "";
    onStatus("Recepción de material registrada.");
  };

  return (
    <section className="rounded-2xl border border-white/10 bg-[#0d0d0d] p-5 md:p-6">
      <div className="mb-5 flex items-center gap-3">
        <span className="grid size-10 place-items-center rounded-xl bg-[#d4b28c]/15 text-[#d4b28c]">
          <Package size={18} />
        </span>
        <div>
          <h2 className="text-lg font-semibold text-white">Recepción de materiales</h2>
          <p className="text-xs text-white/40">Remisiones y tickets de entrega en campo</p>
        </div>
      </div>

      <form onSubmit={submit} className="space-y-4 rounded-xl border border-white/10 bg-white/[0.03] p-4">
        <label className="block">
          <span className={labelClass}>Proveedor</span>
          <input
            value={provider}
            onChange={(event) => setProvider(event.target.value)}
            placeholder="Ej. Aceros del Pacífico"
            className={inputClass}
            required
          />
        </label>
        <label className="block">
          <span className={labelClass}>Material</span>
          <input
            value={material}
            onChange={(event) => setMaterial(event.target.value)}
            placeholder="Ej. Varilla 3/8 · 2 toneladas"
            className={inputClass}
            required
          />
        </label>
        <label className="block">
          <span className={labelClass}>Foto del ticket / remisión</span>
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            capture="environment"
            onChange={(event) => onTicket(event.target.files)}
            className="block w-full rounded-xl border border-dashed border-white/20 bg-black/20 px-4 py-5 text-sm text-white/70 file:mr-4 file:rounded-full file:border-0 file:bg-[#d4b28c] file:px-4 file:py-2 file:text-[0.58rem] file:font-semibold file:uppercase file:tracking-[0.14em] file:text-black"
          />
        </label>
        {ticketPreview ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={ticketPreview}
            alt="Ticket"
            className="max-h-40 w-full rounded-xl object-cover"
          />
        ) : null}
        <button
          type="submit"
          className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#d4b28c] px-5 py-3.5 text-[0.62rem] font-semibold uppercase tracking-[0.16em] text-black sm:w-auto"
        >
          <Save size={14} /> Registrar recepción
        </button>
      </form>

      <div className="mt-6 space-y-3">
        <p className="text-[0.56rem] uppercase tracking-[0.18em] text-white/40">
          Entradas ({state.materials.length})
        </p>
        {state.materials.length === 0 ? (
          <p className="text-sm text-white/35">Sin recepciones registradas.</p>
        ) : (
          <ul className="grid gap-3 sm:grid-cols-2">
            {state.materials.map((item) => (
              <li
                key={item.id}
                className="overflow-hidden rounded-xl border border-white/10 bg-white/[0.03]"
              >
                {item.ticketDataUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={item.ticketDataUrl}
                    alt={`Ticket ${item.material}`}
                    className="aspect-video w-full object-cover"
                  />
                ) : null}
                <div className="flex items-start justify-between gap-2 p-4">
                  <div>
                    <p className="text-sm font-medium text-white">{item.material}</p>
                    <p className="mt-1 text-xs text-white/45">{item.provider}</p>
                    <p className="mt-2 text-[0.55rem] text-white/30">
                      {new Date(item.createdAt).toLocaleString("es-MX")}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() =>
                      save({
                        ...state,
                        materials: state.materials.filter((entry) => entry.id !== item.id),
                      })
                    }
                    className="grid size-8 place-items-center rounded-full border border-white/15 text-white/50"
                    aria-label="Eliminar recepción"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}

function NumberField({
  label,
  value,
  step,
  onChange,
}: {
  label: string;
  value: number;
  step: number;
  onChange: (value: number) => void;
}) {
  return (
    <label className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
      <span className="text-[0.55rem] uppercase tracking-[0.16em] text-white/35">{label}</span>
      <input
        type="number"
        step={step}
        value={value}
        onChange={(event) => onChange(Number(event.target.value) || 0)}
        className="mt-2 h-11 w-full rounded-lg border border-white/10 bg-black/20 px-3 text-sm text-white outline-none"
      />
    </label>
  );
}

function CostField({
  cost,
  onChange,
}: {
  cost: CostCategory;
  onChange: (patch: Partial<Pick<CostCategory, "amount" | "budget">>) => void;
}) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
      <span className="flex items-center gap-2 text-sm text-white/70">
        <i className="size-2.5 rounded-full" style={{ background: cost.color }} />
        {cost.name}
      </span>
      <div className="mt-3 grid gap-3 sm:grid-cols-2">
        <label className="block">
          <span className="mb-1.5 block text-[0.52rem] uppercase tracking-[0.14em] text-white/35">
            Presupuesto
          </span>
          <input
            type="number"
            value={cost.budget}
            onChange={(event) => onChange({ budget: Number(event.target.value) || 0 })}
            className="h-11 w-full rounded-lg border border-white/10 bg-black/20 px-3 text-sm text-white outline-none"
          />
        </label>
        <label className="block">
          <span className="mb-1.5 block text-[0.52rem] uppercase tracking-[0.14em] text-white/35">
            Ejercido
          </span>
          <input
            type="number"
            value={cost.amount}
            onChange={(event) => onChange({ amount: Number(event.target.value) || 0 })}
            className="h-11 w-full rounded-lg border border-white/10 bg-black/20 px-3 text-sm text-white outline-none"
          />
        </label>
      </div>
    </div>
  );
}
