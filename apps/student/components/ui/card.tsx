import type { ComponentProps } from "react";

import { SurfaceCard } from "@/components/ui/SurfaceCard";

type CardProps = ComponentProps<typeof SurfaceCard>;

export function Card(props: CardProps) {
  return <SurfaceCard data-slot="card" {...props} />;
}
