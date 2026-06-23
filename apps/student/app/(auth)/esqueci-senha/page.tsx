"use client";

import { useState } from "react";
import { toast } from "sonner";

import { AuthLoginLink, AuthSubmitButton } from "@/components/auth/AuthFormActions";
import { StudentLayout } from "@/components/layout/StudentLayout";
import { Alert } from "@/components/ui/alert";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SurfaceCard } from "@/components/ui/SurfaceCard";
import { forgotPassword } from "@/lib/api/auth";
import { ApiClientError } from "@/lib/api/errors";

export default function EsqueciSenhaPage() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  function isValidEmail(value: string) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  }

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
    <StudentLayout>
      <SurfaceCard className="mx-auto w-full max-w-md p-6 sm:p-7">
        <h1 className="text-3xl">Esqueci minha senha</h1>
        <p className="mt-2 text-sm" style={{ color: "var(--color-text-muted)" }}>
          Informe seu e-mail para receber as instruções de recuperação.
        </p>

        {errorMessage ? <Alert tone="error">{errorMessage}</Alert> : null}
        {successMessage ? <Alert tone="success">{successMessage}</Alert> : null}

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

        <AuthLoginLink>Voltar para login</AuthLoginLink>
      </SurfaceCard>
    </StudentLayout>
  );
}
