import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { BlurText } from "@/components/motion/BlurText";
import { Magnet } from "@/components/motion/Magnet";
import { Reveal } from "@/components/motion/Reveal";
import { ShapeGrid } from "@/components/motion/ShapeGrid";
import { Section } from "@/components/ui/Section";
import Image from "next/image";

export function FinalCtaSection() {
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
            <div className="mt-8 flex justify-between group">
              <Image
                alt="Elemento gráfico da marca"
                aria-hidden
                className="pointer-events-none relative right-[35%] hidden w-12 opacity-25 lg:block group-hover:opacity-35 transition-opacity duration-200 "
                height={120}
                src="/assets/brand/graphics/estrela.svg"
                width={120}
              />
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
