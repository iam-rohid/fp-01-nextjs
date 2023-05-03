"use client";

import { SellerListItem } from "@/types";
import React, { ReactNode, useCallback, useState } from "react";
import Map from "./Map";
import { MdMap, MdStore } from "react-icons/md";
import Tab from "@/components/Tab";
import SellerDetails from "@/components/SellerDetails";

export default function SellerMapTabs({
  sellers,
}: {
  sellers: SellerListItem[];
}) {
  const [selectedSellers, setSelectedSellers] = useState<SellerListItem[]>([]);
  const [tabId, setTabId] = useState("map");
  const onItemClick = useCallback((seller: SellerListItem) => {
    setSelectedSellers((sellers) =>
      sellers.findIndex((item) => item.id === seller.id) === -1
        ? [...sellers, seller]
        : sellers
    );
    setTabId(seller.id.toString());
  }, []);

  const onTabClose = useCallback(
    (sellerId: string) => {
      if (tabId === sellerId) {
        setTabId("map");
      }
      setSelectedSellers((sellers) =>
        sellers.filter((seller) => seller.id.toString() !== sellerId)
      );
    },
    [tabId]
  );

  return (
    <div className="flex h-full w-full flex-col">
      <div className="h-14 overflow-x-auto overflow-y-hidden border-b border-slate-200 bg-white">
        <div className="flex h-full">
          <Tab
            onClick={setTabId}
            value="map"
            label="Map"
            icon={<MdMap />}
            selectedTab={tabId}
          />
          {selectedSellers.map((seller) => (
            <Tab
              key={seller.id}
              onClick={setTabId}
              onClose={onTabClose}
              value={seller.id.toString()}
              label={seller.name}
              icon={<MdStore />}
              selectedTab={tabId}
            />
          ))}
        </div>
      </div>

      <TabPanel tabId={"map"} selectedTabId={tabId}>
        <Map sellers={sellers} onItemClick={onItemClick} />
      </TabPanel>
      {selectedSellers.map((seller) => (
        <TabPanel
          key={seller.id}
          tabId={seller.id.toString()}
          selectedTabId={tabId}
        >
          <SellerDetails sellerId={seller.id} />
        </TabPanel>
      ))}
    </div>
  );
}

const TabPanel = ({
  tabId,
  selectedTabId,
  children,
}: {
  children: ReactNode;
  tabId: string;
  selectedTabId: string;
}) => {
  return (
    <div
      className="relative flex-1 overflow-hidden"
      hidden={selectedTabId !== tabId}
    >
      {children}
    </div>
  );
};
