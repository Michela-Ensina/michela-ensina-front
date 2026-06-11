"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { StudentShell } from "@/components/layout/StudentShell";
import { Alert } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SurfaceCard } from "@/components/ui/SurfaceCard";
import { completePreviewFirstAccess } from "@/lib/pre-integration/student-preview";

export default function PrimeiroAcessoPage() {
  const router = useRouter();
  const [token, setToken] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);

    if (!token.trim()) {
      const message = "Código de acesso obrigatório.";
      setErrorMessage(message);
      toast.error(message);
      return;
    }

    if (!password) {
      const message = "Informe a nova senha.";
      setErrorMessage(message);
      toast.error(message);
      return;
    }

    if (!passwordConfirmation) {
      const message = "Confirme a nova senha.";
      setErrorMessage(message);
      toast.error(message);
      return;
    }

    if (password.length < 8) {
      const message = "A senha deve ter pelo menos 8 caracteres.";
      setErrorMessage(message);
      toast.error(message);
      return;
    }

    if (password !== passwordConfirmation) {
      const message = "As senhas não coincidem.";
      setErrorMessage(message);
      toast.error(message);
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await completePreviewFirstAccess({
        token: token.trim(),
        password,
        password_confirmation: passwordConfirmation,
      });
      setSuccessMessage(response.message);
      toast.success(response.message);
      router.replace("/login?motivo=primeiro-acesso");
    } catch {
      const message = "Não foi possível simular o primeiro acesso.";
      setErrorMessage(message);
      toast.error(message);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <StudentShell>
      <SurfaceCard className="mx-auto w-full max-w-md p-6 sm:p-7">
        <h1 className="text-3xl">Primeiro acesso</h1>
        <p className="mt-2 text-sm" style={{ color: "var(--color-text-muted)" }}>
          Defina sua senha inicial para validar a entrada na área do aluno.
        </p>

        {errorMessage ? <Alert tone="error">{errorMessage}</Alert> : null}
        {successMessage ? <Alert tone="success">{successMessage}</Alert> : null}

        <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
          <div className="block">
            <Label htmlFor="token">Token de primeiro acesso</Label>
            <Input id="token" type="text" value={token} onChange={(event) => setToken(event.target.value)} placeholder="Token recebido por e-mail" />
          </div>
          <div className="block">
            <Label htmlFor="password">Nova senha</Label>
            <Input id="password" type="password" value={password} onChange={(event) => setPassword(event.target.value)} placeholder="Nova senha" />
          </div>
          <div className="block">
            <Label htmlFor="passwordConfirmation">Confirmar nova senha</Label>
            <Input id="passwordConfirmation" type="password" value={passwordConfirmation} onChange={(event) => setPasswordConfirmation(event.target.value)} placeholder="Confirmar nova senha" />
          </div>

          <Button type="submit" disabled={isSubmitting} variant="primary" fullWidth style={{ opacity: isSubmitting ? 0.75 : 1 }}>
            {isSubmitting ? "Concluindo..." : "Concluir primeiro acesso"}
          </Button>
        </form>

        <div className="mt-4 text-sm">
          <Link href="/login" style={{ color: "var(--color-text-muted)" }}>
            Ir para login
          </Link>
        </div>
      </SurfaceCard>
    </StudentShell>
  );
}
