import { getConversationById } from "@/server/handlers/conversations"
import { getConversationMessages } from "@/server/handlers/messages"
import { getUserWithProfile } from "@/server/handlers/users"
import RealTimeMessages from "./RealTimeMessages"
import Toaster from "@/components/Toaster"

type SearchParams = Promise<{ id: string }>

const SupportChatPage = async ({ searchParams }: { searchParams: SearchParams }) => {
  const { data: user } = await getUserWithProfile()

  if (!user) {
    return <div>Error</div>
  }

  const { id } = await searchParams
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

  return <RealTimeMessages messages={messages} user={user} conversation={conversation} />
}

export default SupportChatPage
