import { PropsWithChildren } from "react";
import Sidebar from "./Sidebar";
import { redirect } from "next/navigation";
import serverSupabase from "@/libs/serverSupabase";

export default async function DashboardLayout({ children }: PropsWithChildren) {
  const { data } = await serverSupabase().auth.getUser();

  if (!data.user) {
    redirect("/signin");
  }

  return (
    <div className="relative h-screen w-screen overflow-hidden bg-slate-50 text-slate-900">
      <Sidebar user={data.user} />

      <div className="absolute bottom-0 left-0 right-0 top-14 lg:left-64 lg:top-0">
        {children}
      </div>
    </div>
  );
}
