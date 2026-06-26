import type { FormEvent } from "react";
import { Plus, RotateCcw } from "lucide-react";

import { SectionHeader } from "@/components/student/SectionHeader";
import { AdminMaterialUpload } from "@/components/student/admin/AdminMaterialUpload";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { SurfaceCard } from "@/components/ui/SurfaceCard";
import { Textarea } from "@/components/ui/textarea";
import {
  adminMaterialTypes,
  type MaterialFormState,
} from "@/lib/student/admin-material-form";
import type { AdminMaterial, AdminUploadType } from "@/types/admin";
import type { MaterialAttachment, MaterialType } from "@/types/student";

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
  onReset: () => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  onUpload: () => void;
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
  onReset,
  onSubmit,
  onUpload,
}: AdminMaterialFormProps) {
  return (
    <SurfaceCard>
      <SectionHeader
        title={selectedMaterial ? "Editar material" : "Novo material"}
        description="Cadastre vídeos do YouTube, PDFs de leitura ou anexos da fase 1."
      />

      {errorMessage ? (
        <p className="student-muted-text mt-4 text-sm">{errorMessage}</p>
      ) : null}

      <form className="mt-5 space-y-4" onSubmit={onSubmit}>
        <div>
          <Label htmlFor="materialTitle">Título</Label>
          <Input
            id="materialTitle"
            value={form.title}
            onChange={(event) => onFieldChange("title", event.target.value)}
            placeholder="Nome do material"
          />
        </div>

        <div>
          <Label htmlFor="materialDescription">Descrição</Label>
          <Textarea
            id="materialDescription"
            value={form.description}
            onChange={(event) => onFieldChange("description", event.target.value)}
            placeholder="Descrição curta"
          />
        </div>

        <div className="grid gap-3 sm:grid-cols-[1fr_112px]">
          <div>
            <Label htmlFor="materialType">Tipo</Label>
            <Select
              id="materialType"
              value={form.type}
              onChange={(event) => onFieldChange("type", event.target.value as MaterialType)}
            >
              {adminMaterialTypes.map((type) => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </Select>
          </div>
          <div>
            <Label htmlFor="materialOrder">Ordem</Label>
            <Input
              id="materialOrder"
              type="number"
              min={0}
              value={form.order}
              onChange={(event) => onFieldChange("order", event.target.value)}
            />
          </div>
        </div>

        <AdminMaterialUpload
          file={file}
          attachedFiles={attachedFiles}
          isUploading={isUploading}
          uploadType={uploadType}
          onFileChange={onFileChange}
          onUpload={onUpload}
        />

        {form.type === "video" ? (
          <div>
            <Label htmlFor="materialUrl">URL do YouTube</Label>
            <Input
              id="materialUrl"
              value={form.url}
              onChange={(event) => onFieldChange("url", event.target.value)}
              placeholder="https://www.youtube.com/watch?v=..."
            />
          </div>
        ) : null}

        {form.type === "other" ? (
          <div>
            <Label htmlFor="materialUrl">Link do material</Label>
            <Input
              id="materialUrl"
              value={form.url}
              onChange={(event) => onFieldChange("url", event.target.value)}
              placeholder="https://..."
            />
          </div>
        ) : null}

        <div>
          <Label htmlFor="materialReleasedAt">Liberar em</Label>
          <Input
            id="materialReleasedAt"
            type="datetime-local"
            value={form.releasedAt}
            onChange={(event) => onFieldChange("releasedAt", event.target.value)}
          />
          <p className="student-muted-text mt-1 text-xs">Deixe em branco para liberar imediatamente.</p>
        </div>

        <label className="student-action flex w-fit items-center gap-2 rounded-lg py-1 text-sm font-semibold">
          <input
            type="checkbox"
            checked={form.isActive}
            onChange={(event) => onFieldChange("isActive", event.target.checked)}
          />
          Material ativo
        </label>

        <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
          <Button type="button" variant="outline" className="gap-2" onClick={onReset}>
            <RotateCcw size={16} aria-hidden="true" />
            Limpar
          </Button>
          <Button type="submit" variant="primary" className="gap-2" disabled={isSaving}>
            <Plus size={16} aria-hidden="true" />
            {isSaving ? "Salvando..." : selectedMaterial ? "Atualizar" : "Criar"}
          </Button>
        </div>
      </form>
    </SurfaceCard>
  );
}
