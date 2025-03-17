export default function DocumentsLoading() {
  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="flex flex-wrap items-center justify-between">
        <div className="h-8 w-40 animate-pulse rounded-md bg-gray-200"></div>
        <div className="h-10 w-36 animate-pulse rounded-md bg-gray-200"></div>
      </div>

      <div className="mt-8">
        {/* Admin filter placeholder */}
        <div className="mb-4 flex items-center">
          <div className="h-8 w-64 animate-pulse rounded-md bg-gray-200"></div>
        </div>

        {/* Document grid */}
        <ul role="list" className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[...Array(3)].map((_, index) => (
            <li
              key={index}
              className="col-span-1 divide-y divide-gray-200 rounded-lg bg-white shadow"
            >
              <div className="flex w-full items-center justify-between p-6 pb-4">
                <div className="flex-1 truncate">
                  <div className="flex items-center space-x-3">
                    <div className="h-5 w-32 animate-pulse rounded-md bg-gray-200"></div>
                    <div className="inline-flex h-5 w-16 shrink-0 animate-pulse items-center rounded-full bg-gray-200"></div>
                  </div>
                  <div className="my-2">
                    <div className="h-4 w-40 animate-pulse rounded-md bg-gray-200"></div>
                    <div className="mt-1 h-4 w-32 animate-pulse rounded-md bg-gray-200"></div>
                  </div>
                  <div className="h-4 w-48 animate-pulse rounded-md bg-gray-200"></div>
                </div>
              </div>
              <div>
                <div className="flex justify-center gap-3 py-4">
                  <div className="h-9 w-28 animate-pulse rounded-md bg-gray-200"></div>
                  <div className="h-9 w-24 animate-pulse rounded-md bg-gray-200"></div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
