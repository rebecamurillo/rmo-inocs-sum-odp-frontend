import React from "react";

export type ButtonVariant = "link" | "primary" | "secondary";

export interface RButtonProps {
  variant?: ButtonVariant;
  text?: React.ReactNode;
  href?: string;
  onClick?: (e: React.MouseEvent) => void;
  className?: string;
  defaultArrow?: boolean;
}

export function RButton({
  variant = "link",
  text = "",
  href,
  onClick,
  className = "",
  defaultArrow = false,
}: RButtonProps) {
  const classNamePrimary =
    " rounded-md bg-secondary px-3.5 py-2.5 text-sm font-semibold text-primary shadow-xs hover:bg-primary-light focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary";
  const classNameLink =
    " text-sm/6 font-semibold text-gray-900";
  const classNameSecondary =
    " rounded-md border border-secondary px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-transparent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-secondary";

  const actionClassName =
    className +
    (variant === "primary"
      ? classNamePrimary
      : variant === "link"
      ? classNameLink
      : classNameSecondary);

  if (onClick) {
    return (
      <button type="button" onClick={onClick} className={actionClassName}>
        {text}
        {defaultArrow && <span aria-hidden="true">→</span>}
      </button>
    );
  }

  return (
    <a href={href} className={actionClassName}>
      {text}
      {defaultArrow && <span aria-hidden="true">→</span>}
    </a>
  );
}
