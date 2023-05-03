"use client";

import {
  MdPerson,
  MdLogout,
  MdMap,
  MdHome,
  MdPayments,
  MdAutoAwesome,
  MdMoreHoriz,
  MdStore,
  MdMenu,
} from "react-icons/md";
import { useQuery } from "@tanstack/react-query";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import clsx from "clsx";
import { Fragment, ReactNode, useState } from "react";
import Link from "next/link";
import { fetchProfileAsync } from "@/api/profile";
import { useAuth } from "@/hooks/useAuth";
import { usePathname } from "next/navigation";
import { APP_ROOT_ROUTE } from "@/utils/constant";

export default function SideBar() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <Fragment>
      <Header sidebarOpen={sidebarOpen} onSidebarOpenChange={setSidebarOpen} />
      <Overaly sidebarOpen={sidebarOpen} onSidebarOpenChange={setSidebarOpen} />
      <aside
        className={clsx(
          "absolute bottom-0 top-0 z-40 flex w-64 flex-col border-r border-slate-200 bg-white transition-[left] lg:left-0",
          sidebarOpen ? "left-0" : "-left-64"
        )}
      >
        <SidebarHeader />
        <SidebarList />
        <SidebarFooter />
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
          href={APP_ROOT_ROUTE}
          icon={<MdHome />}
          isActive={pathname === APP_ROOT_ROUTE}
        >
          Home
        </ListItemLink>
      </nav>
      <p className="mb-2 mt-8 px-4 text-sm uppercase text-slate-400">Tools</p>
      <nav className="space-y-px">
        <ListItemLink
          href={`${APP_ROOT_ROUTE}/sellers`}
          icon={<MdStore />}
          isActive={pathname.startsWith(`${APP_ROOT_ROUTE}/sellers`)}
        >
          Sellers
        </ListItemLink>
        <ListItemLink
          href={`${APP_ROOT_ROUTE}/seller-map`}
          icon={<MdMap />}
          isActive={pathname.startsWith(`${APP_ROOT_ROUTE}/seller-map`)}
        >
          Seller Map
        </ListItemLink>
      </nav>
    </div>
  );
};

const SidebarHeader = () => (
  <header className="flex items-center p-4">
    <Link
      href={APP_ROOT_ROUTE}
      className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-500 text-xl font-bold text-white"
    >
      S
    </Link>
  </header>
);

const UserDropdownContent = ({
  align,
  side,
}: {
  align?: "center" | "start" | "end";
  side?: "top" | "right" | "bottom" | "left";
}) => {
  const { signOut } = useAuth();

  return (
    <DropdownMenu.Content
      align={align}
      side={side}
      className="z-50 rounded-xl border border-slate-200 bg-white p-2 shadow-xl"
    >
      <DropdownMenu.Item asChild>
        <Link
          href={`${APP_ROOT_ROUTE}/account`}
          className="flex w-full rounded-md px-4 py-2 outline-none focus:bg-slate-100 focus:text-slate-900"
        >
          <span className="mr-4 text-2xl">
            <MdPerson />
          </span>
          Account
        </Link>
      </DropdownMenu.Item>
      <DropdownMenu.Item asChild>
        <Link
          href={`${APP_ROOT_ROUTE}/subscription`}
          className="flex w-full rounded-md px-4 py-2 outline-none focus:bg-slate-100 focus:text-slate-900"
        >
          <span className="mr-4 text-2xl">
            <MdAutoAwesome />
          </span>
          Subscription
        </Link>
      </DropdownMenu.Item>
      <DropdownMenu.Item asChild>
        <Link
          href={`${APP_ROOT_ROUTE}/billing`}
          className="flex w-full rounded-md px-4 py-2 outline-none focus:bg-slate-100 focus:text-slate-900"
        >
          <span className="mr-4 text-2xl">
            <MdPayments />
          </span>
          Billing
        </Link>
      </DropdownMenu.Item>
      <DropdownMenu.Separator className="my-2 h-px bg-slate-200" />
      <DropdownMenu.Item asChild>
        <button
          onClick={signOut}
          className="flex w-full items-center rounded-md px-4 py-2 text-red-400 outline-none focus:bg-red-500/5 focus:text-red-500"
        >
          <span className="mr-4 text-2xl">
            <MdLogout />
          </span>
          Sign Out
        </button>
      </DropdownMenu.Item>
    </DropdownMenu.Content>
  );
};

const SidebarFooter = () => {
  const { user } = useAuth();
  const { data, isLoading } = useQuery(["profile", user?.id], ({ queryKey }) =>
    fetchProfileAsync(queryKey[1])
  );

  if (isLoading) {
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
          {data?.avatar_url ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={data.avatar_url}
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
          <p className="truncate font-medium text-slate-900">{`${data?.first_name} ${data?.last_name}`}</p>
          <p className="truncate text-xs">{data?.email}</p>
        </div>
        <span className="text-2xl">
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
          : "hover:bg-slate-100 hover:text-slate-900"
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
}: {
  sidebarOpen?: boolean;
  onSidebarOpenChange: (value: boolean) => void;
}) {
  return (
    <header className="absolute left-0 right-0 top-0 flex h-14 items-center border-b border-slate-200 bg-white px-4 lg:hidden">
      <button
        onClick={() => onSidebarOpenChange(!sidebarOpen)}
        className="flex h-10 w-10 items-center justify-center rounded-md text-2xl text-slate-600 hover:bg-slate-100 hover:text-slate-900"
      >
        <MdMenu />
      </button>
      <div className="flex-1"></div>
      <DropdownMenu.Root>
        <DropdownMenu.Trigger className="flex h-10 w-10 items-center justify-center rounded-md text-2xl text-slate-600 hover:bg-slate-100 hover:text-slate-900">
          <MdPerson />
        </DropdownMenu.Trigger>
        <DropdownMenu.Portal>
          <UserDropdownContent align="end" side="bottom" />
        </DropdownMenu.Portal>
      </DropdownMenu.Root>
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
