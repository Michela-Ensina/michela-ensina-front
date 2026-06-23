import { Button } from "@/components/ui/button";
import { SurfaceCard } from "@/components/ui/SurfaceCard";

type LoadErrorCardProps = {
  message: string;
  onRetry: () => void;
  title?: string;
};

export function LoadErrorCard({
  message,
  onRetry,
  title = "Não foi possível carregar",
}: LoadErrorCardProps) {
  return (
    <SurfaceCard>
      <h2 className="text-2xl">{title}</h2>
      <p className="mt-2 text-sm text-[var(--color-text-muted)]">{message}</p>
      <Button type="button" onClick={onRetry} variant="outline" className="mt-4">
        Tentar novamente
      </Button>
    </SurfaceCard>
  );
}
