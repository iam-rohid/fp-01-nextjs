"use client";

import { PropsWithChildren, useEffect } from "react";
import Sidebar from "./Sidebar";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import FullScreenLoading from "@/components/FullScreenLoading";

export default function DashboardLayout({ children }: PropsWithChildren) {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !user) {
      router.replace("/signin");
    }
  }, [isLoading, router, user]);

  if (isLoading || !user) {
    return <FullScreenLoading />;
  }

  return (
    <div className="relative h-screen w-screen overflow-hidden bg-slate-100">
      <Sidebar />

      <div className="absolute bottom-0 left-0 right-0 top-14 lg:left-64 lg:top-0">
        {children}
      </div>
    </div>
  );
}
