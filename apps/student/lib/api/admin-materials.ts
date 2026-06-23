import { apiDelete, apiFormPost, apiGet, apiPost, apiPut } from "@/lib/api/client";
import type { AdminMaterial, AdminMaterialPayload, AdminUpload, AdminUploadType } from "@/types/admin";

type DeleteResponse = {
  message: string;
};

export function getAdminMaterials(token: string) {
  return apiGet<AdminMaterial[]>("/admin/materials", { token });
}

export function createAdminMaterial(payload: AdminMaterialPayload, token: string) {
  return apiPost<AdminMaterial, AdminMaterialPayload>("/admin/materials", payload, { token });
}

export function updateAdminMaterial(id: string, payload: Partial<AdminMaterialPayload>, token: string) {
  return apiPut<AdminMaterial, Partial<AdminMaterialPayload>>(`/admin/materials/${id}`, payload, { token });
}

export function deleteAdminMaterial(id: string, token: string) {
  return apiDelete<DeleteResponse>(`/admin/materials/${id}`, { token });
}

export function uploadAdminMaterialFile(file: File, type: AdminUploadType, token: string) {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("type", type);

  return apiFormPost<AdminUpload>("/admin/uploads", formData, { token });
}
