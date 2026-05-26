import Image from "next/image";
import {
  BookOpen,
  CalendarDays,
  CheckSquare,
  ClipboardList,
  GraduationCap,
  MonitorPlay,
  Speech,
} from "lucide-react";

import { PRODUCT_BUNDLE } from "@/data/landing";

import { Reveal } from "@/components/motion/Reveal";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";

export function ProductIncludesSection() {
  const mainItems = [
    { label: PRODUCT_BUNDLE.mainProduct.items[0], Icon: Speech },
    { label: PRODUCT_BUNDLE.mainProduct.items[1], Icon: MonitorPlay },
    { label: PRODUCT_BUNDLE.mainProduct.items[2], Icon: ClipboardList },
    { label: PRODUCT_BUNDLE.mainProduct.items[3], Icon: CheckSquare },
  ] as const;

  const includeItems = [
    {
      label: PRODUCT_BUNDLE.bonusPack.items[0].label,
      title: PRODUCT_BUNDLE.bonusPack.items[0].title,
      description: PRODUCT_BUNDLE.bonusPack.items[0].description,
      Icon: CalendarDays,
    },
    {
      label: PRODUCT_BUNDLE.bonusPack.items[1].label,
      title: PRODUCT_BUNDLE.bonusPack.items[1].title,
      description: PRODUCT_BUNDLE.bonusPack.items[1].description,
      Icon: BookOpen,
    },
  ] as const;

  return (
    <Section className="relative overflow-hidden bg-secondary" tone="default">
      {/* Background decor */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        {/* big soft shapes */}
        <div className="absolute -left-24 top-16 h-72 w-72 rounded-full border border-white/10 opacity-40" />
        <div className="absolute -left-8 top-28 h-44 w-44 rounded-full bg-white/4" />
        <div className="absolute -right-20 top-10 h-72 w-72 rounded-full border border-white/10 opacity-35" />
        <div className="absolute -right-10 bottom-12 h-52 w-52 rounded-full bg-white/5" />

        {/* corner cropped brand-ish masses */}
        <div className="absolute -left-12 bottom-8 h-40 w-40 rotate-[-14deg] rounded-[2.5rem] border border-white/10 opacity-30" />
        <div className="absolute right-4 top-24 h-32 w-32 rotate-18 rounded-4xl border border-white/10 opacity-30" />

        {/* existing assets */}
        <Image
          alt=""
          aria-hidden
          src="/assets/brand/graphics/livro.svg"
          width={150}
          height={150}
          className="absolute -right-10 top-12 hidden w-32 rotate-18 opacity-[0.14] md:block lg:w-40"
        />
        <Image
          alt=""
          aria-hidden
          src="/assets/brand/graphics/check.svg"
          width={160}
          height={160}
          className="absolute -left-8 bottom-16 hidden w-28 rotate-[-18deg] opacity-[0.12] md:block lg:w-36"
        />
        <Image
          alt=""
          aria-hidden
          src="/assets/brand/graphics/estrela-branca.svg"
          width={80}
          height={80}
          className="absolute left-[15%] top-38 w-6 opacity-40 sm:w-8"
        />
        <Image
          alt=""
          aria-hidden
          src="/assets/brand/graphics/estrela-branca.svg"
          width={80}
          height={80}
          className="absolute right-[13%] bottom-28 hidden w-6  opacity-50 sm:block sm:w-8"
        />

        {/* top right contour lines */}
        <svg
          className="absolute right-0 top-0 h-56 w-56 opacity-[0.16] md:h-72 md:w-72"
          viewBox="0 0 300 300"
          fill="none"
        >
          <path
            d="M310 20C245 15 193 32 157 67C120 103 109 154 117 214"
            stroke="white"
            strokeWidth="1.6"
          />
          <path
            d="M315 43C259 39 213 52 181 82C149 113 138 156 145 205"
            stroke="white"
            strokeWidth="1.6"
          />
          <path
            d="M320 68C272 65 232 77 204 104C177 131 166 167 172 208"
            stroke="white"
            strokeWidth="1.6"
          />
          <path
            d="M323 94C281 91 247 102 223 125C200 148 189 178 194 212"
            stroke="white"
            strokeWidth="1.6"
          />
        </svg>

        {/* bottom left contour lines */}
        <svg
          className="absolute bottom-0 left-0 h-44 w-44 rotate-180 opacity-[0.14] md:h-56 md:w-56"
          viewBox="0 0 300 300"
          fill="none"
        >
          <path
            d="M310 20C245 15 193 32 157 67C120 103 109 154 117 214"
            stroke="white"
            strokeWidth="1.6"
          />
          <path
            d="M315 43C259 39 213 52 181 82C149 113 138 156 145 205"
            stroke="white"
            strokeWidth="1.6"
          />
          <path
            d="M320 68C272 65 232 77 204 104C177 131 166 167 172 208"
            stroke="white"
            strokeWidth="1.6"
          />
        </svg>

        {/* subtle little dots */}
        <span className="absolute left-[28%] top-24 h-2.5 w-2.5 rounded-full bg-white/30" />
        <span className="absolute right-[22%] top-[18%] h-2.5 w-2.5 rounded-full bg-white/25" />
        <span className="absolute bottom-[18%] left-[18%] h-2.5 w-2.5 rounded-full bg-white/20" />
      </div>

      <Container className="relative z-10">
        <div className="space-y-10 sm:space-y-12">
          <Reveal variant="fade-up">
            <div className="relative mx-auto max-w-3xl text-center">
              <Image
                alt=""
                aria-hidden
                src="/assets/brand/graphics/estrela-branca.svg"
                width={80}
                height={80}
                className="absolute left-2 top-2 hidden w-7 opacity-25 sm:block"
              />
              <Image
                alt=""
                aria-hidden
                src="/assets/brand/graphics/estrela-branca.svg"
                width={80}
                height={80}
                className="absolute right-4 top-10 hidden w-6 opacity-20 sm:block"
              />

              <h2 className="pb-2 text-center text-3xl text-surface! sm:pb-4 sm:text-5xl">
                O que você recebe ao comprar o guia?
              </h2>
            </div>
          </Reveal>

          <div className="relative mx-auto max-w-5xl lg:pb-10">
            <Reveal duration={0.58} variant="fade-scale">
              <article className="relative z-10 rounded-4xl bg-surface p-6 shadow-md sm:p-8 lg:w-[66%] lg:pr-16">
                {/* card decor */}
                <div
                  aria-hidden
                  className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-surface-soft/50"
                />
                <div
                  aria-hidden
                  className="absolute left-8 top-0 h-px w-16 bg-secondary/25"
                />
                <div
                  aria-hidden
                  className="absolute left-12 top-3 h-px w-10 rotate-18 bg-secondary/20"
                />

                <p className="inline-flex rounded-full bg-surface-soft px-4 py-1 text-xs font-bold uppercase tracking-wide text-secondary">
                  {PRODUCT_BUNDLE.mainProduct.eyebrow}
                </p>

                <div className="mt-4 flex items-center gap-1.5">
                  <h3 className="text-2xl sm:text-3xl">
                    {PRODUCT_BUNDLE.mainProduct.title}
                  </h3>
                </div>

                <p className="py-2 text-base leading-relaxed text-secondary sm:text-lg">
                  {PRODUCT_BUNDLE.mainProduct.description}
                </p>

                <p className="mt-2 flex items-start justify-start gap-2 rounded-2xl bg-background px-3.5 py-2 text-sm text-primary lg:justify-center lg:gap-1">
                  <GraduationCap size={22} strokeWidth={1.5} />
                  <span className="leading-relaxed">
                    Acesso <strong>exclusivo</strong> à área do aluno
                  </span>
                </p>

                <ul className="mt-3 grid gap-2.5 lg:grid-cols-2">
                  {mainItems.map(({ label, Icon }) => (
                    <li
                      key={label}
                      className="flex items-start gap-2.5 rounded-2xl bg-background px-3.5 py-3"
                    >
                      <Icon
                        aria-hidden
                        className="mt-0.5 size-4 shrink-0 text-primary"
                      />
                      <span className="text-sm font-semibold leading-snug text-primary">
                        {label}
                      </span>
                    </li>
                  ))}
                </ul>
              </article>

              <article className="relative z-20 mt-6 rounded-4xl border-4 border-accent-soft bg-surface-soft p-5 shadow-md sm:p-6 lg:absolute lg:right-0 lg:top-10 lg:mt-0 lg:w-[42%] lg:p-6">
                {/* card decor */}
                <div
                  aria-hidden
                  className="absolute -left-3 -top-8 h-16 w-16 rounded-full bg-surface/15 blur-[2px]"
                />
                <div
                  aria-hidden
                  className="absolute right-4 top-4 h-10 w-10 rotate-12 rounded-2xl border border-secondary/10"
                />
                <Image
                  alt=""
                  aria-hidden
                  src="/assets/brand/graphics/estrela-branca.svg"
                  width={80}
                  height={80}
                  className="absolute right-5 bottom-5 hidden w-5 opacity-25 sm:block"
                />

                <p className="inline-flex rounded-full bg-secondary px-4 py-1 text-xs font-bold uppercase tracking-wide text-surface">
                  {PRODUCT_BUNDLE.bonusPack.eyebrow}
                </p>

                <h3 className="mt-3 whitespace-nowrap text-2xl text-secondary! sm:text-3xl">
                  Planner + recomendações
                </h3>

                <ul className="mt-4 space-y-2.5">
                  {includeItems.map(({ label, title, description, Icon }) => (
                    <li
                      key={title}
                      className="rounded-2xl bg-surface px-3.5 py-3"
                    >
                      <div className="flex items-start gap-3">
                        <span className="mt-0.5 inline-flex size-7 shrink-0 items-center justify-center rounded-full bg-surface-soft text-secondary">
                          <Icon aria-hidden className="size-4" />
                        </span>
                        <div className="space-y-0.5">
                          <p className="text-xs font-bold uppercase tracking-wide text-accent">
                            {label}
                          </p>
                          <p className="text-sm font-semibold leading-snug text-primary">
                            {title}
                          </p>
                          <p className="text-xs leading-snug text-secondary">
                            {description}
                          </p>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>
          </div>
        </div>
      </Container>
    </Section>
  );
}
