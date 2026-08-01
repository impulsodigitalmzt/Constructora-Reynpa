"use client";

import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { ArrowDownRight } from "lucide-react";
import { easeLux } from "@/lib/motion";

export default function LandingHero() {
  const reduce = useReducedMotion();

  return (
    <div className="relative z-10 flex min-h-[min(58vh,28rem)] flex-col justify-end overflow-x-clip px-5 pb-10 pt-32 sm:min-h-[62vh] sm:px-10 sm:pb-12 sm:pt-36 lg:min-h-screen lg:px-[6vw] lg:pb-16">
      <motion.span
        className="mb-6 block text-[0.55rem] font-medium uppercase tracking-[0.24em] text-[#d4b28c] sm:mb-8 sm:text-[0.6rem] sm:tracking-[0.3em]"
        initial={reduce ? false : { opacity: 0, x: -28 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7, ease: easeLux }}
      >
        Arquitectura · Interiorismo · Construcción
      </motion.span>

      <h1 className="text-[clamp(2.75rem,12vw,8.2rem)] font-light leading-[.88] tracking-luxury sm:leading-[.84]">
        <motion.span
          className="block"
          initial={reduce ? false : { opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, ease: easeLux, delay: 0.06 }}
        >
          Espacios
        </motion.span>
        <motion.span
          className="font-editorial hero-italic text-[#d4b28c]"
          initial={reduce ? false : { opacity: 0, x: 36 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, ease: easeLux, delay: 0.18 }}
        >
          que viven.
        </motion.span>
      </h1>

      <motion.p
        className="mt-7 max-w-xl border-l border-[#d4b28c]/50 pl-4 text-sm font-light leading-7 text-white/50 sm:mt-9 sm:pl-5"
        initial={reduce ? false : { opacity: 0, x: -24 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7, ease: easeLux, delay: 0.28 }}
      >
        En REYPA convertimos ideas, necesidades y aspiraciones en espacios funcionales,
        sensibles y duraderos. Acompañamos cada decisión desde el primer trazo hasta la
        entrega final.
      </motion.p>

      <motion.div
        initial={reduce ? false : { opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.65, ease: easeLux, delay: 0.38 }}
      >
        <Link
          href="/proyectos"
          className="group mt-8 inline-flex min-h-11 w-fit items-center gap-4 text-[0.6rem] font-semibold uppercase tracking-[0.22em] text-white transition-colors hover:text-[#d4b28c] sm:mt-9"
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
