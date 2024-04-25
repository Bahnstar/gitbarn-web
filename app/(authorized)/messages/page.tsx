import { getConversationMessages } from "@/server/handlers/messages"
import RealTimeMessages from "./RealTimeMessages"
import { Message } from "@/types/message"
import { getCurrentUser } from "@/server/handlers/users"

export default async function MessagesPage() {
    const conversationId = "64a63373-622c-42bf-ac64-d3d8ea3da3df"
    const {
        data: { user },
    } = await getCurrentUser()
    const { data, error } = await getConversationMessages(conversationId)
    const messages: Message[] = data ?? []

    return (
        <RealTimeMessages messages={messages} userId={user?.id} conversationId={conversationId} />
    )
}
