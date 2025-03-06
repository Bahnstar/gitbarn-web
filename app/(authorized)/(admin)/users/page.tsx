import { getProfiles } from "@/server/handlers/profiles"
import Link from "next/link"
import UserManagementTable from "./UserManagementTable"
import UserStats from "./UserStats"
import AddUserButton from "./AddUserButton"

import { MailPlusIcon } from "lucide-react"

export default async function UsersPage() {
  const { data: users, error } = await getProfiles()

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <h1 className="self-start text-4xl font-semibold text-gray-900">Users</h1>
        <p className="hidden text-sm text-gray-500 sm:block">
          Manage user accounts, roles, and permissions
        </p>
        <div className="flex items-center gap-4">
          <Link href="/emails" className="btn-primary">
            Send emails
            <MailPlusIcon className="h-4 w-4" />
          </Link>
          {/* <AddUserButton /> */}
        </div>
      </div>

      {/* User statistics */}
      <div className="mb-8">
        <UserStats users={users || []} />
      </div>

      <div className="overflow-hidden rounded-lg bg-white shadow">
        <UserManagementTable initialUsers={users || []} />
      </div>
    </div>
  )
}
