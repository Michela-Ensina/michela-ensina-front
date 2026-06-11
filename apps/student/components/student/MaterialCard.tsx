import Link from "next/link";
import { FileText, Link2, Paperclip, PlayCircle } from "lucide-react";

import { StatusBadge } from "@/components/ui/StatusBadge";
import { SurfaceCard } from "@/components/ui/SurfaceCard";
import type { Material, ProgressItem } from "@/types/student";

type MaterialStatus = {
  label: string;
  tone: "novo" | "em-andamento" | "concluído";
};

type MaterialCardProps = {
  material: Material;
  progressItems: ProgressItem[];
};

function getMaterialStatus(material: Material, progressItems: ProgressItem[]): MaterialStatus {
  const progress = progressItems.find((item) => item.material_id === material.id);

  if (!progress) {
    return { label: "Ainda não iniciado", tone: "novo" };
  }

  if (progress.viewed) {
    return { label: "Material concluído", tone: "concluído" };
  }

  return { label: "Em andamento", tone: "em-andamento" };
}

function getMaterialTypeMeta(type: Material["type"]) {
  if (type === "video") return { label: "Vídeo", icon: PlayCircle };
  if (type === "pdf") return { label: "PDF", icon: FileText };
  if (type === "attachment") return { label: "Anexo", icon: Paperclip };
  return { label: "Link", icon: Link2 };
}

export function MaterialCard({ material, progressItems }: MaterialCardProps) {
  const status = getMaterialStatus(material, progressItems);
  const type = getMaterialTypeMeta(material.type);
  const TypeIcon = type.icon;

  return (
    <SurfaceCard className="flex min-h-56 flex-col">
      <div className="flex items-start justify-between gap-3">
        <div
          className="flex size-10 shrink-0 items-center justify-center rounded-xl"
          style={{
            backgroundColor: "color-mix(in oklab, var(--color-primary) 14%, transparent)",
            color: "var(--color-primary)",
          }}
        >
          <TypeIcon size={18} aria-hidden="true" />
        </div>
        <StatusBadge label={status.label} tone={status.tone} />
      </div>

      <div className="mt-4 flex-1">
        <p className="text-xs font-semibold uppercase tracking-[0.08em]" style={{ color: "var(--color-text-muted)" }}>
          {type.label}
        </p>
        <h3 className="mt-2 text-xl leading-tight">{material.title}</h3>
        <p className="mt-2 text-sm" style={{ color: "var(--color-text-muted)" }}>
          {material.description ?? "Material disponível para estudo."}
        </p>
      </div>

      <Link href={`/materiais/${material.id}`} className="mt-5 text-sm font-semibold" style={{ color: "var(--color-primary)" }}>
        {status.tone === "concluído" ? "Revisar material" : "Continuar estudando"}
      </Link>
    </SurfaceCard>
  );
}
