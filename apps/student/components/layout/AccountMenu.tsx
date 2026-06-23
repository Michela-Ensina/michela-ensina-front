"use client";

import Link from "next/link";
import { LogOut, Settings, SunMoon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { ThemeToggleButton } from "@/components/ui/ThemeToggleButton";
import { useAuth } from "@/lib/auth/use-auth";
import { useTheme } from "@/lib/theme/use-theme";

function getInitials(name?: string | null) {
  if (!name) return "ME";

  const parts = name.trim().split(/\s+/).slice(0, 2);
  return parts.map((part) => part[0]?.toUpperCase()).join("") || "ME";
}

export function AccountMenu() {
  const { user, logout } = useAuth();
  const { theme, setTheme } = useTheme();
  const router = useRouter();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  async function handleLogout() {
    setIsLoggingOut(true);

    try {
      await logout();
      toast.info("Você saiu da sua conta.");
      router.replace("/login");
    } finally {
      setIsLoggingOut(false);
    }
  }

  return (
    <details className="group relative z-50">
      <summary
        className="student-action student-hover-surface student-menu-trigger flex min-h-11 list-none items-center gap-3 rounded-2xl border px-2.5 py-2 marker:hidden"
      >
        <span className="student-account-avatar grid size-8 place-items-center rounded-xl text-xs font-bold">
          {getInitials(user?.name)}
        </span>
        <span className="hidden min-w-0 text-left sm:block">
          <span className="block max-w-36 truncate text-sm font-semibold">{user?.name ?? "Aluno"}</span>
          <span className="student-muted-text block max-w-36 truncate text-xs">
            {user?.email ?? "Área do aluno"}
          </span>
        </span>
      </summary>

      <div className="student-menu-surface absolute right-0 top-[calc(100%+10px)] z-50 w-72 rounded-2xl border p-2 shadow-[var(--shadow-md)]">
        <div className="px-3 py-2">
          <p className="text-sm font-semibold">{user?.name ?? "Aluno"}</p>
          <p className="student-muted-text mt-0.5 truncate text-xs">
            {user?.email ?? "Modo Fluente"}
          </p>
        </div>

        <div className="student-menu-divider my-1 h-px" />

        <Link
          href="/configuracoes"
          className="student-action student-hover-surface flex min-h-10 items-center gap-2 rounded-xl px-3 text-sm font-semibold text-[var(--color-text)]"
        >
          <Settings size={16} aria-hidden="true" />
          Configurações
        </Link>

        <div className="flex items-center justify-between gap-3 rounded-xl px-3 py-2">
          <span className="flex items-center gap-2 text-sm font-semibold">
            <SunMoon size={16} aria-hidden="true" />
            Tema
          </span>
          <ThemeToggleButton theme={theme} mode="icon" onToggle={() => setTheme(theme === "dark" ? "light" : "dark")} />
        </div>

        <Button
          type="button"
          onClick={() => void handleLogout()}
          disabled={isLoggingOut}
          variant="danger"
          fullWidth
          className="mt-1 justify-start gap-2"
        >
          <LogOut size={16} aria-hidden="true" />
          {isLoggingOut ? "Saindo..." : "Sair da conta"}
        </Button>
      </div>
    </details>
  );
}
