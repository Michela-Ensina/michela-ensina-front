import type { ComponentProps } from "react";

import { cn } from "@/lib/utils/cn";

type SurfaceCardProps = ComponentProps<"section">;

export function SurfaceCard({ className, ...props }: SurfaceCardProps) {
  return (
    <section
      className={cn(
        "rounded-[var(--radius-lg)] border p-5 shadow-[var(--shadow-sm)] sm:p-6",
        className,
      )}
      style={{
        background:
          "linear-gradient(145deg, color-mix(in oklab, var(--color-surface) 92%, var(--color-brand-lilac)), var(--color-surface))",
        borderColor: "color-mix(in oklab, var(--color-border) 78%, var(--color-accent-soft))",
        backdropFilter: "blur(2px)",
      }}
      {...props}
    />
  );
}
