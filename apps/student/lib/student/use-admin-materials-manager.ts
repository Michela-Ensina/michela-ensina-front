import { useCallback, useEffect, useMemo, useState, type FormEvent } from "react";
import { toast } from "sonner";

import {
  emptyMaterialForm,
  getAdminUploadType,
  normalizeFormAttachments,
  toAdminMaterialAttachmentsPayload,
  toAdminMaterialFormState,
  toAdminMaterialPayload,
  type MaterialFormAttachment,
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
import type { AdminMaterial, AdminProduct, AdminUpload, AdminUploadType } from "@/types/admin";
import type { MaterialAttachment, MaterialType } from "@/types/student";

type UploadPurpose = "primary" | "support";

type UploadedState = {
  url: string;
  attachments: MaterialFormAttachment[];
  attachedFiles: MaterialAttachment[];
};

function getPrimaryAttachmentForType(
  type: MaterialType,
  attachments: MaterialAttachment[],
) {
  if (type === "pdf") {
    return attachments.find((attachment) => attachment.type === "pdf") ?? null;
  }

  if (type === "attachment") {
    return attachments[0] ?? null;
  }

  return null;
}

export function useAdminMaterialsManager(token: string | null, isAdmin: boolean) {
  const [materials, setMaterials] = useState<AdminMaterial[]>([]);
  const [products, setProducts] = useState<AdminProduct[]>([]);
  const [selectedMaterial, setSelectedMaterial] = useState<AdminMaterial | null>(null);
  const [form, setForm] = useState<MaterialFormState>(emptyMaterialForm);
  const [primaryFile, setPrimaryFile] = useState<File | null>(null);
  const [supportFile, setSupportFile] = useState<File | null>(null);
  const [attachedFiles, setAttachedFiles] = useState<MaterialAttachment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [materialPendingDeletion, setMaterialPendingDeletion] = useState<AdminMaterial | null>(null);
  const [loadErrorMessage, setLoadErrorMessage] = useState<string | null>(null);
  const [productsErrorMessage, setProductsErrorMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const primaryUploadType = useMemo(() => {
    if (form.type === "pdf" || form.type === "attachment") {
      return getAdminUploadType(form.type);
    }

    return null;
  }, [form.type]);
  const supportUploadType: AdminUploadType = "attachment";

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
      setPrimaryFile(null);
      setSupportFile(null);
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
    setPrimaryFile(null);
    setSupportFile(null);
    setAttachedFiles([]);
  }

  function selectMaterial(material: AdminMaterial) {
    setSelectedMaterial(material);
    setForm(toAdminMaterialFormState(material));
    setPrimaryFile(null);
    setSupportFile(null);
    setAttachedFiles(material.attachments ?? []);
  }

  function buildAttachmentPayload(
    attachments: MaterialFormAttachment[],
    files: MaterialAttachment[],
  ) {
    const primaryAttachment = getPrimaryAttachmentForType(form.type, files);

    return toAdminMaterialAttachmentsPayload(attachments).map((attachment) => ({
      ...attachment,
      downloadable:
        attachment.id === primaryAttachment?.id ? false : attachment.downloadable,
    }));
  }

  function applyUploadedFile(
    upload: AdminUpload,
    purpose: UploadPurpose,
    currentState: UploadedState = {
      url: form.url,
      attachments: form.attachments,
      attachedFiles,
    },
  ): UploadedState {
    if (purpose === "primary") {
      const currentPrimary = getPrimaryAttachmentForType(
        form.type,
        currentState.attachedFiles,
      );
      const supportAttachments = currentState.attachments.filter(
        (attachment) => attachment.id !== currentPrimary?.id,
      );
      const nextAttachments = normalizeFormAttachments([
        { id: upload.id, downloadable: false },
        ...supportAttachments,
      ]);
      const nextAttachedFiles = [
        { ...upload, downloadable: false },
        ...currentState.attachedFiles.filter(
          (attachment) => attachment.id !== currentPrimary?.id,
        ),
      ];

      updateField("url", upload.url);
      updateField("attachments", nextAttachments);
      setAttachedFiles(nextAttachedFiles);
      setPrimaryFile(null);

      return {
        url: upload.url,
        attachments: nextAttachments,
        attachedFiles: nextAttachedFiles,
      };
    }

    const nextAttachments = normalizeFormAttachments([
      ...currentState.attachments,
      { id: upload.id, downloadable: false },
    ]);
    const nextAttachedFiles = currentState.attachedFiles.some(
      (attachment) => attachment.id === upload.id,
    )
      ? currentState.attachedFiles
      : [...currentState.attachedFiles, { ...upload, downloadable: false }];

    updateField("attachments", nextAttachments);
    setAttachedFiles(nextAttachedFiles);
    setSupportFile(null);

    return {
      url: currentState.url,
      attachments: nextAttachments,
      attachedFiles: nextAttachedFiles,
    };
  }

  async function uploadSelectedFile(purpose: UploadPurpose, currentState?: UploadedState) {
    const selectedFile = purpose === "primary" ? primaryFile : supportFile;
    const selectedUploadType = purpose === "primary" ? primaryUploadType : supportUploadType;

    if (!selectedFile || !token || !selectedUploadType) return null;

    const validationMessage = validateAdminUploadFile(selectedFile, selectedUploadType);
    if (validationMessage) {
      setErrorMessage(validationMessage);
      toast.error(validationMessage);
      return;
    }

    setIsUploading(true);
    setErrorMessage(null);

    try {
      const upload = await uploadAdminMaterialFile(selectedFile, selectedUploadType, token);
      const uploadedState = applyUploadedFile(upload, purpose, currentState);
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

  async function handlePrimaryUpload() {
    await uploadSelectedFile("primary");
  }

  async function handleSupportUpload() {
    await uploadSelectedFile("support");
  }

  function removeAttachedFile(attachmentId: string) {
    const currentPrimary = getPrimaryAttachmentForType(form.type, attachedFiles);

    setAttachedFiles((current) => current.filter((attachment) => attachment.id !== attachmentId));
    setForm((current) => {
      const nextAttachments = normalizeFormAttachments(
        current.attachments.filter((attachment) => attachment.id !== attachmentId),
      );

      return {
        ...current,
        attachments: nextAttachments,
        url: attachmentId === currentPrimary?.id ? "" : current.url,
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
    payload.attachments = buildAttachmentPayload(form.attachments, attachedFiles);
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
      let uploadedState: UploadedState = {
        url: payload.url,
        attachments: form.attachments,
        attachedFiles,
      };

      if (primaryFile) {
        const nextUploadedState = await uploadSelectedFile("primary", uploadedState);
        if (!nextUploadedState) return;
        uploadedState = nextUploadedState;
      }

      if (supportFile) {
        const nextUploadedState = await uploadSelectedFile("support", uploadedState);
        if (!nextUploadedState) return;
        uploadedState = nextUploadedState;
      }

      payload.url = uploadedState.url;
      payload.attachments = buildAttachmentPayload(
        uploadedState.attachments,
        uploadedState.attachedFiles,
      );

      if (
        (payload.type === "pdf" || payload.type === "attachment") &&
        !getPrimaryAttachmentForType(payload.type, uploadedState.attachedFiles)
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
    primaryFile,
    supportFile,
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
    primaryUploadType,
    supportUploadType,
    cancelDeleteMaterial,
    confirmDeleteMaterial,
    handleSubmit,
    handlePrimaryUpload,
    handleSupportUpload,
    loadMaterials,
    removeAttachedFile,
    rejectFile,
    requestDeleteMaterial,
    resetForm,
    selectMaterial,
    setAttachmentDownloadable,
    setPrimaryFile,
    setSupportFile,
    toggleProduct,
    updateField,
  };
}
