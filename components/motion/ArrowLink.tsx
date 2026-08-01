"use client";

import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowRight } from "lucide-react";

type Props = {
  href: string;
  children: ReactNode;
  className?: string;
  showArrow?: boolean;
};

export default function ArrowLink({ href, children, className = "", showArrow = true }: Props) {
  const reduce = useReducedMotion();

  return (
    <Link href={href} className={`group inline-flex items-center gap-4 ${className}`}>
      <span>{children}</span>
      {showArrow ? (
        <motion.span
          aria-hidden
          className="inline-flex"
          animate={reduce ? undefined : undefined}
          whileHover={reduce ? undefined : { x: 6 }}
        >
          <ArrowRight
            size={16}
            className="transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-2"
          />
        </motion.span>
      ) : null}
    </Link>
  );
}
