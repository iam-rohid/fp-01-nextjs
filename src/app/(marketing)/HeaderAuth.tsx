import Link from "next/link";
import React from "react";
import HeaderUserButton from "./HeaderUserButton";
import serverSupabase from "@/libs/serverSupabase";

export default async function HeaderAuth() {
  const {
    data: { user },
  } = await serverSupabase().auth.getUser();

  if (user) {
    const { data: profile } = await serverSupabase()
      .from("profiles")
      .select("*")
      .eq("id", user?.id)
      .single();
    return (
      <HeaderUserButton
        label={
          profile?.first_name
            ? `${profile.first_name} ${profile.last_name}`
            : "Unknown Name"
        }
        avatarUrl={profile?.avatar_url || undefined}
      />
    );
  }

  return (
    <nav className="flex items-center justify-end gap-4 max-sm:hidden">
      <Link className="text-slate-600 hover:text-slate-900" href="/signin">
        Sign In
      </Link>
      <Link
        className="flex h-12 items-center rounded-full bg-primary-500 px-6 text-white transition-colors hover:bg-primary-600"
        href="/signup"
      >
        Sign Up
      </Link>
    </nav>
  );
}
