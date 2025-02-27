"use server"
import { cache } from "react"
import { PostgrestResponse, PostgrestSingleResponse } from "@supabase/supabase-js"
import { DocumentFile } from "@/types/documentFile"
import { createClient } from "@/utils/supabase/server"
import { getCurrentUser } from "./users"

export const getDocuments = cache(async (): Promise<PostgrestSingleResponse<DocumentFile[]>> => {
  const supabase = await createClient()
  return await supabase.from("Documents").select("*, profiles(*)")
})

export const getDocumentsByUserId = cache(
  async (userId: string): Promise<PostgrestSingleResponse<DocumentFile[]>> => {
    const supabase = await createClient()
    return await supabase.from("Documents").select("*, profiles(*)").eq("user_id", userId)
  },
)

export async function createDocument(
  document: Partial<DocumentFile>,
): Promise<PostgrestSingleResponse<DocumentFile>> {
  const supabase = await createClient()
  return await supabase.from("Documents").insert([document]).select().single()
}

export const updateDocument = async (
  id: string,
  document: Partial<DocumentFile>,
): Promise<PostgrestSingleResponse<DocumentFile[]>> => {
  console.log("partial", document, id)
  const supabase = await createClient()
  return await supabase.from("Documents").update(document).eq("id", id).select().single()
}

export const deleteDocument = async (id: string): Promise<void> => {
  const supabase = await createClient()
  const { data: userData } = await getCurrentUser()

  const { data, error } = await supabase.storage
    .from("documents")
    .remove([`${userData.user?.id}/${id}`])
  await supabase.from("Documents").delete().eq("id", id)
}
