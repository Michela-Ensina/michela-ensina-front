import { ApiClientError } from "@/lib/api/errors";
import type { AuthChangePasswordPayload } from "@/types/auth";

export type PasswordVisibilityField = "current" | "next" | "confirm";

type PasswordChangeValues = {
  currentPassword: string;
  newPassword: string;
  passwordConfirmation: string;
};

type PasswordChangeValidationOptions = PasswordChangeValues & {
  minimumLengthMessage: string;
};

export type ChangePassword = (payload: AuthChangePasswordPayload) => Promise<unknown>;

export function createHiddenPasswordFields(): Record<PasswordVisibilityField, boolean> {
  return { current: false, next: false, confirm: false };
}

export function getPasswordChangeValidationError({
  currentPassword,
  newPassword,
  passwordConfirmation,
  minimumLengthMessage,
}: PasswordChangeValidationOptions): string | null {
  if (!currentPassword || !newPassword || !passwordConfirmation) {
    return "Preencha todos os campos de senha.";
  }

  if (newPassword.length < 8) {
    return minimumLengthMessage;
  }

  if (newPassword === currentPassword) {
    return "A nova senha deve ser diferente da senha atual.";
  }

  if (newPassword !== passwordConfirmation) {
    return "As senhas não coincidem.";
  }

  return null;
}

export function getPasswordChangeApiErrorMessage(error: unknown, fallbackMessage: string): string {
  if (!(error instanceof ApiClientError)) {
    return fallbackMessage;
  }

  return error.fields?.current_password?.[0] ?? error.fields?.password?.[0] ?? error.message;
}
