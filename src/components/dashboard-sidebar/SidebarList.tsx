import { usePathname } from "next/navigation";
import { SidebarListItem } from "../ui/sidebar-list-item";
import Link from "next/link";
import { Home, Map, Store } from "lucide-react";

export default function SidebarList() {
  const pathname = usePathname();
  return (
    <div className="flex-1 overflow-y-auto p-4">
      <nav className="space-y-px">
        <SidebarListItem asChild isActive={pathname === "/home"}>
          <Link href="/home">
            <Home className="mr-2 h-4 w-4" /> Home
          </Link>
        </SidebarListItem>
      </nav>
      <p className="mb-2 mt-8 px-4 text-sm uppercase text-foreground/60">
        Tools
      </p>
      <nav className="space-y-px">
        <SidebarListItem asChild isActive={pathname.startsWith("/sellers")}>
          <Link href="/sellers">
            <Store className="mr-2 h-4 w-4" /> Sellers
          </Link>
        </SidebarListItem>
        <SidebarListItem asChild isActive={pathname.startsWith("/seller-map")}>
          <Link href="/seller-map">
            <Map className="mr-2 h-4 w-4" /> Seller Map
          </Link>
        </SidebarListItem>
      </nav>
    </div>
  );
}
