export type Conversation = {
  id: string
  title: string
  customer_id: string
  support_id: string | null
  is_active: boolean
  readonly created_at?: string
}
