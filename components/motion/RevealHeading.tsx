"use client";

import { motion, useReducedMotion } from "framer-motion";
import { easeLux } from "@/lib/motion";

export default function RevealHeading({
  children,
  className = "",
  as: Tag = "h2",
}: {
  children: string;
  className?: string;
  as?: "h1" | "h2" | "h3";
}) {
  const reduce = useReducedMotion();

  if (reduce) {
    return <Tag className={`font-editorial tracking-luxury ${className}`}>{children}</Tag>;
  }

  return (
    <Tag className={`font-editorial tracking-luxury ${className}`}>
      <span className="relative inline-block overflow-hidden pb-1">
        <motion.span
          className="relative z-[1] block"
          initial={{ y: "110%", opacity: 0 }}
          animate={{ y: "0%", opacity: 1 }}
          transition={{ duration: 0.7, ease: easeLux, delay: 0.08 }}
        >
          {children}
        </motion.span>
        <motion.span
          aria-hidden
          className="absolute bottom-0 left-0 h-px origin-left bg-[#d4b28c]"
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ duration: 0.65, ease: easeLux, delay: 0.2 }}
          style={{ width: "100%" }}
        />
      </span>
    </Tag>
  );
}
