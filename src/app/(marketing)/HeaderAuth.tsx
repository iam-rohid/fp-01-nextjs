import React, { useCallback } from "react";
import HeaderUserButton from "./HeaderUserButton";
import { type User } from "@supabase/supabase-js";
import supabaseClient from "@/libs/supabaseClient";
import { useQuery } from "@tanstack/react-query";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  CreditCard,
  Home,
  LogOut,
  Settings,
  User as UserIcon,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import Link from "next/link";

const fetchProfile = async (userId: string) => {
  const { data, error } = await supabaseClient
    .from("profiles")
    .select("*")
    .eq("id", userId)
    .single();

  if (error) {
    throw error;
  }

  return data;
};

export default function HeaderAuth({ user }: { user: User }) {
  const {
    isLoading,
    data: profile,
    isError,
  } = useQuery(["profile", user.id], () => fetchProfile(user.id));
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

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <p>Error!</p>;
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">
          <Avatar className="-ml-2 h-8 w-8 max-lg:-ml-3 max-lg:-mr-3 lg:mr-2">
            {profile.avatar_url && (
              <AvatarImage src={profile.avatar_url} alt="" />
            )}
            <AvatarFallback className="bg-foreground/5">
              {(profile.first_name && profile.first_name[0]) || "U"}
              {(profile.last_name && profile.last_name[0]) || "N"}
            </AvatarFallback>
          </Avatar>
          <span className="max-lg:hidden">
            {profile.first_name
              ? `${profile.first_name} ${profile.last_name}`
              : "Unknown Name"}
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            <Link href="/home">
              <Home className="mr-2 h-4 w-4" />
              <span>Home</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="/account">
              <UserIcon className="mr-2 h-4 w-4" />
              <span>Account</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="/billing">
              <CreditCard className="mr-2 h-4 w-4" />
              <span>Billing</span>
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem onClick={handleSignOut}>
            <LogOut className="mr-2 h-4 w-4" />
            <span>Sign out</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
