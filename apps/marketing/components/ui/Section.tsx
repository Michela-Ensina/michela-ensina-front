import type { ComponentProps } from "react";

import { cn } from "@/lib/utils";

type SectionTone = "default" | "soft" | "accent";

const toneClasses: Record<SectionTone, string> = {
  default: "bg-surface",
  soft: "bg-background",
  accent: "bg-surface-soft",
};

interface SectionProps extends ComponentProps<"section"> {
  tone?: SectionTone;
}

export function Section({
  className,
  tone = "soft",
  ...props
}: SectionProps) {
  return (
    <section
      className={cn("py-14 sm:py-20", toneClasses[tone], className)}
      {...props}
    />
  );
}
