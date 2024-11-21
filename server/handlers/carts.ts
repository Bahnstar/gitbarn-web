"use server"

import { Cart, CartItem, CartWithTotal } from "@/types/cart"
import { createClient } from "@/utils/supabase/server"
import { PostgrestSingleResponse } from "@supabase/supabase-js"

export const getCarts = async (userId: string): Promise<PostgrestSingleResponse<Cart[]>> => {
  const supabase = createClient()
  return await supabase.from("Carts").select("*").eq("user_id", userId)
}

export const getCartsWithProducts = async (): Promise<PostgrestSingleResponse<Cart[]>> => {
  const supabase = createClient()
  return await supabase.from("Carts").select("*, Products(*)")
}

export const getCartsById = async (
  id: string,
  isProductId?: boolean,
): Promise<PostgrestSingleResponse<Cart[]>> => {
  const supabase = createClient()
  if (isProductId) return await supabase.from("Carts").select("*").eq("product_id", id)
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

export const deleteAllCarts = async (user_id: string): Promise<void> => {
  const supabase = createClient()
  await supabase.from("Carts").delete().eq("user_id", user_id)
}

export const getCartWithTotal = async (): Promise<CartWithTotal> => {
  const { data, error } = await getCartsWithProducts()
  if (error) throw Error("There was a problem retrieving cart items")

  const cartItems: CartItem[] = data!.map((c) => ({
    ...c.Products!,
    cartId: c.id,
    quantity: c.quantity,
  }))

  let subtotal = 0
  cartItems && cartItems.forEach((item) => (subtotal += Number(item.amount) * item.quantity))

  const taxRate = 0.0
  const taxes = subtotal * taxRate
  const total = subtotal + taxes

  return {
    items: cartItems,
    subtotal: subtotal,
    taxRate: taxRate,
    taxes: taxes,
    total: total,
  }
}
