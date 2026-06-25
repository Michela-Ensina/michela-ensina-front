"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { LoadErrorCard } from "@/components/student/LoadErrorCard";
import { MaterialDetailSidebar } from "@/components/student/materials/MaterialDetailSidebar";
import { MaterialViewer } from "@/components/student/materials/MaterialViewer";
import { useMaterialDetail } from "@/components/student/materials/use-material-detail";
import { SectionHeader } from "@/components/student/SectionHeader";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { SurfaceCard } from "@/components/ui/SurfaceCard";

type MaterialDetailContentProps = {
  materialId: string;
};

export function MaterialDetailContent({ materialId }: MaterialDetailContentProps) {
  const materialDetail = useMaterialDetail(materialId);

  if (materialDetail.isLoading) {
    return <SurfaceCard className="min-h-80 animate-pulse" />;
  }

  if (materialDetail.errorMessage) {
    return (
      <LoadErrorCard
        message={materialDetail.errorMessage}
        onRetry={() => void materialDetail.fetchData()}
      />
    );
  }

  if (materialDetail.notFound || !materialDetail.material || !materialDetail.type) {
    return (
      <SurfaceCard>
        <h2 className="text-2xl">Material não encontrado</h2>
        <p className="mt-2 text-sm" style={{ color: "var(--color-text-muted)" }}>
          Este material não está disponível para a sua conta.
        </p>
        <Link href="/materiais" className="student-text-action mt-4 inline-flex items-center gap-2 rounded-lg px-2 py-1 text-sm font-semibold" style={{ color: "var(--color-primary)" }}>
          <ArrowLeft size={16} aria-hidden="true" />
          Voltar para materiais
        </Link>
      </SurfaceCard>
    );
  }

  return (
    <div className="grid gap-5 xl:grid-cols-[1fr_360px]">
      <section className="space-y-5">
        <Link href="/materiais" className="student-text-action inline-flex items-center gap-2 rounded-lg px-2 py-1 text-sm font-semibold" style={{ color: "var(--color-text-muted)" }}>
          <ArrowLeft size={16} aria-hidden="true" />
          Materiais
        </Link>

        <SectionHeader
          title={materialDetail.material.title}
          description={materialDetail.material.description ?? "Material disponível para estudo."}
          action={<StatusBadge label={materialDetail.status.label} tone={materialDetail.status.tone} />}
        />

        <MaterialViewer
          material={materialDetail.material}
          typeLabel={materialDetail.type.label}
        />
      </section>

      <MaterialDetailSidebar
        material={materialDetail.material}
        typeLabel={materialDetail.type.label}
        status={materialDetail.status}
        progressPercentage={materialDetail.progressPercentage}
        progressErrorMessage={materialDetail.progressErrorMessage}
        isUpdatingProgress={materialDetail.isUpdatingProgress}
        onMarkAsCompleted={() => void materialDetail.markAsCompleted()}
      />
    </div>
  );
}
