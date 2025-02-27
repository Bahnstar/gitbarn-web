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

  const { data: recipients, error: supportProfilesError } = await getProfileByRole(role)
  if (supportProfilesError || !recipients) {
    throw new Error("No recipients found")
  }

  const results = await Promise.all(
    recipients.map(async (recipient: Profile) => {
      if (!recipient.email) return null

      const { data, error } = await resend.emails.send({
        from: "notifications@bahnstar.com",
        to: recipient.email,
        subject: subject,
        react: body,
      })

      if (error) {
        return { error: error.message, status: 500, email: recipient.email }
      }
      return { data, status: 200, email: recipient.email }
    }),
  )

  const errors = results.filter((result) => result?.status === 500)
  if (errors.length > 0) {
    return { error: `Failed to send to ${errors.length} recipients`, status: 500, details: errors }
  }

  return { data: results, status: 200 }
}
