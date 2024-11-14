"use client"

import { Bar, BarChart, XAxis } from "recharts"
import { ChartConfig, ChartContainer } from "@/components/ui/chart"

const chartConfig = {
  desktop: {
    label: "Order",
    color: "#16a34a",
  },
} satisfies ChartConfig

type Props = {
  orderCounts: number[]
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
  const chartData = props.orderCounts.map((count, i) => ({
    month: months[i],
    desktop: count,
  }))

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
        <Bar dataKey="desktop" fill="#16a34a" radius={4} />
      </BarChart>
    </ChartContainer>
  )
}
