import type { Metadata } from "next";
import AdminPanel from "@/components/AdminPanel";

export const metadata: Metadata = {
  title: "Administración de obra",
  description:
    "Panel interno REYPA para actualizar avance, costos y evidencias desde campo.",
};

export default function AdminPage() {
  return (
    <section className="bg-[#0a0a0a] pb-24 pt-28 md:pb-32 md:pt-32">
      <div className="container-reypa">
        <div className="mb-8 max-w-2xl">
          <span className="eyebrow">Uso interno</span>
          <h1 className="heading-section mt-6 text-balance">
            Panel de
            <span className="font-editorial italic text-[#d4b28c]"> residentes.</span>
          </h1>
          <p className="mt-5 text-sm font-light leading-7 text-white/45">
            Métricas, bitácora, extras, materiales y evidencias desde campo. Todo lo
            que publiques aquí se refleja en el Portal de Clientes.
          </p>
        </div>
        <AdminPanel />
      </div>
    </section>
  );
}
