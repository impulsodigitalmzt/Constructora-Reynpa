"use client";

import { motion, useMotionTemplate, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import type { ReactNode } from "react";
import { useRef } from "react";

type Props = {
  children: ReactNode;
  className?: string;
};

/** Soft 3D tilt + gold glow on hover — portal KPI cards */
export default function KpiCard3D({ children, className = "" }: Props) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const rotateX = useSpring(0, { stiffness: 220, damping: 22 });
  const rotateY = useSpring(0, { stiffness: 220, damping: 22 });
  const glowX = useMotionValue(50);
  const glowY = useMotionValue(50);
  const glow = useMotionTemplate`radial-gradient(420px circle at ${glowX}% ${glowY}%, rgba(212,178,140,0.22), transparent 55%)`;

  if (reduce) {
    return <div className={className}>{children}</div>;
  }

  const onMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (event.clientX - rect.left) / rect.width;
    const py = (event.clientY - rect.top) / rect.height;
    rotateX.set((py - 0.5) * -8);
    rotateY.set((px - 0.5) * 10);
    glowX.set(px * 100);
    glowY.set(py * 100);
  };

  const onLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
  };

  return (
    <motion.div
      ref={ref}
      className={`group/kpi relative transform-gpu will-change-transform ${className}`}
      style={{
        rotateX,
        rotateY,
        transformPerspective: 900,
        transformStyle: "preserve-3d",
      }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      whileHover={{
        y: -6,
        boxShadow:
          "0 22px 48px rgba(0,0,0,0.45), 0 0 0 1px rgba(212,178,140,0.28), 0 0 36px rgba(212,178,140,0.18)",
        transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] },
      }}
    >
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[1] rounded-[inherit] opacity-0 transition-opacity duration-300 group-hover/kpi:opacity-100"
        style={{ background: glow }}
      />
      <div className="relative z-[2] h-full">{children}</div>
    </motion.div>
  );
}
