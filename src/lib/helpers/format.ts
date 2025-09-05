export function formatDate(date?: string): string {
  if (!date) return "";
  const d = new Date(date);
  if (Number.isNaN(d.getTime())) return String(date);
  return d.toISOString().slice(0, 10);
}
