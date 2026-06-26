import type { Material, MaterialType } from "@/types/student";

export type AdminMaterialPayload = {
  title: string;
  description?: string | null;
  type: MaterialType;
  url: string;
  order?: number | null;
  is_active?: boolean;
  released_at?: string | null;
  attachment_ids?: string[];
};

export type AdminUploadType = "pdf" | "attachment" | "other";

export type AdminUpload = {
  id: string;
  original_name: string;
  filename: string;
  path: string;
  url: string;
  type: AdminUploadType;
  mime_type: string;
  size: number;
  created_at?: string;
  updated_at?: string;
};

export type AdminMaterial = Material;
