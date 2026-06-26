import { getMaterials } from "@/lib/api/materials";
import { getProgress } from "@/lib/api/progress";
import { useStudentData } from "@/lib/student/use-student-data";
import type { Material, ProgressSummary } from "@/types/student";

type MaterialsData = {
  materials: Material[];
  progress: ProgressSummary | null;
};

async function loadMaterialsData(token: string): Promise<MaterialsData> {
  const [materials, progress] = await Promise.all([getMaterials(token), getProgress(token)]);

  return { materials, progress };
}

export function useMaterialsData() {
  return useStudentData({
    loadData: loadMaterialsData,
    fallbackErrorMessage: "Não foi possível carregar os materiais.",
    isEmpty: (data) => (data?.materials.length ?? 0) === 0,
  });
}
