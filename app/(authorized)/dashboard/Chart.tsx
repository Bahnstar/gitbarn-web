"use client"

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { MonthlyStat } from "@/types/monthlyStat"

const chartConfig = {
  desktop: {
    label: "Orders",
    color: "#16a34a",
  },
} satisfies ChartConfig

type Props = {
  orderStats: MonthlyStat[]
}

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
]

export default function Chart(props: Props) {
  const chartData = props.orderStats
    .map((stat) => ({
      month: months[stat.month],
      desktop: stat.value,
    }))
    .filter((item) => item.desktop > 0)

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={chartData} margin={{ top: 10, right: 25, bottom: 20, left: 25 }}>
        <XAxis
          dataKey="month"
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => value.slice(0, 3)}
          fontSize={12}
          tickMargin={8}
        />
        <YAxis
          tickLine={false}
          axisLine={false}
          fontSize={12}
          tickMargin={8}
          tickFormatter={(value) => value.toLocaleString()}
        />
        <Tooltip
          content={({ active, payload }) => {
            if (!active || !payload?.length) return null
            const data = payload[0].payload
            return (
              <div className="ring-opacity-5 rounded-lg bg-white p-2 shadow-md ring-1 ring-black">
                <p className="font-medium">{data.month}</p>
                <p className="mt-1 text-sm">
                  <span className="font-medium">{data.desktop.toLocaleString()}</span> orders
                </p>
              </div>
            )
          }}
        />
        <Bar dataKey="desktop" fill="#16a34a" radius={[4, 4, 0, 0]} maxBarSize={50} />
      </BarChart>
    </ResponsiveContainer>
  )
}
