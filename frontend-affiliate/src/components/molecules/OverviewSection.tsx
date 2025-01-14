"use client";
import React, { useEffect, useState } from "react";
import PageTitle from "../atoms/PageTitle";
import CustomContainer from "../atoms/CustomContainer";
import EachUtils from "@/utils/EachUtils";
import CardOverview, { CardContent } from "../cardoverview";
import TopSalesCard from "../topsalescard";
import { MultipleBarChart } from "./MultipleBarChart";
import { PieChartDonutText } from "../atoms/PieChartDonutText";
import { HandCoins, Users, Wallet } from "lucide-react";
import { fetchAffiliateData } from "@/handler/handle-affiliate";
import LoadingAnimate from "../atoms/LoadingAnimate";

export default function OverviewSection() {
  const [totalVisits, setTotalVisits] = useState<number>(0);
  const [years, setYears] = useState<string>("");

  const [start, setStart] = useState<string>("");
  const [last, setLast] = useState<string>("");
  const [percent, setPercent] = useState<string>("");

  const [dataCardOverview, setDataCardOverview] = useState([
    {
      label: "Total Revenue",
      amount: "Rp.0",
      discription: "0% from last month",
      icon: Wallet,
    },
    {
      label: "Subscriptions",
      amount: "0",
      discription: "0% from last month",
      icon: Users,
    },
    {
      label: "Sales",
      amount: "0",
      discription: "0% from last month",
      icon: HandCoins,
    },
  ]);

  const [topSalesData, setTopSalesData] = useState<TopTeamMember[]>([]);
  const [topIncomeData, setTopIncomeData] = useState<TopIncome[]>([]);

  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    try {
      const { dataCardOverview, topSalesData, topIncomeData } = await fetchAffiliateData();
      setDataCardOverview(dataCardOverview);
      setTopSalesData(topSalesData);
      setTopIncomeData(topIncomeData);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <section>
      {isLoading ? (
        <LoadingAnimate />
      ) : (
        <>
          <PageTitle title="Dashboard Overview" className="h2 text-[#1b4974]" />

          {/* Card Section */}
          <CustomContainer
            delay={0.1}
            className="grid w-full grid-cols-1 gap-3 transition-all sm:grid-cols-2 xl:grid-cols-4 mt-5"
          >
            <EachUtils
              of={dataCardOverview}
              render={(data, index) => (
                <CardOverview
                  key={index}
                  amount={data.amount}
                  discription={data.discription}
                  icon={data.icon}
                  label={data.label}
                  className="rounded-xl border border-slate-200 p-6 shadow-xl backdrop-blur-lg bg-[#eaf7ff]/40 [background:linear-gradient(145deg,rgba(255,255,255,0.3),rgba(230,240,255,0.1))] [box-shadow:0px_4px_6px_rgba(0,0,0,0.1),0px_1px_3px_rgba(255,255,255,0.2)] hover:scale-105 hover:shadow-2xl hover:[box-shadow:0px_8px_16px_rgba(0,0,0,0.2)0px_4px_8px_rgba(255,255,255,0.25)]
        transition-transform duration-300 ease-out"
                />
              )}
            />
          </CustomContainer>

          {/* Chart Section */}
          <CustomContainer
            delay={0.2}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2 my-5"
          >
            <CustomContainer delay={0.2} className="col-span-3">
              <MultipleBarChart
                setTotal={(
                  data: number,
                  startMonth: string,
                  lastMonth: string,
                  years: string,
                  percentage: string
                ) => (
                  setTotalVisits(data),
                  setYears(years),
                  setStart(startMonth),
                  setLast(lastMonth),
                  setPercent(percentage)
                )}
              />
            </CustomContainer>
            <PieChartDonutText
              totalVisits={totalVisits}
              years={years}
              start={start}
              last={last}
              percent={percent}
            />
          </CustomContainer>

          <CustomContainer
            delay={0.3}
            className="flex flex-row gap-2 mt-6 w-full"
          >
            <CardContent className="flex justify-between gap-2 rrounded-xl border border-slate-200 p-6 shadow-xl backdrop-blur-lg bg-[#eaf7ff]/60 [background:linear-gradient(145deg,rgba(255,255,255,0.3),rgba(230,240,255,0.1))] [box-shadow:0px_4px_6px_rgba(0,0,0,0.1),0px_1px_3px_rgba(255,255,255,0.2)]">
              <h3 className="subtitle-2 text-blueprimary">Top 5 Team Sales</h3>
              <EachUtils
                of={topSalesData}
                render={(d, i) => (
                  <TopSalesCard
                    key={i}
                    email={d.email}
                    name={d.name}
                    saleAmount={`${d.sales}`}
                  />
                )}
              />
            </CardContent>

            <CardContent className="flex justify-between gap-2 rounded-xl border border-slate-200 p-6 shadow-xl backdrop-blur-lg bg-[#eaf7ff]/60 [background:linear-gradient(145deg,rgba(255,255,255,0.3),rgba(230,240,255,0.1))] [box-shadow:0px_4px_6px_rgba(0,0,0,0.1),0px_1px_3px_rgba(255,255,255,0.2)]">
              <h3 className="subtitle-2 text-blueprimary">Top 5 Income</h3>
              <EachUtils
                of={topIncomeData}
                render={(d, i) => (
                  <TopSalesCard
                    key={i}
                    email={d.email}
                    name={d.name}
                    saleAmount={`Rp.${d.income.toLocaleString()}`}
                  />
                )}
              />
            </CardContent>
          </CustomContainer>
        </>
      )}
    </section>
  );
}
