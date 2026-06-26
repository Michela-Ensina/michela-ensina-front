"use client";

import { useEffect, useState } from "react";
import { FileText } from "lucide-react";

import { Alert } from "@/components/ui/alert";
import { createObjectUrlFromRemoteFile } from "@/lib/student/material-media";

type PdfMaterialViewerProps = {
  title: string;
  url: string;
};

type PdfLoadState =
  | { status: "loading"; objectUrl: null; message: null }
  | { status: "ready"; objectUrl: string; message: null }
  | { status: "error"; objectUrl: null; message: string };

export function PdfMaterialViewer({ title, url }: PdfMaterialViewerProps) {
  const [loadState, setLoadState] = useState<PdfLoadState>({
    status: "loading",
    objectUrl: null,
    message: null,
  });

  useEffect(() => {
    const controller = new AbortController();
    let revokeObjectUrl: (() => void) | null = null;

    createObjectUrlFromRemoteFile(url, controller.signal)
      .then(({ objectUrl, revoke }) => {
        revokeObjectUrl = revoke;
        setLoadState({ status: "ready", objectUrl, message: null });
      })
      .catch((error: unknown) => {
        if (controller.signal.aborted) return;

        setLoadState({
          status: "error",
          objectUrl: null,
          message: error instanceof Error ? error.message : "Não foi possível abrir este PDF.",
        });
      });

    return () => {
      controller.abort();
      revokeObjectUrl?.();
    };
  }, [url]);

  if (loadState.status === "loading") {
    return (
      <div className="grid min-h-[68vh] place-items-center bg-[var(--color-surface)] p-8">
        <div className="w-full max-w-lg space-y-4">
          <div className="mx-auto grid size-14 place-items-center rounded-[var(--radius-md)] bg-[var(--color-surface-soft)] text-[var(--color-primary)]">
            <FileText size={24} aria-hidden="true" />
          </div>
          <div className="mx-auto h-4 w-44 animate-pulse rounded-full bg-[var(--color-surface-soft)]" />
          <div className="h-2 animate-pulse rounded-full bg-[var(--color-surface-soft)]" />
          <div className="h-2 w-10/12 animate-pulse rounded-full bg-[var(--color-surface-soft)]" />
        </div>
      </div>
    );
  }

  if (loadState.status === "error") {
    return (
      <div className="grid min-h-[360px] place-items-center bg-[var(--color-surface)] p-6">
        <div className="max-w-md">
          <Alert tone="error">{loadState.message}</Alert>
        </div>
      </div>
    );
  }

  return (
    <iframe
      title={title}
      src={`${loadState.objectUrl}#toolbar=0&navpanes=0&scrollbar=1`}
      className="h-[72vh] min-h-[520px] w-full bg-white"
    />
  );
}
