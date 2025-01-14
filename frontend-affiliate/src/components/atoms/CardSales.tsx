"use client";
import { cn } from "@/lib/utils";
import { CreditCardIcon } from "lucide-react";
import Image from "next/image";

export function CardSales() {
  return (
    <div className="max-w-xs w-full group/card">
      <div
        className={cn(
          " cursor-pointer overflow-hidden relative card h-full rounded-xl shadow-xl  max-w-sm mx-auto backgroundImage flex flex-col justify-between p-4",
          "backdrop-blur-lg bg-[#eaf7ff]/40 [background:linear-gradient(145deg,rgba(255,255,255,0.3),rgba(230,240,255,0.1))] [box-shadow:0px_4px_6px_rgba(0,0,0,0.1),0px_1px_3px_rgba(255,255,255,0.2)] hover:scale-105 hover:shadow-2xl hover:[box-shadow:0px_8px_16px_rgba(0,0,0,0.2)0px_4px_8px_rgba(255,255,255,0.25)]transition-transform duration-300 ease-out"
        )}>
        {/* <div className="absolute w-full h-full top-0 left-0 transition duration-300 group-hover/card:bg-black opacity-60"></div> */}
        <div className="flex justify-between pb-4 space-x-4 z-10">
          <h1 className="subtitle-2 text-blueprimary">Member Card</h1>
          <CreditCardIcon />
        </div>
        <div className="text content pt-4">
          <h1 className="h3 text-bluesecondary relative z-10">
          Rp.1500000000
          </h1>
          <div className="flex flex-col gap-1 py-2">
            <p className="caption uppercase text-bluesecondary relative z-10">
              valid thru
            </p>
            <p className="caption text-blueprimary">12/25</p>
          </div>
        </div>
      </div>
    </div>
  );
}
