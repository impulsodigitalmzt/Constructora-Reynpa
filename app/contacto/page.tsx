import type { Metadata } from "next";
import Image from "next/image";
import { Mail, MapPin, Phone } from "lucide-react";
import ContactForm from "@/components/ContactForm";
import SlideTitle from "@/components/motion/SlideTitle";

export const metadata: Metadata = {
  title: "Contacto",
  description: "Habla con REYPA Arquitectura. Teléfono, WhatsApp y correo en Mazatlán, Sinaloa.",
};

const channels = [
  {
    icon: Phone,
    label: "Teléfono",
    value: "669 163 6494",
    href: "tel:+526691636494",
  },
  {
    icon: WhatsAppIcon,
    label: "WhatsApp",
    value: "669 120 6564",
    href: "https://wa.me/526691206564",
  },
  {
    icon: Mail,
    label: "Correo",
    value: "arqreypacontacto@gmail.com",
    href: "mailto:arqreypacontacto@gmail.com",
  },
  {
    icon: MapPin,
    label: "Ubicación",
    value: "Mazatlán, Sinaloa",
    href: "https://maps.google.com/?q=Mazatlán,+Sinaloa",
  },
];

export default function ContactoPage() {
  return (
    <>
      <section className="noise relative flex min-h-[68vh] items-end overflow-hidden bg-[#0a0a0a] pb-20 pt-40 md:min-h-[76vh] md:pb-24 md:pt-52">
        <Image
          src="/foto/ESCUCHAR CLIENTE.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/70 to-black/25" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-black/50" />
        <div className="container-reypa relative z-10">
          <span className="eyebrow">Contacto</span>
          <SlideTitle as="h1" from="left" inView={false} className="heading-display mt-12 max-w-5xl text-balance">
            Hablemos de
            <span className="font-editorial block whitespace-nowrap pl-[6vw] italic text-[#d4b28c]">tu proyecto.</span>
          </SlideTitle>
          <p className="mt-10 max-w-xl border-l border-[#d4b28c]/50 pl-6 text-sm font-light leading-7 text-white/45">
            Completa el formulario o escríbenos por teléfono, WhatsApp o correo. Estamos en
            Mazatlán, Sinaloa.
          </p>
        </div>
      </section>

      <section className="bg-[#0a0a0a] pb-28 pt-10 md:pb-40">
        <div className="container-reypa grid gap-12 lg:grid-cols-[.85fr_1.15fr] lg:items-start">
          <div>
            <span className="eyebrow">Canales directos</span>
            <SlideTitle from="left" className="heading-section mt-8 text-balance">
              Estamos
              <span className="font-editorial block italic text-[#d4b28c]">cerca.</span>
            </SlideTitle>
            <p className="mt-6 max-w-sm text-sm font-light leading-7 text-white/45">
              Elige el medio que te resulte más cómodo. Respondemos con claridad y sin rodeos.
            </p>

            <div className="mt-10 flex flex-wrap gap-3">
              {channels.map(({ icon: Icon, label, value, href }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel={href.startsWith("http") ? "noreferrer" : undefined}
                  title={`${label}: ${value}`}
                  aria-label={`${label}: ${value}`}
                  className="group grid size-14 place-items-center rounded-full border border-white/15 text-[#d4b28c] transition-all duration-500 hover:border-[#d4b28c] hover:bg-[#d4b28c]/10 hover:text-white"
                >
                  <Icon size={20} strokeWidth={1.4} />
                </a>
              ))}
            </div>

            <ul className="mt-8 space-y-3 text-sm font-light text-white/55">
              {channels.map(({ label, value, href }) => (
                <li key={label} className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                  <span className="text-[0.56rem] uppercase tracking-[0.18em] text-[#d4b28c]">
                    {label}
                  </span>
                  <a href={href} className="transition-colors hover:text-white">
                    {value}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <ContactForm />
        </div>
      </section>
    </>
  );
}

function WhatsAppIcon({ size = 20 }: { size?: number; strokeWidth?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M19.05 4.91A9.82 9.82 0 0 0 12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.87 9.87 0 0 0 4.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.91-7.02Zm-7.01 15.24h-.01a8.2 8.2 0 0 1-4.18-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.2 8.2 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.25-8.24 2.2 0 4.27.86 5.82 2.42a8.18 8.18 0 0 1 2.41 5.83c0 4.55-3.7 8.23-8.24 8.23Zm4.52-6.16c-.25-.12-1.47-.72-1.7-.8-.23-.09-.39-.12-.56.12-.17.25-.64.8-.79.96-.14.17-.29.19-.54.06-.25-.12-1.05-.39-2-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.02-.38.11-.51.11-.11.25-.29.37-.43.12-.14.17-.25.25-.41.08-.17.04-.31-.02-.43-.06-.12-.56-1.34-.76-1.84-.2-.48-.4-.42-.56-.42h-.48c-.17 0-.43.06-.66.31-.22.25-.87.85-.87 2.07 0 1.22.89 2.39 1.01 2.56.12.17 1.75 2.67 4.23 3.74 1.49.64 2.08.7 2.83.59.43-.07 1.47-.6 1.67-1.18.21-.58.21-1.07.14-1.18-.06-.11-.22-.17-.47-.29Z" />
    </svg>
  );
}
