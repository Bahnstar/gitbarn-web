import { MailPlusIcon } from "lucide-react"

export default function Loading() {
  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div className="h-10 w-32 animate-pulse self-start rounded bg-gray-200" />
        <div className="hidden h-5 w-80 animate-pulse rounded bg-gray-200 sm:block" />
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 opacity-70 btn-primary">
            Send emails
            <MailPlusIcon className="h-4 w-4" />
          </div>
        </div>
      </div>

      {/* User statistics skeleton */}
      <div className="mb-8">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6">
              <div className="flex items-center">
                <div className="rounded-md bg-gray-100 p-3">
                  <div className="h-6 w-6 animate-pulse rounded bg-gray-200" />
                </div>
                <div className="ml-5 w-0 flex-1">
                  <div className="h-4 w-20 animate-pulse rounded bg-gray-200" />
                  <div className="mt-2 h-7 w-12 animate-pulse rounded bg-gray-200" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* User table skeleton */}
      <div className="overflow-hidden rounded-lg bg-white shadow">
        <div className="p-4 sm:p-6">
          {/* Search and filter skeleton */}
          <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
            <div className="h-10 w-64 animate-pulse rounded bg-gray-200" />
            <div className="h-10 w-40 animate-pulse rounded bg-gray-200" />
          </div>

          {/* Table skeleton */}
          <div className="overflow-hidden rounded-lg border border-gray-200">
            <div className="min-w-full divide-y divide-gray-200">
              {/* Table header */}
              <div className="bg-gray-50 px-6 py-3">
                <div className="grid grid-cols-5 gap-4">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="h-5 animate-pulse rounded bg-gray-200" />
                  ))}
                </div>
              </div>

              {/* Table rows */}
              <div className="divide-y divide-gray-200 bg-white">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="px-6 py-4">
                    <div className="grid grid-cols-5 gap-4">
                      {[...Array(5)].map((_, j) => (
                        <div key={j} className="h-5 animate-pulse rounded bg-gray-200" />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
