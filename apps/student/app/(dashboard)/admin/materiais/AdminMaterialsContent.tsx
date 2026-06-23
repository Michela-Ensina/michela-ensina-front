"use client";

import { useCallback, useEffect, useMemo, useState, type FormEvent } from "react";
import { toast } from "sonner";

import { LoadErrorCard } from "@/components/student/LoadErrorCard";
import { AdminMaterialForm, type MaterialFormState } from "@/components/student/admin/AdminMaterialForm";
import { AdminMaterialsList } from "@/components/student/admin/AdminMaterialsList";
import { EmptyState } from "@/components/ui/EmptyState";
import { SurfaceCard } from "@/components/ui/SurfaceCard";
import {
  createAdminMaterial,
  deleteAdminMaterial,
  getAdminMaterials,
  updateAdminMaterial,
  uploadAdminMaterialFile,
} from "@/lib/api/admin-materials";
import { ApiClientError } from "@/lib/api/errors";
import { useAuth } from "@/lib/auth/use-auth";
import type { AdminMaterial, AdminMaterialPayload, AdminUploadType } from "@/types/admin";
import type { MaterialType } from "@/types/student";

const emptyForm: MaterialFormState = {
  title: "",
  description: "",
  type: "video",
  url: "",
  order: "0",
  isActive: true,
};

function getUploadType(type: MaterialType): AdminUploadType | null {
  if (type === "pdf") return "pdf";
  if (type === "attachment") return "attachment";
  if (type === "other") return "other";
  return null;
}

function toPayload(form: MaterialFormState): AdminMaterialPayload {
  return {
    title: form.title.trim(),
    description: form.description.trim() || null,
    type: form.type,
    url: form.url.trim(),
    order: Number(form.order || 0),
    is_active: form.isActive,
  };
}

function toFormState(material: AdminMaterial): MaterialFormState {
  return {
    title: material.title,
    description: material.description ?? "",
    type: material.type,
    url: material.url,
    order: String(material.order),
    isActive: material.is_active,
  };
}

export function AdminMaterialsContent() {
  const { token, user } = useAuth();
  const [materials, setMaterials] = useState<AdminMaterial[]>([]);
  const [selectedMaterial, setSelectedMaterial] = useState<AdminMaterial | null>(null);
  const [form, setForm] = useState<MaterialFormState>(emptyForm);
  const [file, setFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const isAdmin = Boolean(user?.roles?.includes("admin"));
  const uploadType = useMemo(() => getUploadType(form.type), [form.type]);

  const loadMaterials = useCallback(async () => {
    if (!token || !isAdmin) return;

    setIsLoading(true);
    setErrorMessage(null);

    try {
      const nextMaterials = await getAdminMaterials(token);
      setMaterials(nextMaterials);
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : "Não foi possível carregar os materiais.");
    } finally {
      setIsLoading(false);
    }
  }, [isAdmin, token]);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      void loadMaterials();
    }, 0);

    return () => {
      window.clearTimeout(timer);
    };
  }, [loadMaterials]);

  function updateField<TField extends keyof MaterialFormState>(field: TField, value: MaterialFormState[TField]) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  function resetForm() {
    setSelectedMaterial(null);
    setForm(emptyForm);
    setFile(null);
  }

  function selectMaterial(material: AdminMaterial) {
    setSelectedMaterial(material);
    setForm(toFormState(material));
    setFile(null);
  }

  async function handleUpload() {
    if (!file || !token || !uploadType) return;

    setIsUploading(true);
    setErrorMessage(null);

    try {
      const upload = await uploadAdminMaterialFile(file, uploadType, token);
      updateField("url", upload.url);
      toast.success("Arquivo enviado com sucesso.");
    } catch (error) {
      const message = error instanceof ApiClientError ? error.message : "Não foi possível enviar o arquivo.";
      setErrorMessage(message);
      toast.error(message);
    } finally {
      setIsUploading(false);
    }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!token) return;

    const payload = toPayload(form);

    if (!payload.title || !payload.url) {
      const message = "Informe título e URL do material.";
      setErrorMessage(message);
      toast.error(message);
      return;
    }

    setIsSaving(true);
    setErrorMessage(null);

    try {
      if (selectedMaterial) {
        await updateAdminMaterial(selectedMaterial.id, payload, token);
        toast.success("Material atualizado com sucesso.");
      } else {
        await createAdminMaterial(payload, token);
        toast.success("Material criado com sucesso.");
      }

      resetForm();
      await loadMaterials();
    } catch (error) {
      const message = error instanceof ApiClientError ? error.message : "Não foi possível salvar o material.";
      setErrorMessage(message);
      toast.error(message);
    } finally {
      setIsSaving(false);
    }
  }

  async function handleDelete(material: AdminMaterial) {
    if (!token) return;

    const confirmed = window.confirm(`Remover "${material.title}"?`);
    if (!confirmed) return;

    try {
      await deleteAdminMaterial(material.id, token);
      toast.success("Material removido com sucesso.");
      if (selectedMaterial?.id === material.id) {
        resetForm();
      }
      await loadMaterials();
    } catch (error) {
      const message = error instanceof ApiClientError ? error.message : "Não foi possível remover o material.";
      setErrorMessage(message);
      toast.error(message);
    }
  }

  if (!isAdmin) {
    return (
      <EmptyState
        title="Acesso restrito"
        description="Esta área está disponível apenas para administradores."
      />
    );
  }

  if (isLoading) {
    return (
      <div className="grid gap-4 xl:grid-cols-[0.78fr_1.22fr]">
        <SurfaceCard className="min-h-80 animate-pulse" />
        <SurfaceCard className="min-h-80 animate-pulse" />
      </div>
    );
  }

  if (errorMessage && materials.length === 0) {
    return <LoadErrorCard message={errorMessage} onRetry={() => void loadMaterials()} />;
  }

  return (
    <div className="grid gap-5 xl:grid-cols-[380px_1fr]">
      <AdminMaterialForm
        form={form}
        selectedMaterial={selectedMaterial}
        file={file}
        errorMessage={errorMessage}
        uploadType={uploadType}
        isSaving={isSaving}
        isUploading={isUploading}
        onFieldChange={updateField}
        onFileChange={setFile}
        onReset={resetForm}
        onSubmit={handleSubmit}
        onUpload={() => void handleUpload()}
      />

      <AdminMaterialsList
        materials={materials}
        onEdit={selectMaterial}
        onDelete={(material) => void handleDelete(material)}
      />
    </div>
  );
}
