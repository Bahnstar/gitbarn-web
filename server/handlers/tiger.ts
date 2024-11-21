"use server"

import {
  FinishedSubmission,
  OrderSubmission,
  Tokenization,
  Transaction,
} from "@/types/tigerTransaction"
import { fetchTransactions, parseXMLResponse, transformTransactions } from "@/utils/tigerUtils"
import { deleteAllCarts, getCartWithTotal } from "./carts"
import { getCurrentUser } from "@/server/handlers/users"
import { revalidatePath } from "next/cache"
import { getProfile } from "./profiles"
import { Role } from "@/types/profile"
import { MonthlyStat } from "@/types/monthlyStat"
import { sendAdminNotificationOnOrder } from "./emails"

export const getRecentOrders = async (): Promise<Transaction[]> => {
  const params = new URLSearchParams({
    security_key: process.env.TIGER_API_KEY!,
    result_order: "reverse",
    result_limit: "5",
    // condition: "complete",
  })

  const data = await fetchTransactions(params)
  const result = parseXMLResponse(data)
  const transformedTransactions = transformTransactions(result)
  return transformedTransactions
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
      const newParams = new URLSearchParams(params)
      newParams.set("start_date", boundary.start)
      newParams.set("end_date", boundary.end)

      const data = await fetchTransactions(newParams)
      const result = parseXMLResponse(data)
      const transformedTransactions = transformTransactions(result)

      res.push({
        month: i,
        year: new Date().getFullYear(),
        type: "orders",
        value: transformedTransactions.length,
      })
    }),
  )
  return res
}

export const getCompletedTransactions = async (page: number): Promise<Transaction[]> => {
  const { data: userData } = await getCurrentUser()

  const params = new URLSearchParams({
    security_key: process.env.TIGER_API_KEY!,
    result_order: "reverse",
    result_limit: "10",
    page_number: page.toString(),
    condition: "pendingsettlement,complete",
    email: userData.user?.email || "",
  })

  const data = await fetchTransactions(params)
  const result = parseXMLResponse(data)
  const transformedTransactions = transformTransactions(result)

  return transformedTransactions
}

export const testTiger = async (): Promise<Transaction[]> => {
  const params = new URLSearchParams({
    security_key: process.env.TIGER_API_KEY!,
  })

  const data = await fetchTransactions(params)
  const result = parseXMLResponse(data)
  const transformedTransactions = transformTransactions(result)

  // console.log(JSON.stringify(transformedTransactions, null, 2))
  return transformedTransactions
}

// Payment API functions

const validateTransactionData = (info: Tokenization) => {
  const billing = info.wallet.billingInfo
  const shipping = info.wallet.shippingInfo
}

export const makeTransaction = async (order: OrderSubmission, token: string): Promise<string> => {
  const apiKey = process.env.TIGER_API_KEY!
  const endpoint = process.env.TIGER_ENDPOINT!

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

  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams(finishedOrder as unknown as Record<string, string>).toString(),
  })

  await sendAdminNotificationOnOrder(order, cart)
  await deleteAllCarts(userData.user!.id)

  revalidatePath("/orders")
  return response.statusText
}
