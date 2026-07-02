import { ApiClientError } from "@/lib/api/errors";
import { getMaterials } from "@/lib/api/materials";
import { getProgress } from "@/lib/api/progress";
import {
  filterProgressForReleasedMaterials,
  filterReleasedMaterials,
} from "@/lib/student/material-availability";
import { createEmptyProgressSummary } from "@/lib/student/progress-summary";
import { studentDataKeys } from "@/lib/student/student-data-cache";
import { useStudentData } from "@/lib/student/use-student-data";
import type { Material, ProgressSummary, User } from "@/types/student";

type DashboardData = {
  student: User;
  progress: ProgressSummary;
  materials: Material[];
};

async function loadDashboardData(token: string, user: User | null): Promise<DashboardData> {
  if (!user) {
    throw new Error("Sua sessão não está disponível.");
  }

  const materials = filterReleasedMaterials(await getMaterials(token));
  let progress: ProgressSummary;

  try {
    progress =
      filterProgressForReleasedMaterials(await getProgress(token), materials) ??
      createEmptyProgressSummary(materials.length);
  } catch (error) {
    if (error instanceof ApiClientError && error.status === 401) {
      throw error;
    }

    progress = createEmptyProgressSummary(materials.length);
  }

  return { student: user, materials, progress };
}

export function useDashboardData() {
  return useStudentData({
    getCacheKey: (token, user) => studentDataKeys.dashboard(token, user?.id ?? "anonymous"),
    loadData: loadDashboardData,
    fallbackErrorMessage: "Não foi possível carregar o dashboard.",
    isEmpty: (data) => (data?.materials.length ?? 0) === 0,
    requiresUser: true,
  });
}
