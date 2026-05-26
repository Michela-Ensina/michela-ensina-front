import Image from "next/image";

import { ABOUT_MICHELA_COPY } from "@/data/landing";

import { Reveal } from "@/components/motion/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import Grainient from "@/components/motion/Grainient";

export function AboutMichelaSection() {
  return (
    <Section
      className="relative overflow-hidden pb-2 pt-10 sm:pb-4 sm:pt-12"
      id="sobre"
      tone="accent"
    >
      <div className="absolute inset-0 opacity-15">
        <Grainient
          color1="#dbb5ee"
          color2="#7e4ca5"
          color3="#e4cef4"
          timeSpeed={0.35}
          colorBalance={0}
          warpStrength={1}
          warpFrequency={5}
          warpSpeed={2}
          warpAmplitude={50}
          blendAngle={0}
          blendSoftness={0.05}
          rotationAmount={500}
          noiseScale={2}
          grainAmount={0.1}
          grainScale={2}
          grainAnimated={false}
          contrast={1.5}
          gamma={1}
          saturation={1}
          centerX={0}
          centerY={0}
          zoom={0.9}
        />
      </div>
      <Container className="relative max-w-6xl">
        {/* Background SVG details */}
        <svg
          aria-hidden
          className="pointer-events-none absolute -left-24 top-10 hidden size-72 text-accent opacity-[0.055] lg:block"
          fill="none"
          viewBox="0 0 300 300"
        >
          <path
            d="M48 24C22 72 21 126 47 170C76 220 129 242 181 226"
            stroke="currentColor"
            strokeLinecap="round"
            strokeWidth="2"
          />
          <path
            d="M92 3C61 54 58 106 84 147C110 188 156 205 202 190"
            stroke="currentColor"
            strokeLinecap="round"
            strokeWidth="2"
          />
          <path
            d="M20 92C53 84 86 96 107 123C129 151 133 186 119 218"
            stroke="currentColor"
            strokeLinecap="round"
            strokeWidth="2"
          />
          <circle cx="216" cy="58" r="5" fill="currentColor" />
          <circle cx="244" cy="120" r="3.5" fill="currentColor" />
        </svg>

        <svg
          aria-hidden
          className="pointer-events-none absolute -right-24 top-0 hidden size-80 text-secondary opacity-[0.045] lg:block"
          fill="none"
          viewBox="0 0 320 320"
        >
          <path
            d="M24 192C64 116 128 66 207 49C254 39 298 44 338 62"
            stroke="currentColor"
            strokeLinecap="round"
            strokeWidth="2"
          />
          <path
            d="M64 222C99 157 154 115 221 101C262 92 300 97 336 113"
            stroke="currentColor"
            strokeLinecap="round"
            strokeWidth="2"
          />
          <path
            d="M112 250C142 200 185 167 237 157C271 150 303 154 333 166"
            stroke="currentColor"
            strokeLinecap="round"
            strokeWidth="2"
          />
          <circle cx="94" cy="62" r="5" fill="currentColor" />
          <circle cx="136" cy="34" r="3" fill="currentColor" />
        </svg>

        <svg
          aria-hidden
          className="pointer-events-none absolute -bottom-18 left-8 hidden size-56 text-secondary opacity-[0.04] lg:block"
          fill="none"
          viewBox="0 0 240 240"
        >
          <path
            d="M31 194C61 136 109 98 168 86C201 79 232 83 260 96"
            stroke="currentColor"
            strokeLinecap="round"
            strokeWidth="2"
          />
          <path
            d="M58 214C84 167 124 136 174 126C203 120 230 124 255 134"
            stroke="currentColor"
            strokeLinecap="round"
            strokeWidth="2"
          />
          <circle cx="70" cy="58" r="4" fill="currentColor" />
          <circle cx="102" cy="42" r="2.5" fill="currentColor" />
        </svg>

        <svg
          aria-hidden
          className="pointer-events-none absolute -bottom-20 -right-16 hidden size-64 text-accent opacity-[0.045] lg:block"
          fill="none"
          viewBox="0 0 260 260"
        >
          <path
            d="M212 138C187 187 130 206 82 181C34 156 15 99 40 51"
            stroke="currentColor"
            strokeLinecap="round"
            strokeWidth="2"
          />
          <path
            d="M184 128C166 160 128 173 96 156C64 139 51 101 68 69"
            stroke="currentColor"
            strokeLinecap="round"
            strokeWidth="2"
          />
          <circle cx="214" cy="58" r="4" fill="currentColor" />
          <circle cx="232" cy="94" r="2.5" fill="currentColor" />
        </svg>

        <span
          aria-hidden
          className="pointer-events-none absolute -left-12 bottom-8 hidden size-56 rounded-full bg-accent-soft/10 blur-3xl lg:block"
        />
        <span
          aria-hidden
          className="pointer-events-none absolute right-10 top-16 hidden size-48 rounded-full bg-surface-soft/20 blur-3xl lg:block"
        />

        <Image
          alt=""
          aria-hidden
          className="pointer-events-none absolute -left-20 -top-4 hidden w-140 opacity-88 lg:block"
          height={1162}
          src="/assets/brand/illustrations/michela-01.png"
          width={1304}
        />
        <Image
          alt=""
          aria-hidden
          className="pointer-events-none absolute -right-10 top-2 hidden w-20 opacity-20 sm:block"
          height={120}
          src="/assets/brand/graphics/estrela.svg"
          width={120}
        />
        <Image
          alt=""
          aria-hidden
          className="pointer-events-none absolute right-32 top-34 hidden w-10 opacity-28 md:block"
          height={120}
          src="/assets/brand/graphics/estrela-lilas.svg"
          width={120}
        />
        <Image
          alt=""
          aria-hidden
          className="pointer-events-none absolute -left-8 bottom-6 hidden w-18 rotate-50 opacity-15 md:block"
          height={97}
          src="/assets/brand/graphics/emoji.svg"
          width={178}
        />
        <Image
          alt=""
          aria-hidden
          className="pointer-events-none absolute right-20 bottom-6 hidden w-16 opacity-14 lg:block"
          height={102}
          src="/assets/brand/graphics/balao-fala.svg"
          width={134}
        />

        <Reveal delay={0.08} variant="fade-up">
          <article className="relative z-10 mx-auto max-w-158 space-y-6 rounded-3xl border border-border-soft/70 bg-surface/95 p-6 shadow-md backdrop-blur-sm sm:p-8 lg:ml-auto lg:mr-0">
            <div className="sm:hidden">
              <Image
                alt="Ilustração da Michela"
                className="mx-auto w-30 -mb-4"
                height={720}
                src="/assets/brand/illustrations/michela-02.png"
                width={600}
              />
            </div>
            <h2 className="flex items-center justify-center lg:justify-start text-3xl text-primary sm:text-5xl">
              Sobre mim
            </h2>
            <p className="max-w-xl text-base leading-relaxed text-secondary sm:text-lg">
              Olá! Eu sou a Michela, professora de francês e apaixonada por
              idiomas.
            </p>
            <p className="max-w-xl pb-1 text-base leading-relaxed text-secondary sm:text-lg">
              Depois de anos estudando francês e de um intercâmbio universitário
              na França, comecei a ensinar o idioma de maneira mais leve,
              prática e próxima da vida real. Hoje, além das aulas particulares,
              também crio materiais para ajudar estudantes a aprender idiomas
              com mais clareza, organização e constância.
            </p>
            <p className="max-w-xl rounded-md border-l-4 border-l-accent bg-accent-soft/30 px-4 py-2 text-base italic leading-relaxed text-secondary sm:text-lg">
              “{ABOUT_MICHELA_COPY.quote}”
            </p>
            <div className="flex justify-start pt-2">
              <ButtonLink
                className="w-full justify-center sm:w-auto"
                href="/sobre"
                size="lg"
                variant="outline"
              >
                Conheça a Michela
              </ButtonLink>
            </div>
          </article>
        </Reveal>
      </Container>
    </Section>
  );
}
