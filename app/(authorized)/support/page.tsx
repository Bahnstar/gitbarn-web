import { getCurrentUser, getUserWithProfile } from "@/server/handlers/users"
import {
  getConversations,
  getConversationsByCustomerId,
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
import { toast } from "sonner"

const SupportPage = async () => {
  const { data: userProfile } = await getUserWithProfile()
  const userId = userProfile!.id

  const { data } = await getConversationsWithSupportAgent()

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

  return (
    <div className="flex w-full flex-1 flex-col items-center gap-20">
      <h1 className="self-start text-4xl font-semibold leading-6 text-gray-900">Support</h1>
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <label className="input input-bordered flex w-full max-w-xs items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="h-4 w-4 opacity-70"
              >
                <path
                  fillRule="evenodd"
                  d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                  clipRule="evenodd"
                />
              </svg>
              <input type="text" className="grow" placeholder="Search Chats" />
            </label>
          </div>
          <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
            <NewConversationButton userId={userId} />
          </div>
        </div>
        <div className="mt-8 flow-root">
          <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
              <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
                <table className="min-w-full divide-y divide-gray-300">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Title
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Support Agent
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Created
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Status
                      </th>
                      <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                        <span className="sr-only">Actions</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 bg-white">
                    {data?.map((row) => (
                      <tr key={row.id}>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {row.title}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {row.profiles?.first_name ?? "Unclaimed"} {row.profiles?.last_name ?? ""}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {row.created_at ? formatDate(row.created_at) : ""}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {row.is_active ? "Open" : "Closed"}
                        </td>
                        <td className="relative space-x-4 whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                          {row.is_active ? (
                            <>
                              <EnterConversationButton conversationId={row.id!} />
                              {(userProfile?.role === Role.SUPPORT ||
                                userProfile?.role === Role.ADMIN) && (
                                <CloseConversationButton
                                  conversationId={row.id!}
                                  onClose={endConversation}
                                />
                              )}
                            </>
                          ) : (
                            <ReopenConversationButton
                              conversationId={row.id!}
                              onReopen={reopenConversation}
                            />
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SupportPage
