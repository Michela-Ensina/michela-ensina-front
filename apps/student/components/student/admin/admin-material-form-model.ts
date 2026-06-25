import type { AdminMaterial, AdminMaterialPayload, AdminUploadType } from "@/types/admin";
import type { MaterialType } from "@/types/student";

export type MaterialFormState = {
  title: string;
  description: string;
  type: MaterialType;
  url: string;
  order: string;
  isActive: boolean;
};

export const emptyMaterialForm: MaterialFormState = {
  title: "",
  description: "",
  type: "video",
  url: "",
  order: "0",
  isActive: true,
};

export const adminMaterialTypes = [
  { value: "video", label: "Vídeo" },
  { value: "pdf", label: "PDF" },
  { value: "attachment", label: "Anexo" },
  { value: "other", label: "Link" },
] satisfies Array<{ value: MaterialType; label: string }>;

export function getAdminUploadType(type: MaterialType): AdminUploadType | null {
  if (type === "pdf") return "pdf";
  if (type === "attachment") return "attachment";
  if (type === "other") return "other";
  return null;
}

export function toAdminMaterialPayload(form: MaterialFormState): AdminMaterialPayload {
  return {
    title: form.title.trim(),
    description: form.description.trim() || null,
    type: form.type,
    url: form.url.trim(),
    order: Number(form.order || 0),
    is_active: form.isActive,
  };
}

export function toAdminMaterialFormState(material: AdminMaterial): MaterialFormState {
  return {
    title: material.title,
    description: material.description ?? "",
    type: material.type,
    url: material.url,
    order: String(material.order),
    isActive: material.is_active,
  };
}
