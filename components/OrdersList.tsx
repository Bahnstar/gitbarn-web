"use client"
import { useState, useEffect } from "react"
import Link from "next/link"
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react"
import { LoaderCircle } from "lucide-react"

import { getCompletedTransactions } from "@/server/handlers/tiger"
import { Transaction } from "@/types/tigerTransaction"
import { formatDate } from "@/utils/utils"

import { EllipsisVerticalIcon } from "@heroicons/react/24/outline"
import { CheckCircleIcon } from "@heroicons/react/20/solid"
import AddToCartButton from "./AddToCartButton"
import PersonAutocomplete from "./PersonAutocomplete"

const OrdersList = ({ initialOrders, role }: { initialOrders: Transaction[]; role: string }) => {
  const [currentPage, setCurrentPage] = useState(0)
  const [user, setUser] = useState("")
  const [orders, setOrders] = useState<Transaction[]>(initialOrders)
  const [loadingMore, setLoadingMore] = useState(false)
  const [loadingInitial, setLoadingInitial] = useState(false)
  const [loadedAll, setLoadedAll] = useState(false)

  const getNextPage = async () => {
    const orders = await getCompletedTransactions(currentPage + 1)
    setOrders(orders)
    setCurrentPage(currentPage + 1)
  }

  const getPreviousPage = async () => {
    const orders = await getCompletedTransactions(currentPage - 1)
    setOrders(orders)
    setCurrentPage(currentPage - 1)
  }

  const getMoreOrders = async () => {
    setLoadingMore(true)
    const newOrders = await getCompletedTransactions(currentPage + 1, user)

    if (newOrders.length === 0) {
      setLoadedAll(true)
    }

    setOrders(orders.concat(newOrders))
    setCurrentPage(currentPage + 1)
    setLoadingMore(false)
  }

  const setFilterUser = async (u: string) => {
    setLoadingInitial(true)
    setUser(u)
    setCurrentPage(0)

    const newOrders = await getCompletedTransactions(0, u)
    setOrders(newOrders)
    setLoadingInitial(false)
  }

  return (
    <div className="mx-auto w-full max-w-6xl">
      {(role === "admin" || role === "support") && (
        <div className="mx-auto mb-5 flex max-w-7xl items-center justify-end gap-5 sm:px-2 lg:px-8">
          Viewing as{" "}
          <span className="w-80">
            <PersonAutocomplete setCustomerId={setFilterUser} autoInitialCustomer={true} />
          </span>
        </div>
      )}
      {/* <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full max-w-md">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="h-5 w-5 text-gray-400"
            >
              <path
                fillRule="evenodd"
                d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <input
            type="text"
            className="w-full rounded-xl border border-gray-200 bg-white py-3 pl-11 pr-4 text-base placeholder:text-gray-500 focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500"
            placeholder="Search Orders"
          />
        </div>
      </div> */}

      {!loadingInitial ? (
        <div>
          <h2 className="sr-only">Recent orders</h2>
          <div className="mx-auto max-w-7xl sm:px-2 lg:px-8">
            <div className="mx-auto max-w-2xl space-y-8 sm:px-4 lg:max-w-4xl lg:px-0">
              {orders.map((order) => (
                <div
                  key={order.transaction_id}
                  className="border-b border-t border-gray-200 bg-white shadow-sm sm:rounded-lg sm:border"
                >
                  <h3 className="sr-only">
                    Order placed on{" "}
                    <time dateTime={order.actions[0].date}>{order.actions[0].date}</time>
                  </h3>

                  <div className="flex items-center border-b border-gray-200 p-4 sm:grid sm:grid-cols-4 sm:gap-x-6 sm:p-6">
                    <dl className="grid flex-1 grid-cols-2 gap-x-6 text-sm sm:col-span-3 sm:grid-cols-3 lg:col-span-2">
                      <div>
                        <dt className="font-medium text-gray-900">Order number</dt>
                        <dd className="mt-1 text-gray-500">{order.transaction_id}</dd>
                      </div>
                      <div className="hidden sm:block">
                        <dt className="font-medium text-gray-900">Date placed</dt>
                        <dd className="mt-1 text-gray-500">
                          <time dateTime={order.actions[0].date}>
                            {formatDate(order.actions[0].date, "MM/DD/YYYY")}
                          </time>
                        </dd>
                      </div>
                      <div>
                        <dt className="font-medium text-gray-900">Total amount</dt>
                        <dd className="mt-1 font-medium text-gray-900">
                          ${order.actions[0].amount}
                        </dd>
                      </div>
                    </dl>

                    <Menu as="div" className="relative flex justify-end lg:hidden">
                      <div className="flex items-center">
                        <MenuButton className="-m-2 flex items-center p-2 text-gray-400 hover:text-gray-500">
                          <span className="sr-only">Options for order {order.transaction_id}</span>
                          <EllipsisVerticalIcon aria-hidden="true" className="size-6" />
                        </MenuButton>
                      </div>

                      <MenuItems
                        transition
                        className="absolute right-0 z-10 mt-2 w-40 origin-bottom-right rounded-md bg-white shadow-lg ring-1 ring-black/5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                      >
                        <div className="py-1">
                          <MenuItem>
                            <a
                              href={`/orders/${order.transaction_id}`}
                              className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900 data-[focus]:outline-none"
                            >
                              View
                            </a>
                          </MenuItem>
                          {/* <MenuItem>
                          <a
                            href="#"
                            className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900 data-[focus]:outline-none"
                          >
                            Invoice
                          </a>
                        </MenuItem> */}
                        </div>
                      </MenuItems>
                    </Menu>

                    <div className="hidden lg:col-span-2 lg:flex lg:items-center lg:justify-end lg:space-x-4">
                      <a
                        href={`/orders/${order.transaction_id}`}
                        className="flex items-center justify-center rounded-md border border-gray-300 bg-white px-2.5 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                      >
                        <span>View Order</span>
                        <span className="sr-only">{order.transaction_id}</span>
                      </a>
                      {/* <a
                      href="#"
                      className="flex items-center justify-center rounded-md border border-gray-300 bg-white px-2.5 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                    >
                      <span>View Invoice</span>
                      <span className="sr-only">for order {order.transaction_id}</span>
                    </a> */}
                    </div>
                  </div>

                  {/* Products */}
                  <h4 className="sr-only">Items</h4>
                  <ul role="list" className="divide-y divide-gray-200">
                    {order.products.map((product, pIndex) =>
                      product?.supabase?.id ? (
                        <li key={product.supabase.id} className="p-4 sm:p-6">
                          <div className="flex items-center sm:items-start">
                            <div className="size-20 shrink-0 overflow-hidden rounded-lg bg-gray-200 sm:size-40">
                              <img
                                alt={product.supabase.title}
                                src={`${process.env.NEXT_PUBLIC_SUPABASE_BUCKETS}${product.supabase.image}`}
                                className="size-full object-cover"
                              />
                            </div>
                            <div className="ml-6 flex-1 text-sm">
                              <div className="font-medium text-gray-900 sm:flex sm:justify-between">
                                <h5>{product.supabase.title}</h5>
                                <p className="mt-2 sm:mt-0">
                                  ${Number(product.tiger.amount).toFixed(2)}
                                  <span className="text-xs text-gray-800">/ea</span> <br /> Qty:{" "}
                                  {Number(product.tiger.quantity).toFixed(0)}
                                </p>
                              </div>
                              <p className="hidden text-gray-500 sm:mt-2 sm:block">
                                {product.supabase.description}
                              </p>
                            </div>
                          </div>

                          <div className="mt-6 sm:flex sm:justify-between">
                            <div className="flex items-center">
                              {/* <CheckCircleIcon aria-hidden="true" className="size-5 text-green-500" /> */}
                              <p className="ml-2 text-sm font-medium text-gray-500">
                                {/* Delivered on{" "}
                              <time dateTime={order.actions[0].date}>
                                {formatDate(order.actions[0].date, "MMMM DD, YYYY")}
                              </time> */}
                                SKU: {product.supabase.sku}
                              </p>
                            </div>

                            <div className="mt-6 flex items-center space-x-4 divide-x divide-gray-200 border-t border-gray-200 pt-4 text-sm font-medium sm:ml-4 sm:mt-0 sm:border-none sm:pt-0">
                              <div className="flex flex-1 justify-center">
                                <a
                                  href={`/products/${product.supabase.id}`}
                                  className="whitespace-nowrap text-green-600 hover:text-green-500"
                                >
                                  View product
                                </a>
                              </div>
                              <div className="flex flex-1 justify-center pl-4">
                                <AddToCartButton
                                  className="whitespace-nowrap text-green-600 hover:text-green-500"
                                  productId={product.supabase.id}
                                  productTitle={product.supabase.title}
                                >
                                  Buy again
                                </AddToCartButton>
                              </div>
                            </div>
                          </div>
                        </li>
                      ) : (
                        <div
                          key={`product_empty_${pIndex}`}
                          className=" hidden p-5 text-gray-500 sm:mt-2 sm:block"
                        >
                          Uh oh, this product has been removed. If you believe this was a mistake,
                          please{" "}
                          <Link
                            href="/support"
                            className="font-bold text-green-600 hover:text-green-500"
                          >
                            contact support
                          </Link>
                          .
                        </div>
                      ),
                    )}
                  </ul>
                </div>
              ))}
            </div>

            <div className="mx-auto mt-5 w-fit">
              {!loadedAll ? (
                <button
                  className="rounded-md border border-transparent bg-green-600 px-4 py-3 text-center text-base font-medium text-white shadow-sm hover:bg-green-700"
                  onClick={getMoreOrders}
                >
                  {loadingMore ? <LoaderCircle className="animate-spin" /> : "Load More"}
                </button>
              ) : (
                <div className="text-center text-lg font-medium text-gray-600">
                  No further orders found
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        <LoaderCircle className="mx-auto mt-5 h-28 w-28 animate-spin text-green-600" />
      )}
    </div>
  )
}

export default OrdersList
