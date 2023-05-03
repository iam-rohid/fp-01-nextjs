import supabase from "@/libs/supabase";

export const fetchSellerList = async () => {
  const { data, error } = await supabase.from("sellers").select("*");
  if (error) {
    throw error;
  }
  return data;
};
