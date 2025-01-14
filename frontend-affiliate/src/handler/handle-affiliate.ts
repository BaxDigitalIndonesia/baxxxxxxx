import { FETCH_AFFILIATE } from "@/app/api/affiliate/route";
import { Wallet, HandCoins, Users } from "lucide-react";
import { formatRupiah } from "@/utils/formatIDR";

export const fetchAffiliateData = async () => {
  try {
    const response = await FETCH_AFFILIATE();
    const {
      totalRevenue,
      totalSales,
      totalSubscriptions,
      revenuePercentage,
      salesPercentage,
      subscriptionsPercentage,
      topTeamMembers,
      topIncome,
    } = response;
    const totalRevenueIf = totalRevenue ? `${formatRupiah(totalRevenue)}` : 0;
    const totalSalesIf = totalSales ? totalSales : 0;
    const totalSubscriptionsIf = totalSubscriptions ? totalSubscriptions : 0;

    const revenuePercentageIf = revenuePercentage
      ? `${revenuePercentage.toFixed(1)}% from last month`
      : "0% from last month";
    const salesPercentageIf = salesPercentage
      ? `${salesPercentage.toFixed(1)}% from last month`
      : "0% from last month";
    const subscriptionsPercentageIf = subscriptionsPercentage
      ? `${subscriptionsPercentage}% from last month`
      : "0% from last month";

    return {
      dataCardOverview: [
        {
          label: "Total Revenue",
          amount: totalRevenueIf,
          discription: revenuePercentageIf,
          icon: Wallet,
        },
        {
          label: "Total Sales Product",
          amount: totalSalesIf,
          discription: salesPercentageIf,
          icon: HandCoins,
        },
        {
          label: "Subscriptions",
          amount: totalSubscriptionsIf,
          discription: subscriptionsPercentageIf,
          icon: Users,
        },
      ],
      totalSubscriptions: totalSubscriptions,
      subscriptionsPercentage: subscriptionsPercentage,
      salesPercentage: salesPercentage,
      totalSalesProduct: totalSales,
      revenuePercentage: revenuePercentage,
      totalRevenue: totalRevenue,
      topSalesData: topTeamMembers,
      topIncomeData: topIncome,
    };
  } catch (error) {
    console.error("Error fetching affiliate data:", error);
    throw error;
  }
};
