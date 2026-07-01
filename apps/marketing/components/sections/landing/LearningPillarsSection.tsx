import Image from "next/image";
import {
  Brain,
  Compass,
  Languages,
  PencilLine,
  TrendingUp,
} from "lucide-react";

import { LEARNING_PILLARS } from "@/data/landing";

import { Reveal } from "@/components/motion/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";

const PILLAR_ICONS = [
  Brain,
  Compass,
  PencilLine,
  Languages,
  TrendingUp,
] as const;

const PILLAR_LABELS = ["Base", "Direção", "Estratégia", "Prática", "Clareza"];

type LearningPillarsSectionProps = {
  isReleased?: boolean;
};

export function LearningPillarsSection({
  isReleased = false,
}: LearningPillarsSectionProps) {
  return (
    <Section
      className="relative overflow-hidden bg-background"
      id="conteudo"
      tone="soft"
    >
      <Container className="relative max-w-6xl pl-0 sm:px-7 lg:px-10">
        <span
          aria-hidden
          className="pointer-events-none absolute -left-8 top-20 hidden h-44 w-44 rounded-full bg-accent-soft/20 blur-3xl lg:block"
        />
        <Image
          alt=""
          aria-hidden
          className="pointer-events-none absolute -left-12 top-56 hidden w-16 opacity-40 lg:block"
          height={117}
          src="/assets/brand/graphics/estrela-lilas.svg"
          width={120}
        />
        <Image
          alt=""
          aria-hidden
          className="pointer-events-none absolute -right-10 top-8 hidden w-16 opacity-50 sm:block"
          height={120}
          src="/assets/brand/graphics/estrela-lilas.svg"
          width={120}
        />
        <Image
          alt=""
          aria-hidden
          className="pointer-events-none absolute rotate-80 -right-18 bottom-34 hidden w-34 opacity-24 lg:block"
          height={486}
          src="/assets/brand/graphics/elemento-01-lilas.svg"
          width={385}
        />
        <Image
          alt=""
          aria-hidden
          className="pointer-events-none absolute -rotate-z-20 left-8 top-10 hidden w-18 opacity-16 md:block"
          height={97}
          src="/assets/brand/graphics/emoji.svg"
          width={178}
        />
        <Image
          alt=""
          aria-hidden
          className="pointer-events-none absolute rotate-z-20 right-4 bottom-4 hidden w-20 opacity-14 md:block"
          height={102}
          src="/assets/brand/graphics/emoji.svg"
          width={134}
        />
        <Image
          alt=""
          aria-hidden
          className="pointer-events-none absolute -left-40 top-[42%] -rotate-20 hidden w-24 opacity-16 xl:block"
          height={120}
          src="/assets/brand/graphics/check.svg"
          width={120}
        />

        <svg
          aria-hidden
          className="pointer-events-none absolute -left-21 top-[55%] hidden -rotate-125 size-48 text-accent opacity-[0.07] xl:block"
          fill="none"
          viewBox="0 0 220 220"
        >
          <path
            d="M24 86C48 62 78 50 112 52C140 53 165 64 186 84"
            stroke="currentColor"
            strokeLinecap="round"
            strokeWidth="2"
          />
          <path
            d="M18 116C48 88 84 74 122 76C150 77 175 88 196 108"
            stroke="currentColor"
            strokeLinecap="round"
            strokeWidth="2"
          />
          <path
            d="M34 148C60 126 91 115 124 116C146 117 168 125 188 140"
            stroke="currentColor"
            strokeLinecap="round"
            strokeWidth="2"
          />
          <circle cx="44" cy="48" r="3.5" fill="currentColor" />
          <circle cx="64" cy="34" r="2.5" fill="currentColor" />
        </svg>

        {/* Corner-only SVG background details */}
        <svg
          aria-hidden
          className="pointer-events-none absolute -left-20 top-0 hidden h-64 w-64 text-accent opacity-10 lg:block"
          fill="none"
          viewBox="0 0 260 260"
        >
          <path
            d="M44 18C21 57 18 102 38 140C61 184 106 205 151 195"
            stroke="currentColor"
            strokeLinecap="round"
            strokeWidth="2"
          />
          <path
            d="M84 0C56 44 53 91 76 126C98 160 137 174 177 162"
            stroke="currentColor"
            strokeLinecap="round"
            strokeWidth="2"
          />
          <path
            d="M18 74C46 68 74 78 92 100C111 123 115 153 104 181"
            stroke="currentColor"
            strokeLinecap="round"
            strokeWidth="2"
          />
          <circle cx="190" cy="56" r="5" fill="currentColor" />
          <circle cx="218" cy="112" r="3.5" fill="currentColor" />
        </svg>

        <svg
          aria-hidden
          className="pointer-events-none absolute -right-24 top-18 hidden h-72 w-72 text-secondary opacity-8 lg:block"
          fill="none"
          viewBox="0 0 300 300"
        >
          <path
            d="M22 176C59 105 119 59 193 43C237 34 278 38 316 55"
            stroke="currentColor"
            strokeLinecap="round"
            strokeWidth="2"
          />
          <path
            d="M58 204C91 143 142 104 204 91C242 83 278 88 311 102"
            stroke="currentColor"
            strokeLinecap="round"
            strokeWidth="2"
          />
          <path
            d="M104 228C131 181 171 151 220 142C252 136 282 140 310 151"
            stroke="currentColor"
            strokeLinecap="round"
            strokeWidth="2"
          />
          <circle cx="86" cy="62" r="6" fill="currentColor" />
          <circle cx="130" cy="34" r="3.5" fill="currentColor" />
        </svg>

        <svg
          aria-hidden
          className="pointer-events-none absolute rotate-10 -bottom-28 -right-26 hidden h-80 w-80 text-accent opacity-9 lg:block"
          fill="none"
          viewBox="0 0 320 320"
        >
          <path
            d="M245 188C216 241 153 262 100 234C47 205 26 142 54 89"
            stroke="currentColor"
            strokeLinecap="round"
            strokeWidth="2"
          />
          <path
            d="M218 174C196 213 150 228 111 207C72 185 57 139 78 100"
            stroke="currentColor"
            strokeLinecap="round"
            strokeWidth="2"
          />
          <circle cx="258" cy="82" r="5" fill="currentColor" />
          <circle cx="280" cy="122" r="3.5" fill="currentColor" />
          <circle cx="230" cy="56" r="3" fill="currentColor" />
        </svg>

        {/* Very subtle mid-side details */}
        <svg
          aria-hidden
          className="pointer-events-none absolute -left-10 top-[46%] hidden h-40 w-40 -translate-y-1/2 text-accent opacity-[0.05] xl:block"
          fill="none"
          viewBox="0 0 180 180"
        >
          <path
            d="M18 38C48 28 78 35 98 55C118 75 124 105 114 134"
            stroke="currentColor"
            strokeLinecap="round"
            strokeWidth="2"
          />
          <path
            d="M32 12C72 8 104 22 124 48C144 74 148 110 136 144"
            stroke="currentColor"
            strokeLinecap="round"
            strokeWidth="2"
          />
          <circle cx="138" cy="24" r="3.5" fill="currentColor" />
        </svg>

        <svg
          aria-hidden
          className="pointer-events-none absolute -right-8 top-[58%] hidden h-44 w-44 -translate-y-1/2 text-secondary opacity-[0.05] xl:block"
          fill="none"
          viewBox="0 0 200 200"
        >
          <path
            d="M24 132C46 92 82 66 126 58C151 54 174 57 194 66"
            stroke="currentColor"
            strokeLinecap="round"
            strokeWidth="2"
          />
          <path
            d="M48 154C66 122 95 102 130 96C152 92 172 95 190 102"
            stroke="currentColor"
            strokeLinecap="round"
            strokeWidth="2"
          />
          <circle cx="54" cy="42" r="4" fill="currentColor" />
          <circle cx="82" cy="26" r="2.5" fill="currentColor" />
        </svg>

        <div className="space-y-12 sm:space-y-14">
          <Reveal
            className="mx-auto flex max-w-3xl flex-col items-center space-y-3 text-center"
            variant="fade-up"
          >
            <span className="inline-flex items-center rounded-full border border-accent-soft/65 bg-surface px-5 py-2 text-xs font-bold uppercase tracking-[0.2em] text-secondary shadow-sm">
              <span
                aria-hidden
                className="mr-2 inline-flex size-2 rounded-full bg-accent"
              />
              Conteúdo do guia
            </span>

            <h2 className="pb-2 text-4xl sm:text-5xl">
              O que você vai aprender?
            </h2>
          </Reveal>

          {/* Mobile / tablet: stacked roadmap cards */}
          <div className="relative mx-auto max-w-4xl overflow-visible lg:hidden">
            <Reveal
              aria-hidden
              className="pointer-events-none absolute left-6 top-8 h-[calc(100%-4rem)]"
              duration={0.8}
              variant="fade"
            >
              <span className="learning-mobile-roadmap-line block h-full w-px" />
            </Reveal>

            <ol className="relative z-10 grid gap-8 px-2 sm:gap-9">
              {LEARNING_PILLARS.map((pillar, index) => {
                const PillarIcon = PILLAR_ICONS[index] ?? Brain;

                return (
                  <li key={pillar.title}>
                    <Reveal
                      delay={Math.min(index * 0.07, 0.28)}
                      duration={0.58}
                      variant="fade-up"
                    >
                      <article className="relative ml-7 rounded-3xl border border-border-soft/70 bg-surface px-5 pb-5 pt-11 shadow-sm transition-transform duration-300 hover:-translate-y-0.5 sm:ml-10 sm:px-7 sm:pb-6 sm:pt-11">
                        <div
                          aria-hidden
                          className="pointer-events-none absolute -right-4 -top-7 size-22 rounded-full bg-surface-soft/35 sm:-right-8 sm:-top-8 sm:size-28"
                        />

                        <span className="absolute -left-7 top-6 inline-flex size-14 items-center justify-center rounded-full bg-secondary text-surface shadow-md ring-8 ring-surface-soft sm:-left-10 sm:size-16">
                          <PillarIcon
                            aria-hidden
                            className="size-6 sm:size-7"
                            strokeWidth={2.2}
                          />
                        </span>

                        <div className="relative space-y-4 pl-4 sm:pl-0">
                          <div>
                            <span className="ml-2 text-xs font-bold uppercase tracking-[0.18em] text-accent">
                              Etapa {index + 1} · {PILLAR_LABELS[index]}
                            </span>

                            <h3 className="mt-2 text-2xl leading-tight sm:text-3xl">
                              {pillar.title}
                            </h3>
                          </div>

                          <ul className="space-y-2.5">
                            {pillar.points.map((point) => (
                              <li
                                key={point}
                                className="flex gap-3 text-base leading-relaxed text-secondary sm:text-lg"
                              >
                                <span
                                  aria-hidden
                                  className="mt-[0.58em] size-2 shrink-0 rounded-full bg-accent"
                                />
                                <span>{point}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </article>
                    </Reveal>
                  </li>
                );
              })}
            </ol>
          </div>

          {/* Desktop: Z-pattern roadmap */}
          <div className="relative mx-auto hidden max-w-5xl lg:block">
            <Reveal
              aria-hidden
              className="pointer-events-none absolute inset-x-0 top-24 z-0 mx-auto h-320 max-w-195"
              duration={0.9}
              variant="fade"
            >
              <svg
                className="learning-roadmap-line h-full w-full overflow-visible"
                fill="none"
                viewBox="0 0 780 1280"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  className="learning-roadmap-path"
                  d="
                    M 250 78
                    C 430 78, 340 208, 520 208
                    C 660 208, 660 344, 520 344
                    C 340 344, 430 498, 250 498
                    C 110 498, 110 645, 250 645
                    C 430 645, 340 800, 520 800
                    C 650 800, 650 1040, 520 1040
                    C 430 1040, 345 1120, 260 1220
                  "
                  pathLength="1"
                />
              </svg>
            </Reveal>

            <ol className="relative z-10 grid gap-y-16">
              {LEARNING_PILLARS.map((pillar, index) => {
                const PillarIcon = PILLAR_ICONS[index] ?? Brain;
                const isRight = index % 2 === 1;

                return (
                  <li
                    key={pillar.title}
                    className="grid grid-cols-2 items-start gap-12"
                  >
                    <div className={isRight ? "col-start-2" : "col-start-1"}>
                      <Reveal
                        delay={Math.min(index * 0.08, 0.32)}
                        duration={0.62}
                        variant="fade-up"
                      >
                        <article className="group relative rounded-3xl border border-border-soft/70 bg-surface px-7 pb-7 pt-10 shadow-sm transition-transform duration-300 hover:-translate-y-1">
                          <div
                            aria-hidden
                            className="pointer-events-none absolute -right-8 -top-8 size-28 rounded-full bg-surface-soft/35"
                          />

                          <span className="absolute -top-8 left-7 inline-flex size-16 items-center justify-center rounded-full bg-secondary text-surface shadow-md ring-8 ring-surface-soft">
                            <PillarIcon
                              aria-hidden
                              className="size-7"
                              strokeWidth={2.2}
                            />
                          </span>

                          <div className="relative space-y-4">
                            <div>
                              <span className="text-xs font-bold uppercase tracking-[0.18em] text-accent">
                                Etapa {index + 1} · {PILLAR_LABELS[index]}
                              </span>

                              <h3 className="mt-2 text-[1.85rem] leading-tight">
                                {pillar.title}
                              </h3>
                            </div>

                            <ul className="space-y-2.5">
                              {pillar.points.map((point) => (
                                <li
                                  key={point}
                                  className="flex gap-3 text-base leading-relaxed text-secondary"
                                >
                                  <span
                                    aria-hidden
                                    className="mt-[0.62em] size-2 shrink-0 rounded-full bg-accent"
                                  />
                                  <span>{point}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </article>
                      </Reveal>
                    </div>
                  </li>
                );
              })}
            </ol>
          </div>

          <Reveal
            className="flex justify-center"
            delay={0.14}
            variant="fade-up"
          >
            <ButtonLink
              href="#captura"
              className="h-10 px-4 text-sm sm:h-12 sm:px-6 sm:text-base"
              variant="primary"
            >
              {isReleased
                ? "Quero aprender um novo idioma"
                : "Quero receber o aviso de lançamento"}
            </ButtonLink>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
