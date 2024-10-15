import { getConversationById } from "@/server/handlers/conversations"
import { getConversationMessages } from "@/server/handlers/messages"
import { getCurrentUser } from "@/server/handlers/users"
import RealTimeMessages from "../../../../components/RealTimeMessages"
import { redirect } from "next/navigation"
import Toaster from "@/components/Toaster"

const SupportChatPage = async ({ searchParams }: { searchParams: { id: string } }) => {
  const {
    data: { user },
  } = await getCurrentUser()

  if (!user) {
    return <div>Error</div>
  }

  const id = searchParams.id
  const { data: conversation, error: convError } = await getConversationById(id)

  if (convError) {
    console.error(convError)
    return (
      <Toaster
        message="An error occured while accessing this chat. Please try again later."
        redirect="/support"
      />
    )
  }

  // if (conversation.customer_id !== user?.id) {
  //     redirect("/support")
  // }

  const { data: messages, error: messError } = await getConversationMessages(id)

  if (messError) {
    console.error(messError)
    return (
      <Toaster
        message="An error occured while accessing this chat. Please try again later."
        redirect="/support"
      />
    )
  }

  return <RealTimeMessages messages={messages} userId={user?.id} conversation={conversation} />
}

export default SupportChatPage
