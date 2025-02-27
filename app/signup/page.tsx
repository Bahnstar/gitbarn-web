import Form from "@/components/Form"
import { getCurrentUser } from "@/server/handlers/users"
import { redirect } from "next/navigation"
import { signup } from "../../server/handlers/auth"

export default async function SignupPage() {
  const {
    data: { user },
  } = await getCurrentUser()

  if (user) {
    redirect("/dashboard")
  }

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <img
          alt="GitBarn"
          src="https://gitbarn.com/wp-content/uploads/2018/06/gitbarn-logo.png"
          className="mx-auto h-10 w-auto"
        />
        <h2 className="mt-6 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
          Register a new account
        </h2>
      </div>

      <div className="mt-10 px-2 sm:mx-auto sm:w-full sm:max-w-[480px]">
        <div className="rounded-lg bg-white px-6 py-12 shadow-sm sm:px-12">
          <Form className="md:col-span-2" action={signup} showSubmitButton={false}>
            <div className="grid grid-cols-1 gap-x-6 gap-y-4 sm:max-w-xl sm:grid-cols-6">
              <div className="sm:col-span-3">
                <label htmlFor="first-name" className="block text-sm font-medium leading-6 ">
                  First name
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="first_name"
                    id="first-name"
                    required
                    autoComplete="given-name"
                    className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-xs ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-500 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label htmlFor="last-name" className="block text-sm font-medium leading-6 ">
                  Last name
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="last_name"
                    id="last-name"
                    required
                    autoComplete="family-name"
                    className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-xs ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-500 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="col-span-full">
                <label htmlFor="email" className="block text-sm font-medium leading-6 ">
                  Email address
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-xs ring-1 ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-500 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500 disabled:ring-gray-200 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="col-span-full">
                <label htmlFor="password" className="block text-sm font-medium leading-6">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  minLength={6}
                  required
                  className="mt-2 block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-xs ring-1 ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-500 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500 disabled:ring-gray-200 sm:text-sm sm:leading-6"
                />
              </div>

              <div className="col-span-full">
                <label htmlFor="confirm" className="block text-sm font-medium leading-6">
                  Confirm Password
                </label>
                <input
                  id="password"
                  name="confirm"
                  type="password"
                  required
                  className="mt-2 block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-xs ring-1 ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-green-500 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500 disabled:ring-gray-200 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <button
              type="submit"
              className="mt-8 w-full rounded-md bg-green-600 px-3 py-4 text-sm font-semibold text-white shadow-xs hover:bg-green-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
            >
              Sign Up
            </button>
          </Form>
        </div>
      </div>
    </div>
  )
}
