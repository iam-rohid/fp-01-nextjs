import serverSupabase from "@/libs/serverSupabase";
import Header from "./Header";
import { notFound } from "next/navigation";
import SellerDetails from "@/components/SellerDetails";

type Props = {
  params: { sellerId: string };
};

export const generateMetadata = async ({ params: { sellerId } }: Props) => {
  const { data } = await serverSupabase()
    .from("sellers")
    .select("name")
    .eq("id", sellerId)
    .single()
    .throwOnError();
  return {
    title: data?.name || "Unknown Seller",
  };
};

export default async function Seller({ params: { sellerId } }: Props) {
  const { data: seller } = await serverSupabase()
    .from("sellers")
    .select("*")
    .eq("id", sellerId)
    .single()
    .throwOnError();

  if (!seller) {
    notFound();
  }

  return (
    <div className="h-full w-full overflow-y-auto">
      <Header title={seller.name || "Unknown Seller"} />

      <SellerDetails seller={seller} />
    </div>
  );
}
