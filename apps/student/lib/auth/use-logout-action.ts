"use client";

import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { useAuth } from "@/lib/auth/use-auth";

export function useLogoutAction() {
  const { logout } = useAuth();
  const router = useRouter();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const logoutFromStudentArea = useCallback(async () => {
    setIsLoggingOut(true);

    try {
      await logout();
      toast.info("Você saiu da sua conta.");
      router.replace("/login");
    } finally {
      setIsLoggingOut(false);
    }
  }, [logout, router]);

  return { isLoggingOut, logoutFromStudentArea };
}
