import React, { Fragment, PropsWithChildren } from "react";
import Header from "./Header";
import { createServerComponentSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "@/types/database";
import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function AuthLayout({ children }: PropsWithChildren) {
  const supabase = createServerComponentSupabaseClient<Database>({
    headers,
    cookies,
  });

  const { data } = await supabase.auth.getUser();

  if (!!data.user) {
    redirect("/dashboard");
  }

  return (
    <Fragment>
      <Header />
      <main className="my-16">{children}</main>
    </Fragment>
  );
}
