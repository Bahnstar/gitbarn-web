import { getProfiles } from "@/server/handlers/profiles"
import UserManagementTable from "./UserManagementTable"
import UserStats from "./UserStats"
import AddUserButton from "./AddUserButton"
import { Role } from "@/types/profile"

export default async function UsersPage() {
  const { data: users, error } = await getProfiles()

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="mb-8 flex flex-wrap items-center justify-between">
        <h1 className="self-start text-4xl font-semibold leading-6 text-gray-900">Users</h1>
        <div className="mt-4 flex items-center gap-4 sm:mt-0">
          <AddUserButton />
          <p className="text-sm text-gray-500">Manage user accounts, roles, and permissions</p>
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
