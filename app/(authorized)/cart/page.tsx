import Image from "next/image"
import { QuestionMarkCircleIcon, XMarkIcon } from "@heroicons/react/20/solid"
import { deleteCart, getCartsWithProducts } from "@/server/handlers/carts"
import Toaster from "@/components/Toaster"
import { revalidatePath } from "next/cache"
import Form from "@/components/Form"
import Link from "next/link"
import CartSelect from "@/components/CartSelect"

export default async function CartPage() {
  const { data: cartItems, error } = await getCartsWithProducts()
  if (error) {
    return <Toaster message={error.message} redirect="/cart" />
  }
  let products = cartItems!.map((cart) => {
    return {
      ...cart.Products,
      cartId: cart.id,
      quantity: cart.quantity,
    }
  })

  let total = 0
  if (products) {
    products!.forEach((product) => {
      total += Number(product.amount) * product.quantity
    })
  }

  const handleRemoveFromCart = async (_prevState: any, formData: FormData) => {
    "use server"
    const id = formData.get("id") as string
    await deleteCart(id)
    revalidatePath("/cart")
  }

  return (
    <div className="space-y-20">
      <h1 className="self-start text-4xl font-semibold leading-6 text-gray-900">Shopping Cart</h1>
      <div className="mx-auto max-w-2xl rounded-md bg-white px-4 pb-24 pt-16 shadow-sm sm:px-6 lg:max-w-7xl lg:px-8">
        {products.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-6">
            <h1 className="text-center text-2xl">
              Uh oh! It appears you have nothing in your shopping cart!
            </h1>
            <Link
              href="/products"
              className="w-fit rounded-md border border-transparent bg-green-600 px-4 py-3 text-center text-base font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-50"
            >
              Add products to cart here
            </Link>
          </div>
        ) : (
          <div className="lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12 xl:gap-x-16">
            <section aria-labelledby="cart-heading" className="lg:col-span-7">
              <h2 id="cart-heading" className="sr-only">
                Items in your shopping cart
              </h2>

              <ul
                role="list"
                className="divide-y divide-gray-200 border-b border-t border-gray-200"
              >
                {products?.map((product, productIdx) => (
                  <li key={product.id} className="flex py-6 sm:py-10">
                    <div className="flex-shrink-0">
                      <Image
                        src={`${process.env.NEXT_PUBLIC_SUPABASE_BUCKET}${product.id}?v=${product.image}`}
                        alt={product.title!}
                        width={800}
                        height={600}
                        className="h-24 w-24 rounded-md object-cover object-center sm:h-48 sm:w-48"
                      />
                    </div>
                    <div className="ml-4 flex flex-1 flex-col justify-between sm:ml-6">
                      <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
                        <div>
                          <div className="flex justify-between">
                            <h3 className="text-sm">
                              <a
                                href={product.title}
                                className="font-medium text-gray-700 hover:text-gray-800"
                              >
                                {product.title}
                              </a>
                            </h3>
                          </div>
                          <p className="mt-1 text-sm font-medium text-gray-900">
                            ${Number(product.amount).toFixed(2)}
                          </p>
                        </div>

                        <div className="mt-4 sm:mt-0 sm:pr-9">
                          {/* TODO: <CartSelect cartId={product.cartId!} productIdx={productIdx} quantity={product.quantity} /> */}
                          <Form action={handleRemoveFromCart} className="absolute right-0 top-0">
                            <input type="hidden" name="id" defaultValue={product.cartId} />
                            <button
                              type="submit"
                              className="-m-2 inline-flex p-2 text-gray-400 hover:text-gray-500"
                            >
                              <span className="sr-only">Remove</span>
                              <XMarkIcon aria-hidden="true" className="h-5 w-5" />
                            </button>
                          </Form>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </section>

            {/* Order summary */}
            <section
              aria-labelledby="summary-heading"
              className="mt-16 rounded-lg bg-gray-50 px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8"
            >
              <h2 id="summary-heading" className="text-lg font-medium text-gray-900">
                Order summary
              </h2>

              <dl className="mt-6 space-y-4">
                <div className="flex items-center justify-between">
                  <dt className="text-sm text-gray-600">Subtotal</dt>
                  <dd className="text-sm font-medium text-gray-900">${total.toFixed(2)}</dd>
                </div>
                <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                  <dt className="flex items-center text-sm text-gray-600">
                    <span>Shipping estimate</span>
                    <a href="#" className="ml-2 flex-shrink-0 text-gray-400 hover:text-gray-500">
                      <span className="sr-only">Learn more about how shipping is calculated</span>
                      <QuestionMarkCircleIcon aria-hidden="true" className="h-5 w-5" />
                    </a>
                  </dt>
                  <dd className="text-sm font-medium text-gray-900">$0.00</dd>
                </div>
                <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                  <dt className="flex text-sm text-gray-600">
                    <span>Tax estimate</span>
                    <a href="#" className="ml-2 flex-shrink-0 text-gray-400 hover:text-gray-500">
                      <span className="sr-only">Learn more about how tax is calculated</span>
                      <QuestionMarkCircleIcon aria-hidden="true" className="h-5 w-5" />
                    </a>
                  </dt>
                  <dd className="text-sm font-medium text-gray-900">TBD</dd>
                </div>
                <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                  <dt className="text-base font-medium text-gray-900">Order total</dt>
                  <dd className="text-base font-medium text-gray-900">${total.toFixed(2)}</dd>
                </div>
              </dl>
              <div className="mt-6">
                <button
                  type="submit"
                  className="w-full rounded-md border border-transparent bg-green-600 px-4 py-3 text-base font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-50"
                >
                  Checkout
                </button>
              </div>
            </section>
          </div>
        )}
      </div>
    </div>
  )
}
