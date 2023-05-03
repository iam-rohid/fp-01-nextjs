import SellerMapTabs from "./SellerMapTabs";
import { createServerComponentSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { cookies, headers } from "next/headers";
import { Database } from "@/types/database";

export const revalidate = 60 * 60; // revalidate this page every 1 hour

export const metadata = {
  title: "Seller Map",
};

const fetchData = async () => {
  const supabase = createServerComponentSupabaseClient<Database>({
    headers,
    cookies,
  });

  return supabase
    .from("sellers")
    .select("id,estimate_sales,latitude,longitude,name");
};

export type SellersResponse = Awaited<ReturnType<typeof fetchData>>;

export default async function SellerMap() {
  const { data } = await fetchData();
  return (
    <SellerMapTabs
      sellers={(data || []).map((seller) => ({
        id: seller.id,
        estimate_sales: seller.estimate_sales || 0,
        latitude: seller.latitude || 0,
        longitude: seller.longitude || 0,
        name: seller.name || "Unknown",
      }))}
    />
  );
}
