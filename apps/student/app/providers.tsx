"use client";

import { SWRConfig } from "swr";

import { AuthProvider } from "@/lib/auth/session";
import { studentDataCacheConfig } from "@/lib/student/student-data-cache";
import { ThemeProvider } from "@/lib/theme/theme-provider";
import { Toaster } from "@/components/ui/sonner";

type ProvidersProps = {
  children: React.ReactNode;
};

export function Providers({ children }: ProvidersProps) {
  return (
    <ThemeProvider>
      <AuthProvider>
        <SWRConfig value={studentDataCacheConfig}>
          {children}
          <Toaster />
        </SWRConfig>
      </AuthProvider>
    </ThemeProvider>
  );
}
