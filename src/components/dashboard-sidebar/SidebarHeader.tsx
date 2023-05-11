import Link from "next/link";
import React, { useCallback } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { useAuth } from "@/app/AuthProvider";
import { User } from "@supabase/supabase-js";
import { useQuery } from "@tanstack/react-query";
import { fetchProfileAsync } from "@/service/profile";
import {
  Book,
  CreditCard,
  Home,
  LogOut,
  Settings,
  User as UserIcon,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { useToast } from "../ui/use-toast";
import supabaseClient from "@/libs/supabaseClient";
import { Button } from "../ui/button";

export default function SidebarHeader() {
  const { isLoading, user } = useAuth();

  return (
    <header className="flex h-14 items-center px-4">
      <div className="flex-1">
        <Button variant="ghost" className="h-10 w-10 p-0" asChild>
          <Link href="/home">
            <div className="h-8 w-8 rounded-full bg-primary"></div>
          </Link>
        </Button>
      </div>
      {isLoading || !user ? <div></div> : <UserButton user={user} />}
    </header>
  );
}

const UserButton = ({ user }: { user: User }) => {
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
      <DropdownMenuContent align="start">
        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            <Link href="/account">
              <UserIcon className="mr-2 h-4 w-4" />
              <span>Account</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="/billing">
              <Settings className="mr-2 h-4 w-4" />
              <span>Settings</span>
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            <Link href="/help">
              <Book className="mr-2 h-4 w-4" />
              <span>Help & Support</span>
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem onClick={handleSignOut}>
            <LogOut className="mr-2 h-4 w-4" />
            <span>Log out</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
