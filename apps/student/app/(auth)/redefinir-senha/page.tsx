"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { AuthFormCard } from "@/components/auth/AuthFormCard";
import { AuthSubmitButton } from "@/components/auth/AuthFormActions";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { resetPassword } from "@/lib/api/auth";
import { ApiClientError } from "@/lib/api/errors";
import { isValidEmail } from "@/lib/utils/validation";

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
      const response = await resetPassword(payload);
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
    <AuthFormCard
      title="Redefinir senha"
      description="Informe os dados recebidos por e-mail para redefinir sua senha."
      errorMessage={errorMessage}
      successMessage={successMessage}
      loginLinkLabel="Voltar para login"
    >
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

        <AuthSubmitButton isSubmitting={isSubmitting}>
          {isSubmitting ? "Redefinindo..." : "Redefinir senha"}
        </AuthSubmitButton>
      </form>
    </AuthFormCard>
  );
}
