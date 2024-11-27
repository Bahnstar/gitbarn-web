import { NotificationStatus, NotificationType } from "@/types/notification"
import { createClient } from "@/utils/supabase/server"
import { PostgrestSingleResponse } from "@supabase/supabase-js"

export const getNotifications = async (): Promise<PostgrestSingleResponse<NotificationType[]>> => {
  const supabase = createClient()
  return await supabase.from("Notifications").select("*")
}

export const getUnreadNotificationCount = async (userId: string): Promise<number> => {
  const supabase = createClient()
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
  const supabase = createClient()
  return await supabase
    .from("Notifications")
    .update(notification)
    .eq("id", notification.id)
    .select()
    .single()
}
