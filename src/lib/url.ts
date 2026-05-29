import { clientEnv } from "@/lib/env";

export function absoluteUrl(path: string, baseUrl = clientEnv.VITE_SITE_URL) {
  return new URL(path, baseUrl).toString();
}

export function normalizePath(path: string) {
  if (path === "/") {
    return "/";
  }

  return `/${path.replace(/^\/+|\/+$/g, "")}`;
}
