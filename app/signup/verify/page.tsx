import { MailIcon } from "lucide-react"

export default function Verify({ searchParams }: Readonly<{ searchParams: { message: string } }>) {
  return (
    <div className="mx-auto mt-[10%] max-w-md flex-1 px-4 md:px-0">
      <div className="overflow-hidden rounded-lg bg-white shadow-sm">
        <div className="p-6 text-center">
          <div className="flex items-center justify-center gap-2">
            <MailIcon className="h-8 w-8 text-green-500" />
            <h1 className="text-xl font-semibold text-gray-900">Verify Your Email</h1>
          </div>
          <p className="text-gray-600">
            Thank you for joining GitBarn! We've sent a verification link to your email address.
          </p>
          <div className="mt-6 space-y-4 text-sm text-gray-500">
            <p>
              Please check your inbox and click the verification link to complete your registration.
            </p>
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
