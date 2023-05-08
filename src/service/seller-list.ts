import supabaseClient from "@/libs/supabaseClient";

export const fetchSellerList = async () => {
  const { data, error } = await supabaseClient.from("sellers").select("*");
  if (error) {
    throw error;
  }
  return data;
};
