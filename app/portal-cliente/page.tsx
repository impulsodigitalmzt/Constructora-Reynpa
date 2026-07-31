import type { Metadata } from "next";
import Image from "next/image";
import PortalDashboard from "@/components/PortalDashboard";
import { LockKeyhole } from "lucide-react";

export const metadata: Metadata = {
  title: "Portal de Clientes",
  description: "Demo del panel digital de seguimiento de obra de REYPA Arquitectura.",
};

export default function PortalClientePage() {
  return (
    <>
      <section className="noise relative flex min-h-[72vh] items-end overflow-hidden bg-[#0a0a0a] pb-20 pt-40 md:min-h-[82vh] md:pb-28 md:pt-48">
        <Image
          src="/foto/OBRA/747625965_17900286720499562_7975554370235012092_n.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/75 to-black/25" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-black/55" />
        <div className="absolute inset-0 grid-lines opacity-15" />
        <div className="container-reypa relative z-10">
          <div className="grid gap-12 lg:grid-cols-[1.2fr_.8fr] lg:items-end">
            <div>
              <span className="eyebrow">Experiencia cliente</span>
              <h1 className="heading-display mt-12 text-balance">
                Tu obra.
                <span className="font-editorial block pl-[8vw] italic text-[#d4b28c]">Clara y conectada.</span>
              </h1>
            </div>
            <div>
              <p className="max-w-lg border-l border-[#d4b28c]/40 pl-6 text-sm font-light leading-7 text-white/42">
                Un espacio privado para consultar avances, presupuesto, agenda y evidencia
                audiovisual. La tranquilidad de saber cómo progresa tu inversión.
              </p>
              <div className="mt-7 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[.025] px-4 py-2 text-[0.55rem] uppercase tracking-[0.18em] text-[#d4b28c]">
                <LockKeyhole size={13} /> Vista demostrativa
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#0a0a0a] pb-28 md:pb-44">
        <div className="container-reypa">
          <PortalDashboard />
        </div>
      </section>

      <section className="bg-[#d8c7b3] py-24 text-[#0a0a0a] md:py-36">
        <div className="container-reypa grid gap-14 lg:grid-cols-[1fr_.72fr] lg:items-stretch">
          <div className="flex flex-col justify-center">
            <span className="inline-flex items-center gap-3 text-[0.6rem] font-semibold uppercase tracking-[0.25em]">
              <span className="h-px w-10 bg-black/60" /> Evidencia desde obra
            </span>
            <h2 className="font-editorial mt-9 text-4xl leading-[1.02] md:text-6xl">
              No tienes que imaginar el avance. Puedes verlo.
            </h2>
            <p className="mt-8 max-w-lg text-sm leading-7 text-black/55">
              Cada actualización del portal combina información de avance con fotografías y
              videos capturados en sitio. Esto permite entender qué se ejecutó, qué está en
              revisión y cuáles son las próximas actividades.
            </p>
            <div className="mt-10 grid grid-cols-2 gap-3">
              {[
                ["24/7", "Acceso al proyecto"],
                ["100%", "Evidencia organizada"],
                ["1 sitio", "Toda la información"],
                ["Directo", "Contacto con REYPA"],
              ].map(([value, label]) => (
                <div key={label} className="rounded-xl border border-black/15 bg-[#d8c7b3] p-5">
                  <p className="font-editorial text-3xl italic">{value}</p>
                  <p className="mt-2 text-[0.54rem] uppercase tracking-[0.18em] text-black/45">{label}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="relative min-h-[28rem] w-full overflow-hidden rounded-2xl border border-black/15 bg-black lg:min-h-0 lg:max-w-md lg:justify-self-end">
            <video
              src="/video/AQO7zqrBLunM_-AAN4WHpaT1zqtzOue-UyF083Xg_8pnZBty30YZ4REP1WPcnEbZYBYjx9yqOd_ewWPKXVA22ezJJLSGrEq8nkj_8pSneA.mp4"
              autoPlay
              loop
              controls
              muted
              playsInline
              preload="auto"
              className="absolute inset-0 size-full object-contain"
            />
            <div className="pointer-events-none absolute left-5 top-5 rounded-xl bg-[#d8c7b3] px-4 py-3">
              <p className="text-[0.52rem] font-semibold uppercase tracking-[0.2em]">Evidencia verificada</p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-white/10 bg-[#121212] py-24 md:py-36">
        <div className="container-reypa grid gap-12 md:grid-cols-[.7fr_1.3fr]">
          <span className="eyebrow self-start">Cómo funciona</span>
          <div>
            <h2 className="heading-section text-balance">
              Información útil.
              <span className="font-editorial block italic text-[#d4b28c]">Nada de ruido.</span>
            </h2>
            <div className="mt-14 grid gap-4 sm:grid-cols-2">
              <div className="luxury-card rounded-2xl p-7">
                <span className="text-[0.58rem] tracking-[0.2em] text-[#d4b28c]">01</span>
                <h3 className="font-editorial mt-12 text-2xl">Actualizaciones verificadas</h3>
                <p className="mt-4 text-sm font-light leading-7 text-white/40">
                  Cada evidencia se vincula a una etapa, fecha y responsable del proyecto.
                </p>
              </div>
              <div className="luxury-card rounded-2xl p-7">
                <span className="text-[0.58rem] tracking-[0.2em] text-[#d4b28c]">02</span>
                <h3 className="font-editorial mt-12 text-2xl">Decisiones con contexto</h3>
                <p className="mt-4 text-sm font-light leading-7 text-white/40">
                  El avance físico, financiero y de agenda se consulta en una misma vista.
                </p>
              </div>
              <div className="luxury-card rounded-2xl p-7">
                <span className="text-[0.58rem] tracking-[0.2em] text-[#d4b28c]">03</span>
                <h3 className="font-editorial mt-12 text-2xl">Presupuesto comprensible</h3>
                <p className="mt-4 text-sm font-light leading-7 text-white/40">
                  Consulta lo ejercido y el avance financiero sin depender de documentos aislados.
                </p>
              </div>
              <div className="luxury-card rounded-2xl p-7">
                <span className="text-[0.58rem] tracking-[0.2em] text-[#d4b28c]">04</span>
                <h3 className="font-editorial mt-12 text-2xl">Próximas actividades</h3>
                <p className="mt-4 text-sm font-light leading-7 text-white/40">
                  Anticipa revisiones, entregas y decisiones que requieren participación del cliente.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
