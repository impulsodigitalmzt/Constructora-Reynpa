import type { Metadata } from "next";
import AdminPanel from "@/components/AdminPanel";

export const metadata: Metadata = {
  title: "Administración de obra",
  description:
    "Panel interno REYPA para actualizar avance, costos y evidencias desde campo.",
};

export default function AdminPage() {
  return (
    <section className="pb-16 pt-24 md:pb-24 md:pt-28">
      <div className="container-reypa">
        <AdminPanel />
      </div>
    </section>
  );
}
