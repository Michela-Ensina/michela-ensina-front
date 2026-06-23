import { MaterialListItem } from "@/components/student/MaterialListItem";
import { EmptyState } from "@/components/ui/EmptyState";
import type { Material, ProgressItem } from "@/types/student";

type MaterialsStudyListProps = {
  materials: Material[];
  totalMaterials: number;
  progressItems: ProgressItem[];
};

export function MaterialsStudyList({ materials, totalMaterials, progressItems }: MaterialsStudyListProps) {
  return (
    <section
      className="rounded-[var(--radius-lg)] border px-4 sm:px-5"
      style={{
        borderColor: "color-mix(in oklab, var(--color-border) 72%, var(--color-accent-soft))",
        backgroundColor: "color-mix(in oklab, var(--color-surface) 76%, transparent)",
      }}
    >
      <div
        className="flex flex-col gap-2 border-b py-4 sm:flex-row sm:items-end sm:justify-between"
        style={{ borderColor: "var(--color-border)" }}
      >
        <div>
          <h2 className="text-xl">Lista de estudo</h2>
          <p className="student-muted-text mt-1 text-sm">
            {materials.length} de {totalMaterials} materiais exibidos.
          </p>
        </div>
      </div>

      {materials.length > 0 ? (
        materials.map((material) => (
          <MaterialListItem key={material.id} material={material} progressItems={progressItems} />
        ))
      ) : (
        <div className="py-6">
          <EmptyState
            title="Nenhum material nesse filtro"
            description="Ajuste os filtros para ver outros conteúdos liberados."
          />
        </div>
      )}
    </section>
  );
}
