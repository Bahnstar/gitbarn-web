"use client"

import { Profile, Role } from "@/types/profile"
import { Users, ShieldCheck, UserCog } from "lucide-react"

interface UserStatsProps {
  users: Profile[]
}

export default function UserStats({ users }: UserStatsProps) {
  const totalUsers = users.length
  const adminCount = users.filter((user) => user.role === Role.ADMIN).length
  const supportCount = users.filter((user) => user.role === Role.SUPPORT).length
  const customerCount = users.filter((user) => user.role === Role.USER).length

  const stats = [
    { name: "Total Users", value: totalUsers, icon: Users, color: "bg-indigo-100 text-indigo-600" },
    { name: "Admins", value: adminCount, icon: ShieldCheck, color: "bg-red-100 text-red-600" },
    {
      name: "Support Staff",
      value: supportCount,
      icon: UserCog,
      color: "bg-blue-100 text-blue-600",
    },
    { name: "Customers", value: customerCount, icon: Users, color: "bg-green-100 text-green-600" },
  ]

  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <div
          key={stat.name}
          className="overflow-hidden rounded-lg bg-white px-4 py-5 shadow sm:p-6"
        >
          <div className="flex items-center">
            <div className={`rounded-md p-3 ${stat.color}`}>
              <stat.icon className="h-6 w-6" aria-hidden="true" />
            </div>
            <div className="ml-5 w-0 flex-1">
              <dt className="truncate text-sm font-medium text-gray-500">{stat.name}</dt>
              <dd className="flex items-baseline">
                <div className="text-2xl font-semibold text-gray-900">{stat.value}</div>
              </dd>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
