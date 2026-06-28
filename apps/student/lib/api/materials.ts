import { apiGet, buildApiUrl } from "@/lib/api/client";
import type { Material } from "@/types/student";

export function getMaterials(token: string) {
  return apiGet<Material[]>("/student/materials", { token });
}

export function getMaterialById(id: string, token: string) {
  return apiGet<Material>(`/student/materials/${id}`, { token });
}

export function getMaterialUploadFileUrl(materialId: string, uploadId: string) {
  return buildApiUrl(`/student/materials/${materialId}/uploads/${uploadId}`);
}
