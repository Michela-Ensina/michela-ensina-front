import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { forgotPassword } from "@/lib/api/auth";
import { ApiClientError } from "@/lib/api/errors";

import { validateRequiredEmail } from "./password-recovery-validation";

export function useForgotPasswordForm() {
  const router = useRouter();
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

  function openResetPasswordForm() {
    const params = new URLSearchParams();
    const trimmedEmail = email.trim();

    if (trimmedEmail) {
      params.set("email", trimmedEmail);
    }

    router.push(`/redefinir-senha${params.size ? `?${params.toString()}` : ""}`);
  }

  return {
    email,
    errorMessage,
    handleSubmit,
    isSubmitting,
    openResetPasswordForm,
    setEmail,
    successMessage,
  };
}
