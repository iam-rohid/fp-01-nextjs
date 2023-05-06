"use client";

import { type Seller } from "@/components/SellerMap";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import React, { useCallback } from "react";
const SellerMap = dynamic(() => import("@/components/SellerMap/SellerMap"), {
  ssr: false,
});

export default function RenderMap({ sellers }: { sellers: Seller[] }) {
  const router = useRouter();

  const onItemClick = useCallback(
    (seller: Seller) => {
      router.push(`/dashboard/seller-map/seller/${seller.id}`);
    },
    [router]
  );

  return (
    <SellerMap
      sellers={sellers}
      onItemClick={(seller) => onItemClick(seller)}
    />
  );
}
