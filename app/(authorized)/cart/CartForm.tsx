"use client"
import { useState, useEffect, FormEvent } from "react"
import Script from "next/script"
import { useRouter } from "next/navigation"
import { LoaderCircle } from "lucide-react"
import { toast } from "sonner"

import { User } from "@supabase/supabase-js"
import { OrderSubmission } from "@/types/tigerTransaction"
import { Tokenization } from "@/types/tigerTransaction"
import { CartWithTotal } from "@/types/cart"
import { makeTransaction } from "@/server/handlers/tiger"

import CartPreview from "./CartPreview"
import CartFields from "./CartFields"

declare var CollectJS: {
  configure: Function
  startPaymentRequest: Function
  orderData: OrderSubmission
}

const CartButton = (props: { isSubmitting: boolean }) => (
  <button
    type="submit"
    disabled={props.isSubmitting}
    className="w-full rounded-md border border-transparent bg-green-600 px-4 py-3 text-base font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-50"
  >
    {!props.isSubmitting ? (
      "Confirm order"
    ) : (
      <span>
        <LoaderCircle className="absolute animate-spin" />
        Placing Order
      </span>
    )}
  </button>
)

const checkCreditInfoValid = (document: any): boolean => {
  const validCC = document.querySelector("#ccnumber .CollectJSValid") !== null
  const validExp = document.querySelector("#ccexp .CollectJSValid") !== null
  const validCVV = document.querySelector("#cvv .CollectJSValid") !== null

  return validCC && validExp && validCVV
}

const CartForm = (props: { user: User; cart: CartWithTotal }) => {
  const { user, cart } = props

  const [clientWindow, setClientWindow] = useState<Window>()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [hideCollect, setHideCollect] = useState(true)

  const router = useRouter()

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()

    if (!checkCreditInfoValid(clientWindow!.document)) {
      toast.error("Credit card information is blank or invalid")
      return
    }

    const tempData = new FormData(e.target as HTMLFormElement)
    let data: any = {}
    tempData.forEach((value: any, key: string) => (data[key] = value))

    setIsSubmitting(true)
    CollectJS.orderData = data
    CollectJS.startPaymentRequest()
  }

  const finishSubmit = async (order: Tokenization) => {
    const payload = CollectJS.orderData
    const response = await makeTransaction(payload, order.token)
    setIsSubmitting(false)

    if (response === "OK") {
      toast.success("Order successfully created")
      router.push("/orders")
    } else {
      toast.error(`An error occured: ${response}`)
    }
  }

  const configureCreditFields = () => {
    CollectJS.configure({
      variant: "inline",
      styleSniffer: true,
      callback: (response: Tokenization) => finishSubmit(response),
      fields: {
        ccnumber: {
          selector: "#ccnumber",
        },
        ccexp: {
          selector: "#ccexp",
        },
        cvv: {
          selector: "#cvv",
        },
      },
    })
  }

  useEffect(() => {
    if (typeof window === "undefined") return
    setClientWindow(window)
    setTimeout(() => setHideCollect(false), 1000)
  }, [])

  return (
    <form onSubmit={handleSubmit} className="flex w-full max-w-7xl flex-col gap-6 md:flex-row">
      <Script
        src="https://secure.safewebservices.com/token/Collect.js"
        data-tokenization-key={process.env.NEXT_PUBLIC_COLLECTJS_KEY}
        onReady={configureCreditFields}
      />

      <div className="flex-1">
        <div className="flex h-fit flex-col gap-4 lg:grid lg:grid-cols-2 lg:gap-x-6 lg:gap-y-6">
          <CartFields user={user!} />
        </div>

        <div className="relative mt-5 flex h-fit min-h-[150px] flex-1 flex-col gap-4 lg:grid lg:grid-cols-2 lg:gap-x-6 lg:gap-y-6">
          {hideCollect && (
            <div className="absolute flex h-full w-full items-center justify-center rounded-lg bg-gray-100 ring-1 ring-gray-200">
              <LoaderCircle className="h-20 w-20 animate-spin text-green-500" />
            </div>
          )}

          <div className="iframe-input col-span-2">
            <label htmlFor="card-number" className="block text-sm font-medium text-gray-700">
              Card number
            </label>
            <div className="mt-1">
              <div id="ccnumber"></div>
            </div>
          </div>

          <div className="iframe-input col-span-1">
            <label htmlFor="expiration-date" className="block text-sm font-medium text-gray-700">
              Expiration date (MM/YY)
            </label>
            <div className="mt-1">
              <div id="ccexp"></div>
            </div>
          </div>

          <div className="iframe-input col-span-1">
            <label htmlFor="cvc" className="block text-sm font-medium text-gray-700">
              CVC
            </label>
            <div className="mt-1">
              <div id="cvv" className="bruh"></div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1">
        <h2 className="mb-6 text-lg font-medium text-gray-900">Order summary</h2>
        <CartPreview cart={cart} SubmissionButton={<CartButton isSubmitting={isSubmitting} />} />
      </div>
    </form>
  )
}

export default CartForm
