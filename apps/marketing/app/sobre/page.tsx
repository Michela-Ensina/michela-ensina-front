import Image from "next/image";
import { BookOpen, Compass, MessageCircle, PlaneTakeoff } from "lucide-react";

import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { ABOUT_MICHELA_COPY } from "@/data/landing";

export default function SobrePage() {
  return (
    <div className="bg-background text-text">
      <Header />

      <main>
        <Section className="bg-surface pb-10 pt-12 sm:pt-16" tone="soft">
          {/* page-level brand background */}
          <span
            aria-hidden
            className="pointer-events-none absolute -left-24 top-10 hidden size-72 rounded-full bg-accent-soft/20 blur-3xl lg:block"
          />

          <span
            aria-hidden
            className="pointer-events-none absolute -right-28 bottom-10 hidden size-80 rounded-full bg-surface-soft/30 blur-3xl lg:block"
          />

          <Image
            alt=""
            aria-hidden
            className="pointer-events-none absolute -left-10 top-16 hidden w-36 rotate-z-80 opacity-22 lg:block"
            height={486}
            src="/assets/brand/graphics/elemento-01.svg"
            width={385}
          />

          <Image
            alt=""
            aria-hidden
            className="pointer-events-none absolute -right-12 top-14 hidden w-34 opacity-22 lg:block"
            height={486}
            src="/assets/brand/graphics/elementos-02.svg"
            width={385}
          />

          <Image
            alt=""
            aria-hidden
            className="pointer-events-none absolute left-[42%] top-12 hidden w-12 opacity-10 xl:block"
            height={120}
            src="/assets/brand/graphics/estrela.svg"
            width={120}
          />

          <Image
            alt=""
            aria-hidden
            className="pointer-events-none absolute left-14 bottom-14 hidden w-16 rotate-z-12 opacity-20 lg:block"
            height={125}
            src="/assets/brand/graphics/livro.svg"
            width={125}
          />

          <Image
            alt=""
            aria-hidden
            className="pointer-events-none absolute right-[34%] bottom-8 hidden w-12 opacity-18 xl:block"
            height={120}
            src="/assets/brand/graphics/estrela-lilas.svg"
            width={120}
          />

          <svg
            aria-hidden
            className="pointer-events-none absolute -left-20 top-1/2 hidden h-64 w-44 -translate-y-1/2 text-secondary opacity-[0.08] xl:block"
            fill="none"
            viewBox="0 0 190 280"
          >
            <path
              d="M138 22C98 58 74 100 70 144C66 185 80 220 108 248"
              stroke="currentColor"
              strokeLinecap="round"
              strokeWidth="2"
            />
            <path
              d="M164 54C128 86 108 123 105 161C102 196 115 226 140 250"
              stroke="currentColor"
              strokeLinecap="round"
              strokeWidth="2"
            />
            <path
              d="M104 72C74 102 56 136 55 171C54 202 66 229 90 252"
              stroke="currentColor"
              strokeLinecap="round"
              strokeWidth="2"
            />
            <circle cx="98" cy="34" r="4" fill="currentColor" />
            <circle cx="122" cy="18" r="2.5" fill="currentColor" />
          </svg>

          <svg
            aria-hidden
            className="pointer-events-none absolute -right-24 top-1/2 hidden h-64 w-48 -translate-y-1/2 text-accent opacity-[0.075] xl:block"
            fill="none"
            viewBox="0 0 210 280"
          >
            <path
              d="M24 178C56 123 104 88 162 79C198 74 230 81 258 98"
              stroke="currentColor"
              strokeLinecap="round"
              strokeWidth="2"
            />
            <path
              d="M56 214C82 170 122 143 170 136C200 132 228 138 252 153"
              stroke="currentColor"
              strokeLinecap="round"
              strokeWidth="2"
            />
            <path
              d="M82 240C103 208 134 188 172 183C196 180 218 185 238 197"
              stroke="currentColor"
              strokeLinecap="round"
              strokeWidth="2"
            />
            <circle cx="72" cy="72" r="4" fill="currentColor" />
          </svg>
          <Container className="relative">
            <Image
              alt=""
              aria-hidden
              className="pointer-events-none absolute -right-8 top-6 hidden w-16 opacity-20 sm:block"
              height={120}
              src="/assets/brand/graphics/estrela-lilas.svg"
              width={120}
            />
            <Image
              alt=""
              aria-hidden
              className="pointer-events-none absolute -left-14 -bottom-5 hidden w-30 opacity-20 lg:block"
              height={486}
              src="/assets/brand/graphics/elemento-01-lilas.svg"
              width={385}
            />
            <div className="grid gap-8 lg:grid-cols-[0.72fr_1.28fr] lg:items-stretch">
              <div className="order-2 mx-auto hidden w-full max-w-[18rem] rounded-3xl border-4 border-surface bg-surface p-2 shadow-md sm:max-w-xs lg:order-1 lg:block lg:max-w-sm lg:rounded-[2.5rem]">
                <Image
                  alt="Foto da Michela"
                  className="aspect-4/5 h-auto w-full rounded-3xl object-cover lg:aspect-auto"
                  height={1364}
                  src="/assets/foto-michela.webp"
                  width={1024}
                  quality={100}
                />
              </div>

              <article className="order-1 flex h-full flex-col gap-5 rounded-3xl border border-border-soft bg-background p-6 shadow-sm sm:p-8 lg:order-2">
                <Image //selo da id visual
                  alt="Selo de identidade visual"
                  aria-hidden
                  className="size-7 opacity-0"
                  height={54}
                  src="/assets/brand/logos/logo-simbolo-blue.svg"
                  width={54}
                />
                <h1 className="text-4xl text-secondary! sm:text-5xl">
                  Olá! Eu sou a Michela.
                </h1>
                <p className="text-lg leading-relaxed text-secondary sm:text-xl">
                  Sou professora de francês e completamente apaixonada pelo
                  mundo dos idiomas.
                </p>
                <p className="text-base leading-relaxed text-text sm:text-lg">
                  Sou formada em Jornalismo pela Universidade Católica
                  Portuguesa, em Portugal, e tive a oportunidade de fazer um ano
                  de intercâmbio no Institut Catholique de Toulouse, na França.
                </p>
                <p className="text-base leading-relaxed text-text sm:text-lg">
                  Hoje, além das aulas particulares, também crio materiais para
                  ajudar estudantes a aprender idiomas com mais clareza,
                  organização e constância.
                </p>
                <p className="border-l-4 border-l-accent rounded-md bg-accent-soft/30 px-4 py-3 text-base italic leading-relaxed text-secondary sm:text-lg">
                  “{ABOUT_MICHELA_COPY.quote}”
                </p>
              </article>
            </div>
          </Container>
        </Section>

        <Section className="relative overflow-hidden py-12" tone="accent">
          {/* journey background ornaments - stronger for lilac background */}
          <span
            aria-hidden
            className="pointer-events-none absolute -left-28 top-12 hidden size-72 rounded-full bg-secondary/10 blur-3xl lg:block"
          />

          <span
            aria-hidden
            className="pointer-events-none absolute -right-32 bottom-10 hidden size-80 rounded-full bg-accent/12 blur-3xl lg:block"
          />

          <Image
            alt=""
            aria-hidden
            className="pointer-events-none absolute rotate-80 -left-18 top-12 hidden w-32 opacity-12 lg:block"
            height={102}
            src="/assets/brand/graphics/balao-fala.svg"
            width={134}
          />

          <Image
            alt=""
            aria-hidden
            className="pointer-events-none absolute -right-10 top-24 hidden w-26 opacity-12 lg:block"
            height={120}
            src="/assets/brand/graphics/emoji.svg"
            width={120}
          />

          <Image
            alt=""
            aria-hidden
            className="pointer-events-none absolute left-15 bottom-13 hidden w-12 opacity-20 lg:block"
            height={120}
            src="/assets/brand/graphics/estrela.svg"
            width={120}
          />

          <Image
            alt=""
            aria-hidden
            className="pointer-events-none absolute right-14 bottom-10 hidden w-30 -rotate-z-12 opacity-18 lg:block"
            height={120}
            src="/assets/brand/graphics/check.svg"
            width={120}
          />

          <Image
            alt=""
            aria-hidden
            className="pointer-events-none absolute left-[28%] top-12 hidden w-10 opacity-16 xl:block"
            height={120}
            src="/assets/brand/graphics/estrela.svg"
            width={120}
          />

          <Image
            alt=""
            aria-hidden
            className="pointer-events-none absolute right-[40%] bottom-8 hidden w-16 rotate-z-12 opacity-26 xl:block"
            height={125}
            src="/assets/brand/graphics/livro.svg"
            width={125}
          />

          <Image
            alt=""
            aria-hidden
            className="pointer-events-none absolute -left-18 bottom-2 hidden w-42 rotate-z-80 opacity-18 xl:block"
            height={486}
            src="/assets/brand/graphics/elemento-01.svg"
            width={385}
          />

          <Image
            alt=""
            aria-hidden
            className="pointer-events-none absolute -right-20 top-1/2 hidden w-46 -translate-y-1/2 opacity-18 xl:block"
            height={486}
            src="/assets/brand/graphics/elementos-02.svg"
            width={385}
          />

          <svg
            aria-hidden
            className="pointer-events-none absolute -left-20 top-1/2 hidden h-72 w-48 -scale-x-100 -translate-y-1/2 text-secondary opacity-[0.05] xl:block"
            fill="none"
            viewBox="0 0 210 300"
          >
            <path
              d="M154 22C107 58 80 104 77 153C74 199 91 238 128 274"
              stroke="currentColor"
              strokeLinecap="round"
              strokeWidth="2"
            />
            <path
              d="M184 58C143 90 120 129 118 171C116 208 131 241 160 270"
              stroke="currentColor"
              strokeLinecap="round"
              strokeWidth="2"
            />
            <path
              d="M118 70C82 102 61 139 60 177C59 211 72 241 98 268"
              stroke="currentColor"
              strokeLinecap="round"
              strokeWidth="2"
            />
          </svg>

          <svg
            aria-hidden
            className="pointer-events-none absolute -right-24 top-1/2 hidden h-72 w-52 -translate-y-1/2 text-secondary opacity-[0.14] xl:block"
            fill="none"
            viewBox="0 0 230 310"
          >
            <path
              d="M26 198C61 139 113 103 176 94C215 89 250 97 281 116"
              stroke="currentColor"
              strokeLinecap="round"
              strokeWidth="2"
            />
            <path
              d="M58 236C87 190 131 162 184 155C217 151 247 157 274 174"
              stroke="currentColor"
              strokeLinecap="round"
              strokeWidth="2"
            />
            <circle cx="78" cy="82" r="4" fill="currentColor" />
            <circle cx="104" cy="64" r="2.5" fill="currentColor" />
          </svg>
          <Container className="max-w-5xl">
            <div className="space-y-8">
              <div className="space-y-3 text-center ">
                <h2 className="text-4xl sm:text-5xl pb-4">Como tudo começou</h2>
                <p className="mx-auto text-base leading-relaxed text-secondary sm:text-lg ">
                  Minha trajetória com idiomas não foi uma linha reta. Foi feita
                  de tentativas, ajustes e descobertas que me levaram a ensinar
                  de forma mais humana e prática.
                </p>
              </div>

              <div className="space-y-4">
                <article className="relative rounded-3xl bg-surface p-6 pt-8 shadow-sm sm:p-7 sm:pt-9">
                  <div className="absolute -left-4 -top-4 inline-flex h-10 w-10 items-center justify-center rounded-full border-4 border-background bg-accent-soft text-secondary shadow-sm">
                    <PlaneTakeoff aria-hidden className="size-5" />
                  </div>
                  <h3 className="text-2xl">A paixão pelo francês</h3>
                  <p className="mt-2 text-base leading-relaxed text-secondary">
                    Comecei a estudar o idioma no primeiro semestre da faculdade
                    e nunca mais parei. Recebi intercambistas francófonos, me
                    aproximei da cultura e, mais tarde, tive a experiência de
                    vivê-la de forma imersiva.
                  </p>
                </article>

                <article className="relative rounded-3xl bg-surface p-6 pt-8 shadow-sm sm:ml-8 sm:w-[92%] sm:p-7 sm:pt-9">
                  <div className="absolute -left-4 -top-4 inline-flex h-10 w-10 items-center justify-center rounded-full border-4 border-background bg-accent text-surface shadow-sm">
                    <Compass aria-hidden className="size-5" />
                  </div>
                  <h3 className="text-2xl">A virada no aprendizado</h3>
                  <p className="mt-2 text-base leading-relaxed text-secondary">
                    Essas vivências transformaram não só o meu francês, mas
                    também a forma como eu vejo o aprendizado de idiomas na
                    prática.
                  </p>
                </article>

                <article className="relative rounded-3xl bg-surface p-6 pt-8 shadow-sm sm:p-7 sm:pt-9">
                  <div className="absolute -left-4 -top-4 inline-flex h-10 w-10 items-center justify-center rounded-full border-4 border-background bg-secondary text-surface shadow-sm">
                    <MessageCircle aria-hidden className="size-5" />
                  </div>
                  <h3 className="text-2xl">O Michela Ensina hoje</h3>
                  <p className="mt-2 text-base leading-relaxed text-secondary">
                    Ensino francês de forma leve e descomplicada, com foco em
                    conversação e no uso do idioma no dia a dia. Além das aulas,
                    também crio materiais e produtos digitais pensados para
                    ajudar quem quer estudar idiomas com mais clareza.
                  </p>
                </article>

                <article className="relative rounded-3xl bg-surface p-6 pt-8 shadow-sm sm:ml-8 sm:w-[92%] sm:p-7 sm:pt-9">
                  <div className="absolute -left-4 -top-4 inline-flex h-10 w-10 items-center justify-center rounded-full border-4 border-background bg-primary text-surface shadow-sm">
                    <BookOpen aria-hidden className="size-5" />
                  </div>
                  <h3 className="text-2xl">Além da sala de aula</h3>
                  <p className="mt-2 text-base leading-relaxed text-secondary">
                    Fora dos idiomas, sou daquelas pessoas com mil hobbies:
                    livros, videogames, bordado e tudo o que desperta o meu
                    interesse. Meu objetivo é mostrar que aprender pode ser mais
                    simples, leve e divertido do que parece.
                  </p>
                </article>
              </div>
            </div>
          </Container>
        </Section>

        <Section className="relative overflow-hidden py-12" tone="soft">
          {/* final CTA background */}
          <Image
            alt=""
            aria-hidden
            className="pointer-events-none absolute left-10 top-8 hidden w-18 opacity-24 lg:block"
            height={120}
            src="/assets/brand/graphics/estrela.svg"
            width={120}
          />

          <Image
            alt=""
            aria-hidden
            className="pointer-events-none absolute right-10 bottom-8 hidden w-10 -rotate-z-12 opacity-20 lg:block"
            height={120}
            src="/assets/brand/graphics/lapis.svg"
            width={120}
          />

          <Image
            alt=""
            aria-hidden
            className="pointer-events-none absolute -left-8 bottom-8 hidden w-28 opacity-16 lg:block"
            height={486}
            src="/assets/brand/graphics/elemento-01.svg"
            width={385}
          />

          <Image
            alt=""
            aria-hidden
            className="pointer-events-none absolute -right-8 top-8 hidden w-28 opacity-16 lg:block"
            height={486}
            src="/assets/brand/graphics/elementos-02.svg"
            width={385}
          />

          <svg
            aria-hidden
            className="pointer-events-none absolute left-[12%] top-1/2 hidden h-44 w-32 -translate-y-1/2 text-secondary opacity-[0.075] xl:block"
            fill="none"
            viewBox="0 0 150 210"
          >
            <path
              d="M108 22C77 50 59 82 56 116C53 147 64 174 86 198"
              stroke="currentColor"
              strokeLinecap="round"
              strokeWidth="2"
            />
            <path
              d="M130 48C103 72 88 100 86 130C84 156 94 180 112 200"
              stroke="currentColor"
              strokeLinecap="round"
              strokeWidth="2"
            />
            <circle cx="82" cy="32" r="3.5" fill="currentColor" />
          </svg>
          <Container className="max-w-230">
            <div className="flex flex-col gap-1 rounded-3xl bg-secondary px-6 py-8 text-surface shadow-md sm:px-8 sm:py-10">
              <h2 className="mx-auto  pb-2 text-center text-3xl text-surface! sm:text-4xl">
                Quer aprender francês e outros idiomas?
              </h2>
              <p className="mx-auto mt-3 text-center text-base leading-relaxed text-surface/95">
                Volte para o Modo Fluente e receba o aviso de lançamento para
                começar sua jornada com direção.
              </p>
              <div className="mt-5 flex justify-center">
                <ButtonLink
                  className="border border-surface/70 bg-surface text-secondary! hover:bg-surface/92"
                  href="/#captura"
                  size="lg"
                  variant="outline"
                >
                  Quero receber o aviso
                </ButtonLink>
              </div>
            </div>
          </Container>
        </Section>
      </main>

      <Footer />
    </div>
  );
}
