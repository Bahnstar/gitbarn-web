import OrdersList from "@/components/OrdersList"
import { getCompletedTransactions } from "@/server/handlers/tiger"
import { getUserWithProfile } from "@/server/handlers/users"

export default async function OrdersPage() {
  const { data, error } = await getUserWithProfile()
  const orders = await getCompletedTransactions(0)

  return (
    <div className="flex w-full flex-1 flex-col gap-6 p-4 sm:gap-10">
      <h1 className="text-4xl font-semibold leading-6 text-gray-900">Order History</h1>
      <OrdersList initialOrders={orders} role={data!.role} />
    </div>
  )
}
