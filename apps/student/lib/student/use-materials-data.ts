"use client";

import { useCallback, useEffect, useState } from "react";

import { ApiClientError } from "@/lib/api/errors";
import { getMaterials } from "@/lib/api/materials";
import { getProgress } from "@/lib/api/progress";
import { useAuth } from "@/lib/auth/use-auth";
import type { Material, ProgressSummary } from "@/types/student";

type MaterialsData = {
  materials: Material[];
  progress: ProgressSummary | null;
};

type UseMaterialsDataResult = {
  data: MaterialsData | null;
  isLoading: boolean;
  errorMessage: string | null;
  isEmpty: boolean;
  refetch: () => Promise<void>;
};

export function useMaterialsData(): UseMaterialsDataResult {
  const { token, isLoading: isAuthLoading, logout } = useAuth();
  const [data, setData] = useState<MaterialsData | null>(null);
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

      const [materials, progress] = await Promise.all([
        getMaterials(token),
        getProgress(token),
      ]);

      setData({ materials, progress });
    } catch (error) {
      if (error instanceof ApiClientError && error.status === 401) {
        await logout();
      }

      setErrorMessage(
        error instanceof Error ? error.message : "Não foi possível carregar os materiais.",
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
    isEmpty: (data?.materials.length ?? 0) === 0,
    refetch: fetchData,
  };
}
