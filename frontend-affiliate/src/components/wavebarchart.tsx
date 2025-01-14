"use client";

import * as React from "react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { FETCH_CUSTOMER } from "@/app/api/customer/route";

type Customer = {
  createdAt: string;
  device: string;
};

type ChartData = {
  date: string;
  desktop: number;
  mobile: number;
};

function formatChartData(customers: Customer[]): ChartData[] {
  const groupedData: Record<string, ChartData> = {};

  customers.forEach((customer) => {
    const date = new Date(customer.createdAt).toISOString().split("T")[0];
    const device = customer.device.toLowerCase();

    if (!groupedData[date]) {
      groupedData[date] = { date, desktop: 0, mobile: 0 };
    }

    if (device === "desktop" || device === "mobile") {
      groupedData[date][device]++;
    }
  });

  return Object.values(groupedData).sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );
}

function fillMissingDates(
  data: ChartData[],
  startDate: string,
  endDate: string
): ChartData[] {
  const filledData: ChartData[] = [];
  const currentDate = new Date(startDate);

  while (currentDate <= new Date(endDate)) {
    const dateStr = currentDate.toISOString().split("T")[0];
    const existingData = data.find((item) => item.date === dateStr);

    if (existingData) {
      filledData.push(existingData);
    } else {
      filledData.push({ date: dateStr, desktop: 0, mobile: 0 });
    }

    currentDate.setDate(currentDate.getDate() + 1);
  }

  return filledData;
}

const chartConfig = {
  visitors: {
    label: "Visitors",
  },
  desktop: {
    label: "Desktop",
    color: "hsl(var(--chart-1))",
  },
  mobile: {
    label: "Mobile",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

export function WaveBarChart() {
  const [chartData, setChartData] = React.useState<ChartData[]>([]);
  const [countDevice, setCountDevice] = React.useState({
    mobile: 0,
    desktop: 0,
    totalVisit: 0,
  });

  const startDateRef = React.useRef("");
  const [timeRange, setTimeRange] = React.useState("90d");
  const fetchCustomer = React.useCallback(async () => {
    try {
      const response = await FETCH_CUSTOMER();
      if (response.customers) {
        const formattedData = formatChartData(response.customers);
        const startDate = formattedData[0]?.date || "";
        const endDate = new Date().toISOString().split("T")[0];
        const completeData = fillMissingDates(
          formattedData,
          startDate,
          endDate
        );
        startDateRef.current = startDate;
        setChartData(formattedData);
        setCountDevice({
          desktop: response.desktopCount,
          mobile: response.mobileCount,
          totalVisit: response.totalCustomers,
        });
      }
    } catch (error) {
      console.error("Error fetching customer data:", error);
    }
  }, []);

  React.useEffect(() => {
    fetchCustomer();
  }, [fetchCustomer]);

  const filteredData = React.useMemo(() => {
    const referenceDate = new Date(startDateRef.current);
    let daysToSubtract = 90;

    if (timeRange === "30d") daysToSubtract = 30;
    else if (timeRange === "7d") daysToSubtract = 7;

    const startDate = new Date(referenceDate);
    startDate.setDate(startDate.getDate() - daysToSubtract);

    return chartData.filter((item) => new Date(item.date) >= startDate);
  }, [chartData, timeRange]);

  return (
    <Card>
      <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
        <div className="grid flex-1 gap-1 text-center sm:text-left text-chart-1">
          <CardTitle>AREA CHART</CardTitle>
          <CardDescription>
            Showing total visitors for the last 3 months
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full text-slate-400"
        >
          <AreaChart data={filteredData}>
            <defs>
              <linearGradient id="fillDesktop" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-desktop)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-desktop)"
                  stopOpacity={0.1}
                />
              </linearGradient>
              <linearGradient id="fillMobile" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-mobile)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-mobile)"
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value);
                return date.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                });
              }}
            />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    });
                  }}
                  indicator="dot"
                />
              }
            />
            <Area
              dataKey="mobile"
              type="natural"
              fill="url(#fillMobile)"
              stroke="var(--color-mobile)"
              stackId="a"
            />
            <Area
              dataKey="desktop"
              type="natural"
              fill="url(#fillDesktop)"
              stroke="var(--color-desktop)"
              stackId="a"
            />
            <ChartLegend content={<ChartLegendContent />} />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
