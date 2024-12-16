"use client"
import { PropsWithChildren, useState } from "react"
import { toast } from "sonner"

import { getCurrentUser } from "@/server/handlers/users"
import { getCartsById, updateCart, createCart } from "@/server/handlers/carts"
import clientRevalidate from "@/utils/clientRevalidate"
import { Cart } from "@/types/cart"

import { LoaderCircle } from "lucide-react"

const AddToCartButton = (
  props: PropsWithChildren<{ productId: string; productTitle: string; className?: string }>,
) => {
  const { productId: id, productTitle: title, className, children } = props

  const [loading, setLoading] = useState(false)

  const addToCart = async () => {
    const {
      data: { user },
    } = await getCurrentUser()

    const { data: carts, error: cError } = await getCartsById(id, true)

    const cartItem: Cart = {
      user_id: user!.id,
      product_id: id,
      quantity: 1,
    }

    setLoading(true)

    let error: any
    if (carts && carts?.length > 0) {
      const { data, error: err } = await updateCart(carts[0].id!, {
        quantity: carts[0].quantity + 1,
      })
      error = err
    } else {
      const { error: err } = await createCart(cartItem)
      error = err
    }

    if (error) {
      console.error(error)
      return
    }

    setLoading(false)
    clientRevalidate("/cart")
    toast.success(`${title} was successfully added to your cart`)
  }

  return (
    <button onClick={addToCart} className={className}>
      {loading ? <LoaderCircle className="animate-spin" /> : children}
    </button>
  )
}

export default AddToCartButton
