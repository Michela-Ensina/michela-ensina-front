import type {
  AdminMaterial,
  AdminMaterialAttachmentPayload,
  AdminMaterialPayload,
  AdminUploadType,
} from "@/types/admin";
import type { MaterialAttachment, MaterialType } from "@/types/student";

export type MaterialFormAttachment = {
  id: string;
  downloadable: boolean;
};

export type MaterialFormState = {
  title: string;
  description: string;
  type: MaterialType;
  url: string;
  order: string;
  releasedAt: string;
  isActive: boolean;
  attachments: MaterialFormAttachment[];
  productIds: string[];
};

export const emptyMaterialForm: MaterialFormState = {
  title: "",
  description: "",
  type: "video",
  url: "",
  order: "0",
  releasedAt: "",
  isActive: true,
  attachments: [],
  productIds: [],
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

export function normalizeFormAttachments(
  attachments: MaterialFormAttachment[],
): MaterialFormAttachment[] {
  const seen = new Set<string>();

  return attachments.filter((attachment) => {
    if (seen.has(attachment.id)) return false;
    seen.add(attachment.id);
    return true;
  });
}

export function toMaterialFormAttachments(
  attachments: MaterialAttachment[],
): MaterialFormAttachment[] {
  return normalizeFormAttachments(
    attachments.map((attachment) => ({
      id: attachment.id,
      downloadable: Boolean(attachment.downloadable),
    })),
  );
}

export function toAdminMaterialAttachmentsPayload(
  attachments: MaterialFormAttachment[],
): AdminMaterialAttachmentPayload[] {
  return normalizeFormAttachments(attachments).map((attachment, index) => ({
    id: attachment.id,
    order: index,
    downloadable: attachment.downloadable,
  }));
}

export function toAdminMaterialPayload(form: MaterialFormState): AdminMaterialPayload {
  return {
    title: form.title.trim(),
    description: form.description.trim() || null,
    type: form.type,
    url: form.url.trim(),
    order: Number(form.order || 0),
    released_at: form.releasedAt || new Date().toISOString(),
    is_active: form.isActive,
    attachments: toAdminMaterialAttachmentsPayload(form.attachments),
    product_ids: Array.from(new Set(form.productIds)),
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
    attachments: toMaterialFormAttachments(material.attachments ?? []),
    productIds: material.products?.map((product) => product.id) ?? material.product_ids ?? [],
  };
}
