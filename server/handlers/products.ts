"use server"

import { Product } from "@/types/product"
import { createClient } from "@/utils/supabase/server"
import { PostgrestSingleResponse } from "@supabase/supabase-js"
import { manageTigerProduct } from "./tiger"

export const getProducts = async (
  showAll?: boolean,
): Promise<PostgrestSingleResponse<Product[]>> => {
  const supabase = createClient()

  if (showAll) return await supabase.from("Products").select("*")

  return await supabase.from("Products").select("*").eq("status", "Public")
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
  const res = await manageTigerProduct(product, "add_product")
  const newProduct = {
    ...product,
    tiger_id: res.product_id,
  }
  return await supabase.from("Products").insert([newProduct]).select().limit(1).single()
}

export const updateProduct = async (
  id: string,
  product: Partial<Product>,
): Promise<PostgrestSingleResponse<Product>> => {
  const supabase = createClient()
  const res = await manageTigerProduct(product, "update_product")
  console.log(res, product)
  return await supabase.from("Products").update(product).eq("id", id).select().single()
}

export const deleteProduct = async (id: string, tiger_id: number): Promise<void> => {
  const supabase = createClient()
  await manageTigerProduct({ tiger_id: tiger_id }, "delete_product")
  await supabase.from("Products").delete().eq("id", id)
}
