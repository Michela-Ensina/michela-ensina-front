"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/auth/use-auth";

type StudentTopbarProps = {
  title: string;
  subtitle?: string;
};

export function StudentTopbar({ title, subtitle }: StudentTopbarProps) {
  const { user, logout } = useAuth();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  async function handleLogout() {
    setIsLoggingOut(true);

    try {
      await logout();
    } finally {
      setIsLoggingOut(false);
    }
  }

  return (
    <header
      className="sticky top-0 z-20 mb-5 border-b px-1 py-3.5 backdrop-blur"
      style={{
        borderColor: "color-mix(in oklab, var(--color-border) 75%, transparent)",
        backgroundColor: "color-mix(in oklab, var(--color-background) 82%, transparent)",
      }}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl leading-tight">{title}</h1>
          {subtitle ? (
            <p className="mt-1 text-sm" style={{ color: "var(--color-text-muted)" }}>
              {subtitle}
            </p>
          ) : null}
        </div>

        <div className="flex items-center gap-2.5 sm:gap-3">
          {user ? (
            <div className="hidden text-right sm:block">
              <p className="text-sm font-semibold">{user.name}</p>
              <p className="text-xs" style={{ color: "var(--color-text-muted)" }}>
                {user.email}
              </p>
            </div>
          ) : null}

          <Button
            type="button"
            onClick={() => void handleLogout()}
            disabled={isLoggingOut}
            variant="outline"
            size="sm"
            style={{
              opacity: isLoggingOut ? 0.7 : 1,
            }}
          >
            {isLoggingOut ? "Saindo..." : "Sair"}
          </Button>
        </div>
      </div>
    </header>
  );
}
