import Link from "next/link";

import { getMaterialStatus, getMaterialTypeMeta } from "@/components/student/materials/material-display";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { SurfaceCard } from "@/components/ui/SurfaceCard";
import type { Material, ProgressItem } from "@/types/student";

type MaterialCardProps = {
  material: Material;
  progressItems: ProgressItem[];
};

export function MaterialCard({ material, progressItems }: MaterialCardProps) {
  const status = getMaterialStatus(material, progressItems);
  const type = getMaterialTypeMeta(material.type);
  const TypeIcon = type.icon;

  return (
    <SurfaceCard className="student-hover-surface flex min-h-56 flex-col shadow-none transition-colors duration-200">
      <div className="flex items-start justify-between gap-3">
        <div
          className="flex size-10 shrink-0 items-center justify-center rounded-xl"
          style={{
            backgroundColor: "color-mix(in oklab, var(--color-primary) 16%, var(--color-surface))",
            color: "var(--color-primary)",
          }}
        >
          <TypeIcon size={18} aria-hidden="true" />
        </div>
        <StatusBadge label={status.label} tone={status.tone} />
      </div>

      <div className="mt-4 flex-1">
        <p className="student-muted-text text-xs font-semibold uppercase tracking-[0.08em]">
          {type.label}
        </p>
        <h3 className="mt-2 text-xl leading-tight">{material.title}</h3>
        <p className="student-muted-text mt-2 text-sm">
          {material.description ?? "Material disponível para estudo."}
        </p>
      </div>

      <Link
        href={`/materiais/${material.id}`}
        className="student-text-action -mx-2 mt-5 w-fit rounded-lg px-2 py-1 text-sm font-semibold"
        style={{ color: "var(--color-primary)" }}
      >
        {status.tone === "concluído" ? "Revisar material" : "Continuar estudando"}
      </Link>
    </SurfaceCard>
  );
}
