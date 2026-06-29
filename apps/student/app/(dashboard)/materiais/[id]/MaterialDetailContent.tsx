"use client";

import Link from "next/link";
import { useState } from "react";
import { Maximize2, Minimize2 } from "lucide-react";

import { getStudentNavItems } from "@/components/layout/student-navigation";
import { LoadErrorCard } from "@/components/student/LoadErrorCard";
import { MaterialAttachmentsList } from "@/components/student/materials/MaterialAttachmentsList";
import { MaterialDetailSidebar } from "@/components/student/materials/MaterialDetailSidebar";
import { getMaterialStatus, getMaterialTypeMeta } from "@/components/student/materials/material-display";
import { MaterialTheaterShell } from "@/components/student/materials/MaterialTheaterShell";
import { MaterialViewer } from "@/components/student/materials/MaterialViewer";
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

export function MaterialDetailContent({ materialId }: MaterialDetailContentProps) {
  const { token, user } = useAuth();
  const detail = useMaterialDetail(materialId);
  const [isTheaterMode, setIsTheaterMode] = useState(false);
  const type = detail.material ? getMaterialTypeMeta(detail.material.type) : null;
  const status = detail.material ? getMaterialStatus(detail.material, detail.progressItem ? [detail.progressItem] : []) : null;
  const navItems = getStudentNavItems(Boolean(user?.roles?.includes("admin")));

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

  const attachments = getSupportingMaterialAttachments(detail.material);
  const actions = (
    <div className="flex flex-wrap items-center gap-2">
      <Button type="button" variant="outline" size="sm" className="gap-2" onClick={() => setIsTheaterMode((current) => !current)}>
        {isTheaterMode ? <Minimize2 size={15} aria-hidden="true" /> : <Maximize2 size={15} aria-hidden="true" />}
        {isTheaterMode ? "Modo normal" : "Modo teatro"}
      </Button>
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
            ? "student-theater-stage relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] w-screen px-4 py-5 sm:px-6 sm:py-7"
            : "",
        )}
      >
        <div className={cn(isTheaterMode ? "mx-auto w-full max-w-[84rem]" : "")}>
          <MaterialViewer
            material={detail.material}
            typeLabel={type.label}
            isTheaterMode={isTheaterMode}
            token={token}
          />
        </div>
      </div>

      <div className={cn(isTheaterMode ? "mx-auto w-full max-w-7xl" : "")}>
        <MaterialAttachmentsList
          attachments={attachments}
          materialId={detail.material.id}
          token={token}
        />
      </div>
    </MaterialTheaterShell>
  );
}
