import type { CSSProperties } from "react";

import { cn } from "@/lib/utils/cn";

type StatusBadgeTone = "novo" | "em-andamento" | "concluído" | "bloqueado";

type StatusBadgeProps = {
  label: string;
  tone?: StatusBadgeTone;
};

const toneClasses: Record<StatusBadgeTone, string> = {
  novo: "border-transparent",
  "em-andamento": "border-transparent",
  concluído: "border-transparent",
  bloqueado: "border-transparent",
};

const toneStyles: Record<StatusBadgeTone, CSSProperties> = {
  novo: {
    backgroundColor: "color-mix(in oklab, var(--color-brand-lilac) 22%, transparent)",
    color: "color-mix(in oklab, var(--color-primary) 84%, var(--color-text))",
  },
  "em-andamento": {
    backgroundColor: "color-mix(in oklab, var(--color-brand-blue) 20%, transparent)",
    color: "color-mix(in oklab, var(--color-brand-blue) 76%, var(--color-text))",
  },
  concluído: {
    backgroundColor: "color-mix(in oklab, #48b08c 22%, var(--color-surface))",
    color: "color-mix(in oklab, #43c99a 72%, var(--color-text))",
  },
  bloqueado: {
    backgroundColor: "color-mix(in oklab, var(--color-text-muted) 20%, transparent)",
    color: "var(--color-text-muted)",
  },
};

export function StatusBadge({ label, tone = "novo" }: StatusBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex min-h-6 items-center rounded-full border px-2.5 py-1 text-xs font-semibold tracking-[0.01em]",
        toneClasses[tone],
      )}
      style={toneStyles[tone]}
    >
      {label}
    </span>
  );
}
