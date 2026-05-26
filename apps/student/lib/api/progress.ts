import { apiGet, apiPost } from "@/lib/api/client";
import type { ProgressItem, ProgressSummary } from "@/types/student";

export function getProgress(token: string) {
  return apiGet<ProgressSummary>("/student/progress", { token });
}

export function updateMaterialProgress(materialId: string, token: string) {
  return apiPost<ProgressItem>(`/student/materials/${materialId}/progress`, undefined, { token });
}
