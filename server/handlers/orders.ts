"use server"

import { Order } from "@/types/order"
import { createClient } from "@/utils/supabase/server"

const supabase = createClient()

export const getOrders = async () => {
    return await supabase.from("Orders").select("*")
}

export const getOrderById = async (id: string) => {
    return await supabase.from("Orders").select("*").eq("id", id)
}

export const getOrderByUserId = async (userId: string) => {
    return await supabase.from("Orders").select("*").eq("user_id", userId)
}

export const createOrder = async (order: Partial<Order>) => {
    return await supabase.from("Orders").insert([order]).select()
}

export const updateOrder = async (id: string, order: Partial<Order>) => {
    return await supabase.from("Orders").update(order).eq("id", id).select()
}

export const deleteOrder = async (id: string) => {
    return await supabase.from("Orders").delete().eq("id", id)
}
