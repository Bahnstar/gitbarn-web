import { getNotifications } from "@/server/handlers/notifications"
import { getCurrentUser } from "@/server/handlers/users"
import { NotificationStatus } from "@/types/notification"
import { formatDate } from "@/utils/utils"
import { BellIcon, ChevronRightIcon } from "lucide-react"
import Link from "next/link"
import { toast } from "sonner"

export default async function NotificationsPage() {
  const { data: notifications, error } = await getNotifications()
  if (error) {
    console.error(error)
    toast.error("Error fetching notifications")
    return <div>Error fetching notifications</div>
  }

  return (
    <div className="flex w-full flex-1 flex-col gap-6 p-4 sm:gap-10">
      <h1 className="text-4xl font-semibold leading-6 text-gray-900">Notifications</h1>
      {notifications.length === 0 ? (
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
                className="w-full rounded-xl border border-gray-200 bg-white py-3 pl-11 pr-4 text-base placeholder:text-gray-500 focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500"
                placeholder="Search Notifications"
              />
            </div>

            <button
              type="button"
              className="inline-flex items-center justify-center rounded-xl bg-green-600 px-6 py-3 text-base font-semibold text-white shadow-sm transition-colors hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
            >
              Mark All as Read
            </button>
          </div>

          <div className="mt-6 overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-gray-900/5 sm:mt-8">
            <ul className="divide-y divide-gray-100">
              {notifications.map((notification, index) => (
                <li key={notification.id}>
                  <Link
                    href="#"
                    className={`flex items-start gap-4 p-4 transition-colors duration-150 hover:bg-gray-50 sm:gap-6 sm:p-6 ${
                      notification.status === NotificationStatus.UNREAD ? "bg-green-50" : ""
                    }`}
                  >
                    <div className="flex-shrink-0 pt-1">
                      <BellIcon
                        className={`h-6 w-6 sm:h-7 sm:w-7 ${
                          notification.status === NotificationStatus.READ
                            ? "text-gray-400"
                            : "text-green-500"
                        }`}
                      />
                    </div>
                    <div className="min-w-0 flex-grow">
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
                    </div>

                    <div className="flex-shrink-0 self-center">
                      <ChevronRightIcon className="h-5 w-5 text-gray-400 sm:h-6 sm:w-6" />
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  )
}
