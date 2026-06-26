"use client";

import Link from "next/link";
import { ArrowLeft, FileText, Paperclip } from "lucide-react";

import { LoadErrorCard } from "@/components/student/LoadErrorCard";
import { MaterialDetailSidebar } from "@/components/student/materials/MaterialDetailSidebar";
import { getMaterialStatus, getMaterialTypeMeta } from "@/components/student/materials/material-display";
import { MaterialViewer } from "@/components/student/materials/MaterialViewer";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { SurfaceCard } from "@/components/ui/SurfaceCard";
import { useMaterialDetail } from "@/lib/student/use-material-detail";

type MaterialDetailContentProps = { materialId: string };

export function MaterialDetailContent({ materialId }: MaterialDetailContentProps) {
  const detail = useMaterialDetail(materialId);
  const type = detail.material ? getMaterialTypeMeta(detail.material.type) : null;
  const status = detail.material ? getMaterialStatus(detail.material, detail.progressItem ? [detail.progressItem] : []) : null;

  if (detail.isLoading) return <div className="space-y-5"><div className="h-9 w-48 animate-pulse rounded-lg bg-[var(--color-surface)]" /><div className="aspect-video animate-pulse rounded-[var(--radius-lg)] bg-[var(--color-surface)]" /><div className="h-28 animate-pulse rounded-[var(--radius-md)] bg-[var(--color-surface)]" /></div>;
  if (detail.errorMessage) return <LoadErrorCard message={detail.errorMessage} onRetry={() => void detail.fetchData()} />;
  if (detail.notFound || !detail.material || !type || !status) return <SurfaceCard><h2 className="text-2xl">Material não encontrado</h2><Link href="/materiais" className="student-text-action mt-4 inline-flex rounded-lg px-2 py-1 text-sm font-semibold">Voltar para materiais</Link></SurfaceCard>;

  const attachments = detail.material.attachments ?? [];
  return (
    <section className="mx-auto w-full max-w-5xl space-y-6 pb-8">
      <div className="flex items-center justify-between gap-4">
        <Link href="/materiais" className="student-text-action inline-flex items-center gap-2 rounded-lg px-2 py-1 text-sm font-semibold text-[var(--color-text-muted)]"><ArrowLeft size={16} /> Materiais</Link>
        <MaterialDetailSidebar material={detail.material} typeLabel={type.label} status={status} progressPercentage={detail.progressPercentage} progressErrorMessage={detail.progressErrorMessage} isUpdatingProgress={detail.isUpdatingProgress} onMarkAsCompleted={() => void detail.markAsCompleted()} />
      </div>
      <div className="flex flex-wrap items-start justify-between gap-3 border-b pb-5" style={{ borderColor: "var(--color-border)" }}>
        <div><p className="student-muted-text text-sm">Materiais / {type.label}</p><h1 className="mt-1 text-3xl">{detail.material.title}</h1>{detail.material.description ? <p className="student-muted-text mt-2 max-w-2xl text-sm">{detail.material.description}</p> : null}</div>
        <StatusBadge label={status.label} tone={status.tone} />
      </div>
      <MaterialViewer material={detail.material} typeLabel={type.label} />
      {attachments.length > 0 ? <div className="border-t pt-6" style={{ borderColor: "var(--color-border)" }}><h2 className="text-xl">Materiais de apoio</h2><div className="mt-3 grid gap-2 sm:grid-cols-2">{attachments.map((attachment) => <a key={attachment.id} href={attachment.url} target="_blank" rel="noreferrer" className="student-action student-hover-surface flex items-center gap-3 rounded-[var(--radius-sm)] border p-3" style={{ borderColor: "var(--color-border)", backgroundColor: "var(--color-surface)" }}><span className="grid size-9 place-items-center rounded-lg bg-[var(--color-surface-soft)] text-[var(--color-primary)]">{attachment.type === "pdf" ? <FileText size={18} /> : <Paperclip size={18} />}</span><span className="min-w-0 truncate text-sm font-semibold">{attachment.original_name}</span></a>)}</div></div> : null}
    </section>
  );
}
