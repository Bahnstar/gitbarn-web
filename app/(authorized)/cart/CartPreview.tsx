"use client"
import Image from "next/image"
import { TrashIcon } from "@heroicons/react/20/solid"
import { getCartsWithProducts, deleteCart } from "@/server/handlers/carts"

import clientRevalidate from "@/utils/clientRevalidate"
import UpdateCart from "./UpdateCart"
import { CartItem } from "./page"
import { JsxElement } from "typescript"
import { SubmitButton } from "@/app/login/submit-button"

const CartPreview = (props: {
  cart: CartItem[]
  total: Number
  SubmissionButton: React.ReactNode
}) => {
  const { cart, total, SubmissionButton } = props

  const handleRemoveFromCart = async (id: string) => {
    const res = await deleteCart(id)
    clientRevalidate("/newcart")
  }

  return (
    <div className="rounded-xl bg-white shadow-sm ring-1 ring-gray-900/5">
      <h3 className="sr-only">Items in your cart</h3>
      <ul role="list" className="divide-y divide-gray-200 px-5">
        {cart?.map((item, i) => (
          <li key={item.id} className="flex gap-3 py-6 sm:py-10">
            <Image
              src={`${process.env.NEXT_PUBLIC_SUPABASE_BUCKET}${item.id}?v=${item.image}`}
              alt={item.title || "Product image"}
              width={600}
              height={600}
              className="h-[100px] w-[100px] rounded-md object-cover"
            />

            <div className="flex w-full justify-between">
              <div className="flex flex-col justify-between">
                <h3 className="text-sm">{item.title}</h3>
                <h2>${Number(item.amount).toFixed(2)}</h2>
              </div>

              <div className="flex flex-col justify-between">
                <UpdateCart cartId={item.cartId!} quantity={item.quantity} productIdx={i} />
              </div>
            </div>
          </li>
        ))}
      </ul>

      <div className="flex flex-col gap-4 border-t border-gray-200 px-8 py-6">
        <div className="flex justify-between">
          <dt className="text-md">Subtotal</dt>
          <dd className="text-md font-medium text-gray-900">${total.toFixed(2)}</dd>
        </div>
        <div className="flex justify-between">
          <dt className="text-md">Taxes</dt>
          <dd className="text-md font-medium text-gray-900">TBD</dd>
        </div>
        <hr />
        <div className="mt-2 flex justify-between">
          <dt className="text-xl">Total</dt>
          <dd className="text-xl font-medium text-gray-900">${total.toFixed(2)}</dd>
          <input name="amount" type="number" hidden defaultValue={total.toFixed(2)} />
        </div>
      </div>

      <div className="border-t border-gray-200 px-8 py-6">
        <SubmissionButton />
      </div>
    </div>
  )
}

export default CartPreview
