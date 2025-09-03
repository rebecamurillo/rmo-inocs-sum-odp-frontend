import React from "react";

export type BadgeColor =
  | "primary"
  | "primary-light"
  | "secondary"
  | "accent"
  | "dark"
  | "light"
  | "transparent";
export type BadgeSize = "sm" | "md" | "lg";

export interface BadgeProps {
  icon?: React.ReactNode;
  children?: React.ReactNode;
  size?: BadgeSize;
  color?: BadgeColor;
  className?: string;
  role?: string;
  "aria-label"?: string;
}

const COLOR_CLASSES: Record<BadgeColor, string> = {
  primary: "bg-primary text-primary-light border-primary-ligh",
  "primary-light": "bg-primary-light text-primary border-primary",
  secondary: "bg-secondary text-primary border-primary",
  accent: "bg-warning text-primary border-primary",
  dark: "bg-dark text-primary border-primary",
  light: "bg-light text-primary border-primary",
  transparent: "bg-transparent text-primary border-transparent",
};

const SIZE_CLASSES: Record<BadgeSize, string> = {
  sm: "px-2 py-0.5 text-xs",
  md: "px-3 py-1 text-sm",
  lg: "px-4 py-1.5 text-base",
};

const ICON_WRAPPER: Record<BadgeSize, string> = {
  sm: "h-3 w-3",
  md: "h-5 w-5",
  lg: "h-7 w-7",
};

export function Badge({
  icon,
  children,
  size = "md",
  color = "secondary",
  className = "",
  role,
  "aria-label": ariaLabel,
}: BadgeProps) {
  const colorClass = COLOR_CLASSES[color] ?? COLOR_CLASSES.secondary;
  const sizeClass = SIZE_CLASSES[size] ?? SIZE_CLASSES.md;
  const iconClass = ICON_WRAPPER[size] ?? ICON_WRAPPER.md;

  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full font-medium ${colorClass} ${sizeClass} ${className}`}
      role={role}
      aria-label={ariaLabel}
    >
      {icon ? (
        // wrap icon so consumers can pass raw <svg/> or <img/>
        <span className={iconClass} aria-hidden="true">
          {icon}
        </span>
      ) : null}
      <span>{children}</span>
    </span>
  );
}

