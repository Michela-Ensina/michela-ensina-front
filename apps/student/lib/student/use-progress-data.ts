import { getProgress } from "@/lib/api/progress";
import { studentDataKeys } from "@/lib/student/student-data-cache";
import { useStudentData } from "@/lib/student/use-student-data";

export function useProgressData() {
  return useStudentData({
    getCacheKey: (token) => studentDataKeys.progress(token),
    loadData: getProgress,
    fallbackErrorMessage: "Não foi possível carregar o progresso.",
    isEmpty: (data) => (data?.total_materials ?? 0) === 0,
  });
}
