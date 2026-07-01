import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { firstAccess } from "@/lib/api/auth";
import { ApiClientError } from "@/lib/api/errors";

import {
  validatePasswordPair,
  validateRequiredToken,
} from "./password-recovery-validation";

type FirstAccessPasswordField = "password" | "passwordConfirmation";

export function useFirstAccessForm(initialToken = "") {
  const router = useRouter();
  const tokenFromUrl = initialToken.trim();
  const [token, setToken] = useState(tokenFromUrl);
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [visiblePasswordFields, setVisiblePasswordFields] = useState<
    Record<FirstAccessPasswordField, boolean>
  >({
    password: false,
    passwordConfirmation: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  function togglePasswordVisibility(field: FirstAccessPasswordField) {
    setVisiblePasswordFields((current) => ({
      ...current,
      [field]: !current[field],
    }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);

    const validationMessage =
      validateRequiredToken(token) ??
      validatePasswordPair({ password, passwordConfirmation });

    if (validationMessage) {
      setErrorMessage(validationMessage);
      toast.error(validationMessage);
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await firstAccess({
        token: token.trim(),
        password,
        password_confirmation: passwordConfirmation,
      });
      setSuccessMessage(response.message);
      toast.success(response.message);
      router.replace("/login?motivo=primeiro-acesso");
    } catch (error) {
      const message =
        error instanceof ApiClientError
          ? error.fields?.token?.[0] ?? error.fields?.password?.[0] ?? error.message
          : "Não foi possível concluir o primeiro acesso agora.";
      setErrorMessage(message);
      toast.error(message);
    } finally {
      setIsSubmitting(false);
    }
  }

  return {
    errorMessage,
    handleSubmit,
    isSubmitting,
    isTokenLocked: Boolean(tokenFromUrl),
    password,
    passwordConfirmation,
    setPassword,
    setPasswordConfirmation,
    setToken,
    successMessage,
    token,
    togglePasswordVisibility,
    visiblePasswordFields,
  };
}
