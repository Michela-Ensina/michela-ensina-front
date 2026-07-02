import { apiGet } from "@/lib/api/client";
import type { AdminProduct } from "@/types/admin";

export function getAdminProducts(token: string) {
  return apiGet<AdminProduct[]>("/admin/products", { token });
}
