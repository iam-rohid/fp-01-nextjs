import { createServerComponentSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { cookies, headers } from "next/headers";
import { Database } from "@/types/database";
import RenderMap from "./RenderMap";

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

export default async function SellerMapPage() {
  const { data } = await fetchData();
  const sellers = (data || []).map((seller) => ({
    id: seller.id,
    estimate_sales: seller.estimate_sales || 0,
    latitude: seller.latitude || 0,
    longitude: seller.longitude || 0,
    name: seller.name || "Unknown",
  }));

  return <RenderMap sellers={sellers} />;
}
