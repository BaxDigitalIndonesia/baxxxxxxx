import React from "react";

export type topSalesProps = {
  name: string;
  email: string;
  saleAmount: string;
};

export const topSalesData: topSalesProps[] = [];
export default function TopSalesCard(props: any) {
  return (
    <>
      <div className="flex flex-wrap justify-between gap-2  text-chart-2 font-medium">
        <section className="flex justify-between gap-2">
          <div className=" h-6 w-6 rounded-full p-1">
            <img
              width={200}
              height={200}
              src={`https://api.dicebear.com/7.x/micah/svg?seed=${props.name}`}
              alt="avatar"
            />
          </div>
          <div className="text-sm text-slate-400">
            <p>{props.name}</p>
            <div className="text-ellipsis overflow-hidden whitespace-nowrap w-[50px] sm:w-auto text-gray-400">
              {props.email}
            </div>
          </div>
        </section>
        <p className="text-sm text-gray-400">{props.saleAmount}</p>
      </div>
      <hr className="my-2 border-t border-gray-300" />
    </>
  );
}
