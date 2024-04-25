export type Message = {
    id: string
    conversation_id: string
    user_id: string
    text: string
    readonly created_at?: Date
}
