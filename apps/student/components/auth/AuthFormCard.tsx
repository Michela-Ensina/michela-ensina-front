import type { ReactNode } from "react";

import { AuthCardHeader } from "@/components/auth/AuthCardHeader";
import { AuthLoginLink } from "@/components/auth/AuthFormActions";
import { StudentLayout } from "@/components/layout/StudentLayout";
import { Alert } from "@/components/ui/alert";
import { SurfaceCard } from "@/components/ui/SurfaceCard";

type AuthFormCardProps = {
  children: ReactNode;
  description: string;
  errorMessage?: string | null;
  loginLinkLabel: string;
  successMessage?: string | null;
  title: string;
};

export function AuthFormCard({
  children,
  description,
  errorMessage,
  loginLinkLabel,
  successMessage,
  title,
}: AuthFormCardProps) {
  return (
    <StudentLayout>
      <SurfaceCard className="mx-auto w-full max-w-md p-6 sm:p-7">
        <AuthCardHeader title={title} description={description} />

        {errorMessage ?<Alert tone="error">{errorMessage}</Alert> : null}
        {successMessage ?<Alert tone="success">{successMessage}</Alert> : null}

        {children}

        <AuthLoginLink>{loginLinkLabel}</AuthLoginLink>
      </SurfaceCard>
    </StudentLayout>
  );
}
