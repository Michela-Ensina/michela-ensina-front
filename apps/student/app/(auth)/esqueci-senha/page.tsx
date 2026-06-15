"use client";

import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";

import { StudentLayout } from "@/components/layout/StudentLayout";
import { Alert } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SurfaceCard } from "@/components/ui/SurfaceCard";
import { requestPreviewPasswordReset } from "@/lib/pre-integration/student-preview";

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
      const response = await requestPreviewPasswordReset({ email: email.trim() });
      setSuccessMessage(response.message);
      toast.success(response.message);
    } catch {
      const message = "Não foi possível simular o envio das instruções.";
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
          Informe seu e-mail para validar o fluxo de recuperação.
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

          <Button type="submit" disabled={isSubmitting} variant="primary" fullWidth style={{ opacity: isSubmitting ? 0.75 : 1 }}>
            {isSubmitting ? "Enviando..." : "Enviar instruções"}
          </Button>
        </form>

        <div className="mt-4 text-sm">
          <Link href="/login" className="student-text-action rounded-lg px-2 py-1" style={{ color: "var(--color-text-muted)" }}>
            Voltar para login
          </Link>
        </div>
      </SurfaceCard>
    </StudentLayout>
  );
}
