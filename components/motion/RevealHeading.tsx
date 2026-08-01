"use client";

import type { ReactNode } from "react";
import SlideTitle from "@/components/motion/SlideTitle";

/** Alias de SlideTitle — deslizamiento horizontal elegante (sin subrayado). */
export default function RevealHeading({
  children,
  className = "",
  as = "h2",
  from = "left",
  delay = 0,
  inView = true,
}: {
  children: ReactNode;
  className?: string;
  as?: "h1" | "h2" | "h3";
  from?: "left" | "right";
  delay?: number;
  inView?: boolean;
}) {
  return (
    <SlideTitle
      as={as}
      from={from}
      delay={delay}
      inView={inView}
      className={className}
    >
      {children}
    </SlideTitle>
  );
}
