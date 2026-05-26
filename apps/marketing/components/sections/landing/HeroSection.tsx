import Image from "next/image";
import { ChevronDown } from "lucide-react";

import { HERO_COPY, PRODUCT_INFO } from "@/data/landing";

import { AnimatedBrandStroke } from "@/components/brand/AnimatedBrandStroke";
import { Magnet } from "@/components/motion/Magnet";
import { Reveal } from "@/components/motion/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";

const PLANNER_HOTMART_URL = "https://pay.hotmart.com/S105574036H";

export function HeroSection() {
  return (
    <Section
      className="overflow-hidden pb-12 pt-10 sm:pb-18 sm:pt-16 lg:pt-20"
      id="oferta"
      tone="soft"
    >
      <Container className="relative">
        {/* Left-side subtle strokes */}
        <svg
          aria-hidden
          className="pointer-events-none absolute -left-22 top-1/2 hidden h-72 w-28 -translate-y-1/2 text-accent opacity-[0.05] xl:block"
          fill="none"
          viewBox="0 0 120 320"
        >
          <path
            d="M92 18C54 54 33 96 28 140C23 184 34 224 60 260"
            stroke="currentColor"
            strokeLinecap="round"
            strokeWidth="2"
          />
          <path
            d="M108 42C74 74 55 111 51 149C47 188 57 224 80 254"
            stroke="currentColor"
            strokeLinecap="round"
            strokeWidth="2"
          />
          <path
            d="M78 92C57 116 46 143 45 171C44 200 52 225 68 247"
            stroke="currentColor"
            strokeLinecap="round"
            strokeWidth="2"
          />
          <path
            d="M96 118C79 137 70 159 70 182C70 205 77 224 90 241"
            stroke="currentColor"
            strokeLinecap="round"
            strokeWidth="2"
          />
          <circle cx="86" cy="284" r="4" fill="currentColor" />
          <circle cx="101" cy="302" r="2.5" fill="currentColor" />
        </svg>

        {/* Top-left corner detail */}
        <svg
          aria-hidden
          className="pointer-events-none absolute -left-10 -top-6 hidden h-44 w-44 text-secondary opacity-[0.045] xl:block"
          fill="none"
          viewBox="0 0 180 180"
        >
          <path
            d="M20 92C34 55 61 28 98 17C119 11 138 12 156 19"
            stroke="currentColor"
            strokeLinecap="round"
            strokeWidth="2"
          />
          <path
            d="M36 112C47 81 69 58 99 48C117 42 134 43 150 49"
            stroke="currentColor"
            strokeLinecap="round"
            strokeWidth="2"
          />
          <circle cx="132" cy="26" r="3.5" fill="currentColor" />
        </svg>

        <Image
          alt="Elemento gráfico da marca"
          aria-hidden
          className="pointer-events-none absolute -left-4 top-6 hidden w-8 opacity-20 xl:block"
          height={120}
          src="/assets/brand/graphics/estrela-lilas.svg"
          width={120}
        />

        {/* Top-right corner mass */}
        <Image
          alt="Elemento gráfico da marca"
          aria-hidden
          className="pointer-events-none absolute -right-24 -top-16 hidden w-75 opacity-40 lg:block"
          height={486}
          src="/assets/brand/graphics/elemento-01.svg"
          width={385}
        />

        <svg
          aria-hidden
          className="pointer-events-none absolute rotate-z-50 -right-33 -top-20 hidden h-64 w-64 text-accent opacity-[0.045] xl:block"
          fill="none"
          viewBox="0 0 240 240"
        >
          <path
            d="M18 148C48 89 95 51 154 38C188 31 220 35 250 49"
            stroke="currentColor"
            strokeLinecap="round"
            strokeWidth="2"
          />
          <path
            d="M46 174C72 125 112 94 162 84C191 78 219 82 245 94"
            stroke="currentColor"
            strokeLinecap="round"
            strokeWidth="2"
          />
          <circle cx="74" cy="30" r="4" fill="currentColor" />
          <circle cx="104" cy="18" r="2.5" fill="currentColor" />
        </svg>

        <Image
          alt="Elemento gráfico da marca"
          aria-hidden
          className="pointer-events-none absolute left-[45%] top-20 hidden w-14 opacity-45 lg:block"
          height={120}
          src="/assets/brand/graphics/estrela.svg"
          width={120}
        />

        {/* Bottom-left corner subtle arc */}
        <svg
          aria-hidden
          className="pointer-events-none absolute -bottom-10 -left-14 hidden h-48 w-48 text-accent opacity-[0.04] xl:block"
          fill="none"
          viewBox="0 0 200 200"
        >
          <path
            d="M24 154C46 114 81 88 124 80C149 75 172 78 194 87"
            stroke="currentColor"
            strokeLinecap="round"
            strokeWidth="2"
          />
          <path
            d="M42 174C60 141 89 119 124 112C145 108 165 110 184 118"
            stroke="currentColor"
            strokeLinecap="round"
            strokeWidth="2"
          />
        </svg>

        {/* Bottom-right corner subtle finishing detail */}
        <svg
          aria-hidden
          className="pointer-events-none absolute -bottom-8 -right-10 hidden h-40 w-40 text-secondary opacity-[0.04] xl:block"
          fill="none"
          viewBox="0 0 160 160"
        >
          <path
            d="M24 104C42 73 68 53 101 46C120 42 138 44 154 51"
            stroke="currentColor"
            strokeLinecap="round"
            strokeWidth="2"
          />
          <path
            d="M42 122C56 97 77 81 103 76C119 72 135 74 149 80"
            stroke="currentColor"
            strokeLinecap="round"
            strokeWidth="2"
          />
          <circle cx="44" cy="34" r="3.5" fill="currentColor" />
        </svg>

        <div className="grid items-center gap-8 sm:gap-10 lg:grid-cols-[1fr_0.92fr]">
          <div className="relative z-20 space-y-6 sm:space-y-7">
            <Reveal variant="fade-up">
              <div className="space-y-4">
                <p className="inline-flex rounded-full bg-accent-soft/70 px-5 py-2 text-xs font-semibold uppercase tracking-wide text-secondary">
                  {HERO_COPY.eyebrow}
                </p>
                <h1 className="text-[1.9rem] leading-tight sm:text-5xl lg:text-6xl">
                  {HERO_COPY.title}
                </h1>
                <p className="text-base font-semibold text-text-muted sm:text-2xl">
                  {HERO_COPY.subtitle}
                </p>
                <p className="max-w-xl text-base leading-relaxed text-text sm:text-lg">
                  {HERO_COPY.description}
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.08} variant="fade-up">
              <div className="space-y-3">
                <div className="flex flex-row items-center gap-2 sm:gap-1">
                  <div>
                    <p className="flex items-end gap-2 text-primary">
                      <span className="text-base font-semibold sm:text-2xl">
                        {PRODUCT_INFO.installmentCountLabel}
                      </span>
                      <span className="text-4xl font-bold leading-none sm:text-6xl">
                        {PRODUCT_INFO.installmentValue}
                      </span>
                    </p>
                    <p className="ml-4 px-1 text-sm font-semibold text-text-muted sm:text-base">
                      ou {PRODUCT_INFO.cashPrice}
                    </p>
                  </div>
                  <div className="ml-1 hidden min-[328px]:inline-flex items-center justify-center rounded-2xl border border-accent-soft/65 bg-surface px-2 py-1 text-xs font-semibold text-secondary shadow-sm sm:px-4 sm:py-2 sm:text-base">
                    <span className="leading-snug">
                      + Planner{" "}
                      <span className="hidden min-[1250px]:inline">
                        gratuito
                      </span>{" "}
                      <span className="hidden min-[390px]:inline">incluso</span>
                    </span>
                  </div>
                </div>
                <p className="pt-4 text-sm text-text-muted">
                  {PRODUCT_INFO.plannerOnlyOffer}
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.14} variant="fade-up">
              <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <Magnet
                  className="w-full will-change-transform sm:w-auto"
                  magnetStrength={24}
                  padding={40}
                >
                  <ButtonLink
                    className="w-full justify-center whitespace-normal text-center leading-snug sm:w-auto"
                    href={HERO_COPY.primaryCtaHref}
                    size="lg"
                    variant="primary"
                  >
                    Quero ser avisado no lançamento
                  </ButtonLink>
                </Magnet>
                <ButtonLink
                  className="relative z-10 w-full justify-center sm:w-auto"
                  href={PLANNER_HOTMART_URL}
                  rel="noopener noreferrer"
                  size="lg"
                  target="_blank"
                  variant="outline"
                >
                  Garanta o seu planner
                </ButtonLink>
              </div>
            </Reveal>

            <a
              aria-label="Rolar para a próxima seção"
              className="scroll-cue mt-1 hidden w-fit items-center gap-2 text-sm font-semibold text-text-muted sm:inline-flex"
              href="#dor"
            >
              <span aria-hidden className="scroll-cue-mouse">
                <span className="scroll-cue-dot" />
              </span>
              <span>Role para descobrir</span>
              <ChevronDown aria-hidden className="size-4" />
            </a>
          </div>

          <Reveal
            className="relative mx-auto mt-2 w-full max-w-72.5 sm:mt-4 sm:max-w-md"
            delay={0.12}
            variant="fade-scale"
          >
            <aside className="relative">
              <div className="pointer-events-none absolute bottom-8 -left-20 hidden z-0 text-accent-soft opacity-25 lg:block">
                <AnimatedBrandStroke
                  className="w-52"
                  delay={0.35}
                  duration={2}
                />
              </div>
              <div className="absolute -inset-x-8 top-16 h-95 rounded-full bg-accent-soft/45 blur-3xl" />
              <div className="relative z-10 w-full">
                <div className="group relative aspect-3/4 rotate-[-2.8deg] overflow-hidden rounded-3xl border-4 border-surface bg-surface shadow-[0_30px_52px_rgba(35,54,149,0.24)] transition-transform duration-500 ease-out will-change-transform motion-reduce:transform-none hover:rotate-0">
                  <div className="absolute inset-0 bg-linear-to-t from-surface/90 via-surface/70 to-surface/35" />
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-6">
                    <Image
                      alt="Logo Michela Ensina"
                      className="w-32"
                      height={124}
                      src="/assets/brand/logos/logo-horizontal-purple-dark.svg"
                      width={409}
                    />
                    <h3 className="text-center text-4xl text-primary">
                      Modo
                      <br />
                      Fluente
                    </h3>
                    <p className="rounded-full bg-surface-soft px-4 py-1 text-xs font-bold uppercase tracking-wide text-secondary">
                      O Guia Prático
                    </p>
                  </div>
                </div>

                <div className="absolute -bottom-4 right-0 rotate-[5deg] rounded-3xl border-2 border-border-soft bg-surface p-2.5 shadow-[0_20px_35px_rgba(35,54,149,0.22)] transition-transform duration-500 ease-out will-change-transform motion-reduce:transform-none sm:-bottom-7 sm:-right-2.5 sm:p-3 group-hover:rotate-0">
                  <div className="w-36 overflow-hidden rounded-2xl border border-border-soft bg-surface sm:w-40">
                    <p className="bg-surface-soft px-3 py-2 text-center text-[10px] font-bold tracking-wide text-secondary">
                      PLANNER SEMANAL
                    </p>
                    <div className="space-y-3 p-3">
                      <div className="h-1.5 rounded bg-surface-soft" />
                      <div className="grid grid-cols-5 gap-1">
                        {Array.from({ length: 5 }).map((_, index) => (
                          <span
                            key={index}
                            className="h-7 rounded bg-surface-soft/85"
                          />
                        ))}
                      </div>
                      <div className="h-16 rounded bg-surface-soft/55" />
                    </div>
                  </div>
                </div>
              </div>
            </aside>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
