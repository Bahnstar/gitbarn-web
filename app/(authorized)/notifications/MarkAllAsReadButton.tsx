"use client"

import { markAllAsRead } from "@/server/handlers/notifications"
import { CheckCircle, Loader2 } from "lucide-react"
import { useTransition } from "react"
import { toast } from "sonner"

export default function MarkAllAsReadButton() {
  const [isPending, startTransition] = useTransition()

  const handleClick = () => {
    startTransition(async () => {
      const result = await markAllAsRead()
      if (result.success) {
        if (result.message !== "No unread notifications") {
          toast.success(result.message)
        }
      } else {
        toast.error(result.message)
      }
    })
  }

  return (
    <button
      onClick={handleClick}
      disabled={isPending}
      className="inline-flex items-center gap-2 rounded-xl border border-green-200 bg-white px-4 py-2.5 text-sm font-medium text-green-600 shadow-sm transition-all hover:bg-green-50 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-1 disabled:opacity-70"
    >
      {isPending ? (
        <>
          <Loader2 className="h-4 w-4 animate-spin" />
          <span>Marking...</span>
        </>
      ) : (
        <>
          <CheckCircle className="h-4 w-4" />
          <span>Mark All as Read</span>
        </>
      )}
    </button>
  )
}
