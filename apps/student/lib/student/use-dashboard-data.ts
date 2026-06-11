"use client";

import { useCallback, useEffect, useState } from "react";

import { getPreviewDashboardData } from "@/lib/pre-integration/student-preview";
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
  const [data, setData] = useState<DashboardData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    setErrorMessage(null);

    try {
      setData(getPreviewDashboardData());
    } catch {
      setErrorMessage("Não foi possível carregar o dashboard de pré-integração.");
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

  const isEmpty = (data?.materials.length ?? 0) === 0;

  return {
    data,
    isLoading,
    errorMessage,
    isEmpty,
    refetch: fetchData,
  };
}
