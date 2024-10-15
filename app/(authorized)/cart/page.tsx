import { getCurrentUser } from "@/server/handlers/users"
import { getCartWithTotal } from "@/server/handlers/carts"

import CartForm from "./CartForm"

const CartPage = async () => {
  const [userRes, cart] = await Promise.all([getCurrentUser(), getCartWithTotal()])

  const { data: userData, error: userError } = userRes
  const { user } = userData

  return (
    <div className="flex w-full flex-1 flex-col items-center gap-20">
      <h1 className="text-3xl font-bold leading-tight tracking-tight text-gray-900">Cart</h1>

      <CartForm user={user!} cart={cart!} />
    </div>
  )
}

export default CartPage
