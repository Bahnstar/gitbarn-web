import { NewChatEmailTemplate } from "@/components/email/NewChat"
import { Resend } from "resend"

export async function sendNewChatEmail(chatTitle: string, chatId: string) {
  const resend = new Resend(process.env.RESEND_API_KEY)
  try {
    const { data, error } = await resend.emails.send({
      from: "notifications@bahnstar.com",
      to: ["owners@bahnstar.com"],
      subject: `New Support Chat: ${chatTitle}`,
      react: NewChatEmailTemplate({ chatTitle, chatId }),
    })

    if (error) {
      return Response.json({ error }, { status: 500 })
    }

    return Response.json(data)
  } catch (error) {
    return Response.json({ error }, { status: 500 })
  }
}
