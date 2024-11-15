import { createMontlyStats, updateMonthlyStats } from "@/server/handlers/monthlyStats"
import { getMonthOrderCounts } from "@/server/handlers/tiger"
import { MonthlyStat } from "@/types/monthlyStat"
import { NextRequest } from "next/server"

export async function GET(request: NextRequest) {
  // Check if the request is authorized
  const authHeader = request.headers.get("authorization")
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return new Response("Unauthorized", {
      status: 401,
    })
  }

  const stats: MonthlyStat[] = await getMonthOrderCounts()
  await Promise.all(
    stats.map(async (stat) => {
      await updateMonthlyStats(stat)
    }),
  )

  return Response.json({ message: "Stats updated successfully" })
}
