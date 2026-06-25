export type LoginMotivoTone = "info" | "success";

export type LoginMotivoFeedback = {
  message: string;
  tone: LoginMotivoTone;
};

const loginMotivoFeedback = {
  "sessao-expirada": {
    message: "Sua sessão expirou. Faça login novamente.",
    tone: "info",
  },
  "senha-redefinida": {
    message: "Senha redefinida com sucesso. Entre com sua nova senha.",
    tone: "success",
  },
  "primeiro-acesso": {
    message: "Senha configurada com sucesso. Faça login para continuar.",
    tone: "success",
  },
  "senha-atualizada": {
    message: "Senha atualizada com sucesso. Faça login novamente.",
    tone: "success",
  },
} satisfies Record<string, LoginMotivoFeedback>;

export function getLoginMotivoFeedback(motivo: string): LoginMotivoFeedback | null {
  if (motivo in loginMotivoFeedback) {
    return loginMotivoFeedback[motivo as keyof typeof loginMotivoFeedback];
  }

  return null;
}
