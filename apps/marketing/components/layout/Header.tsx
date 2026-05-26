"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

import { SITE_NAVIGATION } from "@/data/navigation";

import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/ui/Logo";
import { ButtonLink } from "@/components/ui/Button";

export function Header() {
  const [isVisibleOnMobile, setIsVisibleOnMobile] = useState(true);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const MOBILE_BREAKPOINT = 768;
    const TOP_SHOW_OFFSET = 8;
    const SCROLL_DELTA_THRESHOLD = 4;

    function handleScroll() {
      const currentScrollY = window.scrollY;
      const isDesktop = window.innerWidth >= MOBILE_BREAKPOINT;

      if (isDesktop || currentScrollY <= TOP_SHOW_OFFSET) {
        setIsVisibleOnMobile(true);
        lastScrollY.current = currentScrollY;
        return;
      }

      const delta = currentScrollY - lastScrollY.current;

      if (delta > SCROLL_DELTA_THRESHOLD) {
        setIsVisibleOnMobile(false);
      } else if (delta < -SCROLL_DELTA_THRESHOLD) {
        setIsVisibleOnMobile(true);
      }

      lastScrollY.current = currentScrollY;
    }

    function handleResize() {
      if (window.innerWidth >= MOBILE_BREAKPOINT) {
        setIsVisibleOnMobile(true);
      }
    }

    lastScrollY.current = window.scrollY;
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 border-b border-border-soft/70 bg-surface/95 backdrop-blur-sm transition-transform duration-300 ${
        isVisibleOnMobile ? "translate-y-0" : "-translate-y-full md:translate-y-0"
      }`}
    >
      <Container className="flex items-center justify-between gap-3 py-2.5 sm:gap-6 sm:py-3">
        <Link href="/#top" aria-label="Voltar ao início">
          <Logo className="w-24 py-2 sm:w-30 sm:py-3" variant="purpleDark" />
        </Link>
        <ButtonLink className="md:hidden" href="/#captura" size="sm" variant="primary">
          Quero ser avisado
        </ButtonLink>
        <nav aria-label="Navegação principal" className="hidden md:block">
          <ul className="flex items-center gap-2">
            {SITE_NAVIGATION.map((item) => (
              <li key={item.href}>
                <Link
                  className="rounded-full px-4 py-2 text-sm font-medium text-primary transition-colors hover:bg-surface-soft"
                  href={item.href}
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <ButtonLink href="/#captura" size="sm" variant="primary">
                Quero ser avisado
              </ButtonLink>
            </li>
          </ul>
        </nav>
      </Container>
    </header>
  );
}
