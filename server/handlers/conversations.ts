"use server"

import { Conversation } from "@/types/conversation"
import { createClient } from "@/utils/supabase/server"
import { PostgrestSingleResponse } from "@supabase/supabase-js"

const supabase = createClient()

export const getConversations = async (): Promise<PostgrestSingleResponse<Conversation[]>> => {
    return await supabase.from("conversations").select("*")
}

export const getConversationsByCustomerId = async (
    userId: string,
): Promise<PostgrestSingleResponse<Conversation[]>> => {
    return await supabase.from("conversations").select("*").eq("customer_id", userId)
}

export const getConversationsBySupportId = async (
    userId: string,
): Promise<PostgrestSingleResponse<Conversation[]>> => {
    return await supabase.from("conversations").select("*").eq("support_id", userId)
}

export const getLastActiveConversationByCustomerId = async (
    userId: string,
): Promise<PostgrestSingleResponse<Conversation[]>> => {
    return await supabase
        .from("conversations")
        .select("*")
        .eq("customer_id", userId)
        .order("created_at", { ascending: false })
        .limit(1)
}

export const getLastActiveConversationBySupportId = async (
    userId: string,
): Promise<PostgrestSingleResponse<Conversation[]>> => {
    return await supabase
        .from("conversations")
        .select("*")
        .eq("support_id", userId)
        .order("created_at", { ascending: false })
        .limit(1)
}

export const getConversationById = async (
    id: string,
): Promise<PostgrestSingleResponse<Conversation[]>> => {
    return await supabase.from("conversations").select("*").eq("id", id)
}

export const createConversation = async (
    conversation: Conversation,
): Promise<PostgrestSingleResponse<Conversation[]>> => {
    return await supabase.from("conversations").insert([conversation]).select()
}

export const updateConversation = async (
    id: string,
    conversation: Partial<Conversation>,
): Promise<PostgrestSingleResponse<Conversation[]>> => {
    return await supabase.from("conversations").update(conversation).eq("id", id).select()
}

export const deleteConversation = async (id: string): Promise<void> => {
    await supabase.from("conversations").delete().eq("id", id)
}
