"use client";

import { APP_NAME } from "@/utils/constant";
import Link from "next/link";
import HeaderAuth from "./HeaderAuth";
import { Menu } from "lucide-react";
import { useAuth } from "../AuthProvider";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";
import clsx from "clsx";

export default function Header() {
  const { isLoading, user } = useAuth();
  const pathname = usePathname();
  return (
    <header className="supports-backdrop-blur:bg-background/60 sticky top-0 z-40 w-full border-b bg-background/95 shadow-sm backdrop-blur">
      <div className="container flex h-14 items-center">
        <div className="flex flex-1 items-center">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <div className="h-6 w-6 rounded-full bg-slate-900"></div>
            <p className="font-bold">{APP_NAME}</p>
          </Link>

          <nav className="flex items-center space-x-6 text-sm font-medium max-lg:hidden">
            <Link
              className={clsx(
                "text-foreground/60 transition-colors hover:text-foreground/80",
                { "text-foreground/80": pathname.startsWith("/pricing") }
              )}
              href="/pricing"
            >
              Pricing
            </Link>
          </nav>
        </div>

        <div className="flex items-center gap-2">
          {isLoading ? (
            <p>Loading...</p>
          ) : !user ? (
            <nav className="flex items-center justify-end gap-2">
              <Button variant="ghost" asChild>
                <Link href="/signin">Sign In</Link>
              </Button>
              <Button variant="default" asChild>
                <Link href="/signup">Sign Up</Link>
              </Button>
            </nav>
          ) : (
            <HeaderAuth user={user} />
          )}

          <Button className="px-2 lg:hidden" variant="ghost">
            <Menu className="h-6 w-6" />
          </Button>
        </div>
      </div>
    </header>
  );
}
