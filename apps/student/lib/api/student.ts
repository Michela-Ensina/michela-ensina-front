import { apiGet } from "@/lib/api/client";
import type { User } from "@/types/student";

export function getCurrentStudent(token: string) {
  return apiGet<User>("/student/me", { token });
}
