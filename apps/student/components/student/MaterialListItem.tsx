import Link from "next/link";
import { FileText, Link2, Paperclip, PlayCircle } from "lucide-react";

import { StatusBadge } from "@/components/ui/StatusBadge";
import type { Material, ProgressItem } from "@/types/student";

type MaterialTone = "novo" | "em-andamento" | "concluído";

export function getMaterialStatus(material: Material, progressItems: ProgressItem[]) {
  const progress = progressItems.find((item) => item.material_id === material.id);

  if (!progress) {
    return { label: "Ainda não iniciado", tone: "novo" as MaterialTone };
  }

  if (progress.viewed) {
    return { label: "Material concluído", tone: "concluído" as MaterialTone };
  }

  return { label: "Em andamento", tone: "em-andamento" as MaterialTone };
}

export function getMaterialTypeMeta(type: Material["type"]) {
  if (type === "video") return { label: "Vídeo", icon: PlayCircle };
  if (type === "pdf") return { label: "PDF", icon: FileText };
  if (type === "attachment") return { label: "Anexo", icon: Paperclip };
  return { label: "Link", icon: Link2 };
}

type MaterialListItemProps = {
  material: Material;
  progressItems: ProgressItem[];
  density?: "comfortable" | "compact";
};

export function MaterialListItem({ material, progressItems, density = "comfortable" }: MaterialListItemProps) {
  const status = getMaterialStatus(material, progressItems);
  const type = getMaterialTypeMeta(material.type);
  const TypeIcon = type.icon;

  return (
    <article
      className="grid gap-3 border-b py-4 last:border-b-0 sm:grid-cols-[auto_1fr_auto] sm:items-center"
      style={{ borderColor: "color-mix(in oklab, var(--color-border) 72%, transparent)" }}
    >
      <div
        className="flex size-10 items-center justify-center rounded-xl"
        style={{
          backgroundColor: "color-mix(in oklab, var(--color-primary) 13%, transparent)",
          color: "var(--color-primary)",
        }}
      >
        <TypeIcon size={18} aria-hidden="true" />
      </div>

      <div className="min-w-0">
        <div className="flex flex-wrap items-center gap-2">
          <p className="text-xs font-bold" style={{ color: "var(--color-text-muted)" }}>
            {type.label}
          </p>
          <StatusBadge label={status.label} tone={status.tone} />
        </div>
        <h3 className="mt-1 text-lg leading-tight">{material.title}</h3>
        {density === "comfortable" ? (
          <p className="mt-1 max-w-2xl text-sm" style={{ color: "var(--color-text-muted)" }}>
            {material.description ?? "Material disponível para estudo."}
          </p>
        ) : null}
      </div>

      <Link
        href={`/materiais/${material.id}`}
        className="inline-flex min-h-9 items-center justify-center rounded-xl px-3 text-sm font-semibold"
        style={{
          color: "var(--color-primary)",
          backgroundColor: "color-mix(in oklab, var(--color-primary) 10%, transparent)",
        }}
      >
        {status.tone === "concluído" ? "Revisar" : "Continuar"}
      </Link>
    </article>
  );
}
