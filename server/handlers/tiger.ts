"use server"
import {
  FinishedSubmission,
  OrderSubmission,
  Tokenization,
  Transaction,
} from "@/types/tigerTransaction"
import { fetchTransactions, parseXMLResponse, transformTransactions } from "@/utils/tigerUtils"
import { getCurrentUser } from "@/server/handlers/users"

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

export const getCompletedTransactions = async (page: number): Promise<Transaction[]> => {
  const startDate = "20241001000000" // October 1, 2024, 00:00:00
  const params = new URLSearchParams({
    security_key: process.env.TIGER_API_KEY!,
    result_order: "reverse",
    result_limit: "10",
    page_number: page.toString(),
    condition: "complete",
  })

  const data = await fetchTransactions(params)
  console.log(data)
  const result = parseXMLResponse(data)
  const transformedTransactions = transformTransactions(result)

  // console.log(JSON.stringify(transformedTransactions, null, 2))
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

  let append_billing_add = {}
  if (order.same_addresses) {
    append_billing_add = {
      address1: order.shipping_address1,
      address2: order.shipping_address2,
      city: order.shipping_city,
      zip: order.shipping_zip,
      state: order.shipping_state,
    }
  }

  const finishedOrder: FinishedSubmission = {
    ...order,
    ...append_billing_add,
    last_name: order.shipping_last_name,
    type: "sale",
    payment_token: token,
    security_key: apiKey,
    merchant_defined_field_1: userData.user?.id || "",
  }
  console.log(new URLSearchParams(finishedOrder).toString())

  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams(finishedOrder).toString(),
  })

  return JSON.stringify(response)
}
