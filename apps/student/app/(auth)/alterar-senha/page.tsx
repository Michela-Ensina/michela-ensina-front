"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { KeyRound, ShieldCheck } from "lucide-react";
import { toast } from "sonner";

import { StudentBrandMark } from "@/components/brand/StudentBrandMark";
import { Alert } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { PasswordInput } from "@/components/ui/PasswordInput";
import { ThemeToggleButton } from "@/components/ui/ThemeToggleButton";
import { ApiClientError } from "@/lib/api/errors";
import { useAuth } from "@/lib/auth/use-auth";
import { useTheme } from "@/lib/theme/use-theme";

type PasswordField = "current" | "next" | "confirm";

export default function AlterarSenhaPage() {
  const { changePassword, isAuthenticated, isLoading, sessionExpired, user } = useAuth();
  const { theme, setTheme } = useTheme();
  const router = useRouter();
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [visibleFields, setVisibleFields] = useState<Record<PasswordField, boolean>>({
    current: false,
    next: false,
    confirm: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

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

  function toggleVisibility(field: PasswordField) {
    setVisibleFields((current) => ({ ...current, [field]: !current[field] }));
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
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
            Use pelo menos 8 caracteres e escolha uma senha diferente da atual.
          </p>

          {errorMessage ? <Alert tone="error">{errorMessage}</Alert> : null}

          <form className="mt-7 space-y-4" onSubmit={handleSubmit}>
            <div>
              <Label htmlFor="currentPassword">Senha atual</Label>
              <PasswordInput
                id="currentPassword"
                autoComplete="current-password"
                value={currentPassword}
                onChange={(event) => setCurrentPassword(event.target.value)}
                placeholder="Digite sua senha atual"
                isVisible={visibleFields.current}
                onToggleVisibility={() => toggleVisibility("current")}
              />
            </div>
            <div>
              <Label htmlFor="newPassword">Nova senha</Label>
              <PasswordInput
                id="newPassword"
                autoComplete="new-password"
                value={newPassword}
                onChange={(event) => setNewPassword(event.target.value)}
                placeholder="Digite a nova senha"
                isVisible={visibleFields.next}
                onToggleVisibility={() => toggleVisibility("next")}
              />
            </div>
            <div>
              <Label htmlFor="passwordConfirmation">Confirme a nova senha</Label>
              <PasswordInput
                id="passwordConfirmation"
                autoComplete="new-password"
                value={passwordConfirmation}
                onChange={(event) => setPasswordConfirmation(event.target.value)}
                placeholder="Digite novamente"
                isVisible={visibleFields.confirm}
                onToggleVisibility={() => toggleVisibility("confirm")}
              />
            </div>

            <Button type="submit" variant="primary" size="lg" fullWidth disabled={isSubmitting}>
              {isSubmitting ? "Atualizando senha..." : "Atualizar senha e continuar"}
            </Button>
          </form>
        </div>
      </section>
    </main>
  );
}
