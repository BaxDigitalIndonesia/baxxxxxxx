import { RegisterByMitra } from "@/interface";
import { create } from "domain";
const api = process.env.NEXT_PUBLIC_API_BE!;

type Payment = {
  name: string;
  email: string;
  phone: string;
  createdAt: string;
};

let data: Payment[] = [
  {
    name: "John Doe aja",
    email: "john@example.com",
    phone: "2023-01-01",
    createdAt: "Credit Card",
  },
  {
    name: "Alice Smith",
    email: "alice@example.com",
    phone: "2023-02-15",
    createdAt: "PayPal",
  },
];
// let data: Payment[] = [
//   {
//     name: "John Doe aja",
//     email: "john@example.com",
//     phone: "2023-01-01",
//     method: "Credit Card",
//   },
//   {
//     name: "Alice Smith",
//     email: "alice@example.com",
//     phone: "2023-02-15",
//     method: "PayPal",
//   },
//   {
//     name: "Bob Johnson",
//     email: "bob@example.com",
//     phone: "2023-03-20",
//     method: "Stripe",
//   },
//   {
//     name: "Emma Brown",
//     email: "emma@example.com",
//     phone: "2023-04-10",
//     method: "Venmo",
//   },
//   {
//     name: "Michael Davis",
//     email: "michael@example.com",
//     phone: "2023-05-05",
//     method: "Cash",
//   },
//   {
//     name: "Sophia Wilson",
//     email: "sophia@example.com",
//     phone: "2023-06-18",
//     method: "Bank Transfer",
//   },
//   {
//     name: "Liam Garcia",
//     email: "liam@example.com",
//     phone: "2023-07-22",
//     method: "Payoneer",
//   },
//   {
//     name: "Olivia Martinez",
//     email: "olivia@example.com",
//     phone: "2023-08-30",
//     method: "Apple Pay",
//   },
//   {
//     name: "Noah Rodriguez",
//     email: "noah@example.com",
//     phone: "2023-09-12",
//     method: "Google Pay",
//   },
//   {
//     name: "Ava Lopez",
//     email: "ava@example.com",
//     phone: "2023-10-25",
//     method: "Cryptocurrency",
//   },
//   {
//     name: "Elijah Hernandez",
//     email: "elijah@example.com",
//     phone: "2023-11-05",
//     method: "Alipay",
//   },
//   {
//     name: "Mia Gonzalez",
//     email: "mia@example.com",
//     phone: "2023-12-08",
//     method: "WeChat Pay",
//   },
//   {
//     name: "James Perez",
//     email: "james@example.com",
//     phone: "2024-01-18",
//     method: "Square Cash",
//   },
//   {
//     name: "Charlotte Carter",
//     email: "charlotte@example.com",
//     phone: "2024-02-22",
//     method: "Zelle",
//   },
//   {
//     name: "Benjamin Taylor",
//     email: "benjamin@example.com",
//     phone: "2024-03-30",
//     method: "Stripe",
//   },
// ];

export async function SEND_AFFILIATEE(req: RegisterByMitra) {
  // Get the token from cookies
  const token = document.cookie
    .split("; ")
    .find((row) => row.startsWith("accessToken"))
    ?.split("=")[1];
  const referalCode = document.cookie
    .split("; ")
    .find((row) => row.startsWith("referalCode"))
    ?.split("=")[1];

  // If token exists, add it to the Authorization header
  const headers: HeadersInit = {
    "Content-Type": "application/json",
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const response = await fetch(`${api}/affiliates/affiliate`, {
    method: "POST",
    headers,
    body: JSON.stringify({
      referalCode,
      name: req.name,
      email: req.email,
      phone: req.phone,
      referrerId: referalCode,
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to register mitra");
  }

  return response;
}

export async function SEND_AFFILIATE(req: RegisterByMitra) {
  const body = {
    name: req.name,
    email: req.email,
    phone: "2025-01-5",
    createdAt: "Square Cash",
    // phone: req.phone,
  };

  data.push(body);
  return data.reverse();
}

export async function GET_AFFILIATE() {
  const token = document.cookie
    .split("; ")
    .find((row) => row.startsWith("accessToken"))
    ?.split("=")[1];

  // If token exists, add it to the Authorization header
  const headers: HeadersInit = {
    "Content-Type": "application/json",
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const response = await fetch(`${api}/affiliates/affiliate`, {
    method: "GET",
    headers,
  });

  if (!response.ok) {
    throw new Error("Failed to fetch mitra");
  }

  const dataa = await response.json();
  const data2 = dataa.data;
  // console.log("response route : ", data2);
  const namaa = data2.map((item: any) => {
    const dateStr = item.affiliate.createdAt;
    const date = new Date(dateStr);

    const formattedDate = new Intl.DateTimeFormat("en-US", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(date);

    // console.log(formattedDate);
    return {
      name: item.affiliate.name,
      email: item.affiliate.email,
      phone: item.affiliate.phone,
      createdAt: formattedDate,
    };
  });
  // console.log("namaa : ", namaa);
  return namaa;

  // return data.reverse();
}

export async function GET_FILTERED_AFFILIATE(query: string) {
  const data = await GET_AFFILIATE();
  const filtered = data.filter((payment: any) =>
    payment.name.toLowerCase().includes(query.toLowerCase())
  );
  return filtered.reverse();
}

export async function GET_AFFILIATEE() {
  // Get the token from cookies
  const token = document.cookie
    .split("; ")
    .find((row) => row.startsWith("accessToken"))
    ?.split("=")[1];

  // If token exists, add it to the Authorization header
  const headers: HeadersInit = {
    "Content-Type": "application/json",
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const response = await fetch(`${api}/affiliates/affiliate`, {
    method: "GET",
    headers,
  });

  if (!response.ok) {
    throw new Error("Failed to fetch mitra");
  }

  const data = await response.json();
  return data;
}
