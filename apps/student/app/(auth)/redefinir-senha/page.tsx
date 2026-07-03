"use client";

import { AuthFormCard } from "@/components/auth/AuthFormCard";
import { AuthSubmitButton } from "@/components/auth/AuthFormActions";
import { PasswordStrengthGuide } from "@/components/auth/PasswordStrengthGuide";
import { ResetTokenInput } from "@/components/auth/ResetTokenInput";
import { useResetPasswordForm } from "@/components/auth/use-reset-password-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PasswordInput } from "@/components/ui/PasswordInput";

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

        {resetPasswordForm.step === "code" ? (
          <div className="block">
            <Label htmlFor="token">Código de redefinição</Label>
            <ResetTokenInput
              value={resetPasswordForm.token}
              onChange={resetPasswordForm.setToken}
              disabled={resetPasswordForm.isSubmitting}
            />
            <p className="mt-2 text-xs" style={{ color: "var(--color-text-muted)" }}>
              {resetPasswordForm.isVerifyingToken
                ? "Verificando código..."
                : "Digite os 8 caracteres recebidos por e-mail. Ao completar, você segue para a nova senha."}
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="rounded-[var(--radius-md)] border p-3 text-sm" style={{ borderColor: "var(--color-border)" }}>
              <div className="flex items-center justify-between gap-3">
                <span style={{ color: "var(--color-text-muted)" }}>Código preenchido</span>
                <Button type="button" variant="ghost" size="sm" onClick={resetPasswordForm.showCodeStep}>
                  Alterar
                </Button>
              </div>
              <p className="mt-1 font-semibold tracking-[0.22em]">{resetPasswordForm.token}</p>
            </div>

            <div className="block">
              <Label htmlFor="password">Nova senha</Label>
              <PasswordInput
                id="password"
                autoComplete="new-password"
                value={resetPasswordForm.password}
                onChange={(event) => resetPasswordForm.setPassword(event.target.value)}
                placeholder="Nova senha"
                isVisible={resetPasswordForm.visiblePasswordFields.password}
                onToggleVisibility={() => resetPasswordForm.togglePasswordVisibility("password")}
              />
            </div>

            <PasswordStrengthGuide assessment={resetPasswordForm.passwordStrength} />

            <div className="block">
              <Label htmlFor="passwordConfirmation">Confirmar nova senha</Label>
              <PasswordInput
                id="passwordConfirmation"
                autoComplete="new-password"
                value={resetPasswordForm.passwordConfirmation}
                onChange={(event) => resetPasswordForm.setPasswordConfirmation(event.target.value)}
                placeholder="Confirmar nova senha"
                isVisible={resetPasswordForm.visiblePasswordFields.passwordConfirmation}
                onToggleVisibility={() => resetPasswordForm.togglePasswordVisibility("passwordConfirmation")}
              />
            </div>

            <AuthSubmitButton isSubmitting={resetPasswordForm.isSubmitting}>
              {resetPasswordForm.isSubmitting ? "Redefinindo..." : "Redefinir senha"}
            </AuthSubmitButton>
          </div>
        )}
      </form>
    </AuthFormCard>
  );
}
