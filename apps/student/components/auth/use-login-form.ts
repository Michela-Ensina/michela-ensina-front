import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { ApiClientError } from "@/lib/api/errors";
import { isValidEmail } from "@/lib/utils/validation";
import type { AuthLoginPayload } from "@/types/auth";

type Login = (payload: AuthLoginPayload) => Promise<{ mustChangePassword: boolean }>;

export function useLoginForm(login: Login) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  function togglePasswordVisibility() {
    setIsPasswordVisible((current) => !current);
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setErrorMessage(null);

    if (!email.trim()) {
      setErrorMessage("Informe seu e-mail.");
      toast.error("Informe seu e-mail para entrar.");
      return;
    }

    if (!isValidEmail(email.trim())) {
      setErrorMessage("Digite um e-mail válido.");
      toast.error("Digite um e-mail válido.");
      return;
    }

    if (!password) {
      setErrorMessage("Informe sua senha.");
      toast.error("Informe sua senha para entrar.");
      return;
    }

    setIsSubmitting(true);

    try {
      const result = await login({ email: email.trim(), password });

      if (result.mustChangePassword) {
        toast.info("Atualize sua senha para continuar.");
        router.replace("/alterar-senha");
        return;
      }

      toast.success("Login realizado com sucesso.");
      router.replace("/dashboard");
    } catch (error) {
      if (
        error instanceof ApiClientError &&
        (error.status === 401 || error.status === 422)
      ) {
        const message = "E-mail ou senha inválidos. Verifique os dados e tente novamente.";
        setErrorMessage(message);
        toast.error(message);
      } else if (error instanceof ApiClientError && error.status >= 500) {
        const message = "Não foi possível conectar ao servidor. Verifique sua conexão e tente novamente.";
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

  return {
    email,
    password,
    isPasswordVisible,
    isSubmitting,
    errorMessage,
    handleSubmit,
    setEmail,
    setPassword,
    togglePasswordVisibility,
  };
}
