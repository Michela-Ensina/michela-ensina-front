import type { ComponentProps } from "react";

import { StatusBadge } from "@/components/ui/StatusBadge";

type BadgeProps = ComponentProps<typeof StatusBadge>;

export function Badge(props: BadgeProps) {
  return <StatusBadge {...props} />;
}
