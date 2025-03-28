import { updateMonthlyStats } from "@/server/handlers/monthlyStats"
import { getMonthOrderCounts } from "@/server/handlers/tiger"
import { MonthlyStat } from "@/types/monthlyStat"
import { NextRequest } from "next/server"

export async function GET(request: NextRequest) {
  // Check if the request is authorized
  const authHeader = request.headers.get("authorization")
  console.log(process.env.ENVIRONMENT)
  if (
    authHeader !== `Bearer ${process.env.CRON_SECRET}` &&
    process.env.ENVIRONMENT !== "development"
  ) {
    console.error("MonthlyStats failed to run")
    return new Response("Unauthorized", {
      status: 401,
    })
  }

  const currentYear = new Date().getFullYear()
  const stats: MonthlyStat[] = await getMonthOrderCounts(currentYear)
  await Promise.all(
    stats.map(async (stat) => {
      await updateMonthlyStats(stat)
    }),
  )

  return Response.json({ message: "Stats updated successfully" })
}
