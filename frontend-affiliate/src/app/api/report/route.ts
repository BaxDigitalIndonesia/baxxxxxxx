
const api = process.env.NEXT_PUBLIC_API_BE!;


export async function FETCH_REPORT() {
    // Get the token from cookies
  const token = document.cookie
  .split("; ")
  .find((row) => row.startsWith("accessToken"))
  ?.split("=")[1];

// If token exists, add it to the Authorization header
const headers: HeadersInit = {
 "Content-Type": "application/json"
};

if (token) {
  headers["Authorization"] = `Bearer ${token}`;

}

    
  const response = await fetch(`${api}${"/reports/report-by-user"}`, {
    method: "GET",
    headers,
  });

  if (!response.ok) {
    return (
      { status: response.status }
    );
  }

  const data = await response.json();
  return data;
}

