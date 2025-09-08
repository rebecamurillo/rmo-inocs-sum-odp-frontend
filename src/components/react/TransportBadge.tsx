import React from "react";
import { Badge } from "./ui/Badge";
import { getUrl } from "../../lib/helpers";

export type TransportType =
  | "bus"
  | "bike"
  | "car"
  | "e-car"
  | "e-bus"
  | "metro"
  | "scooter";

export interface TransportBadgeProps {
  type?: TransportType; // selects the badge (default "bus")
  title?: React.ReactNode; // fallback to capitalized type
  icon?: React.ReactNode; // react node icon (preferred)
  iconSrc?: string; // string path fallback
  size?: "sm" | "md" | "lg"; // controls padding/text/icon size
  className?: string;
  color?:
    | "primary-light"
    | "secondary"
    | "warning"
    | "dark"
    | "light"
    | "transparent";
}

const DEFAULT_ICONS: Record<string, string> = {
  bus: "/icons/bus.svg",
  bike: "/icons/cycling.svg",
  car: "/icons/car.svg",
  "car-sharing": "/icons/car.svg",
  "e-car": "/icons/e-car.svg",
  "e-bus": "/icons/e-bus.svg",
  metro: "/icons/metro.svg",
  scooter: "/icons/scooter.svg",
};

function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function TransportBadge({
  type = "bus",
  title,
  icon,
  iconSrc,
  size = "md",
  className = "",
  color = "secondary",
}: TransportBadgeProps) {
  const resolvedTitle = title ?? capitalize(String(type));

  // prefer React node icon; fall back to iconSrc prop; finally fallback to DEFAULT_ICONS[type]
  const iconNode =
    icon ??
    (iconSrc ? (
      <img
        src={iconSrc}
        alt={`${String(type)} icon`}
        className="h-full w-full"
      />
    ) : DEFAULT_ICONS[type] ? (
      <img
        src={getUrl(DEFAULT_ICONS[type])}
        alt={`${String(type)} icon`}
        className="h-full w-full"
      />
    ) : null);

  return (
    <Badge
      icon={iconNode}
      size={size}
      color={color}
      className={className}
      aria-label={`${resolvedTitle} transport badge`}
    >
      {resolvedTitle}
    </Badge>
  );
}
