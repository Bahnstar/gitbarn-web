"use server"

import { Product } from "@/types/product"
import { createClient } from "@/utils/supabase/server"
import { PostgrestSingleResponse } from "@supabase/supabase-js"

export const getProducts = async (): Promise<PostgrestSingleResponse<Product[]>> => {
  const supabase = createClient()
  return await supabase.from("Products").select("*")
}

export const getProductsById = async (id: string): Promise<PostgrestSingleResponse<Product[]>> => {
  const supabase = createClient()
  return await supabase.from("Products").select("*").eq("id", id)
}

export const getProductsByTitle = async (
  title: string,
): Promise<PostgrestSingleResponse<Product[]>> => {
  const supabase = createClient()
  return await supabase.from("Products").select("*").eq("title", title)
}

export const createProduct = async (
  product: Product,
): Promise<PostgrestSingleResponse<Product>> => {
  const supabase = createClient()
  return await supabase.from("Products").insert([product]).select().limit(1).single()
}

export const updateProduct = async (
  id: string,
  product: Partial<Product>,
): Promise<PostgrestSingleResponse<Product[]>> => {
  const supabase = createClient()
  return await supabase.from("Products").update(product).eq("id", id).select()
}

export const deleteProduct = async (id: string): Promise<void> => {
  const supabase = createClient()
  await supabase.from("Products").delete().eq("id", id)
}
