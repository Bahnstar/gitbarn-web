import { redirect } from "next/navigation"
import { getCurrentUser } from "@/server/handlers/users"
import PageContainer from "@/components/PageContainer"
import ForgotPasswordForm from "@/components/ForgotPasswordForm"

export default async function ProfilePage() {
  const {
    data: { user },
  } = await getCurrentUser()

  if (!user) {
    return redirect("/login")
  }

  return (
    <PageContainer title="Reset Password">
      <ForgotPasswordForm user={user} />
    </PageContainer>
  )
}
