import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Mail, MapPin, Phone } from "lucide-react";

export default function Footer() {
  return (
    <footer className="overflow-hidden border-t border-white/10 bg-[#0a0a0a] text-[#f4f4f5]">
      <div className="container-reypa py-20 md:py-28">
        <div className="grid gap-14 md:grid-cols-[1.35fr_.8fr_.8fr]">
          <div>
            <div className="relative mb-9 h-24 w-36">
              <Image
                src="/logo/LOGO BCO.png"
                alt="REYPA Arquitectura"
                fill
                sizes="144px"
                className="object-contain object-left"
              />
            </div>
            <p className="font-editorial max-w-md text-3xl leading-[1.08] text-white/85 md:text-4xl">
              Espacios con intención.
              <br />
              Procesos con claridad.
            </p>
            <div className="mt-10">
              <p className="mb-5 text-[0.6rem] font-semibold uppercase tracking-[0.28em] text-[#d4b28c]">
                Redes sociales
              </p>
              <div className="flex flex-wrap gap-3">
                <a
                  href="https://www.facebook.com/profile.php?id=100063495704831"
                  target="_blank"
                  rel="noreferrer"
                  className="group inline-flex items-center gap-3 rounded-xl border border-white/15 px-4 py-3 text-[0.58rem] font-semibold uppercase tracking-[0.18em] text-white/70 transition-all duration-500 hover:border-[#d4b28c]/50 hover:text-white"
                >
                  <FacebookIcon />
                  Facebook
                  <ArrowUpRight size={12} className="opacity-40 transition-opacity group-hover:opacity-100" />
                </a>
                <a
                  href="https://www.instagram.com/reypaarq_/"
                  target="_blank"
                  rel="noreferrer"
                  className="group inline-flex items-center gap-3 rounded-xl border border-white/15 px-4 py-3 text-[0.58rem] font-semibold uppercase tracking-[0.18em] text-white/70 transition-all duration-500 hover:border-[#d4b28c]/50 hover:text-white"
                >
                  <InstagramIcon />
                  Instagram
                  <ArrowUpRight size={12} className="opacity-40 transition-opacity group-hover:opacity-100" />
                </a>
              </div>
            </div>
          </div>

          <div>
            <p className="mb-7 text-[0.6rem] font-semibold uppercase tracking-[0.28em] text-[#d4b28c]">
              Contacto directo
            </p>
            <div className="space-y-4 text-sm font-light text-white/55">
              <a className="flex items-center gap-3 transition-colors hover:text-white" href="tel:+526691636494">
                <Phone size={15} strokeWidth={1.4} /> Tel. 669 163 6494
              </a>
              <a className="flex items-center gap-3 transition-colors hover:text-white" href="tel:+526691206564">
                <Phone size={15} strokeWidth={1.4} /> Cel. 669 120 6564
              </a>
              <a className="group flex items-center gap-3 transition-colors duration-300 hover:text-white" href="mailto:arqreypacontacto@gmail.com">
                <Mail size={15} strokeWidth={1.4} /> arqreypacontacto@gmail.com
                <ArrowUpRight size={12} className="opacity-0 transition-opacity group-hover:opacity-100" />
              </a>
              <span className="flex items-center gap-3">
                <MapPin size={15} strokeWidth={1.4} /> Mazatlán, Sinaloa
              </span>
            </div>
          </div>

          <div>
            <p className="mb-7 text-[0.6rem] font-semibold uppercase tracking-[0.28em] text-[#d4b28c]">
              Navegación
            </p>
            <div className="flex flex-col gap-3.5 text-sm font-light text-white/55">
              <Link href="/" className="transition-colors hover:text-white">Inicio</Link>
              <Link href="/nosotros" className="transition-colors hover:text-white">Estudio</Link>
              <Link href="/servicios" className="transition-colors hover:text-white">Servicios</Link>
              <Link href="/proyectos" className="transition-colors hover:text-white">Proyectos</Link>
              <Link href="/contacto" className="transition-colors hover:text-white">Contacto</Link>
              <Link href="/portal-cliente" className="text-[#d4b28c] transition-colors hover:text-white">Portal privado</Link>
            </div>
          </div>
        </div>

        <div className="mt-20 border-t border-white/10 pt-7 md:mt-28">
          <div className="flex flex-col gap-4 text-[0.58rem] uppercase tracking-[0.2em] text-white/30 sm:flex-row sm:items-center sm:justify-between">
            <span>© {new Date().getFullYear()} REYPA Arquitectura</span>
            <div className="flex flex-wrap gap-5">
              <a
                href="https://www.facebook.com/profile.php?id=100063495704831"
                target="_blank"
                rel="noreferrer"
                className="transition-colors hover:text-[#d4b28c]"
              >
                Facebook
              </a>
              <a
                href="https://www.instagram.com/reypaarq_/"
                target="_blank"
                rel="noreferrer"
                className="transition-colors hover:text-[#d4b28c]"
              >
                Instagram
              </a>
              <span>Diseño · Arquitectura · Construcción</span>
            </div>
          </div>
        </div>
      </div>

      <div className="container-reypa h-[clamp(5rem,13vw,12rem)] overflow-hidden" aria-hidden="true">
        <p className="select-none whitespace-nowrap text-center text-[clamp(6rem,17vw,16rem)] font-semibold leading-[0.7] tracking-[-0.085em] text-white/[0.035]">
          REYPA
        </p>
      </div>
    </footer>
  );
}

function FacebookIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M14 8.5h2.5V5.2C16.08 5.07 15.08 5 14.03 5 11.9 5 10.5 6.3 10.5 8.77V11H8v3.5h2.5V23h3.5v-8.5H17l.5-3.5h-3.5V9.05c0-1.01.28-1.55 1.5-1.55Z" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
      <rect x="3.5" y="3.5" width="17" height="17" rx="4.5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.4" cy="6.6" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}
