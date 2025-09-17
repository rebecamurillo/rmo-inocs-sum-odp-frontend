import { EnumKpiMetricType } from "../../types";

export function formatDateToMothYear(date?: string): string {
  if (!date) return "";
  const d = new Date(date);
  if (Number.isNaN(d.getTime())) return String(date);
  return d.toLocaleDateString("en-US", { year: "numeric", month: "short" });
}

export function getKpiValueByMetricType(value?: number, kpiMetric?: string) {
  if (value && kpiMetric && kpiMetric === EnumKpiMetricType.PERCENTAGE) {
    return `${Math.round(value * 100)}%`;
  }

  return value ?? "";
}

export function parseDateToInputHtml(date?: string): string {
  if (!date) return "";
  const d = new Date(date);
  if (Number.isNaN(d.getTime())) return String(date);
  return d.toISOString().slice(0, 10);
}
