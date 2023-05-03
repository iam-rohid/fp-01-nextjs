import supabase from "@/libs/supabase";
import { SellerListItem } from "@/types";

export const fetchSellerList = async (): Promise<SellerListItem[]> => {
  const { data, error } = await supabase
    .from("sellers")
    .select("id,name,estimate_sales,geo_location");
  if (error) {
    throw error;
  }
  return data;
};
