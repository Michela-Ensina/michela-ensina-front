import { useCallback, useEffect, useMemo, useState, type FormEvent } from "react";
import { toast } from "sonner";

import {
  emptyMaterialForm,
  getAdminUploadType,
  toAdminMaterialFormState,
  toAdminMaterialPayload,
  type MaterialFormState,
} from "@/lib/student/admin-material-form";
import { validateAdminUploadFile } from "@/lib/student/admin-upload-validation";
import {
  createAdminMaterial,
  deleteAdminMaterial,
  getAdminMaterials,
  updateAdminMaterial,
  uploadAdminMaterialFile,
} from "@/lib/api/admin-materials";
import { ApiClientError } from "@/lib/api/errors";
import { resolveYoutubeEmbedUrl } from "@/lib/student/material-media";
import type { AdminMaterial } from "@/types/admin";
import type { MaterialAttachment } from "@/types/student";

export function useAdminMaterialsManager(token: string | null, isAdmin: boolean) {
  const [materials, setMaterials] = useState<AdminMaterial[]>([]);
  const [selectedMaterial, setSelectedMaterial] = useState<AdminMaterial | null>(null);
  const [form, setForm] = useState<MaterialFormState>(emptyMaterialForm);
  const [file, setFile] = useState<File | null>(null);
  const [attachedFiles, setAttachedFiles] = useState<MaterialAttachment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const uploadType = useMemo(() => getAdminUploadType(form.type), [form.type]);

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
    if (field === "type" && form.type !== value) {
      setFile(null);
      setAttachedFiles([]);
      setForm((current) => ({
        ...current,
        [field]: value,
        url: "",
        attachmentIds: [],
      }));
      return;
    }

    setForm((current) => {
      return { ...current, [field]: value };
    });
  }

  function resetForm() {
    setSelectedMaterial(null);
    setForm(emptyMaterialForm);
    setFile(null);
    setAttachedFiles([]);
  }

  function selectMaterial(material: AdminMaterial) {
    setSelectedMaterial(material);
    setForm(toAdminMaterialFormState(material));
    setFile(null);
    setAttachedFiles(material.attachments ?? []);
  }

  async function handleUpload() {
    if (!file || !token || !uploadType) return;

    const validationMessage = validateAdminUploadFile(file, uploadType);
    if (validationMessage) {
      setErrorMessage(validationMessage);
      toast.error(validationMessage);
      return;
    }

    setIsUploading(true);
    setErrorMessage(null);

    try {
      const upload = await uploadAdminMaterialFile(file, uploadType, token);
      const shouldReplacePrimaryFile = form.type === "pdf" || form.type === "attachment";
      const nextAttachmentIds = shouldReplacePrimaryFile ? [upload.id] : [...form.attachmentIds, upload.id];

      if (shouldReplacePrimaryFile) {
        updateField("url", upload.url);
      }
      updateField("attachmentIds", nextAttachmentIds);
      setAttachedFiles((current) => (shouldReplacePrimaryFile ? [upload] : [...current, upload]));
      setFile(null);
      toast.success("Arquivo enviado com sucesso.");
    } catch (error) {
      const message = error instanceof ApiClientError ? error.message : "Não foi possível enviar o arquivo.";
      setErrorMessage(message);
      toast.error(message);
    } finally {
      setIsUploading(false);
    }
  }

  function removeAttachedFile(attachmentId: string) {
    setAttachedFiles((current) => current.filter((attachment) => attachment.id !== attachmentId));
    setForm((current) => {
      const nextAttachmentIds = current.attachmentIds.filter((id) => id !== attachmentId);

      return {
        ...current,
        attachmentIds: nextAttachmentIds,
        url:
          (current.type === "pdf" || current.type === "attachment") && nextAttachmentIds.length === 0
            ? ""
            : current.url,
      };
    });
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!token) return;

    const payload = toAdminMaterialPayload(form);

    if (!payload.title) {
      const message = "Informe o título do material.";
      setErrorMessage(message);
      toast.error(message);
      return;
    }

    if (payload.type === "video" && !resolveYoutubeEmbedUrl(payload.url)) {
      const message = "Informe uma URL válida do YouTube para o vídeo.";
      setErrorMessage(message);
      toast.error(message);
      return;
    }

    if ((payload.type === "pdf" || payload.type === "attachment") && payload.attachment_ids?.length === 0) {
      const message = payload.type === "pdf" ? "Envie o PDF do material." : "Envie o arquivo do anexo.";
      setErrorMessage(message);
      toast.error(message);
      return;
    }

    if (payload.type === "other" && !payload.url) {
      const message = "Informe o link do material.";
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

  return {
    materials,
    selectedMaterial,
    form,
    file,
    attachedFiles,
    isLoading,
    isSaving,
    isUploading,
    errorMessage,
    uploadType,
    handleDelete,
    handleSubmit,
    handleUpload,
    loadMaterials,
    removeAttachedFile,
    resetForm,
    selectMaterial,
    setFile,
    updateField,
  };
}
