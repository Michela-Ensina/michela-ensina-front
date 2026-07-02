import { apiGet, apiPost } from "@/lib/api/client";
import type { ProgressItem, ProgressSummary } from "@/types/student";
import { apiDelete } from "@/lib/api/client";

export function getProgress(token: string) {
  return apiGet<ProgressSummary>("/student/progress", { token });
}

export function updateMaterialProgress(materialId: string, token: string) {
  return apiPost<ProgressItem>(`/student/materials/${materialId}/progress`, undefined, { token });
}

export function deleteMaterialProgress(materialId: string, token: string) {
  return apiDelete<ProgressSummary>(`/student/materials/${materialId}/progress`, { token });
}
