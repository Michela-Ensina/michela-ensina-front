"use client";

import { FilePlus2 } from "lucide-react";

import { LoadErrorCard } from "@/components/student/LoadErrorCard";
import { AdminDeleteMaterialDialog } from "@/components/student/admin/AdminDeleteMaterialDialog";
import { AdminMaterialForm } from "@/components/student/admin/AdminMaterialForm";
import { AdminMaterialsList } from "@/components/student/admin/AdminMaterialsList";
import { EmptyState } from "@/components/ui/EmptyState";
import { SurfaceCard } from "@/components/ui/SurfaceCard";
import { useAuth } from "@/lib/auth/use-auth";
import { useAdminMaterialsManager } from "@/lib/student/use-admin-materials-manager";

export function AdminMaterialsContent() {
  const { token, user } = useAuth();
  const isAdmin = Boolean(user?.roles?.includes("admin"));
  const manager = useAdminMaterialsManager(token, isAdmin);

  if (!isAdmin) {
    return (
      <EmptyState
        title="Acesso restrito"
        description="Esta área está disponível apenas para administradores."
      />
    );
  }

  if (manager.isLoading) {
    return (
      <div className="grid gap-4 xl:grid-cols-[0.78fr_1.22fr]">
        <SurfaceCard className="min-h-80 animate-pulse" />
        <SurfaceCard className="min-h-80 animate-pulse" />
      </div>
    );
  }

  if (manager.loadErrorMessage && manager.materials.length === 0) {
    return <LoadErrorCard message={manager.loadErrorMessage} onRetry={() => void manager.loadMaterials()} />;
  }

  return (
    <div className="space-y-5">
      <section
        className="student-section-surface rounded-[var(--radius-lg)] border p-5 sm:p-6"
      >
        <div className="flex flex-wrap items-center gap-4">
          <span className="grid size-11 place-items-center rounded-[var(--radius-md)] bg-[var(--color-surface-soft)] text-[var(--color-primary)]">
            <FilePlus2 size={20} aria-hidden="true" />
          </span>
          <div className="max-w-2xl">
            <h2 className="text-2xl">Materiais da fase 1</h2>
            <p className="student-muted-text mt-1 text-sm">
              Cadastre vídeos, PDFs e anexos usando apenas os campos aceitos pelo backend.
            </p>
          </div>
        </div>
      </section>

      <div className="grid gap-5 xl:grid-cols-[400px_1fr]">
        <AdminMaterialForm
          form={manager.form}
          selectedMaterial={manager.selectedMaterial}
          primaryFile={manager.primaryFile}
          supportFile={manager.supportFile}
          attachedFiles={manager.attachedFiles}
          products={manager.products}
          productsErrorMessage={manager.productsErrorMessage}
          errorMessage={manager.errorMessage}
          primaryUploadType={manager.primaryUploadType}
          supportUploadType={manager.supportUploadType}
          isSaving={manager.isSaving}
          isUploading={manager.isUploading}
          onFieldChange={manager.updateField}
          onPrimaryFileChange={manager.setPrimaryFile}
          onSupportFileChange={manager.setSupportFile}
          onFileRejected={manager.rejectFile}
          onReset={manager.resetForm}
          onSubmit={manager.handleSubmit}
          onPrimaryUpload={() => void manager.handlePrimaryUpload()}
          onSupportUpload={() => void manager.handleSupportUpload()}
          onRemoveAttachment={manager.removeAttachedFile}
          onAttachmentDownloadableChange={manager.setAttachmentDownloadable}
          onToggleProduct={manager.toggleProduct}
        />

        <AdminMaterialsList
          materials={manager.materials}
          onEdit={manager.selectMaterial}
          onDelete={manager.requestDeleteMaterial}
        />
      </div>

      <AdminDeleteMaterialDialog
        material={manager.materialPendingDeletion}
        isDeleting={manager.isDeleting}
        onClose={manager.cancelDeleteMaterial}
        onConfirm={() => void manager.confirmDeleteMaterial()}
      />
    </div>
  );
}
