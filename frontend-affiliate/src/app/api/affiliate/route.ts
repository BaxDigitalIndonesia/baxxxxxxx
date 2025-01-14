const api = process.env.NEXT_PUBLIC_API_BE!;

export async function FETCH_AFFILIATE() {
  // Get the token from cookies
  const token = document.cookie
    .split("; ")
    .find((row) => row.startsWith("accessToken"))
    ?.split("=")[1];

  // console.log("token affiliate: ", token);

  // If token exists, add it to the Authorization header
  const headers: HeadersInit = {
    "Content-Type": "application/json",
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  try {
    const response = await fetch(`${api}/affiliates/affiliate`, {
      method: "GET",
      headers,
      credentials:"include"
    });

    if (!response.ok) {
      console.warn("Failed to fetch affiliates:", response.status);
      return { status: response.status, data: [] };
    }

    const data = await response.json();
    // console.log("Fetched affiliate data:", data);
    return data;
  } catch (error) {
    console.error("Error fetching affiliates:", error);
    return { status: 500, data: [] };
  }

  // const response = await fetch(`${api}${"/affiliates/affiliate"}`, {
  //   method: "GET",
  //   headers,
  // });

  // if (!response.ok) {
  //   console.log(response);
  //   return { status: response.status };
  // }

  // const data = await response.json();
  // return data;
}
