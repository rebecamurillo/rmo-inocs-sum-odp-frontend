import React from "react";

export interface ItemCardProps {
  title: React.ReactNode;
  subtitle?: React.ReactNode; // e.g. "17% Used"
  icon?: React.ReactNode; // prefer an inline SVG React node
  info1?: string | number; // e.g. "245 files"
  info2?: string; // e.g. "26.40 GB"
  onClick?: () => void;
  className?: string;
}

export function ItemCard({
  title,
  subtitle,
  icon,
  info1,
  info2,
  onClick,
  className = "border-gray-200 bg-white",
}: ItemCardProps) {
  return (
    <div
      role={onClick ? "button" : undefined}
      onClick={onClick}
      className={`flex items-center justify-between gap-4 rounded-lg border p-3 hover:shadow-sm ${className}`}
    >
      {/* left: icon */}
      {icon && (
        <div className="flex-shrink-0">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-50">
            {icon}
          </div>
        </div>
      )}
      {/* center: title + subtitle + optional progress */}
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <p className="font-bold">{title}</p>
        </div>
        <div className="flex items-center gap-3">
          <small className="font-bold">{subtitle}</small>
        </div>
      </div>

      {/* right: info1 and info2 */}
      <div className="ml-4 flex-shrink-0 text-right">
        {info1 ? (
          <div>
            <small>{info1}</small>
          </div>
        ) : null}
        {info2 ? (
          <div>
            <small>{info2}</small>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default ItemCard;
