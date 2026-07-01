import type { FormEvent } from "react";
import { Plus, RotateCcw } from "lucide-react";

import { SectionHeader } from "@/components/student/SectionHeader";
import { AdminMaterialTypeFields } from "@/components/student/admin/AdminMaterialTypeFields";
import { Alert } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SurfaceCard } from "@/components/ui/SurfaceCard";
import { Textarea } from "@/components/ui/textarea";
import type { MaterialFormState } from "@/lib/student/admin-material-form";
import type { AdminMaterial, AdminUploadType } from "@/types/admin";
import type { MaterialAttachment } from "@/types/student";

type AdminMaterialFormProps = {
  form: MaterialFormState;
  selectedMaterial: AdminMaterial | null;
  file: File | null;
  attachedFiles: MaterialAttachment[];
  errorMessage: string | null;
  uploadType: AdminUploadType | null;
  isSaving: boolean;
  isUploading: boolean;
  onFieldChange: <TField extends keyof MaterialFormState>(field: TField, value: MaterialFormState[TField]) => void;
  onFileChange: (file: File | null) => void;
  onFileRejected: (message: string) => void;
  onReset: () => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  onUpload: () => void;
  onRemoveAttachment: (attachmentId: string) => void;
};

export function AdminMaterialForm({
  form,
  selectedMaterial,
  file,
  attachedFiles,
  errorMessage,
  uploadType,
  isSaving,
  isUploading,
  onFieldChange,
  onFileChange,
  onFileRejected,
  onReset,
  onSubmit,
  onUpload,
  onRemoveAttachment,
}: AdminMaterialFormProps) {
  return (
    <SurfaceCard className="min-w-0 overflow-hidden">
      <SectionHeader
        title={selectedMaterial ?"Editar material" : "Novo material"}
        description="Cadastre vídeos do YouTube, PDFs de leitura ou anexos da fase 1."
      />

      {errorMessage ? <Alert tone="error">{errorMessage}</Alert> : null}

      <form className="mt-5 min-w-0 space-y-4" onSubmit={onSubmit}>
        <div className="min-w-0">
          <Label htmlFor="materialTitle">Título</Label>
          <Input
            id="materialTitle"
            value={form.title}
            onChange={(event) => onFieldChange("title", event.target.value)}
            placeholder="Nome do material"
          />
        </div>

        <div className="min-w-0">
          <Label htmlFor="materialDescription">Descrição</Label>
          <Textarea
            id="materialDescription"
            value={form.description}
            onChange={(event) => onFieldChange("description", event.target.value)}
            placeholder="Descrição curta"
          />
        </div>

        <AdminMaterialTypeFields
          form={form}
          file={file}
          attachedFiles={attachedFiles}
          uploadType={uploadType}
          isUploading={isUploading}
          onFieldChange={onFieldChange}
          onFileChange={onFileChange}
          onFileRejected={onFileRejected}
          onUpload={onUpload}
          onRemoveAttachment={onRemoveAttachment}
        />

        <label className="student-action student-hover-surface flex w-fit max-w-full items-center gap-2 rounded-lg px-2 py-1 text-sm font-semibold">
          <Checkbox
            checked={form.isActive}
            onCheckedChange={(checked) => onFieldChange("isActive", checked)}
          />
          Material ativo
        </label>

        <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
          <Button type="button" variant="outline" className="w-full gap-2 sm:w-auto" onClick={onReset}>
            <RotateCcw size={16} aria-hidden="true" />
            Limpar
          </Button>
          <Button type="submit" variant="primary" className="w-full gap-2 sm:w-auto" disabled={isSaving || isUploading}>
            <Plus size={16} aria-hidden="true" />
            {isSaving ?"Salvando..." : selectedMaterial ?"Atualizar" : "Criar"}
          </Button>
        </div>
      </form>
    </SurfaceCard>
  );
}
