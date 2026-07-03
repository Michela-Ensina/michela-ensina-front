import { useEffect, useRef, type ChangeEvent } from "react";
import { FileUp, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  getAdminUploadAcceptValue,
  getAdminUploadHelpText,
  validateAdminUploadFile,
} from "@/lib/student/admin-upload-validation";
import type { AdminUploadType } from "@/types/admin";
import type { MaterialAttachment, MaterialType } from "@/types/student";

type AdminMaterialUploadProps = {
  primaryFile: File | null;
  supportFile: File | null;
  attachedFiles: MaterialAttachment[];
  isUploading: boolean;
  primaryUploadType: AdminUploadType | null;
  supportUploadType: AdminUploadType;
  materialType: MaterialType;
  onPrimaryFileChange: (file: File | null) => void;
  onSupportFileChange: (file: File | null) => void;
  onFileRejected: (message: string) => void;
  onPrimaryUpload: () => void;
  onSupportUpload: () => void;
  onRemoveAttachment: (attachmentId: string) => void;
  onAttachmentDownloadableChange: (attachmentId: string, downloadable: boolean) => void;
};

type FileUploadControlProps = {
  id: string;
  label: string;
  file: File | null;
  isUploading: boolean;
  uploadType: AdminUploadType;
  onFileChange: (file: File | null) => void;
  onFileRejected: (message: string) => void;
  onUpload: () => void;
};

function FileUploadControl({
  id,
  label,
  file,
  isUploading,
  uploadType,
  onFileChange,
  onFileRejected,
  onUpload,
}: FileUploadControlProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const uploadHelpText = getAdminUploadHelpText(uploadType);

  useEffect(() => {
    if (!file && inputRef.current) {
      inputRef.current.value = "";
    }
  }, [file]);

  function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
    const nextFile = event.target.files?.[0] ?? null;

    if (!nextFile) {
      onFileChange(null);
      return;
    }

    const validationMessage = validateAdminUploadFile(nextFile, uploadType);
    if (validationMessage) {
      onFileChange(null);
      event.target.value = "";
      onFileRejected(validationMessage);
      return;
    }

    onFileChange(nextFile);
  }

  return (
    <div className="min-w-0">
      <Label htmlFor={id}>{label}</Label>
      <input
        id={id}
        ref={inputRef}
        type="file"
        accept={getAdminUploadAcceptValue(uploadType)}
        className="sr-only"
        onChange={handleFileChange}
      />
      <div className="mt-2 flex flex-col gap-2 sm:flex-row sm:items-center">
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="w-full gap-2 sm:w-auto"
          onClick={() => inputRef.current?.click()}
        >
          <FileUp size={16} aria-hidden="true" />
          Selecionar arquivo
        </Button>
        <div className="student-soft-surface flex min-h-9 min-w-0 flex-1 items-center justify-between gap-2 rounded-[var(--radius-sm)] border px-3 py-2 text-sm">
          <span className="student-muted-text min-w-0 truncate">
            {file?.name ?? "Nenhum arquivo selecionado"}
          </span>
          {file ? (
            <button
              type="button"
              className="student-action student-hover-surface grid size-7 shrink-0 place-items-center rounded-lg text-[var(--color-text-muted)]"
              onClick={() => onFileChange(null)}
              aria-label={`Remover ${file.name}`}
            >
              <X size={14} aria-hidden="true" />
            </button>
          ) : null}
        </div>
      </div>
      <p className="student-muted-text mt-2 text-xs">
        O arquivo selecionado será enviado ao salvar. Use o envio manual para adicioná-lo antes de criar.
      </p>
      <p className="student-muted-text mt-1 text-xs">{uploadHelpText}</p>
      <Button
        type="button"
        variant="outline"
        size="sm"
        className="mt-3 w-full gap-2 sm:w-auto"
        disabled={!file || isUploading}
        onClick={onUpload}
      >
        <FileUp size={16} aria-hidden="true" />
        {isUploading ? "Enviando..." : "Adicionar agora"}
      </Button>
    </div>
  );
}

function getPrimaryAttachment(
  materialType: MaterialType,
  attachments: MaterialAttachment[],
) {
  if (materialType === "pdf") {
    return attachments.find((attachment) => attachment.type === "pdf") ?? null;
  }

  if (materialType === "attachment") {
    return attachments[0] ?? null;
  }

  return null;
}

function getSupportAttachments(
  materialType: MaterialType,
  attachments: MaterialAttachment[],
) {
  const primaryAttachment = getPrimaryAttachment(materialType, attachments);
  const seenIds = new Set<string>();

  return attachments.filter((attachment) => {
    if (attachment.id === primaryAttachment?.id || seenIds.has(attachment.id)) {
      return false;
    }

    seenIds.add(attachment.id);
    return true;
  });
}

export function AdminMaterialUpload({
  primaryFile,
  supportFile,
  attachedFiles,
  isUploading,
  primaryUploadType,
  supportUploadType,
  materialType,
  onPrimaryFileChange,
  onSupportFileChange,
  onFileRejected,
  onPrimaryUpload,
  onSupportUpload,
  onRemoveAttachment,
  onAttachmentDownloadableChange,
}: AdminMaterialUploadProps) {
  const primaryAttachment = getPrimaryAttachment(materialType, attachedFiles);
  const supportAttachments = getSupportAttachments(materialType, attachedFiles);
  const primaryLabel =
    materialType === "pdf" ? "PDF do material" : "Arquivo principal";
  const supportLabel =
    materialType === "video" ? "Anexo de apoio ao vídeo" : "Materiais de apoio";

  return (
    <div className="student-soft-surface min-w-0 space-y-4 rounded-[var(--radius-md)] border p-4">
      {primaryUploadType ? (
        <div className="min-w-0">
          <FileUploadControl
            id="materialPrimaryFile"
            label={primaryLabel}
            file={primaryFile}
            isUploading={isUploading}
            uploadType={primaryUploadType}
            onFileChange={onPrimaryFileChange}
            onFileRejected={onFileRejected}
            onUpload={onPrimaryUpload}
          />
          {primaryAttachment ? (
            <div className="mt-3 rounded-[var(--radius-sm)] border px-3 py-2 text-sm" style={{ borderColor: "var(--color-border)" }}>
              <p className="font-semibold">Arquivo principal</p>
              <div className="mt-2 flex items-start justify-between gap-3">
                <p className="student-muted-text min-w-0 truncate">{primaryAttachment.original_name}</p>
                <button
                  type="button"
                  className="student-action student-hover-surface grid size-7 shrink-0 place-items-center rounded-lg text-[var(--color-text-muted)]"
                  onClick={() => onRemoveAttachment(primaryAttachment.id)}
                  aria-label={`Remover ${primaryAttachment.original_name}`}
                >
                  <X size={14} aria-hidden="true" />
                </button>
              </div>
            </div>
          ) : null}
        </div>
      ) : null}

      <FileUploadControl
        id="materialSupportFile"
        label={supportLabel}
        file={supportFile}
        isUploading={isUploading}
        uploadType={supportUploadType}
        onFileChange={onSupportFileChange}
        onFileRejected={onFileRejected}
        onUpload={onSupportUpload}
      />

      {supportAttachments.length > 0 ? (
        <div className="rounded-[var(--radius-sm)] border px-3 py-2 text-sm" style={{ borderColor: "var(--color-border)" }}>
          <p className="font-semibold">Anexos vinculados</p>
          {supportAttachments.map((attachment) => (
            <div key={attachment.id} className="mt-2 flex items-start justify-between gap-3">
              <div className="min-w-0 flex-1">
                <p className="student-muted-text min-w-0 truncate">{attachment.original_name}</p>
                <label className="student-action mt-2 flex items-center gap-2 text-xs font-semibold">
                  <Checkbox
                    checked={Boolean(attachment.downloadable)}
                    onCheckedChange={(checked) =>
                      onAttachmentDownloadableChange(
                        attachment.id,
                        Boolean(checked),
                      )
                    }
                  />
                  Permitir download
                </label>
              </div>
              <button
                type="button"
                className="student-action student-hover-surface grid size-7 shrink-0 place-items-center rounded-lg text-[var(--color-text-muted)]"
                onClick={() => onRemoveAttachment(attachment.id)}
                aria-label={`Remover ${attachment.original_name}`}
              >
                <X size={14} aria-hidden="true" />
              </button>
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
}
