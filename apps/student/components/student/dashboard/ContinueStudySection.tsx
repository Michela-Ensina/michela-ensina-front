import Link from "next/link";
import { ArrowRight, BookOpen, Clock3 } from "lucide-react";

import { MaterialListItem } from "@/components/student/MaterialListItem";
import { SectionHeader } from "@/components/student/SectionHeader";
import { Button } from "@/components/ui/button";
import type { Material, ProgressItem } from "@/types/student";

type ContinueStudySectionProps = {
  nextMaterial: Material | null;
  progressItems: ProgressItem[];
  recentMaterials: Material[];
};

export function ContinueStudySection({
  nextMaterial,
  progressItems,
  recentMaterials,
}: ContinueStudySectionProps) {
  return (
    <section className="space-y-4">
      <SectionHeader
        title="Continuar estudando"
        description="O próximo conteúdo aparece em destaque para manter o fluxo de estudo simples."
        action={
          <Link
            href="/materiais"
            className="student-text-action rounded-lg px-2 py-1 text-sm font-semibold"
            style={{ color: "var(--color-primary)" }}
          >
            Ver biblioteca
          </Link>
        }
      />

      <div
        className="grid gap-0 overflow-hidden rounded-[var(--radius-lg)] border lg:grid-cols-[1fr_0.9fr]"
        style={{
          borderColor: "var(--color-border)",
          backgroundColor: "var(--color-surface)",
        }}
      >
        <div className="p-5 sm:p-6">
          <p className="student-muted-text flex items-center gap-2 text-sm font-semibold">
            <Clock3 size={16} aria-hidden="true" />
            Próximo material
          </p>
          <h3 className="mt-3 text-2xl leading-tight">
            {nextMaterial?.title ?? "Sem sugestão disponível"}
          </h3>
          <p className="student-muted-text mt-3 max-w-xl text-sm">
            {nextMaterial?.description ??
              "Assim que houver um material disponível, ele aparecerá aqui."}
          </p>
          <Link
            href={nextMaterial ? `/materiais/${nextMaterial.id}` : "/materiais"}
            className="mt-5 inline-block"
          >
            <Button type="button" variant="primary" className="gap-2">
              Continuar material
              <ArrowRight size={16} aria-hidden="true" />
            </Button>
          </Link>
        </div>

        <div
          className="border-t p-5 lg:border-l lg:border-t-0"
          style={{
            borderColor: "var(--color-border)",
            backgroundColor: "var(--color-surface-soft)",
          }}
        >
          <p className="flex items-center gap-2 text-sm font-semibold">
            <BookOpen size={16} aria-hidden="true" />
            Materiais recentes
          </p>
          <div className="mt-3 space-y-3">
            {recentMaterials.map((material) => (
              <MaterialListItem
                key={material.id}
                material={material}
                progressItems={progressItems}
                density="compact"
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
