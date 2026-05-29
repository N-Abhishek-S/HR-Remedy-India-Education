import { createClient, type SupabaseClient } from "@supabase/supabase-js";

import { getSupabasePublicConfig } from "@/lib/env/client";
import type { Database } from "@/types/database";

let browserClient: SupabaseClient<Database> | null = null;

export function createSupabaseBrowserClient() {
  if (browserClient) {
    return browserClient;
  }

  const config = getSupabasePublicConfig();

  if (!config) {
    return null;
  }

  browserClient = createClient<Database>(config.url, config.anonKey, {
    auth: {
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: true,
    },
  });

  return browserClient;
}
