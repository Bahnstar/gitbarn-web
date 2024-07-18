"use server"

import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import Toaster from "@/components/Toaster"

import { createClient } from "@/utils/supabase/server"

export async function login(formData: FormData) {
  const supabase = createClient()

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  }

  const { error } = await supabase.auth.signInWithPassword(data)

  if (error) {
    redirect(`/login?message=${error.message}`)
  }

  revalidatePath("/", "layout")
  redirect("/dashboard")
}

export async function logout() {
  const supabase = createClient()

  const { error } = await supabase.auth.signOut() //signOut({ scope: 'local }) to sign out of current session only

  if (error) {
    redirect("/error")
  }

  revalidatePath("/", "layout")
  redirect("/")
}

export async function signup(formData: FormData) {
  const supabase = createClient()

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  }

  const { error } = await supabase.auth.signUp(data)

  console.log(error)

  if (error) {
    redirect("/error")
  }

  revalidatePath("/", "layout")
  redirect("/signup/verify")
}
