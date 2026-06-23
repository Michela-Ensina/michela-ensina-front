import type { ReactNode } from "react";

import { SurfaceCard } from "@/components/ui/SurfaceCard";

type MetricTileProps = {
  label: string;
  value: string;
  detail: string;
  icon?: ReactNode;
};

export function MetricTile({ label, value, detail, icon }: MetricTileProps) {
  return (
    <SurfaceCard className="min-h-32">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="student-muted-text text-sm">
            {label}
          </p>
          <p className="mt-2 text-3xl font-bold leading-none">{value}</p>
        </div>
        {icon ? (
          <div
            className="flex size-10 shrink-0 items-center justify-center rounded-xl"
            style={{
              backgroundColor: "color-mix(in oklab, var(--color-primary) 16%, var(--color-surface))",
              color: "var(--color-primary)",
            }}
          >
            {icon}
          </div>
        ) : null}
      </div>
      <p className="student-muted-text mt-4 text-sm">
        {detail}
      </p>
    </SurfaceCard>
  );
}
