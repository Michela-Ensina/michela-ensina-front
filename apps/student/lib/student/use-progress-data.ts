import { getProgress } from "@/lib/api/progress";
import { useStudentData } from "@/lib/student/use-student-data";

export function useProgressData() {
  return useStudentData({
    loadData: getProgress,
    fallbackErrorMessage: "Não foi possível carregar o progresso.",
    isEmpty: (data) => (data?.total_materials ?? 0) === 0,
  });
}
