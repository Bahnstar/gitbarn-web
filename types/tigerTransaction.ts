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

export type TransactionQueryParams = {
  security_key?: string
  transaction_id?: string
  subscription_id?: string
  invoice_id?: string
  order_id?: string
  email?: string
  first_name?: string
  last_name?: string
  address1?: string
  city?: string
  state?: string
  zip?: string
  phone?: string
  fax?: string
  order_description?: string
  drivers_license_number?: string
  drivers_license_dob?: string
  drivers_license_state?: string
  customer_vault_id?: string
  cc_number?: string
  start_date?: string
  end_date?: string
  date_search?: "created" | "updated" | string
  mobile_device_license?: string
  mobile_device_nickname?: string
  merchant_defined_fields?: [{ index: number; value: string }]
  report_type?:
    | "receipt"
    | "customer_vault"
    | "recurring"
    | "recurring_plans"
    | "invoicing"
    | "gateway_processors"
    | "account_updater"
    | "test_mode_status"
    | "profile"
    | string
  condition?:
    | "pending"
    | "pendingsettlement"
    | "in_progress"
    | "abandoned"
    | "failed"
    | "canceled"
    | "complete"
    | "unknown"
    | string
  transaction_type?: "cc" | "ck" | string
  action_type?: "sale" | "refund" | "credit" | "auth" | "capture" | "void" | string
  source?:
    | "api"
    | "batch_upload"
    | "mobile"
    | "quickclick"
    | "quickbooks"
    | "recurring"
    | "swipe"
    | "virtual_terminal"
    | "internal"
    | string
  result_order?: "standard" | "reverse"
  result_limit?: number
  page_number?: number
  invoice_status?: "open" | "paid" | "closed" | "past_due" | string
  processor_details?: boolean
}

export type TransactionResponse = {
  response: string
  responsetext: string
  product_id?: string
  authcode: string
  transactionid: string
  avsresponse: string
  cvvresponse: string
  orderid: string
  response_code: string
  emv_auth_response_data?: string
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

export interface OrderSubmission {
  email: string
  first_name: string
  last_name: string
  company?: string
  phone?: string
  address1: string
  address2?: string
  city: string
  state: string
  zip: string
  country: string
  shipping_first_name: string
  shipping_last_name: string
  shipping_address1: string
  shipping_address2?: string
  shipping_city: string
  shipping_state: string
  shipping_zip: string
  shipping_country: string
  same_billing_address?: string
  amount: number
  merchant_defined_field_1: string
}

export interface FinishedSubmission extends OrderSubmission {
  type: string
  security_key: string
  payment_token: string
  vat_tax_amount: string
  vat_tax_rate: string
}
