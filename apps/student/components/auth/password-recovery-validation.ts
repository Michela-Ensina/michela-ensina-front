import { isValidEmail } from "@/lib/utils/validation";
import { getStrongPasswordValidationError } from "@/lib/auth/password-change";
import { assessPasswordStrength } from "@/lib/auth/password-strength";

type PasswordPairValidation = {
  password: string;
  passwordConfirmation: string;
  minLengthMessage?: string;
};

export function validateRequiredEmail(email: string) {
  if (!email.trim()) {
    return "Informe seu e-mail.";
  }

  if (!isValidEmail(email.trim())) {
    return "Digite um e-mail válido.";
  }

  return null;
}

export function validateRequiredToken(token: string) {
  if (!token.trim()) {
    return "Código de acesso obrigatório.";
  }

  return null;
}

export function validatePasswordPair({
  password,
  passwordConfirmation,
  minLengthMessage = "A senha deve ter pelo menos 8 caracteres.",
}: PasswordPairValidation) {
  if (!password) {
    return "Informe a nova senha.";
  }

  if (!passwordConfirmation) {
    return "Confirme a nova senha.";
  }

  const strongPasswordError = getStrongPasswordValidationError(password);
  if (strongPasswordError) {
    return strongPasswordError === "A senha deve ter pelo menos 8 caracteres."
      ? minLengthMessage
      : strongPasswordError;
  }

  if (password !== passwordConfirmation) {
    return "As senhas não coincidem.";
  }

  return null;
}

type ResetPasswordValidation = {
  password: string;
  passwordConfirmation: string;
};

export function validateResetPasswordPair({
  password,
  passwordConfirmation,
}: ResetPasswordValidation) {
  if (!password) {
    return "Informe a nova senha.";
  }

  if (!passwordConfirmation) {
    return "Confirme a nova senha.";
  }

  const assessment = assessPasswordStrength(password);

  if (assessment.level === "weak") {
    return assessment.blockedReasons[0] ?? "Use uma senha mais segura.";
  }

  if (password !== passwordConfirmation) {
    return "As senhas não coincidem.";
  }

  return null;
}
