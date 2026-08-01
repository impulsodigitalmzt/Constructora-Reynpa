"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import { easeLux } from "@/lib/motion";

type From = "left" | "right";

type Props = {
  children: ReactNode;
  className?: string;
  as?: "h1" | "h2" | "h3";
  /** Dirección de entrada: left = viene de la izquierda; right = de la derecha */
  from?: From;
  delay?: number;
  inView?: boolean;
  /** Distancia del desplazamiento en px */
  distance?: number;
};

const motionTags = {
  h1: motion.h1,
  h2: motion.h2,
  h3: motion.h3,
} as const;

export default function SlideTitle({
  children,
  className = "",
  as = "h2",
  from = "left",
  delay = 0,
  inView = true,
  distance = 64,
}: Props) {
  const reduce = useReducedMotion();
  const MotionTag = motionTags[as];
  const xFrom = from === "left" ? -distance : distance;

  if (reduce) {
    const Tag = as;
    return <Tag className={className}>{children}</Tag>;
  }

  const transition = {
    duration: 0.9,
    ease: easeLux,
    delay,
  };

  if (inView) {
    return (
      <MotionTag
        className={className}
        initial={{ opacity: 0, x: xFrom }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.35, margin: "0px 0px -8% 0px" }}
        transition={transition}
      >
        {children}
      </MotionTag>
    );
  }

  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, x: xFrom }}
      animate={{ opacity: 1, x: 0 }}
      transition={transition}
    >
      {children}
    </MotionTag>
  );
}
