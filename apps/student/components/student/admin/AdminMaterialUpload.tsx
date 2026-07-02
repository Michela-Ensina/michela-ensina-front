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
  file: File | null;
  attachedFiles: MaterialAttachment[];
  isUploading: boolean;
  uploadType: AdminUploadType | null;
  materialType: MaterialType;
  onFileChange: (file: File | null) => void;
  onFileRejected: (message: string) => void;
  onUpload: () => void;
  onRemoveAttachment: (attachmentId: string) => void;
  onAttachmentDownloadableChange: (attachmentId: string, downloadable: boolean) => void;
};

export function AdminMaterialUpload({
  file,
  attachedFiles,
  isUploading,
  uploadType,
  materialType,
  onFileChange,
  onFileRejected,
  onUpload,
  onRemoveAttachment,
  onAttachmentDownloadableChange,
}: AdminMaterialUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!file && inputRef.current) {
      inputRef.current.value = "";
    }
  }, [file]);

  if (!uploadType) {
    return null;
  }

  const activeUploadType = uploadType;

  function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
    const nextFile = event.target.files?.[0] ?? null;

    if (!nextFile) {
      onFileChange(null);
      return;
    }

    const validationMessage = validateAdminUploadFile(nextFile, activeUploadType);
    if (validationMessage) {
      onFileChange(null);
      event.target.value = "";
      onFileRejected(validationMessage);
      return;
    }

    onFileChange(nextFile);
  }

  const replacesPrimaryFile = materialType === "pdf" || materialType === "attachment";
  const uploadHelpText = getAdminUploadHelpText(activeUploadType);
  const fieldLabel =
    materialType === "pdf"
      ? "PDF do material"
      : materialType === "video"
        ?"Anexo de apoio ao vídeo"
        : "Arquivo do anexo";

  return (
    <div className="student-soft-surface min-w-0 rounded-[var(--radius-md)] border p-4">
      <Label htmlFor="materialFile">{fieldLabel}</Label>
      <input
        id="materialFile"
        ref={inputRef}
        type="file"
        accept={getAdminUploadAcceptValue(activeUploadType)}
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
      {attachedFiles.length > 0 ? (
        <div className="mt-3 rounded-[var(--radius-sm)] border px-3 py-2 text-sm" style={{ borderColor: "var(--color-border)" }}>
          <p className="font-semibold">{replacesPrimaryFile ? "Arquivo principal" : "Anexos vinculados"}</p>
          {attachedFiles.map((attachment) => (
            <div key={attachment.id} className="mt-2 flex items-start justify-between gap-3">
              <div className="min-w-0 flex-1">
                <p className="student-muted-text min-w-0 truncate">{attachment.original_name}</p>
                {!replacesPrimaryFile ? (
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
                ) : null}
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
      <p className="student-muted-text mt-3 text-xs">
        {replacesPrimaryFile
          ?"O arquivo selecionado será enviado ao salvar. Enviar outro arquivo substitui o principal deste material."
          : "O arquivo selecionado será enviado ao salvar. Use o envio manual para adicionar mais apoios antes de criar."}
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
