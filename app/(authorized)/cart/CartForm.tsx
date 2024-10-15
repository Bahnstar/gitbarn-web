"use client"
import { useState, useEffect, FormEvent } from "react"
import Script from "next/script"
import { LoaderCircle } from "lucide-react"

import CartPreview from "./CartPreview"
import CartFields from "./CartFields"
import { CartItem } from "./page"
import { User } from "@supabase/supabase-js"

import { OrderSubmission } from "@/types/tigerTransaction"
import { Tokenization } from "@/types/tigerTransaction"
import { makeTransaction } from "@/server/handlers/tiger"
import { toast } from "sonner"

declare var CollectJS: {
  configure: Function
  startPaymentRequest: Function
  orderData: OrderSubmission
}

const CartButton = (props: { isSubmitting: boolean }) => (
  <button
    type="submit"
    disabled={props.isSubmitting}
    className="w-full rounded-md border border-transparent bg-indigo-600 px-4 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50"
  >
    {!props.isSubmitting ? (
      "Confirm order"
    ) : (
      <span>
        <LoaderCircle className="animate-spin" />
        Placing Order
      </span>
    )}
  </button>
)

const CartForm = (props: { user: User; cart: CartItem[]; total: Number }) => {
  const { user, cart, total } = props
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    const tempData = new FormData(e.target as HTMLFormElement)

    let data: any = {}
    tempData.forEach((value: any, key: string) => (data[key] = value))

    CollectJS.orderData = data
    setIsSubmitting(true)
    CollectJS.startPaymentRequest()
  }

  const finishSubmit = async (order: Tokenization) => {
    console.log(CollectJS.orderData)
    const payload = CollectJS.orderData || toast.error("Error during checkout")
    const transaction = await makeTransaction(payload, order.token)
    setIsSubmitting(false)
    console.log("Transaction allegedly completed")
  }

  useEffect(() => {
    window !== undefined &&
      CollectJS &&
      CollectJS.configure({
        variant: "inline",
        styleSniffer: true,
        callback: (response: Tokenization) => finishSubmit(response),
        fields: {
          ccnumber: {
            placeholder: "CC Number",
            selector: "#ccnumber",
          },
          ccexp: {
            placeholder: "CC Expiration",
            selector: "#ccexp",
          },
          cvv: {
            placeholder: "CVV",
            selector: "#cvv",
          },
        },
      })
  }, [])

  return (
    <form onSubmit={handleSubmit} className="flex w-full max-w-7xl flex-col gap-6 md:flex-row">
      <Script
        src="https://secure.safewebservices.com/token/Collect.js"
        data-tokenization-key={process.env.NEXT_PUBLIC_COLLECTJS_KEY}
        strategy="beforeInteractive"
      />
      <div className="h-fit flex-1 gap-y-6 lg:grid lg:grid-cols-2 lg:gap-x-6">
        <CartFields user={user!} />
      </div>

      <div className="flex-1">
        <h2 className="mb-6 text-lg font-medium text-gray-900">Order summary</h2>
        <CartPreview
          cart={cart}
          total={total}
          SubmissionButton={<CartButton isSubmitting={isSubmitting} />}
        />
      </div>
    </form>
  )
}

export default CartForm
