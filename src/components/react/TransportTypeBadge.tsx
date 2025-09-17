import React from "react";
import { Badge, type BadgeSize } from "./ui/Badge";
import { EnumTransportModeType } from "../../types";
import { desc, label } from "motion/react-client";

type TransportModeType = keyof typeof EnumTransportModeType;
export interface TransportTypeBadgeProps {
  type?: TransportModeType;
  size?: BadgeSize;
}

export function TransportTypeBadge({
  type = "PUBLIC_TRANSPORT",
  size = "sm",
}: TransportTypeBadgeProps) {
  const config = {
    [EnumTransportModeType.NSM]: {
      color: "success",
      shortLabel: "NSM",
      description: "New Mobility Service",
    },
    [EnumTransportModeType.PUBLIC_TRANSPORT]: {
      color: "primary-light",
      shortLabel: "PT",
      description: "Public Transport",
    },
    [EnumTransportModeType.PRIVATE]: {
      color: "warning",
      shortLabel: "Private",
      description: "Private Transport (eg. car, bike)",
    },
  };
  return (
    <Badge
      size={size}
      color={config[type].color}
      className=""
      aria-label={`${type} KPI badge`}
      // tooltip={config[type].description}
    >
      {config[type].shortLabel}
    </Badge>
  );
}
