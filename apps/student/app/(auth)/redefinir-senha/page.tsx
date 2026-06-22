"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { StudentLayout } from "@/components/layout/StudentLayout";
import { Alert } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SurfaceCard } from "@/components/ui/SurfaceCard";
import { resetPassword } from "@/lib/api/auth";
import { ApiClientError } from "@/lib/api/errors";
import {
  PRE_INTEGRATION_PREVIEW_ENABLED,
  resetPreviewPassword,
} from "@/lib/pre-integration/student-preview";

export default function RedefinirSenhaPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [token, setToken] = useState(() => {
    if (typeof window === "undefined") return "";
    const params = new URLSearchParams(window.location.search);
    return params.get("token") ?? "";
  });
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
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
      const message = "A nova senha deve ter pelo menos 8 caracteres.";
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
      const payload = {
        email: email.trim(),
        token: token.trim(),
        password,
        password_confirmation: passwordConfirmation,
      };
      const response = PRE_INTEGRATION_PREVIEW_ENABLED
        ? await resetPreviewPassword(payload)
        : await resetPassword(payload);
      setSuccessMessage(response.message);
      toast.success(response.message);
      router.replace("/login?motivo=senha-redefinida");
    } catch (error) {
      const message =
        error instanceof ApiClientError
          ? error.fields?.token?.[0] ?? error.fields?.password?.[0] ?? error.message
          : "Não foi possível redefinir a senha agora.";
      setErrorMessage(message);
      toast.error(message);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <StudentLayout>
      <SurfaceCard className="mx-auto w-full max-w-md p-6 sm:p-7">
        <h1 className="text-3xl">Redefinir senha</h1>
        <p className="mt-2 text-sm" style={{ color: "var(--color-text-muted)" }}>
          Informe os dados recebidos por e-mail para redefinir sua senha.
        </p>

        {errorMessage ? <Alert tone="error">{errorMessage}</Alert> : null}
        {successMessage ? <Alert tone="success">{successMessage}</Alert> : null}

        <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
          <div className="block">
            <Label htmlFor="email">E-mail</Label>
            <Input id="email" type="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="seuemail@exemplo.com" />
          </div>
          <div className="block">
            <Label htmlFor="token">Token de redefinição</Label>
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
            {isSubmitting ? "Redefinindo..." : "Redefinir senha"}
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
