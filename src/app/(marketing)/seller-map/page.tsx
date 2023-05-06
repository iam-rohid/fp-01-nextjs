import { Database } from "@/types/database";
import { createServerComponentSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { Metadata } from "next";
import dynamic from "next/dynamic";
import { headers, cookies } from "next/headers";
import { redirect } from "next/navigation";

const SellerMap = dynamic(() => import("@/components/SellerMap/SellerMap"), {
  ssr: false,
});

export const metadata: Metadata = {
  title: "Seller Map",
};

export default async function PublicSellerMap() {
  const supabase = createServerComponentSupabaseClient<Database>({
    headers,
    cookies,
  });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    redirect("/dashboard/seller-map");
  }

  const { data } = await supabase
    .from("sellers")
    .select("id,estimate_sales,latitude,longitude,name")
    .throwOnError();

  const sellers = (data || []).map((seller) => ({
    id: seller.id,
    estimate_sales: seller.estimate_sales || 0,
    latitude: seller.latitude || 0,
    longitude: seller.longitude || 0,
    name: seller.name || "Unknown",
  }));

  return (
    <div className="h-[calc(100vh-4rem)] w-full overflow-hidden">
      <SellerMap sellers={sellers} />
    </div>
  );
}
