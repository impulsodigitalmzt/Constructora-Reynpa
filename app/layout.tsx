import type { Metadata } from "next";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "REYPA Arquitectura | Diseño y Construcción",
    template: "%s | REYPA Arquitectura",
  },
  description:
    "Arquitectura, diseño interior, proyectos ejecutivos y construcción con seguimiento transparente en Mazatlán, Sinaloa.",
  icons: {
    icon: [{ url: "/logo/LOGO.png", type: "image/png" }],
    shortcut: "/logo/LOGO.png",
    apple: "/logo/LOGO.png",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es">
      <body>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
