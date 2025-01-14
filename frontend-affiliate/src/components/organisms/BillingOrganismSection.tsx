// import React, { useEffect, useState } from "react";
// import CustomWrapper from "../atoms/CustomWrapper";
// import CustomContainer from "../atoms/CustomContainer";
// import CardOverview, { CardContent } from "../cardoverview";
// import EachUtils from "@/utils/EachUtils";
// import { invoicesData, transactionData } from "@/constant";
// import TopSalesCard from "../topsalescard";
// import { DatePickerWithRange } from "../daterange";
// import { Input } from "../ui/input";
// import { Card } from "../ui/card";
// import { CreditCardIcon, HandCoins, Users, Wallet } from "lucide-react";
// import { CardSection } from "../atoms/CardSection";
// import { GET_BALANCE } from "@/app/api/billing/route";
// import { formatRupiah } from "@/utils/formatIDR";
// import { fetchAffiliateData } from "@/handler/handle-affiliate";

// // === Halaman Billing ===

// // Billing menampilkan data tagihan transaksi (withdrawl) yang dlakukan oleh affiliate mereka

// // Your transaction adalah data dari keseluruhan transaksi yang dilakukan oleh mitra (keluar, masuk), pembayaran/transfer dari withdrawl affiliate

// // Invoice adalah menampilkan detail atau rincian data dari transaksi yang dilakukan oleh mitra baik Ketika mitra transfer withdrawl ke affiliate, ataupun dari mitra request withdrawl ke admin bax

// export default function BillingOrganismSection() {
//   const [dataBilling, setDataBilling] = useState<any>();
//   const [dataTransaction, setDataTransaction] = useState<any>();
//   const [dataSuccess, setDataSuccess] = useState<any>();
//   const [dataUnsuccess, setDataUnsuccess] = useState<any>();
//   const fetchDataBalance = async () => {
//     try {
//       const res = await GET_BALANCE();

//       const getRes = res?.data;
//       const dataMap = res?.dataMap;
//       setDataBilling(getRes);
//       setDataTransaction(dataMap);
//       if (res?.dataSuccess.length > 0) {
//         setDataSuccess(res?.dataSuccess);
//       }
//       if (res?.dataUnsuccess.length > 0) {
//         setDataUnsuccess(res?.dataUnsuccess);
//       }
//     } catch (error) {
//       console.error("Error fetching balance:", error);
//     }
//   };

//   // console.log("dataBilling: ", dataBilling);

//   useEffect(() => {
//     // fetchData();
//     fetchDataBalance();
//   }, []);
//   return (
//     <section>
//       <CustomContainer>
//         <h1>Billing Organism Section</h1>
//       </CustomContainer>

//       <div className="flex flex-1 flex-col gap-2">
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
//           {/* Left Section */}
//           <div className="grid grid-cols-2 lg:grid-cols-2 gap-2">
//             <div className="col-span-2  md:col-span-2 rounded-xl">
//               {/* <CardSection /> */}
//               {dataTransaction && (
//                 <EachUtils
//                   of={dataBilling}
//                   render={(data: any, index) => (
//                     <CardOverview
//                       key={index}
//                       amount={data.amount}
//                       discription={data.discription}
//                       icon={data.icon}
//                       label={data.label}
//                       className="rounded-xl border border-slate-200 p-6 shadow-xl backdrop-blur-lg bg-[#eaf7ff]/40 [background:linear-gradient(145deg,rgba(255,255,255,0.3),rgba(230,240,255,0.1))] [box-shadow:0px_4px_6px_rgba(0,0,0,0.1),0px_1px_3px_rgba(255,255,255,0.2)] hover:scale-105 hover:shadow-2xl hover:[box-shadow:0px_8px_16px_rgba(0,0,0,0.2)0px_4px_8px_rgba(255,255,255,0.25)]
//           transition-transform duration-300 ease-out"
//                     />
//                   )}
//                 />
//               )}
//               {/* <CardOverview
//                 amount={formatRupiah(dataBilling?.totalRevenue)}
//                 discription=""
//                 icon={CreditCardIcon}
//                 label="Total Revenue"
//                 className="rounded-xl border border-slate-200 p-6 shadow-xl min-h-[168px] backdrop-blur-lg bg-[#eaf7ff]/40 [background:linear-gradient(145deg,rgba(255,255,255,0.3),rgba(230,240,255,0.1))] [box-shadow:0px_4px_6px_rgba(0,0,0,0.1),0px_1px_3px_rgba(255,255,255,0.2)] hover:scale-105 hover:shadow-2xl hover:[box-shadow:0px_8px_16px_rgba(0,0,0,0.2)0px_4px_8px_rgba(255,255,255,0.25)]
//                             transition-transform duration-300 ease-out"
//               /> */}
//             </div>
//             {/* <div className="col-span-2 md:col-span-1 rounded-xl">
//               <CardOverview
//                 amount={dataBilling?.totalSales ?? "$0.00"}
//                 discription=""
//                 icon={CreditCardIcon}
//                 label="Total Earnings"
//                 className="rounded-xl border border-slate-200 p-6 shadow-xl min-h-[168px] backdrop-blur-lg bg-[#eaf7ff]/40 [background:linear-gradient(145deg,rgba(255,255,255,0.3),rgba(230,240,255,0.1))] [box-shadow:0px_4px_6px_rgba(0,0,0,0.1),0px_1px_3px_rgba(255,255,255,0.2)] hover:scale-105 hover:shadow-2xl hover:[box-shadow:0px_8px_16px_rgba(0,0,0,0.2)0px_4px_8px_rgba(255,255,255,0.25)]
//                             transition-transform duration-300 ease-out"
//               />
//             </div>
//             <CardOverview
//               amount={dataBilling?.revenuePercentage ?? "$0.00"}
//               discription=""
//               icon={CreditCardIcon}
//               label="Total Commission"
//               className="rounded-xl border border-slate-200 p-6 shadow-xl min-h-[168px] backdrop-blur-lg bg-[#eaf7ff]/40 [background:linear-gradient(145deg,rgba(255,255,255,0.3),rgba(230,240,255,0.1))] [box-shadow:0px_4px_6px_rgba(0,0,0,0.1),0px_1px_3px_rgba(255,255,255,0.2)] hover:scale-105 hover:shadow-2xl hover:[box-shadow:0px_8px_16px_rgba(0,0,0,0.2)0px_4px_8px_rgba(255,255,255,0.25)]
//                             transition-transform duration-300 ease-out"
//             />{" "}
//             <CardOverview
//               amount={dataBilling?.totalSales ?? "$0.00"}
//               discription=""
//               icon={CreditCardIcon}
//               label="Total Sale Amount"
//               className="rounded-xl border border-slate-200 p-6 shadow-xl min-h-[168px] backdrop-blur-lg bg-[#eaf7ff]/40 [background:linear-gradient(145deg,rgba(255,255,255,0.3),rgba(230,240,255,0.1))] [box-shadow:0px_4px_6px_rgba(0,0,0,0.1),0px_1px_3px_rgba(255,255,255,0.2)] hover:scale-105 hover:shadow-2xl hover:[box-shadow:0px_8px_16px_rgba(0,0,0,0.2)0px_4px_8px_rgba(255,255,255,0.25)]
//                           transition-transform duration-300 ease-out"
//             /> */}
//             <div className="col-span-2 rounded-xl">
//               {/* <div className="flex flex-col md:flex-row justify-center items-center w-full h-full gap-2 rounded-xl border border-slate-200 p-6 shadow-xl backdrop-blur-lg bg-[#eaf7ff]/40 [background:linear-gradient(145deg,rgba(255,255,255,0.3),rgba(230,240,255,0.1))] [box-shadow:0px_4px_6px_rgba(0,0,0,0.1),0px_1px_3px_rgba(255,255,255,0.2)] ">
//                 <Input
//                   type="email"
//                   placeholder="Email"
//                   className="hover:scale-105 hover:shadow-2xl hover:[box-shadow:0px_8px_16px_rgba(0,0,0,0.2)0px_4px_8px_rgba(255,255,255,0.25)]
//                             transition-transform duration-300 ease-out"
//                 />
//                 <Input
//                   type="email"
//                   placeholder="Email"
//                   className="hover:scale-105 hover:shadow-2xl hover:[box-shadow:0px_8px_16px_rgba(0,0,0,0.2)0px_4px_8px_rgba(255,255,255,0.25)]
//                             transition-transform duration-300 ease-out"
//                 />
//               </div> */}
//             </div>
//           </div>

//           {/* Right Section */}
//           <div className="flex flex-row">
//             <CardContent className="flex gap-2 rounded-xl border border-slate-200 p-4 shadow-xl backdrop-blur-lg bg-[#eaf7ff]/60 [background:linear-gradient(145deg,rgba(255,255,255,0.3),rgba(230,240,255,0.1))] [box-shadow:0px_4px_6px_rgba(0,0,0,0.1),0px_1px_3px_rgba(255,255,255,0.2)]">
//               <div className="flex flex-row justify-between">
//                 <p className="text-lg text-center text-blueprimary font-bold">
//                   Invoice
//                 </p>
//               </div>
//               {(dataTransaction && (
//                 <EachUtils
//                   of={dataTransaction}
//                   render={(data: any, index) => (
//                     <TopSalesCard
//                       key={index}
//                       email={data?.status}
//                       name={data?.name}
//                       saleAmount={data?.totalPrice}
//                     />
//                   )}
//                 />
//               )) ?? (
//                 <p className="text-sm text-center text-blueprimary font-bold">
//                   No Data
//                 </p>
//               )}
//             </CardContent>
//           </div>
//         </div>
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
//           {/* Billing Information */}
//           <div className="flex flex-row gap-2">
//             <CardContent className="flex gap-2 rounded-xl border border-slate-200 p-4 shadow-xl backdrop-blur-lg bg-[#eaf7ff]/60 [background:linear-gradient(145deg,rgba(255,255,255,0.3),rgba(230,240,255,0.1))] [box-shadow:0px_4px_6px_rgba(0,0,0,0.1),0px_1px_3px_rgba(255,255,255,0.2)]">
//               <div className="flex flex-row justify-between">
//                 <p className="text-lg text-center text-blueprimary font-bold">
//                   Billing Information
//                 </p>
//                 {/* <DatePickerWithRange className="justify-end font-semibold text-bluesecondary" /> */}
//               </div>
//               {(dataUnsuccess && (
//                 <EachUtils
//                   of={dataUnsuccess}
//                   render={(data: any, index) => (
//                     <TopSalesCard
//                       key={index}
//                       email={data?.email}
//                       name={data?.name}
//                       saleAmount={data?.totalPrice}
//                     />
//                   )}
//                 />
//               )) ?? (
//                 <p className="text-sm text-center text-blueprimary font-bold">
//                   No Data
//                 </p>
//               )}
//             </CardContent>
//           </div>

//           {/* Your Transactions */}
//           <div className="flex flex-row gap-2">
//             <CardContent className="flex gap-2 rounded-xl border border-slate-200 p-4 shadow-xl backdrop-blur-lg bg-[#eaf7ff]/60 [background:linear-gradient(145deg,rgba(255,255,255,0.3),rgba(230,240,255,0.1))] [box-shadow:0px_4px_6px_rgba(0,0,0,0.1),0px_1px_3px_rgba(255,255,255,0.2)]">
//               <div className="flex flex-col Lg:flex-row justify-between">
//                 <p className="text-lg text-center text-blueprimary font-bold">
//                   Your Transactions
//                 </p>
//                 {/* <DatePickerWithRange className="justify-end font-semibold text-bluesecondary" /> */}
//               </div>
//               {(dataSuccess && (
//                 <EachUtils
//                   of={dataSuccess}
//                   render={(data: any, index) => (
//                     <TopSalesCard
//                       key={index}
//                       email={data?.email}
//                       name={data?.name}
//                       saleAmount={data?.totalPrice}
//                     />
//                   )}
//                 />
//               )) ?? (
//                 <p className="text-sm text-center text-blueprimary font-bold">
//                   No Data
//                 </p>
//               )}
//             </CardContent>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }
