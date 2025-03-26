import { getRecentConversations } from "@/server/handlers/conversations"
import { getMonthOrderCounts, getCompletedTransactions } from "@/server/handlers/tiger"
import { getUserWithProfile } from "@/server/handlers/users"
import Chart from "./Chart"
import { getLast12MonthsStatsByType } from "@/server/handlers/monthlyStats"
import { Role } from "@/types/profile"

export default async function DashboardPage() {
  const [{ data: user }, recentOrders, { data: recentConversations }, { data: orderStats }] =
    await Promise.all([
      getUserWithProfile(),
      getCompletedTransactions(0, undefined, 5),
      getRecentConversations(5),
      getLast12MonthsStatsByType("orders"),
    ])

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Welcome, {user?.first_name} {user?.last_name}
        </h1>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {user?.role === Role.ADMIN && orderStats && orderStats.length > 0 && (
          <div className="col-span-full lg:col-span-2">
            <div className="rounded-lg bg-white p-6 shadow-lg">
              <div className="mb-4">
                <h2 className="text-lg font-semibold">Order Counts</h2>
                <p className="text-sm text-gray-500">View the number of orders placed per month.</p>
              </div>
              <div className="h-[300px] w-full">
                <Chart orderStats={orderStats.reverse()} />
              </div>
            </div>
          </div>
        )}

        <div className="rounded-lg bg-white p-6 shadow-lg">
          <div className="mb-4">
            <h2 className="text-lg font-semibold">Recent Orders</h2>
            <p className="text-sm text-gray-500">
              View the latest orders placed by your customers.
            </p>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                    Order Date
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                    Customer
                  </th>
                  <th className="px-4 py-3 text-right text-xs font-medium tracking-wider text-gray-500 uppercase">
                    Total
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {recentOrders?.map((order) => (
                  <tr key={order.transaction_id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 text-sm whitespace-nowrap">
                      {order.actions[0].date.slice(4, 6)}/{order.actions[0].date.slice(6, 8)}/
                      {order.actions[0].date.slice(0, 4)}
                    </td>
                    <td className="px-4 py-3 text-sm whitespace-nowrap">
                      {order.customer.first_name} {order.customer.last_name}
                    </td>
                    <td className="px-4 py-3 text-right text-sm whitespace-nowrap">
                      ${order.actions[0].amount}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="rounded-lg bg-white p-6 shadow-lg">
          <div className="mb-4">
            <h2 className="text-lg font-semibold">Recent Support Chats</h2>
            <p className="text-sm text-gray-500">View the latest support chats.</p>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="w-[45%] px-4 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                    Topic
                  </th>
                  <th className="w-[25%] px-4 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                    Status
                  </th>
                  <th className="w-[30%] px-4 py-3 text-right text-xs font-medium tracking-wider text-gray-500 uppercase">
                    Created On
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {recentConversations?.map((conversation) => (
                  <tr key={conversation.id} className="hover:bg-gray-50">
                    <td className="max-w-0 px-4 py-3">
                      <div
                        className="truncate text-sm font-medium text-gray-900"
                        title={conversation.title}
                      >
                        {conversation.title}
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm whitespace-nowrap">
                      <span
                        className={`inline-flex rounded-full px-2 text-xs leading-5 font-semibold ${
                          conversation.is_active
                            ? "bg-green-100 text-green-800"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {conversation.is_active ? "Active" : "Inactive"}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right text-sm whitespace-nowrap">
                      {new Date(conversation.created_at!).toLocaleDateString("en-US", {
                        month: "2-digit",
                        day: "2-digit",
                        year: "numeric",
                      })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
