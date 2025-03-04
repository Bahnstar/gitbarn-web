import { getNotificationsByUserId, updateNotification } from "@/server/handlers/notifications"
import { NotificationStatus } from "@/types/notification"
import { formatDate } from "@/utils/utils"
import { toast } from "sonner"
import { revalidatePath } from "next/cache"
import NotificationActions from "./NotificationActions"
import MarkAllAsReadButton from "./MarkAllAsReadButton"
import { getUserWithProfile } from "@/server/handlers/users"
import { redirect } from "next/navigation"
import { clsx } from "clsx"

const statuses = {
  unread: "text-green-700 bg-green-50 ring-green-600/20",
  read: "text-gray-600 bg-gray-50 ring-gray-500/10",
}

export default async function NotificationsPage() {
  const { data: user, error: userError } = await getUserWithProfile()
  if (!user || userError) {
    toast.error("Error fetching user")
    redirect("/login")
  }
  const { data, error } = await getNotificationsByUserId(user?.id)
  const notifications = data || []

  if (error) {
    console.error(error)
    toast.error("Error fetching notifications")
    return <div>Error fetching notifications</div>
  }

  const changeStatus = async (notificationId: number, status: NotificationStatus) => {
    "use server"
    const { error } = await updateNotification({
      id: notificationId,
      status: status,
    })
    if (error) {
      console.error(error)
      toast.error("Error updating notification status")
    }

    revalidatePath("/notifications")
  }

  const hasUnreadNotifications = notifications.some(
    (notification) => notification.status === NotificationStatus.UNREAD,
  )

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="flex flex-wrap items-center justify-between">
        <h1 className="self-start text-4xl leading-6 font-semibold text-gray-900">Notifications</h1>
        {hasUnreadNotifications && (
          <div className="mt-4 sm:mt-0">
            <MarkAllAsReadButton />
          </div>
        )}
      </div>

      {notifications.filter((notification) => notification.status !== NotificationStatus.DISMISSED)
        .length === 0 ? (
        <p className="mt-6 text-center text-lg text-gray-500">
          Hooray! You have caught up on all of your notifications!
        </p>
      ) : (
        <div className="mt-10">
          <div className="relative mb-6">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4"></div>
          </div>
          <ul
            role="list"
            className="divide-y divide-gray-100 overflow-hidden bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl"
          >
            {notifications
              .filter((notification) => notification.status !== NotificationStatus.DISMISSED)
              .map((notification) => (
                <li
                  key={notification.id}
                  className="flex items-center justify-between gap-x-6 px-2 py-5 md:px-6"
                >
                  <div className="min-w-0">
                    <div className="flex items-start gap-x-3">
                      <p className="text-sm/6 font-semibold text-gray-900">{notification.title}</p>
                      <p
                        className={clsx(
                          statuses[
                            notification.status === NotificationStatus.UNREAD ? "unread" : "read"
                          ],
                          "mt-0.5 rounded-md px-1.5 py-0.5 text-xs font-medium whitespace-nowrap ring-1 ring-inset",
                        )}
                      >
                        {notification.status === NotificationStatus.UNREAD ? "New" : "Read"}
                      </p>
                    </div>
                    <div className="mt-1 flex items-center gap-x-2 text-xs/5 text-gray-500">
                      <p className="whitespace-nowrap">
                        Received on{" "}
                        <time dateTime={notification.created_at}>
                          {formatDate(notification.created_at, "MM/DD/YYYY, h:MM A")}
                        </time>
                      </p>
                    </div>
                    <p className="mt-2 text-sm text-gray-600">{notification.message}</p>
                  </div>
                  <div className="flex flex-none items-center gap-x-4">
                    <NotificationActions
                      notificationId={notification.id}
                      notificationStatus={notification.status}
                      changeStatus={changeStatus}
                    />
                  </div>
                </li>
              ))}
          </ul>
        </div>
      )}
    </div>
  )
}
