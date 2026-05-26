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
  const { token, logout } = useAuth();
  const [data, setData] = useState<MaterialsData | null>(null);
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
      const [materials, progress] = await Promise.all([getMaterials(token), getProgress(token)]);
      setData({ materials, progress });
    } catch (error) {
      if (error instanceof ApiClientError && (error.status === 401 || error.status === 403)) {
        setErrorMessage("Sua sessão expirou. Faça login novamente.");
        await logout();
      } else {
        setErrorMessage("Não foi possível carregar os materiais agora.");
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
    isEmpty: (data?.materials.length ?? 0) === 0,
    refetch: fetchData,
  };
}
