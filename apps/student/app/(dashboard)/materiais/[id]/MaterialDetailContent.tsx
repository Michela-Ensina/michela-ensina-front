"use client";

import Link from "next/link";
import { ArrowLeft, FileText, Paperclip } from "lucide-react";

import { LoadErrorCard } from "@/components/student/LoadErrorCard";
import { MaterialDetailSidebar } from "@/components/student/materials/MaterialDetailSidebar";
import { getMaterialStatus, getMaterialTypeMeta } from "@/components/student/materials/material-display";
import { MaterialViewer } from "@/components/student/materials/MaterialViewer";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { SurfaceCard } from "@/components/ui/SurfaceCard";
import { formatFileSize, getPrimaryMaterialFile } from "@/lib/student/material-media";
import { useMaterialDetail } from "@/lib/student/use-material-detail";
import type { MaterialAttachment } from "@/types/student";

type MaterialDetailContentProps = {
  materialId: string;
};

function MaterialDetailSkeleton() {
  return (
    <section className="mx-auto w-full max-w-5xl space-y-5">
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

function AttachmentCard({ attachment }: { attachment: MaterialAttachment }) {
  const size = formatFileSize(attachment.size);
  const Icon = attachment.type === "pdf" ? FileText : Paperclip;

  return (
    <a
      href={attachment.url}
      target="_blank"
      rel="noreferrer"
      className="student-action student-hover-surface flex min-w-0 items-center gap-3 rounded-[var(--radius-sm)] border p-3"
      style={{
        borderColor: "var(--color-border)",
        backgroundColor: "var(--color-surface)",
      }}
    >
      <span className="grid size-10 shrink-0 place-items-center rounded-lg bg-[var(--color-surface-soft)] text-[var(--color-primary)]">
        <Icon size={18} aria-hidden="true" />
      </span>
      <span className="min-w-0">
        <span className="block truncate text-sm font-semibold">{attachment.original_name}</span>
        <span className="student-muted-text block text-xs">{size ?? attachment.mime_type ?? "Arquivo de apoio"}</span>
      </span>
    </a>
  );
}

export function MaterialDetailContent({ materialId }: MaterialDetailContentProps) {
  const detail = useMaterialDetail(materialId);
  const type = detail.material ? getMaterialTypeMeta(detail.material.type) : null;
  const status = detail.material ? getMaterialStatus(detail.material, detail.progressItem ? [detail.progressItem] : []) : null;

  if (detail.isLoading) return <MaterialDetailSkeleton />;

  if (detail.errorMessage) {
    return <LoadErrorCard message={detail.errorMessage} onRetry={() => void detail.fetchData()} />;
  }

  if (detail.notFound || !detail.material || !type || !status) {
    return (
      <SurfaceCard>
        <h2 className="text-2xl">Material não encontrado</h2>
        <Link href="/materiais" className="student-text-action mt-4 inline-flex rounded-lg px-2 py-1 text-sm font-semibold">
          Voltar para materiais
        </Link>
      </SurfaceCard>
    );
  }

  const primaryFile = getPrimaryMaterialFile(detail.material);
  const attachments = (detail.material.attachments ?? []).filter((attachment) => attachment.id !== primaryFile?.id);

  return (
    <section className="mx-auto w-full max-w-5xl space-y-6 pb-8">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <Link
          href="/materiais"
          className="student-text-action inline-flex items-center gap-2 rounded-lg px-2 py-1 text-sm font-semibold text-[var(--color-text-muted)]"
        >
          <ArrowLeft size={16} aria-hidden="true" />
          Materiais
        </Link>
        <MaterialDetailSidebar
          material={detail.material}
          typeLabel={type.label}
          status={status}
          progressPercentage={detail.progressPercentage}
          progressErrorMessage={detail.progressErrorMessage}
          isUpdatingProgress={detail.isUpdatingProgress}
          onMarkAsCompleted={() => void detail.markAsCompleted()}
        />
      </div>

      <header className="flex flex-wrap items-start justify-between gap-3 border-b pb-5" style={{ borderColor: "var(--color-border)" }}>
        <div className="max-w-3xl">
          <p className="student-muted-text text-sm">Materiais / {type.label}</p>
          <h1 className="mt-1 text-3xl">{detail.material.title}</h1>
          {detail.material.description ? (
            <p className="student-muted-text mt-2 max-w-2xl text-sm">{detail.material.description}</p>
          ) : null}
        </div>
        <StatusBadge label={status.label} tone={status.tone} />
      </header>

      <MaterialViewer material={detail.material} typeLabel={type.label} />

      {attachments.length > 0 ? (
        <section className="border-t pt-6" style={{ borderColor: "var(--color-border)" }}>
          <div className="flex flex-wrap items-end justify-between gap-2">
            <div>
              <h2 className="text-xl">Materiais de apoio</h2>
              <p className="student-muted-text mt-1 text-sm">Arquivos anexados a este conteúdo.</p>
            </div>
          </div>
          <div className="mt-3 grid gap-2 sm:grid-cols-2">
            {attachments.map((attachment) => (
              <AttachmentCard key={attachment.id} attachment={attachment} />
            ))}
          </div>
        </section>
      ) : null}
    </section>
  );
}
