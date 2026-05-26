"use client";

import { useCallback, useEffect, useState } from "react";

import { ApiClientError } from "@/lib/api/errors";
import { getProgress } from "@/lib/api/progress";
import { useAuth } from "@/lib/auth/use-auth";
import type { ProgressSummary } from "@/types/student";

type UseProgressDataResult = {
  data: ProgressSummary | null;
  isLoading: boolean;
  errorMessage: string | null;
  isEmpty: boolean;
  refetch: () => Promise<void>;
};

export function useProgressData(): UseProgressDataResult {
  const { token, logout } = useAuth();
  const [data, setData] = useState<ProgressSummary | null>(null);
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
      const progress = await getProgress(token);
      setData(progress);
    } catch (error) {
      if (error instanceof ApiClientError && (error.status === 401 || error.status === 403)) {
        setErrorMessage("Sua sessão expirou. Faça login novamente.");
        await logout();
      } else {
        setErrorMessage("Não foi possível carregar o progresso agora.");
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

  return {
    data,
    isLoading,
    errorMessage,
    isEmpty: (data?.total_materials ?? 0) === 0,
    refetch: fetchData,
  };
}
