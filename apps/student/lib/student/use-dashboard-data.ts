import { getMaterials } from "@/lib/api/materials";
import { getProgress } from "@/lib/api/progress";
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

  const [materials, progress] = await Promise.all([getMaterials(token), getProgress(token)]);

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
