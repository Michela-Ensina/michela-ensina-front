import Link from "next/link";
import Image from "next/image";

import { Copyright, Mail } from "lucide-react";
import { SITE_NAVIGATION, SITE_SOCIAL_LINKS } from "@/data/navigation";
import {
  SiInstagram,
  SiLinktree,
  SiTiktok,
  SiWhatsapp,
  SiYoutube,
} from "react-icons/si";

import { Reveal } from "@/components/motion/Reveal";
import { Container } from "@/components/ui/Container";

const socialIcons = {
  instagram: SiInstagram,
  tiktok: SiTiktok,
  youtube: SiYoutube,
  whatsapp: SiWhatsapp,
  linktree: SiLinktree,
} as const;

export function Footer() {
  return (
    <footer className="border-t border-border-soft bg-surface py-12 text-primary">
      <Container className="space-y-8">
        <Reveal variant="fade-up">
          <div className="grid gap-8 border-b border-border-soft pb-8 lg:grid-cols-[0.65fr_1.35fr] lg:items-center">
            <div className="flex justify-center lg:justify-start">
              <div className="space-y-3">
                <Image
                  alt="Logo Michela Ensina vertical"
                  className="w-20 opacity-85 sm:w-24"
                  height={193}
                  src="/assets/brand/logos/logo-simbolo-purple-dark.svg"
                  width={193}
                />
                <p className="max-w-md text-sm text-text-muted">
                  Pré-lançamento do Modo Fluente, guia prático para aprender
                  idiomas com mais direção, constância e clareza.
                </p>
              </div>
            </div>

            <div className="space-y-5 text-center lg:justify-self-end lg:text-left">
              <a
                className="inline-flex items-center gap-2 text-base font-bold text-primary hover:text-secondary"
                href="mailto:contato@michelaensina.com.br"
              >
                <Mail aria-hidden className="size-5 mt-0.5" />
                <span>contato@michelaensina.com.br</span>
              </a>

              <div className="flex flex-wrap items-center justify-center gap-3 lg:justify-start">
                {SITE_SOCIAL_LINKS.map((item) => {
                  const Icon = socialIcons[item.icon];

                  return (
                    <a
                      key={item.label}
                      aria-label={item.label}
                      className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border-soft bg-background text-primary transition-colors hover:border-accent-soft hover:bg-surface-soft hover:text-secondary"
                      href={item.href}
                      rel="noreferrer"
                      target="_blank"
                    >
                      <Icon className="size-4" aria-hidden />
                    </a>
                  );
                })}
              </div>

              <div className="flex flex-wrap justify-center gap-x-4 gap-y-2 pt-1 lg:justify-start">
                {SITE_NAVIGATION.map((item) => (
                  <Link
                    key={item.href}
                    className="text-sm font-medium text-text-muted transition-colors hover:text-primary"
                    href={item.href}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.08} variant="fade">
          <p className="inline-flex items-center gap-1.5 pt-2 text-xs text-text-muted">
            <Copyright aria-hidden className="size-3.5" /> Michela Ensina -{" "}
            {new Date().getFullYear()}. Todos os direitos reservados.
          </p>
        </Reveal>
      </Container>
    </footer>
  );
}
