import Form from "@/components/Form"
import { FormResponse } from "@/components/Form"
import { getUserWithProfile } from "@/server/handlers/users"
import { processProfile } from "@/utils/forms"
import ImageUpload from "@/components/ImageUpload"
import { changePassword, resetPassowrdByEmail } from "@/server/handlers/auth"

export default async function ProfilePage() {
  const { data: profile, error: profileError } = await getUserWithProfile()

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="flex flex-wrap items-center justify-between">
        <h1 className="self-start text-4xl leading-6 font-semibold text-gray-900">
          Account Settings
        </h1>
      </div>

      {/* Settings forms */}
      <div className="mt-10 flex flex-1 flex-col items-center gap-20">
        <div className="flex flex-col gap-8">
          <div className="grid max-w-7xl grid-cols-1 gap-x-8 gap-y-10 overflow-x-hidden rounded-lg border border-gray-200 bg-white px-4 py-16 sm:px-6 md:grid-cols-3 lg:px-8">
            <div>
              <h2 className="text-base leading-7 font-semibold">Personal Information</h2>
              <p className="mt-1 text-sm leading-6 text-gray-400">
                Use a permanent address where you can receive mail.
              </p>
            </div>

            <Form className="md:col-span-2" action={processProfile} showSubmitButton={false}>
              <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:max-w-xl sm:grid-cols-6">
                <div className="col-span-full flex items-center gap-x-8">
                  <ImageUpload
                    buttonText="Change avatar"
                    caption="JPG, GIF, or PNG up to 1MB"
                    containerClassName="flex w-full gap-5"
                    imageClassName="w-28 h-28"
                    id={profile?.id}
                    image={profile?.avatar_url}
                  />
                  {/* <img
                  src={profile?.avatar_url}
                  alt=""
                  className="h-24 w-24 flex-none rounded-lg bg-gray-800 object-cover"
                />
                <div>
                  <button
                    type="button"
                    className="rounded-md bg-gray-200 px-3 py-2 text-sm  font-semibold shadow-xs hover:bg-black/20"
                  >
                    Change avatar
                  </button>
                  <p className="mt-2 text-xs leading-5 text-gray-400">JPG, GIF or PNG. 1MB max.</p>
                </div> */}
                </div>

                <input id="id" name="id" defaultValue={profile?.id} hidden />
                <div className="sm:col-span-3">
                  <label htmlFor="first-name" className="block text-sm leading-6 font-medium">
                    First name
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      name="first_name"
                      id="first-name"
                      defaultValue={profile?.first_name}
                      autoComplete="given-name"
                      className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-xs ring-1 ring-gray-300 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-green-500 focus:ring-inset sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div className="sm:col-span-3">
                  <label htmlFor="last-name" className="block text-sm leading-6 font-medium">
                    Last name
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      name="last_name"
                      id="last-name"
                      defaultValue={profile?.last_name}
                      autoComplete="family-name"
                      className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-xs ring-1 ring-gray-300 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-green-500 focus:ring-inset sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div className="col-span-full">
                  <label htmlFor="email" className="block text-sm leading-6 font-medium">
                    Email address
                  </label>
                  <div className="mt-2">
                    <input
                      id="email"
                      name="email"
                      type="email"
                      defaultValue={profile?.email}
                      disabled
                      autoComplete="email"
                      className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-xs ring-1 ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-green-500 focus:ring-inset disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500 disabled:ring-gray-200 sm:text-sm sm:leading-6"
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

          <div className="grid max-w-7xl grid-cols-1 gap-x-8 gap-y-10 overflow-x-hidden rounded-lg border border-gray-200 bg-white px-4 py-16 sm:px-6 md:grid-cols-3 lg:px-8">
            <div>
              <h2 className="text-base leading-7 font-semibold">Change password</h2>
              <p className="mt-1 text-sm leading-6 text-gray-400">
                Update your password associated with your account.
              </p>
            </div>

            <Form className="md:col-span-2" action={resetPassowrdByEmail} showSubmitButton={false}>
              <div className="mt-8 flex">
                <button type="submit" className="btn-primary">
                  Click here to reset password
                </button>
              </div>
            </Form>
          </div>

          {/* <div className="grid max-w-7xl grid-cols-1 gap-x-8 gap-y-10 overflow-x-hidden rounded-lg border border-gray-200 bg-white px-4 py-16 sm:px-6 md:grid-cols-3 lg:px-8">
            <div>
              <h2 className="text-base leading-7 font-semibold">Log out other sessions</h2>
              <p className="mt-1 text-sm leading-6 text-gray-400">
                Please enter your password to confirm you would like to log out of your other
                sessions across all of your devices.
              </p>
            </div>

            <form className="md:col-span-2">
              <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:max-w-xl sm:grid-cols-6">
                <div className="col-span-full">
                  <label htmlFor="logout-password" className="block text-sm leading-6 font-medium">
                    Your password
                  </label>
                  <div className="mt-2">
                    <input
                      id="logout-password"
                      name="password"
                      type="password"
                      autoComplete="current-password"
                      className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-xs ring-1 ring-gray-300 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-green-500 focus:ring-inset sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
              </div>

              <div className="mt-8 flex">
                <button
                  type="submit"
                  className="rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-green-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
                >
                  Log out other sessions
                </button>
              </div>
            </form>
          </div> */}
          {/*
          <div className="grid max-w-7xl grid-cols-1 gap-x-8 gap-y-10 overflow-x-hidden rounded-lg border border-gray-200 bg-gray-600 px-4 py-16 text-white sm:px-6 md:grid-cols-3 lg:px-8">
            <div>
              <h2 className="text-base leading-7 font-semibold">Delete account</h2>
              <p className="mt-1 text-sm leading-6 text-gray-200">
                No longer want to use our service? You can delete your account here. This action is
                not reversible. All information related to this account will be deleted permanently.
              </p>
            </div>

            <form className="flex items-start md:col-span-2">
              <button type="submit" className="btn-primary">
                Yes, delete my account
              </button>
            </form>
          </div> */}
        </div>
      </div>
    </div>
  )
}
