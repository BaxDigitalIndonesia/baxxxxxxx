import {
  Activity,
  ChartColumn,
  ClipboardList,
  ClipboardPenLineIcon,
  CreditCard,
  DollarSign,
  FolderOpenIcon,
  Globe,
  LogOutIcon,
  Send,
  UserCircle2,
  Users,
  Wallet,
  WandSparklesIcon,
} from "lucide-react";

export const navMain = [
  {
    title: "Menu",
    url: "#",
    items: [
      {
        title: "Overview",
        url: "/dashboard/overview",
        icon: ChartColumn,
        isActive: true,
      },
      {
        title: "Services",
        url: "/dashboard/services",
        icon: ClipboardList,
      },
      {
        title: "Billing",
        url: "/dashboard/billing",
        icon: Wallet,
      },
      {
        title: "Teamlist",
        url: "/dashboard/teamlist",
        icon: Users,
      },
      {
        title: "Report",
        url: "/dashboard/report",
        icon: ClipboardPenLineIcon,
      },
    ],
  },
  {
    title: "Other",
    url: "#",
    items: [
      {
        title: "Support Services",
        url: "https://baxdigitalindonesia.com",
        icon: Send,
      },
      {
        title: "Web Services",
        url: "https://baxdigitalindonesia.com",
        icon: Globe,
      },
    ],
  },
];

export const navItems = [
  {
    name: "About",
    icon: "/assets/icons/about.svg",
    url: "/about",
  },
  {
    name: "Contact",
    icon: "/assets/icons/others.svg",
    url: "/contact",
  },
];

import { Settings2 } from "lucide-react";
export const NavMenu = [
  [
    {
      label: "Profile",
      icon: UserCircle2,
      url: "/dashboard/profile",
    },
    {
      label: "Setting",
      icon: Settings2,
      url: "/dashboard/setting",
    },
  ],
  [
    {
      label: "Logout",
      icon: LogOutIcon,
      url: "/api/auth/logout",
    },
  ],
];

export const programClass = [
  {
    title: "Organize Your Links",
    description:
      "Efficiently categorize and tag your links for quick access and easy management.",
    icon: FolderOpenIcon,
  },
  {
    title: "Shorten and Customize",
    description:
      "Create concise, branded links that are easy to share and track.",
    icon: WandSparklesIcon,
  },
];

export const dataCardOverview = [
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

export const topSalesData = [
  {
    name: "Olivia Martin",
    email: "olivia.martin@email.com",
    saleAmount: "+$1,999.00",
  },
  {
    name: "Jackson Lee",
    email: "isabella.nguyen@email.com",
    saleAmount: "+$1,999.00",
  },
  {
    name: "Isabella Nguyen",
    email: "isabella.nguyen@email.com",
    saleAmount: "+$39.00",
  },
  {
    name: "William Kim",
    email: "will@email.com",
    saleAmount: "+$299.00",
  },
  {
    name: "Sofia Davis",
    email: "sofia.davis@email.com",
    saleAmount: "+$39.00",
  },
];

export const headersData = [
  {
    title: "Top 5 Team Member",
    description: "You made 265 sales this month.",
  },
  {
    title: "Top 5 Income",
    description: "You made 265 sales this month.",
  },
];

export const transactionData = [
  {
    order: "ORD001",
    status: "Pending",
    lastOrder: "2023-01-15",
    method: "Credit Card",
  },
  {
    order: "ORD002",
    status: "Processing",
    lastOrder: "2023-02-20",
    method: "PayPal",
  },
  {
    order: "ORD003",
    status: "Completed",
    lastOrder: "2023-03-10",
    method: "Stripe",
  },
  {
    order: "ORD004",
    status: "Pending",
    lastOrder: "2023-04-05",
    method: "Venmo",
  },
  {
    order: "ORD005",
    status: "Completed",
    lastOrder: "2023-05-12",
    method: "Bank Transfer",
  },
  {
    order: "ORD006",
    status: "Processing",
    lastOrder: "2023-06-18",
    method: "Apple Pay",
  },
  {
    order: "ORD007",
    status: "Completed",
    lastOrder: "2023-07-22",
    method: "Google Pay",
  },
  {
    order: "ORD008",
    status: "Pending",
    lastOrder: "2023-08-30",
    method: "Cryptocurrency",
  },
  {
    order: "ORD009",
    status: "Processing",
    lastOrder: "2023-09-05",
    method: "Alipay",
  },
  {
    order: "ORD010",
    status: "Completed",
    lastOrder: "2023-10-18",
    method: "WeChat Pay",
  },
  {
    order: "ORD011",
    status: "Pending",
    lastOrder: "2023-11-25",
    method: "Square Cash",
  },
  {
    order: "ORD012",
    status: "Completed",
    lastOrder: "2023-12-08",
    method: "Zelle",
  },
];

export const invoicesData = [
  {
    name: "Olivia Martin",
    email: "olivia.martin@email.com",
    saleAmount: "+$1,999.00",
  },
  {
    name: "Jackson Lee",
    email: "isabella.nguyen@email.com",
    saleAmount: "+$1,999.00",
  },
  {
    name: "Isabella Nguyen",
    email: "isabella.nguyen@email.com",
    saleAmount: "+$39.00",
  },
  {
    name: "William Kim",
    email: "will@email.com",
    saleAmount: "+$299.00",
  },
  {
    name: "Sofia Davis",
    email: "sofia.davis@email.com",
    saleAmount: "+$39.00",
  },
];

export const billingInformation = [
  {
    order: "ORD001",
    status: "Pending",
    lastOrder: "2023-01-15",
    method: "Credit Card",
  },
  {
    order: "ORD002",
    status: "Processing",
    lastOrder: "2023-02-20",
    method: "PayPal",
  },
  {
    order: "ORD003",
    status: "Completed",
    lastOrder: "2023-03-10",
    method: "Stripe",
  },
  {
    order: "ORD004",
    status: "Pending",
    lastOrder: "2023-04-05",
    method: "Venmo",
  },
  {
    order: "ORD005",
    status: "Completed",
    lastOrder: "2023-05-12",
    method: "Bank Transfer",
  },
  {
    order: "ORD006",
    status: "Processing",
    lastOrder: "2023-06-18",
    method: "Apple Pay",
  },
  {
    order: "ORD007",
    status: "Completed",
    lastOrder: "2023-07-22",
    method: "Google Pay",
  },
  {
    order: "ORD008",
    status: "Pending",
    lastOrder: "2023-08-30",
    method: "Cryptocurrency",
  },
  {
    order: "ORD009",
    status: "Processing",
    lastOrder: "2023-09-05",
    method: "Alipay",
  },
  {
    order: "ORD010",
    status: "Completed",
    lastOrder: "2023-10-18",
    method: "WeChat Pay",
  },
  {
    order: "ORD011",
    status: "Pending",
    lastOrder: "2023-11-25",
    method: "Square Cash",
  },
  {
    order: "ORD012",
    status: "Completed",
    lastOrder: "2023-12-08",
    method: "Zelle",
  },
];
