import { NotificationType } from "@/types/notification"
import { createClient } from "@/utils/supabase/server"
import { PostgrestSingleResponse } from "@supabase/supabase-js"

export const getNotifications = async (): Promise<PostgrestSingleResponse<NotificationType[]>> => {
  const supabase = createClient()
  return await supabase.from("Notifications").select("*")
}

export const updateNotification = async (
  notification: NotificationType,
): Promise<PostgrestSingleResponse<NotificationType>> => {
  const supabase = createClient()
  return await supabase
    .from("Notifications")
    .update(notification)
    .eq("id", notification.id)
    .select()
    .single()
}
