import { CheckCircle2, Circle } from "lucide-react";

import { ProgressBar } from "@/components/ui/ProgressBar";
import type { PasswordStrengthAssessment, PasswordRequirementKey } from "@/lib/auth/password-strength";

type PasswordStrengthGuideProps = {
  assessment: PasswordStrengthAssessment;
};

const REQUIREMENTS: Array<{ key: PasswordRequirementKey; label: string }> = [
  { key: "minimumLength", label: "Mínimo de 8 caracteres" },
  { key: "letter", label: "Pelo menos 1 letra" },
  { key: "number", label: "Pelo menos 1 número" },
  { key: "notCommon", label: "Não ser uma senha comum" },
];

const STRENGTH_LABELS = {
  empty: "Força da senha",
  weak: "Senha fraca",
  medium: "Senha média",
  strong: "Senha forte",
};

export function PasswordStrengthGuide({ assessment }: PasswordStrengthGuideProps) {
  const metRequirements = new Set(assessment.metRequirements);

  return (
    <div className="space-y-3 rounded-[var(--radius-md)] border p-3" style={{ borderColor: "var(--color-border)" }}>
      <ProgressBar value={assessment.value} label={STRENGTH_LABELS[assessment.level]} />

      <ul className="grid gap-2 text-xs sm:grid-cols-2" style={{ color: "var(--color-text-muted)" }}>
        {REQUIREMENTS.map((requirement) => {
          const isMet = metRequirements.has(requirement.key);

          return (
            <li key={requirement.key} className="flex items-start gap-2">
              {isMet ? (
                <CheckCircle2 className="mt-0.5 size-3.5 shrink-0" aria-hidden="true" style={{ color: "var(--color-secondary)" }} />
              ) : (
                <Circle className="mt-0.5 size-3.5 shrink-0" aria-hidden="true" />
              )}
              <span>{requirement.label}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
