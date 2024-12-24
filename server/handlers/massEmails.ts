"use server"

import { Resend } from "resend"
import { getProfileByRole } from "./profiles"
import { Profile, Role } from "@/types/profile"

export async function sendMassEmail(subject: string, body: string, roles: Role[]) {
  await Promise.all(
    roles.map(async (role) => {
      sendMassEmailToRoleMembers(subject, body, role)
    }),
  )
}

async function sendMassEmailToRoleMembers(subject: string, body: string, role: Role) {
  const resend = new Resend(process.env.RESEND_API_KEY)

  const { data: recepients, error: supportProfilesError } = await getProfileByRole(role)
  if (supportProfilesError || !recepients) {
    throw new Error("No recipients found")
  }

  const recepientEmails = recepients.map((recepient: Profile) => recepient.email!)

  const { data, error } = await resend.emails.send({
    from: "notifications@bahnstar.com",
    to: recepientEmails,
    subject: subject,
    react: body,
  })

  if (error) {
    return { error: error.message, status: 500 }
  }

  return { data, status: 200 }
}
