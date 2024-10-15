"use server"

import { createClient } from "@/utils/supabase/server"
import { cache } from "react"

export const getCurrentUser = cache(async () => {
  const supabase = createClient()
  console.log("getting user")

  return await supabase.auth.getUser()
})
