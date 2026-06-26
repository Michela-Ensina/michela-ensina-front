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
