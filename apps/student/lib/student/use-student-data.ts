"use client";

import { useCallback, useEffect, useMemo } from "react";
import useSWR from "swr";

import { ApiClientError } from "@/lib/api/errors";
import { useAuth } from "@/lib/auth/use-auth";
import type { User } from "@/types/student";

type StudentDataLoader<TData> = (token: string, user: User | null) => Promise<TData>;

type UseStudentDataOptions<TData> = {
  getCacheKey: (token: string, user: User | null) => readonly unknown[];
  loadData: StudentDataLoader<TData>;
  fallbackErrorMessage: string;
  isEmpty: (data: TData | null) => boolean;
  requiresUser?: boolean;
};

type UseStudentDataResult<TData> = {
  data: TData | null;
  isLoading: boolean;
  errorMessage: string | null;
  isEmpty: boolean;
  refetch: () => Promise<void>;
};

export function useStudentData<TData>({
  getCacheKey,
  loadData,
  fallbackErrorMessage,
  isEmpty,
  requiresUser = false,
}: UseStudentDataOptions<TData>): UseStudentDataResult<TData> {
  const { token, user, isLoading: isAuthLoading, logout } = useAuth();
  const authenticatedUser = requiresUser ? user : null;

  const cacheKey = useMemo(() => {
    if (isAuthLoading || !token) {
      return null;
    }

    if (requiresUser && !authenticatedUser) {
      return null;
    }

    return getCacheKey(token, authenticatedUser);
  }, [authenticatedUser, getCacheKey, isAuthLoading, requiresUser, token]);

  const { data, error, isLoading: isDataLoading, mutate } = useSWR<TData>(
    cacheKey,
    async () => {
      if (!token) {
        throw new Error("Sua sessão não está disponível.");
      }

      return loadData(token, authenticatedUser);
    },
  );

  useEffect(() => {
    if (!(error instanceof ApiClientError) || error.status !== 401) {
      return;
    }

    void logout();
  }, [error, logout]);

  const fetchData = useCallback(async () => {
    await mutate();
  }, [mutate]);

  return {
    data: data ?? null,
    isLoading: isAuthLoading || (Boolean(cacheKey) && isDataLoading && !data),
    errorMessage: error instanceof Error ? error.message : error ? fallbackErrorMessage : null,
    isEmpty: isEmpty(data ?? null),
    refetch: fetchData,
  };
}
