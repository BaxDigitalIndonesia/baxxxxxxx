const api = process.env.NEXT_PUBLIC_API_BE!;

export async function GET_TOTAL_REVENUEE() {
  const response = await fetch(`${api}/overview`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });

  if (!response.ok) {
    return { status: response.status };
  }

  const data = await response.json();
  return data;
}

export async function GET_TOTAL_REVENUE() {
  const res = "dwdw";
  return res;
  //   return data;
}
