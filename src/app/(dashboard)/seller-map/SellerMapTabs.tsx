"use client";

import { type Seller } from "@/components/SellerMap";
import Tab from "@/components/Tab";
import dynamic from "next/dynamic";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useCallback, useState } from "react";
import TabPanel from "@/components/TabPanel";
import SellerDetails from "@/components/SellerDetails";
import { MapIcon, StoreIcon } from "lucide-react";

const SellerMap = dynamic(() => import("@/components/SellerMap/SellerMap"), {
  ssr: false,
});

type TabProps = { id: string; label?: string };

export default function SellerMapTabs({
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
  const [tabId, setTabId] = useState(initTabId || "map");
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
    setTabId("map");
    router.push("/seller-map");
  }, [router]);

  const onTabClose = useCallback(
    (sellerId: string) => {
      if (tabId === sellerId) {
        setTabId("map");
        router.push("/seller-map");
      }
      setSelectedSellers((sellers) =>
        sellers.filter((seller) => seller.id.toString() !== sellerId)
      );
    },
    [router, tabId]
  );

  return (
    <div className="flex h-full w-full flex-col overflow-hidden">
      <div className="overflow-x-auto overflow-y-hidden border-b bg-background">
        <div className="flex h-12">
          <Tab
            onClick={() => onMapTabClick()}
            value="map"
            label="Seller Map"
            icon={<MapIcon className="mr-2 h-5 w-5" />}
            selectedTab={tabId}
          />
          {selectedSellers.map((seller) => (
            <Tab
              key={seller.id}
              onClick={() => onItemClick(seller)}
              onClose={() => onTabClose(seller.id)}
              value={seller.id.toString()}
              label={seller.label || "Unknown"}
              icon={<StoreIcon className="mr-2 h-5 w-5" />}
              selectedTab={tabId}
            />
          ))}
        </div>
      </div>

      <div className="relative flex-1">
        <SellerMap
          sellers={sellers}
          onItemClick={(seller) =>
            onItemClick({
              id: seller.id.toString(),
              label: seller.name,
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
