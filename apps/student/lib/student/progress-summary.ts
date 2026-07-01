import type { ProgressSummary } from "@/types/student";

export function createEmptyProgressSummary(totalMaterials = 0): ProgressSummary {
  return {
    total_materials: totalMaterials,
    viewed_count: 0,
    percentage: 0,
    items: [],
  };
}
