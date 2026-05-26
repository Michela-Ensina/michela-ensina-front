import { Resend } from "resend";

let resendClient: Resend | null = null;

export function getResendClient(): Resend | null {
  const apiKey = process.env.RESEND_API_KEY?.trim();

  if (!apiKey) {
    return null;
  }

  if (!resendClient) {
    try {
      resendClient = new Resend(apiKey);
    } catch (error) {
      const message = error instanceof Error ? error.message : "unknown_error";

      console.error("[waitlist-confirmation-email] invalid resend client", {
        message,
      });

      return null;
    }
  }

  return resendClient;
}

export function isWaitlistConfirmationEmailEnabled(): boolean {
  const flag = process.env.WAITLIST_CONFIRMATION_EMAIL_ENABLED?.trim();

  if (!flag) {
    return true;
  }

  return flag.toLowerCase() === "true";
}

export function getWaitlistFromEmail(): string {
  return (
    process.env.WAITLIST_FROM_EMAIL?.trim() ||
    "Michela Ensina <contato@michelaensina.com.br>"
  );
}
