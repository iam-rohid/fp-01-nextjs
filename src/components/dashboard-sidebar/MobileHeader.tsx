import { fetchProfileAsync } from "@/service/profile";
import { type User } from "@supabase/supabase-js";
import { useQuery } from "@tanstack/react-query";
import { User as UserIcon, Menu as MenuIcon } from "lucide-react";

export default function MobileHeader({
  onSidebarOpenChange,
  sidebarOpen,
  user,
}: {
  sidebarOpen?: boolean;
  onSidebarOpenChange: (value: boolean) => void;
  user: User;
}) {
  const { data: profile, isSuccess } = useQuery(
    ["user-profile", user.id],
    ({ queryKey }) => fetchProfileAsync(queryKey[1])
  );

  return (
    <header className="absolute left-0 right-0 top-0 flex h-14 items-center border-b border-slate-200 bg-white px-4 lg:hidden">
      <button
        onClick={() => onSidebarOpenChange(!sidebarOpen)}
        className="flex h-10 w-10 items-center justify-center rounded-md text-slate-600 hover:bg-slate-100 hover:text-slate-900"
      >
        <MenuIcon className="h-6 w-6" />
      </button>
      <div className="flex-1"></div>
      {isSuccess ? (
        <button
          onClick={() => onSidebarOpenChange(!sidebarOpen)}
          className="flex h-10 w-10 items-center justify-center rounded-md text-slate-600 hover:bg-slate-100 hover:text-slate-900"
        >
          <UserIcon className="h-6 w-6" />
        </button>
      ) : (
        <div className="h-10 w-10 rounded-md bg-slate-200" />
      )}
    </header>
  );
}
