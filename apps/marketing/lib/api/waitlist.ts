type WaitlistPayload = {
  name: string;
  email: string;
};

type WaitlistSuccessResponse = {
  success: true;
  data: {
    message: string;
    email: string;
  };
};

type WaitlistErrorResponse = {
  success: false;
  error?: {
    code?: string;
    message?: string;
    fields?: Record<string, string[]>;
  };
};

type WaitlistResult =
  | { ok: true; message: string }
  | {
      ok: false;
      kind: "duplicate" | "validation" | "connection" | "generic";
      message?: string;
    };

function isDuplicateEmailError(response: WaitlistErrorResponse): boolean {
  const fieldMessage = response.error?.fields?.email?.[0]?.toLowerCase() ?? "";
  const message = response.error?.message?.toLowerCase() ?? "";

  return [
    fieldMessage,
    message,
    response.error?.code?.toLowerCase() ?? "",
  ].some((value) => {
    return (
      value.includes("já está cadastrado") ||
      value.includes("already been taken") ||
      value.includes("duplicate") ||
      value.includes("duplicate key") ||
      value.includes("unique constraint") ||
      value.includes("23505")
    );
  });
}

async function parseErrorResponse(response: Response): Promise<WaitlistErrorResponse> {
  const raw = await response.text();

  if (!raw) {
    return {
      success: false,
      error: {
        message: "Resposta vazia do servidor.",
      },
    };
  }

  try {
    return JSON.parse(raw) as WaitlistErrorResponse;
  } catch {
    return {
      success: false,
      error: {
        message: "Resposta inválida do servidor.",
      },
    };
  }
}

export async function submitWaitlist(
  payload: WaitlistPayload,
): Promise<WaitlistResult> {
  try {
    const response = await fetch("/api/waitlist", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (response.ok) {
      const data = (await response.json()) as WaitlistSuccessResponse;
      return {
        ok: true,
        message: data.data.message,
      };
    }

    const errorData = await parseErrorResponse(response);

    if (isDuplicateEmailError(errorData)) {
      return {
        ok: false,
        kind: "duplicate",
        message: "Esse e-mail já está na lista. Você será avisado no lançamento.",
      };
    }

    if (response.status === 422) {
      return {
        ok: false,
        kind: "validation",
        message: errorData.error?.message,
      };
    }

    if (response.status >= 500) {
      return {
        ok: false,
        kind: "connection",
        message:
          "Estamos com instabilidade para confirmar seu cadastro agora. Tente novamente em instantes.",
      };
    }

    return {
      ok: false,
      kind: "generic",
      message: errorData.error?.message,
    };
  } catch {
    return {
      ok: false,
      kind: "connection",
      message: "Não foi possível conectar ao servidor no momento.",
    };
  }
}
