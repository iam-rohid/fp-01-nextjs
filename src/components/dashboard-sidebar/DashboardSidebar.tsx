"use client";

import { APP_NAME } from "@/utils/constant";
import { User } from "@supabase/supabase-js";
import clsx from "clsx";
import Link from "next/link";
import { useState } from "react";
import SidebarList from "./SidebarList";
import MobileHeader from "./MobileHeader";
import SidebarFooter from "./SidebarFooter";
import SidebarHeader from "./SidebarHeader";

export default function DashboardSidebar({ user }: { user: User }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      <MobileHeader
        user={user}
        sidebarOpen={sidebarOpen}
        onSidebarOpenChange={setSidebarOpen}
      />

      <div
        className={clsx(
          "absolute inset-0 z-30 bg-black/50 transition-opacity lg:pointer-events-none lg:hidden",
          sidebarOpen
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        )}
        onClick={() => setSidebarOpen(false)}
      />

      <aside
        className={clsx(
          "absolute bottom-0 top-0 z-40 flex w-64 flex-col border-r border-slate-200 bg-background transition-[left] lg:left-0",
          sidebarOpen ? "left-0" : "-left-64"
        )}
      >
        <SidebarHeader />

        <SidebarList />

        <SidebarFooter />
      </aside>
    </>
  );
}
