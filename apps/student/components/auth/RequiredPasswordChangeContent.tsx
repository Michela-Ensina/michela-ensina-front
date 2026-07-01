"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { KeyRound, ShieldCheck } from "lucide-react";

import { StudentBrandMark } from "@/components/brand/StudentBrandMark";
import { Alert } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { PasswordInput } from "@/components/ui/PasswordInput";
import { ThemeToggleButton } from "@/components/ui/ThemeToggleButton";
import { STRONG_PASSWORD_DESCRIPTION } from "@/lib/auth/password-change";
import { useAuth } from "@/lib/auth/use-auth";
import { useTheme } from "@/lib/theme/use-theme";
import { useRequiredPasswordChangeForm } from "./use-required-password-change-form";

export function RequiredPasswordChangeContent() {
  const { changePassword, isAuthenticated, isLoading, sessionExpired, user } = useAuth();
  const { theme, setTheme } = useTheme();
  const router = useRouter();
  const passwordForm = useRequiredPasswordChangeForm(changePassword);

  useEffect(() => {
    if (isLoading) return;

    if (!isAuthenticated) {
      router.replace(sessionExpired ? "/login?motivo=sessao-expirada" : "/login");
      return;
    }

    if (!user?.must_change_password) {
      router.replace("/dashboard");
    }
  }, [isAuthenticated, isLoading, router, sessionExpired, user?.must_change_password]);

  if (isLoading || !isAuthenticated || !user?.must_change_password) {
    return (
      <main className="grid min-h-screen place-items-center px-5">
        <p style={{ color: "var(--color-text-muted)" }}>Verificando sua conta...</p>
      </main>
    );
  }

  return (
    <main className="grid min-h-screen lg:grid-cols-[0.78fr_1.22fr]">
      <section
        className="flex flex-col justify-between border-b px-6 py-7 sm:px-10 lg:border-b-0 lg:border-r lg:px-12 lg:py-10"
        style={{
          borderColor: "var(--color-border)",
          backgroundColor: "color-mix(in oklab, var(--color-surface) 82%, var(--color-secondary))",
        }}
      >
        <StudentBrandMark variant="horizontal" className="h-9 w-auto self-start" />

        <div className="my-10 max-w-md lg:my-0">
          <div
            className="grid size-12 place-items-center rounded-[var(--radius-md)]"
            style={{
              backgroundColor: "color-mix(in oklab, var(--color-primary) 18%, transparent)",
              color: "var(--color-primary)",
            }}
          >
            <ShieldCheck size={24} aria-hidden="true" />
          </div>
          <h1 className="mt-5 text-3xl leading-tight sm:text-4xl">Proteja seu acesso</h1>
          <p className="mt-3 max-w-prose text-sm sm:text-base" style={{ color: "var(--color-text-muted)" }}>
            Antes de continuar, defina uma senha pessoal. Essa etapa é obrigatória e acontece apenas no primeiro acesso.
          </p>
        </div>

        <p className="text-xs" style={{ color: "var(--color-text-muted)" }}>
          Área do aluno Michela Ensina
        </p>
      </section>

      <section className="flex min-h-full flex-col px-5 py-6 sm:px-10 lg:px-16 lg:py-10">
        <div className="flex justify-end">
          <ThemeToggleButton
            theme={theme}
            mode="icon"
            onToggle={() => setTheme(theme === "dark" ? "light" : "dark")}
          />
        </div>

        <div className="mx-auto flex w-full max-w-lg flex-1 flex-col justify-center py-8">
          <div className="flex items-center gap-3">
            <KeyRound size={20} aria-hidden="true" style={{ color: "var(--color-primary)" }} />
            <p className="text-sm font-semibold" style={{ color: "var(--color-primary)" }}>
              Atualização obrigatória
            </p>
          </div>
          <h2 className="mt-3 text-3xl leading-tight">Crie sua nova senha</h2>
          <p className="mt-2 text-sm" style={{ color: "var(--color-text-muted)" }}>
            {STRONG_PASSWORD_DESCRIPTION} Escolha uma senha diferente da atual.
          </p>

          {passwordForm.errorMessage ? <Alert tone="error">{passwordForm.errorMessage}</Alert> : null}

          <form className="mt-7 space-y-4" onSubmit={passwordForm.handleSubmit}>
            <div>
              <Label htmlFor="currentPassword">Senha atual</Label>
              <PasswordInput
                id="currentPassword"
                autoComplete="current-password"
                value={passwordForm.currentPassword}
                onChange={(event) => passwordForm.setCurrentPassword(event.target.value)}
                placeholder="Digite sua senha atual"
                isVisible={passwordForm.visibleFields.current}
                onToggleVisibility={() => passwordForm.toggleVisibility("current")}
              />
            </div>
            <div>
              <Label htmlFor="newPassword">Nova senha</Label>
              <PasswordInput
                id="newPassword"
                autoComplete="new-password"
                value={passwordForm.newPassword}
                onChange={(event) => passwordForm.setNewPassword(event.target.value)}
                placeholder="Digite a nova senha"
                isVisible={passwordForm.visibleFields.next}
                onToggleVisibility={() => passwordForm.toggleVisibility("next")}
              />
            </div>
            <div>
              <Label htmlFor="passwordConfirmation">Confirme a nova senha</Label>
              <PasswordInput
                id="passwordConfirmation"
                autoComplete="new-password"
                value={passwordForm.passwordConfirmation}
                onChange={(event) => passwordForm.setPasswordConfirmation(event.target.value)}
                placeholder="Digite novamente"
                isVisible={passwordForm.visibleFields.confirm}
                onToggleVisibility={() => passwordForm.toggleVisibility("confirm")}
              />
            </div>

            <Button type="submit" variant="primary" size="lg" fullWidth disabled={passwordForm.isSubmitting}>
              {passwordForm.isSubmitting ? "Atualizando senha..." : "Atualizar senha e continuar"}
            </Button>
          </form>
        </div>
      </section>
    </main>
  );
}
