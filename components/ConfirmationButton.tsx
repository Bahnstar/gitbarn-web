"use client"

import { Loader2 } from "lucide-react"
import { HTMLProps, useState } from "react"
import { toast } from "sonner"

type Props = {
  action: (params: any) => Promise<{ status: string; message: string }>
  actionTitle: string
  actionPending: string
  actionParams: any
  ActionButton: React.ReactNode
  title: string
  description?: string
}

const ConfirmationButton = ({
  action,
  actionTitle,
  actionPending,
  actionParams,
  ActionButton,
  title,
  description,
}: Props) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleClose = async () => {
    setIsLoading(true)

    const { status, message } = await action(actionParams)
    if (status === "error") toast.error(message)
    else toast.success(message)

    setIsLoading(false)
    setIsModalOpen(false)
  }

  return (
    <>
      <button onClick={() => setIsModalOpen(true)} disabled={isLoading}>
        {ActionButton}
      </button>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex w-screen items-center justify-center bg-black/50">
          <div className="rounded-lg bg-white p-6 shadow-xl">
            <h3 className="mb-4 text-lg font-medium">{title}</h3>
            <p className="mb-6 text-gray-600">{description}</p>
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
                    {actionPending}
                    <Loader2 className="h-4 w-4 animate-spin" />
                  </>
                ) : (
                  actionTitle
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default ConfirmationButton
