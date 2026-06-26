"use client";

import { useCallback, useEffect, useState } from "react";

import { ApiClientError } from "@/lib/api/errors";
import { useAuth } from "@/lib/auth/use-auth";
import type { User } from "@/types/student";

type StudentDataLoader<TData> = (token: string, user: User | null) => Promise<TData>;

type UseStudentDataOptions<TData> = {
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
  loadData,
  fallbackErrorMessage,
  isEmpty,
  requiresUser = false,
}: UseStudentDataOptions<TData>): UseStudentDataResult<TData> {
  const { token, user, isLoading: isAuthLoading, logout } = useAuth();
  const authenticatedUser = requiresUser ? user : null;
  const [data, setData] = useState<TData | null>(null);
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

      setData(await loadData(token, authenticatedUser));
    } catch (error) {
      if (error instanceof ApiClientError && error.status === 401) {
        await logout();
      }

      setErrorMessage(error instanceof Error ? error.message : fallbackErrorMessage);
      setData(null);
    } finally {
      setIsLoading(false);
    }
  }, [authenticatedUser, fallbackErrorMessage, isAuthLoading, loadData, logout, token]);

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
    isEmpty: isEmpty(data),
    refetch: fetchData,
  };
}
