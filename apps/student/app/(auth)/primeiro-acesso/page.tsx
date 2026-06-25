"use client";

import { AuthFormCard } from "@/components/auth/AuthFormCard";
import { AuthSubmitButton } from "@/components/auth/AuthFormActions";
import { useFirstAccessForm } from "@/components/auth/use-first-access-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function PrimeiroAcessoPage() {
  const firstAccessForm = useFirstAccessForm();

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
            value={firstAccessForm.token}
            onChange={(event) => firstAccessForm.setToken(event.target.value)}
            placeholder="Token recebido por e-mail"
          />
        </div>
        <div className="block">
          <Label htmlFor="password">Nova senha</Label>
          <Input
            id="password"
            type="password"
            value={firstAccessForm.password}
            onChange={(event) => firstAccessForm.setPassword(event.target.value)}
            placeholder="Nova senha"
          />
        </div>
        <div className="block">
          <Label htmlFor="passwordConfirmation">Confirmar nova senha</Label>
          <Input
            id="passwordConfirmation"
            type="password"
            value={firstAccessForm.passwordConfirmation}
            onChange={(event) => firstAccessForm.setPasswordConfirmation(event.target.value)}
            placeholder="Confirmar nova senha"
          />
        </div>

        <AuthSubmitButton isSubmitting={firstAccessForm.isSubmitting}>
          {firstAccessForm.isSubmitting ? "Concluindo..." : "Concluir primeiro acesso"}
        </AuthSubmitButton>
      </form>
    </AuthFormCard>
  );
}
