const api = process.env.NEXT_PUBLIC_API_BE!;

interface Visitor {
  sessionId: string;
  longitude: string;
  latitude: string;
}

export async function VISITOR(
  latitude: string,
  longitude: string,
  referalParams: string
) {
  const response = await fetch(`${api}/customers/customer/${referalParams}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      longitude,
      latitude,
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to login user.");
  }

  // const data = await response.json();
  return response;
}

export async function FETCH_CUSTOMER() {
  // Get the token from cookies
  const token = document.cookie
    .split("; ")
    .find((row) => row.startsWith("accessToken"))
    ?.split("=")[1];

  const referrerId = document.cookie
    .split("; ")
    .find((row) => row.startsWith("referralCode"))
    ?.split("=")[1];
  // If token exists, add it to the Authorization header
  const headers: HeadersInit = {
    "Content-Type": "application/json",
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const response = await fetch(`${api}/customers/customer/${referrerId}`, {
    method: "GET",
    headers,
  });

  if (!response.ok) {
    return { status: response.status };
  }

  const data = await response.json();
  return data;
}
