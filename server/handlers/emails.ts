"use server"

import { NewChatEmailTemplate } from "@/components/email/NewChat"
import { NewMessageEmailTemplate } from "@/components/email/NewMessage"
import { Resend } from "resend"

export async function sendNewChatEmail(chatTitle: string, chatId: string) {
  const resend = new Resend(process.env.RESEND_API_KEY)
  try {
    const { data, error } = await resend.emails.send({
      from: "notifications@bahnstar.com",
      to: ["owners@bahnstar.com"],
      subject: `New Message in ${chatTitle}`,
      react: NewChatEmailTemplate({ chatTitle, chatId }),
    })

    if (error) {
      return { error: error.message, status: 500 }
    }

    return { data, status: 200 }
  } catch (error) {
    return { error: (error as Error).message, status: 500 }
  }
}

export async function sendNewMessageEmail(
  chatTitle: string,
  chatId: string,
  senderName: string,
  messagePreview: string,
) {
  console.log("Sending new message email from server")
  const resend = new Resend(process.env.RESEND_API_KEY)
  try {
    const { data, error } = await resend.emails.send({
      from: "notifications@bahnstar.com",
      to: ["owners@bahnstar.com"],
      subject: `New Support Message: ${chatTitle}`,
      react: NewMessageEmailTemplate({ chatTitle, chatId, senderName, messagePreview }),
    })

    if (error) {
      return { error: error.message, status: 500 }
    }

    return { data, status: 200 }
  } catch (error) {
    return { error: (error as Error).message, status: 500 }
  }
}
