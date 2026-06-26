import { useCallback, useEffect, useState } from "react";

import { ApiClientError } from "@/lib/api/errors";
import { getMaterialById } from "@/lib/api/materials";
import { getProgress, updateMaterialProgress } from "@/lib/api/progress";
import { useAuth } from "@/lib/auth/use-auth";
import type { Material, ProgressItem } from "@/types/student";

export function useMaterialDetail(materialId: string) {
  const { token, logout } = useAuth();
  const [material, setMaterial] = useState<Material | null>(null);
  const [progressItem, setProgressItem] = useState<ProgressItem | null>(null);
  const [progressPercentage, setProgressPercentage] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [notFound, setNotFound] = useState(false);
  const [isUpdatingProgress, setIsUpdatingProgress] = useState(false);
  const [progressErrorMessage, setProgressErrorMessage] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    setErrorMessage(null);
    setProgressErrorMessage(null);
    setNotFound(false);

    try {
      if (!token) {
        throw new Error("Sua sessão não está disponível.");
      }

      const [materialResponse, progress] = await Promise.all([
        getMaterialById(materialId, token),
        getProgress(token),
      ]);

      setMaterial(materialResponse);
      setProgressPercentage(progress.percentage);
      setProgressItem(progress.items.find((item) => item.material_id === materialId) ?? null);
    } catch (error) {
      if (error instanceof ApiClientError && error.status === 404) {
        setNotFound(true);
        setMaterial(null);
        setProgressItem(null);
        return;
      }

      if (error instanceof ApiClientError && error.status === 401) {
        await logout();
      }

      setErrorMessage(
        error instanceof Error ? error.message : "Não foi possível carregar este material.",
      );
    } finally {
      setIsLoading(false);
    }
  }, [logout, materialId, token]);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      void fetchData();
    }, 0);

    return () => {
      window.clearTimeout(timer);
    };
  }, [fetchData]);

  async function markAsCompleted() {
    if (!material) return;

    setIsUpdatingProgress(true);
    setProgressErrorMessage(null);

    try {
      if (!token) {
        throw new Error("Sua sessão não está disponível.");
      }

      const updatedItem = await updateMaterialProgress(material.id, token);
      const progress = await getProgress(token);
      setProgressItem(updatedItem);
      setProgressPercentage(progress.percentage);
    } catch (error) {
      if (error instanceof ApiClientError && error.status === 401) {
        await logout();
      }

      setProgressErrorMessage(
        error instanceof Error ? error.message : "Não foi possível atualizar o progresso.",
      );
    } finally {
      setIsUpdatingProgress(false);
    }
  }

  return {
    errorMessage,
    fetchData,
    isLoading,
    isUpdatingProgress,
    markAsCompleted,
    material,
    notFound,
    progressErrorMessage,
    progressItem,
    progressPercentage,
  };
}
