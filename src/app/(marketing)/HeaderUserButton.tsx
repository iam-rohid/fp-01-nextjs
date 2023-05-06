"use client";

import {
  MdAutoAwesome,
  MdDashboard,
  MdExpandMore,
  MdLogout,
  MdPayments,
  MdPerson,
} from "react-icons/md";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback } from "react";
import supabase from "@/libs/supabase";

export default function HeaderUserButton({
  label,
  avatarUrl,
}: {
  label: string;
  avatarUrl?: string;
}) {
  const router = useRouter();

  const handleSignOut = useCallback(async () => {
    try {
      await supabase.auth.signOut();
      console.log("Sign out success");
      router.refresh();
    } catch (e) {
      console.error("Failed to sign out", e);
    }
  }, [router]);

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button className="flex h-12 items-center rounded-full bg-slate-100 px-1 font-medium text-slate-600 hover:bg-slate-200 hover:text-slate-900">
          <div className="flex h-10 w-10 items-center justify-center rounded-full text-2xl text-slate-600 sm:mr-2 sm:bg-white">
            {avatarUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={avatarUrl}
                alt=""
                className="h-full w-full object-cover"
              />
            ) : (
              <MdPerson />
            )}
          </div>
          <p className="max-sm:hidden">{label}</p>
          <MdExpandMore className="ml-2 mr-2 text-2xl max-sm:hidden" />
        </button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content
          align="end"
          className="z-50 rounded-xl bg-white p-2 shadow-xl ring-1 ring-slate-200"
        >
          <DropdownMenu.Item asChild>
            <Link
              href="/dashboard"
              className="flex w-full rounded-md px-4 py-2 text-slate-600 outline-none focus:bg-slate-100 focus:text-slate-900"
            >
              <MdDashboard className="mr-4 text-2xl" />
              Dashboard
            </Link>
          </DropdownMenu.Item>

          <DropdownMenu.Item asChild>
            <Link
              href="/dashboard/account"
              className="flex w-full rounded-md px-4 py-2 text-slate-600 outline-none focus:bg-slate-100 focus:text-slate-900"
            >
              <MdPerson className="mr-4 text-2xl" />
              Account
            </Link>
          </DropdownMenu.Item>
          <DropdownMenu.Item asChild>
            <Link
              href="/dashboard/subscription"
              className="flex w-full rounded-md px-4 py-2 text-slate-600 outline-none focus:bg-slate-100 focus:text-slate-900"
            >
              <MdAutoAwesome className="mr-4 text-2xl" />
              Subscription
            </Link>
          </DropdownMenu.Item>
          <DropdownMenu.Item asChild>
            <Link
              href="/dashboard/billing"
              className="flex w-full rounded-md px-4 py-2 text-slate-600 outline-none focus:bg-slate-100 focus:text-slate-900"
            >
              <MdPayments className="mr-4 text-2xl" />
              Billing
            </Link>
          </DropdownMenu.Item>
          <DropdownMenu.Separator className="my-2 h-px bg-slate-200" />
          <DropdownMenu.Item asChild>
            <button
              onClick={handleSignOut}
              className="flex w-full items-center rounded-md px-4 py-2 text-red-400 outline-none focus:bg-red-500/5 focus:text-red-500"
            >
              <MdLogout className="mr-4 text-2xl" />
              Sign Out
            </button>
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}
