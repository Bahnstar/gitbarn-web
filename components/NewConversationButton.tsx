"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { createConversation } from "@/server/handlers/conversations"
import { Conversation } from "@/types/conversation"
import clientRevalidate from "@/utils/clientRevalidate"
import { toast } from "sonner"
import { LoaderCircle } from "lucide-react"
import ComboBox from "./ComboBox"
import { Profile, Role } from "@/types/profile"

type Props = {
  user: Profile
}

const NewConversationButton = (props: Props) => {
  const [isLoading, setIsLoading] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [title, setTitle] = useState("")
  const [customerId, setCustomerId] = useState("")
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    const conversation: Partial<Conversation> = {
      title: title,
      customer_id: customerId || props.user.id,
      is_active: true,
    }

    const { data, error } = await createConversation(conversation)

    if (data && data.id) {
      clientRevalidate("/support")
      toast.success("Conversation created successfully")
      router.push(`/support/chat?id=${data.id}`)
    } else {
      console.error("Failed to create conversation:", error)
      toast.error("Failed to create conversation")
    }
    setIsLoading(false)
    setIsModalOpen(false)
  }

  const supportOrAdmin = () => {
    return props.user.role === Role.SUPPORT || props.user.role === Role.ADMIN
  }

  return (
    <>
      <button
        onClick={() => setIsModalOpen(true)}
        className="block rounded-md bg-green-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-green-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      >
        Start New Support Chat
      </button>

      {isModalOpen && (
        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-screen items-end justify-center px-4 pb-20 pt-4 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>

            <span className="hidden sm:inline-block sm:h-screen sm:align-middle" aria-hidden="true">
              &#8203;
            </span>

            <div className="inline-block transform overflow-hidden rounded-lg bg-white text-left align-bottom shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:align-middle">
              <form onSubmit={handleSubmit}>
                <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="mt-3 w-full text-center sm:ml-4 sm:mt-0 sm:text-left">
                      <h3 className="text-lg font-medium leading-6 text-gray-900">
                        Start New Support Chat
                      </h3>
                      <div className="mt-2">
                        <input
                          type="text"
                          value={title}
                          onChange={(e) => setTitle(e.target.value)}
                          placeholder="Enter conversation title"
                          className="w-full rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                          required
                        />
                      </div>
                      {supportOrAdmin() && (
                        <div className="mt-2">
                          <ComboBox setCustomerId={setCustomerId} />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                  <button
                    type="submit"
                    className="inline-flex w-full justify-center rounded-md border border-transparent bg-green-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
                  >
                    {isLoading ? <LoaderCircle className="animate-spin" /> : "Create"}
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:ml-3 sm:mt-0 sm:w-auto sm:text-sm"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default NewConversationButton
