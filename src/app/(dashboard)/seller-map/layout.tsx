import { ReactNode } from "react";

export default function SellerMapLayout({ children }: { children: ReactNode }) {
  return <div className="h-full w-full overflow-hidden">{children}</div>;
}
