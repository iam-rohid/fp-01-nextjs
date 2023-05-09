"use client";

import { useRouter } from "next/navigation";
import React from "react";
import { MdArrowBackIosNew } from "react-icons/md";

export default function Header({ title }: { title: string }) {
  const router = useRouter();

  return (
    <header className="sticky top-0 z-20 flex h-14 items-center gap-4 bg-white px-4 ring-1 ring-slate-200">
      <button
        onClick={router.back}
        className="-mx-2 flex h-10 w-10 items-center justify-center text-2xl text-slate-600 hover:text-slate-900"
        title="Go back"
      >
        <MdArrowBackIosNew />
      </button>

      <h1 className="text-xl font-semibold">{title}</h1>
    </header>
  );
}
