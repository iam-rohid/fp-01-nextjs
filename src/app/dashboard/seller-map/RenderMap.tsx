"use client";

import { SellerMap, Seller } from "@/components/SellerMap";
import { useRouter } from "next/navigation";
import React, { useCallback } from "react";

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
