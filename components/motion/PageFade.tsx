"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import { pageFade } from "@/lib/motion";

export default function PageFade({ children }: { children: ReactNode }) {
  const reduce = useReducedMotion();
  if (reduce) return <>{children}</>;

  return (
    <motion.div
      initial={pageFade.initial}
      animate={pageFade.animate}
      className="min-h-[50vh]"
    >
      {children}
    </motion.div>
  );
}
