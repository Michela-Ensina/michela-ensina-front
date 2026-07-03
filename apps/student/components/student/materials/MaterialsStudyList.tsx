import { MaterialListItem } from "@/components/student/MaterialListItem";
import { EmptyState } from "@/components/ui/EmptyState";
import type { Material, ProgressItem } from "@/types/student";

type MaterialsStudyListProps = {
  materials: Material[];
  totalMaterials: number;
  progressItems: ProgressItem[];
};

function getVisibleMaterialsLabel(visibleCount: number, totalCount: number) {
  const noun = totalCount === 1 ? "material" : "materiais";

  return `Exibindo ${visibleCount} de ${totalCount} ${noun}.`;
}

export function MaterialsStudyList({ materials, totalMaterials, progressItems }: MaterialsStudyListProps) {
  return (
    <section
      className="student-section-surface min-h-[420px] rounded-[var(--radius-lg)] border px-4 sm:px-5"
    >
      <div
        className="flex flex-col gap-2 border-b py-4 sm:flex-row sm:items-end sm:justify-between"
        style={{ borderColor: "var(--color-border)" }}
      >
        <div>
          <h2 className="text-xl">Lista de estudo</h2>
          <p className="student-muted-text mt-1 text-sm">
            {getVisibleMaterialsLabel(materials.length, totalMaterials)}
          </p>
        </div>
      </div>

      {materials.length > 0 ?(
        <div className="space-y-3 py-4">
          {materials.map((material) => (
            <MaterialListItem key={material.id} material={material} progressItems={progressItems} />
          ))}
        </div>
      ) : (
        <div className="py-6">
          <EmptyState
            title="Nenhum material neste filtro"
            description="Ajuste os filtros para ver outros conteúdos liberados."
          />
        </div>
      )}
    </section>
  );
}
