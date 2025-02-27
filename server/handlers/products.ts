"use server"

import { Product } from "@/types/product"
import { createClient } from "@/utils/supabase/server"
import { PostgrestSingleResponse } from "@supabase/supabase-js"
import { manageTigerProduct } from "./tiger"
import { cache } from "react"

export const getProducts = cache(
  async (showAll?: boolean): Promise<PostgrestSingleResponse<Product[]>> => {
    const supabase = await createClient()

    if (showAll) return await supabase.from("Products").select("*")

    return await supabase.from("Products").select("*").eq("status", "Public")
  },
)

export const getProductsById = async (id: string): Promise<PostgrestSingleResponse<Product[]>> => {
  const supabase = await createClient()
  return await supabase.from("Products").select("*").eq("id", id)
}

export const getProductsBySku = cache(
  async (sku: string): Promise<PostgrestSingleResponse<Product[]>> => {
    const supabase = await createClient()
    return await supabase.from("Products").select("*").eq("sku", sku)
  },
)

export const getProductsByTitle = async (
  title: string,
): Promise<PostgrestSingleResponse<Product[]>> => {
  const supabase = await createClient()
  return await supabase.from("Products").select("*").eq("title", title)
}

export const createProduct = async (
  product: Product,
): Promise<PostgrestSingleResponse<Product>> => {
  const supabase = await createClient()
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
  const supabase = await createClient()
  const res = await manageTigerProduct(product, "update_product")
  console.log(res, product)
  return await supabase.from("Products").update(product).eq("id", id).select().single()
}

export const deleteProduct = async (id: string, tiger_id: number): Promise<string> => {
  const supabase = await createClient()

  console.log("ids", id, tiger_id)

  const res = await Promise.allSettled([
    manageTigerProduct({ tiger_id: tiger_id }, "delete_product"),
    supabase.from("Products").delete().eq("id", id),
  ])

  console.log(res)

  const badResults = res.filter((r) => r.status === "rejected")

  if (badResults.length > 0) return "error"

  return "success"
}
