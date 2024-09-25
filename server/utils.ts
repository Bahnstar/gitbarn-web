"use server"
import { createClient } from "@/utils/supabase/server"
import { createProduct, updateProduct } from "./handlers/products"
import { Product } from "@/types/product"
import { revalidatePath } from "next/cache"

type FormResult = {
  message: string
  status?: string
}

const processProduct = async (prevState: any, formData: FormData): Promise<FormResult> => {
  const supabase = createClient()

  const product: Product = {
    title: formData.get("title") as string,
    description: formData.get("description") as string,
    amount: formData.get("cost") as string,
    status: formData.get("status") as string,
    image: Date.now().toString(),
  }

  const id = formData.get("id") as string

  const { data: productData, error: productError } = id
    ? await updateProduct(id, product)
    : await createProduct(product)

  if (productError) return { message: "There was an error creating the product " }

  const image = formData.get("image") as File
  if (image.size > 0 && productData.id) {
    const { data: imageData, error: imageError } = await supabase.storage
      .from("images")
      .upload(`products/${productData.id}`, image, {
        cacheControl: "3600",
        upsert: true,
      })

    if (imageError) return { message: "There was an error uploading the provided image" }
  }

  revalidatePath("/products")
  return { message: "Product successfully created", status: "success" }
}

export { processProduct }
