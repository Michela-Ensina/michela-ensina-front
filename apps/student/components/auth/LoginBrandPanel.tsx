import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CheckCircle2, FileText, Settings } from "lucide-react";

import { STUDENT_BRAND_LINKS } from "@/constants/brand-links";

const loginHighlights = [
  {
    icon: FileText,
    label: "Materiais do curso",
    description: "Acesse os conteúdos liberados para seus estudos.",
  },
  {
    icon: CheckCircle2,
    label: "Progresso dos estudos",
    description: "Acompanhe o que já foi concluído.",
  },
  {
    icon: Settings,
    label: "Conta do aluno",
    description: "Gerencie seus dados, senha e preferências.",
  },
];

function LoginBrandDecor() {
  return (
    <>
      <Image
        src="/assets/brand/logos/SIMBOLO-BRANCO.svg"
        alt=""
        width={520}
        height={300}
        aria-hidden="true"
        className="pointer-events-none absolute -left-24 top-1/3 opacity-5"
      />
      <Image
        src="/assets/brand/graphics/elemento-01-lilas.svg"
        alt=""
        width={86}
        height={86}
        aria-hidden="true"
        className="pointer-events-none absolute right-10 top-12 rotate-12 opacity-45"
      />
      <Image
        src="/assets/brand/graphics/estrela-lilas.svg"
        alt=""
        width={44}
        height={44}
        aria-hidden="true"
        className="pointer-events-none absolute left-12 top-24 opacity-40"
      />
      <Image
        src="/assets/brand/graphics/elementos-02-lilas.svg"
        alt=""
        width={112}
        height={112}
        aria-hidden="true"
        className="pointer-events-none absolute bottom-16 right-8 opacity-35"
      />
    </>
  );
}

function LoginBrandDivider() {
  return (
    <div className="mt-8 flex items-center gap-3 text-white/65 lg:[@media_(max-height:760px)]:mt-6">
      <span className="h-px w-16 bg-current" />
      <Image
        src="/assets/brand/graphics/estrela-lilas.svg"
        alt=""
        width={22}
        height={22}
        aria-hidden="true"
        className="brightness-0 invert"
      />
      <span className="h-px w-16 bg-current" />
    </div>
  );
}

function LoginHighlightList() {
  return (
    <div className="mt-10 w-full max-w-sm rounded-2xl border border-white/14 bg-white/11 p-4 text-left shadow-[inset_0_1px_0_rgb(255_255_255_/_0.12)] lg:[@media_(max-height:760px)]:mt-7">
      <p className="text-sm font-semibold text-white">
        O que você encontra por aqui
      </p>

      <div className="mt-3 divide-y divide-white/12">
        {loginHighlights.map(({ icon: Icon, label, description }) => (
          <div key={label} className="flex gap-3 py-3 first:pt-0 last:pb-0">
            <span className="mt-0.5 grid size-8 shrink-0 place-items-center rounded-xl bg-white/12 text-white/88">
              <Icon size={17} aria-hidden="true" />
            </span>
            <span className="min-w-0">
              <span className="block text-sm font-semibold text-white">
                {label}
              </span>
              <span className="mt-0.5 block text-xs leading-5 text-white/72">
                {description}
              </span>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function PlannerCta() {
  return (
    <div className="mt-8 flex w-full max-w-sm items-center justify-between gap-4 rounded-2xl border border-white/16 bg-white/13 p-4 text-left shadow-[inset_0_1px_0_rgb(255_255_255_/_0.14)] lg:[@media_(max-height:760px)]:mt-5">
      <div className="min-w-0">
        <p className="text-sm font-semibold text-white">
          Ainda não possui acesso ao material?
        </p>
        <p className="mt-1 text-sm leading-5 text-white/78">
          Conheça o Modo Fluente e aprenda um novo idioma ainda hoje.
        </p>
      </div>
      <Link
        href={STUDENT_BRAND_LINKS.planner}
        target="_blank"
        rel="noreferrer"
        className="student-action inline-flex min-h-10 shrink-0 items-center gap-2 rounded-full bg-white px-4 text-sm font-bold text-[var(--me-purple-dark)] shadow-[0_6px_14px_rgb(77_35_117_/_0.18)]"
        style={{ color: "var(--me-purple-dark)" }}
      >
        Garanta o seu
        <ArrowRight size={15} aria-hidden="true" />
      </Link>
    </div>
  );
}

export function LoginBrandPanel() {
  return (
    <aside className="relative hidden min-h-screen overflow-hidden bg-[linear-gradient(145deg,var(--me-purple-dark)_0%,var(--me-purple)_48%,var(--me-lavender)_100%)] px-12 py-14 text-white lg:flex lg:h-dvh lg:min-h-0 lg:flex-col lg:items-center lg:justify-center lg:[@media_(max-height:760px)]:py-8">
      <LoginBrandDecor />

      <div className="relative z-10 flex w-full max-w-md flex-col items-center text-center">
        <Image
          src="/assets/brand/logos/LOGO-HORIZONTAL-BRANCA.svg"
          alt="Michela Ensina"
          width={244}
          height={76}
          priority
        />

        <LoginBrandDivider />

        <h1 className="mt-8 text-3xl leading-tight text-white! lg:[@media_(max-height:760px)]:mt-6">
          Bem-vindo à área do aluno
        </h1>
        <p className="mt-4 max-w-sm text-sm leading-6 text-white/75">
          Acesse sua conta e continue seus estudos.
        </p>

        <LoginHighlightList />
        <PlannerCta />
      </div>

      <p className="absolute bottom-8 left-0 right-0 text-center text-[11px] font-semibold uppercase tracking-[0.16em] text-white/55 lg:[@media_(max-height:760px)]:bottom-5">
        Portal do aluno
      </p>
    </aside>
  );
}
