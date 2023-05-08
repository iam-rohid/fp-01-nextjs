import supabaseClient from "@/libs/supabaseClient";

export const fetchProfileAsync = async (id: string) => {
  const { data, error } = await supabaseClient
    .from("profiles")
    .select("*")
    .eq("id", id)
    .single();
  if (error) {
    throw error;
  }
  if (!data) {
    throw "Profile not found!";
  }

  return data;
};
