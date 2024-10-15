"use client"
import Image from "next/image"
import Script from "next/script"
import Link from "next/link"
import { useState, useEffect, FormEvent } from "react"
import { toast } from "sonner"
import { getCurrentUser } from "@/server/handlers/users"
import { deleteCart, getCartsWithProducts, updateCart } from "@/server/handlers/carts"
import { makeTransaction } from "@/server/handlers/tiger"
import { TrashIcon } from "@heroicons/react/20/solid"

import { Product } from "@/types/product"
import { OrderSubmission, Tokenization } from "@/types/tigerTransaction"
import CheckoutForm from "./form"
import CartSelect from "@/components/CartSelect"
import { LoaderCircle } from "lucide-react"

// Declare "CollectJS" object so type checking knows this object exists
declare var CollectJS: {
  configure: Function
  startPaymentRequest: Function
  orderData: OrderSubmission
}

interface Cart extends Product {
  cartId?: string
  quantity?: string
}

const CartPage = () => {
  const [products, setProducts] = useState<Cart[]>([])
  const [total, setTotal] = useState(0)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [data, setData] = useState<OrderSubmission>({ email: "" } as OrderSubmission)

  const getProducts = async () => {
    const { data: cartItems, error } = await getCartsWithProducts()
    const mappedProducts = cartItems!.map((cart) => {
      return {
        ...cart.Products,
        cartId: cart.id,
        quantity: cart.quantity,
      }
    })

    setProducts(mappedProducts as Cart[])
  }

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()
    setIsSubmitting(true)
    CollectJS.orderData = data
    CollectJS.startPaymentRequest()
  }

  const getData = () => data

  const finishSubmit = async (response: Tokenization) => {
    console.log(CollectJS.orderData)
    const transaction = await makeTransaction(CollectJS.orderData, response.token)
    console.log("Transaction allegedly completed")
    setIsSubmitting(false)
  }

  const handleRemoveFromCart = async (e: FormEvent, id: string) => {
    e.preventDefault()
    await deleteCart(id)
    await getProducts()
    toast.success("Product successfully removed from cart")
  }

  const handleQuantityChange = (index: number, quantity: string) => {
    let temp = [...products]
    temp[index].quantity = quantity
    setProducts(temp)
  }

  useEffect(() => {
    getProducts()

    if (typeof window !== "undefined" && CollectJS) {
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
    }
  }, [])

  useEffect(() => {
    let sum = 0
    products?.forEach((p: Cart) => (sum += Number(p.amount) * p.quantity!))
    setTotal(sum)
    setData({
      ...data,
      amount: sum,
    })

    if (CollectJS.orderData) CollectJS.orderData.amount = sum
  }, [products])

  useEffect(() => console.log(data), [data])

  return (
    <div className="bg-gray-50">
      <Script
        src="https://secure.safewebservices.com/token/Collect.js"
        data-tokenization-key={process.env.NEXT_PUBLIC_COLLECTJS_KEY}
        strategy="beforeInteractive"
      />
      <div className="mx-auto max-w-2xl px-4 pb-24 pt-16 sm:px-6 lg:max-w-7xl lg:px-8">
        <h2 className="sr-only">Checkout</h2>

        <form onSubmit={handleSubmit} className="lg:grid lg:grid-cols-2 lg:gap-x-12 xl:gap-x-16">
          <CheckoutForm fields={data} setFields={setData} />

          {/* Order summary */}
          <div className="mt-10 lg:mt-0">
            <h2 className="text-lg font-medium text-gray-900">Order summary</h2>

            <div className="mt-4 rounded-lg border border-gray-200 bg-white shadow-sm">
              <h3 className="sr-only">Items in your cart</h3>
              <ul role="list" className="divide-y divide-gray-200 px-5">
                {products?.map((product, productIdx) => (
                  <li key={product.id} className="flex py-6 sm:py-10">
                    <div className="flex-shrink-0">
                      <Image
                        src={`${process.env.NEXT_PUBLIC_SUPABASE_BUCKET}${product.id}?v=${product.image}`}
                        alt={product.title!}
                        width={800}
                        height={600}
                        className="w-20 rounded-md"
                      />
                    </div>

                    <div className="ml-6 flex flex-1 flex-col">
                      <div className="flex">
                        <div className="min-w-0 flex-1">
                          <h4 className="text-sm">
                            <Link
                              href={"/products"}
                              className="font-medium text-gray-700 hover:text-gray-800"
                            >
                              {product.title}
                            </Link>
                          </h4>
                          <p className="mt-1 text-sm text-gray-500">
                            ${Number(product.amount).toFixed(2)}
                          </p>
                        </div>

                        <div className="ml-4 flow-root flex-shrink-0">
                          <button
                            type="button"
                            onClick={(e) => handleRemoveFromCart(e, product.cartId!)}
                            className="-m-2.5 flex items-center justify-center bg-white p-2.5 text-gray-400 hover:text-gray-500"
                          >
                            <span className="sr-only">Remove</span>
                            <TrashIcon aria-hidden="true" className="h-5 w-5" />
                          </button>
                        </div>
                      </div>

                      <div className="flex flex-1 items-end justify-between pt-2">
                        <p className="mt-1 text-sm font-medium text-gray-900">{product.price}</p>

                        <div className="ml-4">
                          <label htmlFor="quantity" className="sr-only">
                            Quantity
                          </label>
                          <select
                            id={`quantity-${productIdx}`}
                            name={`quantity-${productIdx}`}
                            value={product.quantity}
                            onChange={(e) => handleQuantityChange(productIdx, e.target.value)}
                            className="max-w-full rounded-md border border-gray-300 p-1.5 text-left text-base font-medium leading-5 text-gray-700 shadow-sm focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500 sm:text-sm"
                          >
                            {[...Array(8)].map((_, i) => (
                              <option key={i + 1} value={i + 1}>
                                {i + 1}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
              <dl className="space-y-6 border-t border-gray-200 px-4 py-6 sm:px-6">
                <div className="flex items-center justify-between">
                  <dt className="text-sm">Subtotal</dt>
                  <dd className="text-sm font-medium text-gray-900">${total.toFixed(2)}</dd>
                </div>
                <div className="flex items-center justify-between">
                  <dt className="text-sm">Shipping</dt>
                  <dd className="text-sm font-medium text-gray-900">TBA</dd>
                </div>
                <div className="flex items-center justify-between">
                  <dt className="text-sm">Taxes</dt>
                  <dd className="text-sm font-medium text-gray-900">TBA</dd>
                </div>
                <div className="flex items-center justify-between border-t border-gray-200 pt-6">
                  <dt className="text-base font-medium">Total</dt>
                  <dd className="text-base font-medium text-gray-900">${total.toFixed(2)}</dd>
                </div>
              </dl>

              <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full rounded-md border border-transparent bg-indigo-600 px-4 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50"
                >
                  {!isSubmitting ? (
                    "Confirm order"
                  ) : (
                    <span>
                      <LoaderCircle className="animate-spin" />
                      Placing Order
                    </span>
                  )}
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default CartPage
