"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { LoginBrandPanel } from "@/components/auth/LoginBrandPanel";
import { LoginFormPanel } from "@/components/auth/LoginFormPanel";
import { useLoginForm } from "@/components/auth/use-login-form";
import { SurfaceCard } from "@/components/ui/SurfaceCard";
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
    <main className="grid min-h-screen bg-[var(--color-background)] lg:grid-cols-[minmax(0,1.08fr)_minmax(420px,0.92fr)]">
      <LoginBrandPanel />
      <LoginFormPanel
        email={loginForm.email}
        errorMessage={loginForm.errorMessage}
        isPasswordVisible={loginForm.isPasswordVisible}
        isSubmitting={loginForm.isSubmitting}
        motivoFeedback={motivoFeedback}
        onEmailChange={loginForm.setEmail}
        onPasswordChange={loginForm.setPassword}
        onSubmit={loginForm.handleSubmit}
        onThemeToggle={() => setTheme(theme === "dark" ? "light" : "dark")}
        onTogglePasswordVisibility={loginForm.togglePasswordVisibility}
        password={loginForm.password}
        theme={theme}
      />
    </main>
  );
}
