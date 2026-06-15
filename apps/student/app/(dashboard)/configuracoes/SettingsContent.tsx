"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { LogOut, Moon, ShieldCheck, UserRound, X } from "lucide-react";
import { toast } from "sonner";

import { SectionHeader } from "@/components/student/SectionHeader";
import { Alert } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { PasswordInput } from "@/components/ui/PasswordInput";
import { SettingRow } from "@/components/ui/SettingRow";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { SurfaceCard } from "@/components/ui/SurfaceCard";
import { ThemeToggleButton } from "@/components/ui/ThemeToggleButton";
import { useAuth } from "@/lib/auth/use-auth";
import { useTheme } from "@/lib/theme/use-theme";

type SettingsContentProps = {
  showMustChangePasswordAlert?: boolean;
};

type PasswordVisibilityField = "current" | "next" | "confirm";

const hiddenPasswordFields: Record<PasswordVisibilityField, boolean> = {
  current: false,
  next: false,
  confirm: false,
};

export function SettingsContent({ showMustChangePasswordAlert = false }: SettingsContentProps) {
  const { user, logout, setUser } = useAuth();
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

  const userStatusLabel = useMemo(() => {
    if (!user) return "Sem dados";
    return user.is_active ? "Ativo" : "Inativo";
  }, [user]);

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
      if (user?.must_change_password) {
        setUser({ ...user, must_change_password: false });
      }

      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      const message = "Senha atualizada com sucesso.";
      setPasswordSuccess(message);
      toast.success(message);
      closePasswordDialog();
    } catch {
      const message = "Não foi possível atualizar a senha no preview local.";
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
        <SurfaceCard>
          <div className="flex items-start gap-3">
            <div
              className="grid size-12 shrink-0 place-items-center rounded-2xl text-sm font-bold"
              style={{
                backgroundColor: "color-mix(in oklab, var(--color-primary) 18%, transparent)",
                color: "var(--color-text)",
              }}
            >
              {user?.name?.slice(0, 2).toUpperCase() ?? "ME"}
            </div>
            <div className="min-w-0">
              <p className="font-semibold">{user?.name ?? "Aluno"}</p>
              <p className="truncate text-sm" style={{ color: "var(--color-text-muted)" }}>
                {user?.email ?? "Área do aluno"}
              </p>
            </div>
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            <StatusBadge label={userStatusLabel} tone={user?.is_active ? "concluído" : "bloqueado"} />
            {user?.must_change_password ? <StatusBadge label="Senha recomendada" tone="em-andamento" /> : null}
          </div>
        </SurfaceCard>

        {(showMustChangePasswordAlert || user?.must_change_password) && (
          <div className="rounded-[var(--radius-lg)] border p-4" style={{ borderColor: "var(--color-border)" }}>
            <p className="text-sm font-semibold">Ação recomendada</p>
            <p className="mt-2 text-sm" style={{ color: "var(--color-text-muted)" }}>
              Atualize sua senha quando puder. O preview segue liberado para validação visual.
            </p>
          </div>
        )}
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
        <div
          className="fixed inset-0 z-50 grid place-items-center px-4 py-8"
          style={{ backgroundColor: "rgb(10 5 20 / 0.72)" }}
          role="dialog"
          aria-modal="true"
          aria-labelledby="password-dialog-title"
        >
          <div
            className="w-full max-w-xl rounded-[var(--radius-lg)] border p-5 shadow-[var(--shadow-md)] sm:p-6"
            style={{
              borderColor: "var(--color-border)",
              backgroundColor: "var(--color-surface)",
            }}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 id="password-dialog-title" className="text-2xl">Trocar senha</h2>
                <p className="mt-1 text-sm" style={{ color: "var(--color-text-muted)" }}>
                  Use uma senha forte e diferente da senha atual.
                </p>
              </div>
              <button
                type="button"
                className="student-action student-hover-surface grid size-9 shrink-0 place-items-center rounded-xl border"
                style={{
                  borderColor: "var(--color-border)",
                  color: "var(--color-text-muted)",
                  backgroundColor: "color-mix(in oklab, var(--color-surface-soft) 70%, transparent)",
                }}
                aria-label="Fechar troca de senha"
                onClick={closePasswordDialog}
              >
                <X size={17} aria-hidden="true" />
              </button>
            </div>

            {passwordError ? <Alert tone="error">{passwordError}</Alert> : null}

            <form className="mt-5 grid gap-3" onSubmit={handleChangePassword}>
              <div className="block">
                <Label htmlFor="currentPassword">Senha atual</Label>
                <PasswordInput
                  id="currentPassword"
                  value={currentPassword}
                  onChange={(event) => setCurrentPassword(event.target.value)}
                  placeholder="Senha atual"
                  isVisible={visiblePasswordFields.current}
                  onToggleVisibility={() => togglePasswordVisibility("current")}
                />
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="block">
                  <Label htmlFor="newPassword">Nova senha</Label>
                  <PasswordInput
                    id="newPassword"
                    value={newPassword}
                    onChange={(event) => setNewPassword(event.target.value)}
                    placeholder="Nova senha"
                    isVisible={visiblePasswordFields.next}
                    onToggleVisibility={() => togglePasswordVisibility("next")}
                  />
                </div>
                <div className="block">
                  <Label htmlFor="confirmPassword">Confirmar senha</Label>
                  <PasswordInput
                    id="confirmPassword"
                    value={confirmPassword}
                    onChange={(event) => setConfirmPassword(event.target.value)}
                    placeholder="Confirmar senha"
                    isVisible={visiblePasswordFields.confirm}
                    onToggleVisibility={() => togglePasswordVisibility("confirm")}
                  />
                </div>
              </div>

              <div className="mt-2 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
                <Button type="button" variant="outline" onClick={closePasswordDialog}>
                  Cancelar
                </Button>
                <Button type="submit" disabled={isChangingPassword} variant="primary" style={{ opacity: isChangingPassword ? 0.7 : 1 }}>
                  {isChangingPassword ? "Atualizando..." : "Atualizar senha"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      ) : null}
    </div>
  );
}
