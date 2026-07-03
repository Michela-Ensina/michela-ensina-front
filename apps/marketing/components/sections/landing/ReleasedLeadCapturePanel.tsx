import Image from "next/image";

import { PRODUCT_INFO } from "@/data/landing";
import { MODO_FLUENTE_HOTMART_URL } from "@/lib/release";

import { Magnet } from "@/components/motion/Magnet";
import { Reveal } from "@/components/motion/Reveal";
import { ButtonLink } from "@/components/ui/Button";

const RELEASED_HIGHLIGHTS = [
  "Guia completo",
  "Materiais de apoio",
  "Acesso imediato",
] as const;

export function ReleasedLeadCapturePanel() {
  return (
    <>
      <Reveal variant="fade-up">
        <div className="space-y-6">
          <p className="inline-flex rounded-full bg-accent-soft px-5 py-2 text-xs font-semibold uppercase tracking-wide text-secondary">
            Modo Fluente
          </p>
          <div className="space-y-4">
            <h2 className="pb-1 text-3xl sm:pb-2 sm:text-5xl">
              O guia já está disponível
            </h2>
          </div>

          <div className="flex flex-wrap gap-2">
            {RELEASED_HIGHLIGHTS.map((highlight) => (
              <span
                className="rounded-full bg-background px-3 py-1.5 text-xs font-bold text-secondary sm:text-sm"
                key={highlight}
              >
                {highlight}
              </span>
            ))}
          </div>
        </div>
      </Reveal>

      <Reveal delay={0.1} variant="fade-scale">
        <div className="relative overflow-hidden rounded-4xl bg-background px-5 py-6 text-text sm:px-7 sm:py-8">
          <Image
            alt=""
            aria-hidden
            className="pointer-events-none absolute -right-14 -top-16 w-44 opacity-14"
            height={486}
            src="/assets/brand/graphics/elementos-02.svg"
            width={385}
          />
          <Image
            alt=""
            aria-hidden
            className="pointer-events-none absolute -bottom-8 -left-8 w-24 opacity-12"
            height={120}
            src="/assets/brand/graphics/estrela-lilas.svg"
            width={120}
          />

          <div className="relative z-10 space-y-6">
            <div className="flex items-start justify-center gap-2 xl:gap-8">
              <h3 className="mt-1 text-3xl text-primary sm:text-4xl">
                Modo Fluente
              </h3>
              <div className="rounded-full mt-1.5 bg-surface px-4 py-2 text-xs font-bold text-secondary shadow-sm">
                + Planner
              </div>
            </div>

            <div className="space-y-1 text-primary">
              <div className="flex items-end gap-2 justify-center">
                <p>
                  <span className="text-base font-semibold sm:text-xl">
                    {PRODUCT_INFO.installmentCountLabel.replaceAll("de", "")}
                  </span>
                  <span className="text-4xl font-bold leading-none sm:text-5xl">
                    {PRODUCT_INFO.installmentValue}
                  </span>
                </p>

                <p className="text-end text-sm font-semibold text-text-muted">
                  ou {PRODUCT_INFO.cashPrice}
                </p>
              </div>
            </div>

            <Magnet
              className="w-full will-change-transform"
              magnetStrength={26}
              padding={36}
            >
              <ButtonLink
                className="h-14 w-full justify-center rounded-2xl text-base sm:h-16"
                href={MODO_FLUENTE_HOTMART_URL}
                rel="noopener noreferrer"
                size="lg"
                target="_blank"
                variant="primary"
              >
                Garanta o seu
              </ButtonLink>
            </Magnet>
          </div>
        </div>
      </Reveal>
    </>
  );
}
