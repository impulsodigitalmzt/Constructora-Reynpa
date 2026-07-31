"use client";

import {
  BookOpen,
  Camera,
  ClipboardList,
  HardHat,
  ImagePlus,
  Minus,
  Package,
  Plus,
  Save,
  Trash2,
  Video,
} from "lucide-react";
import { FormEvent, useMemo, useRef, useState } from "react";
import { useAdminTheme } from "@/components/admin/admin-theme";
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
  const t = useAdminTheme();
  const [tab, setTab] = useState<TabId>("metricas");

  return (
    <div className="space-y-4">
      <nav className="-mx-1 flex gap-2 overflow-x-auto pb-1">
        {TABS.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            type="button"
            onClick={() => setTab(id)}
            className={`inline-flex min-h-12 shrink-0 items-center gap-2 rounded-xl px-4 text-[0.68rem] font-bold uppercase tracking-[0.12em] transition ${
              tab === id ? t.tabActive : t.tabIdle
            }`}
          >
            <Icon size={16} />
            {label}
          </button>
        ))}
      </nav>

      {tab === "metricas" ? <MetricsTab state={state} save={save} onStatus={onStatus} /> : null}
      {tab === "evidencias" ? (
        <EvidenceTab state={state} save={save} onStatus={onStatus} onError={onError} />
      ) : null}
      {tab === "bitacora" ? <BitacoraTab state={state} save={save} onStatus={onStatus} /> : null}
      {tab === "extras" ? <ChangeOrdersTab state={state} save={save} onStatus={onStatus} /> : null}
      {tab === "materiales" ? (
        <MaterialsTab state={state} save={save} onStatus={onStatus} onError={onError} />
      ) : null}
    </div>
  );
}

function Stepper({
  value,
  onChange,
  step = 1,
  min,
  max,
  suffix = "",
}: {
  value: number;
  onChange: (value: number) => void;
  step?: number;
  min?: number;
  max?: number;
  suffix?: string;
}) {
  const t = useAdminTheme();

  const clamp = (next: number) => {
    let v = next;
    if (typeof min === "number") v = Math.max(min, v);
    if (typeof max === "number") v = Math.min(max, v);
    return Number(v.toFixed(step < 1 ? 2 : 0));
  };

  return (
    <div className="flex items-center gap-2">
      <button
        type="button"
        aria-label="Disminuir"
        className={t.stepperBtn}
        onClick={() => onChange(clamp(value - step))}
      >
        <Minus size={22} strokeWidth={3} />
      </button>
      <input
        type="number"
        inputMode="decimal"
        value={value}
        onChange={(event) => onChange(clamp(Number(event.target.value) || 0))}
        className={`${t.input} text-center text-xl tabular-nums`}
      />
      {suffix ? (
        <span className={`w-8 shrink-0 text-center text-lg font-bold ${t.title}`}>{suffix}</span>
      ) : null}
      <button
        type="button"
        aria-label="Aumentar"
        className={t.stepperBtn}
        onClick={() => onChange(clamp(value + step))}
      >
        <Plus size={22} strokeWidth={3} />
      </button>
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
  const spent = useMemo(() => getSpentTotal(state), [state]);

  return (
    <div className="space-y-4">
      <section className={`rounded-2xl p-4 sm:p-5 ${t.card}`}>
        <h2 className={`text-xl font-bold ${t.title}`}>Control de avance</h2>
        <p className={`mt-1 text-sm font-medium ${t.muted}`}>
          Ajusta con + / − o escribe el número directo
        </p>

        <div className={`mt-5 rounded-xl p-4 ${t.form}`}>
          <div className="mb-3 flex items-center justify-between">
            <span className={t.label + " !mb-0"}>Avance general</span>
            <span className={`font-editorial text-4xl font-bold ${t.accent}`}>{state.progress}%</span>
          </div>
          <Stepper
            value={state.progress}
            min={0}
            max={100}
            step={1}
            suffix="%"
            onChange={(progress) => save({ ...state, progress })}
          />
          <input
            type="range"
            min={0}
            max={100}
            value={state.progress}
            onChange={(event) => save({ ...state, progress: Number(event.target.value) })}
            className="mt-4 h-4 w-full cursor-pointer appearance-none rounded-full accent-[#8a6a3d]"
            style={{ background: t.mode === "sun" ? "#d6d0c4" : "#555" }}
          />
        </div>

        <div className="mt-4 grid gap-3">
          <div className={`rounded-xl p-4 ${t.form}`}>
            <span className={t.label}>SPI</span>
            <Stepper
              value={state.spi}
              step={0.01}
              min={0}
              max={2}
              onChange={(spi) => save({ ...state, spi })}
            />
          </div>
          <div className={`rounded-xl p-4 ${t.form}`}>
            <span className={t.label}>CPI</span>
            <Stepper
              value={state.cpi}
              step={0.01}
              min={0}
              max={2}
              onChange={(cpi) => save({ ...state, cpi })}
            />
          </div>
          <div className={`rounded-xl p-4 ${t.form}`}>
            <span className={t.label}>Presupuesto total (MXN)</span>
            <Stepper
              value={state.budgetTotal}
              step={10000}
              min={0}
              onChange={(budgetTotal) => save({ ...state, budgetTotal })}
            />
            <p className={`mt-3 text-sm font-bold ${t.muted}`}>
              Ejercido: <span className={t.accent}>{currency.format(spent)}</span>
            </p>
          </div>
        </div>

        <div className={`mt-5 border-t pt-5 ${t.divider}`}>
          <h3 className={`text-lg font-bold ${t.title}`}>Avance por etapa</h3>
          <div className="mt-3 space-y-3">
            {state.stages.map((stage, index) => (
              <div key={stage.label} className={`rounded-xl p-4 ${t.form}`}>
                <div className="mb-3 flex items-center gap-2">
                  <i className="size-3 rounded-full" style={{ background: stage.color }} />
                  <span className={`text-base font-bold ${t.title}`}>{stage.label}</span>
                </div>
                <Stepper
                  value={stage.value}
                  min={0}
                  max={100}
                  step={1}
                  suffix="%"
                  onChange={(value) =>
                    save({
                      ...state,
                      stages: state.stages.map((item, i) =>
                        i === index ? { ...item, value } : item,
                      ),
                    })
                  }
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={`rounded-2xl p-4 sm:p-5 ${t.card}`}>
        <h2 className={`text-xl font-bold ${t.title}`}>Costos por categoría</h2>
        <p className={`mt-1 text-sm font-medium ${t.muted}`}>
          Presupuesto y ejercido · botones + / − de $10,000
        </p>
        <div className="mt-4 space-y-3">
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
          className={`mt-5 ${t.btnPrimary}`}
        >
          <Save size={18} /> Guardar y publicar métricas
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
  const t = useAdminTheme();
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

    save({ ...state, evidences: [item, ...state.evidences].slice(0, 12) });
    setDescription("");
    setPreview(null);
    if (fileRef.current) fileRef.current.value = "";
    onStatus("Evidencia publicada. Ya aparece en el Portal de Clientes.");
    setPublishing(false);
  };

  return (
    <section className={`space-y-4 rounded-2xl p-4 sm:p-5 ${t.card}`}>
      <div>
        <h2 className={`text-xl font-bold ${t.title}`}>Evidencias desde campo</h2>
        <p className={`mt-1 text-sm font-medium ${t.muted}`}>Cámara del celular o archivo</p>
      </div>

      <div className={`space-y-4 rounded-xl p-4 ${t.form}`}>
        <input
          ref={fileRef}
          type="file"
          accept="image/*,video/*"
          capture="environment"
          onChange={(event) => onFileChange(event.target.files)}
          className={t.file}
        />
        <label className="block">
          <span className={t.label}>Bitácora / descripción</span>
          <textarea
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            rows={4}
            placeholder="Ej. Avance en colado de losa planta alta"
            className={t.textarea}
          />
        </label>
        <button
          type="button"
          disabled={publishing}
          onClick={publishEvidence}
          className={`${t.btnPrimary} disabled:opacity-60`}
        >
          <ImagePlus size={18} />
          {publishing ? "Publicando…" : "Guardar / Publicar evidencia"}
        </button>
      </div>

      <div className={`overflow-hidden rounded-xl border-2 ${t.mode === "sun" ? "border-[#111] bg-[#ddd]" : "border-[#d4b28c] bg-[#1f1f1f]"}`}>
        {preview ? (
          preview.type === "image" ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={preview.dataUrl} alt="Vista previa" className="aspect-[4/3] w-full object-cover" />
          ) : (
            <video src={preview.dataUrl} controls className="aspect-[4/3] w-full object-cover" />
          )
        ) : (
          <div className={`flex aspect-[4/3] flex-col items-center justify-center gap-3 ${t.muted}`}>
            <Video size={32} />
            <p className="text-base font-semibold">Vista previa de captura</p>
          </div>
        )}
      </div>

      <div className="space-y-3">
        <p className={`text-sm font-bold ${t.title}`}>Publicadas ({state.evidences.length})</p>
        {state.evidences.length === 0 ? (
          <p className={`text-sm font-medium ${t.muted}`}>Aún no hay evidencias publicadas.</p>
        ) : (
          <ul className="space-y-3">
            {state.evidences.map((item) => (
              <li key={item.id} className={`overflow-hidden rounded-xl ${t.listItem}`}>
                {item.type === "image" ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={item.dataUrl} alt={item.description} className="aspect-video w-full object-cover" />
                ) : (
                  <video src={item.dataUrl} className="aspect-video w-full object-cover" muted />
                )}
                <div className="flex items-start justify-between gap-2 p-3">
                  <div>
                    <p className={`text-base font-bold ${t.title}`}>{item.description}</p>
                    <p className={`mt-1 text-xs font-medium ${t.muted}`}>
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
                    className="grid size-12 place-items-center rounded-xl border-2 border-current"
                    aria-label="Eliminar evidencia"
                  >
                    <Trash2 size={18} />
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
    onStatus("Entrada de bitácora registrada.");
  };

  const tipoLabel = (id: BitacoraTipo) =>
    BITACORA_TIPOS.find((item) => item.id === id)?.label ?? id;

  return (
    <section className={`space-y-4 rounded-2xl p-4 sm:p-5 ${t.card}`}>
      <div>
        <h2 className={`text-xl font-bold ${t.title}`}>Bitácora de obra oficial</h2>
        <p className={`mt-1 text-sm font-medium ${t.muted}`}>Diario de campo</p>
      </div>

      <form onSubmit={submit} className={`space-y-4 rounded-xl p-4 ${t.form}`}>
        <label className="block">
          <span className={t.label}>Fecha</span>
          <input
            type="date"
            value={date}
            onChange={(event) => setDate(event.target.value)}
            className={t.input}
            required
          />
        </label>
        <label className="block">
          <span className={t.label}>Tipo de incidencia</span>
          <select
            value={tipo}
            onChange={(event) => setTipo(event.target.value as BitacoraTipo)}
            className={t.input}
          >
            {BITACORA_TIPOS.map((item) => (
              <option key={item.id} value={item.id}>
                {item.label}
              </option>
            ))}
          </select>
        </label>
        <label className="block">
          <span className={t.label}>Notas</span>
          <textarea
            value={notes}
            onChange={(event) => setNotes(event.target.value)}
            rows={4}
            placeholder="Describe lo ocurrido en campo…"
            className={t.textarea}
            required
          />
        </label>
        <button type="submit" className={t.btnPrimary}>
          <Save size={18} /> Registrar en bitácora
        </button>
      </form>

      <div className="space-y-3">
        <p className={`text-sm font-bold ${t.title}`}>Historial ({state.bitacora.length})</p>
        {state.bitacora.map((entry) => (
          <article key={entry.id} className={`rounded-xl p-4 ${t.listItem}`}>
            <div className="flex items-start justify-between gap-2">
              <span className={`rounded-lg px-3 py-1.5 text-xs font-bold uppercase ${t.tabActive}`}>
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
                className="grid size-12 place-items-center rounded-xl border-2 border-current"
                aria-label="Eliminar entrada"
              >
                <Trash2 size={18} />
              </button>
            </div>
            <p className={`mt-3 text-base font-semibold leading-6 ${t.title}`}>{entry.notes}</p>
            <p className={`mt-2 text-xs font-medium ${t.muted}`}>
              {new Date(`${entry.date}T12:00:00`).toLocaleDateString("es-MX")} · {entry.author}
            </p>
          </article>
        ))}
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
    <section className={`space-y-4 rounded-2xl p-4 sm:p-5 ${t.card}`}>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className={`text-xl font-bold ${t.title}`}>Órdenes de cambio / extras</h2>
          <p className={`mt-1 text-sm font-medium ${t.muted}`}>Fuera del contrato original</p>
        </div>
        <div className={`rounded-xl px-4 py-3 text-right ${t.form}`}>
          <p className={`text-xs font-bold uppercase ${t.muted}`}>Aprobados</p>
          <p className={`text-lg font-bold ${t.accent}`}>{currency.format(totalExtras)}</p>
        </div>
      </div>

      <form onSubmit={submit} className={`space-y-4 rounded-xl p-4 ${t.form}`}>
        <label className="block">
          <span className={t.label}>Descripción</span>
          <input
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            placeholder="Ej. Ampliación de terraza posterior"
            className={t.input}
            required
          />
        </label>
        <label className="block">
          <span className={t.label}>Costo extra (MXN)</span>
          <Stepper value={cost} step={1000} min={0} onChange={setCost} />
        </label>
        <button type="submit" className={t.btnPrimary}>
          <Save size={18} /> Registrar solicitud
        </button>
      </form>

      <ul className="space-y-3">
        {state.changeOrders.map((order) => (
          <li key={order.id} className={`rounded-xl p-4 ${t.listItem}`}>
            <p className={`text-base font-bold ${t.title}`}>{order.description}</p>
            <p className={`mt-1 text-lg font-bold ${t.accent}`}>{currency.format(order.cost)}</p>
            <div className="mt-3 flex flex-wrap gap-2">
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
                  className={`min-h-12 rounded-xl px-4 text-xs font-bold uppercase tracking-[0.1em] ${
                    order.status === status ? t.tabActive : t.tabIdle
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
                className="ml-auto grid size-12 place-items-center rounded-xl border-2 border-current"
                aria-label="Eliminar orden"
              >
                <Trash2 size={18} />
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
    onStatus("Recepción de material registrada.");
  };

  return (
    <section className={`space-y-4 rounded-2xl p-4 sm:p-5 ${t.card}`}>
      <div>
        <h2 className={`text-xl font-bold ${t.title}`}>Recepción de materiales</h2>
        <p className={`mt-1 text-sm font-medium ${t.muted}`}>Remisiones y tickets de entrega</p>
      </div>

      <form onSubmit={submit} className={`space-y-4 rounded-xl p-4 ${t.form}`}>
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
            placeholder="Ej. Varilla 3/8 · 2 toneladas"
            className={t.input}
            required
          />
        </label>
        <label className="block">
          <span className={t.label}>Foto del ticket / remisión</span>
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
          <img src={ticketPreview} alt="Ticket" className="max-h-48 w-full rounded-xl object-cover" />
        ) : null}
        <button type="submit" className={t.btnPrimary}>
          <Save size={18} /> Registrar recepción
        </button>
      </form>

      <ul className="space-y-3">
        {state.materials.map((item) => (
          <li key={item.id} className={`overflow-hidden rounded-xl ${t.listItem}`}>
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
                <p className={`text-base font-bold ${t.title}`}>{item.material}</p>
                <p className={`mt-1 text-sm font-medium ${t.muted}`}>{item.provider}</p>
              </div>
              <button
                type="button"
                onClick={() =>
                  save({
                    ...state,
                    materials: state.materials.filter((entry) => entry.id !== item.id),
                  })
                }
                className="grid size-12 place-items-center rounded-xl border-2 border-current"
                aria-label="Eliminar recepción"
              >
                <Trash2 size={18} />
              </button>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}

function CostField({
  cost,
  onChange,
}: {
  cost: CostCategory;
  onChange: (patch: Partial<Pick<CostCategory, "amount" | "budget">>) => void;
}) {
  const t = useAdminTheme();

  return (
    <div className={`rounded-xl p-4 ${t.form}`}>
      <div className="mb-3 flex items-center gap-2">
        <i className="size-3 rounded-full" style={{ background: cost.color }} />
        <span className={`text-base font-bold ${t.title}`}>{cost.name}</span>
      </div>
      <div className="space-y-3">
        <div>
          <span className={t.label}>Presupuesto</span>
          <Stepper
            value={cost.budget}
            step={10000}
            min={0}
            onChange={(budget) => onChange({ budget })}
          />
        </div>
        <div>
          <span className={t.label}>Ejercido</span>
          <Stepper
            value={cost.amount}
            step={10000}
            min={0}
            onChange={(amount) => onChange({ amount })}
          />
        </div>
      </div>
    </div>
  );
}
