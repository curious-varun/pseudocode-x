"use client"

import { ChevronsDown, TrendingUp } from "lucide-react"
import { Bar, BarChart, XAxis, YAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { Button } from "../ui/button"

const coderData = [
  { name: "Alice", solved: 320, fill: "var(--color-alice)" },
  { name: "Bob", solved: 290, fill: "var(--color-bob)" },
  { name: "Charlie", solved: 270, fill: "var(--color-charlie)" },
  { name: "David", solved: 250, fill: "var(--color-david)" },
  { name: "Eve", solved: 220, fill: "var(--color-eve)" },
]

const chartConfig = {
  solved: {
    label: "Problems Solved",
  },
  Alice: {
    label: "Alice",
    color: "hsl(var(--chart-1))",
  },
  Bob: {
    label: "Bob",
    color: "hsl(var(--chart-2))",
  },
  Charlie: {
    label: "Charlie",
    color: "hsl(var(--chart-3))",
  },
  David: {
    label: "David",
    color: "hsl(var(--chart-4))",
  },
  Eve: {
    label: "Eve",
    color: "hsl(var(--chart-5))",
  },
} satisfies ChartConfig

export function LeaderboardDemo() {
  return (
    <Card className="shadow-none border-none">
      <CardHeader>
        <CardTitle className="text-center font-medium">Top Coders </CardTitle>
        <CardDescription className="text-xs text-center">January - June 2024</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart
            accessibilityLayer
            data={coderData}
            layout="vertical"
            margin={{
              left: 0,
            }}
          >
            <YAxis
              dataKey="name"
              type="category"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) =>
                chartConfig[value as keyof typeof chartConfig]?.label
              }
            />
            <XAxis dataKey="solved" type="number" hide />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar dataKey="solved" layout="vertical" radius={5} />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col -mt-4 items-start gap-2 text-sm">
        <Button className="text-xs px-2 h-7" variant="ghost"> see all <ChevronsDown /> </Button>
      </CardFooter>
    </Card>
  )
}

