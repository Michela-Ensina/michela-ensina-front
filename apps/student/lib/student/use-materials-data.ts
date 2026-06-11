"use client";

import { useCallback, useEffect, useState } from "react";

import { getPreviewMaterialsData } from "@/lib/pre-integration/student-preview";
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
  const [data, setData] = useState<MaterialsData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    setErrorMessage(null);

    try {
      setData(getPreviewMaterialsData());
    } catch {
      setErrorMessage("Não foi possível carregar os materiais de pré-integração.");
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
    isEmpty: (data?.materials.length ?? 0) === 0,
    refetch: fetchData,
  };
}
