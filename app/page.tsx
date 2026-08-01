import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BarChart3, Eye, ShieldCheck } from "lucide-react";
import DesignCarousel from "@/components/DesignCarousel";
import ArrowLink from "@/components/motion/ArrowLink";
import { FadeIn, FadeInItem, Stagger } from "@/components/motion/FadeIn";
import HoverLift3D from "@/components/motion/HoverLift3D";
import LandingHero from "@/components/motion/LandingHero";
import RevealHeading from "@/components/motion/RevealHeading";
import PortalPreviewCard from "@/components/PortalPreviewCard";
import TechFootnotes, { TechTerm } from "@/components/TechFootnotes";

const values = [
  {
    icon: Eye,
    number: "01",
    title: "Visibilidad real",
    text: "Consulta avances, decisiones y evidencias de tu proyecto sin depender de reportes aislados.",
  },
  {
    icon: BarChart3,
    number: "02",
    title: "Control financiero",
    text: "Presupuestos claros y seguimiento por etapas para que cada inversión tenga contexto.",
  },
  {
    icon: ShieldCheck,
    number: "03",
    title: "Confianza construida",
    text: "Procesos documentados, comunicación directa y responsabilidades siempre visibles.",
  },
];

export default function Home() {
  return (
    <>
      <section className="relative grid min-h-screen overflow-hidden bg-[#0a0a0a] text-[#f4f4f5] lg:grid-cols-[.9fr_1.1fr]">
        <LandingHero />

        <div className="relative min-h-[54vh] overflow-hidden bg-[#d8c7b3] lg:min-h-screen">
          <Image
            src="/foto/DISEÑOS/702625085_1607513934708448_3777016774527702021_n.jpg"
            alt="Diseño interior contemporáneo desarrollado por REYPA Arquitectura"
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 55vw"
            className="object-cover transition-transform duration-[1600ms] ease-out hover:scale-[1.025]"
          />
          <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-28 bg-gradient-to-b from-[#0a0a0a] via-[#0a0a0a]/55 to-transparent lg:inset-y-0 lg:left-0 lg:right-auto lg:h-auto lg:w-40 lg:bg-gradient-to-r lg:from-[#0a0a0a] lg:via-[#0a0a0a]/60 lg:to-transparent" />
          <div className="absolute bottom-4 left-4 rounded-2xl bg-[#d8c7b3] px-5 py-4 text-[#0a0a0a]">
            <p className="text-[0.52rem] font-semibold uppercase tracking-[0.24em]">Diseño interior · REYPA</p>
            <p className="font-editorial mt-1 text-lg italic">Habitar con intención.</p>
          </div>
          <div className="absolute right-5 top-24 flex items-center gap-3 text-[0.5rem] font-semibold uppercase tracking-[0.22em] text-black/55">
            <span className="h-px w-10 bg-black/50" /> Mazatlán, Sinaloa
          </div>
        </div>
      </section>

      <section className="bg-[#0a0a0a] py-28 md:py-44">
        <div className="container-reypa">
          <FadeIn inView className="grid gap-12 lg:grid-cols-[.65fr_1.35fr]">
            <div>
              <span className="eyebrow">Nuestro manifiesto</span>
              <p className="mt-8 max-w-xs text-sm font-light leading-7 text-white/42">
                Creemos que la arquitectura excepcional no necesita excesos. Necesita intención,
                precisión y una relación honesta con quien la habita.
              </p>
            </div>
            <RevealHeading className="heading-section text-balance text-white/95" as="h2">
              La confianza también
            </RevealHeading>
          </FadeIn>
          <p className="font-editorial mt-2 text-right text-3xl italic text-[#d4b28c] md:text-5xl lg:-mt-10 lg:pl-[35%]">
            se diseña.
          </p>

          <Stagger className="mt-20 grid auto-rows-[minmax(13rem,auto)] gap-3 md:grid-cols-12" delay={0.05} inView>
            <FadeInItem className="md:col-span-7 md:row-span-2">
              <HoverLift3D className="h-full">
                <article className="luxury-card group relative min-h-[26rem] overflow-hidden rounded-2xl">
                  <Image
                    src="/foto/DISEÑOS/493945530_1260234636103048_7833668012152188885_n.jpg"
                    alt="Diseño interior contemporáneo de REYPA"
                    fill
                    sizes="(max-width: 768px) 100vw, 58vw"
                    className="object-cover opacity-70 transition-all duration-700 group-hover:scale-105 group-hover:opacity-90"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/10 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-7 md:p-10">
                    <span className="text-[0.58rem] uppercase tracking-[0.25em] text-[#d4b28c]">01 · Espacios con propósito</span>
                    <h3 className="font-editorial mt-4 max-w-lg text-3xl leading-tight md:text-5xl">Cada línea responde a una forma de vivir.</h3>
                  </div>
                </article>
              </HoverLift3D>
            </FadeInItem>

            {values.slice(0, 2).map(({ icon: Icon, number, title, text }) => (
              <FadeInItem key={title} className="md:col-span-5">
                <HoverLift3D className="h-full">
                  <article className="luxury-card h-full rounded-2xl p-7 md:p-9">
                    <div className="flex items-start justify-between">
                      <Icon size={25} strokeWidth={1.25} className="text-[#d4b28c]" />
                      <span className="text-[0.58rem] tracking-[0.2em] text-white/25">{number}</span>
                    </div>
                    <div className="mt-12">
                      <h3 className="text-2xl font-light tracking-[-0.03em]">{title}</h3>
                      <p className="mt-3 max-w-sm text-sm font-light leading-6 text-white/45">{text}</p>
                    </div>
                  </article>
                </HoverLift3D>
              </FadeInItem>
            ))}

            <FadeInItem className="md:col-span-5">
              <HoverLift3D className="h-full">
                <article className="luxury-card group relative min-h-64 overflow-hidden rounded-2xl">
                  <video
                    src="/video/GENERA_UN_LOGO_METALICO_TIPO_B (online-video-cutter.com).mp4"
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="auto"
                    className="absolute inset-0 size-full object-cover transition-transform duration-1000 group-hover:scale-[1.025]"
                    aria-label="Animación del logotipo metálico de REYPA"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-black/15" />
                  <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-7 md:p-9">
                    <div>
                      <p className="text-[0.55rem] uppercase tracking-[0.24em] text-[#d4b28c]">
                        Identidad REYPA
                      </p>
                      <p className="font-editorial mt-2 text-2xl italic text-white">
                        Diseño que deja huella.
                      </p>
                    </div>
                    <span className="text-[0.54rem] tracking-[0.2em] text-white/70">03</span>
                  </div>
                </article>
              </HoverLift3D>
            </FadeInItem>

            <FadeInItem className="md:col-span-7">
              <HoverLift3D className="h-full">
                <article className="luxury-card grid-lines flex min-h-64 h-full flex-col justify-end rounded-2xl p-7 md:p-9">
                  <span className="mb-5 inline-block h-px w-16 bg-[#d4b28c]" />
                  <p className="max-w-2xl text-xl font-light leading-relaxed text-white/72 md:text-2xl">
                    “La claridad no es un reporte al final. Es la manera en que construimos desde el primer día.”
                  </p>
                </article>
              </HoverLift3D>
            </FadeInItem>
          </Stagger>
        </div>
      </section>

      <section className="bg-[#d8c7b3] py-24 text-[#0a0a0a] md:py-36">
        <div className="container-reypa">
          <div className="grid gap-10 lg:grid-cols-[.7fr_1.3fr]">
            <div>
              <span className="inline-flex items-center gap-3 text-[0.6rem] font-semibold uppercase tracking-[0.25em]">
                <span className="h-px w-10 bg-black/60" /> Lo que hacemos
              </span>
              <p className="mt-7 max-w-xs text-sm leading-7 text-black/55">
                Resolvemos el proyecto de forma integral para que diseño, presupuesto y
                construcción avancen con una misma visión.
              </p>
            </div>
            <h2 className="heading-section text-balance">
              Una sola visión.
              <span className="font-editorial block italic text-black/55">De principio a fin.</span>
            </h2>
          </div>

          <div className="mt-16 border-t border-black/20">
            {[
              ["01", "Proyecto arquitectónico", "Concepto, distribución, volumetría y visualización para definir un espacio coherente con tu forma de vivir."],
              ["02", "Proyecto ejecutivo", "Planos, especificaciones y detalles técnicos que convierten el diseño en instrucciones claras para construir."],
              ["03", "Diseño interior", "Materiales, iluminación, mobiliario y atmósferas que dan identidad y continuidad a cada ambiente."],
              ["04", "Construcción y supervisión", "Coordinación de obra, control de calidad, presupuesto y seguimiento documental en cada etapa."],
            ].map(([number, title, text]) => (
              <article key={number} className="group grid gap-5 border-b border-black/20 py-8 transition-all duration-500 hover:pl-3 md:grid-cols-[.15fr_.65fr_1.2fr] md:items-center">
                <span className="text-[0.58rem] tracking-[0.2em] text-black/40">{number}</span>
                <h3 className="font-editorial text-2xl md:text-3xl">{title}</h3>
                <p className="max-w-2xl text-sm leading-7 text-black/55">{text}</p>
              </article>
            ))}
          </div>
          <Link
            href="/servicios"
            className="group mt-10 inline-flex items-center gap-4 text-[0.6rem] font-semibold uppercase tracking-[0.22em]"
          >
            Conocer todos los servicios
            <ArrowRight size={15} className="transition-transform duration-500 group-hover:translate-x-2" />
          </Link>
        </div>
      </section>

      <DesignCarousel />

      <section className="bg-[#0a0a0a] py-24 md:py-40">
        <div className="container-reypa">
          <div className="mb-14 grid gap-10 lg:grid-cols-[1.1fr_.9fr] lg:items-end">
            <h2 className="heading-section">
              La obra también
              <span className="font-editorial block italic text-[#d4b28c]">cuenta una historia.</span>
            </h2>
            <div>
              <p className="max-w-lg text-sm font-light leading-7 text-white/45">
                Documentamos el proceso para que cada cliente vea cómo el proyecto toma forma.
                La evidencia audiovisual permite entender avances, validar decisiones y mantener
                una comunicación directa con el equipo.
              </p>
              <p className="mt-5 text-[0.58rem] uppercase tracking-[0.2em] text-[#d4b28c]">
                Seguimiento real · Evidencia de campo · Control de calidad
              </p>
            </div>
          </div>

          <div className="grid gap-4 lg:grid-cols-[1.35fr_.65fr]">
            <div className="relative min-h-[34rem] overflow-hidden rounded-2xl border border-white/10 bg-[#121212]">
              <video
                src="/video/AQNdaEgBPA6NKJD444IZJB76Lxxd6hvCkMaVJV93gZEcjOqfMr25jJW3ggnRl1rWNFnDte-YhIeD5KY0mEMIkpoijQpKK_qssSUZLk0TPA.mp4"
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                className="size-full min-h-[34rem] object-cover"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 to-transparent p-7 pt-24">
                <span className="text-[0.56rem] uppercase tracking-[0.23em] text-[#d4b28c]">Bitácora de obra</span>
                <p className="font-editorial mt-3 text-3xl italic">Cada avance queda visible.</p>
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
              {[
                ["/foto/OBRA/530242268_1349573190502525_852000528287082247_n.jpg", "Ejecución"],
                ["/foto/OBRA/747625965_17900286720499562_7975554370235012092_n.jpg", "Supervisión"],
              ].map(([src, label]) => (
                <div key={src} className="group relative min-h-64 overflow-hidden rounded-2xl bg-[#1a1a1a]">
                  <Image src={src} alt={`${label} de obra REYPA`} fill sizes="(max-width: 1024px) 50vw, 30vw" className="object-cover transition duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 to-transparent" />
                  <span className="absolute bottom-5 left-5 text-[0.56rem] uppercase tracking-[0.22em] text-white/70">{label} · REYPA</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="noise border-y border-white/10 bg-[#121212] py-28 md:py-44">
        <div className="container-reypa relative z-10">
          <div className="grid gap-16 lg:grid-cols-[.9fr_1.1fr] lg:items-stretch">
            <FadeIn inView className="flex min-h-0 flex-col justify-between gap-10 lg:py-2">
              <div>
                <span className="eyebrow">Portal privado</span>
                <h2 className="heading-section mt-10 text-balance">
                  Tu obra.
                  <span className="font-editorial block italic text-[#d4b28c]">Sin puntos ciegos.</span>
                </h2>
              </div>

              <div className="max-w-lg space-y-5 text-sm font-light leading-7 text-white/45">
                <p>
                  Accede a avances, videos, presupuesto y próximas actividades desde un panel
                  privado diseñado para mantenerte informado en tiempo real.
                </p>
                <p>
                  Consulta el avance físico por etapas, el dinero ejercido frente al presupuesto
                  total y la evidencia audiovisual publicada desde campo. Cada métrica se
                  actualiza cuando el equipo de obra registra cambios en el panel interno.
                </p>
                <p>
                  Así reduces la incertidumbre entre visitas: sabes qué se construyó, qué está
                  en proceso, cuánto se ha invertido y qué falta por entregar, con la misma
                  claridad que tendrías en una reunión de supervisión.
                </p>
                <ul className="space-y-3 border-t border-white/10 pt-5 text-[0.78rem] leading-6 text-white/40">
                  <li className="flex gap-3">
                    <span className="mt-2 size-1 shrink-0 rounded-full bg-[#d4b28c]" />
                    Resumen ejecutivo con avance, plazos y presupuesto en una sola vista.
                  </li>
                  <li className="flex gap-3">
                    <span className="mt-2 size-1 shrink-0 rounded-full bg-[#d4b28c]" />
                    <span>
                      Finanzas claras: ejercido por <TechTerm n={1}>rubro</TechTerm>,{" "}
                      <TechTerm n={2}>SPI</TechTerm>/<TechTerm n={3}>CPI</TechTerm> y curva de costos.
                    </span>
                  </li>
                  <li className="flex gap-3">
                    <span className="mt-2 size-1 shrink-0 rounded-full bg-[#d4b28c]" />
                    Evidencias con foto y video para validar cada etapa sin desplazarte.
                  </li>
                </ul>
              </div>

              <ArrowLink
                href="/portal-cliente"
                className="text-[0.62rem] font-semibold uppercase tracking-[0.22em] text-white transition-colors hover:text-[#d4b28c]"
              >
                Explorar experiencia
              </ArrowLink>
            </FadeIn>

            <FadeIn inView delay={0.12}>
              <PortalPreviewCard />
            </FadeIn>
          </div>

          <TechFootnotes ids={["rubro", "spi", "cpi"]} tone="dark" wide />
        </div>
      </section>

      <section className="bg-[#d8c7b3] py-24 text-[#0a0a0a] md:py-36">
        <div className="container-reypa grid gap-14 lg:grid-cols-[.7fr_1.3fr]">
          <div>
            <span className="inline-flex items-center gap-3 text-[0.6rem] font-semibold uppercase tracking-[0.25em]">
              <span className="h-px w-10 bg-black/60" /> Preguntas frecuentes
            </span>
            <h2 className="heading-section mt-10">
              Antes de
              <span className="font-editorial block italic text-black/55">comenzar.</span>
            </h2>
            <p className="mt-7 max-w-sm text-sm leading-7 text-black/52">
              Resolvemos las preguntas más habituales sobre diseño, costos, tiempos y
              seguimiento. Para un caso particular, conversemos directamente.
            </p>
            <a
              href="mailto:arqreypacontacto@gmail.com"
              className="group mt-9 inline-flex items-center gap-4 text-[0.6rem] font-semibold uppercase tracking-[0.22em]"
            >
              Hacer otra pregunta
              <ArrowRight size={15} className="transition-transform duration-500 group-hover:translate-x-2" />
            </a>
          </div>

          <div className="border-t border-black/20">
            {[
              ["¿Cómo inicia un proyecto con REYPA?", "Comenzamos con una conversación y una visita al sitio. Revisamos necesidades, alcance, ubicación, presupuesto estimado y expectativas para preparar una propuesta de trabajo adecuada."],
              ["¿Pueden encargarse del diseño y la construcción?", "Sí. Integramos proyecto arquitectónico, ejecutivo, diseño interior, presupuesto, trámites y construcción. También podemos participar únicamente en las etapas que el cliente necesite."],
              ["¿Cuánto tiempo toma desarrollar un proyecto?", "Depende de la escala y complejidad. Después del diagnóstico establecemos un calendario por etapas, con fechas para anteproyecto, revisiones, proyecto ejecutivo y preparación de obra."],
              ["¿Cómo se define el presupuesto?", "El presupuesto se desarrolla a partir de planos, cantidades y especificaciones. Presentamos conceptos claros para identificar dónde se invierte y facilitar decisiones antes de construir."],
              ["¿Puedo solicitar cambios durante el diseño?", "Sí. El proceso contempla revisiones en momentos definidos. Resolver cambios durante el diseño reduce ajustes costosos cuando la obra ya está en ejecución."],
              ["¿Cómo puedo seguir el avance de mi obra?", "Los clientes activos consultan avances, presupuesto, próximas actividades, fotografías y videos desde el Portal de Obra, además de mantener comunicación directa con el equipo."],
              ["¿En qué zona trabajan?", "Nuestra base está en Mazatlán, Sinaloa. Evaluamos proyectos en otras ubicaciones según alcance, necesidades de supervisión y condiciones del sitio."],
            ].map(([question, answer], index) => (
              <details key={question} className="group border-b border-black/20">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-7">
                  <span className="flex items-center gap-5">
                    <span className="hidden text-[0.55rem] tracking-[0.2em] text-black/35 sm:block">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="font-editorial text-xl md:text-2xl">{question}</span>
                  </span>
                  <span className="relative size-8 shrink-0 rounded-full border border-black/20 transition-colors group-open:bg-black group-open:text-[#d8c7b3]">
                    <span className="absolute left-1/2 top-1/2 h-px w-3 -translate-x-1/2 -translate-y-1/2 bg-current" />
                    <span className="absolute left-1/2 top-1/2 h-3 w-px -translate-x-1/2 -translate-y-1/2 bg-current transition-transform group-open:rotate-90 group-open:opacity-0" />
                  </span>
                </summary>
                <p className="max-w-2xl pb-7 pl-0 text-sm leading-7 text-black/55 sm:pl-11">{answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
