import { Profile } from "@/types/profile"
import { createClient } from "@/utils/supabase/server"
import { PostgrestSingleResponse } from "@supabase/supabase-js"

export const getProfiles = async () => {
  const supabase = createClient()
  return await supabase.from("profiles").select("*")
}

export const getProfile = async (profileId: string) => {
  const supabase = createClient()
  return await supabase.from("profiles").select("*").eq("id", profileId)
}

export const updateProfile = async (
  profileId: string,
  profile: Partial<Profile>,
): Promise<PostgrestSingleResponse<Profile>> => {
  const supabase = createClient()
  return await supabase.from("profiles").update(profile).eq("id", profileId).select().single()
}
