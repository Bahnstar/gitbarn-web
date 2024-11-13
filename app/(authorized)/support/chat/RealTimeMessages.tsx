"use client"

import { sendUserNotification } from "@/server/handlers/emails"
import { createMessage } from "@/server/handlers/messages"
import { Conversation } from "@/types/conversation"
import { Message } from "@/types/message"
import { createClient } from "@/utils/supabase/client"
import { PaperAirplaneIcon, PaperClipIcon } from "@heroicons/react/24/outline"
import { useEffect, useState, useRef } from "react"

type Props = {
  messages: Message[]
  conversation: Conversation
  userId?: string
}

const RealTimeMessages = (props: Props) => {
  const supabase = createClient()

  const [messages, setMessages] = useState<Message[]>(props.messages)
  const [message, setMessage] = useState<string>("")
  const [connectedUsers, setConnectedUsers] = useState<string[]>([])
  const chatboxRef = useRef<HTMLDivElement | null>(null)

  const handleSubmit = async () => {
    if (!message) return
    const { data: newMessage, error } = await createMessage(
      props.conversation.id!,
      props.userId!,
      message,
    )
    console.log("New Message: ", newMessage)

    if (error) console.error(error)
    setMessage("")

    if (newMessage) {
      const fromCustomer = props.conversation.support_id !== newMessage.user_id
      const recipientId = fromCustomer
        ? props.conversation.support_id
        : props.conversation.customer_id

      if (!connectedUsers.includes(recipientId!)) {
        await sendUserNotification(
          props.conversation.title!,
          props.conversation.id!,
          props.userId!,
          recipientId!,
          newMessage.text,
        )
      }
    }
  }

  // Force scroll to bottom
  useEffect(() => chatboxRef.current?.scrollIntoView(false), [])

  useEffect(() => {
    const channel = supabase
      .channel("Messages")
      .on("presence", { event: "sync" }, () => {
        const newState = channel.presenceState()
        const users = Object.values(newState)
          .flat()
          .map((user: any) => user.user_id)
        setConnectedUsers(users)
      })
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "Messages",
          filter: `conversation_id=eq.${props.conversation.id}`,
        },
        (payload) => {
          setMessages((prev) => [...prev, payload.new as Message])
          chatboxRef.current?.scrollIntoView({ behavior: "smooth", block: "end" })
        },
      )
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "Messages",
          filter: `conversation_id=eq.${props.conversation.id}`,
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
          filter: `conversation_id=eq.${props.conversation.id}`,
        },
        (payload) => {
          setMessages((prev) => prev.filter((message) => message.id !== payload.old.id))
        },
      )
      .subscribe(async (status) => {
        if (status === "SUBSCRIBED") {
          await channel.track({ user_id: props.userId })
        }
      })

    return () => {
      supabase.removeChannel(channel)
    }
  }, [supabase, messages, setMessages])

  return (
    <div className="flex h-full flex-1 flex-col gap-y-4">
      <h1 className="sticky top-0 z-30 bg-gray-100 py-5 text-center text-2xl md:text-left">
        {props.conversation.title}
      </h1>
      <p>
        Connected Users:{" "}
        {connectedUsers.map((user) => {
          return <span key={user}>{user} </span>
        })}
      </p>
      <div className="flex flex-1 flex-col">
        <div className="flex flex-1 flex-col-reverse">
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
                  className={`chat-bubble ${message.user_id === props.userId ? "bg-green-600 text-white" : "bg-gray-200 text-gray-800"}`}
                >
                  {message.text}
                </div>
                <div className="chat-footer opacity-50">Delivered</div>
              </div>
            ))}
          </div>
        </div>
        <div className="sticky bottom-0 mx-auto flex w-full flex-row items-center justify-center rounded-lg bg-gray-100 pb-3">
          <form action={handleSubmit} className="w-full">
            <label className="input input-bordered flex items-center gap-2">
              <PaperClipIcon className="h-6" />
              <input
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="grow"
                placeholder="Enter a message"
              />
              <button type="submit">
                <PaperAirplaneIcon className="h-6" />
              </button>
            </label>
          </form>
        </div>
        <div ref={chatboxRef}></div>
      </div>
    </div>
  )
}

export default RealTimeMessages
