export function formatMonthYear(dateStr?: string | null) {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  if (Number.isNaN(d.getTime())) return "";
  return d.toLocaleString(undefined, { month: "long", year: "numeric" });
}

export function getChangePercent(
  before?: number | null,
  after?: number | null,
  progressionTarget?: number | null
) {
  if (
    before === undefined ||
    before === null ||
    after === undefined ||
    after === null
  )
    return "";
  if (before === 0) return "";
  const diff = after - before;
  const percent = (diff / Math.abs(before)) * 100;
  let sign = "";
  if (progressionTarget === 1) {
    sign = percent > 0 ? "+" : percent < 0 ? "-" : "";
  } else if (progressionTarget === 0) {
    sign = percent < 0 ? "+" : percent > 0 ? "-" : "";
  }
  return `${sign}${Math.abs(percent).toFixed(2)}%`;
}

export function getChangeFlat(
  before?: number | null,
  after?: number | null,
  progressionTarget?: number | null
) {
  if (
    before === undefined ||
    before === null ||
    after === undefined ||
    after === null
  )
    return "";
  if (before === 0) return "";
  const diff = after - before;
  const flat = diff;
  let sign = "";
  if (progressionTarget === 1) {
    sign = flat > 0 ? "+" : flat < 0 ? "-" : "";
  } else if (progressionTarget === 0) {
    sign = flat < 0 ? "+" : flat > 0 ? "-" : "";
  }
  return `${sign}${Math.abs(flat).toFixed(2)}`;
}

export function getFormattedPercent(value?: number | null) {
  if (value === undefined || value === null || Number.isNaN(value)) return "—";
  return `${(value * 100).toFixed(2)}%`;
}

// formatRatio: show numeric ratio with "x", default 1 decimal (e.g. "0.5x")
export function formatRatio(value?: number | null, digits = 1) {
  if (value === undefined || value === null || Number.isNaN(value)) return "—";
  return `${value.toFixed(digits)}x`;
}

// getRatioComparedToCar: returns an object with highlight text and whether it's less than cars (1)
export function getRatioComparedToCar(value?: number | null) {
  if (value === undefined || value === null || Number.isNaN(value)) {
    return { highlight: "—", isLess: true };
  }
  const diffFlat = value - 1;
  const absFlat = Math.abs(diffFlat).toFixed(2);
  let sign = "";
  if (diffFlat < 0) {
    sign = "-";
  } else if (diffFlat > 0) {
    sign = "+";
  }
  // isLess means less than car (value < 1)
  return {
    highlight: `${sign}${absFlat}`,
    isLess: value < 1,
  };
}
