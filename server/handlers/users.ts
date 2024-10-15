"use server"

import { createClient } from "@/utils/supabase/server"
import { cache } from "react"

export const getCurrentUser = cache(async () => {
  const supabase = createClient()

  return await supabase.auth.getUser()
})
