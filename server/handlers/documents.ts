import { PostgrestSingleResponse } from "@supabase/supabase-js"
import { DocumentFile } from "@/types/documentFile"
import { createClient } from "@/utils/supabase/server"

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
