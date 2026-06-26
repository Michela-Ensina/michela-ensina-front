import type { AdminUploadType } from "@/types/admin";

const MAX_UPLOAD_SIZE_BYTES = 50 * 1024 * 1024;

const ALLOWED_UPLOAD_EXTENSIONS = {
  pdf: ["pdf"],
  attachment: ["pdf", "doc", "docx", "xls", "xlsx", "zip"],
  other: ["pdf", "doc", "docx", "xls", "xlsx", "zip"],
} satisfies Record<AdminUploadType, string[]>;

export const ADMIN_UPLOAD_MAX_SIZE_LABEL = "50 MB";

export function getAllowedUploadExtensions(type: AdminUploadType) {
  return ALLOWED_UPLOAD_EXTENSIONS[type];
}

export function getAdminUploadAcceptValue(type: AdminUploadType) {
  return getAllowedUploadExtensions(type)
    .map((extension) => `.${extension}`)
    .join(",");
}

export function getAdminUploadHelpText(type: AdminUploadType) {
  const extensions = getAllowedUploadExtensions(type)
    .map((extension) => extension.toUpperCase())
    .join(", ");

  return `${extensions} até ${ADMIN_UPLOAD_MAX_SIZE_LABEL}.`;
}

export function validateAdminUploadFile(file: File, type: AdminUploadType) {
  if (file.size > MAX_UPLOAD_SIZE_BYTES) {
    return `O arquivo deve ter no máximo ${ADMIN_UPLOAD_MAX_SIZE_LABEL}.`;
  }

  const extension = file.name.split(".").pop()?.toLowerCase();
  const allowedExtensions = getAllowedUploadExtensions(type);

  if (!extension || !allowedExtensions.includes(extension)) {
    return `Formato inválido. Envie: ${allowedExtensions.map((item) => item.toUpperCase()).join(", ")}.`;
  }

  return null;
}
