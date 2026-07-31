"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight, Menu } from "lucide-react";
import { useEffect, useState } from "react";
import MobileNavigation from "@/components/MobileNavigation";

const links = [
  { href: "/", label: "Inicio" },
  { href: "/nosotros", label: "Nosotros" },
  { href: "/servicios", label: "Servicios" },
  { href: "/proyectos", label: "Proyectos" },
  { href: "/contacto", label: "Contacto" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 18);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 md:px-6 md:pt-4">
        <nav
          className={`relative mx-auto flex h-[4.5rem] max-w-[86rem] items-center justify-between gap-2 overflow-hidden rounded-full border px-3 text-white shadow-lg transition-all duration-500 ease-out sm:px-5 ${
            scrolled
              ? "border-white/20 shadow-black/40"
              : "border-white/25 shadow-black/25"
          }`}
        >
          <Image
            src="/cromo cepillado.JPG"
            alt=""
            fill
            priority
            sizes="86rem"
            className="pointer-events-none object-cover object-center"
            aria-hidden="true"
          />
          <div
            className={`pointer-events-none absolute inset-0 transition-colors duration-500 ${
              scrolled ? "bg-black/55" : "bg-black/40"
            }`}
            aria-hidden="true"
          />
          <div
            className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/10 via-transparent to-black/25"
            aria-hidden="true"
          />

          <Link
            href="/"
            className="relative z-10 block h-10 w-24 shrink-0 sm:h-11 sm:w-28"
            aria-label="REYPA Arquitectura, inicio"
          >
            <Image
              src="/logo/LOGO.png"
              alt="REYPA Arquitectura"
              fill
              priority
              sizes="112px"
              className="object-contain object-left brightness-0 invert"
            />
          </Link>

          <div className="relative z-10 hidden items-center gap-1 lg:flex">
            {links.map((link) => {
              const active =
                link.href === "/"
                  ? pathname === "/"
                  : pathname === link.href || pathname.startsWith(`${link.href}/`);

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={active ? "page" : undefined}
                  className={`group relative rounded-full px-4 py-2.5 text-[0.62rem] font-semibold uppercase tracking-[0.16em] transition-colors duration-300 ${
                    active
                      ? "bg-white/10 text-white"
                      : "text-white/85 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  {link.label}
                  {active && (
                    <span className="absolute inset-x-4 -bottom-0.5 h-0.5 rounded-full bg-[#d4b28c]" />
                  )}
                </Link>
              );
            })}

            <div className="ml-1 flex items-center gap-0.5 border-l border-white/15 pl-2">
              <DesktopSocialLink
                href="https://www.facebook.com/profile.php?id=100063495704831"
                label="Facebook"
              >
                <FacebookIcon />
              </DesktopSocialLink>
              <DesktopSocialLink
                href="https://www.instagram.com/reypaarq_/"
                label="Instagram"
              >
                <InstagramIcon />
              </DesktopSocialLink>
            </div>

            <Link
              href="/portal-cliente"
              className="group ml-1 inline-flex items-center gap-2 rounded-full bg-[#f4f4f5] px-5 py-3 text-[0.6rem] font-semibold uppercase tracking-[0.14em] text-[#0a0a0a] shadow-sm transition-transform duration-300 hover:scale-[1.02]"
            >
              Portal de clientes <ArrowUpRight size={13} />
            </Link>
          </div>

          <div className="absolute left-1/2 z-10 hidden -translate-x-1/2 gap-1 min-[380px]:flex lg:hidden">
            <DesktopSocialLink
              href="https://www.facebook.com/profile.php?id=100063495704831"
              label="Facebook"
            >
              <FacebookIcon />
            </DesktopSocialLink>
            <DesktopSocialLink
              href="https://www.instagram.com/reypaarq_/"
              label="Instagram"
            >
              <InstagramIcon />
            </DesktopSocialLink>
          </div>

          <div className="relative z-10 flex items-center gap-1 lg:hidden">
            <Link
              href="/portal-cliente"
              className="rounded-full bg-[#f4f4f5] px-3.5 py-2.5 text-[0.56rem] font-semibold uppercase tracking-[0.12em] text-[#0a0a0a] shadow-sm transition-transform active:scale-95"
              aria-label="Portal de clientes"
            >
              Portal
            </Link>
            <button
              type="button"
              onClick={() => setOpen(true)}
              className="grid size-11 place-items-center rounded-full text-white transition-colors hover:bg-white/10"
              aria-expanded={open}
              aria-controls="mobile-navigation-drawer"
              aria-label="Abrir menú"
            >
              <Menu size={20} />
            </button>
          </div>
        </nav>
      </header>

      <MobileNavigation open={open} pathname={pathname} onClose={() => setOpen(false)} />
    </>
  );
}

function DesktopSocialLink({
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
      className="grid size-9 place-items-center rounded-full text-white/85 transition-colors hover:bg-white/10 hover:text-white"
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
