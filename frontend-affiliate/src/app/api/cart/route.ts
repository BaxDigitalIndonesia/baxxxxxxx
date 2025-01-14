const api = process.env.NEXT_PUBLIC_API_BE!;

export async function FETCH_CART() {
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

  const response = await fetch(`${api}${"/carts/cart"}`, {
    method: "GET",
    headers,
  });

  if (!response.ok) {
    return { status: response.status };
  }

  const data = await response.json();
  return data;
}


export async function ADD_CART(serviceId:string) {
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
  
    const response = await fetch(`${api}${"/carts/cart"}`, {
      method: "POST",
      headers,
      body:JSON.stringify({
            serviceId
      })
    });
  
 
    return response.ok;
  }

  export async function DELETE_CART(cartId:string) {
    // Get the token from cookies
    const token = document.cookie
      .split("; ")
      .find((row) => row.startsWith("accessToken"))
      ?.split("=")[1];
  
    // If token exists, add it to the Authorization header
    const headers: HeadersInit = {};
  
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }
  
    const response = await fetch(`${api}/carts/cart/${cartId}`, {
      method: "DELETE",
      headers
    });
  
    if (!response.ok) {
      return { status: response.status };
    }
  
 
    return response.ok;
  }
  