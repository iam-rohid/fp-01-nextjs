import React, { ReactNode } from "react";
import Header from "./Header";

export default function SellerLayout({ children }: { children: ReactNode }) {
  return (
    <div className="absolute bottom-0 right-0 top-0 z-10 flex w-[512px] max-w-[100vw] flex-col overflow-hidden border-l border-slate-200 bg-white">
      <Header />
      <div className="flex-1 overflow-hidden">{children}</div>
    </div>
  );
}
