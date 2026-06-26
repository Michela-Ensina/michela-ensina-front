"use client";
import { LogOut, Moon, ShieldCheck, UserRound } from "lucide-react";

import { SettingsAccountCard } from "@/components/student/settings/SettingsAccountCard";
import { SettingsPasswordDialog } from "@/components/student/settings/SettingsPasswordDialog";
import { useSettingsPasswordDialog } from "@/components/student/settings/use-settings-password-dialog";
import { SectionHeader } from "@/components/student/SectionHeader";
import { Alert } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { SettingRow } from "@/components/ui/SettingRow";
import { ThemeToggleButton } from "@/components/ui/ThemeToggleButton";
import { useLogoutAction } from "@/lib/auth/use-logout-action";
import { useAuth } from "@/lib/auth/use-auth";
import { useTheme } from "@/lib/theme/use-theme";

export function SettingsContent() {
  const { changePassword, user } = useAuth();
  const { theme, setTheme } = useTheme();
  const passwordDialog = useSettingsPasswordDialog(changePassword);
  const { isLoggingOut, logoutFromStudentArea } = useLogoutAction();

  return (
    <div className="grid gap-5 xl:grid-cols-[340px_1fr]">
      <aside className="space-y-4">
        <SettingsAccountCard user={user} />
      </aside>

      <section
        className="rounded-[var(--radius-lg)] border px-4 sm:px-5"
        style={{
          borderColor: "var(--color-border)",
          backgroundColor: "var(--color-surface)",
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
          <Button type="button" variant="outline" className="gap-2" onClick={passwordDialog.openPasswordDialog}>
            <ShieldCheck size={17} aria-hidden="true" />
            Trocar senha
          </Button>
        </SettingRow>

        {passwordDialog.passwordSuccess ? <Alert tone="success">{passwordDialog.passwordSuccess}</Alert> : null}

        <SettingRow title="Sessão" description="Também disponível no menu da conta no topo.">
          <Button
            type="button"
            onClick={() => void logoutFromStudentArea()}
            disabled={isLoggingOut}
            variant="danger"
            className="gap-2"
          >
            <LogOut size={16} aria-hidden="true" />
            {isLoggingOut ? "Saindo..." : "Sair da conta"}
          </Button>
        </SettingRow>
      </section>

      {passwordDialog.isPasswordDialogOpen ? (
        <SettingsPasswordDialog
          currentPassword={passwordDialog.currentPassword}
          newPassword={passwordDialog.newPassword}
          confirmPassword={passwordDialog.confirmPassword}
          errorMessage={passwordDialog.passwordError}
          isSubmitting={passwordDialog.isChangingPassword}
          visiblePasswordFields={passwordDialog.visiblePasswordFields}
          onClose={passwordDialog.closePasswordDialog}
          onCurrentPasswordChange={passwordDialog.setCurrentPassword}
          onNewPasswordChange={passwordDialog.setNewPassword}
          onConfirmPasswordChange={passwordDialog.setConfirmPassword}
          onSubmit={passwordDialog.handleChangePassword}
          onTogglePasswordVisibility={passwordDialog.togglePasswordVisibility}
        />
      ) : null}
    </div>
  );
}
