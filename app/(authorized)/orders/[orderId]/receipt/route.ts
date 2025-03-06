import { getTigerReceipt } from "@/server/handlers/tiger"
import { getCurrentUser } from "@/server/handlers/users"
import { redirect } from "next/navigation"
import { NextResponse } from "next/server"

type Params = Promise<{ orderId: string }>
export const GET = async (request: Request, { params }: { params: Params }) => {
  const { orderId } = await params

  const {
    data: { user },
  } = await getCurrentUser()

  if (!user) {
    return redirect("/login")
  }

  const invoice = await getTigerReceipt(orderId)

  return new NextResponse(invoice, {
    status: 200,
    headers: {
      "Content-Type": "text/html",
    },
  })
}
