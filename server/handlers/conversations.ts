"use server"

import { Conversation } from "@/types/conversation"
import { createClient } from "@/utils/supabase/server"
import { PostgrestSingleResponse } from "@supabase/supabase-js"
import { sendNewChatEmail } from "./emails"

export const getConversations = async (): Promise<PostgrestSingleResponse<Conversation[]>> => {
  const supabase = createClient()
  return await supabase.from("Conversations").select("*")
}

export const getRecentConversations = async (
  n: number,
): Promise<PostgrestSingleResponse<Conversation[]>> => {
  const supabase = createClient()
  // also get the user email
  return await supabase
    .from("Conversations")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(n)
}

export const getConversationsByCustomerId = async (
  userId: string,
): Promise<PostgrestSingleResponse<Conversation[]>> => {
  const supabase = createClient()
  return await supabase
    .from("Conversations")
    .select("*")
    .eq("customer_id", userId)
    .order("created_at", { ascending: false })
}

export const getConversationsBySupportId = async (
  userId: string,
): Promise<PostgrestSingleResponse<Conversation[]>> => {
  const supabase = createClient()
  return await supabase.from("Conversations").select("*").eq("support_id", userId)
}

export const getLastActiveConversationByCustomerId = async (
  userId: string,
): Promise<PostgrestSingleResponse<Conversation>> => {
  const supabase = createClient()
  return await supabase
    .from("Conversations")
    .select("*")
    .eq("customer_id", userId)
    .order("created_at", { ascending: false })
    .limit(1)
    .single()
}

export const getLastActiveConversationBySupportId = async (
  userId: string,
): Promise<PostgrestSingleResponse<Conversation>> => {
  const supabase = createClient()
  return await supabase
    .from("Conversations")
    .select("*")
    .eq("support_id", userId)
    .order("created_at", { ascending: false })
    .limit(1)
    .single()
}

export const getConversationById = async (
  id: string,
): Promise<PostgrestSingleResponse<Conversation>> => {
  const supabase = createClient()
  return await supabase.from("Conversations").select("*").eq("id", id).limit(1).single()
}

export const createConversation = async (
  conversation: Conversation,
): Promise<PostgrestSingleResponse<Conversation>> => {
  const supabase = createClient()

  const newConversation = await supabase
    .from("Conversations")
    .insert([conversation])
    .select()
    .limit(1)
    .single()

  if (process.env.ENVIRONMENT !== "development") {
    // TODO: send to all users with support role
    await sendNewChatEmail(newConversation.data.title, newConversation.data.id)
  }
  return newConversation
}

export const updateConversation = async (
  id: string,
  conversation: Partial<Conversation>,
): Promise<PostgrestSingleResponse<Conversation>> => {
  const supabase = createClient()
  return await supabase
    .from("Conversations")
    .update(conversation)
    .eq("id", id)
    .select()
    .limit(1)
    .single()
}

export const deleteConversation = async (id: string): Promise<void> => {
  const supabase = createClient()
  await supabase.from("Conversations").delete().eq("id", id)
}
