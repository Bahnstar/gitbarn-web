"use server"
import { Transaction } from "@/types/tigerTransaction"
import { fetchTransactions, parseXMLResponse, transformTransactions } from "@/utils/tigerUtils"

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
