import { getConversationById } from "@/server/handlers/conversations"
import { getConversationMessages } from "@/server/handlers/messages"
import { getCurrentUser } from "@/server/handlers/users"
import RealTimeMessages from "../../messages/RealTimeMessages"
import { redirect } from "next/navigation"

const SupportChatPage = async ({ searchParams }: { searchParams: { id: string } }) => {
    const {
        data: { user },
    } = await getCurrentUser()

    if (!user) {
        return <div>Error</div>
    }

    const id = searchParams.id
    const { data: conversation, error: convError } = await getConversationById(id)

    if (convError) return <div>ERROR</div>

    if (conversation.customer_id !== user?.id) {
        redirect("/support")
    }

    const { data: messages, error: messError } = await getConversationMessages(id)

    if (messError) return <div>ERROR</div>

    return <RealTimeMessages messages={messages} userId={user?.id} conversation={conversation} />
}

export default SupportChatPage
