import supabase from "@/libs/supabase";

export const fetchProfileAsync = async (id: string) => {
  const { data, error } = await supabase
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
