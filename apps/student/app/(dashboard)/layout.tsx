"use client";

import type { ReactNode } from "react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";

import { StudentAppShell } from "@/components/layout/StudentAppShell";
import { useAuth } from "@/lib/auth/use-auth";

type DashboardLayoutProps = {
  children: ReactNode;
};

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const { isAuthenticated, isLoading } = useAuth();
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.replace("/login?motivo=sessao-expirada");
    }
  }, [isAuthenticated, isLoading, router]);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center px-4">
        <p style={{ color: "var(--color-text-muted)" }}>Verificando sessão...</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return <StudentAppShell pathname={pathname}>{children}</StudentAppShell>;
}
