import { redirect } from "next/navigation"
import Form from "@/components/Form"
import { resetPassowrdByEmail } from "@/server/handlers/auth"
import { getCurrentUser } from "@/server/handlers/users"
import PageContainer from "@/components/PageContainer"

export default async function ProfilePage() {
  const {
    data: { user },
  } = await getCurrentUser()

  if (user) {
    return redirect("/reset")
  }

  return (
    <PageContainer title="Forgot Password">
      <div className="flex flex-1 flex-col items-center justify-center">
        <div className="grid max-w-7xl grid-cols-1 gap-x-8 gap-y-10 overflow-x-hidden rounded-lg border border-gray-200 bg-white px-4 py-16 sm:px-6 md:grid-cols-3 lg:px-8">
          <div>
            <h2 className="text-base leading-7 font-semibold">Email Recovery</h2>
            <p className="mt-1 text-sm leading-6 text-gray-400">
              Click here to send a password reset email
              <br />
              If the email is valid, a password reset link will be sent to you.
              <br />
              <br />
              Please check your spam!
            </p>
          </div>

          <Form
            className="md:col-span-2"
            action={resetPassowrdByEmail}
            showSubmitButton={false}
            redirect="/forgot/confirm"
          >
            <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:max-w-xl sm:grid-cols-6">
              <div className="col-span-full">
                <label htmlFor="email" className="block text-sm leading-6 font-medium">
                  Email
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-xs ring-1 ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-green-500 focus:ring-inset disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500 disabled:ring-gray-200 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>
            <button type="submit" className="mt-8 btn-primary">
              Click here to reset password
            </button>
          </Form>
        </div>
      </div>
    </PageContainer>
  )
}
