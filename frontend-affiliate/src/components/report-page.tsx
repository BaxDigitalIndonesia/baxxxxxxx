import { formatRupiah } from "@/utils/formatIDR";
import React, { useEffect, useState } from "react";

interface Performance {
  topProduct: string;
  totalBalance: number;
  totalCustomer: number;
  totalSales: number;
}

interface AffiliatePerformance {
  affiliateId: string;
  name: string;
  performance: Performance;
}

interface Data {
  affiliatePerformance: AffiliatePerformance[];
  topProduct: string;
  totalSales: number;
  commission: number;
  createdAt: string;
}

interface Props {
  totalSubscription: number;
  subscriptionsPercentage: number;
  totalSalesProduct: number;
  salesProductPercentage: number;
  data: Data[];
}

const ITEMS_PER_PAGE = 10;

const ReportPage = ({
  totalSalesProduct,
  salesProductPercentage,
  totalSubscription,
  subscriptionsPercentage,
  data,
}: Props) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [timeRange, setTimeRange] = useState("This Month");
  const [filteredData, setFilteredData] = useState(data);

  const timeRanges = ["This Month","Last Month", "Last Two Months"];

  useEffect(() => {
    filterDataByTimeRange(timeRange);
  }, [timeRange, data]);

  const filterDataByTimeRange = (range: string) => {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth();

    let filtered = data;

    // Calculate date ranges for filtering
    const getStartOfMonth = (year: number, month: number) =>
      new Date(year, month, 1);
    const getEndOfMonth = (year: number, month: number) =>
      new Date(year, month + 1, 0);

    // Handle filtering logic
    switch (range) {
      case "This Month":
        filtered = data.filter((item) => {
          const createdAt = new Date(item.createdAt);
          return createdAt >= getStartOfMonth(currentYear, 0);
        });
        break;
        case "Last Month":
          const lastMonth = (currentMonth + 11) % 12; 
          const lastMonthYear = currentMonth === 0 ? currentYear - 1 : currentYear; //if januari -
        
          filtered = data.filter((item) => {
            const createdAt = new Date(item.createdAt);
            return (
              createdAt >= getStartOfMonth(lastMonthYear, lastMonth) &&
              createdAt <= getEndOfMonth(lastMonthYear, lastMonth)
            );
          });
          break;
        
      case "Last Two Months":
        // calculacte two month ago
        const targetMonth = (currentMonth + 10) % 12; 
        const targetYear = currentMonth < 2 ? currentYear - 1 : currentYear; 
      
        filtered = data.filter((item) => {
          const createdAt = new Date(item.createdAt);
          return (
            createdAt >= getStartOfMonth(targetYear, targetMonth) &&
            createdAt <= getEndOfMonth(targetYear, targetMonth)
          );
        });
        break;
      default:
        break;
    }

    // Sort data to show the most recent data first
    filtered.sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

    setFilteredData(filtered);
  };

  // Flatten data
  const flattenedData = filteredData.flatMap(
    (item) => item.affiliatePerformance
  );

  // Count total pages
  const totalPages = Math.ceil(flattenedData.length / ITEMS_PER_PAGE);

  // Data current page
  const paginatedData = flattenedData.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handlePrev = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div className="min-h-screen p-8">
      <div className="flex justify-between items-center mb-6">
        <select
          className="p-2 rounded"
          value={timeRange}
          onChange={(e) => setTimeRange(e.target.value)}
        >
          {timeRanges.map((range) => (
            <option key={range} value={range}>
              {range}
            </option>
          ))}
        </select>
      </div>

      <section className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8 text-gray-800">
        <div className="p-6 bg-white rounded-lg">
          <h2 className="text-gray-400 text-sm">Total Sales</h2>
          <p className="text-2xl font-bold">
            {formatRupiah(filteredData[0] ? filteredData[0].totalSales : 0  )}
          </p>
          <p className="text-green-400 text-sm">total sales of the month</p>
        </div>
        <div className="p-6 bg-white rounded-lg">
          <h2 className="text-gray-400 text-sm">Commission</h2>
          <p className="text-2xl font-bold lg:text-1">
            {formatRupiah(filteredData[0]? filteredData[0].commission : 0)}
          </p>
          <p className="text-blue-400 text-sm">Commission of the month</p>
        </div>
        <div className="p-6 bg-white rounded-lg">
          <h2 className="text-gray-400 text-sm">Members</h2>
          <p className="text-2xl font-bold">{totalSubscription}</p>
          <p className="text-green-400 text-sm">
            +{subscriptionsPercentage}% from last month
          </p>
        </div>
        <div className="p-6 bg-white rounded-lg">
          <h2 className="text-gray-400 text-sm">Total Sales Product</h2>
          <p className="text-2xl font-bold">{totalSalesProduct}</p>
          <p className="text-green-400 text-sm">
            +{salesProductPercentage.toFixed(1)}% from last month
          </p>
        </div>
      </section>
      <h2 className="text-gray-800 pt-2 pb-2 text-2xl font-bold">
        Affiliate Performance
      </h2>
      <table className="w-full text-left text-sm bg-white rounded-lg">
        <thead className="text-gray-400">
          <tr>
            <th className="p-4">Affiliate Name</th>
            <th className="p-4">Top Product</th>
            <th className="p-4">Total Sales</th>
            <th className="p-4">Total Balance</th>
            <th className="p-4">Total Customers</th>
          </tr>
        </thead>
        <tbody>
          {paginatedData.map((performance, index) => (
            <tr
              key={`${performance.affiliateId}-${index}`}
              className="border-b border-gray-700 text-gray-800"
            >
              <td className="p-4">{performance.name}</td>
              <td className="p-4">{performance.performance.topProduct}</td>
              <td className="p-4">
                {formatRupiah(performance.performance.totalSales)}
              </td>
              <td className="p-4">
                {formatRupiah(performance.performance.totalBalance)}
              </td>
              <td className="p-4">{performance.performance.totalCustomer}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-4">
        <button
          onClick={handlePrev}
          disabled={currentPage === 1}
          className={`px-4 py-2 rounded bg-gray-200 ${
            currentPage === 1
              ? "cursor-not-allowed opacity-50"
              : "hover:bg-gray-300"
          }`}
        >
          Prev
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={handleNext}
          disabled={currentPage === totalPages}
          className={`px-4 py-2 rounded bg-gray-200 ${
            currentPage === totalPages
              ? "cursor-not-allowed opacity-50"
              : "hover:bg-gray-300"
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ReportPage;
