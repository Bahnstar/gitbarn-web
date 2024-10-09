import { Transaction } from "@/types/tigerTransaction"
import { XMLParser } from "fast-xml-parser"

export const fetchTransactions = async (params: URLSearchParams): Promise<string> => {
  const url = "https://secure.networkmerchants.com/api/query.php"
  const response = await fetch(url, {
    method: "POST",
    body: params,
  })
  return response.text()
}

export const parseXMLResponse = (data: string): any => {
  const parser = new XMLParser({
    ignoreAttributes: true,
    parseTagValue: false,
    textNodeName: "_text",
  })
  return parser.parse(data)
}

export const transformTransactions = (result: any): Transaction[] => {
  const transactions: Transaction[] = Array.isArray(result.nm_response.transaction)
    ? result.nm_response.transaction
    : [result.nm_response.transaction]

  return transactions.map((trans: any) => ({
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
    actions: Array.isArray(trans.action)
      ? trans.action.map(transformAction)
      : [transformAction(trans.action)],
  }))
}

const transformAction = (action: any) => ({
  amount: action.amount,
  type: action.action_type,
  date: action.date,
  success: action.success === "1",
  response: action.response_text,
})
