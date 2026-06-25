import type { ChangeEvent, FormEvent } from "react";
import { FileUp, Plus, RotateCcw } from "lucide-react";

import { SectionHeader } from "@/components/student/SectionHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SurfaceCard } from "@/components/ui/SurfaceCard";
import {
  adminMaterialTypes,
  type MaterialFormState,
} from "@/components/student/admin/admin-material-form-model";
import type { AdminMaterial, AdminUploadType } from "@/types/admin";
import type { MaterialType } from "@/types/student";

type AdminMaterialFormProps = {
  form: MaterialFormState;
  selectedMaterial: AdminMaterial | null;
  file: File | null;
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
        description="Cadastre vídeos por URL ou envie arquivos para usar a URL retornada."
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
          <textarea
            id="materialDescription"
            value={form.description}
            onChange={(event) => onFieldChange("description", event.target.value)}
            placeholder="Descrição curta"
            className="student-input-control min-h-24 w-full rounded-[12px] border px-3 py-2 text-sm outline-none placeholder:text-[var(--color-text-muted)]"
          />
        </div>

        <div className="grid gap-3 sm:grid-cols-[1fr_112px]">
          <div>
            <Label htmlFor="materialType">Tipo</Label>
            <select
              id="materialType"
              value={form.type}
              onChange={(event) => onFieldChange("type", event.target.value as MaterialType)}
              className="student-input-control min-h-11 w-full rounded-[12px] border px-3 py-2 text-sm outline-none"
            >
              {adminMaterialTypes.map((type) => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </select>
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

        {uploadType ? (
          <div className="rounded-[var(--radius-md)] border p-3" style={{ borderColor: "var(--color-border)" }}>
            <Label htmlFor="materialFile">Arquivo</Label>
            <Input
              id="materialFile"
              type="file"
              onChange={(event: ChangeEvent<HTMLInputElement>) => onFileChange(event.target.files?.[0] ?? null)}
            />
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="mt-3 gap-2"
              disabled={!file || isUploading}
              onClick={onUpload}
            >
              <FileUp size={16} aria-hidden="true" />
              {isUploading ? "Enviando..." : "Enviar arquivo"}
            </Button>
          </div>
        ) : null}

        <div>
          <Label htmlFor="materialUrl">URL</Label>
          <Input
            id="materialUrl"
            value={form.url}
            onChange={(event) => onFieldChange("url", event.target.value)}
            placeholder="https://..."
          />
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
