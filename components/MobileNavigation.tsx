"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowUpRight,
  Building2,
  Home,
  Images,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Users,
  X,
} from "lucide-react";

const links = [
  { href: "/", label: "Inicio", icon: Home },
  { href: "/nosotros", label: "Nosotros", icon: Users },
  { href: "/servicios", label: "Servicios", icon: Building2 },
  { href: "/proyectos", label: "Proyectos", icon: Images },
  { href: "/contacto", label: "Contacto", icon: Mail },
];

type MobileNavigationProps = {
  open: boolean;
  pathname: string;
  onClose: () => void;
};

export default function MobileNavigation({
  open,
  pathname,
  onClose,
}: MobileNavigationProps) {
  return (
    <div
      className={`fixed inset-0 z-[70] transition-[visibility] duration-500 lg:hidden ${
        open ? "visible" : "invisible"
      }`}
      aria-hidden={!open}
    >
      <button
        type="button"
        aria-label="Cerrar menú"
        onClick={onClose}
        className={`absolute inset-0 bg-black/70 backdrop-blur-sm transition-opacity duration-500 ${
          open ? "opacity-100" : "opacity-0"
        }`}
      />

      <aside
        id="mobile-navigation-drawer"
        aria-label="Menú de navegación"
        className={`absolute inset-y-0 right-0 flex w-[min(100vw,25rem)] flex-col overflow-hidden border-l border-black/10 bg-[#d8c7b3] text-[#0a0a0a] shadow-2xl transition-transform duration-500 ease-out ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex shrink-0 items-center justify-between border-b border-black/10 bg-[#e2d3c1] px-5 py-4">
          <Link
            href="/"
            onClick={onClose}
            className="relative block h-11 w-28"
            aria-label="REYPA Arquitectura, inicio"
          >
            <Image
              src="/logo/LOGO.png"
              alt="REYPA Arquitectura"
              fill
              sizes="112px"
              className="object-contain object-left brightness-0"
            />
          </Link>
          <button
            type="button"
            onClick={onClose}
            className="grid size-11 place-items-center rounded-full border border-black/15 bg-black/[0.04] transition hover:bg-black/10"
            aria-label="Cerrar menú"
          >
            <X size={20} />
          </button>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto px-4 py-4">
          <Link
            href="/proyectos"
            onClick={onClose}
            className="group relative mb-4 block aspect-[16/9] overflow-hidden rounded-2xl shadow-lg"
          >
            <Image
              src="/foto/DISEÑOS/702625085_1607513934708448_3777016774527702021_n.jpg"
              alt="Proyecto destacado de REYPA Arquitectura"
              fill
              sizes="400px"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-4 text-white">
              <p className="text-[0.52rem] font-semibold uppercase tracking-[0.2em] text-[#d4b28c]">
                Proyecto destacado
              </p>
              <p className="font-editorial mt-1 text-xl italic">Habitar con intención.</p>
              <span className="mt-2 inline-flex items-center gap-1 text-xs font-semibold">
                Explorar proyectos <ArrowUpRight size={13} />
              </span>
            </div>
          </Link>

          <nav
            aria-label="Navegación principal móvil"
            className="overflow-hidden rounded-2xl border border-black/10 bg-[#f4f4f5] p-2 shadow-sm"
          >
            {links.map((link, index) => {
              const Icon = link.icon;
              const active =
                link.href === "/"
                  ? pathname === "/"
                  : pathname === link.href || pathname.startsWith(`${link.href}/`);

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={onClose}
                  aria-current={active ? "page" : undefined}
                  className={`group flex items-center justify-between rounded-xl px-4 py-3 text-[0.92rem] font-semibold transition-colors ${
                    active ? "bg-[#d4b28c]/30 text-black" : "hover:bg-black/[0.05]"
                  }`}
                >
                  <span className="flex items-center gap-3">
                    <span
                      className={`grid size-8 place-items-center rounded-lg transition-colors ${
                        active
                          ? "bg-[#9b7550] text-white"
                          : "bg-black/[0.05] text-[#8b6745] group-hover:bg-[#d4b28c]/25"
                      }`}
                    >
                      <Icon size={16} strokeWidth={1.6} />
                    </span>
                    {link.label}
                    {active && <i className="size-1.5 rounded-full bg-[#9b7550]" />}
                  </span>
                  <span className="text-[0.56rem] tracking-[0.18em] text-black/45">
                    0{index + 1}
                  </span>
                </Link>
              );
            })}
          </nav>

          <div className="mt-4 rounded-2xl border border-black/10 bg-[#f4f4f5] p-5 shadow-sm">
            <p className="text-[0.56rem] font-semibold uppercase tracking-[0.2em] text-[#8b6745]">
              Contacto directo
            </p>
            <div className="mt-4 space-y-3 text-sm">
              <a href="tel:+526691636494" className="flex items-center gap-3">
                <Phone size={16} className="text-[#8b6745]" /> 669 163 6494
              </a>
              <a
                href="https://wa.me/526691206564"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-3"
              >
                <MessageCircle size={16} className="text-[#8b6745]" /> WhatsApp
              </a>
              <a
                href="mailto:arqreypacontacto@gmail.com"
                className="flex items-center gap-3 break-all"
              >
                <Mail size={16} className="shrink-0 text-[#8b6745]" />
                arqreypacontacto@gmail.com
              </a>
              <span className="flex items-center gap-3">
                <MapPin size={16} className="text-[#8b6745]" /> Mazatlán, Sinaloa
              </span>
            </div>
          </div>
        </div>

        <div className="shrink-0 border-t border-black/10 bg-[#e2d3c1] px-4 py-4">
          <div className="mb-3 flex items-center justify-between">
            <span className="text-[0.56rem] font-semibold uppercase tracking-[0.18em]">
              Síguenos
            </span>
            <div className="flex gap-2">
              <SocialLink
                href="https://www.facebook.com/profile.php?id=100063495704831"
                label="Facebook"
              >
                <FacebookIcon />
              </SocialLink>
              <SocialLink href="https://www.instagram.com/reypaarq_/" label="Instagram">
                <InstagramIcon />
              </SocialLink>
            </div>
          </div>
          <Link
            href="/portal-cliente"
            onClick={onClose}
            className="flex items-center justify-center gap-2 rounded-full bg-[#0a0a0a] px-6 py-4 text-[0.64rem] font-semibold uppercase tracking-[0.16em] text-white"
          >
            Portal de clientes <ArrowUpRight size={14} />
          </Link>
        </div>
      </aside>
    </div>
  );
}

function SocialLink({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label={label}
      className="grid size-9 place-items-center rounded-full border border-black/15 transition hover:bg-black/10"
    >
      {children}
    </a>
  );
}

function FacebookIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-4" fill="currentColor" aria-hidden="true">
      <path d="M13.6 22v-9h3l.45-3.5H13.6V7.26c0-1.01.28-1.7 1.73-1.7h1.85V2.43c-.32-.04-1.42-.13-2.7-.13-2.67 0-4.5 1.63-4.5 4.62V9.5H7v3.5h2.98v9h3.62Z" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}
