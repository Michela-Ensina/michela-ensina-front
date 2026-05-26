"use client";

import { motion, useInView, useReducedMotion } from "motion/react";
import type { HTMLAttributes } from "react";
import { useMemo, useRef } from "react";

import { cn } from "@/lib/utils";

type BlurTextProps = HTMLAttributes<HTMLSpanElement> & {
  text: string;
  animateBy?: "words" | "chars";
  direction?: "bottom" | "top";
  delay?: number;
  stepDuration?: number;
  threshold?: number;
  rootMargin?: string;
};

export function BlurText({
  text,
  className,
  animateBy = "words",
  direction = "bottom",
  delay = 90,
  stepDuration = 0.4,
  threshold = 0.25,
  rootMargin = "0px 0px -10% 0px",
  ...props
}: BlurTextProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const isInView = useInView(ref, {
    once: true,
    amount: threshold,
    margin: rootMargin as never,
  });

  const items = useMemo(() => {
    if (animateBy === "chars") {
      return text.split("").map((char, index) => ({
        key: `${char}-${index}`,
        value: char === " " ? "\u00A0" : char,
      }));
    }

    return text.split(" ").map((word, index) => ({
      key: `${word}-${index}`,
      value: index === 0 ? word : ` ${word}`,
    }));
  }, [animateBy, text]);

  if (shouldReduceMotion) {
    return (
      <span className={className} {...props}>
        {text}
      </span>
    );
  }

  return (
    <span
      ref={ref}
      aria-label={text}
      className={cn("inline-block", className)}
      {...props}
    >
      {items.map((item, index) => (
        <motion.span
          key={item.key}
          aria-hidden
          className="inline-block whitespace-pre"
          initial={{
            opacity: 0,
            filter: "blur(6px)",
            y: direction === "bottom" ? 14 : -14,
          }}
          animate={
            isInView
              ? { opacity: 1, filter: "blur(0px)", y: 0 }
              : { opacity: 0, filter: "blur(6px)", y: direction === "bottom" ? 14 : -14 }
          }
          transition={{
            duration: stepDuration,
            delay: (delay / 1000) * index,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          {item.value}
        </motion.span>
      ))}
    </span>
  );
}
