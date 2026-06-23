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
  const { token, isLoading: isAuthLoading, logout } = useAuth();
  const [data, setData] = useState<ProgressSummary | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    if (isAuthLoading) {
      return;
    }

    setIsLoading(true);
    setErrorMessage(null);

    try {
      if (!token) {
        throw new Error("Sua sessão não está disponível.");
      }

      setData(await getProgress(token));
    } catch (error) {
      if (error instanceof ApiClientError && error.status === 401) {
        await logout();
      }

      setErrorMessage(
        error instanceof Error ? error.message : "Não foi possível carregar o progresso.",
      );
      setData(null);
    } finally {
      setIsLoading(false);
    }
  }, [isAuthLoading, logout, token]);

  useEffect(() => {
    if (isAuthLoading) {
      return;
    }

    const timer = window.setTimeout(() => {
      void fetchData();
    }, 0);

    return () => {
      window.clearTimeout(timer);
    };
  }, [fetchData, isAuthLoading]);

  return {
    data,
    isLoading,
    errorMessage,
    isEmpty: (data?.total_materials ?? 0) === 0,
    refetch: fetchData,
  };
}
