"use server"

import { Order } from "@/types/order"
import { createClient } from "@/utils/supabase/server"

const supabase = createClient()

export const getOrders = async () => {
    return await supabase.from("Orders").select("*")
    // return { data: orders.data, error: orders.error }
}

export const getOrderById = async (id: string) => {
    const order = await supabase.from("Orders").select("*").eq("id", id)
    return { data: order.data, error: order.error }
}

export const getOrderByUserId = async (userId: string) => {
    const order = await supabase.from("Orders").select("*").eq("user_id", userId)
    return { data: order.data, error: order.error }
}

export const createOrder = async (order: Partial<Order>) => {
    const newOrder = await supabase.from("Orders").insert([order]).select()
    return { data: newOrder.data, error: newOrder.error }
}

export const updateOrder = async (id: string, order: Partial<Order>) => {
    const updatedOrder = await supabase.from("Orders").update(order).eq("id", id).select()
    return { data: updatedOrder.data, error: updatedOrder.error }
}

export const deleteOrder = async (id: string) => {
    return await supabase.from("Orders").delete().eq("id", id)
}
