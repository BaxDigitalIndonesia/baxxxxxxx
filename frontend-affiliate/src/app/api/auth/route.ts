import { Register, Verify } from "@/interface";
const api = process.env.NEXT_PUBLIC_API_BE;

export async function POST_LOGIN(email: string, password: string) {
  const response = await fetch(`https://baxxxxxxx.vercel.app/api/api/v1/auth/login`, {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
      },
    body: JSON.stringify({ email, password }),
    credentials: "include",
  });

  // console.log(response);

  if (!response.ok) {
    throw new Error("Failed to login user.");
  }

  // const data = await response.json();
  return response;
}

export async function PATCH_USER(data: SignUpUpdateValues) {
  const response = await fetch(
    `${api}/auth/register/${data.role.toLowerCase()}`,
    {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: data.email,
        password: data.password,
        role: data.role,
        phone: data.phone,
      }),
    }
  );

  if (!response.ok) {
    throw new Error("Failed to update user.");
  }
  return response.ok;
}

export async function GET_OAUTH(encode: string) {
  // const backendOauthUrl = `${api}/auth/google?roles=${encode}`;
  const backendOauthUrl = `https://bax-affiliate-be.vercel.app/api/v1/auth/google?roles=${encode}`;
  // console.log("test1 :", api, "test2 :", backendOauthUrl);

  // Redirect ke endpoint OAuth backend
  return backendOauthUrl;
}

export async function REGISTER(req: Register) {
  const toLowerCase = req.role.toUpperCase();
  const response = await fetch(
    `${api}/auth/register/${req.role.toLowerCase()}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: req.name,
        email: req.email,
        phone: req.phone,
        password: req.password,
        referrerId: req.referrerId,
        role: toLowerCase,
      }),
    }
  );

  if (!response.ok) {
    throw new Error("Failed to register mitra");
  }

  return response;
}

export async function VERIFY_OTP(otp: string, userId: string) {
  const response = await fetch(`${api}/auth/verify-email`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ otp, userId }),
  });
  const data = await response.json();
  // const msg = data.entity.message;
  // if (!data.ok) {
  //   return msg;
  // }

  return data;
}

export async function RESEND_OTP(userId: string) {
  const response = await fetch(`${api}/auth/resend-email`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userId }),
  });
  const data = await response.json();
  // const msg = data.entity.message;
  // if (!data.ok) {
  //   return msg;
  // }

  return data;
}
//Fogot Password
export async function FORGOT_SEND(email: string) {
  const response = await fetch(`${api}/auth/forgot-password`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
  });
  const data = await response.json();
  // const msg = data.entity.message;
  // if (!data.ok) {
  //   return msg;
  // }

  return data;
}
