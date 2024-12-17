import { getCurrentUser } from "@/server/handlers/users"
import { getCartWithTotal } from "@/server/handlers/carts"

import CartForm from "./CartForm"

const CartPage = async () => {
  const [userRes, cart] = await Promise.all([getCurrentUser(), getCartWithTotal()])

  const { data: userData, error: userError } = userRes
  const { user } = userData

  return (
    <div className="flex w-full flex-1 flex-col gap-6 p-4 sm:gap-10">
      <h1 className="self-start text-4xl font-semibold leading-6 text-gray-900">Cart</h1>

      <CartForm user={user!} cart={cart!} />
    </div>
  )
}

export default CartPage
