import { APP_NAME } from "@/utils/constant";
import Link from "next/link";
import React from "react";

export default function Header() {
  return (
    <header className="sticky top-0 bg-white">
      <div className="mx-auto max-w-screen-xl px-4">
        <div className="flex h-16 items-center">
          <div className="flex-1">
            <Link href="/" className="text-xl font-semibold text-slate-900">
              {APP_NAME}
            </Link>
          </div>

          <nav className="flex flex-1 items-center justify-end gap-4">
            <Link className="text-slate-600 hover:text-slate-900" href="/login">
              Log In
            </Link>
            <Link
              className="rounded-lg bg-primary-500 px-4 py-2 text-white hover:bg-primary-600"
              href="/signup"
            >
              Sign Up
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
