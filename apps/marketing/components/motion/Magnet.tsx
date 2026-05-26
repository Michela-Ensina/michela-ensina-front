"use client";

import type { HTMLAttributes, PointerEvent } from "react";
import { useEffect, useMemo, useRef, useState } from "react";

import { cn } from "@/lib/utils";

type MagnetProps = HTMLAttributes<HTMLDivElement> & {
  padding?: number;
  magnetStrength?: number;
  activeTransition?: string;
  inactiveTransition?: string;
};

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

export function Magnet({
  className,
  children,
  padding = 40,
  magnetStrength = 24,
  activeTransition = "transform 0.18s ease-out",
  inactiveTransition = "transform 0.35s ease-out",
  ...props
}: MagnetProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [translate, setTranslate] = useState({ x: 0, y: 0 });
  const [active, setActive] = useState(false);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const mediaReduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const mediaCoarse = window.matchMedia("(pointer: coarse)");

    const update = () => {
      setEnabled(!mediaReduce.matches && !mediaCoarse.matches);
    };

    update();
    mediaReduce.addEventListener("change", update);
    mediaCoarse.addEventListener("change", update);

    return () => {
      mediaReduce.removeEventListener("change", update);
      mediaCoarse.removeEventListener("change", update);
    };
  }, []);

  const style = useMemo(
    () => ({
      transform: `translate3d(${translate.x}px, ${translate.y}px, 0)`,
      transition: active ? activeTransition : inactiveTransition,
      willChange: active ? "transform" : "auto",
    }),
    [active, activeTransition, inactiveTransition, translate.x, translate.y],
  );

  function handlePointerMove(event: PointerEvent<HTMLDivElement>) {
    if (!enabled || !ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const deltaX = event.clientX - centerX;
    const deltaY = event.clientY - centerY;

    const maxOffset = padding / 4;
    setTranslate({
      x: clamp(deltaX / magnetStrength, -maxOffset, maxOffset),
      y: clamp(deltaY / magnetStrength, -maxOffset, maxOffset),
    });
    setActive(true);
  }

  function handlePointerLeave() {
    setActive(false);
    setTranslate({ x: 0, y: 0 });
  }

  return (
    <div
      ref={ref}
      className={cn("inline-flex", className)}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      style={enabled ? style : undefined}
      {...props}
    >
      {children}
    </div>
  );
}
