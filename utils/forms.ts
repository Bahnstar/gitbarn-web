"use server"
import { createClient } from "@/utils/supabase/server"
import { createProduct, updateProduct } from "@/server/handlers/products"
import { Product } from "@/types/product"
import { revalidatePath } from "next/cache"
import { DocumentFile } from "@/types/documentFile"
import { createDocument, deleteDocument, updateDocument } from "@/server/handlers/documents"
import { getCurrentUser } from "@/server/handlers/users"

type FormResult = {
  message: string
  status?: string
}

const processDocument = async (prevState: any, formData: any): Promise<FormResult> => {
  const supabase = createClient()

  const {
    data: { user },
    error: userError,
  } = await getCurrentUser()

  const file: Partial<DocumentFile> = {
    name: formData.get("name") as string,
    user_id: formData.get("user[id]") || user?.id,
  }

  const { data: fileData, error: fileError } = await createDocument(file)
  console.log(fileData, fileError)
  if (fileError || userError) {
    return {
      message: fileError?.message || "There was an error uploading the document",
      status: fileError?.hint || "",
    }
  }

  const document = formData.get("file") as File
  if (document.size > 0 && fileData.id) {
    const { data: documentData, error: documentError } = await supabase.storage
      .from("documents")
      .upload(`${file.user_id}/${fileData.id}`, document, {
        cacheControl: "3600",
        upsert: true,
      })

    console.log(documentData, documentError)

    if (documentError) {
      await deleteDocument(fileData.id)
      return {
        message: documentError.message,
        status: documentError.cause as string,
      }
    }
    const { data: updateData, error: updateError } = await updateDocument(fileData.id, {
      path: `${documentData.fullPath}`,
    })
    if (updateError) return { message: "There was an error uploading the document" }
  } else {
    return { message: "No document provided" }
  }

  revalidatePath("/documents")
  return { message: "Document successfully uploaded", status: "success" }
}

const processProduct = async (prevState: any, formData: FormData): Promise<FormResult> => {
  const supabase = createClient()

  const product: Product = {
    title: formData.get("title") as string,
    description: formData.get("description") as string,
    amount: formData.get("cost") as string,
    status: formData.get("status") as string,
    sku: formData.get("sku") as string,
    tiger_id: formData.get("tiger_id") as unknown as number,
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

    updateProduct(productData.id, { image: `${imageData.fullPath}?v=${Date.now().toString()}` })
  }

  revalidatePath("/products")
  return { message: "Product successfully created", status: "success" }
}

export { processProduct, processDocument }
