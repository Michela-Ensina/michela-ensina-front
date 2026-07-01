import { CalendarClock, Edit3, Paperclip, Trash2 } from "lucide-react";

import { SectionHeader } from "@/components/student/SectionHeader";
import { getMaterialTypeMeta } from "@/components/student/materials/material-display";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/ui/EmptyState";
import { StatusBadge } from "@/components/ui/StatusBadge";
import type { AdminMaterial } from "@/types/admin";

type AdminMaterialsListProps = {
  materials: AdminMaterial[];
  onEdit: (material: AdminMaterial) => void;
  onDelete: (material: AdminMaterial) => void;
};

function formatReleaseDate(value: string | null): string | null {
  if (!value) return null;

  return new Intl.DateTimeFormat("pt-BR", {
    dateStyle: "short",
    timeStyle: "short",
  }).format(new Date(value));
}

export function AdminMaterialsList({
  materials,
  onEdit,
  onDelete,
}: AdminMaterialsListProps) {
  return (
    <section
      className="rounded-[var(--radius-lg)] border px-4 sm:px-5"
      style={{
        borderColor: "var(--color-border)",
        backgroundColor: "var(--color-surface)",
      }}
    >
      <div className="border-b py-4" style={{ borderColor: "var(--color-border)" }}>
        <SectionHeader
          title="Materiais cadastrados"
          description="Gerencie apenas os materiais da fase 1."
        />
      </div>

      {materials.length > 0 ?(
        <div className="space-y-3 py-4">
          {materials.map((material) => (
            <article
              key={material.id}
              className="grid gap-3 rounded-[var(--radius-md)] border p-4 md:grid-cols-[1fr_auto] md:items-center"
              style={{
                borderColor:
                  "color-mix(in oklab, var(--color-border) 82%, var(--color-brand-lilac))",
                backgroundColor: "var(--color-surface-soft)",
              }}
            >
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="text-lg leading-tight">{material.title}</h3>
                  <StatusBadge
                    label={material.is_active ?"Ativo" : "Inativo"}
                    tone={material.is_active ?"concluído" : "bloqueado"}
                  />
                </div>
                <div className="student-muted-text mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm">
                  <span>{getMaterialTypeMeta(material.type).label}</span>
                  {material.attachments?.length ?(
                    <span className="inline-flex items-center gap-1">
                      <Paperclip size={14} aria-hidden="true" />
                      {material.attachments.length} anexo
                      {material.attachments.length > 1 ?"s" : ""}
                    </span>
                  ) : null}
                  {formatReleaseDate(material.released_at) ?(
                    <span className="inline-flex items-center gap-1">
                      <CalendarClock size={14} aria-hidden="true" />
                      {formatReleaseDate(material.released_at)}
                    </span>
                  ) : null}
                </div>
                {material.description ?(
                  <p className="student-muted-text mt-2 line-clamp-2 text-sm">
                    {material.description}
                  </p>
                ) : null}
              </div>

              <div className="flex flex-wrap gap-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="gap-2"
                  onClick={() => onEdit(material)}
                >
                  <Edit3 size={15} aria-hidden="true" />
                  Editar
                </Button>
                <Button
                  type="button"
                  variant="danger"
                  size="sm"
                  className="gap-2"
                  onClick={() => onDelete(material)}
                >
                  <Trash2 size={15} aria-hidden="true" />
                  Remover
                </Button>
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="py-6">
          <EmptyState
            title="Nenhum material cadastrado"
            description="Crie o primeiro material para liberar conteúdo aos alunos."
          />
        </div>
      )}
    </section>
  );
}
