import Script from "next/script"

import { getCurrentUser } from "@/server/handlers/users"
import { getCartsWithProducts } from "@/server/handlers/carts"

import { Product } from "@/types/product"
import CartForm from "./CartForm"

export interface CartItem extends Product {
  cartId?: string
  quantity: number
}

const CartPage = async () => {
  const [userRes, cartRes] = await Promise.all([getCurrentUser(), getCartsWithProducts()])

  const { data: userData, error: userError } = userRes
  const { user } = userData

  const { data: fullCart, error: cartError } = cartRes
  const cart: CartItem[] = fullCart!.map((c) => ({
    ...c.Products!,
    cartId: c.id,
    quantity: c.quantity,
  }))

  let total = 0
  cart && cart.forEach((item) => (total += Number(item.amount) * item.quantity))

  return (
    <div className="flex w-full flex-1 flex-col items-center gap-20">
      <Script
        src="https://secure.safewebservices.com/token/Collect.js"
        data-tokenization-key={process.env.NEXT_PUBLIC_COLLECTJS_KEY}
        strategy="beforeInteractive"
      />

      <h1 className="text-3xl font-bold leading-tight tracking-tight text-gray-900">Cart</h1>

      <CartForm user={user!} cart={cart!} total={total} />
    </div>
  )
}

export default CartPage
