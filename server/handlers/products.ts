"use server"

import { Product } from "@/types/product"
import { createClient } from "@/utils/supabase/server"

const supabase = createClient()

export const getProducts = async () => {
    return await supabase.from("Products").select("*")
}

export const getProductsById = async (id: string) => {
    return await supabase.from("Products").select("*").eq("id", id)
}

export const getProductsByTitle = async (title: string) => {
    return await supabase.from("Products").select("*").eq("title", title)
}

export const createProduct = async (product: Product) => {
    return await supabase.from("Products").insert([product]).select()
}

export const updateProduct = async (id: string, product: Partial<Product>) => {
    return await supabase.from("Products").update(product).eq("id", id).select()
}

export const deleteProduct = async (id: string) => {
    return await supabase.from("Products").delete().eq("id", id)
}
