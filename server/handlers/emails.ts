"use server"

import { NewChatEmailTemplate } from "@/components/email/NewChat"
import { NewMessageEmailTemplate } from "@/components/email/NewMessage"
import { Resend } from "resend"
import { getAllAdminProfiles, getProfile } from "./profiles"
import { OrderSubmission } from "@/types/tigerTransaction"
import { CartWithTotal } from "@/types/cart"
import { NewOrderEmailTemplate } from "@/components/email/NewOrder"

export async function sendAdminNotificationOnOrder(order: OrderSubmission, cart: CartWithTotal) {
  const resend = new Resend(process.env.RESEND_API_KEY)
  try {
    const { data: admins, error: adminError } = await getAllAdminProfiles()
    if (adminError) {
      return { error: adminError.message, status: 500 }
    }

    const adminEmails = admins.map((admin) => admin.email)

    const { data, error } = await resend.emails.send({
      from: "notifications@bahnstar.com",
      to: adminEmails,
      subject: "New Order Placed",
      react: NewOrderEmailTemplate({ order, cart }),
    })

    if (error) {
      return { error: error.message, status: 500 }
    }

    return { data, status: 200 }
  } catch (error) {
    return { error: (error as Error).message, status: 500 }
  }
}

export async function sendNewChatEmail(chatTitle: string, chatId: string, supportEmails: string[]) {
  const resend = new Resend(process.env.RESEND_API_KEY)
  try {
    const { data, error } = await resend.emails.send({
      from: "notifications@bahnstar.com",
      to: supportEmails,
      subject: `New Support Chat: ${chatTitle}`,
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

export async function sendUserNotification(
  conversationTitle: string,
  conversationId: string,
  userId: string,
  recipientId: string,
  messageText: string,
) {
  const [{ data: sender }, { data: recipient }] = await Promise.all([
    getProfile(userId),
    getProfile(recipientId),
  ])

  if (sender && recipient) {
    await sendNewMessageEmail(
      conversationTitle,
      conversationId,
      messageText,
      sender.username!,
      recipient.email!,
    )
  }
}

export async function sendNewMessageEmail(
  chatTitle: string,
  chatId: string,
  messagePreview: string,
  senderName: string,
  recipientEmail: string,
) {
  const resend = new Resend(process.env.RESEND_API_KEY)
  try {
    const { data, error } = await resend.emails.send({
      from: "notifications@bahnstar.com",
      to: recipientEmail,
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
