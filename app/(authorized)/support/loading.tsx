import { clsx } from "clsx"

export default function SupportLoading() {
  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="h-8 w-32 animate-pulse rounded-md bg-gray-200"></div>
        <div className="h-10 w-40 animate-pulse rounded-md bg-gray-200"></div>
      </div>

      <ul
        role="list"
        className="mt-10 divide-y divide-gray-100 overflow-hidden rounded-lg bg-white shadow-sm ring-1 ring-gray-900/5"
      >
        {[...Array(4)].map((_, index) => (
          <li
            key={index}
            className="flex flex-col items-center justify-between gap-4 gap-x-6 px-2 py-5 md:flex-row md:px-6"
          >
            <div className="w-full min-w-0">
              <div className="flex items-start justify-center gap-x-3 md:justify-start">
                <div className="h-5 w-48 animate-pulse rounded-md bg-gray-200"></div>
                <div className="mt-0.5 h-5 w-24 animate-pulse rounded-md bg-gray-200"></div>
              </div>
              <div className="mt-1 flex items-center gap-x-2 text-xs/5 text-gray-500">
                <div className="h-4 w-36 animate-pulse rounded-md bg-gray-200"></div>
                <svg viewBox="0 0 2 2" className="size-0.5 fill-current">
                  <circle r={1} cx={1} cy={1} />
                </svg>
                <div className="h-4 w-20 animate-pulse rounded-md bg-gray-200"></div>
              </div>
            </div>
            <div className="flex flex-none items-center gap-x-4">
              <div className="h-9 w-24 animate-pulse rounded-md bg-gray-200"></div>
              <div className="h-9 w-24 animate-pulse rounded-md bg-gray-200"></div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
