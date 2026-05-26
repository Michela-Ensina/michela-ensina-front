import type { ApiErrorPayload } from "@/lib/api/types";

export class ApiClientError extends Error {
  public readonly status: number;
  public readonly code?: string;
  public readonly fields?: Record<string, string[]>;
  public readonly payload?: unknown;

  constructor(params: {
    message: string;
    status: number;
    code?: string;
    fields?: Record<string, string[]>;
    payload?: unknown;
  }) {
    super(params.message);
    this.name = "ApiClientError";
    this.status = params.status;
    this.code = params.code;
    this.fields = params.fields;
    this.payload = params.payload;
  }
}

export function getApiErrorMessage(status: number, error?: ApiErrorPayload): string {
  if (error?.message) {
    return error.message;
  }

  if (status === 401) {
    return "Não autenticado.";
  }

  if (status === 403) {
    return "Acesso negado.";
  }

  if (status === 404) {
    return "Recurso não encontrado.";
  }

  if (status === 422) {
    return "Dados inválidos.";
  }

  if (status >= 500) {
    return "Erro interno no servidor.";
  }

  return "Falha ao processar requisição.";
}
