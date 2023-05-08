import { Database } from "@/types/database";
import { createServerComponentSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { headers, cookies } from "next/headers";

export default function serverSupabse() {
  return createServerComponentSupabaseClient<Database>({
    headers,
    cookies,
  });
}
