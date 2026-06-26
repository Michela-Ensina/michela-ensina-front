import Image from "next/image";
import Link from "next/link";
import type { FormEvent } from "react";

import { Alert } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PasswordInput } from "@/components/ui/PasswordInput";
import { SurfaceCard } from "@/components/ui/SurfaceCard";
import { ThemeToggleButton } from "@/components/ui/ThemeToggleButton";
import type { LoginMotivoFeedback } from "@/lib/auth/login-motivo";
import type { ThemeMode } from "@/lib/theme/theme";

type LoginFormPanelProps = {
  email: string;
  errorMessage: string | null;
  isPasswordVisible: boolean;
  isSubmitting: boolean;
  motivoFeedback: LoginMotivoFeedback | null;
  onEmailChange: (value: string) => void;
  onPasswordChange: (value: string) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  onThemeToggle: () => void;
  onTogglePasswordVisibility: () => void;
  password: string;
  theme: ThemeMode;
};

export function LoginFormPanel({
  email,
  errorMessage,
  isPasswordVisible,
  isSubmitting,
  motivoFeedback,
  onEmailChange,
  onPasswordChange,
  onSubmit,
  onThemeToggle,
  onTogglePasswordVisibility,
  password,
  theme,
}: LoginFormPanelProps) {
  return (
    <section className="relative flex min-h-screen flex-1 flex-col bg-(--color-background) px-5 py-6 lg:h-dvh lg:min-h-0 lg:overflow-hidden lg:[@media_(max-height:760px)]:py-4">
      <div className="flex justify-end">
        <ThemeToggleButton theme={theme} mode="icon" onToggle={onThemeToggle} />
      </div>

      <Image
        src="/assets/brand/graphics/estrela-lilas.svg"
        alt=""
        width={42}
        height={42}
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-[5%] hidden -translate-x-1/2 opacity-15 sm:block lg:[@media_(max-height:760px)]:hidden xl:top-[15%]"
      />

      <div className="mx-auto flex w-full max-w-md flex-1 flex-col items-center justify-center py-8 lg:[@media_(max-height:760px)]:py-3">
        <Image
          src={
            theme === "dark"
              ? "/assets/brand/logos/SIMBOLO-BRANCO.svg"
              : "/assets/brand/logos/SIMBOLO-ROXO-ESCURO.svg"
          }
          alt="Símbolo Michela Ensina"
          width={40}
          height={24}
          className="mb-6 opacity-65 lg:hidden"
          priority
        />

        <SurfaceCard
          className="w-full rounded-3xl p-6 shadow-(--shadow-brand) sm:p-8 lg:[@media_(max-height:760px)]:p-6"
          style={{
            borderColor:
              "color-mix(in oklab, var(--color-border) 78%, var(--color-primary))",
            backgroundColor: "var(--color-surface)",
          }}
        >
          <h2 className="text-center text-4xl leading-tight lg:[@media_(max-height:760px)]:text-3xl">
            Entrar
          </h2>
          <p className="student-muted-text mt-2 text-center text-sm">
            Acesse sua conta para continuar seus estudos.
          </p>

          {motivoFeedback ? (
            <Alert
              tone={motivoFeedback.tone === "success" ? "success" : "default"}
            >
              {motivoFeedback.message}
            </Alert>
          ) : null}

          {errorMessage ? <Alert tone="error">{errorMessage}</Alert> : null}

          <form
            className="mt-7 space-y-5 lg:[@media_(max-height:760px)]:mt-5 lg:[@media_(max-height:760px)]:space-y-4"
            onSubmit={onSubmit}
          >
            <div>
              <Label htmlFor="email">E-mail</Label>
              <Input
                id="email"
                type="email"
                name="email"
                value={email}
                onChange={(event) => onEmailChange(event.target.value)}
                placeholder="seuemail@exemplo.com"
              />
            </div>

            <div>
              <Label htmlFor="password">Senha</Label>
              <PasswordInput
                id="password"
                name="password"
                value={password}
                onChange={(event) => onPasswordChange(event.target.value)}
                placeholder="Digite sua senha"
                isVisible={isPasswordVisible}
                onToggleVisibility={onTogglePasswordVisibility}
              />
            </div>

            <Button
              type="submit"
              disabled={isSubmitting}
              variant="primary"
              fullWidth
              size="lg"
              className="mt-1 shadow-[0_8px_18px_rgb(77_35_117/0.28)] disabled:opacity-75"
              style={{
                backgroundImage:
                  "linear-gradient(135deg, var(--me-purple-dark), var(--me-purple))",
              }}
            >
              {isSubmitting ? "Entrando..." : "Entrar"}
            </Button>
          </form>

          <div className="mt-6 flex flex-col items-center gap-3 text-sm lg:[@media_(max-height:760px)]:mt-4 lg:[@media_(max-height:760px)]:gap-2">
            <Link
              href="/esqueci-senha"
              className="student-text-action rounded-lg px-2 py-1 font-semibold text-(--color-text-muted)"
            >
              Esqueci minha senha
            </Link>
            <span
              aria-hidden="true"
              className="h-px w-32 bg-(--color-border)"
            />
            <Link
              href="/primeiro-acesso"
              className="student-text-action rounded-lg px-2 py-1 font-bold text-(--color-primary)"
            >
              Primeiro acesso
            </Link>
          </div>
        </SurfaceCard>

        <p className="student-muted-text mt-6 pt-6 text-center text-xs lg:[@media_(max-height:760px)]:mt-4">
          © 2024 Michela Ensina · Todos os direitos reservados
        </p>
      </div>
    </section>
  );
}
