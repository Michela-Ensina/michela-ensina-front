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
import { ApiClientError } from "@/lib/api/errors";
import { resetPassword } from "@/lib/api/auth";

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
      setErrorMessage("A nova senha deve ter pelo menos 8 caracteres.");
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
      const response = await resetPassword({
        email: email.trim(),
        token: token.trim(),
        password,
        password_confirmation: passwordConfirmation,
      });

      const message = response.message || "Senha redefinida com sucesso. Você já pode entrar.";
      setSuccessMessage(message);
      toast.success(message);
      router.replace("/login?motivo=senha-redefinida");
    } catch (error) {
      if (error instanceof ApiClientError) {
        const message =
          error.status >= 500
            ? "Não foi possível conectar ao servidor. Verifique sua conexão e tente novamente."
            : "Não foi possível redefinir a senha.";
        setErrorMessage(message);
        toast.error(message);
      } else if (error instanceof TypeError) {
        const message = "Não foi possível conectar ao servidor. Verifique sua conexão e tente novamente.";
        setErrorMessage(message);
        toast.error(message);
      } else {
        const message = "Ocorreu um erro inesperado. Tente novamente.";
        setErrorMessage(message);
        toast.error(message);
      }
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <StudentShell>
      <SurfaceCard className="mx-auto w-full max-w-md p-6 sm:p-7">
        <h1 className="text-3xl">Redefinir senha</h1>
        <p className="mt-2 text-sm" style={{ color: "var(--color-text-muted)" }}>
          Informe os dados para concluir a redefinição da sua senha.
        </p>

        {errorMessage ? (
          <Alert tone="error">{errorMessage}</Alert>
        ) : null}

        {successMessage ? (
          <Alert tone="success">{successMessage}</Alert>
        ) : null}

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

          <Button
            type="submit"
            disabled={isSubmitting}
            variant="primary"
            fullWidth
            style={{ opacity: isSubmitting ? 0.75 : 1 }}
          >
            {isSubmitting ? "Redefinindo..." : "Redefinir senha"}
          </Button>
        </form>

        <div className="mt-4 text-sm">
          <Link href="/login" style={{ color: "var(--color-text-muted)" }}>
            Voltar para login
          </Link>
        </div>
      </SurfaceCard>
    </StudentShell>
  );
}
