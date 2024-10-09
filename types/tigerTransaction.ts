export interface Transaction {
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
  actions: Action[]
}

export interface Action {
  amount: string
  type: string
  date: string
  success: boolean
  response: string
}
