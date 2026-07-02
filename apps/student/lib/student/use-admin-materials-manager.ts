import { useCallback, useEffect, useMemo, useState, type FormEvent } from "react";
import { toast } from "sonner";

import {
  emptyMaterialForm,
  getAdminUploadType,
  normalizeFormAttachments,
  toAdminMaterialFormState,
  toAdminMaterialPayload,
  type MaterialFormState,
} from "@/lib/student/admin-material-form";
import {
  getAdminUploadTransportErrorMessage,
  validateAdminUploadFile,
} from "@/lib/student/admin-upload-validation";
import {
  createAdminMaterial,
  deleteAdminMaterial,
  getAdminMaterials,
  updateAdminMaterial,
  uploadAdminMaterialFile,
} from "@/lib/api/admin-materials";
import { getAdminProducts } from "@/lib/api/admin-products";
import { ApiClientError, getFirstApiFieldError } from "@/lib/api/errors";
import { resolveYoutubeEmbedUrl } from "@/lib/student/material-media";
import type { AdminMaterial, AdminProduct, AdminUpload } from "@/types/admin";
import type { MaterialAttachment } from "@/types/student";

export function useAdminMaterialsManager(token: string | null, isAdmin: boolean) {
  const [materials, setMaterials] = useState<AdminMaterial[]>([]);
  const [products, setProducts] = useState<AdminProduct[]>([]);
  const [selectedMaterial, setSelectedMaterial] = useState<AdminMaterial | null>(null);
  const [form, setForm] = useState<MaterialFormState>(emptyMaterialForm);
  const [file, setFile] = useState<File | null>(null);
  const [attachedFiles, setAttachedFiles] = useState<MaterialAttachment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [materialPendingDeletion, setMaterialPendingDeletion] = useState<AdminMaterial | null>(null);
  const [loadErrorMessage, setLoadErrorMessage] = useState<string | null>(null);
  const [productsErrorMessage, setProductsErrorMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const uploadType = useMemo(() => getAdminUploadType(form.type), [form.type]);

  const loadMaterials = useCallback(async () => {
    if (!token || !isAdmin) return;

    setIsLoading(true);
    setLoadErrorMessage(null);

    try {
      const [nextMaterials, nextProducts] = await Promise.all([
        getAdminMaterials(token),
        getAdminProducts(token).catch(() => null),
      ]);
      setMaterials(nextMaterials);
      setProducts(nextProducts ?? []);
      setProductsErrorMessage(
        nextProducts === null ? "Não foi possível carregar a lista de produtos agora." : null,
      );
    } catch (error) {
      setLoadErrorMessage(error instanceof Error ? error.message : "Não foi possível carregar os materiais.");
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
        attachments: [],
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

  function applyUploadedFile(upload: AdminUpload) {
    const shouldReplacePrimaryFile = form.type === "pdf" || form.type === "attachment";
    const nextAttachments = shouldReplacePrimaryFile
      ? [{ id: upload.id, downloadable: false }]
      : normalizeFormAttachments([
          ...form.attachments,
          { id: upload.id, downloadable: false },
        ]);

    if (shouldReplacePrimaryFile) {
      updateField("url", upload.url);
    }
    updateField("attachments", nextAttachments);
    setAttachedFiles((current) => {
      if (shouldReplacePrimaryFile) return [upload];
      if (current.some((attachment) => attachment.id === upload.id)) return current;
      return [...current, { ...upload, downloadable: false }];
    });
    setFile(null);

    return {
      url: shouldReplacePrimaryFile ? upload.url : form.url,
      attachments: nextAttachments,
    };
  }

  async function uploadSelectedFile() {
    if (!file || !token || !uploadType) return null;

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
      const uploadedState = applyUploadedFile(upload);
      toast.success("Arquivo enviado com sucesso.");
      return uploadedState;
    } catch (error) {
      const message =
        error instanceof ApiClientError
          ? getFirstApiFieldError(error) ?? error.message
          : getAdminUploadTransportErrorMessage();
      setErrorMessage(message);
      toast.error(message);
      return null;
    } finally {
      setIsUploading(false);
    }
  }

  async function handleUpload() {
    await uploadSelectedFile();
  }

  function removeAttachedFile(attachmentId: string) {
    setAttachedFiles((current) => current.filter((attachment) => attachment.id !== attachmentId));
    setForm((current) => {
      const nextAttachments = normalizeFormAttachments(
        current.attachments.filter((attachment) => attachment.id !== attachmentId),
      );

      return {
        ...current,
        attachments: nextAttachments,
        url:
          (current.type === "pdf" || current.type === "attachment") && nextAttachments.length === 0
            ?""
            : current.url,
      };
    });
  }

  function setAttachmentDownloadable(attachmentId: string, downloadable: boolean) {
    setAttachedFiles((current) =>
      current.map((attachment) =>
        attachment.id === attachmentId ? { ...attachment, downloadable } : attachment,
      ),
    );
    setForm((current) => ({
      ...current,
      attachments: current.attachments.map((attachment) =>
        attachment.id === attachmentId ? { ...attachment, downloadable } : attachment,
      ),
    }));
  }

  function toggleProduct(productId: string, checked: boolean) {
    setForm((current) => ({
      ...current,
      productIds: checked
        ? Array.from(new Set([...current.productIds, productId]))
        : current.productIds.filter((id) => id !== productId),
    }));
  }

  function rejectFile(message: string) {
    setErrorMessage(message);
    toast.error(message);
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!token) return;

    const payload = toAdminMaterialPayload(form);
    if (!selectedMaterial) {
      payload.order = materials.length;
    }

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

    if (payload.type === "other" && !payload.url) {
      const message = "Informe o link do material.";
      setErrorMessage(message);
      toast.error(message);
      return;
    }

    setIsSaving(true);
    setErrorMessage(null);

    try {
      const uploadedState = file ? await uploadSelectedFile() : null;
      if (file && !uploadedState) return;

      if (uploadedState) {
        payload.url = uploadedState.url;
        payload.attachments = uploadedState.attachments.map((attachment, index) => ({
          id: attachment.id,
          order: index,
          downloadable: attachment.downloadable,
        }));
      }

      if (
        (payload.type === "pdf" || payload.type === "attachment") &&
        payload.attachments?.length === 0
      ) {
        const message = payload.type === "pdf" ? "Envie o PDF do material." : "Envie o arquivo do anexo.";
        setErrorMessage(message);
        toast.error(message);
        return;
      }

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
      const message =
        error instanceof ApiClientError
          ? getFirstApiFieldError(error) ?? error.message
          : "Não foi possível salvar o material.";
      setErrorMessage(message);
      toast.error(message);
    } finally {
      setIsSaving(false);
    }
  }

  function requestDeleteMaterial(material: AdminMaterial) {
    setMaterialPendingDeletion(material);
  }

  function cancelDeleteMaterial() {
    if (isDeleting) return;
    setMaterialPendingDeletion(null);
  }

  async function confirmDeleteMaterial() {
    if (!token || !materialPendingDeletion) return;

    setIsDeleting(true);
    try {
      await deleteAdminMaterial(materialPendingDeletion.id, token);
      toast.success("Material removido com sucesso.");
      if (selectedMaterial?.id === materialPendingDeletion.id) {
        resetForm();
      }
      setMaterialPendingDeletion(null);
      await loadMaterials();
    } catch (error) {
      const message =
        error instanceof ApiClientError
          ? getFirstApiFieldError(error) ?? error.message
          : "Não foi possível remover o material.";
      setErrorMessage(message);
      toast.error(message);
    } finally {
      setIsDeleting(false);
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
    isDeleting,
    products,
    productsErrorMessage,
    errorMessage,
    loadErrorMessage,
    materialPendingDeletion,
    uploadType,
    cancelDeleteMaterial,
    confirmDeleteMaterial,
    handleSubmit,
    handleUpload,
    loadMaterials,
    removeAttachedFile,
    rejectFile,
    requestDeleteMaterial,
    resetForm,
    selectMaterial,
    setAttachmentDownloadable,
    setFile,
    toggleProduct,
    updateField,
  };
}
