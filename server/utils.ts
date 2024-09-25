"use server"
import { createClient } from "@/utils/supabase/server"
import { createProduct } from "./handlers/products"
import { Product } from "@/types/product"
import { revalidatePath } from "next/cache"

const submitNewProduct = async (
  prevState: any,
  formData: FormData,
): Promise<{ message: string; status?: string }> => {
  const supabase = createClient()

  const product: Product = {
    title: formData.get("title") as string,
    description: formData.get("description") as string,
    amount: formData.get("cost") as string,
    status: formData.get("status") as string,
  }

  console.log(formData.get("image"))

  const { data: productData, error: productError } = await createProduct(product)

  if (productError) return { message: "There was an error creating the product " }

  const image = formData.get("image") as File
  if (image.size > 0) {
    const { data: imageData, error: imageError } = await supabase.storage
      .from("images")
      .upload(`products/${productData?.id ?? "null"}`, image, {
        cacheControl: "3600",
        upsert: false,
      })

    if (imageError) return { message: "There was an error uploading the provided image" }
  }

  revalidatePath("/products")
  return { message: "Product successfully created", status: "success" }
}

export { submitNewProduct }
