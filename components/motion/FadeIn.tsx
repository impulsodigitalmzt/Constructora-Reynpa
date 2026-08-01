"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import { easeLux, fadeUp, staggerContainer } from "@/lib/motion";

export function Stagger({
  children,
  className,
  delay = 0,
  inView = false,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  inView?: boolean;
}) {
  const reduce = useReducedMotion();
  if (reduce) return <div className={className}>{children}</div>;

  const variants = {
    ...staggerContainer,
    show: {
      transition: {
        staggerChildren: 0.08,
        delayChildren: delay,
      },
    },
  };

  if (inView) {
    return (
      <motion.div
        className={className}
        variants={variants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.12, margin: "0px 0px -10% 0px" }}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <motion.div className={className} variants={variants} initial="hidden" animate="show">
      {children}
    </motion.div>
  );
}

export function FadeIn({
  children,
  className,
  delay = 0,
  y = 22,
  inView = false,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  inView?: boolean;
}) {
  const reduce = useReducedMotion();
  if (reduce) return <div className={className}>{children}</div>;

  const variants = {
    hidden: { opacity: 0, y },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.55, ease: easeLux, delay },
    },
  };

  if (inView) {
    return (
      <motion.div
        className={className}
        variants={variants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.12, margin: "0px 0px -10% 0px" }}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <motion.div className={className} variants={variants} initial="hidden" animate="show">
      {children}
    </motion.div>
  );
}

export function FadeInItem({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const reduce = useReducedMotion();
  if (reduce) return <div className={className}>{children}</div>;

  return (
    <motion.div className={className} variants={fadeUp}>
      {children}
    </motion.div>
  );
}
