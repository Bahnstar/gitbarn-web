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

export type Tokenization = {
  initiatedBy?: string
  token: string
  tokenType: string
  card: {
    bin: string | null
    exp: string | null
    hash: string | null
    number: string | null
    type: string | null
  }
  check: {
    aba: string | null
    account: string | null
    hash: string | null
    name: string | null
    transit: string | null
  }
  wallet: {
    cardDetails: string | null
    cardNetwork: string | null
    email: string | null
    billingInfo: {
      address1: string | null
      address2: string | null
      city: string | null
      country: string | null
      firstName: string | null
      lastName: string | null
      phone: string | null
      postalCode: string | null
      state: string | null
    }
    shippingInfo: {
      address1: string | null
      address2: string | null
      city: string | null
      country: string | null
      firstName: string | null
      lastName: string | null
      phone: string | null
      postalCode: string | null
      state: string | null
      method: string | null
    }
  }
}
