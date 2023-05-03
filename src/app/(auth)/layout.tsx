import React, { PropsWithChildren } from "react";
import Header from "./Header";
import { createServerComponentSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "@/types/database";
import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";
import { APP_ROOT_ROUTE } from "@/utils/constant";

export default async function AuthLayout({ children }: PropsWithChildren) {
  const supabase = createServerComponentSupabaseClient<Database>({
    headers,
    cookies,
  });

  const { data } = await supabase.auth.getUser();

  if (!!data.user) {
    redirect(APP_ROOT_ROUTE);
  }

  return (
    <div className="min-h-screen bg-slate-100">
      <Header />
      {children}
    </div>
  );
}
