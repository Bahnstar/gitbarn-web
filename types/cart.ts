import { Product } from "./product"

export type Cart = {
  id?: string
  user_id: string
  product_id: string
  Products?: Product
  quantity: number
  readonly created_at?: string
}
