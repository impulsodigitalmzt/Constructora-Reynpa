"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ButtonHTMLAttributes, MouseEvent, ReactNode } from "react";
import { useState } from "react";

type Ripple = { id: number; x: number; y: number };

type Props = Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  "onDrag" | "onDragStart" | "onDragEnd" | "onAnimationStart"
> & {
  children: ReactNode;
};

/** Primary CTA: scale hover + gold ripple on press */
export default function RippleButton({
  children,
  className = "",
  onClick,
  type = "button",
  disabled,
  ...rest
}: Props) {
  const reduce = useReducedMotion();
  const [ripples, setRipples] = useState<Ripple[]>([]);

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    if (!reduce && !disabled) {
      const rect = event.currentTarget.getBoundingClientRect();
      const id = Date.now();
      setRipples((prev) => [...prev, { id, x: event.clientX - rect.left, y: event.clientY - rect.top }]);
      window.setTimeout(() => {
        setRipples((prev) => prev.filter((r) => r.id !== id));
      }, 650);
    }
    onClick?.(event);
  };

  return (
    <motion.button
      type={type}
      disabled={disabled}
      className={`relative overflow-hidden ${className}`}
      whileHover={reduce || disabled ? undefined : { scale: 1.02, y: -1 }}
      whileTap={reduce || disabled ? undefined : { scale: 0.985 }}
      transition={{ type: "spring", stiffness: 380, damping: 24 }}
      onClick={handleClick}
      {...rest}
    >
      <span className="relative z-[1] inline-flex items-center justify-center gap-2">{children}</span>
      {ripples.map((ripple) => (
        <span
          key={ripple.id}
          className="pointer-events-none absolute z-0 size-4 -translate-x-1/2 -translate-y-1/2 animate-reypa-ripple rounded-full bg-[#d4b28c]/45"
          style={{ left: ripple.x, top: ripple.y }}
        />
      ))}
    </motion.button>
  );
}
