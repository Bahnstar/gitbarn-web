"use client"

import { Loader2, RotateCcw } from "lucide-react"
import { useState } from "react"
import { toast } from "sonner"

type Props = {
  conversationId: string
  onReopen: (conversationId: string) => Promise<void>
}

const ReopenConversationButton = ({ conversationId, onReopen }: Props) => {
  const [isLoading, setIsLoading] = useState(false)

  const handleReopen = async () => {
    setIsLoading(true)
    try {
      await onReopen(conversationId)
    } catch (error) {
      toast.error("Failed to reopen conversation")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <button
      onClick={handleReopen}
      className="inline-flex items-center gap-1.5 rounded-md bg-green-50 px-3 py-1.5 text-sm text-green-600 transition-colors hover:bg-green-100"
      disabled={isLoading}
    >
      {isLoading ? (
        <>
          Opening...
          <Loader2 className="h-4 w-4 animate-spin" />
        </>
      ) : (
        <>
          Re-open
          <RotateCcw className="h-4 w-4" />
        </>
      )}
    </button>
  )
}

export default ReopenConversationButton
