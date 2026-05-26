import Image from "next/image";
import { CircleOff, Map } from "lucide-react";

import { GUIDE_COMPARISON } from "@/data/landing";

import { Reveal } from "@/components/motion/Reveal";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";

export function GuideIntroSection() {
  return (
    <Section
      className="relative overflow-hidden bg-surface-soft"
      id="o-guia"
      tone="soft"
    >
      <Container className="relative">
        {/* Background decor */}
        <span
          aria-hidden
          className="pointer-events-none absolute -left-16 top-12 hidden size-48 rounded-full bg-accent-soft/12 blur-3xl lg:block"
        />
        <span
          aria-hidden
          className="pointer-events-none absolute right-8 bottom-8 hidden size-44 rounded-full bg-surface-soft/20 blur-3xl lg:block"
        />

        <Image
          alt=""
          aria-hidden
          className="pointer-events-none absolute -left-27 top-4 hidden w-44 opacity-10 lg:block"
          height={486}
          src="/assets/brand/graphics/elemento-01.svg"
          width={385}
        />

        <Image
          alt=""
          aria-hidden
          className="pointer-events-none absolute -right-10 top-34 hidden w-24 opacity-18 sm:block sm:w-30"
          height={120}
          src="/assets/brand/graphics/balao-fala.svg"
          width={134}
        />

        <Image
          alt=""
          aria-hidden
          className="pointer-events-none absolute right-18 top-4 hidden w-10 opacity-45 md:block"
          height={120}
          src="/assets/brand/graphics/estrela-lilas.svg"
          width={120}
        />

        <Image
          alt=""
          aria-hidden
          className="pointer-events-none absolute -left-6 bottom-12 hidden w-18 -rotate-12 opacity-12 lg:block"
          height={120}
          src="/assets/brand/graphics/check.svg"
          width={120}
        />

        <Image
          alt=""
          aria-hidden
          className="pointer-events-none absolute right-16 bottom-16 hidden w-18 rotate-12 opacity-10 lg:block"
          height={125}
          src="/assets/brand/graphics/livro.svg"
          width={125}
        />

        <svg
          aria-hidden
          className="pointer-events-none absolute -left-20 bottom-0 hidden size-56 text-accent opacity-[0.045] lg:block"
          fill="none"
          viewBox="0 0 240 240"
        >
          <path
            d="M34 192C62 138 107 103 162 91C194 84 224 88 252 100"
            stroke="currentColor"
            strokeLinecap="round"
            strokeWidth="2"
          />
          <path
            d="M60 212C84 168 122 140 169 130C197 124 224 128 248 138"
            stroke="currentColor"
            strokeLinecap="round"
            strokeWidth="2"
          />
          <circle cx="70" cy="58" r="4" fill="currentColor" />
          <circle cx="102" cy="42" r="2.5" fill="currentColor" />
        </svg>

        <svg
          aria-hidden
          className="pointer-events-none absolute -right-14 top-28 hidden size-64 text-secondary opacity-[0.04] lg:block"
          fill="none"
          viewBox="0 0 260 260"
        >
          <path
            d="M20 154C52 96 100 59 159 47C193 40 224 44 253 57"
            stroke="currentColor"
            strokeLinecap="round"
            strokeWidth="2"
          />
          <path
            d="M50 178C78 129 120 98 171 88C201 82 230 86 257 98"
            stroke="currentColor"
            strokeLinecap="round"
            strokeWidth="2"
          />
          <path
            d="M86 202C109 164 143 139 185 131C211 126 235 129 258 139"
            stroke="currentColor"
            strokeLinecap="round"
            strokeWidth="2"
          />
          <circle cx="72" cy="38" r="4" fill="currentColor" />
          <circle cx="104" cy="22" r="2.5" fill="currentColor" />
        </svg>

        <div className="grid gap-8 sm:gap-10 lg:grid-cols-[1fr_1fr] lg:items-center">
          <Reveal className="space-y-6" variant="fade-up">
            <h2 className="pb-2 text-3xl sm:text-5xl">O que é o guia?</h2>
            <p className="text-base leading-relaxed text-text sm:text-xl">
              O Modo Fluente é um guia prático para aprender idiomas com mais
              clareza, organização e constância.
            </p>
          </Reveal>

          <Reveal className="space-y-5" delay={0.08} variant="fade-scale">
            <article className="rounded-3xl border border-border-soft/65 bg-surface p-6 shadow-sm sm:p-8">
              <p className="text-xs font-bold uppercase tracking-wide text-text-muted">
                Entenda a diferença
              </p>
              <h3 className="mt-4 text-3xl sm:text-4xl">Não é um curso.</h3>
              <p className="mt-3 text-lg leading-relaxed text-secondary sm:text-xl">
                É um mapa para estudar com direção, tanto sozinho quanto como
                complemento de um curso ou aulas particulares.
              </p>
            </article>

            <div className="grid gap-4 sm:grid-cols-2">
              <article className="relative overflow-hidden rounded-3xl border border-border-soft/65 bg-surface p-5 shadow-sm sm:p-6">
                <Image
                  alt="Elemento decorativo"
                  aria-hidden
                  className="pointer-events-none absolute -right-6 -top-4 w-16 opacity-10"
                  height={120}
                  src="/assets/brand/graphics/estrela-lilas.svg"
                  width={120}
                />
                <div className="flex items-center gap-3 sm:flex-col sm:items-center sm:gap-0 ">
                  <div className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-surface-soft text-secondary sm:mb-2 sm:mt-0">
                    <CircleOff aria-hidden className="size-6 text-surface" />
                  </div>
                  <ul className="space-y-2.5 text-left sm:text-start">
                    {GUIDE_COMPARISON.not.map((item) => (
                      <li
                        key={item}
                        className="text-base font-semibold leading-relaxed text-secondary"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>

              <article className="relative overflow-hidden rounded-3xl border border-border-soft/65 bg-surface p-5 shadow-sm sm:p-6">
                <Image
                  alt="Elemento decorativo"
                  aria-hidden
                  className="pointer-events-none absolute -right-4 -top-6 w-20 opacity-10"
                  height={486}
                  src="/assets/brand/graphics/elemento-01-lilas.svg"
                  width={385}
                />
                <div className="flex items-center gap-3 sm:flex-col sm:items-center sm:gap-0">
                  <div className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-surface-soft text-secondary sm:mb-2 sm:mt-0">
                    <Map aria-hidden className="size-6 text-surface" />
                  </div>
                  <ul className="space-y-2.5 text-left sm:text-start">
                    {GUIDE_COMPARISON.yes.map((item) => (
                      <li
                        key={item}
                        className="text-base font-semibold leading-relaxed text-secondary"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            </div>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
