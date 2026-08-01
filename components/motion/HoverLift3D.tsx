"use client";

import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "framer-motion";
import type { ReactNode } from "react";
import { useRef } from "react";

type Props = {
  children: ReactNode;
  className?: string;
  intensity?: number;
};

/** Elevación 3D genérica para tarjetas de landing / admin / portal */
export default function HoverLift3D({ children, className = "", intensity = 8 }: Props) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const rx = useSpring(0, { stiffness: 240, damping: 24 });
  const ry = useSpring(0, { stiffness: 240, damping: 24 });
  const glowX = useMotionValue(50);
  const glowY = useMotionValue(50);
  const glow = useTransform([glowX, glowY], ([x, y]) =>
    `radial-gradient(380px circle at ${x}% ${y}%, rgba(212,178,140,0.2), transparent 58%)`,
  );

  if (reduce) {
    return <div className={className}>{children}</div>;
  }

  const onMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (event.clientX - rect.left) / rect.width;
    const py = (event.clientY - rect.top) / rect.height;
    rx.set((py - 0.5) * -intensity);
    ry.set((px - 0.5) * intensity);
    glowX.set(px * 100);
    glowY.set(py * 100);
  };

  return (
    <motion.div
      ref={ref}
      className={`group/lift relative transform-gpu will-change-transform ${className}`}
      style={{
        rotateX: rx,
        rotateY: ry,
        transformPerspective: 900,
        transformStyle: "preserve-3d",
      }}
      onMouseMove={onMove}
      onMouseLeave={() => {
        rx.set(0);
        ry.set(0);
      }}
      whileHover={{
        y: -7,
        transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] },
      }}
    >
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-[1] rounded-[inherit] opacity-0 transition-opacity duration-300 group-hover/lift:opacity-100"
        style={{ background: glow }}
      />
      <div className="relative z-[2] h-full">{children}</div>
    </motion.div>
  );
}
