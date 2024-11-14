"use client"

import { ArrowRightCircle, Loader2 } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

type Props = {
  conversationId: string
}

const EnterConversationButton = ({ conversationId }: Props) => {
  const [isLoading, setIsLoading] = useState(false)
  return (
    <button onClick={() => setIsLoading(true)} disabled={isLoading}>
      <Link
        href={`/support/chat?id=${conversationId}`}
        className="inline-flex items-center gap-1.5 rounded-md bg-green-50 px-3 py-1.5 text-sm text-green-600 transition-colors hover:bg-green-100"
      >
        {isLoading ? (
          <>
            Entering...
            <Loader2 className="h-4 w-4 animate-spin" />
          </>
        ) : (
          <>
            Enter
            <ArrowRightCircle className="h-4 w-4" />
          </>
        )}
      </Link>
    </button>
  )
}

export default EnterConversationButton
