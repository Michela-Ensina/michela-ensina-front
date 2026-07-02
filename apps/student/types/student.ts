export type StudentAppStatus = "preparing" | "ready";

export type User = {
  id: string;
  name: string;
  email: string;
  is_active: boolean;
  must_change_password: boolean;
  roles: string[];
  created_at: string | null;
};

export type MaterialType = "pdf" | "video" | "attachment" | "other";

export type Material = {
  id: string;
  title: string;
  description: string | null;
  type: MaterialType;
  url: string;
  order: number;
  is_active: boolean;
  released_at: string | null;
  attachments?: MaterialAttachment[];
  created_at: string | null;
};

export type MaterialAttachment = {
  id: string;
  original_name: string;
  url: string;
  type: "pdf" | "attachment" | "other";
  mime_type?: string;
  size?: number;
  downloadable?: boolean;
  order?: number;
};

export type ProgressItem = {
  id: string;
  material_id: string;
  material?: Material;
  viewed: boolean;
  viewed_at: string | null;
};

export type ProgressSummary = {
  total_materials: number;
  viewed_count: number;
  percentage: number;
  items: ProgressItem[];
};
