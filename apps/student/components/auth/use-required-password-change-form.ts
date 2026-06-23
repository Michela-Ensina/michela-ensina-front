import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { ApiClientError } from "@/lib/api/errors";
import type { AuthChangePasswordPayload } from "@/types/auth";

type PasswordField = "current" | "next" | "confirm";
type ChangePassword = (payload: AuthChangePasswordPayload) => Promise<unknown>;

const hiddenPasswordFields: Record<PasswordField, boolean> = {
  current: false,
  next: false,
  confirm: false,
};

export function useRequiredPasswordChangeForm(changePassword: ChangePassword) {
  const router = useRouter();
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [visibleFields, setVisibleFields] = useState(hiddenPasswordFields);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  function toggleVisibility(field: PasswordField) {
    setVisibleFields((current) => ({ ...current, [field]: !current[field] }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setErrorMessage(null);

    if (!currentPassword || !newPassword || !passwordConfirmation) {
      setErrorMessage("Preencha todos os campos de senha.");
      return;
    }

    if (newPassword.length < 8) {
      setErrorMessage("A nova senha deve ter pelo menos 8 caracteres.");
      return;
    }

    if (newPassword === currentPassword) {
      setErrorMessage("A nova senha deve ser diferente da senha atual.");
      return;
    }

    if (newPassword !== passwordConfirmation) {
      setErrorMessage("As senhas não coincidem.");
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
      if (error instanceof ApiClientError) {
        const fieldMessage = error.fields?.current_password?.[0] ?? error.fields?.password?.[0];
        setErrorMessage(fieldMessage ?? error.message);
      } else {
        setErrorMessage("Não foi possível atualizar sua senha. Tente novamente.");
      }
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
