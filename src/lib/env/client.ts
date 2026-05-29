import { z } from "zod";

import { emptyToUndefined, optionalString, optionalUrl, parseEnv } from "./schema";

const clientEnvSchema = z.object({
  VITE_SITE_URL: z.preprocess(emptyToUndefined, z.string().url().default("http://localhost:5173")),
  VITE_SUPABASE_URL: optionalUrl,
  VITE_SUPABASE_ANON_KEY: optionalString,
});

const viteEnv = import.meta.env as Record<string, string | undefined>;

export const clientEnv = parseEnv(
  clientEnvSchema,
  {
    VITE_SITE_URL: viteEnv.VITE_SITE_URL,
    VITE_SUPABASE_URL: viteEnv.VITE_SUPABASE_URL,
    VITE_SUPABASE_ANON_KEY: viteEnv.VITE_SUPABASE_ANON_KEY,
  },
  "client environment",
);

export const publicEnv = clientEnv;

export function getSupabasePublicConfig() {
  if (!clientEnv.VITE_SUPABASE_URL || !clientEnv.VITE_SUPABASE_ANON_KEY) {
    return null;
  }

  return {
    url: clientEnv.VITE_SUPABASE_URL,
    anonKey: clientEnv.VITE_SUPABASE_ANON_KEY,
  };
}
