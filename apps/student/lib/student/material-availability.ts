import type { Material, ProgressSummary } from "@/types/student";

export function isMaterialReleased(material: Material, now = new Date()) {
  if (!material.released_at) return true;

  const releaseTime = Date.parse(material.released_at);

  if (Number.isNaN(releaseTime)) return true;

  return releaseTime <= now.getTime();
}

export function filterReleasedMaterials(materials: Material[], now = new Date()) {
  return materials.filter((material) => isMaterialReleased(material, now));
}

export function filterProgressForReleasedMaterials(
  progress: ProgressSummary | null,
  materials: Material[],
): ProgressSummary | null {
  if (!progress) return null;

  const materialIds = new Set(materials.map((material) => material.id));
  const items = progress.items.filter((item) => materialIds.has(item.material_id));
  const viewedCount = items.filter((item) => item.viewed).length;
  const totalMaterials = materials.length;

  return {
    ...progress,
    total_materials: totalMaterials,
    viewed_count: viewedCount,
    percentage: totalMaterials > 0 ? Math.round((viewedCount / totalMaterials) * 100) : 0,
    items,
  };
}
