import { SubmitButton } from "./submit-button"
import { login } from "../../server/handlers/auth"
import { getCurrentUser } from "@/server/handlers/users"
import { redirect } from "next/navigation"
import Toaster from "@/components/Toaster"
import Link from "next/link"

export default async function Login({
  searchParams,
}: Readonly<{ searchParams: { message: string } }>) {
  const {
    data: { user },
  } = await getCurrentUser()

  if (user) {
    redirect("/dashboard")
  }

  return (
    <div className="mx-auto mt-[30%] max-w-sm flex-1 space-y-10 px-4 md:mt-[10%] md:px-0">
      {searchParams?.message && <Toaster message={searchParams.message} />}
      <div>
        <img
          className="mx-auto h-10 w-auto"
          src="https://gitbarn.com/wp-content/uploads/2018/06/gitbarn-logo.png"
          alt="GitBarn"
        />
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Sign in to your account
        </h2>
      </div>
      <form className="space-y-6" action="#" method="POST">
        <div className="relative -space-y-px rounded-md shadow-xs">
          <div className="pointer-events-none absolute inset-0 z-10 rounded-md ring-1 ring-inset ring-gray-300" />
          <div>
            <label htmlFor="email-address" className="sr-only">
              Email address
            </label>
            <input
              id="email-address"
              name="email"
              type="email"
              autoComplete="email"
              required
              className="relative block w-full rounded-t-md border-0 px-3 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-100 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-green-700 sm:text-sm sm:leading-6"
              placeholder="Email address"
            />
          </div>
          <div>
            <label htmlFor="password" className="sr-only">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              className="relative block w-full rounded-b-md border-0 px-3 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-100 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-green-700 sm:text-sm sm:leading-6"
              placeholder="Password"
            />
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <input
              id="remember-me"
              name="remember-me"
              type="checkbox"
              className="h-4 w-4 rounded-sm border-gray-300 text-green-700 focus:ring-green-700"
            />
            <label htmlFor="remember-me" className="ml-3 block text-sm leading-6 text-gray-900">
              Remember me
            </label>
          </div>

          <div className="text-sm leading-6">
            <a href="#" className="font-semibold text-green-700 hover:text-indigo-500">
              Forgot password?
            </a>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <SubmitButton
            formAction={login}
            className="flex w-full justify-center rounded-md bg-green-700 px-3 py-1.5 text-sm font-semibold leading-6 text-white hover:bg-green-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-700"
            pendingText="Signing in..."
          >
            Sign in
          </SubmitButton>

          <Link
            className="border-1 flex w-full justify-center rounded-md border border-green-700 px-3 py-1.5 text-sm font-semibold leading-6 text-green-700 hover:bg-green-600 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-700"
            href="/signup"
          >
            Sign Up
          </Link>
        </div>
      </form>
    </div>
  )
}
