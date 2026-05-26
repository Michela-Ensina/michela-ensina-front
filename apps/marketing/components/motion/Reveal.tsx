"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

type RevealVariant = "fade-up" | "fade-scale" | "fade";

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  y?: number;
  scale?: number;
  once?: boolean;
  amount?: number;
  variant?: RevealVariant;
};

export function Reveal({
  children,
  className,
  delay = 0,
  duration = 0.6,
  y = 18,
  scale = 0.98,
  once = true,
  amount = 0.25,
  variant = "fade-up",
}: RevealProps) {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return <div className={className}>{children}</div>;
  }

  const initial =
    variant === "fade"
      ? { opacity: 0 }
      : variant === "fade-scale"
        ? { opacity: 0, y: Math.min(y, 16), scale }
        : { opacity: 0, y };

  const animate =
    variant === "fade"
      ? { opacity: 1 }
      : variant === "fade-scale"
        ? { opacity: 1, y: 0, scale: 1 }
        : { opacity: 1, y: 0 };

  return (
    <motion.div
      className={cn(className)}
      initial={initial}
      transition={{
        duration,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
      viewport={{ once, amount }}
      whileInView={animate}
    >
      {children}
    </motion.div>
  );
}
