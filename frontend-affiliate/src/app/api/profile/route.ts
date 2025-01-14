import { Profile } from "@/interface";

const api = process.env.NEXT_PUBLIC_API_BE;

export async function PATCH_USER(request: Profile) {
  // Get the token from cookies
  const token = document.cookie
    .split("; ")
    .find((row) => row.startsWith("accessToken"))
    ?.split("=")[1];
  const formData = new FormData();

  if (request.photo) {
    formData.append("photo", request.photo);
  }
  if (request.birthday) {
    const birthdayValue = new Date(request.birthday).toISOString();
    formData.append("birthday", birthdayValue);
  }
  if (request.age) {
    formData.append("age", request.age);
  }
  if (request.job) {
    formData.append("job", request.job);
  }
  if (request.gender) {
    formData.append("gender", request.gender);
  }
  // If token exists, add it to the Authorization header
  const headers: HeadersInit = {};

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }
  //console.log(token,headers)
  const response = await fetch(`${api}/profiles/profile`, {
    method: "PATCH",
    headers,
    body: formData,
  });

  const data = await response.json();

  if (!response.ok) {
    console.error("Respons profil API:", data);
    return data;
  }


  return data;
}

export async function PATCH_ADDRESS(request: Profile,id:string) {
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

  const id_profile = id;
  if (!id_profile) {
    throw new Error("ID profil tidak ditemukan.");
  }

  const responseAddress = await fetch(
    `${api}/addresses/address/${id_profile}`,
    {
      method: "PATCH",

      headers,
      body:JSON.stringify({
       city:request.city,
       country:request.country,
       district:request.district,
       postalcode:request.postalcode,
       region:request.region,
       street:request.street,
       village:request.village
      }),
    }
  );
  const data_address = await responseAddress.json();
  if (!data_address.ok) {
    return data_address;
  }

  return data_address;
}
}
export const FETCH_PROFILE = async () => {
  const token = document.cookie
    .split("; ")
    .find((row) => row.startsWith("accessToken"))
    ?.split("=")[1];

  // If token exists, add it to the Authorization header
  const headers: HeadersInit = {};

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }
  //console.log(token,headers)
  const response = await fetch(`${api}/profiles/profile`, {
    method: "GET",
    headers,
  });

  const data = response.json();

  return data;
};
