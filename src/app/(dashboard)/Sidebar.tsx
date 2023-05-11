"use client";

import { User } from "@supabase/supabase-js";
import clsx from "clsx";
import { useCallback, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  BookIcon,
  HomeIcon,
  MapIcon,
  StoreIcon,
  LogOutIcon,
  SettingsIcon,
  UserIcon,
  PanelLeftOpenIcon,
} from "lucide-react";
import { SidebarListItem } from "@/components/ui/sidebar-list-item";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useQuery } from "@tanstack/react-query";
import { fetchProfileAsync } from "@/service/profile";
import { useToast } from "@/components/ui/use-toast";
import supabaseClient from "@/libs/supabaseClient";

export default function Sidebar({ user }: { user: User }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setSidebarOpen(false);
  }, [pathname]);

  return (
    <>
      <header className="absolute left-0 right-0 top-0 flex h-14 items-center justify-between border-b bg-white px-4 lg:hidden">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="flex h-10 w-10 items-center justify-center rounded-md text-slate-600 hover:bg-slate-100 hover:text-slate-900"
        >
          <PanelLeftOpenIcon className="h-6 w-6" />
        </button>
        <UserButton align="end" user={user} />
      </header>

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
          "absolute bottom-0 top-0 z-40 flex w-64 flex-col border-r bg-background transition-[left] lg:left-0",
          sidebarOpen ? "left-0" : "-left-64"
        )}
      >
        <header className="flex h-14 items-center justify-between px-4">
          <Button variant="ghost" className="h-10 w-10 p-0" asChild>
            <Link href="/home">
              <div className="h-8 w-8 rounded-full bg-primary"></div>
            </Link>
          </Button>
          <UserButton align="start" user={user} />
        </header>

        <div className="flex-1 overflow-y-auto p-4">
          <nav className="space-y-px">
            <SidebarListItem asChild isActive={pathname === "/home"}>
              <Link href="/home">
                <HomeIcon className="mr-2 h-4 w-4" /> Home
              </Link>
            </SidebarListItem>
          </nav>
          <p className="mb-2 mt-8 px-4 text-sm uppercase text-foreground/60">
            Tools
          </p>
          <nav className="space-y-px">
            <SidebarListItem asChild isActive={pathname.startsWith("/sellers")}>
              <Link href="/sellers">
                <StoreIcon className="mr-2 h-4 w-4" /> Sellers
              </Link>
            </SidebarListItem>
            <SidebarListItem
              asChild
              isActive={pathname.startsWith("/seller-map")}
            >
              <Link href="/seller-map">
                <MapIcon className="mr-2 h-4 w-4" /> Seller Map
              </Link>
            </SidebarListItem>
          </nav>
        </div>

        <footer className="p-4">
          <nav className="space-y-px">
            <SidebarListItem asChild>
              <Link href="#">
                <BookIcon className="mr-2 h-4 w-4" /> Help & Support
              </Link>
            </SidebarListItem>
          </nav>
        </footer>
      </aside>
    </>
  );
}

const UserButton = ({
  user,
  align,
}: {
  user: User;
  align?: "center" | "start" | "end";
}) => {
  const { data, isLoading, isError } = useQuery(
    ["user", user.id],
    () => fetchProfileAsync(user.id),
    {
      refetchOnWindowFocus: false,
      refetchInterval: false,
    }
  );
  const { toast } = useToast();

  const handleSignOut = useCallback(async () => {
    try {
      await supabaseClient.auth.signOut();
    } catch (e) {
      console.error("Failed to sign out", e);
      toast({
        title: "Failed to sign out",
        variant: "destructive",
      });
    }
  }, [toast]);

  if (isError) {
    return <p>Error</p>;
  }
  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-10 w-10 p-0">
          <Avatar className="h-8 w-8">
            {data.avatar_url && <AvatarImage src={data.avatar_url} />}
            <AvatarFallback className="bg-foreground/10">
              <UserIcon className="h-6 w-6" />
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align={align}>
        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            <Link href="/account">
              <UserIcon className="mr-2 h-4 w-4" />
              <span>Account</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="/billing">
              <SettingsIcon className="mr-2 h-4 w-4" />
              <span>Settings</span>
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            <Link href="/help">
              <BookIcon className="mr-2 h-4 w-4" />
              <span>Help & Support</span>
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem onClick={handleSignOut}>
            <LogOutIcon className="mr-2 h-4 w-4" />
            <span>Log out</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
