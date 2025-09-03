import React from "react";
import { Badge, type BadgeSize } from "./ui/Badge";

export type KpiScopes = "GLOBAL" | "LOCAL";

export interface KpiScopeBadgeProps {
  type?: KpiScopes;
  size?: BadgeSize;
}

export function KpiTypeBadge({
  type = "GLOBAL",
  size = "sm",
}: KpiScopeBadgeProps) {
  return (
    <Badge
      size={size}
      color={type === "GLOBAL" ? "primary-light" : "secondary"}
      className={""}
      aria-label={`${type} KPI badge`}
    >
      {type}
    </Badge>
  );
}
