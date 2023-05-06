import Link from "next/link";
import React from "react";

export default function SignInSignUpButtonGroup() {
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
