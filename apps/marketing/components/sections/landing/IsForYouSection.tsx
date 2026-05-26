import { IS_FOR_YOU } from "@/data/landing";

import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";

export function IsForYouSection() {
  return (
    <Section className="py-12" tone="default">
      <Container>
        <div className="grid gap-6 py-3 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
          <div className="space-y-3 reveal-up">
            <p className="text-xs font-semibold uppercase tracking-wide text-text-muted">
              É para você que...
            </p>
            <h2 className="text-3xl sm:text-4xl">Quer sair do estudo solto e ganhar direção</h2>
          </div>

          <ol className="space-y-4 stagger-up">
            {IS_FOR_YOU.map((item, index) => (
              <li key={item} className="border-b border-border/20 pb-4 last:border-b-0 last:pb-0">
                <div className="flex items-start gap-3">
                  <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-surface-soft text-xs font-bold text-primary">
                    {index + 1}
                  </span>
                  <p className="pt-0.5 text-base font-semibold text-primary">{item}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </Container>
    </Section>
  );
}
