"use server"

import {
  FinishedSubmission,
  OrderSubmission,
  Tokenization,
  Transaction,
  TransactionQueryParams,
  TransactionResponse,
} from "@/types/tigerTransaction"
import { fetchTransactions, postTransactions } from "@/utils/tigerUtils"
import { deleteAllCarts, getCartWithTotal } from "./carts"
import { getCurrentUser } from "@/server/handlers/users"
import { revalidatePath } from "next/cache"
import { getProfile } from "./profiles"
import { Role } from "@/types/profile"
import { MonthlyStat } from "@/types/monthlyStat"
import { sendAdminNotificationOnOrder } from "./emails"
import { Product } from "@/types/product"

export const manageTigerProduct = async (
  product: Partial<Product>,
  action: "add_product" | "update_product" | "delete_product",
): Promise<TransactionResponse> => {
  const params = {
    products: action,
    product_sku: product.sku,
    product_description: product.title,
    product_cost: product.amount,
    product_id: product.tiger_id || "",
    product_currency: "USD",
  }

  const response = await postTransactions(params)
  return response
}

export const getRecentOrders = async (): Promise<Transaction[]> => {
  const params: TransactionQueryParams = {
    result_order: "reverse",
    result_limit: 5,
    // condition: "complete",
  }

  return await fetchTransactions(params)
}

const getMonthBoundaryDates = () => {
  const currentDate = new Date()
  const currentYear = currentDate.getFullYear()
  const currentMonth = currentDate.getMonth()
  const dates = []

  for (let month = 0; month <= currentMonth; month++) {
    const firstDay = new Date(currentYear, month, 1)
    const lastDay = new Date(currentYear, month + 1, 0)

    const firstDayStr = {
      year: firstDay.getFullYear(),
      month: String(firstDay.getMonth() + 1).padStart(2, "0"),
      day: String(firstDay.getDate()).padStart(2, "0"),
    }

    const lastDayStr = {
      year: lastDay.getFullYear(),
      month: String(lastDay.getMonth() + 1).padStart(2, "0"),
      day: String(lastDay.getDate()).padStart(2, "0"),
    }

    dates.push({
      start: `${firstDayStr.year}${firstDayStr.month}${firstDayStr.day}000000`,
      end: `${lastDayStr.year}${lastDayStr.month}${lastDayStr.day}235959`,
    })
  }

  return dates
}

export const getMonthOrderCounts = async () => {
  const { data: userData } = await getCurrentUser()
  const { data: userProfile } = await getProfile(userData.user?.id!)

  if (userProfile?.role === Role.USER) {
    return []
  }

  const monthBoundaries = getMonthBoundaryDates()

  const params = new URLSearchParams({
    security_key: process.env.TIGER_API_KEY!,
    condition: "pendingsettlement,complete",
  })

  const res: MonthlyStat[] = []
  await Promise.all(
    monthBoundaries.map(async (boundary, i) => {
      const params: TransactionQueryParams = {
        start_date: boundary.start,
        end_date: boundary.end,
      }

      const data = await fetchTransactions(params)

      res.push({
        month: i,
        year: new Date().getFullYear(),
        type: "orders",
        value: data.length,
      })
    }),
  )
  return res
}

export const getCompletedTransactions = async (page: number): Promise<Transaction[]> => {
  const { data: userData } = await getCurrentUser()

  const params: TransactionQueryParams = {
    result_order: "reverse",
    result_limit: 10,
    page_number: page,
    condition: "pendingsettlement,complete",
    email: userData.user?.email || "",
  }

  return await fetchTransactions(params)
}

export const getTransaction = async (id: string): Promise<Transaction> => {
  const params: TransactionQueryParams = {
    transaction_id: id,
  }

  const res = await fetchTransactions(params)
  return res[0]
}

export const testTiger = async (): Promise<Transaction[]> => {
  return await fetchTransactions()
}

// Payment API functions

const validateTransactionData = (info: Tokenization) => {
  const billing = info.wallet.billingInfo
  const shipping = info.wallet.shippingInfo
}

export const makeTransaction = async (order: OrderSubmission, token: string): Promise<string> => {
  const apiKey = process.env.TIGER_API_KEY!
  const endpoint = process.env.TIGER_TRANSACT_API!

  const { data: userData } = await getCurrentUser()
  const cart = await getCartWithTotal()

  if (cart.items.length === 0) {
    return "The cart is empty"
  }

  let append_billing_add = {}
  order.same_billing_address === "true" &&
    (append_billing_add = {
      address1: order.shipping_address1,
      address2: order.shipping_address2,
      city: order.shipping_city,
      zip: order.shipping_zip,
      state: order.shipping_state,
      first_name: order.shipping_first_name,
      last_name: order.shipping_last_name,
    })

  const finishedOrder: FinishedSubmission = {
    ...order,
    ...append_billing_add,
    last_name: order.shipping_last_name,
    type: "sale",
    payment_token: token,
    security_key: apiKey,
    merchant_defined_field_1: userData.user?.id || "",
    amount: cart.total,
    vat_tax_amount: cart.taxes.toString(),
    vat_tax_rate: cart.taxRate.toString(),
  }

  let orderWProducts: any = {
    ...finishedOrder,
  }

  cart.items.forEach((item, i) => {
    ;(orderWProducts[`item_product_code_${i + 1}`] = item.sku),
      (orderWProducts[`item_description_${i + 1}`] = item.description),
      (orderWProducts[`item_quantity_${i + 1}`] = item.quantity),
      (orderWProducts[`item_unit_cost_${i + 1}`] = item.amount)
  })

  console.log(orderWProducts)

  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams(orderWProducts as unknown as Record<string, string>).toString(),
  })

  await sendAdminNotificationOnOrder(order, cart)
  await deleteAllCarts(userData.user!.id)

  revalidatePath("/orders")
  return response.statusText
}
