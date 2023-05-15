"use client";

import { Button } from "@/components/ui/button";
import { APP_NAME } from "@/utils/constant";
import Link from "next/link";

export default function Header() {
  return (
    <header className="supports-backdrop-blur:bg-background/60 sticky top-0 z-40 w-full border-b bg-background/95 shadow-sm backdrop-blur">
      <div className="container flex h-14 items-center">
        <div className="flex flex-1 items-center">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <div className="h-6 w-6 rounded-full bg-slate-900"></div>
            <p className="font-bold">{APP_NAME}</p>
          </Link>
        </div>

        <nav className="flex items-center justify-end space-x-2">
          <Button variant="ghost" asChild>
            <Link href="/signin">Sign In</Link>
          </Button>
          <Button variant="default" asChild>
            <Link href="/signup">Sign Up</Link>
          </Button>
        </nav>
      </div>
    </header>
  );
}
