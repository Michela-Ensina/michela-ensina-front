import { FileText, Link2, Paperclip, PlayCircle } from "lucide-react";

import type { Material, ProgressItem } from "@/types/student";

export type MaterialTone = "novo" | "em-andamento" | "concluído";

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

export function getMaterialTypeAccent(type: Material["type"]) {
  if (type === "video") {
    return {
      color: "var(--color-brand-blue)",
      surface: "color-mix(in oklab, var(--color-brand-blue) 16%, var(--color-surface))",
    };
  }

  if (type === "pdf") {
    return {
      color: "var(--color-primary)",
      surface: "color-mix(in oklab, var(--color-primary) 16%, var(--color-surface))",
    };
  }

  if (type === "attachment") {
    return {
      color: "var(--color-accent-soft)",
      surface: "color-mix(in oklab, var(--color-accent-soft) 14%, var(--color-surface))",
    };
  }

  return {
    color: "var(--color-accent)",
    surface: "color-mix(in oklab, var(--color-accent) 14%, var(--color-surface))",
  };
}
