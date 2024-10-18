"use server"

import { createClient } from "@/utils/supabase/server"
import { PostgrestSingleResponse } from "@supabase/supabase-js"
import { Message } from "@/types/message"

export const getConversationMessages = async (
  conversationId: string,
): Promise<PostgrestSingleResponse<Message[]>> => {
  const supabase = createClient()
  return await supabase
    .from("Messages")
    .select("*")
    .eq("conversation_id", conversationId)
    .order("created_at", { ascending: true })
}

export const createMessage = async (
  conversationId: string,
  userId: string,
  text: string,
): Promise<PostgrestSingleResponse<Message>> => {
  const supabase = createClient()
  return await supabase
    .from("Messages")
    .insert({
      conversation_id: conversationId,
      user_id: userId,
      text: text,
    })
    .select()
    .single()
}
