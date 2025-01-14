// "use client";

// import { Monitor, TrendingUp } from "lucide-react";
// import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import {
//   ChartConfig,
//   ChartContainer,
//   ChartLegend,
//   ChartLegendContent,
//   ChartTooltip,
//   ChartTooltipContent,
// } from "@/components/ui/chart";
// import { IconDeviceMobile } from "@tabler/icons-react";
// import { FETCH_CUSTOMER } from "@/app/api/customer/route";
// import { useEffect } from "react";
// const chartData = [
//   { month: "January", desktop: 186, mobile: 80 },
//   { month: "February", desktop: 305, mobile: 200 },
//   { month: "March", desktop: 237, mobile: 120 },
//   { month: "April", desktop: 73, mobile: 190 },
//   { month: "May", desktop: 209, mobile: 130 },
//   { month: "June", desktop: 214, mobile: 140 },
// ];

// const chartConfig = {
//   desktop: {
//     label: "Desktop",
//     icon: Monitor,
//     // color: "#1b4974",
//     theme: {
//       light: "#1b4974",
//       dark: "#eaf7ff",
//     },
//   },
//   mobile: {
//     label: "Mobile",
//     icon: IconDeviceMobile,
//     // color: "#0762D9",
//     theme: {
//       light: "#0762D9",
//       dark: "#0762D9",
//     },
//   },
// } satisfies ChartConfig;

// export function MultipleBarChart() {

//   const fetchCustomer =  async  ()=>{
//     try {
//       const response = await FETCH_CUSTOMER();
//       console.log(response);

//     } catch (error) {

//     }
//   }

//   useEffect(()=>{
//     fetchCustomer();
//   },[])
//   return (
//     <Card className="rounded-xl border border-slate-200 p-4 shadow-xl backdrop-blur-lg bg-gray-400/40 [background:linear-gradient(145deg,rgba(255,255,255,0.3),rgba(230,240,255,0.1))] [box-shadow:0px_4px_6px_rgba(0,0,0,0.1),0px_1px_3px_rgba(255,255,255,0.2)]">
//       <CardHeader>
//         <CardTitle>Bar Chart - Multiple</CardTitle>
//         <CardDescription>January - June 2024</CardDescription>
//       </CardHeader>
//       <CardContent>
//         <ChartContainer
//           config={chartConfig}
//           className="h-[300px] w-full">
//           <BarChart
//             accessibilityLayer
//             data={chartData}>
//             <CartesianGrid vertical={false} />
//             <XAxis
//               dataKey="month"
//               tickLine={false}
//               tickMargin={10}
//               axisLine={false}
//               tickFormatter={(value) => value.slice(0, 3)}
//             />
//             <ChartTooltip
//               cursor={false}
//               content={<ChartTooltipContent indicator="dashed" />}
//             />
//             <ChartLegend content={<ChartLegendContent />} />
//             <Bar
//               dataKey="desktop"
//               fill="var(--color-desktop)"
//               radius={8}
//             />
//             <Bar
//               dataKey="mobile"
//               fill="var(--color-mobile)"
//               radius={8}
//             />
//           </BarChart>
//         </ChartContainer>
//       </CardContent>
//     </Card>
//   );
// }

"use client";

import { Monitor } from "lucide-react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { IconDeviceMobile } from "@tabler/icons-react";
import { FETCH_CUSTOMER } from "@/app/api/customer/route";
import { useEffect, useState } from "react";


function formatChartData(customers: Customer[]) {
  const groupedData: Record<
    string,
    { month: string; desktop: number; mobile: number }
  > = {};

  customers.forEach((customer) => {
    const date = new Date(customer.createdAt);
    const month = date.toLocaleString("en-US", { month: "long" });
    const device = customer.device.toLowerCase() as "desktop" | "mobile";

    if (!groupedData[month]) {
      groupedData[month] = { month, desktop: 0, mobile: 0 };
    }

    groupedData[month][device]++;
  });

  const monthOrder = [
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
  ];
  return Object.values(groupedData).sort(
    (a, b) => monthOrder.indexOf(a.month) - monthOrder.indexOf(b.month)
  );
}

interface MultipleBarChartProps {
  setTotal: (
    data: number,
    startMonth: string,
    lastMonth: string,
    years: string,
    percentage: string
  ) => void;
}

export function MultipleBarChart({ setTotal }: MultipleBarChartProps) {
 
  
  const [chartData, setChartData] = useState<
    { month: string; desktop: number; mobile: number }[]
  >([]);
  const [countDevice, setcountDevice] = useState({
    mobile: 0,
    dekstop: 0,
    totalVisit: 0,
  });
  const [mount, setMount] = useState({
    startDate: "",
    endDate: "",
  });
  const [percentage, setPercentage] = useState("");
  const currentDate = new Date();
  const years = currentDate.getFullYear().toString();

  const fetchCustomer = async () => {
    try {
      const response = await FETCH_CUSTOMER();
      //console.log(response);
      if (response) {
        setPercentage(response.percentageChange);
      }
      if (response.customers) {
        const formattedData = formatChartData(response.customers);
        const startDate = formattedData[0]?.month;
        const lastMonthData = formattedData.at(-1);
        const endDate = lastMonthData?.month as string;
        setMount({
          startDate,
          endDate,
        });
        setChartData(formattedData);
        setcountDevice({
          dekstop: response.desktopCount,
          mobile: response.mobileCount,
          totalVisit: response.totalCustomers,
        });
      }
    } catch (error) {
      console.error("Error fetching customer data:", error);
    }
  };

  useEffect(() => {
    fetchCustomer();
    setTotal(
      countDevice.totalVisit,
      mount.startDate,
      mount.endDate,
      years,
      percentage
    );
  }, [countDevice.totalVisit, setTotal]);

  const chartConfig = {
    desktop: {
      label: `Desktop ${countDevice.dekstop}`,
      icon: Monitor,
      theme: {
        light: "#1b4974",
        dark: "#eaf7ff",
      },
    },
    mobile: {
      label: `Mobile ${countDevice.mobile}`,
      icon: IconDeviceMobile,
      theme: {
        light: "#0762D9",
        dark: "#0762D9",
      },
    },
  };

  return (
    <Card className="rounded-xl border border-slate-200 p-4 shadow-xl backdrop-blur-lg bg-gray-400/40">
      <CardHeader>
        <CardTitle>Report - Visitor</CardTitle>
        <CardDescription>
          {mount.startDate} - {mount.endDate} {years}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={chartConfig}
          className="h-[300px] w-full">
          <BarChart
            accessibilityLayer
            data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dashed" />}
            />
            <ChartLegend content={<ChartLegendContent />} />
            <Bar
              dataKey="desktop"
              fill="var(--color-desktop)"
              radius={8}
            />
            <Bar
              dataKey="mobile"
              fill="var(--color-mobile)"
              radius={8}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
