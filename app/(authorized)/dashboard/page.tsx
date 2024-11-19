import { getRecentConversations } from "@/server/handlers/conversations"
import { getMonthOrderCounts, getRecentOrders } from "@/server/handlers/tiger"
import { getUserWithProfile } from "@/server/handlers/users"
import Chart from "./Chart"
import { getMonthlyStatsByYearAndType } from "@/server/handlers/monthlyStats"

export default async function DashboardPage() {
  const [{ data: user }, recentOrders, { data: recentConversations }, { data: orderStats }] =
    await Promise.all([
      getUserWithProfile(),
      getRecentOrders(),
      getRecentConversations(5),
      getMonthlyStatsByYearAndType(new Date().getFullYear(), "orders"),
    ])

  return (
    <div className="flex w-full flex-1 flex-col items-center gap-20">
      <h1 className="self-start text-4xl font-semibold leading-6 text-gray-900">
        Welcome, {user?.first_name} {user?.last_name}
      </h1>
      <div className="container grid gap-8 px-4 md:px-6 lg:grid-cols-[1fr_1fr] lg:gap-8">
        <div className="aspect-h-7 aspect-w-10 group block w-full space-y-6 overflow-hidden rounded-lg bg-base-100 p-6 shadow-lg">
          <div className="grid gap-1">
            <h2 className="text-lg font-semibold">Order Counts</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              View the number of orders placed per month.
            </p>
            <Chart orderStats={orderStats!} />
          </div>
        </div>
      </div>
      <div className="container grid gap-8 px-4 md:px-6 lg:grid-cols-[1fr_1fr] lg:gap-8">
        <div className="aspect-h-7 aspect-w-10 group block w-full space-y-6 overflow-hidden rounded-lg bg-base-100 p-6 shadow-lg">
          <div className="grid gap-1">
            <h2 className="text-lg font-semibold">Recent Orders</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              View the latest orders placed by your customers.
            </p>
          </div>
          <div className="card">
            <table className="table">
              <thead>
                <tr>
                  <th>Order Date</th>
                  <th>Customer</th>
                  <th className="text-right">Total</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders?.map((order) => {
                  return (
                    <tr key={order.transaction_id}>
                      {/* TODO: Format date as MM-DD-YYYY */}
                      <td>
                        {order.actions[0].date.slice(4, 6)}-{order.actions[0].date.slice(6, 8)}-
                        {order.actions[0].date.slice(0, 4)}
                      </td>
                      <td>
                        {order.customer.first_name} {order.customer.last_name}
                      </td>
                      <td className="text-right">${order.actions[0].amount}</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
        <div className="aspect-h-7 aspect-w-10 group block w-full space-y-6 overflow-hidden rounded-lg bg-base-100 p-6  shadow-lg">
          <div className="grid gap-1">
            <h2 className="text-lg font-semibold">Recent Support Chats</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              View the latest support chats.
            </p>
          </div>
          <div className="card ">
            <table className="table">
              <thead>
                <tr>
                  <th>Topic</th>
                  <th>Status</th>
                  <th className="text-right">Time</th>
                </tr>
              </thead>
              <tbody>
                {recentConversations?.map((conversation) => {
                  return (
                    <tr key={conversation.id}>
                      {/* <td>{conversation.users.email}</td> */}
                      <td className="line-clamp-1 font-medium">{conversation.title}</td>
                      <td>{conversation.is_active ? "Active" : "Inactive"}</td>
                      <td className="text-right">
                        {new Date(conversation.created_at!).toLocaleDateString("en-US", {
                          month: "2-digit",
                          day: "2-digit",
                          year: "numeric",
                        })}
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
