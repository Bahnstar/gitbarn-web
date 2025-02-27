"use server"

import { NotificationStatus, NotificationType } from "@/types/notification"
import { createClient } from "@/utils/supabase/server"
import { PostgrestSingleResponse } from "@supabase/supabase-js"
import { revalidatePath } from "next/cache"

export const getNotifications = async (): Promise<PostgrestSingleResponse<NotificationType[]>> => {
  const supabase = await createClient()
  return await supabase.from("Notifications").select("*").order("created_at", { ascending: false })
}

export const getNotificationsByUserId = async (
  userId: string,
): Promise<PostgrestSingleResponse<NotificationType[]>> => {
  const supabase = await createClient()
  return await supabase
    .from("Notifications")
    .select("*")
    .order("created_at", { ascending: false })
    .eq("user_id", userId)
}

export const getUnreadNotificationCount = async (userId: string): Promise<number> => {
  const supabase = await createClient()
  const { count, error } = await supabase
    .from("Notifications")
    .select("*", { count: "exact", head: true })
    .eq("user_id", userId)
    .eq("status", NotificationStatus.UNREAD)

  if (error || !count) {
    console.error("Error fetching notifications:", error)
    return 0
  }

  return count
}

export const updateNotification = async (
  notification: Partial<NotificationType>,
): Promise<PostgrestSingleResponse<NotificationType>> => {
  const supabase = await createClient()
  return await supabase
    .from("Notifications")
    .update(notification)
    .eq("id", notification.id)
    .select()
    .single()
}

export async function markAllAsRead() {
  const { data, error: fetchError } = await getNotifications()

  if (fetchError || !data) {
    console.error(fetchError)
    return { success: false, message: "Error fetching notifications" }
  }

  const unreadNotifications = data.filter(
    (notification) => notification.status === NotificationStatus.UNREAD,
  )

  if (unreadNotifications.length === 0) {
    return { success: true, message: "No unread notifications" }
  }

  let hasError = false

  // Update each unread notification to read status
  for (const notification of unreadNotifications) {
    const { error } = await updateNotification({
      id: notification.id,
      status: NotificationStatus.READ,
    })

    if (error) {
      console.error(error)
      hasError = true
    }
  }

  revalidatePath("/notifications")

  if (hasError) {
    return { success: false, message: "Error marking all notifications as read" }
  } else {
    return { success: true, message: "All notifications marked as read" }
  }
}
