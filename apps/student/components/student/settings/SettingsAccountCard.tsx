import { StatusBadge } from "@/components/ui/StatusBadge";
import { SurfaceCard } from "@/components/ui/SurfaceCard";
import type { User } from "@/types/student";

type SettingsAccountCardProps = {
  user: User | null;
};

export function SettingsAccountCard({ user }: SettingsAccountCardProps) {
  const userStatusLabel = user ? (user.is_active ? "Ativo" : "Inativo") : "Sem dados";

  return (
    <SurfaceCard>
      <div className="flex items-start gap-3">
        <div
          className="grid size-12 shrink-0 place-items-center rounded-2xl text-sm font-bold"
          style={{
            backgroundColor: "color-mix(in oklab, var(--color-primary) 18%, transparent)",
            color: "var(--color-text)",
          }}
        >
          {user?.name?.slice(0, 2).toUpperCase() ?? "ME"}
        </div>
        <div className="min-w-0">
          <p className="font-semibold">{user?.name ?? "Aluno"}</p>
          <p className="truncate text-sm" style={{ color: "var(--color-text-muted)" }}>
            {user?.email ?? "Área do aluno"}
          </p>
        </div>
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        <StatusBadge label={userStatusLabel} tone={user?.is_active ? "concluído" : "bloqueado"} />
        {user?.must_change_password ? (
          <StatusBadge label="Troca de senha obrigatória" tone="em-andamento" />
        ) : null}
      </div>
    </SurfaceCard>
  );
}
