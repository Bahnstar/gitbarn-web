"use server"

import { PostgrestSingleResponse } from "@supabase/supabase-js"
import { DocumentFile } from "@/types/documentFile"
import { createClient } from "@/utils/supabase/server"
import { getCurrentUser } from "./users"

export async function getDocuments(): Promise<PostgrestSingleResponse<DocumentFile[]>> {
  const supabase = createClient()

  return await supabase.from("Documents").select()
}

export async function createDocument(
  document: Partial<DocumentFile>,
): Promise<PostgrestSingleResponse<DocumentFile>> {
  const supabase = createClient()

  return await supabase.from("Documents").insert([document]).select().single()
}

export const updateDocument = async (
  id: string,
  document: Partial<DocumentFile>,
): Promise<PostgrestSingleResponse<DocumentFile[]>> => {
  console.log("partial", document, id)
  const supabase = createClient()
  return await supabase.from("Documents").update(document).eq("id", id).select().single()
}

export const deleteDocument = async (id: string): Promise<void> => {
  const supabase = createClient()
  const { data: userData } = await getCurrentUser()

  const { data, error } = await supabase.storage
    .from("documents")
    .remove([`${userData.user?.id}/${id}`])
  await supabase.from("Documents").delete().eq("id", id)
}
