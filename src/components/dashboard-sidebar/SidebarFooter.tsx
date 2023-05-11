import React from "react";
import { SidebarListItem } from "../ui/sidebar-list-item";
import Link from "next/link";
import { Book } from "lucide-react";

export default function SidebarFooter() {
  return (
    <footer className="p-4">
      <nav className="space-y-px">
        <SidebarListItem asChild>
          <Link href="#">
            <Book className="mr-2 h-4 w-4" /> Help & Support
          </Link>
        </SidebarListItem>
      </nav>
    </footer>
  );
}
