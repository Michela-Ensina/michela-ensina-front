import { useState, type FormEvent } from "react";
import { toast } from "sonner";

import { forgotPassword } from "@/lib/api/auth";
import { ApiClientError } from "@/lib/api/errors";

import { validateRequiredEmail } from "./password-recovery-validation";

export function useForgotPasswordForm() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);

    const validationMessage = validateRequiredEmail(email);
    if (validationMessage) {
      setErrorMessage(validationMessage);
      toast.error(validationMessage);
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await forgotPassword({ email: email.trim() });
      setSuccessMessage(response.message);
      toast.success(response.message);
    } catch (error) {
      const message =
        error instanceof ApiClientError
          ? error.message
          : "Não foi possível enviar as instruções agora.";
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
    setEmail,
    successMessage,
  };
}
