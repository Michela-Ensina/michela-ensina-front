"use client";

import { mutate } from "swr";
import type { SWRConfiguration } from "swr";

type RevalidateStudentDataOptions = {
  materialId?: string;
  token: string;
  userId?: string | null;
};

export const studentDataCacheConfig: SWRConfiguration = {
  dedupingInterval: 30_000,
  errorRetryCount: 0,
  focusThrottleInterval: 60_000,
  keepPreviousData: true,
  revalidateIfStale: false,
  revalidateOnFocus: false,
  revalidateOnReconnect: false,
  shouldRetryOnError: false,
};

export const studentDataKeys = {
  dashboard: (token: string, userId: string) =>
    ["student-dashboard", token, userId] as const,
  materialDetail: (token: string, materialId: string) =>
    ["student-material-detail", token, materialId] as const,
  materials: (token: string) => ["student-materials", token] as const,
  progress: (token: string) => ["student-progress", token] as const,
};

export async function revalidateStudentReadData({
  materialId,
  token,
  userId,
}: RevalidateStudentDataOptions) {
  const tasks: Array<Promise<unknown>> = [
    mutate(studentDataKeys.materials(token)),
    mutate(studentDataKeys.progress(token)),
  ];

  if (userId) {
    tasks.push(mutate(studentDataKeys.dashboard(token, userId)));
  }

  if (materialId) {
    tasks.push(mutate(studentDataKeys.materialDetail(token, materialId)));
  }

  await Promise.all(tasks);
}
