"use server"
import { createClient } from "@/utils/supabase/server"
import { createProduct, updateProduct } from "@/server/handlers/products"
import { Product } from "@/types/product"
import { revalidatePath } from "next/cache"
import { DocumentFile } from "@/types/documentFile"
import { createDocument, deleteDocument, updateDocument } from "@/server/handlers/documents"
import { getCurrentUser } from "@/server/handlers/users"
import { Profile } from "@/types/profile"
import { updateProfile } from "@/server/handlers/profiles"

type FormResult = {
  message: string
  status: string
}

const processDocument = async (prevState: any, formData: any): Promise<FormResult> => {
  const supabase = createClient()

  const {
    data: { user },
    error: userError,
  } = await getCurrentUser()

  const file: Partial<DocumentFile> = {
    name: formData.get("name") as string,
    user_id: formData.get("user") || user?.id,
  }

  const { data: fileData, error: fileError } = await createDocument(file)
  if (fileError || userError) {
    return {
      message: fileError?.message || "There was an error uploading the document",
      status: fileError?.hint || "unknown",
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
    if (updateError)
      return { message: "There was an error uploading the document", status: "error" }
  } else {
    return { message: "No document provided", status: "error" }
  }

  revalidatePath("/documents")
  return { message: "Document successfully uploaded", status: "success" }
}

const processProduct = async (prevState: any, formData: FormData): Promise<FormResult> => {
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

  if (productError) return { message: "There was an error creating the product", status: "error" }

  const image = formData.get("image") as File
  if (productData.id)
    uploadImage(image, `products/${productData.id}`, (path: string) => {
      updateProduct(productData.id!, { image: `${path}?v=${Date.now().toString()}` })
    })

  revalidatePath("/products")
  return { message: "Product successfully created", status: "success" }
}

const processProfile = async (prevState: any, formData: FormData): Promise<FormResult> => {
  const profile: Partial<Profile> = {
    first_name: formData.get("first_name") as string,
    last_name: formData.get("last_name") as string,
  }

  const id = formData.get("id") as string

  const image = formData.get("image") as File
  if (id)
    uploadImage(image, `avatars/${id}`, (path: string) => {
      updateProfile(id, {
        ...profile,
        avatar_url: `${path}?v=${Date.now().toString()}`,
      })
    })

  revalidatePath("/profile")
  return { message: "Profile successfully updated", status: "success" }
}

const uploadImage = async (
  image: File,
  uploadPath: string,
  callback: Function,
): Promise<string> => {
  const supabase = createClient()

  if (image.size > 0) {
    const { data: imageData, error } = await supabase.storage
      .from("images")
      .upload(uploadPath, image, {
        cacheControl: "3600",
        upsert: true,
      })

    if (error) return `There was an error uploading ${image.name} to ${uploadPath}`
    callback(imageData.fullPath)
    return `Image ${image.name} successfully uploaded to ${uploadPath}`
  }

  return `No image provided`
}

export { processProduct, processDocument, processProfile }
