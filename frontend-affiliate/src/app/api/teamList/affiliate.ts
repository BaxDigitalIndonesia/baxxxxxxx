import { RegisterByMitra } from "@/interface";
const api = process.env.NEXT_PUBLIC_API_BE!;

export async function SEND_AFFILIATE(req: RegisterByMitra) {
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
