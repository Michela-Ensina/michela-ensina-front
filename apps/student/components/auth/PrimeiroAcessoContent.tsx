"use client";

import { AuthFormCard } from "@/components/auth/AuthFormCard";
import { AuthSubmitButton } from "@/components/auth/AuthFormActions";
import { useFirstAccessForm } from "@/components/auth/use-first-access-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PasswordInput } from "@/components/ui/PasswordInput";

type PrimeiroAcessoContentProps = {
  initialToken?: string;
};

export function PrimeiroAcessoContent({
  initialToken = "",
}: PrimeiroAcessoContentProps) {
  const firstAccessForm = useFirstAccessForm(initialToken);

  return (
    <AuthFormCard
      title="Primeiro acesso"
      description="Defina sua senha inicial para entrar na área do aluno."
      errorMessage={firstAccessForm.errorMessage}
      successMessage={firstAccessForm.successMessage}
      loginLinkLabel="Ir para login"
    >
      <form className="mt-6 space-y-4" onSubmit={firstAccessForm.handleSubmit}>
        <div className="block">
          <Label htmlFor="token">Token de primeiro acesso</Label>
          <Input
            id="token"
            type="text"
            disabled={firstAccessForm.isTokenLocked}
            value={firstAccessForm.token}
            onChange={(event) => firstAccessForm.setToken(event.target.value)}
            placeholder="Token recebido por e-mail"
          />
        </div>
        <div className="block">
          <Label htmlFor="password">Nova senha</Label>
          <PasswordInput
            id="password"
            value={firstAccessForm.password}
            onChange={(event) => firstAccessForm.setPassword(event.target.value)}
            placeholder="Nova senha"
            isVisible={firstAccessForm.visiblePasswordFields.password}
            onToggleVisibility={() =>
              firstAccessForm.togglePasswordVisibility("password")
            }
          />
        </div>
        <div className="block">
          <Label htmlFor="passwordConfirmation">Confirmar nova senha</Label>
          <PasswordInput
            id="passwordConfirmation"
            value={firstAccessForm.passwordConfirmation}
            onChange={(event) =>
              firstAccessForm.setPasswordConfirmation(event.target.value)
            }
            placeholder="Confirmar nova senha"
            isVisible={
              firstAccessForm.visiblePasswordFields.passwordConfirmation
            }
            onToggleVisibility={() =>
              firstAccessForm.togglePasswordVisibility("passwordConfirmation")
            }
          />
        </div>

        <AuthSubmitButton isSubmitting={firstAccessForm.isSubmitting}>
          {firstAccessForm.isSubmitting
            ? "Concluindo..."
            : "Concluir primeiro acesso"}
        </AuthSubmitButton>
      </form>
    </AuthFormCard>
  );
}
