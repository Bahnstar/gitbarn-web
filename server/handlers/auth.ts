"use server"

import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { updateProfile, getProfilesByEmail } from "./profiles"
import { getCurrentUser } from "./users"
import Toaster from "@/components/Toaster"

import { createClient } from "@/utils/supabase/server"
import validate from "validate.js"

type FormResult = {
  message: string
  status: string
}

export async function login(formData: FormData) {
  const supabase = await createClient()

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
  const supabase = await createClient()

  const { error } = await supabase.auth.signOut() //signOut({ scope: 'local }) to sign out of current session only

  if (error) {
    redirect("/error")
  }

  revalidatePath("/", "layout")
  redirect("/")
}

const signupConstraints = {
  email: {
    presence: true,
    email: true,
    length: {
      minimum: 3,
      maximum: 30,
    },
  },
  first_name: {
    presence: true,
    format: {
      pattern: "[a-zA-Z]+",
      message: "Name can only contain letters",
    },
  },
  last_name: {
    presence: true,
    format: {
      pattern: "[a-zA-Z]+",
      message: "Name can only contain letters",
    },
  },
  password: {
    presence: true,
    length: {
      minimum: 6,
      tooShort: "Password must be at least %{count} characters long",
    },
  },
  confirm: {
    presence: true,
    equality: {
      attribute: "password",
      message: "Passwords do not match",
    },
  },
}

export async function signup(
  prevState: any,
  formData: FormData,
  noRedirect?: boolean,
): Promise<FormResult> {
  const supabase = await createClient()

  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
    confirm: formData.get("confirm") as string,
    first_name: formData.get("first_name") as string,
    last_name: formData.get("last_name") as string,
  }

  const validationResult = validate(data, signupConstraints)
  if (validationResult) {
    return {
      status: "VALIDATION_ERROR",
      message: Object.values(validationResult)[0] as string,
    }
  }

  const { data: existingProfiles, error: supEmailsError } = await getProfilesByEmail(data.email)
  if (existingProfiles && existingProfiles.length > 0) {
    return {
      status: "USER_EXISTS",
      message: "Email is already in use",
    }
  }

  const { data: userData, error } = await supabase.auth.signUp({
    email: data.email,
    password: data.password,
    options: {
      data: {
        first_name: data.first_name,
        last_name: data.last_name,
      },
    },
  })

  console.log(error)

  if (error) {
    redirect("/error")
  }

  revalidatePath("/", "layout")

  if (!noRedirect) redirect("/signup/verify")

  return {
    status: "Success",
    message: "Registration successful",
  }
}

const passwordConstraints = {
  new: {
    presence: true,
    length: {
      minimum: 6,
      tooShort: "Password must be at least %{count} characters long",
    },
  },
  confirm: {
    presence: true,
    equality: {
      attribute: "new",
      message: "Passwords do not match",
    },
  },
}

export async function resetPassowrdByEmail(): Promise<FormResult> {
  const supabase = await createClient()
  const {
    data: { user },
  } = await getCurrentUser()

  if (!user)
    return {
      status: "error",
      message: "No user found",
    }

  await supabase.auth.resetPasswordForEmail(user.email!, {
    redirectTo: `${process.env.URL}/reset`,
  })

  return {
    status: "success",
    message: "A password reset email has been sent",
  }
}

export async function changePassword(_prevstate: any, formData: FormData): Promise<FormResult> {
  const supabase = await createClient()

  const data = {
    new: formData.get("new_password") as string,
    confirm: formData.get("confirm_password") as string,
  }

  const validationResult = validate(data, passwordConstraints)
  if (validationResult) {
    return {
      status: "VALIDATION_ERROR",
      message: Object.values(validationResult)[0] as string,
    }
  }

  await supabase.auth.updateUser({ password: data.new })

  redirect("/profile")

  return {
    status: "success",
    message: "Password successfully modified",
  }
}
