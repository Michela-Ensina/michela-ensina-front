import { isValidEmail } from "@/lib/utils/validation";

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

  if (password.length < 8) {
    return minLengthMessage;
  }

  if (password !== passwordConfirmation) {
    return "As senhas não coincidem.";
  }

  return null;
}
