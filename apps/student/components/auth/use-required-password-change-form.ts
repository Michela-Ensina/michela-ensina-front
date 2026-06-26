import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import {
  createHiddenPasswordFields,
  getPasswordChangeApiErrorMessage,
  getPasswordChangeValidationError,
  type ChangePassword,
  type PasswordVisibilityField,
} from "@/lib/auth/password-change";

export function useRequiredPasswordChangeForm(changePassword: ChangePassword) {
  const router = useRouter();
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [visibleFields, setVisibleFields] = useState(createHiddenPasswordFields);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  function toggleVisibility(field: PasswordVisibilityField) {
    setVisibleFields((current) => ({ ...current, [field]: !current[field] }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setErrorMessage(null);

    const validationError = getPasswordChangeValidationError({
      currentPassword,
      newPassword,
      passwordConfirmation,
      minimumLengthMessage: "A nova senha deve ter pelo menos 8 caracteres.",
    });

    if (validationError) {
      setErrorMessage(validationError);
      return;
    }

    setIsSubmitting(true);

    try {
      await changePassword({
        current_password: currentPassword,
        password: newPassword,
        password_confirmation: passwordConfirmation,
      });
      toast.success("Senha atualizada com sucesso.");
      router.replace("/dashboard");
    } catch (error) {
      setErrorMessage(
        getPasswordChangeApiErrorMessage(error, "Não foi possível atualizar sua senha. Tente novamente."),
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return {
    currentPassword,
    newPassword,
    passwordConfirmation,
    visibleFields,
    isSubmitting,
    errorMessage,
    handleSubmit,
    setCurrentPassword,
    setNewPassword,
    setPasswordConfirmation,
    toggleVisibility,
  };
}
