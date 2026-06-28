"use client";

import { useState } from "react";
import { Dialog as BaseDialog } from "@base-ui/react/dialog";
import { ExternalLink, FileText, Paperclip, X } from "lucide-react";

import { PdfMaterialViewer } from "@/components/student/materials/PdfMaterialViewer";
import { SurfaceCard } from "@/components/ui/SurfaceCard";
import { getMaterialUploadFileUrl } from "@/lib/api/materials";
import { formatFileSize, isPdfAttachment } from "@/lib/student/material-media";
import type { MaterialAttachment } from "@/types/student";

type MaterialAttachmentsListProps = {
  attachments: MaterialAttachment[];
  materialId: string;
  token?: string | null;
};

type AttachmentCardProps = {
  attachment: MaterialAttachment;
  onPreviewPdf: (attachment: MaterialAttachment) => void;
};

function AttachmentCard({ attachment, onPreviewPdf }: AttachmentCardProps) {
  const size = formatFileSize(attachment.size);
  const isPdf = isPdfAttachment(attachment);
  const Icon = isPdf ? FileText : Paperclip;
  const content = (
    <>
      <span className="grid size-10 shrink-0 place-items-center rounded-lg bg-[var(--color-surface-soft)] text-[var(--color-primary)]">
        <Icon size={18} aria-hidden="true" />
      </span>
      <span className="min-w-0 flex-1 text-left">
        <span className="block truncate text-sm font-semibold">
          {attachment.original_name}
        </span>
        <span className="student-muted-text block text-xs">
          {size ?? attachment.mime_type ?? "Arquivo de apoio"}
        </span>
      </span>
      {isPdf ? null : (
        <ExternalLink
          size={16}
          className="shrink-0 text-[var(--color-text-muted)]"
          aria-hidden="true"
        />
      )}
    </>
  );

  if (isPdf) {
    return (
      <button
        type="button"
        className="student-action student-hover-surface flex min-w-0 items-center gap-3 rounded-[var(--radius-sm)] border p-3"
        style={{
          borderColor: "var(--color-border)",
          backgroundColor: "var(--color-surface-soft)",
        }}
        onClick={() => onPreviewPdf(attachment)}
      >
        {content}
      </button>
    );
  }

  return (
    <a
      href={attachment.url}
      target="_blank"
      rel="noreferrer"
      className="student-action student-hover-surface flex min-w-0 items-center gap-3 rounded-[var(--radius-sm)] border p-3"
      style={{
        borderColor: "var(--color-border)",
        backgroundColor: "var(--color-surface-soft)",
      }}
    >
      {content}
    </a>
  );
}

export function MaterialAttachmentsList({
  attachments,
  materialId,
  token,
}: MaterialAttachmentsListProps) {
  const [previewAttachment, setPreviewAttachment] =
    useState<MaterialAttachment | null>(null);

  if (attachments.length === 0) return null;

  return (
    <>
      <SurfaceCard>
        <div>
          <h2 className="text-xl">Materiais de apoio</h2>
          <p className="student-muted-text mt-1 text-sm">
            Arquivos anexados a este conteúdo.
          </p>
        </div>
        <div className="mt-3 grid gap-2 sm:grid-cols-2">
          {attachments.map((attachment) => (
            <AttachmentCard
              key={attachment.id}
              attachment={attachment}
              onPreviewPdf={setPreviewAttachment}
            />
          ))}
        </div>
      </SurfaceCard>

      <BaseDialog.Root
        open={Boolean(previewAttachment)}
        onOpenChange={(open) => {
          if (!open) setPreviewAttachment(null);
        }}
      >
        <BaseDialog.Portal>
          <BaseDialog.Backdrop className="fixed inset-0 z-50 bg-[rgb(10_5_20_/_0.72)]" />
          <BaseDialog.Popup
            className="fixed left-1/2 top-1/2 z-50 flex max-h-[calc(100vh-2rem)] w-[min(72rem,calc(100vw-2rem))] -translate-x-1/2 -translate-y-1/2 flex-col overflow-hidden rounded-[var(--radius-lg)] border shadow-[var(--shadow-md)] outline-none"
            style={{
              borderColor: "var(--color-border)",
              backgroundColor: "var(--color-surface)",
            }}
          >
            <div
              className="flex items-start justify-between gap-4 border-b px-4 py-3 sm:px-5"
              style={{ borderColor: "var(--color-border)" }}
            >
              <div className="min-w-0">
                <BaseDialog.Title className="truncate text-lg font-semibold">
                  {previewAttachment?.original_name ?? "Material de apoio"}
                </BaseDialog.Title>
              </div>
              <BaseDialog.Close
                type="button"
                className="student-action student-hover-surface grid size-9 shrink-0 place-items-center rounded-xl border"
                style={{
                  borderColor: "var(--color-border)",
                  color: "var(--color-text-muted)",
                  backgroundColor:
                    "color-mix(in oklab, var(--color-surface-soft) 70%, transparent)",
                }}
                aria-label="Fechar visualização"
              >
                <X size={17} aria-hidden="true" />
              </BaseDialog.Close>
            </div>

            {previewAttachment ? (
              <div className="min-h-0 overflow-auto">
                <PdfMaterialViewer
                  title={previewAttachment.original_name}
                  url={getMaterialUploadFileUrl(materialId, previewAttachment.id)}
                  token={token}
                />
              </div>
            ) : null}
          </BaseDialog.Popup>
        </BaseDialog.Portal>
      </BaseDialog.Root>
    </>
  );
}
