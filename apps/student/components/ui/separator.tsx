import { cn } from "@/lib/utils/cn";

type SeparatorProps = {
  className?: string;
};

export function Separator({ className }: SeparatorProps) {
  return (
    <div
      data-slot="separator"
      role="separator"
      className={cn("my-4 h-px w-full", className)}
      style={{ backgroundColor: "color-mix(in oklab, var(--color-border) 75%, transparent)" }}
    />
  );
}
