import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { BlurText } from "@/components/motion/BlurText";
import { Magnet } from "@/components/motion/Magnet";
import { Reveal } from "@/components/motion/Reveal";
import { ShapeGrid } from "@/components/motion/ShapeGrid";
import { Section } from "@/components/ui/Section";
import { HERO_COPY, PRODUCT_INFO } from "@/data/landing";
import { MODO_FLUENTE_HOTMART_URL } from "@/lib/release";
import Image from "next/image";

type FinalCtaSectionProps = {
  isReleased?: boolean;
};

export function FinalCtaSection({ isReleased = false }: FinalCtaSectionProps) {
  return (
    <Section className="relative overflow-hidden bg-surface py-16" tone="soft">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-45"
      >
        <ShapeGrid
          borderColor="#23369512"
          className="h-full w-full"
          direction="left"
          hoverFillColor="#E4CEF416"
          hoverTrailAmount={0}
          shape="square"
          speed={0.1}
          squareSize={56}
        />
      </div>

      <Container className="relative z-10 max-w-5xl">
        <Reveal variant="fade-scale">
          <div className="flex flex-col items-center rounded-[2.2rem] border-2 border-border-soft bg-background px-4 py-10 text-center shadow-sm sm:rounded-[3rem] sm:px-10 sm:py-12">
            {isReleased ? (
              <div className="mx-auto flex w-full max-w-3xl flex-col items-center text-center">
                <p className="inline-flex rounded-full bg-accent-soft/70 px-5 py-2 text-xs font-semibold uppercase tracking-wide text-secondary">
                  Modo Fluente
                </p>
                <h2 className="mt-4 text-4xl sm:text-5xl">Modo Fluente</h2>
                <p className="mt-5 max-w-2xl text-base leading-relaxed text-secondary sm:text-lg">
                  {HERO_COPY.description}
                </p>

                <div className="mt-6 flex flex-col items-center gap-1 text-primary">
                  <p className="flex items-end justify-center gap-2">
                    <span className="text-base font-semibold sm:text-2xl">
                      {PRODUCT_INFO.installmentCountLabel}
                    </span>
                    <span className="text-4xl font-bold leading-none sm:text-6xl">
                      {PRODUCT_INFO.installmentValue}
                    </span>
                  </p>
                  <p className="text-sm font-semibold text-text-muted sm:text-base">
                    ou {PRODUCT_INFO.cashPrice}
                  </p>
                </div>
              </div>
            ) : (
              <>
                <h2 className="mx-auto max-w-3xl text-4xl sm:text-5xl">
                  <BlurText
                    animateBy="words"
                    className="inline"
                    delay={45}
                    direction="bottom"
                    rootMargin="0px 0px -10% 0px"
                    stepDuration={0.28}
                    text="Garanta seu aviso de lançamento"
                    threshold={0.25}
                  />
                </h2>
                <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-secondary sm:text-lg">
                  Modo Fluente chega em breve com guia completo
                  <br />+ Planner Semanal gratuito.
                </p>
              </>
            )}
            <div className="mt-8 flex justify-between group">
              <Image
                alt="Elemento gráfico da marca"
                aria-hidden
                className="pointer-events-none relative right-[35%] hidden w-12 opacity-25 lg:block group-hover:opacity-35 transition-opacity duration-200 "
                height={120}
                src="/assets/brand/graphics/estrela.svg"
                width={120}
              />
              {isReleased ? (
                <Magnet
                  className="w-full sm:w-auto will-change-transform"
                  magnetStrength={24}
                  padding={40}
                >
                  <ButtonLink
                    className="w-full justify-center sm:w-auto"
                    href={MODO_FLUENTE_HOTMART_URL}
                    rel="noopener noreferrer"
                    size="lg"
                    target="_blank"
                    variant="primary"
                  >
                    Garanta o seu
                  </ButtonLink>
                </Magnet>
              ) : (
                <Magnet
                  className="w-full sm:w-auto will-change-transform"
                  magnetStrength={24}
                  padding={40}
                >
                  <ButtonLink
                    className="w-full justify-center sm:w-auto"
                    href="#captura"
                    size="lg"
                    variant="primary"
                  >
                    Quero receber o aviso
                  </ButtonLink>
                </Magnet>
              )}
              <Image
                alt="Elemento gráfico da marca"
                aria-hidden
                className="pointer-events-none relative left-[35%] hidden w-12 opacity-25 lg:block group-hover:opacity-35 transition-opacity duration-200 "
                height={120}
                src="/assets/brand/graphics/estrela.svg"
                width={120}
              />
            </div>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
