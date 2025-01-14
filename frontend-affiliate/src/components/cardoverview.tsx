import React from "react";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { DollarSign, Users, CreditCard, Activity } from "lucide-react";

export type CardOverviewProps = {
  label: string;
  icon: LucideIcon;
  amount: string;
  discription: string;
  className?: string;
};

export const cardDataOverview: CardOverviewProps[] = [
  {
    label: "Total Revenue",
    amount: "$45,231.89",
    discription: "+20.1% from last month",
    icon: DollarSign,
  },
  {
    label: "Subscriptions",
    amount: "+2350",
    discription: "+180.1% from last month",
    icon: Users,
  },
  {
    label: "Sales",
    amount: "+12,234",
    discription: "+19% from last month",
    icon: CreditCard,
  },
  {
    label: "Active Now",
    amount: "+573",
    discription: "+201 since last hour",
    icon: Activity,
  },
];

export default function CardOverview(props: CardOverviewProps) {
  return (
    <CardContent className={cn(props.className)}>
      <section className="flex justify-between font-bold">
        {/* label */}
        <p className="subtitle-2 text-blueprimary">{props.label}</p>
        {/* icon */}
        <props.icon className="h-5 w-5" />
      </section>
      <section className="flex flex-col gap-1">
        <h2 className="h2 text-bluesecondary">{props.amount}</h2>
        <p className="caption text-slate-600">{props.discription}</p>
      </section>
    </CardContent>
  );
}

export function CardContent(props: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      {...props}
      className={cn(
        // "flex w-full flex-col gap-3 rounded-xl border border-slate-900 p-2 shadow [background:radial-gradient(150%_65%_at_20%_50%,#000_10%,#1b4974_150%)]",
        // props.className
        // "flex w-full flex-col gap-3 rounded-xl border border-slate-200 p-4 shadow-lg backdrop-blur-lg bg-white/60 [background:linear-gradient(145deg,rgba(255,255,255,0.8),rgba(230,240,255,0.6))]",
        // props.className
        // "flex w-full flex-col gap-3 rounded-xl border border-slate-200 p-6 shadow-xl backdrop-blur-lg bg-[#eaf7ff]/60 [background:linear-gradient(145deg,rgba(255,255,255,0.3),rgba(230,240,255,0.1))] [box-shadow:0px_4px_6px_rgba(0,0,0,0.1),0px_1px_3px_rgba(255,255,255,0.2)]",
        "flex w-full flex-col",
        props.className
      )}
    />
  );
}
