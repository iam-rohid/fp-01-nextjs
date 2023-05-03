"use client";

import { useQuery } from "@tanstack/react-query";
import { SellerListItem } from "@/types";
import { useCallback, useState } from "react";
import SellerDetails from "@/components/SellerDetails";
import { MdMap, MdStore } from "react-icons/md";
import CircularProgress from "@/components/CircularProgress";
import Tab from "@/components/Tab";
import Map from "./Map";
import { fetchSellerList } from "@/service/seller-list";

export default function SellerMap() {
  const { isLoading, isError, data, refetch } = useQuery(
    ["seller-list"],
    () => fetchSellerList(),
    {
      refetchInterval: false,
      refetchOnWindowFocus: false,
    }
  );
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

  if (isError) {
    return (
      <div>
        <p>Something went wrong!</p>
        <button onClick={() => refetch()}>Retry</button>
      </div>
    );
  }

  return (
    <div className="flex h-full w-full flex-col">
      <div className="h-12 overflow-x-auto overflow-y-hidden border-b border-slate-200 bg-white">
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
      <div className="relative flex-1" hidden={"map" !== tabId}>
        <Map data={data || []} onItemClick={onItemClick} />
        {isLoading && (
          <div className="absolute inset-0 z-40 flex items-center justify-center bg-black/20">
            <div className="z-50 flex h-20 w-20 items-center justify-center rounded-xl border border-slate-200 bg-white shadow-xl">
              <CircularProgress />
            </div>
          </div>
        )}
      </div>
      {selectedSellers.map((seller) => (
        <div
          key={seller.id}
          className="flex-1 overflow-hidden"
          hidden={seller.id.toString() !== tabId}
        >
          <SellerDetails sellerId={seller.id} />
        </div>
      ))}
    </div>
  );
}
