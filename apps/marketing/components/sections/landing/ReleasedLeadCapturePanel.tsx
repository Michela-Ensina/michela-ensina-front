import Image from "next/image";

import { HERO_COPY, PRODUCT_INFO } from "@/data/landing";
import { MODO_FLUENTE_HOTMART_URL } from "@/lib/release";

import { Magnet } from "@/components/motion/Magnet";
import { Reveal } from "@/components/motion/Reveal";
import { ButtonLink } from "@/components/ui/Button";

const RELEASED_HIGHLIGHTS = [
  "Guia completo",
  "Planner incluso",
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
            <p className="max-w-xl text-base leading-relaxed text-text sm:text-lg">
              {HERO_COPY.description}
            </p>
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
        <div className="relative overflow-hidden rounded-[2rem] bg-background px-5 py-6 text-text sm:px-7 sm:py-8">
          <Image
            alt=""
            aria-hidden
            className="pointer-events-none absolute -right-12 -top-12 w-36 opacity-12"
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

          <div className="relative z-10 grid gap-5 min-[520px]:grid-cols-[0.44fr_1fr] min-[520px]:items-center lg:grid-cols-1 xl:grid-cols-[0.44fr_1fr]">
            <div className="mx-auto w-32 min-[520px]:w-full lg:w-36 xl:w-full">
              <div className="rotate-[-3deg] overflow-hidden rounded-2xl border-4 border-surface bg-surface shadow-[0_18px_30px_rgba(35,54,149,0.2)]">
                <Image
                  alt="Capa do e-book Modo Fluente"
                  className="aspect-3/4 h-auto w-full object-cover object-top"
                  height={1172}
                  priority={false}
                  src="/assets/ebook-modo-fluente-capa.png"
                  width={800}
                />
              </div>
            </div>

            <div className="space-y-5">
              <div className="space-y-2">
                <p className="text-sm font-bold text-secondary">
                  Modo Fluente + planner semanal
                </p>
                <div className="space-y-1 text-primary">
                  <p className="flex items-end gap-2">
                    <span className="text-base font-semibold sm:text-xl">
                      {PRODUCT_INFO.installmentCountLabel}
                    </span>
                    <span className="text-4xl font-bold leading-none sm:text-5xl">
                      {PRODUCT_INFO.installmentValue}
                    </span>
                  </p>
                  <p className="text-sm font-semibold text-text-muted">
                    ou {PRODUCT_INFO.cashPrice}
                  </p>
                </div>
              </div>

              <p className="text-sm leading-relaxed text-secondary">
                Comece com um mapa de estudo pronto para organizar sua rotina e
                manter constância no idioma.
              </p>

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
        </div>
      </Reveal>
    </>
  );
}
