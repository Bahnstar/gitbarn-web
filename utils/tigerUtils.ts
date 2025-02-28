import { getProductsBySku } from "@/server/handlers/products"
import { Product } from "@/types/product"
import {
  TigerProduct,
  TigerSupabaseProduct,
  Transaction,
  TransactionResponse,
} from "@/types/tigerTransaction"
import { PostgrestSingleResponse } from "@supabase/supabase-js"
import { XMLParser } from "fast-xml-parser"

export const postTransactions = async (args?: any): Promise<TransactionResponse> => {
  const url = process.env.TIGER_TRANSACT_API!
  const params = new URLSearchParams({
    security_key: process.env.TIGER_API_KEY!,
    ...args,
  })

  const response = await fetch(url, {
    method: "POST",
    body: params,
  })

  const result = await response.text()
  const transformedResult = Object.fromEntries(new URLSearchParams(result))
  return transformedResult as TransactionResponse
}

export const fetchTransactions = async (args?: any): Promise<Transaction[]> => {
  const url = process.env.TIGER_QUERY_API!
  const params = new URLSearchParams({
    security_key: process.env.TIGER_API_KEY!,
    ...args,
  })

  const response = await fetch(url, {
    method: "POST",
    body: params,
  })

  const result = await response.text()
  const parsedTransaction = parseXMLResponse(result)
  const transformededTransaction = transformTransactions(parsedTransaction)
  return transformededTransaction
}

export const parseXMLResponse = (data: string): any => {
  const parser = new XMLParser({
    ignoreAttributes: true,
    parseTagValue: false,
    textNodeName: "_text",
  })
  return parser.parse(data)
}

export const transformTransactions = async (result: any): Promise<Transaction[]> => {
  if (!result.nm_response) return []

  const transactions: Transaction[] = Array.isArray(result.nm_response.transaction)
    ? result.nm_response.transaction
    : [result.nm_response.transaction]

  if (transactions.length === 0 || transactions[0] === undefined) return []

  const promisedTrans = transactions.map(async (trans: any) => ({
    transaction_id: trans.transaction_id,
    transaction_type: trans.transaction_type,
    condition: trans.condition,
    authorization_code: trans.authorization_code,
    customer: {
      first_name: trans.first_name,
      last_name: trans.last_name,
      company: trans.company,
      city: trans.city,
      state: trans.state,
      postal_code: trans.postal_code,
      country: trans.country,
      email: trans.email,
      id: trans.customerid,
    },
    billing: {
      address1: trans.address_1,
      address2: trans.address2,
      city: trans.city,
      state: trans.state,
      zip: trans.postal_code,
    },
    shipping: {
      first_name: trans.shipping_first_name,
      last_name: trans.shipping_last_name,
      company: trans.shipping_company,
      address1: trans.shipping_address_1,
      address2: trans.shipping_address_2,
      city: trans.shipping_city,
      state: trans.shipping_state,
      zip: trans.shipping_postal_code,
    },
    cc_type: trans.cc_type,
    cc_bin: trans.cc_bin,
    cc_exp: trans.cc_exp,
    tax: trans.tax,
    products: await processProducts(trans.product),
    actions: Array.isArray(trans.action)
      ? trans.action.map(transformAction)
      : [transformAction(trans.action)],
  }))

  return await Promise.all(promisedTrans)
}

const processProducts = async (products: TigerProduct[]): Promise<TigerSupabaseProduct[]> => {
  if (!products) return []
  if (!Array.isArray(products)) products = [products]

  const skus = products.map((p) => p.sku)
  const promises = skus.map((s) => getProductsBySku(s))
  const responses = await Promise.all([...promises])

  const supabaseProducts = responses.map((res, i) => {
    if (res.error) throw new Error("There was an error grabbing products for orders")

    return { supabase: res.data[0], tiger: products[i] }
  })

  return supabaseProducts
}

const transformAction = (action: any) => ({
  amount: action.amount,
  type: action.action_type,
  date: action.date,
  success: action.success === "1",
  response: action.response_text,
})
