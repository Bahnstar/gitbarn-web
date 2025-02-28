import OrdersList from "@/components/OrdersList"
import { getCompletedTransactions } from "@/server/handlers/tiger"
import { getUserWithProfile } from "@/server/handlers/users"

export default async function OrdersPage() {
  const { data, error } = await getUserWithProfile()
  const orders = await getCompletedTransactions(0)

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="flex flex-wrap items-center justify-between">
        <h1 className="self-start text-4xl leading-6 font-semibold text-gray-900">Order History</h1>
      </div>
      <OrdersList initialOrders={orders} role={data!.role} />
    </div>
  )
}
