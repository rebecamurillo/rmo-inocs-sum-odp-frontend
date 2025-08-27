import React from "react";

export interface StatsItem {
  id?: string | number;
  name: React.ReactNode;
  value: React.ReactNode;
}

export interface StatsSectionProps {
  titleHighlight?: React.ReactNode;
  title?: React.ReactNode;
  subtitle?: React.ReactNode;
  stats?: StatsItem[];
  className?: string;
}

const defaultStats: StatsItem[] = [];

export function StatsSection({
  titleHighlight = "SEAMLESS",
  title = "Shared Urban Mobility",
  subtitle = "Lorem ipsum dolor sit amet consect adipisicing possimus.",
  stats = defaultStats,
  className = "",
}: StatsSectionProps) {
  return (
    <div className={`pt-0 ${className}`}>
      <div className="mx-auto max-w-7xl px-3 xl:px-8">
        <div className="mx-auto max-w-2xl lg:max-w-none flex flex-col gap-4">
          <div className="text-center md:mx-10 flex flex-col gap-4">
            <h2>
              <span className="text-secondary">{titleHighlight}</span> {title}
            </h2>
            {subtitle && (
              <p className="mt-4 text-lg/8 text-gray-600">{subtitle}</p>
            )}
          </div>

          <dl className="grid grid-cols-1 gap-0.5 overflow-hidden rounded-2xl text-center sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat, idx) => (
              <div
                key={stat.id ?? idx}
                className="flex flex-col bg-light p-8"
                role="region"
                aria-labelledby={`stat-${stat.id ?? idx}-name`}
              >
                <dt
                  id={`stat-${stat.id ?? idx}-name`}
                  className="text-sm/6 font-semibold text-gray-600"
                >
                  {stat.name}
                </dt>
                <dd className="order-first text-3xl font-semibold tracking-tight text-gray-900">
                  {stat.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
}
