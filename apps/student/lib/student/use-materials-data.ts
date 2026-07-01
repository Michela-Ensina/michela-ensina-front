import { getMaterials } from "@/lib/api/materials";
import { getProgress } from "@/lib/api/progress";
import { ApiClientError } from "@/lib/api/errors";
import {
  filterProgressForReleasedMaterials,
  filterReleasedMaterials,
} from "@/lib/student/material-availability";
import { useStudentData } from "@/lib/student/use-student-data";
import type { Material, ProgressSummary } from "@/types/student";

type MaterialsData = {
  materials: Material[];
  progress: ProgressSummary | null;
};

async function loadMaterialsData(token: string): Promise<MaterialsData> {
  const materials = filterReleasedMaterials(await getMaterials(token));
  let progress: ProgressSummary | null = null;

  try {
    progress = filterProgressForReleasedMaterials(await getProgress(token), materials);
  } catch (error) {
    if (error instanceof ApiClientError && error.status === 401) {
      throw error;
    }
  }

  return { materials, progress };
}

export function useMaterialsData() {
  return useStudentData({
    loadData: loadMaterialsData,
    fallbackErrorMessage: "Não foi possível carregar os materiais.",
    isEmpty: (data) => (data?.materials.length ?? 0) === 0,
  });
}
