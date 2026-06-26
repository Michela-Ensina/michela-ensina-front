import type { AdminMaterial, AdminMaterialPayload, AdminUploadType } from "@/types/admin";
import type { MaterialType } from "@/types/student";

export type MaterialFormState = {
  title: string;
  description: string;
  type: MaterialType;
  url: string;
  order: string;
  releasedAt: string;
  isActive: boolean;
  attachmentIds: string[];
};

export const emptyMaterialForm: MaterialFormState = {
  title: "",
  description: "",
  type: "video",
  url: "",
  order: "0",
  releasedAt: "",
  isActive: true,
  attachmentIds: [],
};

export const adminMaterialTypes = [
  { value: "video", label: "Vídeo" },
  { value: "pdf", label: "PDF" },
  { value: "attachment", label: "Anexo" },
  { value: "other", label: "Link" },
] satisfies Array<{ value: MaterialType; label: string }>;

export function getAdminUploadType(type: MaterialType): AdminUploadType | null {
  if (type === "video") return "attachment";
  if (type === "pdf") return "pdf";
  if (type === "attachment") return "attachment";
  return null;
}

export function toAdminMaterialPayload(form: MaterialFormState): AdminMaterialPayload {
  return {
    title: form.title.trim(),
    description: form.description.trim() || null,
    type: form.type,
    url: form.url.trim(),
    order: Number(form.order || 0),
    released_at: form.releasedAt || null,
    is_active: form.isActive,
    attachment_ids: form.attachmentIds,
  };
}

export function toAdminMaterialFormState(material: AdminMaterial): MaterialFormState {
  return {
    title: material.title,
    description: material.description ?? "",
    type: material.type,
    url: material.url,
    order: String(material.order),
    releasedAt: material.released_at ? material.released_at.slice(0, 16) : "",
    isActive: material.is_active,
    attachmentIds: material.attachments?.map((attachment) => attachment.id) ?? [],
  };
}
