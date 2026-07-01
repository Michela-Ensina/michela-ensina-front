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

export const STRONG_PASSWORD_DESCRIPTION =
  "Use pelo menos 8 caracteres, com letra maiúscula, letra minúscula, número e símbolo.";

export function createHiddenPasswordFields(): Record<PasswordVisibilityField, boolean> {
  return { current: false, next: false, confirm: false };
}

export function getStrongPasswordValidationError(password: string): string | null {
  if (password.length < 8) {
    return "A senha deve ter pelo menos 8 caracteres.";
  }

  if (!/[A-Z]/.test(password)) {
    return "A senha deve ter pelo menos uma letra maiúscula.";
  }

  if (!/[a-z]/.test(password)) {
    return "A senha deve ter pelo menos uma letra minúscula.";
  }

  if (!/[0-9]/.test(password)) {
    return "A senha deve ter pelo menos um número.";
  }

  if (!/[^A-Za-z0-9]/.test(password)) {
    return "A senha deve ter pelo menos um símbolo.";
  }

  return null;
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

  const strongPasswordError = getStrongPasswordValidationError(newPassword);
  if (strongPasswordError) {
    return strongPasswordError === "A senha deve ter pelo menos 8 caracteres."
      ? minimumLengthMessage
      : strongPasswordError;
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
