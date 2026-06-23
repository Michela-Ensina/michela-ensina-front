"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { toast } from "sonner";

import { useLoginForm } from "@/components/auth/use-login-form";
import { Alert } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PasswordInput } from "@/components/ui/PasswordInput";
import { SurfaceCard } from "@/components/ui/SurfaceCard";
import { ThemeToggleButton } from "@/components/ui/ThemeToggleButton";
import { getLoginMotivoFeedback } from "@/lib/auth/login-motivo";
import { useAuth } from "@/lib/auth/use-auth";
import { useTheme } from "@/lib/theme/use-theme";

export default function LoginPage() {
  const { isAuthenticated, isLoading, login, user } = useAuth();
  const { theme, setTheme } = useTheme();
  const router = useRouter();

  const loginForm = useLoginForm(login);
  const [motivo] = useState(() => {
    if (typeof window === "undefined") {
      return "";
    }

    const params = new URLSearchParams(window.location.search);
    return params.get("motivo") ?? "";
  });

  const motivoFeedback = useMemo(() => getLoginMotivoFeedback(motivo), [motivo]);

  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      router.replace(user?.must_change_password ? "/alterar-senha" : "/dashboard");
    }
  }, [isAuthenticated, isLoading, router, user?.must_change_password]);

  useEffect(() => {
    if (!motivoFeedback) {
      return;
    }

    if (motivoFeedback.tone === "info") {
      toast.info(motivoFeedback.message);
      return;
    }

    toast.success(motivoFeedback.message);
  }, [motivoFeedback]);

  if (isLoading) {
    return (
      <main className="mx-auto flex min-h-screen w-full max-w-lg flex-col items-center justify-center px-4 py-10">
        <SurfaceCard className="mx-auto w-full max-w-md p-6 sm:p-7">
          <p style={{ color: "var(--color-text-muted)" }}>
            Verificando sessão...
          </p>
        </SurfaceCard>
      </main>
    );
  }

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-xl flex-col items-center justify-center px-4 py-10">
      <div className="mb-4 flex w-full justify-end">
        <ThemeToggleButton
          theme={theme}
          mode="icon"
          className="transition-all duration-300 ease-out hover:scale-[1.03]"
          onToggle={() => setTheme(theme === "dark" ? "light" : "dark")}
        />
      </div>

      <header className="mb-7 flex flex-col items-center gap-4 text-center">
        <Image
          src={
            theme === "dark"
              ? "/assets/brand/logos/LOGO-HORIZONTAL-BRANCA.svg"
              : "/assets/brand/logos/LOGO-HORIZONTAL-ROXO-ESCURO.svg"
          }
          alt="Michela Ensina"
          width={220}
          height={66}
          priority
        />
      </header>

      <SurfaceCard
        className="mx-auto w-full max-w-md rounded-b-[var(--radius-lg)] rounded-t-none p-6 sm:p-8"
        style={{
          borderColor:
            "color-mix(in oklab, var(--color-border) 55%, transparent)",
          backgroundColor:
            "color-mix(in oklab, var(--color-surface) 88%, transparent)",
        }}
      >
        <div
          aria-hidden="true"
          className="-mx-6 -mt-8 mb-6 h-[2px] sm:-mx-8"
          style={{
            background:
              "linear-gradient(90deg, color-mix(in oklab, var(--color-primary) 70%, transparent), color-mix(in oklab, var(--color-accent) 70%, transparent))",
          }}
        />

        <h1 className="text-center text-4xl font-medium">Entrar</h1>
        <p
          className="mt-2 text-center text-base"
          style={{ color: "var(--color-text-muted)" }}
        >
          Acesse sua conta para continuar seus estudos.
        </p>

        {motivoFeedback ? (
          <Alert tone={motivoFeedback.tone === "success" ? "success" : "default"}>
            {motivoFeedback.message}
          </Alert>
        ) : null}

        {loginForm.errorMessage ? (
          <Alert tone="error">{loginForm.errorMessage}</Alert>
        ) : null}

        <form className="mt-6 space-y-5" onSubmit={loginForm.handleSubmit}>
          <div className="block">
            <Label htmlFor="email">E-mail</Label>
            <Input
              id="email"
              type="email"
              name="email"
              value={loginForm.email}
              onChange={(event) => loginForm.setEmail(event.target.value)}
              placeholder="seuemail@exemplo.com"
            />
          </div>

          <div className="block">
            <Label htmlFor="password">Senha</Label>
            <PasswordInput
              id="password"
              name="password"
              value={loginForm.password}
              onChange={(event) => loginForm.setPassword(event.target.value)}
              placeholder="Digite sua senha"
              isVisible={loginForm.isPasswordVisible}
              onToggleVisibility={loginForm.togglePasswordVisibility}
            />
          </div>

          <Button
            type="submit"
            disabled={loginForm.isSubmitting}
            variant="primary"
            fullWidth
            size="lg"
            className="mt-2"
            style={{
              opacity: loginForm.isSubmitting ? 0.75 : 1,
            }}
          >
            {loginForm.isSubmitting ? "Entrando..." : "Entrar"}
          </Button>
        </form>

        <div className="mt-6 flex flex-col items-center gap-3 text-sm">
          <Link
            href="/esqueci-senha"
            className="student-text-action rounded-lg px-2 py-1 font-semibold"
            style={{ color: "var(--color-text-muted)" }}
          >
            Esqueci minha senha
          </Link>
          <Link
            href="/primeiro-acesso"
            className="student-text-action rounded-lg px-2 py-1 font-semibold"
            style={{ color: "var(--color-primary)" }}
          >
            Primeiro acesso
          </Link>
        </div>
      </SurfaceCard>

      <div className="mt-6 flex items-center justify-center gap-2.5">
        <Image
          src={
            theme === "dark"
              ? "/assets/brand/logos/SIMBOLO-BRANCO.svg"
              : "/assets/brand/logos/SIMBOLO-ROXO-ESCURO.svg"
          }
          alt="Símbolo Michela Ensina"
          width={30}
          height={16}
          style={{ opacity: 0.7 }}
        />
        <p
          className="text-center text-xs"
          style={{
            color:
              "color-mix(in oklab, var(--color-text-muted) 75%, transparent)",
          }}
        >
          © 2024 Michela Ensina
        </p>
      </div>
    </main>
  );
}
