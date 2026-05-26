import Image from "next/image";

import { PAIN_POINTS } from "@/data/landing";

import { Reveal } from "@/components/motion/Reveal";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";

const PAIN_POINT_DECORATIONS = [
  [
    {
      src: "/assets/brand/graphics/balao-fala.svg",
      className: "-right-8 -top-10 w-28 opacity-34",
      width: 134,
      height: 102,
    },
    {
      src: "/assets/brand/graphics/elemento-01.svg",
      className: "-left-10 bottom-0 w-28 opacity-30",
      width: 385,
      height: 486,
    },
  ],
  [
    {
      src: "/assets/brand/graphics/emoji.svg",
      className: "-right-5 top-1/2 w-16 -translate-y-1/2 opacity-30",
      width: 120,
      height: 120,
    },
  ],
  [
    {
      src: "/assets/brand/graphics/emoji.svg",
      className: "-left-4 -top-4 w-16 opacity-34",
      width: 120,
      height: 120,
    },
    {
      src: "/assets/brand/graphics/elementos-02.svg",
      className: "-right-14 -bottom-12 w-44 opacity-28",
      width: 385,
      height: 486,
    },
  ],
] as const;

export function PainPointsSection() {
  return (
    <Section
      className="relative overflow-hidden bg-surface/40"
      id="dor"
      tone="soft"
    >
      <Container className="relative max-w-5xl">
        {/* Section background decor */}
        <Image
          alt=""
          aria-hidden
          className="pointer-events-none absolute -left-8 -top-16 w-32 rotate-z-80 opacity-34 sm:-left-20 sm:w-44"
          height={486}
          src="/assets/brand/graphics/elemento-01-lilas.svg"
          width={385}
        />

        <Image
          alt=""
          aria-hidden
          className="pointer-events-none absolute rotate-20 -right-16 top-10 hidden w-30 opacity-14 sm:block"
          height={486}
          src="/assets/brand/graphics/elementos-02-lilas.svg"
          width={385}
        />

        <Image
          alt=""
          aria-hidden
          className="pointer-events-none absolute -left-27 bottom-5 hidden w-6 -rotate-z-12 opacity-28 lg:block"
          height={120}
          src="/assets/brand/graphics/lapis-lilas.svg"
          width={120}
        />

        <Image
          alt=""
          aria-hidden
          className="pointer-events-none absolute -right-35 -bottom-15 hidden w-30 rotate-z-12 opacity-28 lg:block"
          height={125}
          src="/assets/brand/graphics/livro-lilas.svg"
          width={125}
        />

        <Image
          alt=""
          aria-hidden
          className="pointer-events-none absolute -scale-x-100 left-10 -bottom-10 hidden w-18 translate-y-1/2 opacity-28 xl:block"
          height={102}
          src="/assets/brand/graphics/emoji-lilas.svg"
          width={134}
        />

        <Image
          alt=""
          aria-hidden
          className="pointer-events-none absolute top-4 right-[16%] hidden w-7 opacity-22 lg:block"
          height={120}
          src="/assets/brand/graphics/estrela-lilas.svg"
          width={120}
        />

        {/* subtle SVG line details */}
        <svg
          aria-hidden
          className="pointer-events-none absolute -left-18 top-30 hidden size-52 text-accent opacity-[0.11] lg:block"
          fill="none"
          viewBox="0 0 220 220"
        >
          <path
            d="M26 132C52 82 93 50 144 39C174 33 201 36 226 48"
            stroke="currentColor"
            strokeLinecap="round"
            strokeWidth="2"
          />
          <path
            d="M50 154C72 113 108 86 151 76C178 70 203 74 226 84"
            stroke="currentColor"
            strokeLinecap="round"
            strokeWidth="2"
          />
          <path
            d="M78 178C96 146 124 126 158 119C181 114 203 117 223 126"
            stroke="currentColor"
            strokeLinecap="round"
            strokeWidth="2"
          />
          <circle cx="78" cy="42" r="4" fill="currentColor" />
          <circle cx="110" cy="26" r="2.5" fill="currentColor" />
        </svg>

        <svg
          aria-hidden
          className="pointer-events-none absolute right-27 -bottom-20 hidden size-46 -rotate-58 text-secondary opacity-[0.1] lg:block"
          fill="none"
          viewBox="0 0 240 240"
        >
          <path
            d="M198 132C174 180 119 198 72 174C25 149 7 94 31 48"
            stroke="currentColor"
            strokeLinecap="round"
            strokeWidth="2"
          />
          <path
            d="M170 122C153 154 116 166 84 150C52 133 40 96 57 65"
            stroke="currentColor"
            strokeLinecap="round"
            strokeWidth="2"
          />
          <circle cx="200" cy="54" r="4" fill="currentColor" />
          <circle cx="218" cy="88" r="2.5" fill="currentColor" />
        </svg>

        <svg
          aria-hidden
          className="pointer-events-none absolute -right-24 top-1/2 hidden size-60 -scale-x-100 -translate-y-1/2 text-accent opacity-[0.09] xl:block"
          fill="none"
          viewBox="0 0 260 260"
        >
          <path
            d="M18 154C50 96 99 59 158 47C192 40 224 44 253 57"
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
          <circle cx="72" cy="38" r="4" fill="currentColor" />
        </svg>

        <div className="flex flex-col space-y-9 sm:space-y-12">
          <Reveal
            className="mx-auto flex max-w-3xl flex-col items-center space-y-3 text-center"
            variant="fade-up"
          >
            <h2 className="pb-2 z-10 text-3xl text-secondary! sm:text-5xl">
              Já passou por isso?
            </h2>
          </Reveal>

          <div className="mx-auto max-w-3xl space-y-4 sm:space-y-5">
            {PAIN_POINTS.map((point, index) => (
              <Reveal
                key={point}
                delay={Math.min(index * 0.07, 0.28)}
                duration={0.58}
                variant="fade-up"
              >
                <article className="group relative overflow-hidden rounded-3xl border border-border-soft/65 bg-surface px-4 py-4 shadow-sm transition-transform duration-300 hover:-translate-y-0.5 sm:px-7 sm:py-6">
                  {PAIN_POINT_DECORATIONS[index]?.map((decoration) => (
                    <Image
                      key={decoration.src}
                      alt=""
                      aria-hidden
                      className={`pointer-events-none absolute ${decoration.className}`}
                      height={decoration.height}
                      src={decoration.src}
                      width={decoration.width}
                    />
                  ))}

                  <div className="relative z-10 flex items-center gap-3 sm:gap-5">
                    <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-full bg-accent-soft/28 shadow-inner sm:size-14">
                      <Image
                        alt=""
                        aria-hidden
                        className="w-5 opacity-70 transition-opacity duration-300 group-hover:opacity-85 sm:w-6"
                        height={120}
                        src="/assets/brand/graphics/estrela.svg"
                        width={120}
                      />
                    </span>

                    <p className="text-base font-medium leading-relaxed text-secondary sm:pt-1 sm:text-xl  will-change-transform">
                      <span aria-hidden>&ldquo;</span>
                      {point}
                      <span aria-hidden>&rdquo;</span>
                    </p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}
