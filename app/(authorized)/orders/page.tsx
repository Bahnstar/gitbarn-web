import OrdersSearch from "@/components/OrdersSearch"
import OrdersTable from "@/components/OrdersTable"
import { getCompletedTransactions } from "@/server/handlers/tiger"

export default async function DashboardPage() {
  const orders = await getCompletedTransactions(0)

  return (
    <div className="flex w-full flex-1 flex-col items-center gap-20">
      <h1 className="self-start text-4xl font-semibold leading-6 text-gray-900">Your Orders</h1>
      <div className="w-full px-4 sm:px-6 lg:px-0">
        <div className="sm:flex sm:items-center">
          <div className="mt-4 flex w-full justify-between gap-4 sm:mt-0">
            <OrdersSearch />
          </div>
        </div>
      </div>
      <OrdersTable initialOrders={orders} />
    </div>
  )
}
