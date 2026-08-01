"use client";

import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { ArrowDownRight } from "lucide-react";
import { easeLux } from "@/lib/motion";

export default function LandingHero() {
  const reduce = useReducedMotion();

  return (
    <div className="relative z-10 flex min-h-[62vh] flex-col justify-end px-5 pb-12 pt-36 sm:px-10 lg:min-h-screen lg:px-[6vw] lg:pb-16">
      <motion.span
        className="mb-8 block text-[0.6rem] font-medium uppercase tracking-[0.3em] text-[#d4b28c]"
        initial={reduce ? false : { opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: easeLux }}
      >
        Arquitectura · Interiorismo · Construcción
      </motion.span>

      <motion.div
        initial={reduce ? false : { opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: easeLux, delay: 0.08 }}
      >
        <h1 className="text-[clamp(3.6rem,7.2vw,8.2rem)] font-light leading-[.84] tracking-luxury">
          Espacios
          <span className="font-editorial block pl-[6vw] italic text-[#d4b28c]">que viven.</span>
        </h1>
      </motion.div>

      <motion.p
        className="mt-9 max-w-xl border-l border-[#d4b28c]/50 pl-5 text-sm font-light leading-7 text-white/50"
        initial={reduce ? false : { opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: easeLux, delay: 0.18 }}
      >
        En REYPA convertimos ideas, necesidades y aspiraciones en espacios funcionales,
        sensibles y duraderos. Acompañamos cada decisión desde el primer trazo hasta la
        entrega final.
      </motion.p>

      <motion.div
        initial={reduce ? false : { opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: easeLux, delay: 0.28 }}
      >
        <Link
          href="/proyectos"
          className="group mt-9 inline-flex w-fit items-center gap-4 text-[0.6rem] font-semibold uppercase tracking-[0.22em] text-white transition-colors hover:text-[#d4b28c]"
        >
          Descubrir proyectos
          <motion.span
            className="grid size-10 place-items-center rounded-full border border-white/20"
            whileHover={reduce ? undefined : { rotate: 45, borderColor: "#d4b28c", scale: 1.05 }}
            transition={{ type: "spring", stiffness: 320, damping: 18 }}
          >
            <ArrowDownRight size={16} />
          </motion.span>
        </Link>
      </motion.div>
    </div>
  );
}
