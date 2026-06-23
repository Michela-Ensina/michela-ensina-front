import { useState, type FormEvent } from "react";
import { toast } from "sonner";

import {
  hiddenPasswordFields,
  type PasswordVisibilityField,
} from "@/components/student/settings/SettingsPasswordDialog";
import { ApiClientError } from "@/lib/api/errors";

type ChangePassword = (payload: {
  current_password: string;
  password: string;
  password_confirmation: string;
}) => Promise<unknown>;

export function useSettingsPasswordDialog(changePassword: ChangePassword) {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [passwordSuccess, setPasswordSuccess] = useState<string | null>(null);
  const [isPasswordDialogOpen, setIsPasswordDialogOpen] = useState(false);
  const [visiblePasswordFields, setVisiblePasswordFields] = useState(hiddenPasswordFields);

  function openPasswordDialog() {
    setPasswordError(null);
    setPasswordSuccess(null);
    setVisiblePasswordFields(hiddenPasswordFields);
    setIsPasswordDialogOpen(true);
  }

  function closePasswordDialog() {
    setVisiblePasswordFields(hiddenPasswordFields);
    setIsPasswordDialogOpen(false);
  }

  function togglePasswordVisibility(field: PasswordVisibilityField) {
    setVisiblePasswordFields((current) => ({
      ...current,
      [field]: !current[field],
    }));
  }

  async function handleChangePassword(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setPasswordError(null);
    setPasswordSuccess(null);

    if (!currentPassword || !newPassword || !confirmPassword) {
      const message = "Preencha todos os campos de senha.";
      setPasswordError(message);
      toast.error(message);
      return;
    }

    if (newPassword.length < 8) {
      const message = "A senha deve ter pelo menos 8 caracteres.";
      setPasswordError(message);
      toast.error(message);
      return;
    }

    if (newPassword === currentPassword) {
      const message = "A nova senha deve ser diferente da senha atual.";
      setPasswordError(message);
      toast.error(message);
      return;
    }

    if (newPassword !== confirmPassword) {
      const message = "As senhas não coincidem.";
      setPasswordError(message);
      toast.error(message);
      return;
    }

    setIsChangingPassword(true);

    try {
      await changePassword({
        current_password: currentPassword,
        password: newPassword,
        password_confirmation: confirmPassword,
      });
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      const message = "Senha atualizada com sucesso.";
      setPasswordSuccess(message);
      toast.success(message);
      closePasswordDialog();
    } catch (error) {
      const message =
        error instanceof ApiClientError
          ? error.fields?.current_password?.[0] ?? error.fields?.password?.[0] ?? error.message
          : "Não foi possível atualizar a senha agora.";
      setPasswordError(message);
      toast.error(message);
    } finally {
      setIsChangingPassword(false);
    }
  }

  return {
    currentPassword,
    newPassword,
    confirmPassword,
    isChangingPassword,
    passwordError,
    passwordSuccess,
    isPasswordDialogOpen,
    visiblePasswordFields,
    openPasswordDialog,
    closePasswordDialog,
    handleChangePassword,
    setCurrentPassword,
    setNewPassword,
    setConfirmPassword,
    togglePasswordVisibility,
  };
}
