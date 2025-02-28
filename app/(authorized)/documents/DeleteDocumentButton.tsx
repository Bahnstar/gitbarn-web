"use client"

import { Loader2, Trash2Icon } from "lucide-react"
import { useState } from "react"
import { toast } from "sonner"

type Props = {
  documentId: string
  onClose: (documentId: string) => Promise<void>
}

const DeleteDocumentButton = ({ documentId, onClose }: Props) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleClose = async () => {
    setIsLoading(true)
    try {
      await onClose(documentId)
    } catch (error) {
      toast.error("Failed to close conversation")
    } finally {
      setIsLoading(false)
      setIsModalOpen(false)
    }
  }

  return (
    <>
      <button
        onClick={() => setIsModalOpen(true)}
        className="inline-flex items-center gap-1.5 rounded-md bg-red-50 px-3 py-1.5 text-sm text-red-600 transition-colors hover:bg-red-100"
        disabled={isLoading}
      >
        Delete
        <Trash2Icon className="h-4 w-4" />
      </button>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex w-screen items-center justify-center bg-black/50">
          <div className="rounded-lg bg-white p-6 shadow-xl">
            <h3 className="mb-4 text-lg font-medium">Delete document?</h3>
            <p className="mb-6 text-gray-600">Are you sure you want to delete this document?</p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setIsModalOpen(false)}
                className="rounded-md bg-gray-100 px-4 py-2 text-gray-700 hover:bg-gray-200"
                disabled={isLoading}
              >
                Cancel
              </button>
              <button
                onClick={handleClose}
                className="inline-flex items-center gap-2 rounded-md bg-red-600 px-4 py-2 text-white hover:bg-red-700"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    Deleting...
                    <Loader2 className="h-4 w-4 animate-spin" />
                  </>
                ) : (
                  "Delete Document"
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default DeleteDocumentButton
