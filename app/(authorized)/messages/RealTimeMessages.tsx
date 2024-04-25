"use client"
import { Message } from "@/types/message"
import { createClient } from "@/utils/supabase/client"
import { eventNames } from "process"
import { useEffect, useState } from "react"

type Props = {
    messages: Message[]
    conversationId?: string
    userId?: string
}

const supabase = createClient()

const RealTimeMessages = (props: Props) => {
    const [messages, setMessages] = useState<Message[]>(props.messages)

    useEffect(() => {
        const channel = supabase
            .channel("Messages")
            .on(
                "postgres_changes",
                {
                    event: "INSERT",
                    schema: "public",
                    table: "Messages",
                    filter: `conversation_id=eq.${props.conversationId}`,
                },
                (payload) => {
                    setMessages((prev) => [...prev, payload.new as Message])
                },
            )
            .on(
                "postgres_changes",
                {
                    event: "UPDATE",
                    schema: "public",
                    table: "Messages",
                    filter: `conversation_id=eq.${props.conversationId}`,
                },
                (payload) => {
                    setMessages((prev) =>
                        prev.map((message) =>
                            message.id === payload.new.id ? (payload.new as Message) : message,
                        ),
                    )
                },
            )
            .on(
                "postgres_changes",
                {
                    event: "DELETE",
                    schema: "public",
                    table: "Messages",
                    filter: `conversation_id=eq.${props.conversationId}`,
                },
                (payload) => {
                    setMessages((prev) => prev.filter((message) => message.id !== payload.old.id))
                },
            )
            .subscribe()

        return () => {
            supabase.removeChannel(channel)
        }
    }, [supabase, messages, setMessages])

    return (
        <div>
            {messages?.map((message) => (
                <div
                    key={message.id}
                    className={`chat ${message.user_id === props.userId ? "chat-end" : "chat-start"}`}
                >
                    <div className="chat-header">
                        {message.user_id === props.userId ? "You" : "Support Agent"}
                        <time className="text-xs opacity-50">
                            {"  " + message.created_at?.toString().slice(0, 10)}
                        </time>
                    </div>
                    <div
                        className={`chat-bubble ${message.user_id === props.userId ? "bg-blue-500" : "bg-gray-200 text-gray-800"}`}
                    >
                        {message.text}
                    </div>
                    <div className="chat-footer opacity-50">Delivered</div>
                </div>
            ))}
        </div>
    )
}

export default RealTimeMessages
