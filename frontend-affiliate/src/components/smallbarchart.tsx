"use client";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
const chartData = [
  { day: "1", desktop: 186},
  { day: "2", desktop: 305},
  { day: "3", desktop: 237},
  { day: "4", desktop: 73},
  { day: "5", desktop: 209},
  { day: "6", desktop: 214},
  { day: "7", desktop: 214},
  { day: "8", desktop: 214},
  { day: "9", desktop: 214},
  { day: "10", desktop: 214},
  { day: "11", desktop: 214},
  { day: "12", desktop: 214},
  { day: "13", desktop: 186},
  { day: "14", desktop: 305},
  { day: "15", desktop: 237},
  { day: "16", desktop: 73},
  { day: "17", desktop: 209},
  { day: "18", desktop: 214},
  { day: "19", desktop: 214},
  { day: "20", desktop: 214},
  { day: "21", desktop: 214},
  { day: "22", desktop: 214},
  { day: "23", desktop: 214},
  { day: "24", desktop: 214},

];

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "hsl(var(--chart-1))",
  }
} satisfies ChartConfig;

export function SmallBarChart() {
  return (
    <div className="w-[70%] sm:w-[70%] h-[30%] sm:h-[30%]">
      <Card>
        <CardHeader>
          <CardTitle className="text-center sm:text-lg text-sm text-chart-1">BAR CHART</CardTitle>
          <CardDescription className="text-center sm:text-lg text-sm">January 2025</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig}>
            <BarChart accessibilityLayer data={chartData}>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="day"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                tickFormatter={(value) => value.slice(0, 3)}
              />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent indicator="dashed" />}
              />
              <Bar dataKey="desktop" fill="var(--color-desktop)" radius={1} />
              <Bar dataKey="mobile" fill="var(--color-mobile)" radius={1} />
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
}
