import { ChevronDown, PlayCircle } from "lucide-react";

import { Alert } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { SurfaceCard } from "@/components/ui/SurfaceCard";

type MaterialDetailStatus = {
  label: string;
  tone: "novo" | "em-andamento" | "concluído" | "bloqueado";
};

type MaterialDetailSidebarProps = {
  typeLabel: string;
  status: MaterialDetailStatus;
  progressPercentage: number;
  progressErrorMessage: string | null;
  isUpdatingProgress: boolean;
  onMarkAsCompleted: () => void;
};

export function MaterialDetailSidebar({
  typeLabel,
  status,
  progressPercentage,
  progressErrorMessage,
  isUpdatingProgress,
  onMarkAsCompleted,
}: MaterialDetailSidebarProps) {
  const isCompleted = status.tone === "concluído";

  return (
    <details className="group relative">
      <summary
        className="student-action flex list-none items-center gap-2 rounded-lg border px-3 py-2 text-sm font-semibold marker:content-none"
        style={{
          borderColor: "var(--color-border)",
          backgroundColor: "var(--color-surface)",
        }}
      >
        <PlayCircle size={16} aria-hidden="true" />
        Progresso e detalhes
        <ChevronDown
          size={16}
          className="ml-auto transition-transform group-open:rotate-180"
          aria-hidden="true"
        />
      </summary>

      <div
        className="fixed left-3 right-3 top-20 z-50 mt-2 max-h-[calc(100vh-7rem)] space-y-3 overflow-auto rounded-[var(--radius-md)] border p-3 shadow-[var(--shadow-md)] sm:absolute sm:left-auto sm:right-0 sm:top-auto sm:max-h-none sm:w-[min(22rem,calc(100vw-2.5rem))] sm:overflow-visible"
        style={{
          borderColor: "var(--color-border)",
          backgroundColor: "var(--color-surface)",
        }}
      >
        <SurfaceCard>
          <dl className="space-y-3 text-sm">
            <div className="flex items-center justify-between gap-4">
              <dt className="student-muted-text">Tipo</dt>
              <dd className="font-semibold">{typeLabel}</dd>
            </div>
            <div className="flex items-center justify-between gap-4">
              <dt className="student-muted-text">Status</dt>
              <dd>
                <StatusBadge label={status.label} tone={status.tone} />
              </dd>
            </div>
          </dl>
        </SurfaceCard>

        <SurfaceCard>
          <ProgressBar value={progressPercentage} label="Conclusão geral" />
          {progressErrorMessage ?(
            <Alert tone="error">{progressErrorMessage}</Alert>
          ) : null}
          <Button
            type="button"
            onClick={onMarkAsCompleted}
            disabled={isUpdatingProgress || isCompleted}
            variant={isCompleted ?"outline" : "primary"}
            fullWidth
            className="mt-4"
          >
            {isUpdatingProgress
              ?"Atualizando..."
              : isCompleted
                ?"Material concluído"
                : "Marcar como concluído"}
          </Button>
        </SurfaceCard>
      </div>
    </details>
  );
}
