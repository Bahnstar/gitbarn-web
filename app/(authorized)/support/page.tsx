import { getCurrentUser } from "@/server/handlers/users"
import { createConversation, getConversationsByCustomerId } from "@/server/handlers/conversations"
import { redirect } from "next/navigation"
import { Conversation } from "@/types/conversation"
import Link from "next/link"
import { formatDate } from "@/utils/utils"

const SupportPage = async () => {
  const {
    data: { user },
  } = await getCurrentUser()
  const userId = user!.id

  const { data, error } = await getConversationsByCustomerId(userId)

  const startConversation = async () => {
    "use server"
    const conversation: Conversation = {
      title: "New Support Chat",
      customer_id: userId,
      is_active: true,
    }

    const { data, error } = await createConversation(conversation)
    const newConversationId = data?.id
    redirect(`/support/chat?id=${newConversationId}`)
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
            <form action={startConversation}>
              <button className="block rounded-md bg-green-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-green-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                New Conversation
              </button>
            </form>
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
                        Created
                      </th>
                      <th
                        scope="col"
                        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                      >
                        Status
                      </th>
                      <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                        <span className="sr-only">Edit</span>
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
                          {row.created_at ? formatDate(row.created_at) : ""}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {row.is_active ? "Open" : "Closed"}
                        </td>
                        <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                          <Link
                            href={`/support/chat?id=${row.id}`}
                            className="text-green-600 hover:text-green-700"
                          >
                            Resume
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>{" "}
    </div>
  )
}

export default SupportPage
