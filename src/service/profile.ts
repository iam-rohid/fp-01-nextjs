import supabase from "@/libs/supabase";
import { IProfile } from "@/types/profile";

export const fetchProfileAsync = async (
  profileId?: string
): Promise<IProfile> => {
  if (!profileId) throw "profileId is required";

  const { data, error } = await supabase
    .from("profiles")
    .select("id,created_at,first_name,last_name,email")
    .eq("id", profileId)
    .single();
  if (error) {
    throw error;
  }
  if (!data) {
    throw "Profile not found!";
  }

  return data;
};
