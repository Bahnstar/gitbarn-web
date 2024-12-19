"use client"

import { NotificationStatus } from "@/types/notification"
import { CheckCircle, XCircle, Loader2 } from "lucide-react"
import { useState } from "react"

type Props = {
  notificationId: number
  notificationStatus: NotificationStatus
  changeStatus: (notificationId: number, status: NotificationStatus) => Promise<void>
}

const NotificationActions = ({ notificationId, notificationStatus, changeStatus }: Props) => {
  const [isLoadingRead, setIsLoadingRead] = useState(false)
  const [isLoadingDismiss, setIsLoadingDismiss] = useState(false)

  const handleChangeStatus = async (status: NotificationStatus) => {
    status === NotificationStatus.UNREAD || status === NotificationStatus.READ
      ? setIsLoadingRead(true)
      : setIsLoadingDismiss(true)
    try {
      await changeStatus(notificationId, status)
    } finally {
      setIsLoadingRead(false)
      setIsLoadingDismiss(false)
    }
  }

  return (
    <div className="flex gap-2">
      <button
        onClick={() =>
          handleChangeStatus(
            notificationStatus === NotificationStatus.UNREAD
              ? NotificationStatus.READ
              : NotificationStatus.UNREAD,
          )
        }
        className="inline-flex items-center gap-1.5 rounded-md bg-green-50 px-3 py-1.5 text-sm text-green-600 transition-colors hover:bg-green-100"
      >
        {isLoadingRead ? (
          <>
            Marking...
            <Loader2 className="h-4 w-4 animate-spin" />
          </>
        ) : (
          <>
            {notificationStatus === NotificationStatus.UNREAD ? "Mark Read" : "Mark Unread"}
            <CheckCircle className="h-4 w-4" />
          </>
        )}
      </button>

      <button
        onClick={() => handleChangeStatus(NotificationStatus.DISMISSED)}
        className="inline-flex items-center gap-1.5 rounded-md bg-red-50 px-3 py-1.5 text-sm text-red-600 transition-colors hover:bg-red-100"
      >
        {isLoadingDismiss ? (
          <>
            Dismissing...
            <Loader2 className="h-4 w-4 animate-spin" />
          </>
        ) : (
          <>
            Dismiss
            <XCircle className="h-4 w-4" />
          </>
        )}
      </button>
    </div>
  )
}

export default NotificationActions
