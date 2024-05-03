import {
    createConversation,
    getLastActiveConversationByCustomerId,
} from "@/server/handlers/conversations"
import { getCurrentUser } from "@/server/handlers/users"
import { Conversation } from "@/types/conversation"

export default async function SupportPage() {
    const {
        data: { user },
    } = await getCurrentUser()
    const userId = user ? user.id : ""
    const { data, error } = await getLastActiveConversationByCustomerId(userId)
    const conversation = data?.[0]

    const startConversation = async () => {
        const conversation: Conversation = {
            title: "New Support Chat",
            customer_id: userId,
            is_active: true,
        }
        const { data, error } = await createConversation(conversation)
    }

    if (!conversation?.is_active) {
        return (
            <div className="flex w-full flex-1 flex-col items-center gap-20">
                <h1 className="self-start text-4xl font-semibold leading-6 text-gray-900">
                    Support Chat
                </h1>
                <div className="card flex flex-col items-center justify-center gap-y-6 rounded-lg bg-base-100 px-10 py-14 shadow-md">
                    <h2 className="text-2xl font-semibold">How can we help you?</h2>
                    <p className="text-base text-gray-500">
                        If you have any questions or need assistance, our support team is here to
                        help.
                    </p>
                    <button className="btn bg-green-600 text-white hover:bg-green-700">
                        Chat with a Support Agent
                    </button>
                </div>
            </div>
        )
    }

    return (
        <div className="flex w-full flex-1 flex-col items-center gap-20">
            <h1>This is the support page</h1>
        </div>
    )
}
