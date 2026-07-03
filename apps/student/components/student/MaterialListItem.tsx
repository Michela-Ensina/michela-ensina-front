import Link from "next/link";

import {
  getMaterialStatus,
  getMaterialTypeAccent,
  getMaterialTypeMeta,
} from "@/components/student/materials/material-display";
import { buttonVariants } from "@/components/ui/button";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { cn } from "@/lib/utils/cn";
import type { Material, ProgressItem } from "@/types/student";

type MaterialListItemProps = {
  material: Material;
  progressItems: ProgressItem[];
  density?: "comfortable" | "compact";
};

export function MaterialListItem({
  material,
  progressItems,
  density = "comfortable",
}: MaterialListItemProps) {
  const status = getMaterialStatus(material, progressItems);
  const type = getMaterialTypeMeta(material.type);
  const accent = getMaterialTypeAccent(material.type);
  const TypeIcon = type.icon;

  return (
    <article
      className={cn(
        "student-hover-surface student-soft-surface grid gap-3 rounded-md border p-4 transition-colors duration-200",
        density === "compact"
          ? "grid-cols-[auto_1fr] items-start sm:grid-cols-[auto_1fr_auto] sm:items-center"
          : "sm:grid-cols-[auto_1fr_auto] sm:items-center",
      )}
    >
      <div
        className="flex size-10 items-center justify-center rounded-xl"
        style={{
          backgroundColor: accent.surface,
          color: accent.color,
        }}
      >
        <TypeIcon size={18} aria-hidden="true" />
      </div>

      <div className="min-w-0">
        <div className="flex flex-wrap items-center gap-2">
          <p className="student-muted-text text-xs font-bold">{type.label}</p>
          <StatusBadge label={status.label} tone={status.tone} />
        </div>
        <h3 className="mt-1 text-lg leading-tight">{material.title}</h3>
        {density === "comfortable" ? (
          <p className="student-muted-text mt-1 max-w-2xl text-sm">
            {material.description ?? "Material disponível para estudo."}
          </p>
        ) : null}
      </div>

      <Link
        href={`/materiais/${material.id}`}
        className={cn(
          buttonVariants({ variant: "primary", size: "sm" }),
          "text-sm",
          density === "compact"
            ? "col-start-2 justify-self-start sm:col-start-auto sm:justify-self-end"
            : "",
        )}
      >
        {status.tone === "concluído" ? "Revisar" : "Continuar"}
      </Link>
    </article>
  );
}
