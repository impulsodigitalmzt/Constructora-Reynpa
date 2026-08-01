import type { Metadata } from "next";
import Image from "next/image";
import ProjectGallery from "@/components/ProjectGallery";
import SlideTitle from "@/components/motion/SlideTitle";

export const metadata: Metadata = {
  title: "Proyectos",
  description: "Diseños, renders y avances de obra reales de REYPA Arquitectura.",
};

export default function ProyectosPage() {
  return (
    <>
      <section className="noise relative flex min-h-[72vh] items-end overflow-hidden bg-[#0a0a0a] pb-24 pt-40 md:min-h-[82vh] md:pb-28 md:pt-52">
        <Image
          src="/foto/DISEÑOS/702695595_1607513581375150_7346377566660941231_n.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/65 to-black/15" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-black/50" />
        <span className="pointer-events-none absolute -bottom-16 right-0 select-none text-[clamp(8rem,25vw,26rem)] font-semibold leading-none tracking-[-0.09em] text-white/[0.022]">
          04
        </span>
        <div className="container-reypa relative z-10 grid gap-12 lg:grid-cols-[1.3fr_.7fr] lg:items-end">
          <div>
            <span className="eyebrow">Obra seleccionada</span>
            <SlideTitle as="h1" from="left" inView={false} className="heading-display mt-12 text-balance">
              Ideas que se
              <span className="font-editorial block whitespace-nowrap pl-[7vw] italic text-[#d4b28c]">vuelven espacio.</span>
            </SlideTitle>
          </div>
          <p className="max-w-md border-l border-[#d4b28c]/40 pl-6 text-sm font-light leading-7 text-white/42">
            Explora una selección de visualizaciones y procesos constructivos reales. Del
            concepto digital al avance tangible en obra.
          </p>
        </div>
      </section>

      <section className="bg-[#d8c7b3] py-24 text-[#0a0a0a] md:py-36">
        <div className="container-reypa">
          <div className="mb-14 grid gap-10 lg:grid-cols-[.7fr_1.3fr] lg:items-end">
            <div>
              <span className="inline-flex items-center gap-3 text-[0.6rem] font-semibold uppercase tracking-[0.25em]">
                <span className="h-px w-10 bg-black/60" /> Proyecto destacado
              </span>
              <p className="mt-7 max-w-sm text-sm leading-7 text-black/52">
                Una propuesta de interiores cálidos, líneas limpias y espacios conectados que
                prioriza iluminación, amplitud y funcionalidad cotidiana.
              </p>
            </div>
            <SlideTitle from="right" className="heading-section">
              Del concepto
              <span className="font-editorial block italic text-black/55">a la experiencia.</span>
            </SlideTitle>
          </div>

          <div className="grid gap-4 lg:grid-cols-12">
            <div className="group relative min-h-[42rem] overflow-hidden rounded-2xl bg-black/10 lg:col-span-8">
              <Image
                src="/foto/DISEÑOS/702625085_1607513934708448_3777016774527702021_n.jpg"
                alt="Interior residencial diseñado por REYPA"
                fill
                sizes="(max-width: 1024px) 100vw, 67vw"
                className="object-cover transition duration-1000 group-hover:scale-[1.02]"
              />
              <div className="absolute bottom-4 left-4 rounded-2xl bg-[#0a0a0a] px-6 py-5 text-white">
                <span className="text-[0.54rem] uppercase tracking-[0.22em] text-[#d4b28c]">Diseño interior</span>
                <p className="font-editorial mt-2 text-2xl italic">Residencia contemporánea</p>
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:col-span-4 lg:grid-cols-1">
              <div className="relative min-h-64 overflow-hidden rounded-2xl bg-black/10">
                <Image
                  src="/foto/DISEÑOS/702695595_1607513581375150_7346377566660941231_n.jpg"
                  alt="Fachada diseñada por REYPA"
                  fill
                  sizes="(max-width: 1024px) 50vw, 33vw"
                  className="object-cover"
                />
              </div>
              <div className="relative min-h-64 overflow-hidden rounded-2xl bg-[#0a0a0a]">
                <video
                  src="/video/AQNqbltK9dOzw36bGq4UwslAuEgVBj-foQVdQcjwSctD1qLVirdoN7pTV42SxUK1sikK4M_s4vpaMAMEu_nyHoxXr1avNI3SdVYEEXyszw.mp4"
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  className="size-full min-h-64 object-cover"
                />
                <span className="absolute bottom-4 left-4 text-[0.54rem] uppercase tracking-[0.22em] text-white">Recorrido · Obra real</span>
              </div>
            </div>
          </div>

          <div className="mt-12 grid gap-8 border-t border-black/20 pt-8 sm:grid-cols-3">
            {[
              ["Luz", "Aberturas y recorridos que aprovechan iluminación natural durante el día."],
              ["Materialidad", "Una paleta sobria y cálida que conecta interiores, mobiliario y detalles."],
              ["Función", "Distribuciones pensadas para el uso real, la convivencia y el mantenimiento."],
            ].map(([title, text]) => (
              <div key={title}>
                <h3 className="font-editorial text-2xl">{title}</h3>
                <p className="mt-3 text-sm leading-7 text-black/50">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-white/10 bg-[#0a0a0a] py-16 md:py-24">
        <div className="container-reypa">
          <ProjectGallery />
        </div>
      </section>
    </>
  );
}
