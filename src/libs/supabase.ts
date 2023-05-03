import { Database } from "@/types/database";
import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs";

const supabase = createBrowserSupabaseClient<Database>();

export default supabase;
