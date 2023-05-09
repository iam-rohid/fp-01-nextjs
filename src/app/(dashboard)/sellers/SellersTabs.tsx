"use client";

import { Database } from "@/types/database";
import SellerTable from "./SellerTable";
import Tab from "@/components/Tab";
import { MdStore } from "react-icons/md";
import { useCallback, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import TabPanel from "@/components/TabPanel";
import SellerDetails from "@/components/SellerDetails";

type Seller = Database["public"]["Tables"]["sellers"]["Row"];
type TabProps = { id: string; label?: string };

const SELLERS_TAB_ID = "sellers";

export default function SellersTabs({
  sellers,
  tabId: initTabId,
  tabLabel,
}: {
  sellers: Seller[];
  tabId?: string;
  tabLabel?: string;
}) {
  const [selectedSellers, setSelectedSellers] = useState<TabProps[]>([
    ...(initTabId ? [{ id: initTabId, label: tabLabel }] : []),
  ]);
  const [tabId, setTabId] = useState(initTabId || SELLERS_TAB_ID);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const onItemClick = useCallback(
    (seller: TabProps) => {
      setSelectedSellers((items) =>
        items.findIndex((item) => item.id === seller.id) === -1
          ? [...items, seller]
          : items
      );
      setTabId(seller.id.toString());
      const params = new URLSearchParams(
        searchParams as unknown as URLSearchParams
      );
      params.set("tabId", seller.id.toString());
      if (seller.label) params.set("tabLabel", seller.label);

      const url = pathname + "?" + params.toString();
      router.push(url);
    },
    [pathname, router, searchParams]
  );

  const onMapTabClick = useCallback(() => {
    setTabId(SELLERS_TAB_ID);
    router.push("/sellers");
  }, [router]);

  const onTabClose = useCallback(
    (sellerId: string) => {
      if (tabId === sellerId) {
        setTabId(SELLERS_TAB_ID);
        router.push("/sellers");
      }
      setSelectedSellers((sellers) =>
        sellers.filter((seller) => seller.id.toString() !== sellerId)
      );
    },
    [router, tabId]
  );

  return (
    <div className="flex h-full w-full flex-col overflow-hidden">
      <div className="h-14 overflow-x-auto overflow-y-hidden border-b border-slate-200 bg-white">
        <div className="flex h-full">
          <Tab
            onClick={() => onMapTabClick()}
            value={SELLERS_TAB_ID}
            label="Sellers"
            icon={<MdStore />}
            selectedTab={tabId}
          />
          {selectedSellers.map((seller) => (
            <Tab
              key={seller.id}
              onClick={() => onItemClick(seller)}
              onClose={onTabClose}
              value={seller.id.toString()}
              label={seller.label || "Unknown"}
              icon={<MdStore />}
              selectedTab={tabId}
            />
          ))}
        </div>
      </div>

      <div className="relative flex-1 overflow-hidden">
        <SellerTable
          sellers={sellers}
          onItemClick={(seller) =>
            onItemClick({
              id: seller.id.toString(),
              label: seller.name || undefined,
            })
          }
        />

        {selectedSellers.map((seller) => (
          <TabPanel
            key={seller.id}
            tabId={seller.id.toString()}
            selectedTabId={tabId}
          >
            <SellerDetails sellerId={seller.id.toString()} />
          </TabPanel>
        ))}
      </div>
    </div>
  );
}
