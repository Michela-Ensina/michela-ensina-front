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
      <div className="mx-auto flex min-h-screen w-full max-w-6xl flex-col gap-6 px-5 py-8 sm:px-8">
        <div className="h-10 w-44 animate-pulse rounded-lg bg-[var(--color-surface-soft)]" />
        <div className="grid flex-1 gap-5 lg:grid-cols-[220px_1fr]">
          <div className="hidden animate-pulse rounded-[var(--radius-md)] bg-[var(--color-surface)] lg:block" />
          <div className="space-y-5">
            <div className="h-24 animate-pulse rounded-[var(--radius-md)] bg-[var(--color-surface)]" />
            <div className="h-72 animate-pulse rounded-[var(--radius-md)] bg-[var(--color-surface)]" />
          </div>
        </div>
      </div>
    );
  }

  if (!isAuthenticated || user?.must_change_password) {
    return null;
  }

  return <StudentAppLayout pathname={pathname}>{children}</StudentAppLayout>;
}
