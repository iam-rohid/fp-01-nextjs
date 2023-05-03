import { fetchSellerList } from "@/service/seller-list";
import SellerMapTabs from "./SellerMapTabs";

export const revalidate = 60 * 60; // revalidate this page every 1 hour

export const metadata = {
  title: "Seller Map",
};

export default async function SellerMap() {
  const sellers = await fetchSellerList();

  return <SellerMapTabs sellers={sellers} />;
}
