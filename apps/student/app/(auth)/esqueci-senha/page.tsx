"use client";

import { useState } from "react";
import { toast } from "sonner";

import { AuthFormCard } from "@/components/auth/AuthFormCard";
import { AuthSubmitButton } from "@/components/auth/AuthFormActions";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { forgotPassword } from "@/lib/api/auth";
import { ApiClientError } from "@/lib/api/errors";
import { isValidEmail } from "@/lib/utils/validation";

export default function EsqueciSenhaPage() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);

    if (!email.trim()) {
      const message = "Informe seu e-mail.";
      setErrorMessage(message);
      toast.error(message);
      return;
    }

    if (!isValidEmail(email.trim())) {
      const message = "Digite um e-mail válido.";
      setErrorMessage(message);
      toast.error(message);
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await forgotPassword({ email: email.trim() });
      setSuccessMessage(response.message);
      toast.success(response.message);
    } catch (error) {
      const message =
        error instanceof ApiClientError
          ? error.message
          : "Não foi possível enviar as instruções agora.";
      setErrorMessage(message);
      toast.error(message);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <AuthFormCard
      title="Esqueci minha senha"
      description="Informe seu e-mail para receber as instruções de recuperação."
      errorMessage={errorMessage}
      successMessage={successMessage}
      loginLinkLabel="Voltar para login"
    >
      <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
        <div className="block">
          <Label htmlFor="email">E-mail</Label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="seuemail@exemplo.com"
          />
        </div>

        <AuthSubmitButton isSubmitting={isSubmitting}>
          {isSubmitting ? "Enviando..." : "Enviar instruções"}
        </AuthSubmitButton>
      </form>
    </AuthFormCard>
  );
}
