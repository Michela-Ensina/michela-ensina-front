"use client";

import { useCallback, useEffect, useState } from "react";

import { ApiClientError } from "@/lib/api/errors";
import { getMaterials } from "@/lib/api/materials";
import { getProgress } from "@/lib/api/progress";
import { getCurrentStudent } from "@/lib/api/student";
import { useAuth } from "@/lib/auth/use-auth";
import type { Material, ProgressSummary, User } from "@/types/student";

type DashboardData = {
  student: User;
  progress: ProgressSummary;
  materials: Material[];
};

type UseDashboardDataResult = {
  data: DashboardData | null;
  isLoading: boolean;
  errorMessage: string | null;
  isEmpty: boolean;
  refetch: () => Promise<void>;
};

export function useDashboardData(): UseDashboardDataResult {
  const { token, logout } = useAuth();
  const [data, setData] = useState<DashboardData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    if (!token) {
      setData(null);
      setErrorMessage("Sessão inválida. Faça login novamente.");
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setErrorMessage(null);

    try {
      const [student, progress, materials] = await Promise.all([
        getCurrentStudent(token),
        getProgress(token),
        getMaterials(token),
      ]);

      setData({ student, progress, materials });
    } catch (error) {
      if (error instanceof ApiClientError && (error.status === 401 || error.status === 403)) {
        setErrorMessage("Sua sessão expirou. Faça login novamente.");
        await logout();
      } else {
        setErrorMessage("Não foi possível carregar o dashboard agora.");
      }

      setData(null);
    } finally {
      setIsLoading(false);
    }
  }, [logout, token]);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      void fetchData();
    }, 0);

    return () => {
      window.clearTimeout(timer);
    };
  }, [fetchData]);

  const isEmpty = (data?.materials.length ?? 0) === 0;

  return {
    data,
    isLoading,
    errorMessage,
    isEmpty,
    refetch: fetchData,
  };
}
