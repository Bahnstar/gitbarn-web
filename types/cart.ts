import { Product } from "./product"

export type Cart = {
  id?: string
  user_id: string
  product_id: string
  Products?: Product
  quantity: number
  readonly created_at?: string
}

export interface CartItem extends Product {
  cartId?: string
  quantity: number
}

export interface CartWithTotal {
  items: CartItem[]
  subtotal: number
  taxes: number
  taxRate: number
  total: number
}
