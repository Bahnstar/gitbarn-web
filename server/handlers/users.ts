"use server"

import { createClient } from "@/utils/supabase/server"

export const getCurrentUser = async () => {
    const supabase = createClient()
    
    return await supabase.auth.getUser()
}
