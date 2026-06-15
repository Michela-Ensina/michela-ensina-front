"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { LogOut, Moon, ShieldCheck, UserRound } from "lucide-react";
import { toast } from "sonner";

import { SectionHeader } from "@/components/student/SectionHeader";
import { Alert } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SettingRow } from "@/components/ui/SettingRow";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { SurfaceCard } from "@/components/ui/SurfaceCard";
import { ThemeToggleButton } from "@/components/ui/ThemeToggleButton";
import { useAuth } from "@/lib/auth/use-auth";
import { useTheme } from "@/lib/theme/use-theme";

type SettingsContentProps = {
  showMustChangePasswordAlert?: boolean;
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

  const userStatusLabel = useMemo(() => {
    if (!user) return "Sem dados";
    return user.is_active ? "Ativo" : "Inativo";
  }, [user]);

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

        <div className="py-5">
          <div className="flex items-start gap-3">
            <ShieldCheck size={18} aria-hidden="true" style={{ color: "var(--color-primary)" }} />
            <div>
              <h2 className="text-xl">Trocar senha</h2>
              <p className="mt-1 text-sm" style={{ color: "var(--color-text-muted)" }}>
                Mantenha uma senha forte com pelo menos 8 caracteres.
              </p>
            </div>
          </div>

          {passwordError ? <Alert tone="error">{passwordError}</Alert> : null}
          {passwordSuccess ? <Alert tone="success">{passwordSuccess}</Alert> : null}

          <form className="mt-5 grid gap-3 lg:grid-cols-3" onSubmit={handleChangePassword}>
            <div className="block">
              <Label htmlFor="currentPassword">Senha atual</Label>
              <Input id="currentPassword" type="password" value={currentPassword} onChange={(event) => setCurrentPassword(event.target.value)} placeholder="Senha atual" />
            </div>
            <div className="block">
              <Label htmlFor="newPassword">Nova senha</Label>
              <Input id="newPassword" type="password" value={newPassword} onChange={(event) => setNewPassword(event.target.value)} placeholder="Nova senha" />
            </div>
            <div className="block">
              <Label htmlFor="confirmPassword">Confirmar senha</Label>
              <Input id="confirmPassword" type="password" value={confirmPassword} onChange={(event) => setConfirmPassword(event.target.value)} placeholder="Confirmar senha" />
            </div>

            <div className="lg:col-span-3">
              <Button type="submit" disabled={isChangingPassword} variant="primary" style={{ opacity: isChangingPassword ? 0.7 : 1 }}>
                {isChangingPassword ? "Atualizando..." : "Atualizar senha"}
              </Button>
            </div>
          </form>
        </div>

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
    </div>
  );
}
