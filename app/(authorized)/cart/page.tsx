import { getCurrentUser } from "@/server/handlers/users"
import { getCartWithTotal } from "@/server/handlers/carts"

import CartForm from "./CartForm"

const CartPage = async () => {
  const [userRes, cart] = await Promise.all([getCurrentUser(), getCartWithTotal()])

  const { data: userData, error: userError } = userRes
  const { user } = userData

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="flex flex-wrap items-center justify-between">
        <h1 className="self-start text-4xl leading-6 font-semibold text-gray-900">Cart</h1>
      </div>

      <CartForm user={user!} cart={cart!} />
    </div>
  )
}

export default CartPage
