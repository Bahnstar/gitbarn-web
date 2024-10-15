"use client"

import { deleteCart, updateCart } from "@/server/handlers/carts"
import clientRevalidate from "@/utils/clientRevalidate"
import { useState } from "react"
import { TrashIcon } from "@heroicons/react/20/solid"

type Props = {
  cartId: string
  quantity: number
  productIdx: number
}

export default function UpdateCart(props: Props) {
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

    clientRevalidate("/newcart")
  }

  const handleRemove = async (e: MouseEvent, id: string) => {
    e.preventDefault()
    const res = await deleteCart(id)
    clientRevalidate("/newcart")
  }

  return (
    <>
      <button
        onClick={(e) => handleRemove(e, props.cartId)}
        className="flex justify-end text-gray-400 hover:text-gray-500"
      >
        <span className="sr-only">Remove</span>
        <TrashIcon aria-hidden="true" className="h-6" />
      </button>
      <select
        id={`quantity-${props.productIdx}`}
        name={`quantity-${props.productIdx}`}
        value={quantity}
        onChange={handleChange}
        className="max-w-full rounded-md border border-gray-300 p-1.5 text-left text-base font-medium leading-5 text-gray-700 shadow-sm focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500 sm:text-sm"
      >
        {[...Array(8)].map((_, i) => (
          <option key={i + 1} value={i + 1}>
            {i + 1}
          </option>
        ))}
      </select>
    </>
  )
}
