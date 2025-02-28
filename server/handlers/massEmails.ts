"use server"

import { Resend } from "resend"
import { getProfileByRole } from "./profiles"
import { Profile, Role } from "@/types/profile"
import { batchCreateNotifications } from "./notifications"

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

  // Create in-app notifications for all recipients
  const recipientIds = recipients.map((recipient: Profile) => recipient.id)
  await batchCreateNotifications(recipientIds, subject, body)

  const recipientEmails = recipients.map((recipient: Profile) => recipient.email)

  const { data, error } = await resend.batch.send(
    recipientEmails.map((email) => ({
      from: "notifications@bahnstar.com",
      to: email,
      subject: subject,
      html: `<p>${body}</p>`,
    })),
  )

  if (error) {
    return { error: error.message, status: 500 }
  }

  return { data, status: 200 }
}
