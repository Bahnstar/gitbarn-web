"use client"
import Image from "next/image"

import UpdateCart from "./UpdateCart"
import { CartWithTotal } from "@/types/cart"
import Link from "next/link"
import { ShoppingCartIcon } from "lucide-react"

const CartPreview = (props: { cart: CartWithTotal; SubmissionButton: React.ReactNode }) => {
  const { cart, SubmissionButton } = props

  return (
    <div className="rounded-xl bg-white shadow-xs ring-1 ring-gray-900/5">
      <h3 className="sr-only">Items in your cart</h3>

      {cart.items.length > 0 ? (
        <>
          <ul role="list" className="divide-y divide-gray-200 px-5">
            {cart.items.map((item, i) => (
              <li key={item.id} className="flex gap-3 py-6 sm:py-10">
                <Image
                  src={`${process.env.NEXT_PUBLIC_SUPABASE_BUCKETS}${item.image}`}
                  alt={item.title || "Product image"}
                  width={600}
                  height={600}
                  className="h-[100px] w-[100px] rounded-md object-cover"
                />

                <div className="flex w-full justify-between">
                  <div className="flex flex-col justify-between">
                    <h3 className="text-sm">{item.title}</h3>
                    <h2 className="flex items-center">
                      ${Number(item.amount).toFixed(2)}
                      <span className="text-xs text-gray-800">/ea</span>
                    </h2>
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
              <dd className="text-md font-medium text-gray-900">${cart.subtotal.toFixed(2)}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-md">Estimated Taxes</dt>
              <dd className="text-md font-medium text-gray-900">FREE</dd>
            </div>
            <hr />
            <div className="mt-2 flex justify-between">
              <dt className="text-xl">Total</dt>
              <dd className="text-xl font-medium text-gray-900">${cart.total.toFixed(2)}</dd>
              <input name="amount" type="number" hidden defaultValue={cart.total.toFixed(2)} />
            </div>
          </div>
        </>
      ) : (
        <div className="">
          <h2 className="col-span-2 w-full p-5 text-center text-lg font-medium text-gray-900">
            There are no items in your cart
          </h2>
        </div>
      )}

      <div className="flex justify-center border-t border-gray-200 px-8 py-6">
        {cart.items.length > 0 ? (
          SubmissionButton
        ) : (
          <Link
            href="/products"
            className="btn-primary w-full"
          >
            <ShoppingCartIcon className="h-4 w-4" />
            <span>Add Products</span>
          </Link>
        )}
      </div>
    </div>
  )
}

export default CartPreview
