"use client";

import React, { PropsWithChildren, useEffect } from "react";
import Header from "./Header";
import { useAuth } from "@/hooks/useAuth";
import FullScreenLoading from "@/components/FullScreenLoading";
import { useRouter } from "next/navigation";
import { APP_ROOT_ROUTE } from "@/utils/constant";

export default function AuthLayout({ children }: PropsWithChildren) {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !!user) {
      router.replace(APP_ROOT_ROUTE);
    }
  }, [isLoading, router, user]);

  if (isLoading || user) {
    return <FullScreenLoading />;
  }

  return (
    <div className="min-h-screen bg-slate-100">
      <Header />
      {children}
    </div>
  );
}
