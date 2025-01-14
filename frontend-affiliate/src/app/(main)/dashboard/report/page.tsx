"use client";

import PageTitle from "@/components/pagetitle";
import ReportPage from "@/components/report-page";
import { FETCH_REPORT } from "@/app/api/report/route";
import { useEffect, useState } from "react";
import { fetchAffiliateData } from "@/handler/handle-affiliate";
import LoadingAnimate from "@/components/atoms/LoadingAnimate";
import { WaveBarChart } from "@/components/wavebarchart";


export default function Report() {
  const [isLoading, setIsLoading] = useState(true);
  const [subscription, setSubscription] = useState({
    totalSubscriptions: 0,
    subscriptionsPercentage: 0,
  });
  const [sales, setSales] = useState({
    salesPercentage: 0,
    totalSalesProduct: 0,
  });
  const [reportData, setReportData] = useState([]);
  


  const fetchData = async () => {
    try {
      const {
        totalSalesProduct,
        totalSubscriptions,
        subscriptionsPercentage,
        salesPercentage,
      } = await fetchAffiliateData();
      setSubscription({
        totalSubscriptions,
        subscriptionsPercentage,
      });
      setSales({
        totalSalesProduct,
        salesPercentage,
      });
      const { report } = await FETCH_REPORT();
      setReportData(report.data || []);
      
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
    <div className="p-5">
      {isLoading ? (
        <LoadingAnimate />
      ) : (
        <>
          <section className="mb-5 flex justify-between">
            <PageTitle title="Report Information" />
          </section>
          <div className="mb-5">
        <WaveBarChart />
      </div>
          <div className="">
            <ReportPage
              totalSalesProduct={sales.totalSalesProduct}
              salesProductPercentage={sales.salesPercentage}
              totalSubscription={subscription.totalSubscriptions}
              subscriptionsPercentage={subscription.subscriptionsPercentage}
              data={reportData}
            />
          </div>

        
          {/* <div>
        <TeamlistTable
          columns={columns}
          data={data}
        />
      </div> */}
        </>
      )}
    </div>
  );
}
