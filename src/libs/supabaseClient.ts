import { Database } from "@/types/database";
import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs";

const supabaseClient = createBrowserSupabaseClient<Database>();
export default supabaseClient;
