import OrdersList from "@/components/OrdersList"
import OrdersSearch from "@/components/OrdersSearch"
import OrdersTable from "@/components/OrdersTable"
import { getCompletedTransactions } from "@/server/handlers/tiger"

export default async function DashboardPage() {
  const orders = await getCompletedTransactions(0)
  console.log("ORDERS", orders)
  return (
    <div className="flex w-full flex-1 flex-col gap-6 p-4 sm:gap-10 ">
      <h1 className="text-4xl font-semibold leading-6 text-gray-900">Order History</h1>
      <OrdersList initialOrders={orders} />
    </div>
  )
}
