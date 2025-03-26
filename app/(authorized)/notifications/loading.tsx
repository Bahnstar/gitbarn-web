import { clsx } from "clsx"

export default function NotificationsLoading() {
  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="flex flex-wrap items-center justify-between">
        <div className="h-8 w-48 animate-pulse rounded-md bg-gray-200"></div>
        <div className="mt-4 sm:mt-0">
          <div className="h-10 w-36 animate-pulse rounded-md bg-gray-200"></div>
        </div>
      </div>

      <div className="mt-10">
        <div className="relative mb-6">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4"></div>
        </div>
        <ul
          role="list"
          className="divide-y divide-gray-100 overflow-hidden rounded-lg bg-white shadow-sm ring-1 ring-gray-900/5"
        >
          {[...Array(3)].map((_, index) => (
            <li
              key={index}
              className="flex flex-col items-center justify-between gap-4 gap-x-6 px-2 py-5 md:flex-row md:px-6"
            >
              <div className="w-full min-w-0">
                <div className="flex items-start gap-x-3">
                  <div className="h-5 w-48 animate-pulse rounded-md bg-gray-200"></div>
                  <div className="h-5 w-16 animate-pulse rounded-md bg-gray-200"></div>
                </div>
                <div className="mt-1 flex items-center gap-x-2 text-xs/5 text-gray-500">
                  <div className="h-4 w-36 animate-pulse rounded-md bg-gray-200"></div>
                </div>
                <div className="mt-2 h-4 w-full animate-pulse rounded-md bg-gray-200"></div>
              </div>
              <div className="flex flex-none items-center gap-x-4">
                <div className="flex space-x-2">
                  <div className="h-9 w-20 animate-pulse rounded-md bg-gray-200"></div>
                  <div className="h-9 w-20 animate-pulse rounded-md bg-gray-200"></div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
