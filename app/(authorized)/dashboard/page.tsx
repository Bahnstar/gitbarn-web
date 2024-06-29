import { getCurrentUser } from "@/server/handlers/users"

export default async function DashboardPage() {
  const {
    data: { user },
  } = await getCurrentUser()

  return (
    <div className="flex w-full flex-1 flex-col items-center gap-20">
      <h1 className="self-start text-4xl font-semibold leading-6 text-gray-900">
        Welcome, {user?.email?.split("@")[0]}
      </h1>
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
                  <th>Order</th>
                  <th>Customer</th>
                  <th className="text-right">Total</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="font-medium">#3210</td>
                  <td>Olivia Martin</td>
                  <td className="text-right">$42.25</td>
                </tr>
                <tr>
                  <td className="font-medium">#3209</td>
                  <td>Ava Johnson</td>
                  <td className="text-right">$74.99</td>
                </tr>
                <tr>
                  <td className="font-medium">#3204</td>
                  <td>Michael Johnson</td>
                  <td className="text-right">$64.75</td>
                </tr>
                <tr>
                  <td className="font-medium">#3203</td>
                  <td>Lisa Anderson</td>
                  <td className="text-right">$34.50</td>
                </tr>
                <tr>
                  <td className="font-medium">#3202</td>
                  <td>Samantha Green</td>
                  <td className="text-right">$89.99</td>
                </tr>
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
                  <th>Customer</th>
                  <th>Topic</th>
                  <th className="text-right">Time</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="font-medium">Olivia Martin</td>
                  <td>Order Inquiry</td>
                  <td className="text-right">5 min ago</td>
                </tr>
                <tr>
                  <td className="font-medium">Ava Johnson</td>
                  <td>Refund Request</td>
                  <td className="text-right">15 min ago</td>
                </tr>
                <tr>
                  <td className="font-medium">Michael Johnson</td>
                  <td>Shipping Issue</td>
                  <td className="text-right">30 min ago</td>
                </tr>
                <tr>
                  <td className="font-medium">Lisa Anderson</td>
                  <td>Product Feedback</td>
                  <td className="text-right">45 min ago</td>
                </tr>
                <tr>
                  <td className="font-medium">Samantha Green</td>
                  <td>Account Question</td>
                  <td className="text-right">1 hour ago</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
