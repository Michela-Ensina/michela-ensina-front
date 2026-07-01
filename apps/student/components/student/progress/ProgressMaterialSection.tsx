import type { ReactNode } from "react";

import { MaterialListItem } from "@/components/student/MaterialListItem";
import type { Material, ProgressItem } from "@/types/student";

type ProgressMaterialSectionProps = {
  title: string;
  icon: ReactNode;
  materials: Material[];
  progressItems: ProgressItem[];
  emptyMessage: string;
  className?: string;
};

export function ProgressMaterialSection({
  title,
  icon,
  materials,
  progressItems,
  emptyMessage,
  className = "py-4",
}: ProgressMaterialSectionProps) {
  return (
    <div className={className}>
      <div className="flex items-center gap-2">
        {icon}
        <h3 className="text-lg">{title}</h3>
      </div>
      <div className="mt-3 space-y-3">
        {materials.length > 0 ?(
          materials.map((material) => (
            <MaterialListItem key={material.id} material={material} progressItems={progressItems} density="compact" />
          ))
        ) : (
          <p className="student-muted-text py-4 text-sm">{emptyMessage}</p>
        )}
      </div>
    </div>
  );
}
