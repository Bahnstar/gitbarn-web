"use server"

import { createClient } from "@/utils/supabase/server"
import { PostgrestSingleResponse } from "@supabase/supabase-js"
import { Message } from "@/types/message"

const supabase = createClient()

export const getConversationMessages = async (
  conversationId: string,
): Promise<PostgrestSingleResponse<Message[]>> => {
  return await supabase
    .from("Messages")
    .select("*")
    .eq("conversation_id", conversationId)
    .order("created_at", { ascending: true })
}
