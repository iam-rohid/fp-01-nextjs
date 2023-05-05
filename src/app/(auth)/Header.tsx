import { APP_LANDING_PAGE_URL, APP_NAME } from "@/utils/constant";
import Link from "next/link";
import React from "react";

export default function Header() {
  return (
    <header className="h-20">
      <div className="mx-auto flex h-full max-w-screen-lg items-center px-4">
        <Link
          href={APP_LANDING_PAGE_URL}
          className="text-xl font-bold text-slate-900"
        >
          {APP_NAME}
        </Link>
      </div>
    </header>
  );
}
