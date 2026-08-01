import type { Metadata } from "next";
import Image from "next/image";
import {
  Building2,
  FileCheck2,
  HardHat,
  Layers3,
  Paintbrush2,
  WalletCards,
} from "lucide-react";
import ArrowLink from "@/components/motion/ArrowLink";
import PortalPreviewCard from "@/components/PortalPreviewCard";

export const metadata: Metadata = {
  title: "Servicios",
  description: "Servicios integrales de arquitectura, diseño, presupuestos y construcción.",
};

const services = [
  {
    icon: FileCheck2,
    title: "Trámites y permisos",
    text: "Gestionamos licencias, visados y documentación técnica para que tu proyecto cuente con todas las garantías.",
    image: "/foto/LICENCIAS CONSTRUCCION.jpg",
    alt: "Licencia de construcción aprobada sobre planos arquitectónicos",
    stamp: "APROBADO",
  },
  {
    icon: Building2,
    title: "Proyecto arquitectónico",
    text: "Desarrollamos plantas, alzados y presupuestos para lograr una propuesta espacial funcional, estética y sostenible.",
    image: "/foto/PROYECTO ARQUITECTONICO.webp",
    alt: "Modelo tridimensional de un proyecto arquitectónico",
  },
  {
    icon: Layers3,
    title: "Proyecto ejecutivo",
    text: "Elaboramos planos, detalles y especificaciones que definen la estructura, instalaciones y acabados para una ejecución precisa.",
    image: "/foto/PROYECTO EJECUTIVO.webp",
    alt: "Documentación técnica de un proyecto ejecutivo",
  },
  {
    icon: Paintbrush2,
    title: "Diseño interior",
    text: "Diseñamos espacios interiores coherentes mediante distribución, iluminación, materiales, mobiliario y color para crear ambientes únicos.",
    image: "/foto/DISELO INTERIOR.jpg",
    alt: "Diseño interior contemporáneo con materiales cálidos",
  },
  {
    icon: WalletCards,
    title: "Presupuestos",
    text: "Cuantificamos conceptos, materiales y mano de obra para tomar decisiones informadas antes de ejecutar.",
    image: "/foto/PRESUPUESTO DE CONSTRUCCION.jpg",
    alt: "Elaboración de presupuesto para construcción",
  },
  {
    icon: HardHat,
    title: "Construcción",
    text: "Supervisamos la ejecución técnica de la obra, asegurando calidad, tiempos, seguridad y viabilidad del proyecto.",
    image: "/foto/CONSTRUCCION.jpg",
    alt: "Personal trabajando durante la construcción de una estructura",
  },
];

export default function ServiciosPage() {
  return (
    <>
      <section className="noise relative flex min-h-[72vh] items-end overflow-hidden bg-[#0a0a0a] pb-24 pt-40 md:min-h-[82vh] md:pb-28 md:pt-52">
        <Image
          src="/foto/PLANEACION.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/70 to-black/25" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/50" />
        <div className="absolute inset-0 grid-lines opacity-15" />
        <div className="container-reypa relative z-10">
          <span className="eyebrow relative z-10">Servicios integrales</span>
          <div className="relative z-10 mt-12 grid gap-12 lg:grid-cols-[1.25fr_.75fr] lg:items-end">
            <h1 className="heading-display text-balance">
              De la idea
              <span className="font-editorial block pl-[8vw] italic text-[#d4b28c]">a la materia.</span>
            </h1>
            <p className="max-w-md text-sm font-light leading-7 text-white/45">
              Un solo equipo acompaña todo el proceso. Menos fricción, mayor coordinación y
              decisiones que conservan la esencia del proyecto.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-[#0a0a0a] pb-28 md:pb-44">
        <div className="container-reypa grid gap-4 md:grid-cols-2">
          {services.map(({ icon: Icon, title, text, image, alt, stamp }, index) => (
            <article
              key={title}
              className="service-card group overflow-hidden rounded-2xl p-0"
            >
              <div className="relative aspect-[16/9] overflow-hidden bg-[#0f0f0f]">
                <Image
                  src={image}
                  alt={alt}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-contain transition-transform duration-1000 ease-out group-hover:scale-[1.025]"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-black/5" />
                <span className="absolute left-5 top-5 z-10 grid size-11 place-items-center rounded-full border border-[#d4b28c]/60 bg-[#171717]/90 text-[#d4b28c] shadow-xl backdrop-blur-md transition-all duration-500 group-hover:border-[#d4b28c] group-hover:bg-[#171717]">
                  <Icon size={19} strokeWidth={1.35} />
                </span>
                <span className="absolute right-5 top-6 z-10 text-[0.54rem] tracking-[0.23em] text-white/70">
                  0{index + 1}
                </span>
                {stamp && (
                  <span className="absolute bottom-4 right-5 z-10 -rotate-3 rounded border border-red-500/70 bg-black/55 px-3 py-1.5 text-[0.58rem] font-bold tracking-[0.22em] text-red-500 backdrop-blur-sm">
                    {stamp}
                  </span>
                )}
              </div>
              <div className="flex min-h-[13.5rem] flex-col bg-[#171717] p-6 md:p-7">
                <h2 className="font-editorial text-2xl leading-tight md:text-3xl">{title}</h2>
                <span className="my-4 block h-px w-12 bg-[#d4b28c]/70 transition-all duration-700 group-hover:w-20 group-hover:bg-[#d4b28c]" />
                <p className="max-w-xl text-sm font-light leading-6 text-white/45">{text}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-[#d8c7b3] py-24 text-[#0a0a0a] md:py-36">
        <div className="container-reypa">
          <div className="grid gap-14 lg:grid-cols-[.8fr_1.2fr] lg:items-start">
            <div className="lg:sticky lg:top-32">
              <span className="inline-flex items-center gap-3 text-[0.6rem] font-semibold uppercase tracking-[0.25em]">
                <span className="h-px w-10 bg-black/60" /> Proceso de trabajo
              </span>
              <h2 className="heading-section mt-10">
                Orden para
                <span className="font-editorial block italic text-black/55">construir mejor.</span>
              </h2>
              <p className="mt-8 max-w-md text-sm leading-7 text-black/55">
                Organizamos el proyecto en etapas claras. Cada fase produce información,
                decisiones y entregables concretos antes de avanzar a la siguiente.
              </p>
            </div>

            <div className="border-t border-black/20">
              {[
                ["01", "Diagnóstico y alcance", "Visitamos el sitio, escuchamos tus necesidades, revisamos condicionantes y definimos prioridades, inversión y calendario objetivo."],
                ["02", "Anteproyecto", "Exploramos distribución, volumetría, lenguaje y materialidad. Las visualizaciones permiten evaluar el espacio antes de construir."],
                ["03", "Desarrollo ejecutivo", "Coordinamos arquitectura, estructura, instalaciones, acabados y detalles para reducir dudas durante la ejecución."],
                ["04", "Presupuesto y planeación", "Cuantificamos conceptos, organizamos etapas y establecemos un programa de obra con información transparente."],
                ["05", "Construcción y seguimiento", "Supervisamos calidad, documentamos avances y mantenemos al cliente informado mediante reportes y evidencia audiovisual."],
              ].map(([number, title, text]) => (
                <article key={number} className="grid gap-4 border-b border-black/20 py-8 md:grid-cols-[.16fr_.6fr_1fr]">
                  <span className="text-[0.58rem] tracking-[0.2em] text-black/35">{number}</span>
                  <h3 className="font-editorial text-2xl">{title}</h3>
                  <p className="text-sm leading-7 text-black/52">{text}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#0a0a0a] py-24 md:py-36">
        <div className="container-reypa grid gap-12 lg:grid-cols-[.85fr_1.15fr] lg:items-stretch">
          <div className="relative aspect-[3/4] w-full overflow-hidden rounded-2xl border-[3px] border-white/20 bg-[#0a0a0a] shadow-[0_40px_100px_rgba(0,0,0,0.45)] sm:aspect-[4/5] lg:aspect-auto lg:min-h-full lg:self-stretch">
            <video
              src="/video/AQMRwYR-7odwkxuYptMByjkRZWbhnebEIrITEk84RQF9k2Kd8fQdChU1QrQNBz-NDlT5lo40UQt48MyrpZTBlpJvlvHf3k89g6YXrRS6QQ.mp4"
              autoPlay
              loop
              controls
              muted
              playsInline
              preload="auto"
              className="absolute inset-0 size-full object-cover object-center"
            />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/50 to-transparent" />
          </div>
          <div className="flex flex-col justify-center">
            <span className="eyebrow">Ejecución en campo</span>
            <h2 className="font-editorial mt-9 text-4xl leading-[1.02] md:text-6xl">
              Del plano a la realidad, sin perder la intención.
            </h2>
            <p className="mt-8 text-sm font-light leading-7 text-white/45">
              La obra es el momento en que todas las decisiones se encuentran. Nuestro equipo
              coordina proveedores, especialidades, materiales y tiempos para mantener la
              calidad prevista desde el diseño.
            </p>
            <div className="mt-9 grid grid-cols-2 gap-3">
              {[
                ["Supervisión", "Revisión continua de ejecución y acabados."],
                ["Documentación", "Evidencia visual y reportes de avance."],
                ["Coordinación", "Comunicación directa con responsables de obra."],
                ["Control", "Seguimiento de calendario y presupuesto."],
              ].map(([title, text]) => (
                <div key={title} className="rounded-xl border-[3px] border-white/15 p-5">
                  <p className="text-xs text-[#d4b28c]">{title}</p>
                  <p className="mt-3 text-xs leading-5 text-white/35">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="noise overflow-hidden border-y border-black/10 bg-[#d8c7b3] py-28 text-[#0a0a0a] md:py-44">
        <div className="container-reypa relative z-10 grid gap-16 lg:grid-cols-[.75fr_1.25fr] lg:items-stretch">
          <div className="flex min-h-0 flex-col justify-between gap-10 lg:py-2">
            <div>
              <span className="inline-flex items-center gap-3 text-[0.6rem] font-semibold uppercase tracking-[0.25em]">
                <span className="h-px w-10 bg-black/60" /> Portal de obra SaaS
              </span>
              <h2 className="heading-section mt-10 text-balance text-[#0a0a0a]">
                Control visible.
                <span className="font-editorial block italic text-black/55">Confianza real.</span>
              </h2>
            </div>

            <div className="max-w-lg space-y-5 text-sm font-light leading-7 text-black/55">
              <p>
                Nuestro Portal de Obra reúne progreso, presupuesto, evidencia visual y próximas
                actividades. El cliente entiende qué está sucediendo, qué sigue y cómo evoluciona
                su inversión.
              </p>
              <p>
                Desde una sola pantalla puedes revisar el avance global, los días transcurridos
                desde el inicio, la fecha estimada de entrega y el monto ejercido frente al
                presupuesto autorizado. Las gráficas desglosan etapas físicas y rubros
                financieros para que cada decisión tenga contexto.
              </p>
              <p>
                El residente actualiza métricas, bitácora y evidencias desde campo; tú las ves
                al instante en el portal. Menos mensajes dispersos, más claridad operativa y
                una experiencia de seguimiento a la altura de un proyecto de arquitectura.
              </p>
              <ul className="space-y-3 border-t border-black/15 pt-5 text-[0.78rem] leading-6 text-black/50">
                <li className="flex gap-3">
                  <span className="mt-2 size-1 shrink-0 rounded-full bg-black/70" />
                  Vista Resumen con KPIs, donut de etapas y desglose presupuestario.
                </li>
                <li className="flex gap-3">
                  <span className="mt-2 size-1 shrink-0 rounded-full bg-black/70" />
                  Módulo financiero con curvas de avance, costos y desempeño SPI/CPI.
                </li>
                <li className="flex gap-3">
                  <span className="mt-2 size-1 shrink-0 rounded-full bg-black/70" />
                  Galería de evidencias para validar avance sin depender solo del reporte oral.
                </li>
              </ul>
            </div>

            <ArrowLink
              href="/portal-cliente"
              className="text-[0.62rem] font-semibold uppercase tracking-[0.22em] text-black transition-colors hover:text-black/55"
            >
              Entrar al portal demo
            </ArrowLink>
          </div>

          <PortalPreviewCard />
        </div>
      </section>
    </>
  );
}
