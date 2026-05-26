import type { ComponentProps } from "react";

import { cn } from "@/lib/utils";

type CardProps = ComponentProps<"div">;

export function Card({ className, ...props }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-xl border border-border/30 bg-surface p-6 shadow-sm sm:p-7",
        className,
      )}
      {...props}
    />
  );
}
