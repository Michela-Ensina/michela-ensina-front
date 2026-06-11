"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { LogOut, Moon, ShieldCheck, UserRound } from "lucide-react";
import { toast } from "sonner";

import { Alert } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
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
    <div className="space-y-5">
      {(showMustChangePasswordAlert || user?.must_change_password) && (
        <SurfaceCard>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <h2 className="text-xl">Ação recomendada</h2>
              <p className="mt-2 text-sm" style={{ color: "var(--color-text-muted)" }}>
                Atualize sua senha quando puder. Por enquanto, o acesso ao preview permanece liberado.
              </p>
            </div>
            <StatusBadge label="Recomendado" tone="em-andamento" />
          </div>
        </SurfaceCard>
      )}

      <div className="grid gap-4 lg:grid-cols-2">
        <SurfaceCard>
          <div className="flex items-start gap-3">
            <div
              className="flex size-10 shrink-0 items-center justify-center rounded-xl"
              style={{
                backgroundColor: "color-mix(in oklab, var(--color-primary) 14%, transparent)",
                color: "var(--color-primary)",
              }}
            >
              <UserRound size={18} aria-hidden="true" />
            </div>
            <div>
              <h2 className="text-xl">Perfil</h2>
              <p className="mt-1 text-sm" style={{ color: "var(--color-text-muted)" }}>
                Dados usados para identificar sua área do aluno.
              </p>
            </div>
          </div>

          <dl className="mt-5 grid gap-3 text-sm">
            <div className="flex items-center justify-between gap-4">
              <dt style={{ color: "var(--color-text-muted)" }}>Nome</dt>
              <dd className="text-right font-semibold">{user?.name ?? "Não informado"}</dd>
            </div>
            <div className="flex items-center justify-between gap-4">
              <dt style={{ color: "var(--color-text-muted)" }}>E-mail</dt>
              <dd className="text-right font-semibold">{user?.email ?? "Não informado"}</dd>
            </div>
            <div className="flex items-center justify-between gap-4">
              <dt style={{ color: "var(--color-text-muted)" }}>Status da conta</dt>
              <dd className="font-semibold">{userStatusLabel}</dd>
            </div>
          </dl>
        </SurfaceCard>

        <SurfaceCard>
          <div className="flex items-start gap-3">
            <div
              className="flex size-10 shrink-0 items-center justify-center rounded-xl"
              style={{
                backgroundColor: "color-mix(in oklab, var(--color-accent) 14%, transparent)",
                color: "color-mix(in oklab, var(--color-accent) 78%, var(--color-text))",
              }}
            >
              <Moon size={18} aria-hidden="true" />
            </div>
            <div>
              <h2 className="text-xl">Tema</h2>
              <p className="mt-1 text-sm" style={{ color: "var(--color-text-muted)" }}>
                O modo escuro é o padrão visual da área do aluno.
              </p>
            </div>
          </div>

          <div className="mt-5 flex flex-wrap items-center gap-3">
            <ThemeToggleButton theme={theme} onToggle={() => setTheme(theme === "dark" ? "light" : "dark")} />
            <p className="text-sm" style={{ color: "var(--color-text-muted)" }}>
              Tema atual: {theme === "dark" ? "Escuro" : "Claro"}
            </p>
          </div>
        </SurfaceCard>
      </div>

      <SurfaceCard>
        <div className="flex items-start gap-3">
          <div
            className="flex size-10 shrink-0 items-center justify-center rounded-xl"
            style={{
              backgroundColor: "color-mix(in oklab, #48b08c 18%, transparent)",
              color: "color-mix(in oklab, #2f9d77 78%, var(--color-text))",
            }}
          >
            <ShieldCheck size={18} aria-hidden="true" />
          </div>
          <div>
            <h2 className="text-xl">Trocar senha</h2>
            <p className="mt-1 text-sm" style={{ color: "var(--color-text-muted)" }}>
              Use uma senha forte com pelo menos 8 caracteres.
            </p>
          </div>
        </div>

        {passwordError ? <Alert tone="error">{passwordError}</Alert> : null}
        {passwordSuccess ? <Alert tone="success">{passwordSuccess}</Alert> : null}

        <form className="mt-5 grid gap-3 md:grid-cols-3" onSubmit={handleChangePassword}>
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

          <div className="md:col-span-3">
            <Button type="submit" disabled={isChangingPassword} variant="primary" style={{ opacity: isChangingPassword ? 0.7 : 1 }}>
              {isChangingPassword ? "Atualizando..." : "Atualizar senha"}
            </Button>
          </div>
        </form>
      </SurfaceCard>

      <SurfaceCard>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-xl">Sessão</h2>
            <Separator />
            <p className="mt-2 text-sm" style={{ color: "var(--color-text-muted)" }}>
              Encerre sua sessão neste dispositivo quando terminar.
            </p>
          </div>
          <Button
            type="button"
            onClick={() => void handleLogout()}
            disabled={isLoggingOut}
            variant="danger"
            style={{ opacity: isLoggingOut ? 0.7 : 1 }}
          >
            <LogOut size={16} aria-hidden="true" />
            {isLoggingOut ? "Saindo..." : "Sair da conta"}
          </Button>
        </div>
      </SurfaceCard>
    </div>
  );
}
