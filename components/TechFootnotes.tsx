import type { ReactNode } from "react";

const DEFAULT_NOTES = [
  {
    id: "kpi",
    term: "KPI",
    meaning: "Indicador clave del estado del proyecto (avance, plazos, presupuesto).",
  },
  {
    id: "donut",
    term: "Donut",
    meaning: "Gráfico de anillo que reparte el avance entre etapas de obra.",
  },
  {
    id: "spi",
    term: "SPI",
    meaning: "Índice de tiempo: ≈1.0 = a tiempo; <1.0 = retraso.",
  },
  {
    id: "cpi",
    term: "CPI",
    meaning: "Índice de costo: ≈1.0 o más = gasto controlado.",
  },
  {
    id: "rubro",
    term: "Rubro",
    meaning: "Categoría del presupuesto (materiales, mano de obra, etc.).",
  },
  {
    id: "saas",
    term: "SaaS",
    meaning: "Software en la nube, accesible por internet sin instalar nada.",
  },
] as const;

export type TechNoteId = (typeof DEFAULT_NOTES)[number]["id"];

export function TechTerm({
  children,
  n,
}: {
  children: ReactNode;
  n: number;
}) {
  return (
    <span className="whitespace-nowrap">
      {children}
      <sup className="ml-0.5 text-[0.65em] font-semibold opacity-70">[{n}]</sup>
    </span>
  );
}

export default function TechFootnotes({
  ids,
  tone = "light",
  compact = false,
}: {
  ids: TechNoteId[];
  tone?: "light" | "dark";
  /** Notas compactas bajo la gráfica */
  compact?: boolean;
}) {
  const notes = ids
    .map((id, index) => {
      const note = DEFAULT_NOTES.find((item) => item.id === id);
      if (!note) return null;
      return { ...note, n: index + 1 };
    })
    .filter(Boolean) as Array<(typeof DEFAULT_NOTES)[number] & { n: number }>;

  if (!notes.length) return null;

  const border = tone === "dark" ? "border-white/10" : "border-black/15";
  const title = tone === "dark" ? "text-white/35" : "text-black/40";
  const body = tone === "dark" ? "text-white/40" : "text-black/50";

  return (
    <aside
      className={`${compact ? "mt-4 pt-3" : "mt-6 pt-4"} border-t ${border}`}
      aria-label="Notas aclaratorias"
    >
      <p className={`mb-2 text-[0.52rem] font-semibold uppercase tracking-[0.16em] ${title}`}>
        Notas
      </p>
      <ol
        className={`grid gap-x-4 gap-y-1.5 ${
          compact ? "grid-cols-1 sm:grid-cols-2" : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
        } text-[0.62rem] font-light leading-4 ${body}`}
      >
        {notes.map((note) => (
          <li key={note.id} id={`nota-${note.id}`} className="flex gap-1.5">
            <span className="shrink-0 font-semibold opacity-80">[{note.n}]</span>
            <span>
              <span className="font-medium opacity-90">{note.term}:</span> {note.meaning}
            </span>
          </li>
        ))}
      </ol>
    </aside>
  );
}
