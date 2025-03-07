"use server"

import { Profile, Role } from "@/types/profile"
import { createClient } from "@/utils/supabase/server"
import { PostgrestSingleResponse } from "@supabase/supabase-js"
import { cache } from "react"

export const getProfiles = cache(async () => {
  const supabase = await createClient()
  return await supabase.from("profiles").select("*")
})

export const getProfile = cache(
  async (profileId: string): Promise<PostgrestSingleResponse<Profile>> => {
    const supabase = await createClient()
    return await supabase.from("profiles").select("*").eq("id", profileId).single()
  },
)

export const getProfilesByEmail = cache(
  async (email: string): Promise<PostgrestSingleResponse<Profile[]>> => {
    const supabase = await createClient()
    return await supabase.from("profiles").select("*").like("email", `%${email}%`).limit(5)
  },
)

export const getAllCustomerProfiles = async (): Promise<PostgrestSingleResponse<Profile[]>> => {
  const supabase = await createClient()
  return await supabase.from("profiles").select("*").eq("role", Role.USER)
}

export const getAllSupportProfiles = async (): Promise<PostgrestSingleResponse<Profile[]>> => {
  const supabase = await createClient()
  return await supabase.from("profiles").select("*").eq("role", Role.SUPPORT)
}

export const getAllAdminProfiles = async (): Promise<PostgrestSingleResponse<Profile[]>> => {
  const supabase = await createClient()
  return await supabase.from("profiles").select("*").eq("role", Role.ADMIN)
}

export const getProfileByRole = async (role: Role): Promise<PostgrestSingleResponse<Profile[]>> => {
  const supabase = await createClient()
  return await supabase.from("profiles").select("*").eq("role", role)
}

export const updateProfile = async (
  profileId: string,
  profile: Partial<Profile>,
): Promise<PostgrestSingleResponse<Profile>> => {
  const supabase = await createClient()
  return await supabase.from("profiles").update(profile).eq("id", profileId).select().single()
}

export const searchProfiles = cache(
  async (search: string): Promise<PostgrestSingleResponse<Profile[]>> => {
    const supabase = await createClient()

    const formattedSearch = search.split(" ").join("' | '")
    return await supabase.from("profiles").select().textSearch("full_name", `'${formattedSearch}'`)
  },
)
