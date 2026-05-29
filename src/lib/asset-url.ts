const base = import.meta.env.BASE_URL.replace(/\/$/, "");

/** Prefix a public-directory asset path with the Vite base URL. */
export function assetUrl(path: string): string {
  return `${base}${path.startsWith("/") ? path : `/${path}`}`;
}
