import React, { ReactNode } from "react";

export default function SellerMapLayout({
  children,
  modal,
}: {
  children: ReactNode;
  modal: ReactNode;
}) {
  return (
    <div className="relative flex h-full w-full">
      <div className="flex-1">{children}</div>
      {modal}
    </div>
  );
}
