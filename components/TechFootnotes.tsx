import type { ReactNode } from "react";

const DEFAULT_NOTES = [
  {
    id: "kpi",
    term: "KPI",
    meaning:
      "Indicador clave de desempeño: cifra que resume el estado del proyecto (avance, plazos, presupuesto, etc.).",
  },
  {
    id: "donut",
    term: "Donut / gráfico de anillo",
    meaning:
      "Gráfica circular con un hueco al centro que muestra cómo se reparte el avance entre etapas de obra.",
  },
  {
    id: "spi",
    term: "SPI",
    meaning:
      "Schedule Performance Index (índice de desempeño del cronograma): indica si la obra va a tiempo. Cerca de 1.0 = en tiempo; menor a 1.0 = retraso.",
  },
  {
    id: "cpi",
    term: "CPI",
    meaning:
      "Cost Performance Index (índice de desempeño del costo): indica si el gasto va acorde al presupuesto. Cerca de 1.0 o mayor = buen control de costos.",
  },
  {
    id: "rubro",
    term: "Rubro",
    meaning:
      "Categoría del presupuesto (materiales, mano de obra, equipo, subcontratistas, etc.).",
  },
  {
    id: "saas",
    term: "SaaS",
    meaning:
      "Software as a Service: plataforma digital accesible por internet, sin instalar programas en tu equipo.",
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
}: {
  ids: TechNoteId[];
  tone?: "light" | "dark";
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
  const body = tone === "dark" ? "text-white/35" : "text-black/45";

  return (
    <aside className={`mt-6 border-t ${border} pt-4`} aria-label="Notas aclaratorias">
      <p className={`mb-2.5 text-[0.55rem] font-semibold uppercase tracking-[0.16em] ${title}`}>
        Notas
      </p>
      <ol className={`space-y-2 text-[0.68rem] font-light leading-5 ${body}`}>
        {notes.map((note) => (
          <li key={note.id} id={`nota-${note.id}`} className="flex gap-2">
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
