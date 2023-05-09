import { ReactNode } from "react";

export default function TabPanel({
  tabId,
  selectedTabId,
  children,
}: {
  children: ReactNode;
  tabId: string;
  selectedTabId: string;
}) {
  return (
    <div
      className="absolute inset-0 z-30 overflow-hidden bg-slate-50"
      hidden={selectedTabId !== tabId}
    >
      {children}
    </div>
  );
}
