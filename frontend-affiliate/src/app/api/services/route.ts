const api = process.env.NEXT_PUBLIC_API_BE!;


export async function FETCH_SERVICES() {
  const response = await fetch(`${api}${"/services/service"}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" }
  });

  if (!response.ok) {
    return (
      { status: response.status }
    );
  }

  const data = await response.json();
  return data;
}