"use server"

import { createClient } from "@/utils/supabase/server"

const supabase = createClient()

export const getCurrentUser = async () => {
    return await supabase.auth.getUser()
}
