import {
    getConversationById,
    getLastActiveConversationByCustomerId,
} from "@/server/handlers/conversations"
import { getConversationMessages } from "@/server/handlers/messages"
import { getCurrentUser } from "@/server/handlers/users"
import { Message } from "@/types/message"
import RealTimeMessages from "../../messages/RealTimeMessages"
import { redirect } from "next/navigation"

const SupportChatPage = async () => {
    const {
        data: { user },
    } = await getCurrentUser()
    if (!user) {
        return <div>Error</div>
    }

    const lastActiveConversation = await getLastActiveConversationByCustomerId(user?.id)
    if (!lastActiveConversation?.data?.[0]) {
        return <div>Error</div>
    }

    const conversationId = lastActiveConversation.data?.[0].id ?? ""

    const conversationData = await getConversationById(conversationId)
    const conversation = conversationData?.data ? conversationData.data[0] : { title: "Error" }

    if (conversation.customer_id !== user?.id) {
        redirect("/support")
    }

    const { data, error } = await getConversationMessages(conversationId)
    const messages: Message[] = data ?? []

    return <RealTimeMessages messages={messages} userId={user?.id} conversation={conversation} />
}

export default SupportChatPage
