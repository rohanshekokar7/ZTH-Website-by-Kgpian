import { createClient } from "@supabase/supabase-js";

// ─── Types ──────────────────────────────────────────────────────────────────

export type BookingStatus = "new" | "contacted" | "converted" | "closed";

export interface Booking {
  id: string;
  name: string;
  email: string;
  company: string;
  services: string[];
  message: string;
  status: BookingStatus;
  created_at: string;
  updated_at: string;
}

// ─── Public (anon) client — used on the client-side / in forms ───────────────

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// ─── Server-side admin client — used in API routes only ──────────────────────
// NEVER import this in client components!

export function createAdminClient() {
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
  return createClient(supabaseUrl, serviceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}
