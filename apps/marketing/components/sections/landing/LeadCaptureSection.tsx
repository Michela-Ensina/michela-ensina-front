"use client";

import Image from "next/image";
import NumberFlow, { NumberFlowGroup } from "@number-flow/react";
import { CheckCircle2Icon, Loader2Icon } from "lucide-react";
import type { FormEvent } from "react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

import { LEAD_CAPTURE_COPY } from "@/data/landing";
import { submitWaitlist } from "@/lib/api/waitlist";
import { MODO_FLUENTE_HOTMART_URL, STUDENT_AREA_URL } from "@/lib/release";

import { Magnet } from "@/components/motion/Magnet";
import { Reveal } from "@/components/motion/Reveal";
import { Button, ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Input } from "@/components/ui/Input";
import { Section } from "@/components/ui/Section";

type SubmitState = "idle" | "loading" | "success" | "error";

const LAUNCH_DATE = new Date("2026-07-10T18:00:00-03:00");

type CountdownParts = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

type LeadCaptureSectionProps = {
  isReleased?: boolean;
};

function getCountdownParts(targetDate: Date): CountdownParts {
  const delta = targetDate.getTime() - Date.now();

  if (delta <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  }

  const totalSeconds = Math.floor(delta / 1000);

  return {
    days: Math.floor(totalSeconds / 86400),
    hours: Math.floor((totalSeconds % 86400) / 3600),
    minutes: Math.floor((totalSeconds % 3600) / 60),
    seconds: totalSeconds % 60,
  };
}

export function LeadCaptureSection({
  isReleased = false,
}: LeadCaptureSectionProps) {
  const [state, setState] = useState<SubmitState>("idle");
  const [countdown, setCountdown] = useState<CountdownParts>(() =>
    getCountdownParts(LAUNCH_DATE),
  );

  useEffect(() => {
    if (isReleased) {
      return;
    }

    const timerId = window.setInterval(() => {
      setCountdown(getCountdownParts(LAUNCH_DATE));
    }, 1000);

    return () => {
      window.clearInterval(timerId);
    };
  }, [isReleased]);

  useEffect(() => {
    if (state !== "success") {
      return;
    }

    const timerId = window.setTimeout(() => {
      setState("idle");
    }, 2600);

    return () => {
      window.clearTimeout(timerId);
    };
  }, [state]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(form);
    const name = String(formData.get("name") ?? "").trim();
    const email = String(formData.get("email") ?? "").trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email) {
      setState("error");
      toast.error("Informe seu e-mail para continuar.");
      return;
    }

    if (!emailRegex.test(email)) {
      setState("error");
      toast.error("Digite um e-mail válido.");
      return;
    }

    setState("loading");

    const result = await submitWaitlist({
      name,
      email,
    });

    if (!result.ok) {
      setState("error");

      if (result.kind === "duplicate") {
        toast.info(
          result.message ??
            "Esse e-mail já está na lista. Você será avisado no lançamento.",
        );
        return;
      }

      if (result.kind === "validation") {
        toast.error(result.message ?? "Confira os dados e tente novamente.");
        return;
      }

      if (result.kind === "connection") {
        toast.error(
          result.message ??
            "Não foi possível conectar ao servidor. Tente novamente em instantes.",
        );
        return;
      }

      toast.error(
        result.message ?? "Não foi possível concluir seu cadastro agora.",
      );
      return;
    }

    form.reset();
    setState("success");
    toast.success(
      "Pronto! Seu cadastro foi confirmado. Vamos te avisar no lançamento.",
    );
  }

  return (
    <Section
      className="relative overflow-hidden bg-background pb-14 pt-8 sm:pb-16 sm:pt-10 lg:pt-12"
      id="captura"
      tone="accent"
    >
      {/* section background only */}
      <span
        aria-hidden
        className="pointer-events-none absolute -left-16 top-10 hidden size-56 rounded-full bg-accent-soft/20 blur-3xl lg:block"
      />
      <span
        aria-hidden
        className="pointer-events-none absolute -right-20 bottom-8 hidden size-64 rounded-full bg-surface-soft/30 blur-3xl lg:block"
      />

      <Image
        alt=""
        aria-hidden
        className="pointer-events-none absolute -left-12 bottom-10 hidden w-36 opacity-10 lg:block"
        height={486}
        src="/assets/brand/graphics/elemento-01-lilas.svg"
        width={385}
      />
      <Image
        alt=""
        aria-hidden
        className="pointer-events-none absolute -right-14 top-8 hidden w-40 opacity-12 lg:block"
        height={486}
        src="/assets/brand/graphics/elementos-02.svg"
        width={385}
      />
      <Image
        alt=""
        aria-hidden
        className="pointer-events-none absolute left-10 top-20 hidden w-10 opacity-20 md:block"
        height={120}
        src="/assets/brand/graphics/estrela-lilas.svg"
        width={120}
      />
      <Image
        alt=""
        aria-hidden
        className="pointer-events-none absolute bottom-16 right-14 hidden w-12 opacity-16 md:block"
        height={120}
        src="/assets/brand/graphics/estrela-lilas.svg"
        width={120}
      />

      <svg
        aria-hidden
        className="pointer-events-none absolute -left-20 top-0 hidden size-64 text-accent opacity-5 lg:block"
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
        <circle cx="190" cy="56" r="5" fill="currentColor" />
        <circle cx="218" cy="112" r="3.5" fill="currentColor" />
      </svg>

      <svg
        aria-hidden
        className="pointer-events-none absolute -right-24 bottom-0 hidden size-72 text-secondary opacity-5 lg:block"
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
        <circle cx="86" cy="62" r="6" fill="currentColor" />
      </svg>

      <Container className="relative z-10 max-w-6xl">
        <Reveal variant="fade-scale">
          <div className="relative overflow-hidden rounded-[2.2rem] border-2 border-border-soft bg-surface px-4 py-8 text-text shadow-md sm:rounded-[3rem] sm:px-10 sm:py-14">
            <Image
              alt="Elemento decorativo"
              aria-hidden
              className="pointer-events-none absolute -left-8 top-6 w-28 opacity-10"
              height={486}
              src="/assets/brand/graphics/elemento-01.svg"
              width={385}
            />
            <Image
              alt="Elemento decorativo"
              aria-hidden
              className="pointer-events-none absolute right-8 top-8 w-16 opacity-12"
              height={120}
              src="/assets/brand/graphics/estrela.svg"
              width={120}
            />
            <Image
              alt="Elemento decorativo"
              aria-hidden
              className="pointer-events-none absolute -right-14 -bottom-16 w-40 opacity-8"
              height={486}
              src="/assets/brand/graphics/elementos-02.svg"
              width={385}
            />
            <div className="grid gap-8 sm:gap-10 lg:grid-cols-[1fr_0.95fr] lg:items-start">
              {isReleased ? (
                <>
                  <Reveal variant="fade-up">
                    <div className="space-y-6">
                      <p className="inline-flex rounded-full bg-accent-soft px-5 py-2 text-xs font-semibold uppercase tracking-wide text-secondary">
                        Modo Fluente
                      </p>
                      <h2 className="pb-1 text-3xl sm:pb-2 sm:text-5xl">
                        O guia já está disponível
                      </h2>
                      <p className="max-w-xl text-base leading-relaxed text-text sm:text-lg">
                        Acesse sua área de aluna ou compre o Modo Fluente para
                        começar a estudar com mais clareza, organização e
                        constância.
                      </p>
                    </div>
                  </Reveal>

                  <Reveal delay={0.1} variant="fade-scale">
                    <div className="rounded-3xl bg-background p-5 text-text sm:p-8">
                      <div className="grid gap-3">
                        <Magnet
                          className="w-full will-change-transform"
                          magnetStrength={26}
                          padding={36}
                        >
                          <ButtonLink
                            className="h-14 w-full justify-center rounded-2xl text-base sm:h-16"
                            href={STUDENT_AREA_URL}
                            rel="noopener noreferrer"
                            size="lg"
                            target="_blank"
                            variant="primary"
                          >
                            ÁREA DO ALUNO
                          </ButtonLink>
                        </Magnet>
                        <ButtonLink
                          className="h-14 w-full justify-center rounded-2xl text-base sm:h-16"
                          href={MODO_FLUENTE_HOTMART_URL}
                          rel="noopener noreferrer"
                          size="lg"
                          target="_blank"
                          variant="outline"
                        >
                          Comprar o Modo Fluente
                        </ButtonLink>
                      </div>
                    </div>
                  </Reveal>
                </>
              ) : (
                <>
              <Reveal variant="fade-up">
                <div className="space-y-6">
                  <p className="inline-flex rounded-full bg-accent-soft px-5 py-2 text-xs font-semibold uppercase tracking-wide text-secondary">
                    {LEAD_CAPTURE_COPY.eyebrow}
                  </p>
                  <h2 className="pb-1 text-3xl sm:pb-2 sm:text-5xl">
                    10 de julho às 18h
                  </h2>

                  <NumberFlowGroup>
                    <div className="mt-4 grid grid-cols-2 gap-2.5 sm:flex sm:flex-wrap sm:gap-3">
                      {[
                        { value: countdown.days, label: "Dias" },
                        { value: countdown.hours, label: "Horas" },
                        { value: countdown.minutes, label: "Min" },
                        { value: countdown.seconds, label: "Seg" },
                      ].map((item) => (
                        <div
                          key={item.label}
                          className="w-full rounded-2xl border border-border-soft bg-surface px-2 py-3 text-center shadow-sm sm:w-24 sm:px-3 sm:py-4"
                        >
                          <p className="text-2xl text-primary sm:text-3xl">
                            <NumberFlow
                              value={item.value}
                              format={{
                                minimumIntegerDigits: 2,
                                useGrouping: false,
                              }}
                              spinTiming={{ duration: 600, easing: "ease-out" }}
                              transformTiming={{
                                duration: 600,
                                easing: "ease-out",
                              }}
                              willChange
                            />
                          </p>
                          <p className="text-[11px] font-bold uppercase tracking-wide text-text-muted sm:text-xs">
                            {item.label}
                          </p>
                        </div>
                      ))}
                    </div>
                  </NumberFlowGroup>

                  <p className="text-sm leading-relaxed text-text sm:text-base">
                    Cadastre seu e-mail para receber o aviso assim que o Modo
                    Fluente estiver disponível.
                  </p>
                </div>
              </Reveal>

              <Reveal delay={0.1} variant="fade-scale">
                <form
                  className="rounded-3xl bg-background p-5 text-text sm:p-8"
                  onSubmit={handleSubmit}
                >
                  <div className="grid gap-4">
                    <div className="space-y-2">
                      <label
                        className="text-sm font-semibold text-primary"
                        htmlFor="lead-name"
                      >
                        Nome
                      </label>
                      <Input
                        autoComplete="name"
                        id="lead-name"
                        name="name"
                        placeholder="Como você se chama?"
                        required
                        type="text"
                      />
                    </div>

                    <div className="space-y-2">
                      <label
                        className="text-sm font-semibold text-primary"
                        htmlFor="lead-email"
                      >
                        E-mail
                      </label>
                      <Input
                        autoComplete="email"
                        id="lead-email"
                        name="email"
                        placeholder="Seu melhor e-mail"
                        required
                        type="email"
                      />
                    </div>

                    <Magnet
                      className="w-full will-change-transform"
                      magnetStrength={26}
                      padding={36}
                    >
                      <Button
                        className="h-14 w-full rounded-2xl text-base sm:h-16"
                        disabled={state === "loading"}
                        size="lg"
                        type="submit"
                        variant="primary"
                      >
                        {state === "loading" ? (
                          <span className="inline-flex items-center gap-2">
                            <Loader2Icon className="size-4 animate-spin" />
                            Enviando...
                          </span>
                        ) : state === "success" ? (
                          <span className="inline-flex items-center gap-2">
                            <CheckCircle2Icon className="size-4" />
                            Cadastro confirmado
                          </span>
                        ) : (
                          LEAD_CAPTURE_COPY.submitLabel
                        )}
                      </Button>
                    </Magnet>
                  </div>
                </form>
              </Reveal>
                </>
              )}
            </div>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
