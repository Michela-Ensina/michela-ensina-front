import { getMaterials } from "@/lib/api/materials";
import { getProgress } from "@/lib/api/progress";
import { ApiClientError } from "@/lib/api/errors";
import { createEmptyProgressSummary } from "@/lib/student/progress-summary";
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

  const materials = await getMaterials(token);
  let progress: ProgressSummary;

  try {
    progress = await getProgress(token);
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
    loadData: loadDashboardData,
    fallbackErrorMessage: "Não foi possível carregar o dashboard.",
    isEmpty: (data) => (data?.materials.length ?? 0) === 0,
    requiresUser: true,
  });
}
