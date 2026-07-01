import Image from "next/image";

import { PLANNER_COPY } from "@/data/landing";
import { MODO_FLUENTE_HOTMART_URL } from "@/lib/release";

import { Reveal } from "@/components/motion/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";

const PLANNER_SKILLS = [
  "Vocabulário",
  "Gramática",
  "Escuta",
  "Escrita",
  "Fala",
];

export function PlannerSection() {
  return (
    <Section
      className="relative overflow-hidden bg-background pb-8 pt-14 sm:pb-10 sm:pt-16 lg:pb-12"
      id="planner"
      tone="accent"
    >
      {/* section-level subtle background */}
      <span
        aria-hidden
        className="pointer-events-none absolute -left-16 top-16 hidden size-52 rounded-full bg-accent-soft/15 blur-3xl lg:block"
      />
      <span
        aria-hidden
        className="pointer-events-none absolute -right-20 bottom-10 hidden size-64 rounded-full bg-surface-soft/25 blur-3xl lg:block"
      />
      {/* section-level brand ornaments */}
      <Image
        alt=""
        aria-hidden
        className="pointer-events-none absolute left-41 top-1/2 hidden w-24 -translate-y-1/2 opacity-20 lg:block"
        height={120}
        src="/assets/brand/graphics/estrela.svg"
        width={120}
      />

      <Image
        alt=""
        aria-hidden
        className="pointer-events-none absolute -right-12 top-20 hidden -rotate-12 w-32 opacity-18 lg:block"
        height={125}
        src="/assets/brand/graphics/livro.svg"
        width={125}
      />

      <Image
        alt=""
        aria-hidden
        className="pointer-events-none absolute -left-5 top-14 hidden w-14 rotate-12 opacity-18 lg:block"
        height={120}
        src="/assets/brand/graphics/lapis.svg"
        width={120}
      />

      <svg
        aria-hidden
        className="pointer-events-none absolute -rotate-30 left-68 bottom-2 hidden h-44 w-32 text-secondary opacity-[0.1] xl:block"
        fill="none"
        viewBox="0 0 140 190"
      >
        <path
          d="M102 22C72 49 54 79 50 111C47 141 56 166 75 184"
          stroke="currentColor"
          strokeLinecap="round"
          strokeWidth="2"
        />
        <path
          d="M122 42C95 66 80 92 77 119C74 144 83 165 99 181"
          stroke="currentColor"
          strokeLinecap="round"
          strokeWidth="2"
        />
        <circle cx="80" cy="28" r="3.5" fill="currentColor" />
        <circle cx="104" cy="18" r="2.5" fill="currentColor" />
      </svg>

      <svg
        aria-hidden
        className="pointer-events-none absolute -right-20 top-1/2 hidden h-48 w-36 -translate-y-1/2 text-accent opacity-[0.09] xl:block"
        fill="none"
        viewBox="0 0 160 210"
      >
        <path
          d="M24 138C47 99 82 75 124 69C149 65 172 70 192 82"
          stroke="currentColor"
          strokeLinecap="round"
          strokeWidth="2"
        />
        <path
          d="M48 164C67 134 96 116 130 111C151 108 171 112 188 122"
          stroke="currentColor"
          strokeLinecap="round"
          strokeWidth="2"
        />
        <circle cx="58" cy="62" r="3.5" fill="currentColor" />
      </svg>

      <Container className="relative">
        <Reveal variant="fade-scale">
          <div className="relative overflow-hidden rounded-[2.2rem] border border-surface/60 bg-surface/55 px-4 py-8 shadow-sm backdrop-blur-sm sm:rounded-[3rem] sm:px-10 sm:py-14">
            {/* background assets */}
            <Image
              alt=""
              aria-hidden
              className="pointer-events-none absolute -left-16 -top-16 w-36 opacity-10 sm:-left-20 sm:-top-20 sm:w-52 sm:opacity-12"
              height={486}
              src="/assets/brand/graphics/elemento-01.svg"
              width={385}
            />

            <Image
              alt=""
              aria-hidden
              className="pointer-events-none absolute -bottom-10 -right-10 hidden w-28 -rotate-12 opacity-8 sm:block sm:w-40 lg:w-48"
              height={120}
              src="/assets/brand/graphics/lapis-lilas.svg"
              width={120}
            />

            {/* added, but still subtle */}
            <Image
              alt=""
              aria-hidden
              className="pointer-events-none absolute -right-18 top-8 hidden w-24 opacity-10 lg:block"
              height={125}
              src="/assets/brand/graphics/livro.svg"
              width={125}
            />

            <Image
              alt=""
              aria-hidden
              className="pointer-events-none absolute -left-8 bottom-8 hidden w-10 opacity-16 lg:block"
              height={120}
              src="/assets/brand/graphics/estrela-lilas.svg"
              width={120}
            />

            {/* subtle corner SVG details */}
            <svg
              aria-hidden
              className="pointer-events-none absolute -right-10 top-6 hidden size-52 text-secondary opacity-[0.045] lg:block"
              fill="none"
              viewBox="0 0 220 220"
            >
              <path
                d="M20 132C49 78 93 43 147 31C178 24 206 28 232 40"
                stroke="currentColor"
                strokeLinecap="round"
                strokeWidth="2"
              />
              <path
                d="M48 153C73 110 109 82 153 72C179 66 202 69 224 79"
                stroke="currentColor"
                strokeLinecap="round"
                strokeWidth="2"
              />
              <circle cx="70" cy="38" r="4" fill="currentColor" />
              <circle cx="100" cy="22" r="2.5" fill="currentColor" />
            </svg>

            <svg
              aria-hidden
              className="pointer-events-none absolute -bottom-12 -left-8 hidden size-48 text-accent opacity-[0.045] lg:block"
              fill="none"
              viewBox="0 0 200 200"
            >
              <path
                d="M28 24C61 18 90 27 111 48C132 69 139 98 130 128"
                stroke="currentColor"
                strokeLinecap="round"
                strokeWidth="2"
              />
              <path
                d="M13 58C41 52 66 60 84 78C101 96 107 120 101 145"
                stroke="currentColor"
                strokeLinecap="round"
                strokeWidth="2"
              />
              <circle cx="145" cy="42" r="3.5" fill="currentColor" />
            </svg>

            {/* added left-mid subtle lines */}
            <svg
              aria-hidden
              className="pointer-events-none absolute -left-22 top-1/2 hidden h-40 w-28 -translate-y-1/2 text-accent opacity-[0.055] xl:block"
              fill="none"
              viewBox="0 0 120 180"
            >
              <path
                d="M92 18C64 42 47 69 42 98C38 125 44 149 60 168"
                stroke="currentColor"
                strokeLinecap="round"
                strokeWidth="2"
              />
              <path
                d="M108 34C83 55 68 79 64 104C61 128 67 149 81 165"
                stroke="currentColor"
                strokeLinecap="round"
                strokeWidth="2"
              />
              <path
                d="M72 58C54 77 45 99 46 122C47 144 55 162 69 176"
                stroke="currentColor"
                strokeLinecap="round"
                strokeWidth="2"
              />
              <circle cx="76" cy="22" r="3.5" fill="currentColor" />
            </svg>

            {/* star stays straight */}
            <Image
              alt=""
              aria-hidden
              className="pointer-events-none absolute right-18 top-22 hidden w-10 opacity-16 xl:block"
              height={120}
              src="/assets/brand/graphics/estrela-lilas.svg"
              width={120}
            />

            <div className="relative z-10 grid gap-7 sm:gap-9 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
              <Reveal duration={0.58} variant="fade-scale">
                <div className="relative">
                  <div className="overflow-hidden rounded-3xl border border-border-soft bg-surface shadow-md">
                    <Image
                      alt="Prévia do planner"
                      className="aspect-4/5 h-auto w-full object-cover object-bottom"
                      height={2048}
                      src="/assets/brand/capa-planner.png"
                      width={1312}
                    />

                    <div className="absolute bottom-2 left-2 right-2 rounded-2xl bg-surface/92 px-3 py-2.5 shadow-md backdrop-blur-sm sm:left-4 sm:right-auto sm:px-5 sm:py-3">
                      <p className="text-xs font-bold text-primary sm:text-sm">
                        Organiza por competências
                      </p>

                      <div className="mt-2 flex flex-wrap gap-1.5 sm:gap-2">
                        {PLANNER_SKILLS.map((tag, index) => (
                          <span
                            key={`${tag}-${index}`}
                            className="rounded-full bg-surface-soft px-2.5 py-1 text-[11px] font-semibold text-secondary sm:px-3 sm:text-xs"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </Reveal>

              <Reveal delay={0.08} variant="fade-up">
                <aside className="relative space-y-6">
                  <h2 className="text-3xl sm:text-5xl">
                    Planner Semanal de Idiomas
                  </h2>

                  <p className="text-base leading-relaxed text-secondary sm:text-lg">
                    {PLANNER_COPY.paragraphs[0]}
                  </p>

                  <p className="text-base leading-relaxed text-secondary sm:text-lg">
                    {PLANNER_COPY.paragraphs[2]}
                  </p>

                  <div className="mt-2 rounded-2xl bg-background px-6 py-4 shadow-sm">
                    <p className="text-lg font-bold text-primary">
                      Planner gratuito com o guia.
                    </p>
                    <p className="mt-1 text-base text-text-muted">
                      Planner separado por R$ 20.
                    </p>
                  </div>

                  <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                    <ButtonLink
                      className="w-full justify-center sm:w-auto"
                      href="#captura"
                      size="lg"
                      variant="primary"
                    >
                      Quero o guia com planner
                    </ButtonLink>

                    <ButtonLink
                      className="w-full justify-center sm:w-auto"
                      href={MODO_FLUENTE_HOTMART_URL}
                      rel="noopener noreferrer"
                      size="lg"
                      target="_blank"
                      variant="outline"
                    >
                      Quero só o planner
                    </ButtonLink>
                  </div>
                </aside>
              </Reveal>
            </div>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
