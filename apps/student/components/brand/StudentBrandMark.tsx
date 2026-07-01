"use client";

import Image from "next/image";

import { useTheme } from "@/lib/theme/use-theme";

type StudentBrandMarkProps = {
  variant?: "symbol" | "horizontal";
  tone?: "theme" | "light";
  className?: string;
};

export function StudentBrandMark({ variant = "symbol", tone = "theme", className }: StudentBrandMarkProps) {
  const { theme } = useTheme();
  const useLightMark = tone === "light" || theme === "dark";

  const src =
    variant === "horizontal"
      ? useLightMark
        ?"/assets/brand/logos/LOGO-HORIZONTAL-BRANCA.svg"
        : "/assets/brand/logos/LOGO-HORIZONTAL-ROXO-ESCURO.svg"
      : useLightMark
        ?"/assets/brand/logos/SIMBOLO-BRANCO.svg"
        : "/assets/brand/logos/SIMBOLO-ROXO-ESCURO.svg";

  const width = variant === "horizontal" ?164 : 28;
  const height = variant === "horizontal" ?36 : 28;
  const alt = variant === "horizontal" ?"Michela Ensina" : "Símbolo Michela Ensina";

  return <Image src={src} alt={alt} width={width} height={height} className={className} priority />;
}
