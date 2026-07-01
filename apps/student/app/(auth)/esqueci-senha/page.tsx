"use client";

import { AuthFormCard } from "@/components/auth/AuthFormCard";
import { AuthSubmitButton } from "@/components/auth/AuthFormActions";
import { useForgotPasswordForm } from "@/components/auth/use-forgot-password-form";
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
          {forgotPasswordForm.isSubmitting ?"Enviando..." : "Enviar instruções"}
        </AuthSubmitButton>
      </form>
    </AuthFormCard>
  );
}
