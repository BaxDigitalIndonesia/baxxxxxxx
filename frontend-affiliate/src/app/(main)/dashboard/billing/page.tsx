// "use client";

// import { ColumnDef } from "@tanstack/react-table";
// import React, { useEffect, useState } from "react";
// import { cn } from "@/lib/utils";
// import DashboardBillingTemplate from "@/components/template/DashboardBillingTemplate";
// import { GET_BALANCE } from "@/app/api/billing/route";
// import { formatRupiah } from "@/utils/formatIDR";

// // type Props = {};
// type Payment = {
//   order: string;
//   status: string;
//   lastOrder: string;
//   method: string;
// };

// const columns: ColumnDef<Payment>[] = [
//   {
//     accessorKey: "order",
//     header: "Order",
//   },
//   {
//     accessorKey: "status",
//     header: "Status",
//     cell: ({ row }) => {
//       const orderId = row.getValue("order");
//       return (
//         <button
//           onClick={() =>
//             (window.location.href = `/dashboard/billing/${orderId}`)
//           }
//           className={cn(
//             "font-medium w-fit px-4 py-2 rounded-lg cursor-pointer transition-transform hover:scale-105",
//             {
//               "bg-red-500": row.getValue("status") === "Pending",
//               "bg-blue-500 text-white": row.getValue("status") === "Processing",
//               "bg-blue-700 text-white": row.getValue("status") === "Completed",
//             }
//           )}>
//           {row.getValue("status")}
//         </button>
//       );
//     },
//   },
//   {
//     accessorKey: "lastOrder",
//     header: "Last Order",
//   },
//   {
//     accessorKey: "method",
//     header: "Method",
//   },
// ];

// const data: Payment[] = [
//   {
//     order: "ORD001",
//     status: "Pending",
//     lastOrder: "2023-01-15",
//     method: "Credit Card",
//   },
//   {
//     order: "ORD002",
//     status: "Processing",
//     lastOrder: "2023-02-20",
//     method: "PayPal",
//   },
//   {
//     order: "ORD003",
//     status: "Completed",
//     lastOrder: "2023-03-10",
//     method: "Stripe",
//   },
//   {
//     order: "ORD004",
//     status: "Pending",
//     lastOrder: "2023-04-05",
//     method: "Venmo",
//   },
//   {
//     order: "ORD005",
//     status: "Completed",
//     lastOrder: "2023-05-12",
//     method: "Bank Transfer",
//   },
//   {
//     order: "ORD006",
//     status: "Processing",
//     lastOrder: "2023-06-18",
//     method: "Apple Pay",
//   },
//   {
//     order: "ORD007",
//     status: "Completed",
//     lastOrder: "2023-07-22",
//     method: "Google Pay",
//   },
//   {
//     order: "ORD008",
//     status: "Pending",
//     lastOrder: "2023-08-30",
//     method: "Cryptocurrency",
//   },
//   {
//     order: "ORD009",
//     status: "Processing",
//     lastOrder: "2023-09-05",
//     method: "Alipay",
//   },
//   {
//     order: "ORD010",
//     status: "Completed",
//     lastOrder: "2023-10-18",
//     method: "WeChat Pay",
//   },
//   {
//     order: "ORD011",
//     status: "Pending",
//     lastOrder: "2023-11-25",
//     method: "Square Cash",
//   },
//   {
//     order: "ORD012",
//     status: "Completed",
//     lastOrder: "2023-12-08",
//     method: "Zelle",
//   },
//   {
//     order: "ORD013",
//     status: "Processing",
//     lastOrder: "2024-01-15",
//     method: "Stripe",
//   },
//   {
//     order: "ORD014",
//     status: "Completed",
//     lastOrder: "2024-02-20",
//     method: "PayPal",
//   },
//   {
//     order: "ORD015",
//     status: "Pending",
//     lastOrder: "2024-03-30",
//     method: "Credit Card",
//   },
// ];

// interface Balance {
//   totalRevenue: number;
//   totalSales: string;
//   totalSubscription: string;
//   monthlyRevenue: string;
// }

// export default function BillingPage() {
//   const [balance, setBalance] = useState<Balance[]>([]);
//   const [dataBilling, setDataBilling] = useState<any[]>();
//   const fetchDataBalance = async () => {
//     try {
//       const res = await GET_BALANCE();
//       // setDataBilling(res);
//       return res;
//     } catch (error) {
//       console.error("Error fetching balance:", error);
//     }

//     // setBalance([]);
//   };

//   useEffect(() => {
//     // console.log("balance: ", balance);

//     fetchDataBalance();
//   }, []);
//   return (
//     <>
//       <div>
//         Transaction : <br />
//         {balance.map((item, index) => (
//           <div key={index}>
//             Total Revenue: {formatRupiah(item.totalRevenue)} <br />
//             Total Sales: {item.totalSales} <br />
//             Total Subscription: {item.totalSubscription} <br />
//             Monthly Revenue: {item.monthlyRevenue} <br />
//           </div>
//         ))}
//       </div>
//       <DashboardBillingTemplate />
//     </>
//   );
// }
