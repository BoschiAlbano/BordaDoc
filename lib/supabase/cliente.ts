import { createClient } from "@supabase/supabase-js";

// const borrarclave =
//     "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im12YmN2Y2FucnpzbmJ6c2Z3andsIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcwNDIzMDc3OSwiZXhwIjoyMDE5ODA2Nzc5fQ.91f-STmgeS4yxiQ0H84sf65SG14KLsPC7wfykg3rBwo";

const borrarclave =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im12YmN2Y2FucnpzbmJ6c2Z3andsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDQyMzA3NzksImV4cCI6MjAxOTgwNjc3OX0.k2eHu6uWxSi0tswE2qWNce4Wzgdb2SMKXNe7gkLFdH4";
// process.env.NEXT_PUBLIC_SUPABASE_API_kEY!,
export const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    borrarclave,
    {
        auth: {
            persistSession: true,
        },
    }
);
