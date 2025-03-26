import { ShoppingBag } from "lucide-react"

export default function CartLoading() {
  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="mb-6">
        <div className="h-10 w-32 animate-pulse rounded bg-gray-200" />
      </div>

      <div className="grid grid-cols-1 gap-x-8 gap-y-8 lg:grid-cols-2">
        {/* Contact and shipping information - left side */}
        <div>
          {/* Contact information section */}
          <div className="mb-8">
            <div className="mb-4 h-6 w-48 animate-pulse rounded bg-gray-200" />

            {/* Email address */}
            <div className="mb-4">
              <div className="mb-2 h-5 w-32 animate-pulse rounded bg-gray-200" />
              <div className="h-10 w-full animate-pulse rounded bg-gray-200" />
            </div>

            {/* Phone number */}
            <div className="mb-4">
              <div className="mb-2 h-5 w-32 animate-pulse rounded bg-gray-200" />
              <div className="h-10 w-full animate-pulse rounded bg-gray-200" />
            </div>

            {/* Company */}
            <div className="mb-4">
              <div className="mb-2 h-5 w-24 animate-pulse rounded bg-gray-200" />
              <div className="h-10 w-full animate-pulse rounded bg-gray-200" />
            </div>
          </div>

          <div className="my-6 h-px w-full animate-pulse bg-gray-200" />

          {/* Shipping information section */}
          <div>
            <div className="mb-4 h-6 w-48 animate-pulse rounded bg-gray-200" />

            {/* Name fields */}
            <div className="mb-4 grid grid-cols-2 gap-4">
              {/* First name */}
              <div>
                <div className="mb-2 h-5 w-24 animate-pulse rounded bg-gray-200" />
                <div className="h-10 w-full animate-pulse rounded bg-gray-200" />
              </div>

              {/* Last name */}
              <div>
                <div className="mb-2 h-5 w-24 animate-pulse rounded bg-gray-200" />
                <div className="h-10 w-full animate-pulse rounded bg-gray-200" />
              </div>
            </div>

            {/* Address */}
            <div className="mb-4">
              <div className="mb-2 h-5 w-20 animate-pulse rounded bg-gray-200" />
              <div className="h-10 w-full animate-pulse rounded bg-gray-200" />
            </div>

            {/* Apartment */}
            <div className="mb-4">
              <div className="mb-2 h-5 w-40 animate-pulse rounded bg-gray-200" />
              <div className="h-10 w-full animate-pulse rounded bg-gray-200" />
            </div>

            {/* City and State */}
            <div className="mb-4 grid grid-cols-2 gap-4">
              <div>
                <div className="mb-2 h-5 w-12 animate-pulse rounded bg-gray-200" />
                <div className="h-10 w-full animate-pulse rounded bg-gray-200" />
              </div>
              <div>
                <div className="mb-2 h-5 w-32 animate-pulse rounded bg-gray-200" />
                <div className="h-10 w-full animate-pulse rounded bg-gray-200" />
              </div>
            </div>

            {/* Postal code and Country */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="mb-2 h-5 w-24 animate-pulse rounded bg-gray-200" />
                <div className="h-10 w-full animate-pulse rounded bg-gray-200" />
              </div>
              <div>
                <div className="mb-2 h-5 w-20 animate-pulse rounded bg-gray-200" />
                <div className="h-10 w-full animate-pulse rounded bg-gray-200" />
              </div>
            </div>
          </div>
        </div>

        {/* Order summary - right side */}
        <div>
          <div className="mb-4 h-6 w-36 animate-pulse rounded bg-gray-200" />

          <div className="rounded-lg bg-white p-6 shadow-sm">
            {/* Empty cart message */}
            <div className="flex h-32 w-full items-center justify-center">
              <div className="h-6 w-64 animate-pulse rounded bg-gray-200" />
            </div>

            {/* Add products button */}
            <div className="mt-4 h-12 w-full animate-pulse rounded-lg bg-green-100" />
          </div>
        </div>
      </div>
    </div>
  )
}
