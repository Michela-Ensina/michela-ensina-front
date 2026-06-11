"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { Alert } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { ThemeToggleButton } from "@/components/ui/ThemeToggleButton";
import { SurfaceCard } from "@/components/ui/SurfaceCard";
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
    <div className="space-y-4">
      {(showMustChangePasswordAlert || user?.must_change_password) && (
        <SurfaceCard>
          <h2 className="text-xl">Ação recomendada</h2>
          <p className="mt-2 text-sm" style={{ color: "var(--color-text-muted)" }}>
            Para manter sua conta segura, atualize sua senha agora.
          </p>
        </SurfaceCard>
      )}

      <SurfaceCard>
        <h2 className="text-xl">Perfil</h2>
        <div className="mt-3 space-y-1.5 text-sm">
          <p><strong>Nome:</strong> {user?.name ?? "Não informado"}</p>
          <p><strong>E-mail:</strong> {user?.email ?? "Não informado"}</p>
          <p><strong>Status da conta:</strong> {userStatusLabel}</p>
          <p><strong>Troca de senha obrigatória:</strong> {user?.must_change_password ? "Sim" : "Não"}</p>
        </div>
      </SurfaceCard>

      <SurfaceCard>
        <h2 className="text-xl">Tema</h2>
        <p className="mt-2 text-sm" style={{ color: "var(--color-text-muted)" }}>
          O modo escuro é padrão, mas você pode alternar para o modo claro quando preferir.
        </p>
        <div className="mt-4 flex items-center gap-3">
          <ThemeToggleButton
            theme={theme}
            onToggle={() => setTheme(theme === "dark" ? "light" : "dark")}
          />
          <p className="text-sm" style={{ color: "var(--color-text-muted)" }}>
            Tema atual: {theme === "dark" ? "Escuro" : "Claro"}
          </p>
        </div>
      </SurfaceCard>

      <SurfaceCard>
        <h2 className="text-xl">Trocar senha</h2>
        <p className="mt-2 text-sm" style={{ color: "var(--color-text-muted)" }}>
          Para sua segurança, use uma senha forte com pelo menos 8 caracteres.
        </p>

        {passwordError ? <Alert tone="error">{passwordError}</Alert> : null}
        {passwordSuccess ? <Alert tone="success">{passwordSuccess}</Alert> : null}

        <form className="mt-4 space-y-3" onSubmit={handleChangePassword}>
          <div className="block">
            <Label htmlFor="currentPassword">Senha atual</Label>
            <Input id="currentPassword" type="password" value={currentPassword} onChange={(event) => setCurrentPassword(event.target.value)} placeholder="Senha atual" />
          </div>
          <div className="block">
            <Label htmlFor="newPassword">Nova senha</Label>
            <Input id="newPassword" type="password" value={newPassword} onChange={(event) => setNewPassword(event.target.value)} placeholder="Nova senha" />
          </div>
          <div className="block">
            <Label htmlFor="confirmPassword">Confirmar nova senha</Label>
            <Input id="confirmPassword" type="password" value={confirmPassword} onChange={(event) => setConfirmPassword(event.target.value)} placeholder="Confirmar nova senha" />
          </div>

          <Button
            type="submit"
            disabled={isChangingPassword}
            variant="primary"
            style={{ opacity: isChangingPassword ? 0.7 : 1 }}
          >
            {isChangingPassword ? "Atualizando..." : "Atualizar senha"}
          </Button>
        </form>
      </SurfaceCard>

      <SurfaceCard>
        <h2 className="text-xl">Sessão</h2>
        <Separator />
        <p className="mt-2 text-sm" style={{ color: "var(--color-text-muted)" }}>
          Encerre sua sessão neste dispositivo quando terminar.
        </p>
        <Button
          type="button"
          onClick={() => void handleLogout()}
          disabled={isLoggingOut}
          variant="danger"
          className="mt-4"
          style={{
            opacity: isLoggingOut ? 0.7 : 1,
          }}
        >
          {isLoggingOut ? "Saindo da conta..." : "Sair da conta"}
        </Button>
      </SurfaceCard>
    </div>
  );
}
