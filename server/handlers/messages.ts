"use server"

import { createClient } from "@/utils/supabase/server"
import { getCurrentUser } from "./users"
import { PostgrestSingleResponse } from "@supabase/supabase-js"
import { Message } from "@/types/message"

const supabase = createClient()

export const getConversationMessages = async (
    conversationId: string,
): Promise<PostgrestSingleResponse<Message[]>> => {
    return await supabase.from("Messages").select("*").eq("conversation_id", conversationId)
}
