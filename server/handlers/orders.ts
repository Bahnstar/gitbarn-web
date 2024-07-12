"use server"

import { Order } from "@/types/order"
import { createClient } from "@/utils/supabase/server"
import { PostgrestSingleResponse } from "@supabase/supabase-js"


export const getOrders = async (): Promise<PostgrestSingleResponse<Order[]>> => {
  const supabase = createClient()
  return await supabase.from("Orders").select("*")
}

export const getOrderById = async (id: string): Promise<PostgrestSingleResponse<Order[]>> => {
  const supabase = createClient()
  return await supabase.from("Orders").select("*").eq("id", id)
}

export const getOrderByUserId = async (
  userId: string,
): Promise<PostgrestSingleResponse<Order[]>> => {
  const supabase = createClient()
  return await supabase.from("Orders").select("*").eq("user_id", userId)
}

export const createOrder = async (
  order: Partial<Order>,
): Promise<PostgrestSingleResponse<Order[]>> => {
  const supabase = createClient()
  return await supabase.from("Orders").insert([order]).select()
}

export const updateOrder = async (
  id: string,
  order: Partial<Order>,
): Promise<PostgrestSingleResponse<Order[]>> => {
  const supabase = createClient()
  return await supabase.from("Orders").update(order).eq("id", id).select()
}

export const deleteOrder = async (id: string): Promise<void> => {
  const supabase = createClient()
  await supabase.from("Orders").delete().eq("id", id)
}
