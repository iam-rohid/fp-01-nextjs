import { Database } from "@/types/database";
import { createServerComponentSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { headers, cookies } from "next/headers";
import Link from "next/link";
import React from "react";
import HeaderUserButton from "./HeaderUserButton";

export default async function HeaderAuth() {
  const supabase = createServerComponentSupabaseClient<Database>({
    headers,
    cookies,
  });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    const { data } = await supabase
      .from("profiles")
      .select("name,avatar_url")
      .eq("id", user?.id)
      .single();
    return (
      <HeaderUserButton
        label={data?.name || user.email || "Unknown Name"}
        avatarUrl={data?.avatar_url || undefined}
      />
    );
  }

  return (
    <nav className="flex items-center justify-end gap-4 max-sm:hidden">
      <Link className="text-slate-600 hover:text-slate-900" href="/signin">
        Sign In
      </Link>
      <Link
        className="flex h-12 items-center rounded-full bg-primary-500 px-8 text-white transition-shadow hover:shadow-xl hover:shadow-primary-500/20"
        href="/signup"
      >
        Sign Up
      </Link>
    </nav>
  );
}
