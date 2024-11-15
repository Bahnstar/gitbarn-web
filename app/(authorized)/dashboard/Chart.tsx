"use client"

import { Bar, BarChart, XAxis } from "recharts"
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
    <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
      <BarChart accessibilityLayer data={chartData}>
        <XAxis
          dataKey="month"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          tickFormatter={(value) => value.slice(0, 3)}
        />
        <ChartTooltip content={<ChartTooltipContent />} />
        <Bar dataKey="desktop" fill="#16a34a" radius={4} />
      </BarChart>
    </ChartContainer>
  )
}
