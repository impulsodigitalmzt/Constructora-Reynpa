export type CostCategory = {
  id: "materiales" | "manoObra" | "equipos" | "subcontratistas" | "manoObraForanea";
  name: string;
  amount: number;
  budget: number;
  color: string;
};

export type MonthlyPoint = {
  month: string;
  programado: number;
  ejecutado: number;
  costos: number;
};

export type StageProgress = {
  label: string;
  value: number;
  color: string;
};

export type EvidenceItem = {
  id: string;
  type: "image" | "video";
  description: string;
  dataUrl: string;
  createdAt: string;
  author: string;
};

export type BitacoraTipo = "clima" | "supervision" | "retraso" | "general";

export type BitacoraEntry = {
  id: string;
  date: string;
  tipo: BitacoraTipo;
  notes: string;
  createdAt: string;
  author: string;
};

export type ChangeOrderStatus = "pendiente" | "aprobado";

export type ChangeOrder = {
  id: string;
  description: string;
  cost: number;
  status: ChangeOrderStatus;
  createdAt: string;
};

export type MaterialReceipt = {
  id: string;
  provider: string;
  material: string;
  ticketDataUrl?: string;
  createdAt: string;
};

export type ObraState = {
  projectName: string;
  projectCode: string;
  progress: number;
  spi: number;
  cpi: number;
  budgetTotal: number;
  costs: CostCategory[];
  monthly: MonthlyPoint[];
  stages: StageProgress[];
  evidences: EvidenceItem[];
  bitacora: BitacoraEntry[];
  changeOrders: ChangeOrder[];
  materials: MaterialReceipt[];
  updatedAt: string;
};

export const OBRA_STORAGE_KEY = "reypa-obra-store-v1";
export const ADMIN_SESSION_KEY = "reypa-admin-session";

export const ADMIN_DEMO = {
  user: "ingeniero@reypa.mx",
  password: "obra-2026",
};

export const BITACORA_TIPOS: { id: BitacoraTipo; label: string }[] = [
  { id: "clima", label: "Clima" },
  { id: "supervision", label: "Visita de supervisión" },
  { id: "retraso", label: "Retraso" },
  { id: "general", label: "Nota general" },
];

const COST_COLORS = {
  materiales: "#d4b28c",
  manoObra: "#b8925f",
  equipos: "#e4c9a8",
  subcontratistas: "#8fa3b5",
  manoObraForanea: "#6b6b6b",
} as const;

const STAGE_COLORS = ["#d4b28c", "#b8925f", "#e4c9a8", "#8fa3b5", "#c4a882"];

export const defaultObraState = (): ObraState => ({
  projectName: "Residencia Lomas",
  projectCode: "REY-024",
  progress: 68,
  spi: 0.96,
  cpi: 1.04,
  budgetTotal: 3000000,
  costs: [
    {
      id: "materiales",
      name: "Materiales",
      amount: 985262,
      budget: 1100000,
      color: COST_COLORS.materiales,
    },
    {
      id: "manoObra",
      name: "Mano de obra",
      amount: 721050,
      budget: 850000,
      color: COST_COLORS.manoObra,
    },
    {
      id: "equipos",
      name: "Equipos",
      amount: 278420,
      budget: 320000,
      color: COST_COLORS.equipos,
    },
    {
      id: "subcontratistas",
      name: "Subcontratistas",
      amount: 214210,
      budget: 380000,
      color: COST_COLORS.subcontratistas,
    },
    {
      id: "manoObraForanea",
      name: "Mano de obra foránea",
      amount: 140180,
      budget: 350000,
      color: COST_COLORS.manoObraForanea,
    },
  ],
  monthly: [
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
  ],
  stages: [
    { label: "Preliminares", value: 100, color: STAGE_COLORS[0] },
    { label: "Cimentación", value: 100, color: STAGE_COLORS[1] },
    { label: "Estructura", value: 82, color: STAGE_COLORS[2] },
    { label: "Instalaciones", value: 46, color: STAGE_COLORS[3] },
    { label: "Acabados", value: 12, color: STAGE_COLORS[4] },
  ],
  evidences: [],
  bitacora: [
    {
      id: "bit-demo-1",
      date: "2026-07-28",
      tipo: "supervision",
      notes: "Revisión de armado en losa planta alta. Autorizado para colado.",
      createdAt: "2026-07-28T18:20:00.000Z",
      author: "Residente de obra",
    },
  ],
  changeOrders: [
    {
      id: "oc-demo-1",
      description: "Cambio de cancelería a cristal templado en terraza",
      cost: 48500,
      status: "pendiente",
      createdAt: "2026-07-22T16:00:00.000Z",
    },
  ],
  materials: [],
  updatedAt: new Date().toISOString(),
});

export function getSpentTotal(state: ObraState) {
  return state.costs.reduce((sum, item) => sum + item.amount, 0);
}

export function getBudgetByRubro(state: ObraState) {
  return state.costs.reduce((sum, item) => sum + (item.budget || 0), 0);
}

export function withCostPercents(state: ObraState) {
  const total = Math.max(getSpentTotal(state), 1);
  return state.costs.map((item) => ({
    ...item,
    percent: Math.round((item.amount / total) * 100),
  }));
}

function normalizeCosts(costs?: Partial<CostCategory>[]): CostCategory[] {
  const defaults = defaultObraState().costs;
  if (!costs?.length) return defaults;

  return costs.map((item, index) => {
    const fallback = defaults.find((d) => d.id === item.id) ?? defaults[index] ?? defaults[0];
    return {
      id: (item.id ?? fallback.id) as CostCategory["id"],
      name: item.name ?? fallback.name,
      amount: Number(item.amount ?? fallback.amount) || 0,
      budget: Number(item.budget ?? fallback.budget) || 0,
      color: item.color ?? fallback.color,
    };
  });
}

function normalizeStages(stages?: Partial<StageProgress>[]): StageProgress[] {
  const defaults = defaultObraState().stages;
  if (!stages?.length) return defaults;

  return stages.map((item, index) => ({
    label: item.label ?? defaults[index]?.label ?? `Etapa ${index + 1}`,
    value: Math.min(100, Math.max(0, Number(item.value ?? 0) || 0)),
    color: item.color ?? STAGE_COLORS[index % STAGE_COLORS.length],
  }));
}

export function readObraState(): ObraState {
  if (typeof window === "undefined") return defaultObraState();

  try {
    const raw = window.localStorage.getItem(OBRA_STORAGE_KEY);
    if (!raw) {
      const initial = defaultObraState();
      window.localStorage.setItem(OBRA_STORAGE_KEY, JSON.stringify(initial));
      return initial;
    }

    const parsed = JSON.parse(raw) as Partial<ObraState>;
    const base = defaultObraState();
    return {
      ...base,
      ...parsed,
      costs: normalizeCosts(parsed.costs),
      monthly: parsed.monthly?.length ? parsed.monthly : base.monthly,
      stages: normalizeStages(parsed.stages),
      evidences: parsed.evidences ?? [],
      bitacora: parsed.bitacora ?? base.bitacora,
      changeOrders: parsed.changeOrders ?? base.changeOrders,
      materials: parsed.materials ?? [],
    };
  } catch {
    return defaultObraState();
  }
}

export function writeObraState(state: ObraState) {
  if (typeof window === "undefined") return;
  const next = { ...state, updatedAt: new Date().toISOString() };
  window.localStorage.setItem(OBRA_STORAGE_KEY, JSON.stringify(next));
  window.dispatchEvent(new CustomEvent("reypa-obra-updated", { detail: next }));
}

export function updateObraState(patch: Partial<ObraState>) {
  const current = readObraState();
  const next = { ...current, ...patch };
  writeObraState(next);
  return next;
}

export function isAdminSessionActive() {
  if (typeof window === "undefined") return false;
  return window.sessionStorage.getItem(ADMIN_SESSION_KEY) === "1";
}

export function setAdminSession(active: boolean) {
  if (typeof window === "undefined") return;
  if (active) window.sessionStorage.setItem(ADMIN_SESSION_KEY, "1");
  else window.sessionStorage.removeItem(ADMIN_SESSION_KEY);
}

export async function fileToDataUrl(file: File, maxBytes = 1_800_000): Promise<string> {
  if (file.size > maxBytes && file.type.startsWith("image/")) {
    return compressImage(file, maxBytes);
  }

  if (file.size > 4_500_000) {
    throw new Error("El archivo es demasiado grande para la demo (máx. ~4.5 MB).");
  }

  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = () => reject(new Error("No se pudo leer el archivo."));
    reader.readAsDataURL(file);
  });
}

async function compressImage(file: File, maxBytes: number) {
  const bitmap = await createImageBitmap(file);
  const canvas = document.createElement("canvas");
  const scale = Math.min(1, 1280 / Math.max(bitmap.width, bitmap.height));
  canvas.width = Math.round(bitmap.width * scale);
  canvas.height = Math.round(bitmap.height * scale);
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("No se pudo procesar la imagen.");
  ctx.drawImage(bitmap, 0, 0, canvas.width, canvas.height);

  let quality = 0.82;
  let dataUrl = canvas.toDataURL("image/jpeg", quality);
  while (dataUrl.length > maxBytes * 1.37 && quality > 0.4) {
    quality -= 0.12;
    dataUrl = canvas.toDataURL("image/jpeg", quality);
  }
  return dataUrl;
}
