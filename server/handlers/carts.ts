"use server"

import { Cart } from "@/types/cart"
import { createClient } from "@/utils/supabase/server"
import { PostgrestSingleResponse } from "@supabase/supabase-js"

export const getCarts = async (): Promise<PostgrestSingleResponse<Cart[]>> => {
  const supabase = createClient()

  return await supabase.from("Carts").select("*")
}

export const getCartsWithProducts = async (): Promise<PostgrestSingleResponse<Cart[]>> => {
  const supabase = createClient()
  return await supabase.from("Carts").select("*, Products(*)")
}

export const getCartsById = async (id: string): Promise<PostgrestSingleResponse<Cart[]>> => {
  const supabase = createClient()
  return await supabase.from("Carts").select("*").eq("id", id)
}

export const getCartsByTitle = async (title: string): Promise<PostgrestSingleResponse<Cart[]>> => {
  const supabase = createClient()
  return await supabase.from("Carts").select("*").eq("title", title)
}

export const createCart = async (Cart: Cart): Promise<PostgrestSingleResponse<Cart>> => {
  const supabase = createClient()
  return await supabase.from("Carts").insert([Cart]).select().limit(1).single()
}

export const updateCart = async (
  id: string,
  Cart: Partial<Cart>,
): Promise<PostgrestSingleResponse<Cart>> => {
  const supabase = createClient()
  return await supabase.from("Carts").update(Cart).eq("id", id).select().single()
}

export const deleteCart = async (id: string): Promise<void> => {
  const supabase = createClient()
  await supabase.from("Carts").delete().eq("id", id)
}
