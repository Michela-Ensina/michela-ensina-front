"use client";

import { useCallback, useEffect, useState } from "react";

import { getPreviewProgress } from "@/lib/pre-integration/student-preview";
import type { ProgressSummary } from "@/types/student";

type UseProgressDataResult = {
  data: ProgressSummary | null;
  isLoading: boolean;
  errorMessage: string | null;
  isEmpty: boolean;
  refetch: () => Promise<void>;
};

export function useProgressData(): UseProgressDataResult {
  const [data, setData] = useState<ProgressSummary | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    setErrorMessage(null);

    try {
      setData(getPreviewProgress());
    } catch {
      setErrorMessage("Não foi possível carregar o progresso de pré-integração.");
      setData(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

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
