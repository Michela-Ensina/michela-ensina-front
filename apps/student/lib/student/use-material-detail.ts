import { useCallback, useEffect, useMemo, useState } from "react";
import useSWR from "swr";

import { ApiClientError } from "@/lib/api/errors";
import { getMaterialById } from "@/lib/api/materials";
import {
  deleteMaterialProgress,
  getProgress,
  updateMaterialProgress,
} from "@/lib/api/progress";
import { useAuth } from "@/lib/auth/use-auth";
import { isMaterialReleased } from "@/lib/student/material-availability";
import { createEmptyProgressSummary } from "@/lib/student/progress-summary";
import {
  revalidateStudentReadData,
  studentDataKeys,
} from "@/lib/student/student-data-cache";
import type { Material, ProgressItem } from "@/types/student";

type MaterialDetailData = {
  material: Material | null;
  notFound: boolean;
  progressItem: ProgressItem | null;
  progressPercentage: number;
};

async function loadMaterialDetail(
  materialId: string,
  token: string,
): Promise<MaterialDetailData> {
  try {
    const materialResponse = await getMaterialById(materialId, token);
    if (!isMaterialReleased(materialResponse)) {
      return {
        material: null,
        notFound: true,
        progressItem: null,
        progressPercentage: 0,
      };
    }

    let progress = createEmptyProgressSummary();

    try {
      progress = await getProgress(token);
    } catch (error) {
      if (error instanceof ApiClientError && error.status === 401) {
        throw error;
      }
    }

    return {
      material: materialResponse,
      notFound: false,
      progressItem:
        progress.items.find((item) => item.material_id === materialId) ?? null,
      progressPercentage: progress.percentage,
    };
  } catch (error) {
    if (error instanceof ApiClientError && error.status === 404) {
      return {
        material: null,
        notFound: true,
        progressItem: null,
        progressPercentage: 0,
      };
    }

    throw error;
  }
}

export function useMaterialDetail(materialId: string) {
  const { token, user, logout } = useAuth();
  const [isUpdatingProgress, setIsUpdatingProgress] = useState(false);
  const [progressErrorMessage, setProgressErrorMessage] = useState<string | null>(null);

  const cacheKey = useMemo(() => {
    if (!token) {
      return null;
    }

    return studentDataKeys.materialDetail(token, materialId);
  }, [materialId, token]);

  const {
    data,
    error,
    isLoading,
    mutate,
  } = useSWR<MaterialDetailData>(cacheKey, async () => {
    if (!token) {
      throw new Error("Sua sessão não está disponível.");
    }

    return loadMaterialDetail(materialId, token);
  });

  useEffect(() => {
    if (!(error instanceof ApiClientError) || error.status !== 401) {
      return;
    }

    void logout();
  }, [error, logout]);

  const fetchData = useCallback(async () => {
    setProgressErrorMessage(null);
    await mutate();
  }, [mutate]);

  async function markAsCompleted() {
    if (!data?.material || !token) return;

    setIsUpdatingProgress(true);
    setProgressErrorMessage(null);

    try {
      const updatedItem = await updateMaterialProgress(data.material.id, token);
      const progress = await getProgress(token);

      await mutate(
        (current) =>
          current
            ? {
                ...current,
                progressItem: updatedItem,
                progressPercentage: progress.percentage,
              }
            : current,
        { revalidate: false },
      );

      await revalidateStudentReadData({
        materialId,
        token,
        userId: user?.id,
      });
    } catch (error) {
      if (error instanceof ApiClientError && error.status === 401) {
        await logout();
      }

      setProgressErrorMessage(
        error instanceof Error
          ? error.message
          : "Não foi possível atualizar o progresso.",
      );
    } finally {
      setIsUpdatingProgress(false);
    }
  }

  async function undoCompleted() {
    if (!data?.material || !token) return;

    setIsUpdatingProgress(true);
    setProgressErrorMessage(null);

    try {
      const progress = await deleteMaterialProgress(data.material.id, token);

      await mutate(
        (current) =>
          current
            ? {
                ...current,
                progressItem:
                  progress.items.find(
                    (item) => item.material_id === data.material?.id,
                  ) ?? null,
                progressPercentage: progress.percentage,
              }
            : current,
        { revalidate: false },
      );

      await revalidateStudentReadData({
        materialId,
        token,
        userId: user?.id,
      });
    } catch (error) {
      if (error instanceof ApiClientError && error.status === 401) {
        await logout();
      }

      setProgressErrorMessage(
        error instanceof Error
          ? error.message
          : "Não foi possível atualizar o progresso.",
      );
    } finally {
      setIsUpdatingProgress(false);
    }
  }

  return {
    errorMessage:
      error instanceof Error
        ? error.message
        : error
          ? "Não foi possível carregar este material."
          : null,
    fetchData,
    isLoading: Boolean(cacheKey) && isLoading && !data,
    isUpdatingProgress,
    markAsCompleted,
    material: data?.material ?? null,
    notFound: data?.notFound ?? false,
    undoCompleted,
    progressErrorMessage,
    progressItem: data?.progressItem ?? null,
    progressPercentage: data?.progressPercentage ?? 0,
  };
}
