import { useState, type FormEvent } from "react";
import { toast } from "sonner";

import {
  createHiddenPasswordFields,
  getPasswordChangeApiErrorMessage,
  getPasswordChangeValidationError,
  type ChangePassword,
  type PasswordVisibilityField,
} from "@/lib/auth/password-change";

export function useSettingsPasswordDialog(changePassword: ChangePassword) {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [passwordSuccess, setPasswordSuccess] = useState<string | null>(null);
  const [isPasswordDialogOpen, setIsPasswordDialogOpen] = useState(false);
  const [visiblePasswordFields, setVisiblePasswordFields] = useState(createHiddenPasswordFields);

  function openPasswordDialog() {
    setPasswordError(null);
    setPasswordSuccess(null);
    setVisiblePasswordFields(createHiddenPasswordFields());
    setIsPasswordDialogOpen(true);
  }

  function closePasswordDialog() {
    setVisiblePasswordFields(createHiddenPasswordFields());
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

    const validationError = getPasswordChangeValidationError({
      currentPassword,
      newPassword,
      passwordConfirmation: confirmPassword,
      minimumLengthMessage: "A senha deve ter pelo menos 8 caracteres.",
    });

    if (validationError) {
      setPasswordError(validationError);
      toast.error(validationError);
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
      const message = getPasswordChangeApiErrorMessage(error, "Não foi possível atualizar a senha agora.");
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
