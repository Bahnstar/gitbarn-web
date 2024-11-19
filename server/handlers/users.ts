"use server"

import { createClient } from "@/utils/supabase/server"
import { cache } from "react"
import { getProfile } from "./profiles"

export const getCurrentUser = cache(async () => {
  const supabase = createClient()

  return await supabase.auth.getUser()
})

export const getUserWithProfile = cache(async () => {
  const supabase = createClient()

  const { data: supData } = await supabase.auth.getUser()
  return await getProfile(supData.user!.id)
})
