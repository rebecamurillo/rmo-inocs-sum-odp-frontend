export function getUrl(path?: string) {
  return `${import.meta.env.BASE_URL}${path ?? "#"}`;
}
