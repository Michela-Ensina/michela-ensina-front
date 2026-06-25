import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { resetPassword } from "@/lib/api/auth";
import { ApiClientError } from "@/lib/api/errors";

import {
  validatePasswordPair,
  validateRequiredEmail,
  validateRequiredToken,
} from "./password-recovery-validation";

export function useResetPasswordForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [token, setToken] = useState(() => {
    if (typeof window === "undefined") return "";
    const params = new URLSearchParams(window.location.search);
    return params.get("token") ?? "";
  });
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);

    const validationMessage =
      validateRequiredEmail(email) ??
      validateRequiredToken(token) ??
      validatePasswordPair({
        password,
        passwordConfirmation,
        minLengthMessage: "A nova senha deve ter pelo menos 8 caracteres.",
      });

    if (validationMessage) {
      setErrorMessage(validationMessage);
      toast.error(validationMessage);
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await resetPassword({
        email: email.trim(),
        token: token.trim(),
        password,
        password_confirmation: passwordConfirmation,
      });
      setSuccessMessage(response.message);
      toast.success(response.message);
      router.replace("/login?motivo=senha-redefinida");
    } catch (error) {
      const message =
        error instanceof ApiClientError
          ? error.fields?.token?.[0] ?? error.fields?.password?.[0] ?? error.message
          : "Não foi possível redefinir a senha agora.";
      setErrorMessage(message);
      toast.error(message);
    } finally {
      setIsSubmitting(false);
    }
  }

  return {
    email,
    errorMessage,
    handleSubmit,
    isSubmitting,
    password,
    passwordConfirmation,
    setEmail,
    setPassword,
    setPasswordConfirmation,
    setToken,
    successMessage,
    token,
  };
}
