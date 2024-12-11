import { Profile } from "./profile"

export type DocumentFile = {
  id: string
  name: string
  user_id: string
  path?: string
  profiles?: Profile
  created_at?: Date
}
