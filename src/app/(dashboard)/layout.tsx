import { PropsWithChildren } from "react";
import { redirect } from "next/navigation";
import serverSupabase from "@/libs/serverSupabase";
import DashboardSidebar from "@/components/dashboard-sidebar/DashboardSidebar";

export default async function DashboardLayout({ children }: PropsWithChildren) {
  const { data } = await serverSupabase().auth.getUser();

  if (!data.user) {
    redirect("/signin");
  }

  return (
    <div className="relative h-screen w-screen overflow-hidden bg-slate-50 text-slate-900">
      <DashboardSidebar user={data.user} />

      <div className="absolute bottom-0 left-0 right-0 top-14 lg:left-64 lg:top-0">
        {children}
      </div>
    </div>
  );
}
