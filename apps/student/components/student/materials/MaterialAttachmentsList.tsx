"use client";

import { useState } from "react";
import { Dialog as BaseDialog } from "@base-ui/react/dialog";
import { Download, ExternalLink, FileText, Paperclip, X } from "lucide-react";
import { toast } from "sonner";

import { PdfMaterialViewer } from "@/components/student/materials/PdfMaterialViewer";
import { SurfaceCard } from "@/components/ui/SurfaceCard";
import { getMaterialUploadFileUrl } from "@/lib/api/materials";
import {
  createObjectUrlFromRemoteFile,
  formatFileSize,
  isPdfAttachment,
} from "@/lib/student/material-media";
import type { MaterialAttachment } from "@/types/student";

type MaterialAttachmentsListProps = {
  attachments: MaterialAttachment[];
  materialId: string;
  token?: string | null;
};

type AttachmentCardProps = {
  attachment: MaterialAttachment;
  isDownloading: boolean;
  onDownload: (attachment: MaterialAttachment) => void;
  onOpen: (attachment: MaterialAttachment) => void;
  onPreviewPdf: (attachment: MaterialAttachment) => void;
};

function AttachmentCard({
  attachment,
  isDownloading,
  onDownload,
  onOpen,
  onPreviewPdf,
}: AttachmentCardProps) {
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
    </>
  );
  const sharedClassName =
    "student-hover-surface flex min-w-0 flex-1 items-center gap-3 rounded-[var(--radius-sm)] p-3 text-left";

  return (
    <div
      className="student-soft-surface flex min-w-0 items-center gap-2 rounded-[var(--radius-sm)] border p-1"
      style={{ borderColor: "var(--color-border)" }}
    >
      {isPdf ? (
        <button
          type="button"
          className={sharedClassName}
          onClick={() => onPreviewPdf(attachment)}
        >
          {content}
        </button>
      ) : (
        <button
          type="button"
          className={sharedClassName}
          onClick={() => onOpen(attachment)}
        >
          {content}
          <ExternalLink
            size={16}
            className="shrink-0 text-[var(--color-text-muted)]"
            aria-hidden="true"
          />
        </button>
      )}
      <button
        type="button"
        className="student-action student-hover-surface grid size-10 shrink-0 place-items-center rounded-[var(--radius-sm)] text-[var(--color-text-muted)]"
        disabled={isDownloading}
        onClick={() => onDownload(attachment)}
        aria-label={`Baixar ${attachment.original_name}`}
        title="Baixar arquivo"
      >
        <Download size={17} aria-hidden="true" />
      </button>
    </div>
  );
}

export function MaterialAttachmentsList({
  attachments,
  materialId,
  token,
}: MaterialAttachmentsListProps) {
  const [previewAttachment, setPreviewAttachment] =
    useState<MaterialAttachment | null>(null);
  const [downloadingAttachmentId, setDownloadingAttachmentId] =
    useState<string | null>(null);

  if (attachments.length === 0) return null;

  async function handleDownload(attachment: MaterialAttachment) {
    setDownloadingAttachmentId(attachment.id);

    try {
      const { objectUrl, revoke } = await createObjectUrlFromRemoteFile(
        getMaterialUploadFileUrl(materialId, attachment.id),
        undefined,
        token,
      );
      const link = document.createElement("a");
      link.href = objectUrl;
      link.download = attachment.original_name || "material-de-apoio";
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.setTimeout(revoke, 0);
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Não foi possível baixar este arquivo agora.",
      );
    } finally {
      setDownloadingAttachmentId(null);
    }
  }

  async function handleOpenAttachment(attachment: MaterialAttachment) {
    try {
      const { objectUrl, revoke } = await createObjectUrlFromRemoteFile(
        getMaterialUploadFileUrl(materialId, attachment.id),
        undefined,
        token,
      );
      const link = document.createElement("a");
      link.href = objectUrl;
      link.target = "_blank";
      link.rel = "noreferrer";
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.setTimeout(revoke, 60_000);
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Não foi possível abrir este arquivo agora.",
      );
    }
  }

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
              isDownloading={downloadingAttachmentId === attachment.id}
              onDownload={(nextAttachment) =>
                void handleDownload(nextAttachment)
              }
              onOpen={(nextAttachment) =>
                void handleOpenAttachment(nextAttachment)
              }
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
