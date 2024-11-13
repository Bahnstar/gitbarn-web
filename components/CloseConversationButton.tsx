"use client"

import { XCircleIcon } from "lucide-react"
import { useState } from "react"

type Props = {
  conversationId: string
  onClose: (conversationId: string) => Promise<void>
}

const CloseConversationButton = ({ conversationId, onClose }: Props) => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleClose = async () => {
    await onClose(conversationId)
    setIsModalOpen(false)
  }

  return (
    <>
      <button
        onClick={() => setIsModalOpen(true)}
        className="inline-flex items-center gap-1.5 rounded-md bg-red-50 px-3 py-1.5 text-sm text-red-600 transition-colors hover:bg-red-100"
      >
        <XCircleIcon className="h-4 w-4" />
        Close
      </button>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex w-screen items-center justify-center bg-black bg-opacity-50">
          <div className="rounded-lg bg-white p-6 shadow-xl">
            <h3 className="mb-4 text-lg font-medium">Close Conversation</h3>
            <p className="mb-6 text-gray-600">Are you sure you want to close this conversation?</p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setIsModalOpen(false)}
                className="rounded-md bg-gray-100 px-4 py-2 text-gray-700 hover:bg-gray-200"
              >
                Cancel
              </button>
              <button
                onClick={handleClose}
                className="rounded-md bg-red-600 px-4 py-2 text-white hover:bg-red-700"
              >
                Close Conversation
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default CloseConversationButton
