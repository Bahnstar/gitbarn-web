import { getTransaction } from "@/server/handlers/tiger"
import { formatDate } from "@/utils/utils"
import Link from "next/link"
import { PaymentIcon } from "react-svg-credit-card-payment-icons"

const OrderDetailsPage = async ({ params }: { params: { orderId: string } }) => {
  const transaction = await getTransaction(params.orderId)

  const hideString = (str: string): string => {
    const first = str[0]
    const last = str[str.lastIndexOf("@") - 1]
    const end = str.substring(str.lastIndexOf("@"))
    return `${first}••••${last}${end}`
  }

  console.log(transaction.products)

  return (
    <div className="mx-auto max-w-2xl pt-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
      <div className="space-y-2 px-4 sm:flex sm:items-baseline sm:justify-between sm:space-y-0 sm:px-0">
        <div className="flex sm:items-baseline sm:space-x-4">
          <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
            Order #{transaction.transaction_id}
          </h1>
          {/* <a
              href="#"
              className="hidden text-sm font-medium text-green-600 hover:text-green-500 sm:block"
            >
              View invoice
              <span aria-hidden="true"> &rarr;</span>
            </a> */}
        </div>
        <p className="text-sm text-gray-600">
          Order placed{" "}
          <time dateTime={transaction.actions[0].date} className="font-medium text-gray-900">
            {formatDate(transaction.actions[0].date, "MMMM DD, YYYY")}
          </time>
        </p>
        <a href="#" className="text-sm font-medium text-green-600 hover:text-green-500 sm:hidden">
          View invoice
          <span aria-hidden="true"> &rarr;</span>
        </a>
      </div>

      {/* Products */}
      <div className="mt-6">
        <h2 className="sr-only">Products purchased</h2>

        <div className="space-y-8">
          {transaction.products.map((product) => (
            <div
              key={product.supabase?.id || product.tiger.sku}
              className="border-b border-t border-gray-200 bg-white shadow-sm sm:rounded-lg sm:border"
            >
              <div className="px-4 py-6 sm:px-6 lg:grid lg:grid-cols-12 lg:gap-x-8 lg:p-8">
                <div className="sm:flex lg:col-span-7">
                  <img
                    alt={product.supabase?.title || product.tiger.description}
                    src={`${process.env.NEXT_PUBLIC_SUPABASE_BUCKETS}${product.supabase?.image || "/images/products/default.png"}`}
                    className="aspect-square w-full shrink-0 rounded-lg object-cover sm:size-40"
                  />

                  <div className="mt-6 sm:ml-6 sm:mt-0">
                    <h3 className="text-base font-medium text-gray-900">
                      <a href={`/products/${product.supabase?.id || product.tiger.sku}`}>
                        {product.supabase?.title || product.tiger.description}
                      </a>
                    </h3>
                    <p className="mt-2 text-sm font-medium text-gray-900">
                      ${product.supabase?.amount || product.tiger.amount}
                      <span className="text-xs text-gray-800">/ea</span> <br /> Qty:{" "}
                      {Number(product.tiger.quantity).toFixed(0)}
                    </p>
                    <p className="mt-3 text-sm text-gray-500">
                      {product.supabase?.description || "This product is no longer available"}
                    </p>
                  </div>
                </div>

                <div className="mt-6 lg:col-span-5 lg:mt-0">
                  <dl className="grid grid-cols-2 gap-x-6 text-sm">
                    <div>
                      <dt className="font-medium text-gray-900">Delivery address</dt>
                      <dd className="mt-3 text-gray-500">
                        <span className="block">
                          {transaction.customer.company ||
                            `${transaction.customer.first_name} ${transaction.customer.last_name}`}
                        </span>
                        <span className="block">{transaction.shipping.address1}</span>
                        <span className="block">{transaction.shipping.address2}</span>
                        <span className="block">
                          {transaction.shipping.city}, {transaction.shipping.state}{" "}
                          {transaction.shipping.zip}
                        </span>
                      </dd>
                    </div>
                    <div>
                      <dt className="font-medium text-gray-900">Shipping updates</dt>
                      <dd className="mt-3 space-y-3 text-gray-500">
                        <p>{hideString(transaction.customer.email)}</p>
                        <Link
                          type="button"
                          href="/profile"
                          className="font-medium text-green-600 hover:text-green-500"
                        >
                          Edit
                        </Link>
                      </dd>
                    </div>
                  </dl>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Billing */}
      <div className="mt-16">
        <h2 className="sr-only">Billing Summary</h2>

        <div className="bg-gray-100 px-4 py-6 sm:rounded-lg sm:px-6 lg:grid lg:grid-cols-12 lg:gap-x-8 lg:px-8 lg:py-8">
          <dl className="grid grid-cols-2 gap-6 text-sm sm:grid-cols-2 md:gap-x-8 lg:col-span-7">
            <div>
              <dt className="font-medium text-gray-900">Billing address</dt>
              <dd className="mt-3 text-gray-500">
                <span className="block">
                  {transaction.shipping.company ||
                    `${transaction.shipping.first_name} ${transaction.shipping.last_name}`}
                </span>
                <span className="block">{transaction.shipping.address1}</span>
                <span className="block">{transaction.shipping.address2}</span>
                <span className="block">
                  {transaction.shipping.city}, {transaction.shipping.state}{" "}
                  {transaction.shipping.zip}
                </span>
              </dd>
            </div>
            <div>
              <dt className="font-medium text-gray-900">Payment information</dt>
              <dd className="-ml-4 -mt-1 flex flex-wrap">
                <div className="ml-4 mt-4 shrink-0">
                  <PaymentIcon type={transaction.cc_type as any} format="flatRounded" />
                  <p className="sr-only">{transaction.cc_type}</p>
                </div>
                <div className="ml-4 mt-4">
                  <p className="text-gray-900">Ending with {transaction.cc_bin.substring(2)}</p>
                  <p className="text-gray-600">
                    Expires {transaction.cc_exp.substring(0, 2)}/{transaction.cc_exp.substring(2)}
                  </p>
                </div>
              </dd>
            </div>
          </dl>

          <dl className="mt-8 divide-y divide-gray-200 text-sm lg:col-span-5 lg:mt-0">
            <div className="flex items-center justify-between pb-4">
              <dt className="text-gray-600">Subtotal</dt>
              <dd className="font-medium text-gray-900">${transaction.actions[0].amount}</dd>
            </div>
            <div className="flex items-center justify-between py-4">
              <dt className="text-gray-600">Shipping</dt>
              <dd className="font-medium text-gray-900">FREE</dd>
            </div>
            <div className="flex items-center justify-between py-4">
              <dt className="text-gray-600">Tax</dt>
              <dd className="font-medium text-gray-900">FREE</dd>
            </div>
            <div className="flex items-center justify-between pt-4">
              <dt className="font-medium text-gray-900">Order total</dt>
              <dd className="font-medium text-green-600">${transaction.actions[0].amount}</dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  )
}

export default OrderDetailsPage
