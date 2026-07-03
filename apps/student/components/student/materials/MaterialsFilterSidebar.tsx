import { MaterialCard } from "@/components/student/MaterialCard";
import { SegmentedControl } from "@/components/ui/SegmentedControl";
import { SurfaceCard } from "@/components/ui/SurfaceCard";
import type { Material, ProgressItem } from "@/types/student";

export type MaterialStatusFilter = "todos" | "em-aberto" | "concluidos";
export type MaterialTypeFilter =
  | "todos"
  | Exclude<Material["type"], "attachment">;

const statusFilters = [
  { value: "todos", label: "Todos" },
  { value: "em-aberto", label: "Em aberto" },
  { value: "concluidos", label: "Concluídos" },
] satisfies Array<{ value: MaterialStatusFilter; label: string }>;

const typeFilters = [
  { value: "todos", label: "Todos" },
  { value: "video", label: "Vídeo" },
  { value: "pdf", label: "PDF" },
  { value: "other", label: "Links" },
] satisfies Array<{ value: MaterialTypeFilter; label: string }>;

type MaterialsFilterSidebarProps = {
  featuredMaterial: Material | undefined;
  progressItems: ProgressItem[];
  statusFilter: MaterialStatusFilter;
  typeFilter: MaterialTypeFilter;
  onStatusFilterChange: (value: MaterialStatusFilter) => void;
  onTypeFilterChange: (value: MaterialTypeFilter) => void;
};

export function MaterialsFilterSidebar({
  featuredMaterial,
  progressItems,
  statusFilter,
  typeFilter,
  onStatusFilterChange,
  onTypeFilterChange,
}: MaterialsFilterSidebarProps) {
  return (
    <aside className="space-y-4">
      <SurfaceCard className="student-section-surface p-4">
        <p className="text-sm font-semibold">Status</p>
        <div className="mt-3">
          <SegmentedControl
            label="Filtrar por status"
            options={statusFilters}
            value={statusFilter}
            onChange={onStatusFilterChange}
          />
        </div>
      </SurfaceCard>

      <SurfaceCard className="student-section-surface p-4">
        <p className="text-sm font-semibold">Tipo de material</p>
        <div className="mt-3">
          <SegmentedControl
            label="Filtrar por tipo"
            options={typeFilters}
            value={typeFilter}
            onChange={onTypeFilterChange}
          />
        </div>
      </SurfaceCard>

      {featuredMaterial ?(
        <div>
          <p className="student-muted-text mb-3 text-sm font-semibold">
            Em destaque
          </p>
          <MaterialCard
            material={featuredMaterial}
            progressItems={progressItems}
          />
        </div>
      ) : null}
    </aside>
  );
}
