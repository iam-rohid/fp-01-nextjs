import { APP_NAME } from "@/utils/constant";
import Link from "next/link";
import React from "react";

export default function Header() {
  return (
    <header className="h-14 w-full border-b border-slate-200 bg-white">
      <div className="container mx-auto flex h-full items-center px-4 xl:max-w-screen-xl">
        <Link href="/" className="text-xl font-bold text-slate-900">
          {APP_NAME}
        </Link>
      </div>
    </header>
  );
}
