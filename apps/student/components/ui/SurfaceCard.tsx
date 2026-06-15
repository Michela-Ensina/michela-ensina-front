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
        backgroundColor: "var(--color-surface)",
        borderColor: "color-mix(in oklab, var(--color-border) 84%, var(--color-primary))",
        backdropFilter: "blur(2px)",
      }}
      {...props}
    />
  );
}
