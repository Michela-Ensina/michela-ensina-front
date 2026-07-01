"use client";

import { AlertTriangle, X } from "lucide-react";
import { Dialog as BaseDialog } from "@base-ui/react/dialog";

import { Button } from "@/components/ui/button";
import type { AdminMaterial } from "@/types/admin";

type AdminDeleteMaterialDialogProps = {
  material: AdminMaterial | null;
  isDeleting: boolean;
  onClose: () => void;
  onConfirm: () => void;
};

export function AdminDeleteMaterialDialog({
  material,
  isDeleting,
  onClose,
  onConfirm,
}: AdminDeleteMaterialDialogProps) {
  const isOpen = Boolean(material);

  return (
    <BaseDialog.Root
      open={isOpen}
      onOpenChange={(open) => {
        if (!open && !isDeleting) onClose();
      }}
      disablePointerDismissal={isDeleting}
    >
      <BaseDialog.Portal>
        <BaseDialog.Backdrop className="fixed inset-0 z-50 bg-[rgb(10_5_20_/_0.72)]" />
        <BaseDialog.Popup
          className="fixed left-1/2 top-1/2 z-50 w-[min(30rem,calc(100vw-2rem))] -translate-x-1/2 -translate-y-1/2 rounded-[var(--radius-lg)] border p-5 shadow-[var(--shadow-md)] outline-none sm:p-6"
          style={{
            borderColor: "var(--color-border)",
            backgroundColor: "var(--color-surface)",
          }}
        >
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-start gap-3">
              <span
                className="grid size-10 shrink-0 place-items-center rounded-[var(--radius-md)]"
                style={{
                  backgroundColor: "color-mix(in oklab, #cc5a7a 14%, var(--color-surface-soft))",
                  color: "color-mix(in oklab, #cc5a7a 80%, var(--color-text))",
                }}
              >
                <AlertTriangle size={18} aria-hidden="true" />
              </span>
              <div>
                <BaseDialog.Title className="text-xl font-semibold">
                  Remover material
                </BaseDialog.Title>
                <BaseDialog.Description className="student-muted-text mt-1 text-sm">
                  Esta ação remove o material da área do aluno. Os alunos deixam de visualizar este conteúdo imediatamente.
                </BaseDialog.Description>
              </div>
            </div>

            <BaseDialog.Close
              type="button"
              disabled={isDeleting}
              className="student-action student-hover-surface grid size-9 shrink-0 place-items-center rounded-xl border disabled:pointer-events-none disabled:opacity-60"
              style={{
                borderColor: "var(--color-border)",
                color: "var(--color-text-muted)",
                backgroundColor: "color-mix(in oklab, var(--color-surface-soft) 70%, transparent)",
              }}
              aria-label="Fechar confirmação"
            >
              <X size={17} aria-hidden="true" />
            </BaseDialog.Close>
          </div>

          {material ?(
            <div
              className="mt-5 rounded-[var(--radius-md)] border p-3 text-sm"
              style={{
                borderColor: "var(--color-border)",
                backgroundColor: "var(--color-surface-soft)",
              }}
            >
              <span className="student-muted-text block text-xs">Material selecionado</span>
              <strong className="mt-1 block">{material.title}</strong>
            </div>
          ) : null}

          <div className="mt-5 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
            <Button type="button" variant="outline" disabled={isDeleting} onClick={onClose}>
              Cancelar
            </Button>
            <Button type="button" variant="danger" disabled={isDeleting} onClick={onConfirm}>
              {isDeleting ?"Removendo..." : "Remover material"}
            </Button>
          </div>
        </BaseDialog.Popup>
      </BaseDialog.Portal>
    </BaseDialog.Root>
  );
}
