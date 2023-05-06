"use client";

import {
  MdPerson,
  MdMap,
  MdHome,
  MdMoreHoriz,
  MdStore,
  MdLogout,
  MdPayments,
  MdAutoAwesome,
  MdMenu,
} from "react-icons/md";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import clsx from "clsx";
import {
  Fragment,
  ReactNode,
  RefAttributes,
  forwardRef,
  useCallback,
  useState,
} from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { fetchProfileAsync } from "@/service/profile";
import supabase from "@/libs/supabase";
import { User } from "@supabase/supabase-js";

export default function SideBar({ user }: { user: User }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <Fragment>
      <Header
        user={user}
        sidebarOpen={sidebarOpen}
        onSidebarOpenChange={setSidebarOpen}
      />
      <Overaly sidebarOpen={sidebarOpen} onSidebarOpenChange={setSidebarOpen} />
      <aside
        className={clsx(
          "absolute bottom-0 top-0 z-40 flex w-64 flex-col border-r border-slate-200 bg-white transition-[left] lg:left-0",
          sidebarOpen ? "left-0" : "-left-64"
        )}
      >
        <SidebarHeader />
        <SidebarList />
        <SidebarFooter user={user} />
      </aside>
    </Fragment>
  );
}

const SidebarList = () => {
  const pathname = usePathname();
  return (
    <div className="flex-1 overflow-y-auto p-4">
      <nav className="space-y-px">
        <ListItemLink
          href="/home"
          icon={<MdHome />}
          isActive={pathname === "/home"}
        >
          Home
        </ListItemLink>
      </nav>
      <p className="mb-2 mt-8 px-4 text-sm uppercase text-slate-400">Tools</p>
      <nav className="space-y-px">
        <ListItemLink
          href="/sellers"
          icon={<MdStore />}
          isActive={pathname.startsWith("/sellers")}
        >
          Sellers
        </ListItemLink>
        <ListItemLink
          href="/seller-map"
          icon={<MdMap />}
          isActive={pathname.startsWith("/seller-map")}
        >
          Seller Map
        </ListItemLink>
      </nav>
    </div>
  );
};

type UserDropdownContentProps = DropdownMenu.DropdownMenuContentProps &
  RefAttributes<HTMLDivElement>;

const UserDropdownContent = forwardRef<
  HTMLDivElement,
  UserDropdownContentProps
>((props, ref) => {
  const router = useRouter();

  const handleSignOut = useCallback(async () => {
    try {
      await supabase.auth.signOut();
      console.log("Sign out success");
      router.refresh();
    } catch (e) {
      console.error("Failed to sign out", e);
    }
  }, [router]);

  return (
    <DropdownMenu.Content
      className="z-50 rounded-xl bg-white p-2 shadow-xl ring-1 ring-slate-200"
      {...props}
      ref={ref}
    >
      <DropdownMenu.Item asChild>
        <Link
          href="/account"
          className="flex w-full rounded-md px-4 py-2 text-slate-600 outline-none focus:bg-slate-100 focus:text-slate-900"
        >
          <MdPerson className="mr-4 text-2xl" />
          Account
        </Link>
      </DropdownMenu.Item>
      <DropdownMenu.Item asChild>
        <Link
          href="/subscription"
          className="flex w-full rounded-md px-4 py-2 text-slate-600 outline-none focus:bg-slate-100 focus:text-slate-900"
        >
          <MdAutoAwesome className="mr-4 text-2xl" />
          Subscription
        </Link>
      </DropdownMenu.Item>
      <DropdownMenu.Item asChild>
        <Link
          href="/billing"
          className="flex w-full rounded-md px-4 py-2 text-slate-600 outline-none focus:bg-slate-100 focus:text-slate-900"
        >
          <MdPayments className="mr-4 text-2xl" />
          Billing
        </Link>
      </DropdownMenu.Item>
      <DropdownMenu.Separator className="my-2 h-px bg-slate-200" />
      <DropdownMenu.Item asChild>
        <button
          onClick={handleSignOut}
          className="flex w-full items-center rounded-md px-4 py-2 text-red-400 outline-none focus:bg-red-500/5 focus:text-red-500"
        >
          <MdLogout className="mr-4 text-2xl" />
          Sign Out
        </button>
      </DropdownMenu.Item>
    </DropdownMenu.Content>
  );
});

UserDropdownContent.displayName = "UserDropdownContent";

const SidebarHeader = () => (
  <header className="flex items-center p-4">
    <Link
      href="/home"
      className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-500 text-xl font-bold text-white"
    >
      S
    </Link>
  </header>
);

const SidebarFooter = ({ user }: { user: User }) => {
  const { data: profile, isSuccess } = useQuery(
    ["user-profile", user.id],
    ({ queryKey }) => fetchProfileAsync(queryKey[1])
  );

  if (!isSuccess) {
    return (
      <div className="flex items-center gap-4 border-t border-slate-200 p-4">
        <div className="h-10 w-10 rounded-full bg-slate-200" />
        <div className="h-6 flex-1 rounded-md bg-slate-200"></div>
      </div>
    );
  }

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger className="flex items-center gap-4 overflow-hidden border-t border-slate-200 p-4 hover:bg-slate-100">
        <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full bg-slate-200">
          {profile.avatar_url ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={profile.avatar_url}
              alt=""
              className="h-full w-full object-cover"
            />
          ) : (
            <span className="text-2xl text-slate-400">
              <MdPerson />
            </span>
          )}
        </div>
        <div className="flex-1 overflow-hidden text-left">
          <p className="truncate font-medium text-slate-900">
            {profile.name || "Unknown Name"}
          </p>
          <p className="truncate text-xs text-slate-600">
            {profile.email || "Unknwon Email"}
          </p>
        </div>
        <span className="text-2xl text-slate-600">
          <MdMoreHoriz />
        </span>
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <UserDropdownContent align="center" side="top" />
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
};

interface ListItemLinkProps {
  icon?: React.ReactElement;
  children: ReactNode;
  href: string;
  isActive?: boolean;
}

function ListItemLink(props: ListItemLinkProps) {
  const { icon, children, href, isActive } = props;
  return (
    <Link
      href={href}
      className={clsx(
        "flex w-full items-center gap-2.5 rounded-lg px-4 py-2.5",
        isActive
          ? "bg-primary-500/10 text-primary-500"
          : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
      )}
    >
      {icon ? <span className="text-2xl">{icon}</span> : null}
      <span className="flex-1">{children}</span>
    </Link>
  );
}

function Header({
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
        className="flex h-10 w-10 items-center justify-center rounded-md text-2xl text-slate-600 hover:bg-slate-100 hover:text-slate-900"
      >
        <MdMenu />
      </button>
      <div className="flex-1"></div>
      {isSuccess ? (
        <DropdownMenu.Root>
          <DropdownMenu.Trigger className="flex h-10 w-10 items-center justify-center rounded-md text-2xl text-slate-600 hover:bg-slate-100 hover:text-slate-900">
            {profile.avatar_url ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={profile.avatar_url}
                alt=""
                className="h-full w-full object-cover"
              />
            ) : (
              <span className="text-2xl text-slate-400">
                <MdPerson />
              </span>
            )}
          </DropdownMenu.Trigger>
          <DropdownMenu.Portal>
            <UserDropdownContent align="end" side="bottom" />
          </DropdownMenu.Portal>
        </DropdownMenu.Root>
      ) : (
        <div className="h-10 w-10 rounded-md bg-slate-200" />
      )}
    </header>
  );
}

function Overaly({
  onSidebarOpenChange,
  sidebarOpen,
}: {
  sidebarOpen?: boolean;
  onSidebarOpenChange: (value: boolean) => void;
}) {
  return (
    <div
      className={clsx(
        "absolute inset-0 z-30 bg-black/50 transition-opacity lg:pointer-events-none lg:hidden",
        sidebarOpen
          ? "pointer-events-auto opacity-100"
          : "pointer-events-none opacity-0"
      )}
      onClick={() => onSidebarOpenChange(false)}
    />
  );
}
