import { PropsWithChildren } from "react";
import Sidebar from "./Sidebar";
import { createServerComponentSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { headers, cookies } from "next/headers";
import { Database } from "@/types/database";
import { redirect } from "next/navigation";

export default async function DashboardLayout({ children }: PropsWithChildren) {
  const supabase = createServerComponentSupabaseClient<Database>({
    headers,
    cookies,
  });

  const { data } = await supabase.auth.getUser();

  if (!data.user) {
    redirect("/sign-in");
  }

  return (
    <div className="relative h-screen w-screen overflow-hidden bg-slate-100 text-slate-900">
      <Sidebar user={data.user} />

      <div className="absolute bottom-0 left-0 right-0 top-14 lg:left-64 lg:top-0">
        {children}
      </div>
    </div>
  );
}
