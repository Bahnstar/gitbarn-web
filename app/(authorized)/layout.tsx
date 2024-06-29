import { redirect } from "next/navigation"

import Sidebar from "@/components/Sidebar"
import { getCurrentUser } from "@/server/handlers/users"

export default async function ProtectedLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const {
    data: { user },
  } = await getCurrentUser()

  if (!user) {
    return redirect("/login")
  }

  return <Sidebar>{children}</Sidebar>
}
