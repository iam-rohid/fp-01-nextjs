"use client";

import { useRouter } from "next/navigation";
import React from "react";
import { MdClose } from "react-icons/md";

export default function Header() {
  const router = useRouter();
  return (
    <div className="sticky top-0 z-20 flex items-center gap-4 border-b border-slate-200 bg-white p-2">
      <button
        onClick={router.back}
        className="flex h-10 w-10 items-center justify-center rounded-md text-2xl text-slate-600 hover:bg-slate-100 hover:text-slate-900"
      >
        <MdClose />
      </button>
      <p className="flex-1 truncate font-medium text-slate-600">
        Seller Details
      </p>
    </div>
  );
}
