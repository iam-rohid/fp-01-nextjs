import { APP_NAME } from "@/utils/constant";
import Link from "next/link";
import React from "react";

export default function Header() {
  return (
    <header className="sticky top-0 bg-white ring-1 ring-slate-200">
      <div className="mx-auto flex h-16 max-w-screen-xl items-center px-6">
        <Link href="/" className="text-2xl font-semibold text-slate-900">
          {APP_NAME}
        </Link>

        <div className="flex-1 items-center justify-end">
          <nav className="flex items-center justify-end gap-4 max-sm:hidden">
            <Link
              className="text-slate-600 hover:text-slate-900"
              href="/signin"
            >
              Sign In
            </Link>
            <Link
              className="flex h-12 items-center rounded-full bg-primary-500 px-6 text-white transition-colors hover:bg-primary-600"
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
