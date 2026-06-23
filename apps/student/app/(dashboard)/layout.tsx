"use client";

import type { ReactNode } from "react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";

import { StudentAppLayout } from "@/components/layout/StudentAppLayout";
import { useAuth } from "@/lib/auth/use-auth";

type DashboardLayoutProps = {
  children: ReactNode;
};

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const { isAuthenticated, isLoading, sessionExpired, user } = useAuth();
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.replace(sessionExpired ? "/login?motivo=sessao-expirada" : "/login");
      return;
    }

    if (!isLoading && isAuthenticated && user?.must_change_password) {
      router.replace("/alterar-senha");
    }
  }, [isAuthenticated, isLoading, router, sessionExpired, user?.must_change_password]);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center px-4">
        <p style={{ color: "var(--color-text-muted)" }}>Verificando sessão...</p>
      </div>
    );
  }

  if (!isAuthenticated || user?.must_change_password) {
    return null;
  }

  return <StudentAppLayout pathname={pathname}>{children}</StudentAppLayout>;
}
