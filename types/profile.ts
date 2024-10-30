export enum Role {
  ADMIN = "admin",
  SUPPORT = "support",
  USER = "user",
}

export type Profile = {
  id: string
  customer_id: string
  role: Role
  email: string
  username: string
  first_name: string
  last_name: string
  avatar_url: string
  updated_at: Date
}
