export type Message = {
  id: string
  conversation_id: string
  user_id: string
  text: string
  readonly created_at?: Date
}

export type MessageWithProfile = Message & {
  profiles: {
    first_name: string
    last_name: string
    avatar_url: string
  }
}
