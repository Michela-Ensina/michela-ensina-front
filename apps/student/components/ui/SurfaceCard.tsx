import type { ComponentProps } from "react";

import { cn } from "@/lib/utils/cn";

type SurfaceCardProps = ComponentProps<"section">;

export function SurfaceCard({ className, ...props }: SurfaceCardProps) {
  return (
    <section
      className={cn(
        "student-elevated-surface rounded-[var(--radius-lg)] border p-5 sm:p-6",
        className,
      )}
      {...props}
    />
  );
}
