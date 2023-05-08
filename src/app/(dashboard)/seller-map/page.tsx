import RenderMap from "./RenderMap";
import { APP_NAME } from "@/utils/constant";
import serverSupabase from "@/libs/serverSupabase";

export const metadata = {
  title: `Seller Map - ${APP_NAME}`,
};

export default async function SellerMapPage() {
  const { data } = await serverSupabase()
    .from("sellers")
    .select("id,estimate_sales,latitude,longitude,name");

  const sellers = (data || []).map((seller) => ({
    id: seller.id,
    estimate_sales: seller.estimate_sales || 0,
    latitude: seller.latitude || 0,
    longitude: seller.longitude || 0,
    name: seller.name || "Unknown",
  }));

  return <RenderMap sellers={sellers} />;
}
