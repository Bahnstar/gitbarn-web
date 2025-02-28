import { getUserWithProfile } from "@/server/handlers/users"
import {
  getConversationsWithSupportAgent,
  updateConversation,
} from "@/server/handlers/conversations"
import { formatDate } from "@/utils/utils"
import NewConversationButton from "@/components/NewConversationButton"
import { revalidatePath } from "next/cache"
import { Role } from "@/types/profile"
import CloseConversationButton from "@/components/CloseConversationButton"
import ReopenConversationButton from "@/components/ReopenConversationButton"
import EnterConversationButton from "@/components/EnterConversationButton"
import { redirect } from "next/navigation"
import { clsx } from "clsx"

const statuses = {
  active: "text-green-700 bg-green-50 ring-green-600/20",
  inactive: "text-yellow-800 bg-yellow-50 ring-yellow-600/20",
}

const SupportPage = async () => {
  const [{ data: userProfile }, { data }] = await Promise.all([
    getUserWithProfile(),
    getConversationsWithSupportAgent(),
  ])

  if (!userProfile) {
    redirect("/login")
  }

  const endConversation = async (conversationId: string) => {
    "use server"
    await updateConversation(conversationId, { is_active: false })
    revalidatePath("/support")
  }

  const reopenConversation = async (conversationId: string) => {
    "use server"
    await updateConversation(conversationId, { is_active: true })
    revalidatePath("/support")
  }

  const showClaimed = (chat: any): string => {
    if (!chat.profiles?.first_name) return "Unclaimed"

    if (userProfile?.role === Role.SUPPORT || userProfile?.role === Role.ADMIN)
      return `${chat.profiles?.first_name} ${chat.profiles?.last_name}`

    return "Claimed"
  }

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="flex flex-wrap items-center justify-between">
        <h1 className="self-start text-4xl leading-6 font-semibold text-gray-900">Support</h1>
        <div className="mt-4 sm:mt-0">
          <NewConversationButton user={userProfile} />
        </div>
      </div>

      <ul
        role="list"
        className="mt-10 divide-y divide-gray-100 overflow-hidden bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl"
      >
        {data?.map((chat) => (
          <li key={chat.id} className="flex items-center justify-between gap-x-6 px-2 py-5 md:px-6">
            <div className="min-w-0">
              <div className="flex items-start gap-x-3">
                <p className="text-sm/6 font-semibold text-gray-900">{chat.title}</p>
                <p
                  className={clsx(
                    statuses[chat.is_active ? "active" : "inactive"],
                    "mt-0.5 rounded-md px-1.5 py-0.5 text-xs font-medium whitespace-nowrap ring-1 ring-inset",
                  )}
                >
                  {chat.is_active ? "In Progress" : "Closed"}
                </p>
              </div>
              <div className="mt-1 flex items-center gap-x-2 text-xs/5 text-gray-500">
                <p className="whitespace-nowrap">
                  Opened on{" "}
                  <time dateTime={chat.created_at}>
                    {chat.created_at ? formatDate(chat.created_at, "MM/DD/YYYY, h:MM A") : ""}
                  </time>
                </p>
                <svg viewBox="0 0 2 2" className="size-0.5 fill-current">
                  <circle r={1} cx={1} cy={1} />
                </svg>
                <p className="truncate">{showClaimed(chat)}</p>
              </div>
            </div>
            <div className="flex flex-none items-center gap-x-4">
              {chat.is_active ? (
                <>
                  <EnterConversationButton conversationId={chat.id!} />
                  {(userProfile?.role === Role.SUPPORT || userProfile?.role === Role.ADMIN) && (
                    <CloseConversationButton conversationId={chat.id!} onClose={endConversation} />
                  )}
                </>
              ) : (
                <ReopenConversationButton conversationId={chat.id!} onReopen={reopenConversation} />
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default SupportPage
