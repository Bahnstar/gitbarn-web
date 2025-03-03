import { redirect } from "next/navigation"
import Form from "@/components/Form"
import { changePassword } from "@/server/handlers/auth"
import { getCurrentUser } from "@/server/handlers/users"

export default async function ProfilePage() {
  const {
    data: { user },
  } = await getCurrentUser()

  if (!user) {
    return redirect("/login")
  }

  return (
    <div className="flex max-h-full flex-1 flex-col p-8 sm:px-6 lg:px-8">
      <div className="flex flex-wrap items-center justify-between">
        <h1 className="self-start text-4xl leading-6 font-semibold text-gray-900">
          Reset Password
        </h1>
      </div>

      <div className="flex flex-1 flex-col items-center justify-center">
        <div className="grid max-w-7xl grid-cols-1 gap-x-8 gap-y-10 overflow-x-hidden rounded-lg border border-gray-200 bg-white px-4 py-16 sm:px-6 md:grid-cols-3 lg:px-8">
          <div>
            <h2 className="text-base leading-7 font-semibold">Change password</h2>
            <p className="mt-1 text-sm leading-6 text-gray-400">
              Update your password associated with your account.
            </p>
          </div>

          <Form className="md:col-span-2" action={changePassword} showSubmitButton={false}>
            <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:max-w-xl sm:grid-cols-6">
              <div className="col-span-full">
                <label htmlFor="new-password" className="block text-sm leading-6 font-medium">
                  New password
                </label>
                <div className="mt-2">
                  <input
                    id="new-password"
                    name="new_password"
                    type="password"
                    required
                    autoComplete="new-password"
                    className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-xs ring-1 ring-gray-300 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-green-500 focus:ring-inset sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="col-span-full">
                <label htmlFor="confirm-password" className="block text-sm leading-6 font-medium">
                  Confirm password
                </label>
                <div className="mt-2">
                  <input
                    id="confirm-password"
                    name="confirm_password"
                    type="password"
                    required
                    autoComplete="new-password"
                    className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-xs ring-1 ring-gray-300 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-green-500 focus:ring-inset sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>

            <div className="mt-8 flex">
              <button type="submit" className="btn-primary">
                Save
              </button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  )
}
