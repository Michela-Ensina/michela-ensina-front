import {
  getResendClient,
  getWaitlistFromEmail,
  isWaitlistConfirmationEmailEnabled,
} from "@/lib/email/resend";

type WaitlistConfirmationEmailInput = {
  name: string;
  email: string;
};

type SendWaitlistConfirmationEmailResult =
  | { ok: true }
  | { ok: false; reason: "disabled" | "missing_config" | "provider_error" };

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function buildEmailHtml(name: string): string {
  const safeName = escapeHtml(name);

  return `
  <div style="margin:0;padding:24px;background-color:#E4CEF4;font-family:Mulish,Arial,Helvetica,sans-serif;color:#233695;">
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:600px;margin:0 auto;background:#FFFEFA;border-radius:16px;border:1px solid #DBB5EE;overflow:hidden;">
      <tr>
        <td style="padding:14px 24px;background:#4D2375;">
          <p style="margin:0;font-size:13px;font-weight:700;letter-spacing:.03em;text-transform:uppercase;color:#FFFEFA;">Michela Ensina</p>
        </td>
      </tr>
      <tr>
        <td style="padding:26px 24px 8px 24px;">
          <p style="margin:0 0 12px 0;font-size:15px;color:#4D2375;">Oi, ${safeName}!</p>
          <h1 style="margin:0 0 14px 0;font-family:'Cherry Swash',Georgia,serif;font-size:30px;line-height:1.2;color:#4D2375;">Você está na lista!</h1>
          <p style="margin:0 0 14px 0;font-size:16px;line-height:1.65;color:#233695;">
            Seu cadastro na lista de pré-lançamento do Modo Fluente foi confirmado. Em breve, você receberá novidades sobre o lançamento e os próximos passos.
          </p>
          <p style="margin:0 0 20px 0;font-size:16px;line-height:1.65;color:#233695;">
            Enquanto isso, fique de olho no seu e-mail para não perder as próximas atualizações.
          </p>
          <p style="margin:0 0 4px 0;display:inline-block;padding:8px 12px;border-radius:999px;background:#4D2375;color:#FFFEFA;border:1px solid #4D2375;font-size:13px;font-weight:700;">
            Pré-lançamento Modo Fluente
          </p>
        </td>
      </tr>
      <tr>
        <td style="padding:12px 24px 26px 24px;">
          <p style="margin:0;font-size:15px;line-height:1.65;color:#233695;">Com carinho,<br /><strong>Michela Ensina</strong></p>
        </td>
      </tr>
    </table>
  </div>
  `;
}

function buildEmailText(name: string): string {
  return [
    `Oi, ${name}!`,
    "",
    "Você está na lista!",
    "",
    "Seu cadastro na lista de pré-lançamento do Modo Fluente foi confirmado. Em breve, você receberá novidades sobre o lançamento e os próximos passos.",
    "",
    "Enquanto isso, fique de olho no seu e-mail para não perder as próximas atualizações.",
    "",
    "Com carinho,",
    "Michela Ensina",
  ].join("\n");
}

export async function sendWaitlistConfirmationEmail(
  input: WaitlistConfirmationEmailInput,
): Promise<SendWaitlistConfirmationEmailResult> {
  if (!isWaitlistConfirmationEmailEnabled()) {
    return { ok: false, reason: "disabled" };
  }

  const resend = getResendClient();

  if (!resend) {
    return { ok: false, reason: "missing_config" };
  }

  const toEmail = input.email.trim().toLowerCase();

  let error: { name?: string; statusCode?: number | null; message?: string } | null =
    null;

  try {
    const result = await resend.emails.send({
      from: getWaitlistFromEmail(),
      to: [toEmail],
      subject: "Você entrou na lista do Modo Fluente",
      html: buildEmailHtml(input.name.trim()),
      text: buildEmailText(input.name.trim()),
    });

    error = result.error;
  } catch (caughtError) {
    const fallbackMessage =
      caughtError instanceof Error ? caughtError.message : "unknown_error";

    console.error("[waitlist-confirmation-email] unexpected send exception", {
      message: fallbackMessage,
    });

    return { ok: false, reason: "provider_error" };
  }

  if (error) {
    console.error("[waitlist-confirmation-email] send failed", {
      code: error.name,
      statusCode: error.statusCode,
      message: error.message,
    });

    return { ok: false, reason: "provider_error" };
  }

  return { ok: true };
}
