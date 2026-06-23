import { PlayCircle } from "lucide-react";

import { Alert } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { SurfaceCard } from "@/components/ui/SurfaceCard";
import type { Material } from "@/types/student";

type MaterialDetailStatus = {
  label: string;
  tone: "novo" | "em-andamento" | "concluído" | "bloqueado";
};

type MaterialDetailSidebarProps = {
  material: Material;
  typeLabel: string;
  status: MaterialDetailStatus;
  progressPercentage: number;
  progressErrorMessage: string | null;
  isUpdatingProgress: boolean;
  onMarkAsCompleted: () => void;
};

export function MaterialDetailSidebar({
  material,
  typeLabel,
  status,
  progressPercentage,
  progressErrorMessage,
  isUpdatingProgress,
  onMarkAsCompleted,
}: MaterialDetailSidebarProps) {
  const isCompleted = status.tone === "concluído";
  const isButtonDisabled = isUpdatingProgress || isCompleted;

  return (
    <aside className="space-y-4 xl:sticky xl:top-24 xl:self-start">
      <SurfaceCard>
        <p className="flex items-center gap-2 text-sm font-semibold">
          <PlayCircle size={16} aria-hidden="true" />
          Informações do material
        </p>
        <dl className="mt-4 space-y-3 text-sm">
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
          <div className="flex items-center justify-between gap-4">
            <dt className="student-muted-text">Ordem</dt>
            <dd className="font-semibold">{material.order}</dd>
          </div>
        </dl>
      </SurfaceCard>

      <SurfaceCard>
        <p className="text-sm font-semibold">Progresso da jornada</p>
        <div className="mt-4">
          <ProgressBar value={progressPercentage} label="Conclusão geral" />
        </div>
        <p className="student-muted-text mt-3 text-sm">
          Marque este conteúdo como concluído quando terminar de estudar.
        </p>

        {progressErrorMessage ? <Alert tone="error">{progressErrorMessage}</Alert> : null}

        <Button
          type="button"
          onClick={onMarkAsCompleted}
          disabled={isButtonDisabled}
          variant={isCompleted ? "outline" : "primary"}
          fullWidth
          className="mt-4"
          style={{
            opacity: isButtonDisabled ? 0.75 : 1,
          }}
        >
          {isUpdatingProgress
            ? "Atualizando..."
            : isCompleted
              ? "Material concluído"
              : "Marcar como concluído"}
        </Button>
      </SurfaceCard>
    </aside>
  );
}
