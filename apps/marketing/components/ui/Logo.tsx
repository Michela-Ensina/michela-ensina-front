import Image from "next/image";

import { cn } from "@/lib/utils";

interface LogoProps {
  variant?: "blue" | "white" | "purpleDark";
  className?: string;
}

const logoSources = {
  blue: "/assets/brand/logos/logo-horizontal-blue.svg",
  white: "/assets/brand/logos/logo-horizontal-white.svg",
  purpleDark: "/assets/brand/logos/logo-horizontal-purple-dark.svg",
} as const;

export function Logo({ variant = "blue", className }: LogoProps) {
  return (
    <Image
      alt="Michela Ensina"
      className={cn("h-auto w-30 sm:w-35 py-3", className)}
      height={124}
      priority
      src={logoSources[variant]}
      width={409}
    />
  );
}
