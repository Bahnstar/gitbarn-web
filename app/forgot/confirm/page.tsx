import { MailIcon } from "lucide-react"

type SearchParams = Promise<{ message: string }>

export default async function Verify({ searchParams }: { searchParams: SearchParams }) {
  const { message } = await searchParams
  return (
    <div className="mx-auto mt-[10%] max-w-md flex-1 px-4 md:px-0">
      <div className="overflow-hidden rounded-lg bg-white shadow-xs">
        <div className="p-6 text-center">
          <div className="flex items-center justify-center gap-2">
            <MailIcon className="h-8 w-8 text-green-500" />
            <h1 className="text-xl font-semibold text-gray-900">Password Reset Confirmation</h1>
          </div>
          <p className="text-gray-600">
            A password reset email will be sent if an account matching the emails exists.
          </p>
          <div className="mt-6 space-y-4 text-sm text-gray-500">
            <p>Your email may take a few minutes to arrive. Please check your spam inbox.</p>
            <p>
              Didn't receive the email?{" "}
              <a
                href="mailto:support@gitbarn.com"
                className="cursor-pointer text-green-500 hover:text-green-600"
              >
                Contact Us
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
