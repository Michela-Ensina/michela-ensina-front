"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { LogOut, Moon, ShieldCheck, UserRound } from "lucide-react";
import { toast } from "sonner";

import { SettingsAccountCard } from "@/components/student/settings/SettingsAccountCard";
import {
  hiddenPasswordFields,
  SettingsPasswordDialog,
  type PasswordVisibilityField,
} from "@/components/student/settings/SettingsPasswordDialog";
import { SectionHeader } from "@/components/student/SectionHeader";
import { Alert } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { SettingRow } from "@/components/ui/SettingRow";
import { ThemeToggleButton } from "@/components/ui/ThemeToggleButton";
import { ApiClientError } from "@/lib/api/errors";
import { useAuth } from "@/lib/auth/use-auth";
import { useTheme } from "@/lib/theme/use-theme";

export function SettingsContent() {
  const { changePassword, user, logout } = useAuth();
  const { theme, setTheme } = useTheme();
  const router = useRouter();

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [passwordSuccess, setPasswordSuccess] = useState<string | null>(null);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
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

  async function handleChangePassword(event: React.FormEvent<HTMLFormElement>) {
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

  async function handleLogout() {
    setIsLoggingOut(true);
    try {
      await logout();
      toast.info("Você saiu da sua conta.");
      router.replace("/login");
    } finally {
      setIsLoggingOut(false);
    }
  }

  return (
    <div className="grid gap-5 xl:grid-cols-[340px_1fr]">
      <aside className="space-y-4">
        <SettingsAccountCard user={user} />
      </aside>

      <section
        className="rounded-[var(--radius-lg)] border px-4 sm:px-5"
        style={{
          borderColor: "var(--color-border)",
          backgroundColor: "color-mix(in oklab, var(--color-surface) 70%, transparent)",
        }}
      >
        <div className="border-b py-4" style={{ borderColor: "var(--color-border)" }}>
          <SectionHeader
            title="Preferências da conta"
            description="Dados básicos, aparência e segurança do ambiente do aluno."
          />
        </div>

        <SettingRow title="Perfil" description="Informações usadas para identificar sua conta.">
          <div className="flex items-center gap-2 text-sm font-semibold">
            <UserRound size={16} aria-hidden="true" />
            {user?.name ?? "Não informado"}
          </div>
        </SettingRow>

        <SettingRow title="Tema" description="O modo escuro é o padrão visual da área do aluno.">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-2 text-sm font-semibold">
              <Moon size={16} aria-hidden="true" />
              {theme === "dark" ? "Escuro" : "Claro"}
            </span>
            <ThemeToggleButton theme={theme} onToggle={() => setTheme(theme === "dark" ? "light" : "dark")} />
          </div>
        </SettingRow>

        <SettingRow title="Senha" description="Abra o formulário apenas quando precisar trocar sua senha.">
          <Button type="button" variant="outline" className="gap-2" onClick={openPasswordDialog}>
            <ShieldCheck size={17} aria-hidden="true" />
            Trocar senha
          </Button>
        </SettingRow>

        {passwordSuccess ? <Alert tone="success">{passwordSuccess}</Alert> : null}

        <SettingRow title="Sessão" description="Também disponível no menu da conta no topo.">
          <Button
            type="button"
            onClick={() => void handleLogout()}
            disabled={isLoggingOut}
            variant="danger"
            className="gap-2"
            style={{ opacity: isLoggingOut ? 0.7 : 1 }}
          >
            <LogOut size={16} aria-hidden="true" />
            {isLoggingOut ? "Saindo..." : "Sair da conta"}
          </Button>
        </SettingRow>
      </section>

      {isPasswordDialogOpen ? (
        <SettingsPasswordDialog
          currentPassword={currentPassword}
          newPassword={newPassword}
          confirmPassword={confirmPassword}
          errorMessage={passwordError}
          isSubmitting={isChangingPassword}
          visiblePasswordFields={visiblePasswordFields}
          onClose={closePasswordDialog}
          onCurrentPasswordChange={setCurrentPassword}
          onNewPasswordChange={setNewPassword}
          onConfirmPasswordChange={setConfirmPassword}
          onSubmit={handleChangePassword}
          onTogglePasswordVisibility={togglePasswordVisibility}
        />
      ) : null}
    </div>
  );
}
