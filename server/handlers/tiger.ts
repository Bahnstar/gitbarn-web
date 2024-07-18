"use server"
import { XMLParser } from "fast-xml-parser"

interface Transaction {
  transaction_id: string
  transaction_type: string
  condition: string
  authorization_code: string
  customer: {
    first_name: string
    last_name: string
    city: string
    state: string
    postal_code: string
    country: string
    email: string
    id: string
  }
  cc_type: string
  action: {
    amount: string
    type: string
    date: string
    success: string
    response: string
  }
}

export const testTiger = async (): Promise<Transaction[]> => {
  const url = "https://secure.networkmerchants.com/api/query.php"
  const key = process.env.TIGER_API_KEY!
  const params = new URLSearchParams({
    security_key: key,
  })

  const response = await fetch(url, {
    method: "POST",
    body: params,
  })

  // get xml response
  const data = await response.text()
  console.log(data)

  // parse XML
  const parser = new XMLParser({
    ignoreAttributes: true,
    parseTagValue: false,
    textNodeName: "_text",
  })
  const result = parser.parse(data)

  // extract and transform transactions
  const transactions: Transaction[] = Array.isArray(result.nm_response.transaction)
    ? result.nm_response.transaction
    : [result.nm_response.transaction]

  const transformedTransactions: Transaction[] = transactions.map((trans: any) => ({
    transaction_id: trans.transaction_id,
    transaction_type: trans.transaction_type,
    condition: trans.condition,
    authorization_code: trans.authorization_code,
    customer: {
      first_name: trans.first_name,
      last_name: trans.last_name,
      city: trans.city,
      state: trans.state,
      postal_code: trans.postal_code,
      country: trans.country,
      email: trans.email,
      id: trans.customerid,
    },
    cc_type: trans.cc_type,
    action: {
      amount: trans.action.amount,
      type: trans.action.action_type,
      date: trans.action.date,
      success: trans.action.success,
      response: trans.action.response_text,
    },
  }))

  console.log(JSON.stringify(transformedTransactions, null, 2))
  return transformedTransactions
}
