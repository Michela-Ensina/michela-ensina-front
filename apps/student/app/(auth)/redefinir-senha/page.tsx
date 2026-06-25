"use client";

import { AuthFormCard } from "@/components/auth/AuthFormCard";
import { AuthSubmitButton } from "@/components/auth/AuthFormActions";
import { useResetPasswordForm } from "@/components/auth/use-reset-password-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function RedefinirSenhaPage() {
  const resetPasswordForm = useResetPasswordForm();

  return (
    <AuthFormCard
      title="Redefinir senha"
      description="Informe os dados recebidos por e-mail para redefinir sua senha."
      errorMessage={resetPasswordForm.errorMessage}
      successMessage={resetPasswordForm.successMessage}
      loginLinkLabel="Voltar para login"
    >
      <form className="mt-6 space-y-4" onSubmit={resetPasswordForm.handleSubmit}>
        <div className="block">
          <Label htmlFor="email">E-mail</Label>
          <Input
            id="email"
            type="email"
            value={resetPasswordForm.email}
            onChange={(event) => resetPasswordForm.setEmail(event.target.value)}
            placeholder="seuemail@exemplo.com"
          />
        </div>
        <div className="block">
          <Label htmlFor="token">Token de redefinição</Label>
          <Input
            id="token"
            type="text"
            value={resetPasswordForm.token}
            onChange={(event) => resetPasswordForm.setToken(event.target.value)}
            placeholder="Token recebido por e-mail"
          />
        </div>
        <div className="block">
          <Label htmlFor="password">Nova senha</Label>
          <Input
            id="password"
            type="password"
            value={resetPasswordForm.password}
            onChange={(event) => resetPasswordForm.setPassword(event.target.value)}
            placeholder="Nova senha"
          />
        </div>
        <div className="block">
          <Label htmlFor="passwordConfirmation">Confirmar nova senha</Label>
          <Input
            id="passwordConfirmation"
            type="password"
            value={resetPasswordForm.passwordConfirmation}
            onChange={(event) => resetPasswordForm.setPasswordConfirmation(event.target.value)}
            placeholder="Confirmar nova senha"
          />
        </div>

        <AuthSubmitButton isSubmitting={resetPasswordForm.isSubmitting}>
          {resetPasswordForm.isSubmitting ? "Redefinindo..." : "Redefinir senha"}
        </AuthSubmitButton>
      </form>
    </AuthFormCard>
  );
}
