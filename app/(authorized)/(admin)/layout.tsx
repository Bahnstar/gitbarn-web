import { redirect } from "next/navigation"

import Sidebar from "@/components/Sidebar"
import { getUserWithProfile } from "@/server/handlers/users"

export default async function ProtectedLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const { data: user } = await getUserWithProfile()
  console.log(user)

  if (user?.role === "admin" || user?.role === "support") return <>{children}</>

  return redirect("/dashboard")
}
