import { createClient } from "@supabase/supabase-js";

// Usando SERVICE_ROLE_API_KEY tengo permisos para todas la api sin mandar token ni las RLS Policy
export const supabaseAdmin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SERVICE_ROLE_API_KEY!,
    {
        auth: {
            autoRefreshToken: false,
            persistSession: false,
        },
    }
);
