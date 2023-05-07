import { Database } from "@/types/database";
import { APP_NAME } from "@/utils/constant";
import { createServerComponentSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { Metadata } from "next";
import { headers, cookies } from "next/headers";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: `Welcome to ${APP_NAME}`,
};
export default async function Welcome() {
  const supabase = createServerComponentSupabaseClient<Database>({
    headers,
    cookies,
  });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    redirect("/home");
  } else {
    redirect("/");
  }
}
