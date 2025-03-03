"use client"

import { useState, useEffect } from "react"
import { Profile, Role } from "@/types/profile"
import { updateProfile } from "@/server/handlers/profiles"
import { toast } from "sonner"
import { Search, Filter, Edit, UserCheck, UserX, RefreshCw, Eye, X } from "lucide-react"
import { formatDate } from "@/utils/utils"
import UserDetailsModal from "./UserDetailsModal"

export default function UserManagementTable({ initialUsers }: { initialUsers: Profile[] }) {
  const [users, setUsers] = useState<Profile[]>(initialUsers)
  const [filteredUsers, setFilteredUsers] = useState<Profile[]>(initialUsers)
  const [searchTerm, setSearchTerm] = useState("")
  const [roleFilter, setRoleFilter] = useState<Role | "all">("all")
  const [editingUser, setEditingUser] = useState<string | null>(null)
  const [selectedRole, setSelectedRole] = useState<Role>(Role.USER)
  const [isLoading, setIsLoading] = useState(false)
  const [selectedUser, setSelectedUser] = useState<Profile | null>(null)
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false)

  // Filter users based on search term and role filter
  useEffect(() => {
    let result = users

    // Apply search filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase()
      result = result.filter(
        (user) =>
          user.email?.toLowerCase().includes(term) ||
          user.first_name?.toLowerCase().includes(term) ||
          user.last_name?.toLowerCase().includes(term) ||
          user.username?.toLowerCase().includes(term),
      )
    }

    // Apply role filter
    if (roleFilter !== "all") {
      result = result.filter((user) => user.role === roleFilter)
    }

    setFilteredUsers(result)
  }, [searchTerm, roleFilter, users])

  const handleRoleChange = async (userId: string, newRole: Role) => {
    try {
      setIsLoading(true)
      const { data, error } = await updateProfile(userId, { role: newRole })

      if (error) {
        toast.error(`Failed to update user role: ${error.message}`)
        return
      }

      // Update local state
      setUsers(users.map((user) => (user.id === userId ? { ...user, role: newRole } : user)))
      toast.success(`User role updated to ${newRole}`)
      setEditingUser(null)
    } catch (error) {
      toast.error("An error occurred while updating the user role")
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  const openUserDetails = (user: Profile) => {
    setSelectedUser(user)
    setIsDetailsModalOpen(true)
  }

  const closeUserDetails = () => {
    setIsDetailsModalOpen(false)
    setSelectedUser(null)
  }

  const getRoleBadgeClass = (role: Role) => {
    switch (role) {
      case Role.ADMIN:
        return "bg-red-100 text-red-800 border-red-300"
      case Role.SUPPORT:
        return "bg-blue-100 text-blue-800 border-blue-300"
      case Role.USER:
        return "bg-green-100 text-green-800 border-green-300"
      default:
        return "bg-gray-100 text-gray-800 border-gray-300"
    }
  }

  return (
    <div className="px-4 py-4 sm:px-6 lg:px-8">
      {/* Filters and search */}
      <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row">
        <div className="relative max-w-xs rounded-md shadow-sm">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <Search className="h-4 w-4 text-gray-400" />
          </div>
          <input
            type="text"
            className="block w-full rounded-md border-0 py-1.5 pl-10 text-gray-900 ring-1 ring-gray-300 ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-indigo-600 focus:ring-inset sm:text-sm sm:leading-6"
            placeholder="Search users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-gray-400" />
          <select
            className="rounded-md border-0 py-1.5 pr-10 pl-3 text-gray-900 ring-1 ring-gray-300 ring-inset focus:ring-2 focus:ring-indigo-600 focus:ring-inset sm:text-sm sm:leading-6"
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value as Role | "all")}
          >
            <option value="all">All Roles</option>
            <option value={Role.ADMIN}>Admin</option>
            <option value={Role.SUPPORT}>Support</option>
            <option value={Role.USER}>User</option>
          </select>
        </div>
      </div>

      {/* Users table */}
      <div className="mt-4 flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle">
            <table className="min-w-full divide-y divide-gray-300">
              <thead>
                <tr>
                  <th
                    scope="col"
                    className="py-3.5 pr-3 pl-4 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                  >
                    Name
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Email
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Username
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Role
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Last Updated
                  </th>
                  <th scope="col" className="relative py-3.5 pr-4 pl-3 sm:pr-6">
                    <span className="sr-only">Actions</span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {filteredUsers.length > 0 ? (
                  filteredUsers.map((user) => (
                    <tr key={user.id} className="hover:bg-gray-50">
                      <td className="py-4 pr-3 pl-4 text-sm font-medium whitespace-nowrap text-gray-900 sm:pl-6">
                        {user.first_name} {user.last_name}
                      </td>
                      <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500">
                        {user.email}
                      </td>
                      <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500">
                        {user.username}
                      </td>
                      <td className="px-3 py-4 text-sm whitespace-nowrap">
                        {editingUser === user.id ? (
                          <div className="flex items-center gap-2">
                            <select
                              className="rounded-md border-0 py-1 pr-7 pl-2 text-sm text-gray-900 ring-1 ring-gray-300 ring-inset focus:ring-2 focus:ring-indigo-600 focus:ring-inset"
                              value={selectedRole}
                              onChange={(e) => setSelectedRole(e.target.value as Role)}
                            >
                              <option value={Role.ADMIN}>Admin</option>
                              <option value={Role.SUPPORT}>Support</option>
                              <option value={Role.USER}>User</option>
                            </select>
                            <button
                              onClick={() => handleRoleChange(user.id, selectedRole)}
                              className="rounded-full p-1 text-green-600 hover:bg-green-100"
                              disabled={isLoading}
                            >
                              {isLoading ? (
                                <RefreshCw className="h-4 w-4 animate-spin" />
                              ) : (
                                <UserCheck className="h-4 w-4" />
                              )}
                            </button>
                            <button
                              onClick={() => setEditingUser(null)}
                              className="rounded-full p-1 text-red-600 hover:bg-red-100"
                              disabled={isLoading}
                            >
                              <X className="h-4 w-4" />
                            </button>
                          </div>
                        ) : (
                          <span
                            className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${getRoleBadgeClass(user.role)}`}
                          >
                            {user.role}
                          </span>
                        )}
                      </td>
                      <td className="px-3 py-4 text-sm whitespace-nowrap text-gray-500">
                        {user.updated_at ? formatDate(user.updated_at, "MM/dd/yyyy") : "N/A"}
                      </td>
                      <td className="relative py-4 pr-4 pl-3 text-right text-sm font-medium whitespace-nowrap sm:pr-6">
                        <div className="flex items-center justify-end space-x-3">
                          <button
                            onClick={() => openUserDetails(user)}
                            className="text-gray-600 hover:text-gray-900"
                          >
                            <Eye className="h-4 w-4 text-blue-500" />
                            <span className="sr-only">View details for {user.first_name}</span>
                          </button>

                          {editingUser !== user.id && (
                            <button
                              onClick={() => {
                                setEditingUser(user.id)
                                setSelectedRole(user.role)
                              }}
                              className="text-indigo-600 hover:text-indigo-900"
                            >
                              <Edit className="h-4 w-4 text-green-600" />
                              <span className="sr-only">Edit {user.first_name}</span>
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="py-10 text-center text-sm text-gray-500">
                      No users found matching your criteria
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* User count */}
      <div className="mt-4 text-sm text-gray-500">
        Showing {filteredUsers.length} of {users.length} users
      </div>

      {/* User details modal */}
      <UserDetailsModal
        user={selectedUser}
        isOpen={isDetailsModalOpen}
        onClose={closeUserDetails}
      />
    </div>
  )
}
