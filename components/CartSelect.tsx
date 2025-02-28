"use client"

import { updateCart } from "@/server/handlers/carts"
import { useState } from "react"

type Props = {
  cartId: string
  quantity: number
  productIdx: number
}

export default function CartSelect(props: Props) {
  const [quantity, setQuantity] = useState(props.quantity)

  const handleChange = async (e: { target: { value: any } }) => {
    setQuantity(e.target.value)

    const { data, error } = await updateCart(props.cartId, {
      quantity: e.target.value,
    })
    if (error) {
      console.log(error)
      return
    }
  }

  return (
    <select
      id={`quantity-${props.productIdx}`}
      name={`quantity-${props.productIdx}`}
      value={quantity}
      onChange={handleChange}
      className="max-w-full rounded-md border border-gray-300 p-1.5 text-left text-base font-medium leading-5 text-gray-700 shadow-xs focus:border-green-500 focus:outline-hidden focus:ring-1 focus:ring-green-500 sm:text-sm"
    >
      {[...Array(8)].map((_, i) => (
        <option key={i + 1} value={i + 1}>
          {i + 1}
        </option>
      ))}
    </select>
  )
}
