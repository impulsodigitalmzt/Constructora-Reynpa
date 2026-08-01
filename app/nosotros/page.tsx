import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import SlideTitle from "@/components/motion/SlideTitle";

export const metadata: Metadata = {
  title: "Nosotros",
  description: "Conoce la historia, el equipo y la forma de trabajar de REYPA Arquitectura.",
};

const principles = [
  {
    title: "Intención",
    text: "Cada decisión nace de cómo quieres vivir y usar el espacio. Diseñamos con propósito, no por moda.",
    image: "/foto/OBRA/530242268_1349573190502525_852000528287082247_n.jpg",
    alt: "Fachada terminada de un proyecto real de REYPA",
  },
  {
    title: "Precisión",
    text: "Planeamos antes de construir para reducir imprevistos, cuidar recursos y proteger tu inversión.",
    image: "/foto/OBRA/747625965_17900286720499562_7975554370235012092_n.jpg",
    alt: "Integrante de REYPA trabajando con precisión en obra",
  },
  {
    title: "Cercanía",
    text: "Una comunicación clara mantiene alineados al cliente y al equipo en cada etapa del proyecto.",
    image: "/ARQUETECTOS.jpg",
    alt: "Equipo real de REYPA Arquitectura",
  },
];

const milestones = [
  {
    number: "01",
    title: "Escucha profunda",
    text: "Entendemos hábitos, prioridades, presupuesto y el sitio antes de dibujar la primera línea.",
    image: "/foto/ESCUCHAR CLIENTE.jpg",
    alt: "Reunión de escucha y entendimiento con el cliente",
  },
  {
    number: "02",
    title: "Diseño coherente",
    text: "Traducimos esa información en una propuesta espacial clara, estética y construible.",
    image: "/foto/DISEÑO.jpg",
    alt: "Desarrollo de diseño y revisión de planos arquitectónicos",
  },
  {
    number: "03",
    title: "Planeación precisa",
    text: "Definimos alcances, tiempos y recursos antes de construir para reducir imprevistos y cuidar la inversión.",
    image: "/foto/PLANEACION.jpg",
    alt: "Planeación técnica de un proyecto arquitectónico",
  },
];

export default function NosotrosPage() {
  return (
    <>
      <section className="noise relative flex min-h-[56vh] items-end overflow-hidden bg-[#0a0a0a] pb-16 pt-32 sm:min-h-[72vh] sm:pb-24 sm:pt-40 md:min-h-[82vh] md:pb-28 md:pt-52">
        <Image
          src="/foto/OBRA/530242268_1349573190502525_852000528287082247_n.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/70 to-black/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/45" />
        <span className="pointer-events-none absolute -right-[2vw] top-20 select-none text-[clamp(9rem,28vw,30rem)] font-semibold leading-none tracking-[-0.09em] text-white/[0.025]">
          02
        </span>
        <div className="container-reypa relative z-10">
          <span className="eyebrow">El estudio</span>
          <SlideTitle as="h1" from="left" inView={false} className="heading-display mt-12 max-w-6xl text-balance">
            Arquitectura que
            <span className="font-editorial hero-italic text-[#d4b28c]">parte de ti.</span>
          </SlideTitle>
          <div className="mt-14 flex max-w-2xl items-start gap-5 border-l border-[#d4b28c]/50 pl-6">
            <p className="text-sm font-light leading-7 text-white/45 md:text-base">
              Un estudio en Mazatlán donde la escucha, el rigor técnico y la sensibilidad material
              convergen para crear espacios que se sienten inevitablemente tuyos.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-[#121212] py-24 md:py-40">
        <div className="container-reypa">
          <div className="grid gap-14 lg:grid-cols-12 lg:items-start">
            <div className="relative lg:col-span-7">
              <div className="absolute -inset-3 rounded-[1.75rem] border border-[#d4b28c]/20 md:-inset-5" />
              <div className="group relative aspect-[4/5] overflow-hidden rounded-2xl bg-[#1a1a1a] shadow-[0_45px_120px_rgba(0,0,0,.55)]">
                <Image
                  src="/ARQUETECTOS.jpg"
                  alt="Equipo de arquitectos de REYPA Arquitectura"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 58vw"
                  className="object-cover grayscale transition-all duration-1000 ease-out group-hover:scale-[1.025] group-hover:grayscale-0"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-black/10" />
              </div>
              <div className="glass absolute bottom-3 right-3 flex max-w-[calc(100%-1.5rem)] items-center gap-4 rounded-xl px-4 py-3 sm:gap-5 sm:px-5 sm:py-4 md:bottom-10 md:right-3 lg:-right-6">
                <span className="font-editorial text-3xl italic text-[#d4b28c]">R.</span>
                <div>
                  <p className="text-[0.58rem] font-semibold uppercase tracking-[0.22em]">Equipo REYPA</p>
                  <p className="mt-1 text-[0.58rem] text-white/35">Mazatlán · Sinaloa</p>
                </div>
              </div>
            </div>

            <div className="pt-8 lg:col-span-4 lg:col-start-9 lg:pt-20">
              <span className="eyebrow">Nuestra historia</span>
              <SlideTitle from="right" className="font-editorial mt-10 text-4xl leading-[1.02] text-white/95 md:text-5xl">
                Diseñamos relaciones antes que edificios.
              </SlideTitle>
              <div className="mt-9 space-y-6 text-sm font-light leading-7 text-white/45">
                <p>
                  REYPA nace de una visión compartida: hacer que diseñar y construir sea una
                  experiencia clara, cercana y estimulante. Creemos que un buen proyecto no
                  empieza en el plano, sino en una conversación honesta.
                </p>
                <p>
                  Integramos arquitectura, gestión, interiorismo y ejecución en un solo equipo.
                  Esa continuidad protege la intención original, reduce la incertidumbre y evita
                  que el diseño se diluya entre intermediarios.
                </p>
                <p>
                  No imponemos una forma de vivir. Escuchamos, interpretamos y convertimos tus
                  necesidades en espacios honestos, funcionales y duraderos, pensados para el
                  clima, el entorno y el ritmo de vida de Mazatlán y la región.
                </p>
                <p>
                  Hoy acompañamos proyectos residenciales y de transformación espacial con el
                  mismo estándar: claridad técnica, sensibilidad estética y seguimiento cercano
                  en cada etapa.
                </p>
              </div>
              <Link
                href="/servicios"
                className="group mt-10 inline-flex items-center gap-3 text-[0.62rem] font-semibold uppercase tracking-[0.22em] text-white transition-colors hover:text-[#d4b28c]"
              >
                Nuestro proceso{" "}
                <ArrowRight size={15} className="transition-transform duration-500 group-hover:translate-x-2" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#0a0a0a] py-24 md:py-36">
        <div className="container-reypa">
          <div className="mb-14 max-w-3xl">
            <span className="eyebrow">Presencia en obra</span>
            <SlideTitle from="left" className="heading-section mt-8">
              Del escritorio
              <span className="font-editorial italic text-[#d4b28c]"> al terreno.</span>
            </SlideTitle>
            <p className="mt-6 text-sm font-light leading-7 text-white/42">
              Supervisamos avances, resolvemos detalles en sitio y documentamos el proceso para
              que el cliente siempre sepa qué está ocurriendo y por qué.
            </p>
          </div>

          <div className="grid gap-4 lg:grid-cols-12">
            <div className="relative min-h-[16rem] overflow-hidden rounded-2xl bg-[#1a1a1a] lg:col-span-8 lg:min-h-[34rem]">
              <video
                className="absolute inset-0 h-full w-full object-cover"
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                aria-label="Video de avance de obra REYPA"
              >
                <source
                  src="/video/AQM05lq19CEQAvO4u2f8rC41EUII7qBdO-2dZBUCDgUKXkEYPhpb3opA-pzwK6n2QzoUNUR7oau5crS2i1cJAt2FBg5zwxrtxkM8Icasnw.mp4"
                  type="video/mp4"
                />
              </video>
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent p-6 md:p-8">
                <span className="text-[0.52rem] uppercase tracking-[0.23em] text-[#d4b28c]">
                  Supervisión · Tiempo real
                </span>
                <p className="font-editorial mt-2 text-2xl italic text-white md:text-3xl">
                  La arquitectura también se construye mirando de cerca.
                </p>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:col-span-4 lg:grid-cols-1">
              <div className="relative min-h-[16rem] overflow-hidden rounded-2xl bg-[#1a1a1a]">
                <Image
                  src="/foto/OBRA/641651291_1532090672250775_5115249994984094462_n.jpg"
                  alt="Avance estructural en obra REYPA"
                  fill
                  sizes="(max-width: 1024px) 50vw, 25vw"
                  className="object-cover transition duration-700 hover:scale-[1.03]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                <span className="absolute bottom-5 left-5 text-[0.56rem] uppercase tracking-[0.2em] text-white/75">
                  Estructura
                </span>
              </div>
              <div className="relative min-h-[16rem] overflow-hidden rounded-2xl bg-[#1a1a1a]">
                <Image
                  src="/foto/OBRA/684530728_1590115179781657_3211124270856574738_n.jpg"
                  alt="Detalle de acabados en obra REYPA"
                  fill
                  sizes="(max-width: 1024px) 50vw, 25vw"
                  className="object-cover transition duration-700 hover:scale-[1.03]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                <span className="absolute bottom-5 left-5 text-[0.56rem] uppercase tracking-[0.2em] text-white/75">
                  Acabados
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#d8c7b3] py-24 text-[#0a0a0a] md:py-36">
        <div className="container-reypa">
          <div className="grid gap-14 lg:grid-cols-[.8fr_1.2fr] lg:items-center">
            <div>
              <span className="inline-flex items-center gap-3 text-[0.6rem] font-semibold uppercase tracking-[0.25em]">
                <span className="h-px w-10 bg-black/60" /> Nuestra manera de pensar
              </span>
              <SlideTitle from="left" className="font-editorial mt-9 text-4xl leading-[1.02] md:text-6xl">
                Antes de proyectar, entendemos cómo quieres vivir.
              </SlideTitle>
              <div className="mt-9 space-y-5 text-sm leading-7 text-black/55">
                <p>
                  Cada proyecto comienza con preguntas: qué necesitas hoy, cómo imaginas el
                  futuro y qué sensaciones quieres encontrar al llegar a casa. Esa conversación
                  se convierte en decisiones de proporción, luz, materialidad y recorrido.
                </p>
                <p>
                  Nuestro trabajo no termina en una imagen atractiva. Diseñamos soluciones que
                  puedan construirse con claridad, mantenerse en el tiempo y responder de forma
                  responsable al presupuesto disponible.
                </p>
                <p>
                  Por eso trabajamos con planos, maquetas y visualizaciones: herramientas que
                  te permiten anticipar el espacio, tomar decisiones con confianza y evitar
                  sorpresas en obra.
                </p>
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="relative aspect-[4/5]">
                <Image
                  src="/foto/PLANO.png"
                  alt="Plano arquitectónico desarrollado por REYPA"
                  fill
                  sizes="(max-width: 1024px) 50vw, 30vw"
                  className="object-contain"
                />
              </div>
              <div className="relative aspect-[4/5]">
                <Image
                  src="/foto/MAQUETA.png"
                  alt="Maqueta tridimensional de distribución interior REYPA"
                  fill
                  sizes="(max-width: 1024px) 50vw, 30vw"
                  className="object-contain"
                />
              </div>
            </div>
          </div>

          <div className="mt-24 grid gap-x-5 gap-y-12 sm:grid-cols-3">
            {milestones.map(({ number, title, text, image, alt }) => (
              <article
                key={number}
                className="group border-t border-black/20 pt-5"
              >
                <div className="mb-7 flex items-center justify-between">
                  <span className="text-[0.58rem] tracking-[0.2em] text-black/35">{number}</span>
                  <span className="text-[0.52rem] uppercase tracking-[0.2em] text-black/40">
                    Proceso REYPA
                  </span>
                </div>
                <div className="relative aspect-[3/2] overflow-hidden rounded-2xl">
                  <Image
                    src={image}
                    alt={alt}
                    fill
                    sizes="(max-width: 640px) 100vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.035]"
                  />
                </div>
                <h3 className="font-editorial mt-7 text-3xl">{title}</h3>
                <p className="mt-4 text-sm leading-7 text-black/50">{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#121212] py-24 md:py-40">
        <div className="container-reypa">
          <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:items-center">
            <div>
              <span className="eyebrow">Diseño con atmósfera</span>
              <SlideTitle from="left" className="heading-section mt-8">
                Espacios que se sienten
                <span className="font-editorial italic text-[#d4b28c]"> habitables.</span>
              </SlideTitle>
              <div className="mt-8 space-y-5 text-sm font-light leading-7 text-white/42">
                <p>
                  Más allá de la distribución, cuidamos la experiencia cotidiana: la luz que
                  entra por la mañana, la textura de un muro, el recorrido entre cocina y sala,
                  la privacidad de un dormitorio o la frescura de un patio.
                </p>
                <p>
                  En REYPA el interiorismo no es un añadido decorativo. Forma parte del proyecto
                  desde el inicio, para que arquitectura y atmósfera hablen el mismo lenguaje.
                </p>
                <p>
                  Trabajamos materiales nobles, proporciones equilibradas y soluciones prácticas
                  que resisten el uso diario sin perder elegancia.
                </p>
              </div>
              <Link
                href="/proyectos"
                className="group mt-10 inline-flex items-center gap-3 text-[0.62rem] font-semibold uppercase tracking-[0.22em] text-white transition-colors hover:text-[#d4b28c]"
              >
                Ver proyectos{" "}
                <ArrowRight size={15} className="transition-transform duration-500 group-hover:translate-x-2" />
              </Link>
            </div>

            <div className="grid grid-cols-2 gap-3 md:gap-4">
              <div className="relative col-span-2 min-h-[18rem] overflow-hidden rounded-2xl md:min-h-[22rem]">
                <Image
                  src="/foto/DISEÑOS/642345873_1537016178424891_1199563888190041144_n.jpg"
                  alt="Interior residencial diseñado por REYPA"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
              <div className="relative min-h-[14rem] overflow-hidden rounded-2xl md:min-h-[16rem]">
                <Image
                  src="/foto/DISEÑOS/494072684_1260121829447662_3591719434945570049_n.jpg"
                  alt="Fachada residencial REYPA"
                  fill
                  sizes="(max-width: 1024px) 50vw, 25vw"
                  className="object-cover"
                />
              </div>
              <div className="relative min-h-[14rem] overflow-hidden rounded-2xl md:min-h-[16rem]">
                <Image
                  src="/foto/DISEÑOS/670639381_1575564127903429_7104562998157452943_n.jpg"
                  alt="Atmósfera interior REYPA"
                  fill
                  sizes="(max-width: 1024px) 50vw, 25vw"
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#0a0a0a] py-24 md:py-36">
        <div className="container-reypa">
          <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-5">
              <span className="eyebrow">Mazatlán · Sinaloa</span>
              <SlideTitle from="left" className="heading-section mt-8">
                Arquitectura
                <span className="font-editorial block italic text-[#d4b28c]">para este clima.</span>
              </SlideTitle>
            </div>
            <p className="max-w-xl text-sm font-light leading-7 text-white/42 lg:col-span-6 lg:col-start-7">
              Diseñamos pensando en sol, humedad, brisa y orientación. Cada proyecto responde
              al contexto local: ventilación cruzada, sombras controladas, materiales adecuados
              y espacios que invitan a vivir hacia afuera cuando el clima lo permite.
            </p>
          </div>

          <div className="mt-14 grid gap-4 md:grid-cols-3">
            {[
              {
                src: "/foto/PLANO2.png",
                title: "Contexto",
                text: "Leemos el terreno, la orientación y el entorno antes de definir la forma.",
                contain: true,
              },
              {
                src: "/foto/OBRA/710813153_1621883359938172_16608911410795697_n.jpg",
                title: "Construcción",
                text: "Coordinamos ejecución, calidad y tiempos con presencia en sitio.",
                contain: false,
              },
              {
                src: "/foto/OBRA/747877798_17900286741499562_9146408866176433170_n.jpg",
                title: "Detalle",
                text: "Cuidamos encuentros, acabados y terminaciones que hacen la diferencia.",
                contain: false,
              },
            ].map(({ src, title, text, contain }) => (
              <article key={title} className="group">
                <div
                  className={`relative mb-6 aspect-[4/5] overflow-hidden rounded-2xl ${
                    contain ? "bg-white" : "bg-[#1a1a1a]"
                  }`}
                >
                  <Image
                    src={src}
                    alt={
                      contain
                        ? "Plano arquitectónico de proyecto REYPA"
                        : `${title} en proyectos REYPA`
                    }
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className={`${
                      contain ? "object-contain p-3" : "object-cover"
                    } transition duration-700 group-hover:scale-[1.04]`}
                  />
                </div>
                <h3 className="font-editorial text-2xl text-white">{title}</h3>
                <p className="mt-3 text-sm font-light leading-7 text-white/40">{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-white/10 bg-[#0a0a0a] py-24 md:py-40">
        <div className="container-reypa">
          <div className="mb-16 grid gap-8 md:grid-cols-[1.3fr_.7fr] md:items-end">
            <SlideTitle from="left" className="heading-section">
              Una práctica guiada
              <span className="font-editorial block italic text-[#d4b28c]">por principios.</span>
            </SlideTitle>
            <p className="max-w-sm text-sm font-light leading-7 text-white/40 md:justify-self-end">
              Tres ideas que atraviesan cada conversación, plano y decisión en obra.
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {principles.map(({ title, text, image, alt }, index) => (
              <article
                key={title}
                className="group relative aspect-[4/5] min-h-[22rem] overflow-hidden rounded-2xl bg-[#1a1a1a] md:min-h-[30rem]"
              >
                <Image
                  src={image}
                  alt={alt}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover transition-transform duration-1000 ease-out group-hover:scale-[1.045]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/15 to-black/10 transition-colors duration-700 group-hover:via-black/5" />
                <span className="absolute right-6 top-6 text-[0.56rem] tracking-[0.2em] text-white/70">
                  0{index + 1}
                </span>
                <div className="absolute inset-x-0 bottom-0 p-7 md:p-8">
                  <span className="mb-5 block h-px w-10 bg-[#d4b28c] transition-all duration-700 group-hover:w-20" />
                  <h3 className="font-editorial text-3xl text-white">{title}</h3>
                  <p className="mt-4 max-w-sm text-sm font-light leading-6 text-white/65">{text}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#d8c7b3] py-24 text-[#0a0a0a] md:py-32">
        <div className="container-reypa grid gap-10 lg:grid-cols-[1.2fr_.8fr] lg:items-center">
          <div>
            <span className="inline-flex items-center gap-3 text-[0.6rem] font-semibold uppercase tracking-[0.25em]">
              <span className="h-px w-10 bg-black/60" /> Hablemos de tu proyecto
            </span>
            <SlideTitle from="left" className="font-editorial mt-8 text-4xl leading-[1.05] md:text-6xl">
              Si buscas arquitectura con claridad y cercanía, empecemos por escucharte.
            </SlideTitle>
            <p className="mt-6 max-w-xl text-sm leading-7 text-black/55">
              Cuéntanos qué espacio imaginas. Te acompañamos desde la primera idea hasta la
              entrega, con un proceso transparente y un equipo que cuida cada detalle.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row lg:flex-col lg:items-start">
            <a
              href="mailto:arqreypacontacto@gmail.com"
              className="inline-flex items-center justify-center gap-3 rounded-full bg-[#0a0a0a] px-8 py-4 text-[0.62rem] font-semibold uppercase tracking-[0.2em] text-white transition hover:bg-black"
            >
              Escribir a REYPA <ArrowRight size={14} />
            </a>
            <Link
              href="/portal-cliente"
              className="inline-flex items-center justify-center gap-3 rounded-full border border-black/25 px-8 py-4 text-[0.62rem] font-semibold uppercase tracking-[0.2em] transition hover:border-black hover:bg-black/5"
            >
              Ver portal de clientes
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
