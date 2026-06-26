"use client";

import { LoadErrorCard } from "@/components/student/LoadErrorCard";
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

  if (manager.errorMessage && manager.materials.length === 0) {
    return <LoadErrorCard message={manager.errorMessage} onRetry={() => void manager.loadMaterials()} />;
  }

  return (
    <div className="grid gap-5 xl:grid-cols-[380px_1fr]">
      <AdminMaterialForm
        form={manager.form}
        selectedMaterial={manager.selectedMaterial}
        file={manager.file}
        errorMessage={manager.errorMessage}
        uploadType={manager.uploadType}
        isSaving={manager.isSaving}
        isUploading={manager.isUploading}
        onFieldChange={manager.updateField}
        onFileChange={manager.setFile}
        onReset={manager.resetForm}
        onSubmit={manager.handleSubmit}
        onUpload={() => void manager.handleUpload()}
      />

      <AdminMaterialsList
        materials={manager.materials}
        onEdit={manager.selectMaterial}
        onDelete={(material) => void manager.handleDelete(material)}
      />
    </div>
  );
}
