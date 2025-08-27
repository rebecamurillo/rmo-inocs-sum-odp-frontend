import React from "react";

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
  iconSrc?: string; // overrides icon path
  size?: "sm" | "md" | "lg"; // controls padding/text/icon size
  className?: string;
  color?: "primary-light" | "secondary" | "accent" | "dark" | "light";
}

const DEFAULT_ICONS: Record<string, string> = {
  bus: '/icons/bus.svg',
  bike: '/icons/cycling.svg',
  car: '/icons/car.svg',
  "e-car": '/icons/e-car.svg',
  "e-bus": '/icons/e-bus.svg',
  metro: '/icons/metro.svg',
  scooter: '/icons/scooter.svg',
};

const COLOR_CLASSES: Record<
  NonNullable<TransportBadgeProps["color"]>,
  string
> = {
  "primary-light": "bg-primary-light text-primary border-primary",
  secondary: "bg-secondary text-primary border-primary",
  accent: "bg-accent text-primary border-primary",
  dark: "bg-dark text-primary border-primary",
  light: "bg-light text-primary border-primary",
};

function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function TransportBadge({
  type = "bus",
  title,
  iconSrc,
  size = "md",
  className = "text-main border border-primary",
  color = "secondary",
}: TransportBadgeProps) {
  const resolvedIcon = iconSrc ?? DEFAULT_ICONS[type] ?? DEFAULT_ICONS["bus"];
  const resolvedTitle = title ?? capitalize(String(type));

  const sizes: Record<string, string> = {
    sm: "px-2 py-0.5 text-xs",
    md: "px-3 py-1 text-sm",
    lg: "px-4 py-1.5 text-base",
  };

  const iconSizes: Record<string, string> = {
    sm: "h-3 w-3",
    md: "h-6 w-6",
    lg: "h-8 w-8",
    xl: "h-10 w-10",
  };

    const colorClass = COLOR_CLASSES[color] ?? COLOR_CLASSES.secondary;

  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full font-medium ${colorClass} ${sizes[size]} ${className}`}
      role="img"
      aria-label={`${resolvedTitle} transport badge`}
    >
      <img
        src={resolvedIcon}
        alt={`${String(type)} icon`}
        className={iconSizes[size]}
        aria-hidden="true"
      />
      <span>{resolvedTitle}</span>
    </span>
  );
}
