export enum NotificationStatus {
  READ = "read",
  UNREAD = "unread",
  DISMISSED = "dismissed",
}

export type NotificationType = {
  id: number
  user_id: number
  code: number
  title: string
  message: string
  status: NotificationStatus
  created_at: string
}
