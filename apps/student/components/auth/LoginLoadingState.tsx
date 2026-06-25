import Image from "next/image";

import { SurfaceCard } from "@/components/ui/SurfaceCard";

export function LoginLoadingState() {
  return (
    <main className="grid min-h-screen bg-[var(--color-background)] lg:h-dvh lg:min-h-0 lg:overflow-hidden lg:grid-cols-[minmax(0,1.08fr)_minmax(420px,0.92fr)]">
      <aside className="relative hidden overflow-hidden bg-[linear-gradient(145deg,var(--me-purple-dark)_0%,var(--me-purple)_48%,var(--me-lavender)_100%)] px-12 py-14 lg:flex lg:flex-col lg:items-center lg:justify-center">
        <Image
          src="/assets/brand/logos/SIMBOLO-BRANCO.svg"
          alt=""
          width={460}
          height={260}
          aria-hidden="true"
          className="pointer-events-none absolute -left-24 top-1/3 opacity-5"
        />
        <div className="relative z-10 flex w-full max-w-sm flex-col items-center text-center">
          <Image
            src="/assets/brand/logos/LOGO-HORIZONTAL-BRANCA.svg"
            alt="Michela Ensina"
            width={220}
            height={68}
            priority
          />
          <div className="mt-8 h-px w-36 bg-white/35" />
          <div className="mt-9 grid w-full gap-3">
            <div className="h-11 animate-pulse rounded-md bg-white/12" />
            <div className="h-11 animate-pulse rounded-md bg-white/10" />
            <div className="h-11 animate-pulse rounded-md bg-white/10" />
          </div>
        </div>
      </aside>

      <section className="flex min-h-screen flex-col px-5 py-6 lg:h-dvh lg:min-h-0">
        <div className="flex justify-end">
          <div className="size-10 animate-pulse rounded-full bg-[var(--color-surface-soft)]" />
        </div>
        <div className="mx-auto flex w-full max-w-md flex-1 flex-col justify-center py-8">
          <SurfaceCard
            className="w-full rounded-3xl p-6 shadow-(--shadow-brand) sm:p-8"
            style={{
              borderColor:
                "color-mix(in oklab, var(--color-border) 78%, var(--color-primary))",
              backgroundColor: "var(--color-surface)",
            }}
          >
            <div className="mx-auto h-10 w-28 animate-pulse rounded-lg bg-[var(--color-surface-soft)]" />
            <div className="mx-auto mt-3 h-4 w-60 animate-pulse rounded-full bg-[var(--color-surface-soft)]" />
            <div className="mt-7 space-y-5">
              <div className="space-y-2">
                <div className="h-4 w-16 animate-pulse rounded-full bg-[var(--color-surface-soft)]" />
                <div className="h-11 animate-pulse rounded-[12px] bg-[var(--color-surface-soft)]" />
              </div>
              <div className="space-y-2">
                <div className="h-4 w-14 animate-pulse rounded-full bg-[var(--color-surface-soft)]" />
                <div className="h-11 animate-pulse rounded-[12px] bg-[var(--color-surface-soft)]" />
              </div>
              <div
                className="h-11 animate-pulse rounded-[12px]"
                style={{
                  backgroundColor:
                    "color-mix(in oklab, var(--color-secondary) 70%, transparent)",
                }}
              />
            </div>
          </SurfaceCard>
          <p className="student-muted-text mt-6 text-center text-xs">
            Verificando sua sessão...
          </p>
        </div>
      </section>
    </main>
  );
}
