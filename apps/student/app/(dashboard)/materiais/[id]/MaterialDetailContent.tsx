"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import { getStudentNavItems } from "@/components/layout/student-navigation";
import { LoadErrorCard } from "@/components/student/LoadErrorCard";
import { MaterialAttachmentsList } from "@/components/student/materials/MaterialAttachmentsList";
import { MaterialDetailSidebar } from "@/components/student/materials/MaterialDetailSidebar";
import { getMaterialStatus, getMaterialTypeMeta } from "@/components/student/materials/material-display";
import { MaterialTheaterShell } from "@/components/student/materials/MaterialTheaterShell";
import { MaterialViewer } from "@/components/student/materials/MaterialViewer";
import { Alert } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { SurfaceCard } from "@/components/ui/SurfaceCard";
import { useAuth } from "@/lib/auth/use-auth";
import { getSupportingMaterialAttachments } from "@/lib/student/material-media";
import { useMaterialDetail } from "@/lib/student/use-material-detail";
import { cn } from "@/lib/utils/cn";

type MaterialDetailContentProps = {
  materialId: string;
};

function ExitTheaterIcon() {
  return (
    <svg fill="none" height="24" viewBox="0 0 24 24" width="24" aria-hidden="true">
      <path
        d="M21.20 3.01L21 3H3L2.79 3.01C2.30 3.06 1.84 3.29 1.51 3.65C1.18 4.02 .99 4.50 1 5V19L1.01 19.20C1.05 19.66 1.26 20.08 1.58 20.41C1.91 20.73 2.33 20.94 2.79 20.99L3 21H21L21.20 20.98C21.66 20.94 22.08 20.73 22.41 20.41C22.73 20.08 22.94 19.66 22.99 19.20L23 19V5C23.00 4.50 22.81 4.02 22.48 3.65C22.15 3.29 21.69 3.06 21.20 3.01ZM3 15V5H21V15H3ZM16.87 6.72H16.86L16.79 6.79L13.58 10L16.79 13.20C16.88 13.30 16.99 13.37 17.11 13.43C17.23 13.48 17.37 13.51 17.50 13.51C17.63 13.51 17.76 13.48 17.89 13.43C18.01 13.38 18.12 13.31 18.21 13.21C18.31 13.12 18.38 13.01 18.43 12.89C18.48 12.76 18.51 12.63 18.51 12.50C18.51 12.37 18.48 12.23 18.43 12.11C18.37 11.99 18.30 11.88 18.20 11.79L16.41 10L18.20 8.20L18.27 8.13C18.42 7.93 18.50 7.69 18.49 7.45C18.47 7.20 18.37 6.97 18.20 6.79C18.02 6.62 17.79 6.52 17.55 6.50C17.30 6.49 17.06 6.57 16.87 6.72ZM5.79 6.79C5.60 6.98 5.50 7.23 5.50 7.5C5.50 7.76 5.60 8.01 5.79 8.20L7.58 10L5.79 11.79L5.72 11.86C5.57 12.06 5.49 12.30 5.50 12.54C5.51 12.79 5.62 13.02 5.79 13.20C5.97 13.37 6.20 13.48 6.45 13.49C6.69 13.50 6.93 13.42 7.13 13.27L7.20 13.20L10.41 10L7.20 6.79C7.01 6.60 6.76 6.50 6.5 6.50C6.23 6.50 5.98 6.60 5.79 6.79ZM3 19V17H21V19H3Z"
        fill="currentColor"
      />
    </svg>
  );
}

function EnterTheaterIcon() {
  return (
    <svg height="24" viewBox="0 0 24 24" width="24" aria-hidden="true">
      <path
        d="M21.20 3.01L21 3H3L2.79 3.01C2.30 3.06 1.84 3.29 1.51 3.65C1.18 4.02 .99 4.50 1 5V19L1.01 19.20C1.05 19.66 1.26 20.08 1.58 20.41C1.91 20.73 2.33 20.94 2.79 20.99L3 21H21L21.20 20.98C21.66 20.94 22.08 20.73 22.41 20.41C22.73 20.08 22.94 19.66 22.99 19.20L23 19V5C23.00 4.50 22.81 4.02 22.48 3.65C22.15 3.29 21.69 3.06 21.20 3.01ZM3 15V5H21V15H3ZM7.87 6.72L7.79 6.79L4.58 10L7.79 13.20C7.88 13.30 7.99 13.37 8.11 13.43C8.23 13.48 8.37 13.51 8.50 13.51C8.63 13.51 8.76 13.48 8.89 13.43C9.01 13.38 9.12 13.31 9.21 13.21C9.31 13.12 9.38 13.01 9.43 12.89C9.48 12.76 9.51 12.63 9.51 12.50C9.51 12.37 9.48 12.23 9.43 12.11C9.37 11.99 9.30 11.88 9.20 11.79L7.41 10L9.20 8.20L9.27 8.13C9.42 7.93 9.50 7.69 9.48 7.45C9.47 7.20 9.36 6.97 9.19 6.80C9.02 6.63 8.79 6.52 8.54 6.51C8.30 6.49 8.06 6.57 7.87 6.72ZM14.79 6.79C14.60 6.98 14.50 7.23 14.50 7.5C14.50 7.76 14.60 8.01 14.79 8.20L16.58 10L14.79 11.79L14.72 11.86C14.57 12.06 14.49 12.30 14.50 12.54C14.51 12.79 14.62 13.02 14.79 13.20C14.97 13.37 15.20 13.48 15.45 13.49C15.69 13.50 15.93 13.42 16.13 13.27L16.20 13.20L19.41 10L16.20 6.79C16.01 6.60 15.76 6.50 15.5 6.50C15.23 6.50 14.98 6.60 14.79 6.79ZM3 19V17H21V19H3Z"
        fill="currentColor"
      />
    </svg>
  );
}

function TheaterModeIcon({ isActive }: { isActive: boolean }) {
  return isActive ? <ExitTheaterIcon /> : <EnterTheaterIcon />;
}

function isTypingTarget(target: EventTarget | null) {
  if (!(target instanceof HTMLElement)) return false;

  return (
    target.isContentEditable ||
    target instanceof HTMLInputElement ||
    target instanceof HTMLTextAreaElement ||
    target instanceof HTMLSelectElement
  );
}

function MaterialDetailSkeleton() {
  return (
    <section className="mx-auto w-full max-w-7xl space-y-5">
      <div className="flex items-center justify-between">
        <div className="h-9 w-36 animate-pulse rounded-lg bg-[var(--color-surface)]" />
        <div className="h-9 w-44 animate-pulse rounded-lg bg-[var(--color-surface)]" />
      </div>
      <div className="space-y-3 border-b pb-5" style={{ borderColor: "var(--color-border)" }}>
        <div className="h-4 w-40 animate-pulse rounded-full bg-[var(--color-surface)]" />
        <div className="h-9 w-3/5 animate-pulse rounded-lg bg-[var(--color-surface)]" />
        <div className="h-4 w-4/5 animate-pulse rounded-full bg-[var(--color-surface)]" />
      </div>
      <div className="aspect-video animate-pulse rounded-[var(--radius-lg)] bg-[var(--color-surface)]" />
      <div className="h-28 animate-pulse rounded-[var(--radius-md)] bg-[var(--color-surface)]" />
    </section>
  );
}

type MaterialCompletionActionProps = {
  isCompleted: boolean;
  isUpdating: boolean;
  errorMessage: string | null;
  onMarkAsCompleted: () => void;
  onUndoCompleted: () => void;
};

function MaterialCompletionAction({
  isCompleted,
  isUpdating,
  errorMessage,
  onMarkAsCompleted,
  onUndoCompleted,
}: MaterialCompletionActionProps) {
  return (
    <SurfaceCard className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <p className="text-base font-semibold">
          {isCompleted ? "Material concluído" : "Concluir este material"}
        </p>
        <p className="student-muted-text mt-1 text-sm">
          {isCompleted
            ? "Este conteúdo já está marcado como concluído no seu progresso."
            : "Marque quando terminar a leitura ou a aula para atualizar seu progresso."}
        </p>
        {errorMessage ? <Alert tone="error">{errorMessage}</Alert> : null}
      </div>
      <Button
        type="button"
        onClick={isCompleted ? onUndoCompleted : onMarkAsCompleted}
        disabled={isUpdating}
        variant={isCompleted ? "outline" : "primary"}
        className="shrink-0"
      >
        {isUpdating
          ? "Atualizando..."
          : isCompleted
            ? "Desfazer conclusão"
            : "Marcar como concluído"}
      </Button>
    </SurfaceCard>
  );
}

export function MaterialDetailContent({ materialId }: MaterialDetailContentProps) {
  const { token, user } = useAuth();
  const detail = useMaterialDetail(materialId);
  const [isTheaterMode, setIsTheaterMode] = useState(false);
  const type = detail.material ? getMaterialTypeMeta(detail.material.type) : null;
  const status = detail.material ? getMaterialStatus(detail.material, detail.progressItem ? [detail.progressItem] : []) : null;
  const navItems = getStudentNavItems(Boolean(user?.roles?.includes("admin")));

  useEffect(() => {
    function handleTheaterShortcut(event: KeyboardEvent) {
      if (event.key.toLowerCase() !== "t" || event.repeat || event.metaKey || event.ctrlKey || event.altKey) {
        return;
      }

      if (isTypingTarget(event.target)) {
        return;
      }

      event.preventDefault();
      setIsTheaterMode((current) => !current);
    }

    window.addEventListener("keydown", handleTheaterShortcut);

    return () => {
      window.removeEventListener("keydown", handleTheaterShortcut);
    };
  }, []);

  if (detail.isLoading) return <MaterialDetailSkeleton />;

  if (detail.errorMessage) {
    return <LoadErrorCard message={detail.errorMessage} onRetry={() => void detail.fetchData()} />;
  }

  if (detail.notFound || !detail.material || !type || !status) {
    return (
      <SurfaceCard>
        <h2 className="text-2xl">Material indisponível</h2>
        <p className="student-muted-text mt-2 text-sm">
          Este material não está disponível para a sua conta agora ou não existe mais.
        </p>
        <Link href="/materiais" className="student-text-action mt-4 inline-flex rounded-lg px-2 py-1 text-sm font-semibold">
          Voltar para materiais
        </Link>
      </SurfaceCard>
    );
  }

  const attachments = getSupportingMaterialAttachments(detail.material);
  const isCompleted = status.tone === "concluído";
  const actions = (
    <div className="flex flex-wrap items-center gap-2">
      <Button type="button" variant="outline" size="sm" className="gap-2" onClick={() => setIsTheaterMode((current) => !current)}>
        <TheaterModeIcon isActive={isTheaterMode} />
        {isTheaterMode ? "Modo normal" : "Modo teatro"}
      </Button>
      <MaterialDetailSidebar
        typeLabel={type.label}
        status={status}
        progressPercentage={detail.progressPercentage}
        progressErrorMessage={detail.progressErrorMessage}
        isUpdatingProgress={detail.isUpdatingProgress}
        onMarkAsCompleted={() => void detail.markAsCompleted()}
        onUndoCompleted={() => void detail.undoCompleted()}
      />
    </div>
  );

  return (
    <MaterialTheaterShell
      isTheaterMode={isTheaterMode}
      navItems={navItems}
      actions={actions}
      title={detail.material.title}
      typeLabel={type.label}
    >
      {!isTheaterMode ? (
        <SurfaceCard className="flex flex-wrap items-start justify-between gap-3">
          <div className="max-w-3xl">
            <p className="student-muted-text text-sm">Materiais / {type.label}</p>
            <h1 className="mt-1 text-3xl">{detail.material.title}</h1>
            {detail.material.description ? (
              <p className="student-muted-text mt-2 max-w-2xl text-sm">{detail.material.description}</p>
            ) : null}
          </div>
          <StatusBadge label={status.label} tone={status.tone} />
        </SurfaceCard>
      ) : null}

      <div
        className={cn(
          isTheaterMode
            ?"student-theater-stage relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] w-screen px-4 py-5 sm:px-6 sm:py-7"
            : "",
        )}
      >
        <div className={cn(isTheaterMode ?"mx-auto w-full max-w-[84rem]" : "")}>
          <MaterialViewer
            material={detail.material}
            typeLabel={type.label}
            isTheaterMode={isTheaterMode}
            token={token}
          />
        </div>
      </div>

      <div className={cn("space-y-5", isTheaterMode ?"mx-auto w-full max-w-7xl" : "")}>
        <MaterialCompletionAction
          isCompleted={isCompleted}
          isUpdating={detail.isUpdatingProgress}
          errorMessage={detail.progressErrorMessage}
          onMarkAsCompleted={() => void detail.markAsCompleted()}
          onUndoCompleted={() => void detail.undoCompleted()}
        />
        <MaterialAttachmentsList
          attachments={attachments}
          materialId={detail.material.id}
          token={token}
        />
      </div>
    </MaterialTheaterShell>
  );
}
