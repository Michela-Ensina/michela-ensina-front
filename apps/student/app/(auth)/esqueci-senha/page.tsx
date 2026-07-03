"use client";

import { AuthFormCard } from "@/components/auth/AuthFormCard";
import { AuthSubmitButton } from "@/components/auth/AuthFormActions";
import { useForgotPasswordForm } from "@/components/auth/use-forgot-password-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function EsqueciSenhaPage() {
  const forgotPasswordForm = useForgotPasswordForm();

  return (
    <AuthFormCard
      title="Esqueci minha senha"
      description="Informe seu e-mail para receber as instruções de recuperação."
      errorMessage={forgotPasswordForm.errorMessage}
      successMessage={forgotPasswordForm.successMessage}
      loginLinkLabel="Voltar para login"
    >
      <form className="mt-6 space-y-4" onSubmit={forgotPasswordForm.handleSubmit}>
        <div className="block">
          <Label htmlFor="email">E-mail</Label>
          <Input
            id="email"
            type="email"
            value={forgotPasswordForm.email}
            onChange={(event) => forgotPasswordForm.setEmail(event.target.value)}
            placeholder="seuemail@exemplo.com"
          />
        </div>

        <AuthSubmitButton isSubmitting={forgotPasswordForm.isSubmitting}>
          {forgotPasswordForm.isSubmitting ? "Enviando..." : "Enviar instruções"}
        </AuthSubmitButton>
      </form>

      {forgotPasswordForm.successMessage ? (
        <div className="mt-5 space-y-3 rounded-[var(--radius-md)] border p-4" style={{ borderColor: "var(--color-border)" }}>
          <div>
            <p className="text-sm font-semibold">Recebeu o e-mail?</p>
            <p className="mt-1 text-sm" style={{ color: "var(--color-text-muted)" }}>
              Insira o código de 8 caracteres para criar uma nova senha.
            </p>
          </div>
          <Button type="button" variant="outline" fullWidth onClick={forgotPasswordForm.openResetPasswordForm}>
            Inserir código recebido
          </Button>
        </div>
      ) : null}
    </AuthFormCard>
  );
}
