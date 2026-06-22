import type {
  AuthFirstAccessPayload,
  AuthForgotPasswordPayload,
  AuthLoginPayload,
  AuthResetPasswordPayload,
  MessageResponse,
} from "@/types/auth";
import type { Material, ProgressItem, ProgressSummary, User } from "@/types/student";

export const PRE_INTEGRATION_PREVIEW_ENABLED =
  process.env.NEXT_PUBLIC_STUDENT_PREVIEW_ENABLED === "true";
export const PRE_INTEGRATION_PREVIEW_TOKEN = "student-preview-session-token";

const previewStudent: User = {
  id: "preview-student-michela",
  name: "Ana Clara Martins",
  email: "ana.clara@modo-fluente.local",
  is_active: true,
  must_change_password: true,
  roles: ["student"],
  created_at: "2026-05-18T10:00:00.000Z",
};

const previewMaterials: Material[] = [
  {
    id: "boas-vindas-modo-fluente",
    title: "Boas-vindas ao Modo Fluente",
    description: "Uma visão rápida de como organizar seus estudos e usar os materiais com intenção.",
    type: "video",
    url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    order: 1,
    is_active: true,
    created_at: "2026-05-20T09:00:00.000Z",
  },
  {
    id: "guia-primeira-semana",
    title: "Guia da primeira semana",
    description: "PDF de apoio com rotina sugerida, revisão e primeiros combinados de estudo.",
    type: "pdf",
    url: "https://example.com/michela-ensina/guia-primeira-semana.pdf",
    order: 2,
    is_active: true,
    created_at: "2026-05-21T09:00:00.000Z",
  },
  {
    id: "pronuncia-aquecimento",
    title: "Aquecimento de pronúncia",
    description: "Áudio e anotações para repetir antes das aulas e ganhar clareza na fala.",
    type: "attachment",
    url: "https://example.com/michela-ensina/aquecimento-pronuncia.zip",
    order: 3,
    is_active: true,
    created_at: "2026-05-22T09:00:00.000Z",
  },
  {
    id: "checklist-conversacao",
    title: "Checklist de conversação",
    description: "Link de referência para preparar temas, perguntas e vocabulário da próxima prática.",
    type: "other",
    url: "https://example.com/michela-ensina/checklist-conversacao",
    order: 4,
    is_active: true,
    created_at: "2026-05-23T09:00:00.000Z",
  },
];

const previewProgressItems: ProgressItem[] = [
  {
    id: "progress-boas-vindas",
    material_id: "boas-vindas-modo-fluente",
    material: previewMaterials[0],
    viewed: true,
    viewed_at: "2026-06-03T18:30:00.000Z",
  },
  {
    id: "progress-guia-primeira-semana",
    material_id: "guia-primeira-semana",
    material: previewMaterials[1],
    viewed: false,
    viewed_at: null,
  },
  {
    id: "progress-pronuncia-aquecimento",
    material_id: "pronuncia-aquecimento",
    material: previewMaterials[2],
    viewed: false,
    viewed_at: null,
  },
];

function buildProgressSummary(items = previewProgressItems): ProgressSummary {
  const viewedCount = items.filter((item) => item.viewed).length;

  return {
    total_materials: previewMaterials.length,
    viewed_count: viewedCount,
    percentage: Math.round((viewedCount / previewMaterials.length) * 100),
    items,
  };
}

export type PreviewDashboardData = {
  student: User;
  progress: ProgressSummary;
  materials: Material[];
};

export type PreviewMaterialsData = {
  materials: Material[];
  progress: ProgressSummary;
};

export function getPreviewStudent(): User {
  return { ...previewStudent };
}

export function getPreviewMaterials(): Material[] {
  return previewMaterials.map((material) => ({ ...material }));
}

export function getPreviewMaterialById(materialId: string): Material | null {
  const material = previewMaterials.find((item) => item.id === materialId);
  return material ? { ...material } : null;
}

export function getPreviewProgress(): ProgressSummary {
  return buildProgressSummary(previewProgressItems.map((item) => ({ ...item })));
}

export function getPreviewDashboardData(): PreviewDashboardData {
  return {
    student: getPreviewStudent(),
    progress: getPreviewProgress(),
    materials: getPreviewMaterials(),
  };
}

export function getPreviewMaterialsData(): PreviewMaterialsData {
  return {
    materials: getPreviewMaterials(),
    progress: getPreviewProgress(),
  };
}

export function createPreviewLoginSession(_payload?: AuthLoginPayload) {
  void _payload;

  return {
    token: PRE_INTEGRATION_PREVIEW_TOKEN,
    user: getPreviewStudent(),
    mustChangePassword: previewStudent.must_change_password,
  };
}

export function markPreviewMaterialCompleted(materialId: string): ProgressItem {
  const material = getPreviewMaterialById(materialId);

  return {
    id: `progress-${materialId}`,
    material_id: materialId,
    material: material ?? undefined,
    viewed: true,
    viewed_at: new Date().toISOString(),
  };
}

export async function requestPreviewPasswordReset(_payload: AuthForgotPasswordPayload): Promise<MessageResponse> {
  void _payload;

  return {
    message: "Se este e-mail estiver cadastrado, você receberá as instruções em breve.",
  };
}

export async function resetPreviewPassword(_payload: AuthResetPasswordPayload): Promise<MessageResponse> {
  void _payload;

  return {
    message: "Senha redefinida com sucesso. Você já pode entrar.",
  };
}

export async function completePreviewFirstAccess(_payload: AuthFirstAccessPayload): Promise<MessageResponse> {
  void _payload;

  return {
    message: "Primeiro acesso concluído. Você já pode entrar.",
  };
}
