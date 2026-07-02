import { apiGet, buildApiUrl } from "@/lib/api/client";
import type { Material } from "@/types/student";

export function getMaterials(token: string) {
  return apiGet<Material[]>("/student/materials", { token });
}

export function getMaterialById(id: string, token: string) {
  return apiGet<Material>(`/student/materials/${id}`, { token });
}

export function getMaterialUploadFileUrl(
  materialId: string,
  uploadId: string,
  options?: { download?: boolean },
) {
  const params = new URLSearchParams();
  if (options?.download) {
    params.set("download", "1");
  }

  const query = params.toString();
  return buildApiUrl(
    `/student/materials/${materialId}/uploads/${uploadId}${query ? `?${query}` : ""}`,
  );
}
