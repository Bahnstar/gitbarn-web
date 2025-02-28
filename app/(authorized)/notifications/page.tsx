import { getNotificationsByUserId, updateNotification } from "@/server/handlers/notifications"
import { NotificationStatus } from "@/types/notification"
import { formatDate } from "@/utils/utils"
import { BellIcon, ChevronRightIcon } from "lucide-react"
import { toast } from "sonner"
import { revalidatePath } from "next/cache"
import NotificationActions from "./NotificationActions"
import MarkAllAsReadButton from "./MarkAllAsReadButton"
import { getUserWithProfile } from "@/server/handlers/users"
import { redirect } from "next/navigation"

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
      </div>

      {notifications.filter((notification) => notification.status !== NotificationStatus.DISMISSED)
        .length === 0 ? (
        <p className="mt-6 text-center text-lg text-gray-500">
          Hooray! You have caught up on all of your notifications!
        </p>
      ) : (
        <div className="mx-auto w-full max-w-6xl">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="relative w-full max-w-md">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  className="h-5 w-5 text-gray-400"
                >
                  <path
                    fillRule="evenodd"
                    d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <input
                type="text"
                className="w-full rounded-xl border border-gray-200 bg-white py-3 pr-4 pl-11 text-base placeholder:text-gray-500 focus:border-green-500 focus:ring-1 focus:ring-green-500 focus:outline-hidden"
                placeholder="Search Notifications"
              />
            </div>

            {hasUnreadNotifications && <MarkAllAsReadButton />}
          </div>

          <div className="mt-6 overflow-hidden rounded-2xl bg-white shadow-xs ring-1 ring-gray-900/5 sm:mt-8">
            <ul className="divide-y divide-gray-100">
              {notifications
                .filter((notification) => notification.status !== NotificationStatus.DISMISSED)
                .map((notification) => (
                  <li key={notification.id}>
                    <div
                      className={`flex items-start gap-4 p-4 transition-colors duration-150 hover:bg-gray-50 sm:gap-6 sm:p-6 ${
                        notification.status === NotificationStatus.UNREAD ? "bg-green-50" : ""
                      }`}
                    >
                      <div className="shrink-0 pt-1">
                        <BellIcon
                          className={`h-6 w-6 sm:h-7 sm:w-7 ${
                            notification.status === NotificationStatus.READ
                              ? "text-gray-400"
                              : "text-green-500"
                          }`}
                        />
                      </div>
                      <div className="min-w-0 grow">
                        <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                          <p
                            className={`sm:text-md text-base font-medium ${
                              notification.status === NotificationStatus.READ
                                ? "text-gray-900"
                                : "text-green-900"
                            }`}
                          >
                            {notification.title}
                          </p>
                          <span className="text-sm text-gray-500 sm:text-base">
                            {formatDate(notification.created_at)}
                          </span>
                        </div>
                        <p className="mt-1 line-clamp-1 text-base text-gray-600 sm:mt-2">
                          {notification.message}
                        </p>
                        <div className="mt-4">
                          <NotificationActions
                            notificationId={notification.id}
                            notificationStatus={notification.status}
                            changeStatus={changeStatus}
                          />
                        </div>
                      </div>

                      <div className="shrink-0 self-center">
                        <ChevronRightIcon className="h-5 w-5 text-gray-400 sm:h-6 sm:w-6" />
                      </div>
                    </div>
                  </li>
                ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  )
}
