import { NextResponse } from "next/server";

import { sendWaitlistConfirmationEmail } from "@/lib/email/waitlist-confirmation";

type WaitlistBody = {
  name?: string;
  email?: string;
};

const DEFAULT_BACKEND_API_URL = "http://127.0.0.1:8000/api";
const BACKEND_TIMEOUT_MS = 12000;

function createRequestId(): string {
  try {
    const maybeCrypto = globalThis.crypto;

    if (maybeCrypto && "randomUUID" in maybeCrypto) {
      return maybeCrypto.randomUUID();
    }
  } catch {
    // no-op
  }

  return `waitlist-${Date.now()}`;
}

function normalizeBaseUrl(baseUrl: string): string {
  return baseUrl.endsWith("/") ? baseUrl.slice(0, -1) : baseUrl;
}

function getBackendApiBaseUrl(): string {
  const envUrl = process.env.API_URL?.trim();

  if (!envUrl) {
    return DEFAULT_BACKEND_API_URL;
  }

  return normalizeBaseUrl(envUrl);
}

function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function buildValidationErrorResponse(message: string, fields?: string[]) {
  return NextResponse.json(
    {
      success: false,
      error: {
        message,
        fields: fields ? { email: fields } : undefined,
      },
    },
    { status: 422 },
  );
}

function hasDuplicateSignal(value: string): boolean {
  const normalized = value.toLowerCase();

  return (
    normalized.includes("já está cadastrado") ||
    normalized.includes("cadastrado na lista de espera") ||
    normalized.includes("already been taken") ||
    normalized.includes("duplicate key") ||
    normalized.includes("unique constraint") ||
    normalized.includes("23505") ||
    normalized.includes("waitlist_email_unique")
  );
}

export async function POST(request: Request) {
  const requestId = createRequestId();

  try {
    let body: WaitlistBody;

    try {
      body = (await request.json()) as WaitlistBody;
    } catch {
      return NextResponse.json(
        {
          success: false,
          error: {
            message: "Payload inválido.",
          },
        },
        { status: 400 },
      );
    }

    const payload = {
      name: String(body.name ?? "").trim(),
      email: String(body.email ?? "").trim(),
    };

    if (!payload.name) {
      return NextResponse.json(
        {
          success: false,
          error: {
            message: "O nome é obrigatório.",
            fields: {
              name: ["O nome é obrigatório."],
            },
          },
        },
        { status: 422 },
      );
    }

    if (!payload.email) {
      return buildValidationErrorResponse("O e-mail é obrigatório.", [
        "O e-mail é obrigatório.",
      ]);
    }

    if (!isValidEmail(payload.email)) {
      return buildValidationErrorResponse("Informe um e-mail válido.", [
        "Informe um e-mail válido.",
      ]);
    }

    let response: Response;

    try {
      response = await fetch(`${getBackendApiBaseUrl()}/waitlist`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
        cache: "no-store",
        signal: AbortSignal.timeout(BACKEND_TIMEOUT_MS),
      });
    } catch (error) {
      const message = error instanceof Error ? error.message : "unknown_error";

      console.error("[waitlist-bff] backend_unreachable", {
        requestId,
        message,
        apiUrl: getBackendApiBaseUrl(),
      });

      return NextResponse.json(
        {
          success: false,
          error: {
            message:
              "Não foi possível conectar ao servidor no momento. Tente novamente em instantes.",
            code: "BACKEND_UNREACHABLE",
          },
        },
        { status: 503 },
      );
    }

    const responseText = await response.text();
    let data: unknown = {};

    if (responseText) {
      try {
        data = JSON.parse(responseText) as unknown;
      } catch {
        console.error("[waitlist-bff] invalid_backend_json", {
          requestId,
          status: response.status,
        });

        return NextResponse.json(
          {
            success: false,
            error: {
              message:
                "Recebemos uma resposta inválida do servidor. Tente novamente.",
              code: "BACKEND_INVALID_RESPONSE",
            },
          },
          { status: 502 },
        );
      }
    }

    if (!response.ok) {
      const payloadError =
        typeof data === "object" && data !== null && "error" in data
          ? (
              data as {
                error?: { message?: string; code?: string; debug?: string };
              }
            ).error
          : undefined;

      const duplicateDetected =
        hasDuplicateSignal(responseText) ||
        hasDuplicateSignal(payloadError?.message ?? "") ||
        hasDuplicateSignal(payloadError?.code ?? "") ||
        hasDuplicateSignal(payloadError?.debug ?? "");

      if (duplicateDetected) {
        return NextResponse.json(
          {
            success: false,
            error: {
              message: "Este e-mail já está cadastrado na lista de espera.",
              fields: {
                email: ["Este e-mail já está cadastrado na lista de espera."],
              },
            },
          },
          { status: 422 },
        );
      }
    }

    if (response.ok) {
      const emailResult = await sendWaitlistConfirmationEmail(payload);

      if (!emailResult.ok) {
        console.error("[waitlist-confirmation-email] skipped or failed", {
          reason: emailResult.reason,
        });
      }
    }

    return NextResponse.json(data, {
      status: response.status,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "unknown_error";

    console.error("[waitlist-bff] unexpected error", {
      requestId,
      message,
      apiUrl: getBackendApiBaseUrl(),
    });

    return NextResponse.json(
      {
        success: false,
        error: {
          message:
            "Não foi possível processar sua solicitação agora. Tente novamente em instantes.",
          code: "WAITLIST_BFF_UNEXPECTED",
        },
      },
      { status: 503 },
    );
  }
}
